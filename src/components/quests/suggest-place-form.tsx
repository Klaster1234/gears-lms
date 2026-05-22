'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createSuggestion } from '@/lib/quests/actions';
import { ALL_CATEGORIES } from '@/lib/quests/categories';

export function SuggestPlaceForm() {
  const t = useTranslations('quests.suggest');
  const tc = useTranslations('quests.categories');
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData: FormData) {
    setErrors({});

    startTransition(async () => {
      const result = await createSuggestion({
        suggestedName: (formData.get('suggestedName') as string) ?? '',
        suggestedCategory:
          (formData.get('suggestedCategory') as string) || undefined,
        suggestedAddress:
          (formData.get('suggestedAddress') as string) || undefined,
        suggestedDescription:
          (formData.get('suggestedDescription') as string) || undefined,
        suggesterEmail:
          (formData.get('suggesterEmail') as string) || undefined,
        suggesterName: (formData.get('suggesterName') as string) || undefined,
      });

      if (!result.ok) {
        setErrors(result.errors);
        return;
      }
      setSuccess(true);
    });
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-[#E5E2DB] bg-[#ECFDF5] p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-[#10B981] mb-3" />
        <h2 className="font-display text-2xl text-[#064E3B] mb-2">
          {t('successTitle')}
        </h2>
        <p className="text-sm text-[#1A1A2E]/75">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="suggestedName">
          {t('fields.name')}
          <span className="ml-0.5 text-red-600">*</span>
        </Label>
        <Input id="suggestedName" name="suggestedName" required />
        {errors.suggestedName && (
          <p className="text-xs text-red-600">
            {t(`errors.${errors.suggestedName}`)}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="suggestedCategory">{t('fields.category')}</Label>
        <select
          id="suggestedCategory"
          name="suggestedCategory"
          className="h-10 w-full rounded-md border border-[#E5E2DB] bg-white px-3 text-sm"
        >
          <option value="">—</option>
          {ALL_CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {tc(categoryKey(cat.value))}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="suggestedAddress">{t('fields.address')}</Label>
        <Input id="suggestedAddress" name="suggestedAddress" />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="suggestedDescription">{t('fields.description')}</Label>
        <Textarea
          id="suggestedDescription"
          name="suggestedDescription"
          maxLength={500}
          rows={4}
        />
        {errors.suggestedDescription && (
          <p className="text-xs text-red-600">
            {t(`errors.${errors.suggestedDescription}`)}
          </p>
        )}
      </div>

      <fieldset className="space-y-3 rounded-xl bg-[#FAF8F0] p-4 border border-[#E5E2DB]">
        <legend className="px-2 text-xs font-medium uppercase tracking-wide text-[#064E3B]">
          {t('aboutYou')}
        </legend>
        <div className="space-y-1.5">
          <Label htmlFor="suggesterName">{t('fields.yourName')}</Label>
          <Input id="suggesterName" name="suggesterName" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="suggesterEmail">{t('fields.yourEmail')}</Label>
          <Input id="suggesterEmail" name="suggesterEmail" type="email" />
          {errors.suggesterEmail && (
            <p className="text-xs text-red-600">
              {t(`errors.${errors.suggesterEmail}`)}
            </p>
          )}
        </div>
      </fieldset>

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

function categoryKey(c: string): string {
  switch (c) {
    case 'SECOND_HAND':
      return 'secondHand';
    case 'NO_PACKAGE':
      return 'noPackage';
    default:
      return c.toLowerCase();
  }
}
