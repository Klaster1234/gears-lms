'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import {
  validateRegistration,
  validateSuggestion,
  type RegistrationInput,
  type RegistrationFormErrors,
  type SuggestPlaceInput,
} from './validation';

const OVERFLOW_BUFFER = 2;

export type RegistrationActionResult =
  | { ok: true; status: 'PENDING' | 'WAITLIST' }
  | { ok: false; errors: RegistrationFormErrors };

export async function createRegistration(
  formData: Partial<RegistrationInput>,
): Promise<RegistrationActionResult> {
  const parsed = validateRegistration(formData);
  if (!parsed.ok) {
    return { ok: false, errors: parsed.errors };
  }

  const input = parsed.data;
  const session = await auth();
  const userId = session?.user?.id ?? null;

  // If logged in, force email to match session email (prevent impersonation)
  if (session?.user?.email && session.user.email.toLowerCase() !== input.email) {
    return { ok: false, errors: { email: 'invalid' } };
  }

  const quest = await prisma.quest.findUnique({
    where: { id: input.questId },
    select: { id: true, isPublished: true, maxParticipants: true },
  });

  if (!quest || !quest.isPublished) {
    return { ok: false, errors: { _form: 'questNotFound' } };
  }

  const existing = await prisma.questRegistration.findUnique({
    where: { questId_email: { questId: input.questId, email: input.email } },
    select: { id: true, status: true },
  });

  if (existing && existing.status !== 'CANCELLED') {
    return { ok: false, errors: { email: 'duplicate' } };
  }

  const count = await prisma.questRegistration.count({
    where: { questId: input.questId, status: { notIn: ['CANCELLED', 'NO_SHOW'] } },
  });

  const hardLimit = quest.maxParticipants + OVERFLOW_BUFFER;
  if (count >= hardLimit) {
    return { ok: false, errors: { _form: 'full' } };
  }

  const status: 'PENDING' | 'WAITLIST' =
    count >= quest.maxParticipants ? 'WAITLIST' : 'PENDING';

  if (existing) {
    await prisma.questRegistration.update({
      where: { id: existing.id },
      data: {
        userId,
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        ageRange: input.ageRange,
        city: input.city,
        dietaryRequirements: input.dietaryRequirements,
        accessibilityNeeds: input.accessibilityNeeds,
        hearAboutUs: input.hearAboutUs,
        consentDataProcessing: input.consentDataProcessing,
        consentPhotos: input.consentPhotos ?? false,
        consentNewsletter: input.consentNewsletter ?? false,
        status,
      },
    });
  } else {
    await prisma.questRegistration.create({
      data: {
        questId: input.questId,
        userId,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        ageRange: input.ageRange,
        city: input.city,
        dietaryRequirements: input.dietaryRequirements,
        accessibilityNeeds: input.accessibilityNeeds,
        hearAboutUs: input.hearAboutUs,
        consentDataProcessing: input.consentDataProcessing,
        consentPhotos: input.consentPhotos ?? false,
        consentNewsletter: input.consentNewsletter ?? false,
        status,
      },
    });
  }

  revalidatePath('/quests');
  revalidatePath(`/quests/${input.questId}`);

  return { ok: true, status };
}

export type SuggestionActionResult =
  | { ok: true }
  | { ok: false; errors: Record<string, string> };

export async function createSuggestion(
  formData: Partial<SuggestPlaceInput>,
): Promise<SuggestionActionResult> {
  const parsed = validateSuggestion(formData);
  if (!parsed.ok) {
    return { ok: false, errors: parsed.errors };
  }

  await prisma.placeSuggestion.create({
    data: {
      suggestedName: parsed.data.suggestedName,
      suggestedCategory: parsed.data.suggestedCategory,
      suggestedAddress: parsed.data.suggestedAddress,
      suggestedDescription: parsed.data.suggestedDescription,
      suggesterEmail: parsed.data.suggesterEmail,
      suggesterName: parsed.data.suggesterName,
    },
  });

  return { ok: true };
}
