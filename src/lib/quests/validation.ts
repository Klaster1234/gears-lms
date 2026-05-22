export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationInput | '_form', string>
>;

export type RegistrationInput = {
  questId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  ageRange?: '18-25' | '26-40' | '41-60' | '60+';
  city?: string;
  dietaryRequirements?: string;
  accessibilityNeeds?: string;
  hearAboutUs?: string;
  consentDataProcessing: boolean;
  consentPhotos?: boolean;
  consentNewsletter?: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_AGE_RANGES = ['18-25', '26-40', '41-60', '60+'] as const;

export function validateRegistration(
  input: Partial<RegistrationInput>,
): { ok: true; data: RegistrationInput } | { ok: false; errors: RegistrationFormErrors } {
  const errors: RegistrationFormErrors = {};

  if (!input.questId || typeof input.questId !== 'string') {
    errors.questId = 'missing';
  }
  if (!input.firstName || input.firstName.trim().length < 2) {
    errors.firstName = 'tooShort';
  } else if (input.firstName.length > 50) {
    errors.firstName = 'tooLong';
  }
  if (!input.lastName || input.lastName.trim().length < 2) {
    errors.lastName = 'tooShort';
  } else if (input.lastName.length > 50) {
    errors.lastName = 'tooLong';
  }
  if (!input.email || !EMAIL_RE.test(input.email)) {
    errors.email = 'invalid';
  }
  if (input.phone && input.phone.length > 30) {
    errors.phone = 'tooLong';
  }
  if (input.ageRange && !VALID_AGE_RANGES.includes(input.ageRange as never)) {
    errors.ageRange = 'invalid';
  }
  if (input.city && input.city.length > 80) {
    errors.city = 'tooLong';
  }
  if (input.dietaryRequirements && input.dietaryRequirements.length > 200) {
    errors.dietaryRequirements = 'tooLong';
  }
  if (input.accessibilityNeeds && input.accessibilityNeeds.length > 200) {
    errors.accessibilityNeeds = 'tooLong';
  }
  if (input.hearAboutUs && input.hearAboutUs.length > 100) {
    errors.hearAboutUs = 'tooLong';
  }
  if (!input.consentDataProcessing) {
    errors.consentDataProcessing = 'required';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      questId: input.questId!,
      firstName: input.firstName!.trim(),
      lastName: input.lastName!.trim(),
      email: input.email!.toLowerCase().trim(),
      phone: input.phone?.trim() || undefined,
      ageRange: input.ageRange,
      city: input.city?.trim() || undefined,
      dietaryRequirements: input.dietaryRequirements?.trim() || undefined,
      accessibilityNeeds: input.accessibilityNeeds?.trim() || undefined,
      hearAboutUs: input.hearAboutUs?.trim() || undefined,
      consentDataProcessing: true,
      consentPhotos: input.consentPhotos ?? false,
      consentNewsletter: input.consentNewsletter ?? false,
    },
  };
}

export type SuggestPlaceInput = {
  suggestedName: string;
  suggestedCategory?: string;
  suggestedAddress?: string;
  suggestedDescription?: string;
  suggesterEmail?: string;
  suggesterName?: string;
};

export function validateSuggestion(
  input: Partial<SuggestPlaceInput>,
): { ok: true; data: SuggestPlaceInput } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.suggestedName || input.suggestedName.trim().length < 2) {
    errors.suggestedName = 'tooShort';
  } else if (input.suggestedName.length > 120) {
    errors.suggestedName = 'tooLong';
  }
  if (input.suggesterEmail && !EMAIL_RE.test(input.suggesterEmail)) {
    errors.suggesterEmail = 'invalid';
  }
  if (input.suggestedDescription && input.suggestedDescription.length > 500) {
    errors.suggestedDescription = 'tooLong';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      suggestedName: input.suggestedName!.trim(),
      suggestedCategory: input.suggestedCategory?.trim() || undefined,
      suggestedAddress: input.suggestedAddress?.trim() || undefined,
      suggestedDescription: input.suggestedDescription?.trim() || undefined,
      suggesterEmail: input.suggesterEmail?.toLowerCase().trim() || undefined,
      suggesterName: input.suggesterName?.trim() || undefined,
    },
  };
}
