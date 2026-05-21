'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRegistration } from '@/lib/quests/actions';
import type { RegistrationFormErrors } from '@/lib/quests/validation';

type Props = {
  questId: string;
  questSlug: string;
};

export function RegistrationForm({ questId, questSlug }: Props) {
  const t = useTranslations('quests.registration');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  async function onSubmit(formData: FormData) {
    setErrors({});
    const payload = {
      questId,
      firstName: (formData.get('firstName') as string) ?? '',
      lastName: (formData.get('lastName') as string) ?? '',
      email: (formData.get('email') as string) ?? '',
      phone: (formData.get('phone') as string) || undefined,
      ageRange: ((formData.get('ageRange') as string) ||
        undefined) as '18-25' | '26-40' | '41-60' | '60+' | undefined,
      city: (formData.get('city') as string) || undefined,
      dietaryRequirements:
        (formData.get('dietaryRequirements') as string) || undefined,
      accessibilityNeeds:
        (formData.get('accessibilityNeeds') as string) || undefined,
      hearAboutUs: (formData.get('hearAboutUs') as string) || undefined,
      consentDataProcessing: formData.get('consentDataProcessing') === 'on',
      consentPhotos: formData.get('consentPhotos') === 'on',
      consentNewsletter: formData.get('consentNewsletter') === 'on',
    };

    startTransition(async () => {
      const result = await createRegistration(payload);
      if (!result.ok) {
        setErrors(result.errors);
        return;
      }
      router.push(
        `/quests/confirmation?quest=${questSlug}&status=${result.status.toLowerCase()}`,
      );
    });
  }

  return (
    <form action={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="firstName"
          label={t('firstName')}
          required
          error={errors.firstName && t(`errors.${errors.firstName}`)}
        />
        <Field
          name="lastName"
          label={t('lastName')}
          required
          error={errors.lastName && t(`errors.${errors.lastName}`)}
        />
      </div>
      <Field
        name="email"
        type="email"
        label={t('email')}
        required
        error={errors.email && t(`errors.${errors.email}`)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="phone"
          type="tel"
          label={t('phone')}
          error={errors.phone && t(`errors.${errors.phone}`)}
        />
        <div className="space-y-1.5">
          <Label htmlFor="ageRange">{t('ageRange')}</Label>
          <select
            id="ageRange"
            name="ageRange"
            className="h-10 w-full rounded-md border border-[#E5E2DB] bg-white px-3 text-sm"
          >
            <option value="">—</option>
            <option value="18-25">18-25</option>
            <option value="26-40">26-40</option>
            <option value="41-60">41-60</option>
            <option value="60+">60+</option>
          </select>
        </div>
      </div>
      <Field
        name="city"
        label={t('city')}
        error={errors.city && t(`errors.${errors.city}`)}
      />
      <div className="space-y-1.5">
        <Label htmlFor="dietaryRequirements">{t('dietary')}</Label>
        <Textarea
          id="dietaryRequirements"
          name="dietaryRequirements"
          maxLength={200}
          rows={2}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="accessibilityNeeds">{t('accessibility')}</Label>
        <Textarea
          id="accessibilityNeeds"
          name="accessibilityNeeds"
          maxLength={200}
          rows={2}
        />
      </div>
      <Field name="hearAboutUs" label={t('hearAboutUs')} />

      <fieldset className="space-y-3 rounded-xl bg-[#ECFDF5]/50 p-4 border border-[#E5E2DB]">
        <legend className="px-2 text-xs font-medium uppercase tracking-wide text-[#064E3B]">
          {t('consents')}
        </legend>
        <CheckboxField
          name="consentDataProcessing"
          label={t('consentDataRequired')}
          required
          error={
            errors.consentDataProcessing &&
            t(`errors.${errors.consentDataProcessing}`)
          }
        />
        <CheckboxField name="consentPhotos" label={t('consentPhotos')} />
        <CheckboxField name="consentNewsletter" label={t('consentNewsletter')} />
      </fieldset>

      {errors._form && (
        <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {t(`errors.${errors._form}`)}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#064E3B] hover:bg-[#0D9488] text-white"
      >
        {isPending ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function CheckboxField({
  name,
  label,
  required,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm leading-snug cursor-pointer">
        <input
          type="checkbox"
          name={name}
          required={required}
          className="mt-0.5 size-4 rounded border-[#E5E2DB] text-[#064E3B] focus:ring-[#0D9488]"
        />
        <span className="text-[#1A1A2E]/80">
          {label}
          {required && <span className="ml-0.5 text-red-600">*</span>}
        </span>
      </label>
      {error && <p className="ml-7 text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
