'use client';

import { useState } from 'react';
import { PenLine, Sparkles, Target, CheckCircle2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useLearningStore, useStoreHydration } from '@/store/learning-store';
import type { Module } from '@/types';

// ─── Reflection prompts per module ──────────────────────────────────────────

const reflectionPrompts: Record<number, string> = {
  1: 'Think about your daily routines. Where are you already applying the 5R principles without realising it? What is one new 5R practice you could start this week?',
  2: 'Look at your household waste over the past week. What surprised you? Which waste category do you generate the most, and what could you change?',
  3: 'Consider your current food waste habits. What organic materials are you already composting or could start composting? What barriers do you face?',
  4: 'Reflect on your last shopping trip. Did you make any choices you\'d change now? What would a fully sustainable shopping list look like for you?',
  5: 'Think about objects you\'ve recently thrown away. Could any of them have been repaired, repurposed, or shared? How does the circular economy model change your perspective?',
  6: 'Open your wardrobe. How many items have you worn in the past month? What does your clothing say about your consumption habits?',
  7: 'Think about your favourite brands. Have you ever checked their sustainability claims? What would make you switch to a more sustainable alternative?',
  8: 'Walk through your home and identify the top 3 energy consumers. What simple changes could reduce your footprint without reducing comfort?',
  9: 'Think about your local community. What environmental issue affects it most? What would be your first step to organise a community response?',
  10: 'Acknowledge your feelings about environmental challenges. What specific emotion is strongest? How can you channel it into one positive action this week?',
};

// ─── Final challenges per module ────────────────────────────────────────────

const finalChallenges: Record<number, string> = {
  1: 'This week, refuse one single-use item you would normally accept.',
  2: 'Conduct a waste audit: track everything you throw away for 3 days.',
  3: 'Set up a small compost bin (even a kitchen container) and compost for one week.',
  4: 'For your next grocery shop, choose local and seasonal products only.',
  5: 'Find one item you planned to throw away and give it a second life.',
  6: 'Organise a clothes swap with friends or family this month.',
  7: 'Research the certifications of 3 products you regularly buy.',
  8: 'Unplug all standby devices for a week and note the difference.',
  9: 'Attend or organise one community sustainability event this month.',
  10: 'Practise your chosen weekly action consistently for 7 days.',
};

// ─── Constants ──────────────────────────────────────────────────────────────

const MIN_REFLECTION_LENGTH = 50;

// ─── Component ──────────────────────────────────────────────────────────────

interface ReflectTabProps {
  module: Module;
}

export function ReflectTab({ module }: ReflectTabProps) {
  const hydrated = useStoreHydration();
  const saveReflection = useLearningStore((s) => s.saveReflection);
  const savedReflection = useLearningStore((s) => s.reflections[module.id]);
  const reflectCompleted = useLearningStore(
    (s) => s.moduleProgress[module.id]?.reflectCompleted ?? false
  );

  const [text, setText] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const prompt = reflectionPrompts[module.number] ?? '';
  const challenge = finalChallenges[module.number] ?? '';

  const canSave = text.trim().length >= MIN_REFLECTION_LENGTH;

  const handleSave = () => {
    if (!canSave) return;
    saveReflection(module.id, text.trim(), actionPlan.trim());
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (savedReflection) {
      setText(savedReflection.text);
      setActionPlan(savedReflection.actionPlan);
    }
    setIsEditing(true);
  };

  if (!hydrated) {
    return <div className="h-40" />;
  }

  // ─── Saved reflection view ────────────────────────────────────────────────

  if (reflectCompleted && savedReflection && !isEditing) {
    const savedDate = new Date(savedReflection.savedAt);
    const formattedDate = savedDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div className="space-y-8">
        {/* Completed header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#2E7D32]">
            <CheckCircle2 className="size-5" />
            <span className="font-medium text-sm">Reflection saved on {formattedDate}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit3 className="size-3.5" />
            Edit
          </Button>
        </div>

        {/* Prompt reminder */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <PenLine className="size-5 text-[#33AEB4]" />
            <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
              Reflection Prompt
            </h3>
          </div>
          <div className="rounded-lg border-l-4 border-[#33AEB4] bg-[#33AEB4]/5 p-4">
            <p className="text-sm text-[#1A1A2E]/80 leading-relaxed italic">{prompt}</p>
          </div>
        </section>

        <Separator />

        {/* Saved reflection */}
        <section>
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-3">
            Your Reflection
          </h3>
          <Card className="border-border/60">
            <CardContent className="py-4">
              <p className="text-sm text-[#1A1A2E]/80 leading-relaxed whitespace-pre-wrap">
                {savedReflection.text}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Saved action plan */}
        {savedReflection.actionPlan && (
          <>
            <Separator />
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Target className="size-5 text-[#2E7D32]" />
                <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                  My Action Plan
                </h3>
              </div>
              <Card className="border-[#2E7D32]/20 bg-[#2E7D32]/5">
                <CardContent className="py-4">
                  <p className="text-sm text-[#1A1A2E]/80 leading-relaxed whitespace-pre-wrap">
                    {savedReflection.actionPlan}
                  </p>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {/* Final challenge */}
        {challenge && (
          <>
            <Separator />
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="size-5 text-[#F59E0B]" />
                <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                  Final Challenge
                </h3>
              </div>
              <Card className="border-[#F59E0B]/30 bg-[#F59E0B]/5">
                <CardContent className="py-4">
                  <p className="text-sm text-[#1A1A2E] font-medium leading-relaxed">
                    {challenge}
                  </p>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    );
  }

  // ─── Editing / new reflection form ────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* Reflection prompt */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <PenLine className="size-5 text-[#33AEB4]" />
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
            Reflection Prompt
          </h3>
        </div>
        <div className="rounded-lg border-l-4 border-[#33AEB4] bg-[#33AEB4]/5 p-4">
          <p className="text-sm text-[#1A1A2E]/80 leading-relaxed">{prompt}</p>
        </div>
      </section>

      <Separator />

      {/* Reflection textarea */}
      <section>
        <h3 className="font-display text-lg font-semibold text-[#1A1A2E] mb-3">
          Your Reflection
        </h3>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[140px] resize-y text-sm"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {text.trim().length < MIN_REFLECTION_LENGTH ? (
              <>
                Minimum {MIN_REFLECTION_LENGTH} characters
                {text.trim().length > 0 && (
                  <span className="ml-1">
                    ({MIN_REFLECTION_LENGTH - text.trim().length} more needed)
                  </span>
                )}
              </>
            ) : (
              <span className="text-[#2E7D32]">Minimum reached</span>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {text.trim().length} characters
          </p>
        </div>
      </section>

      <Separator />

      {/* Action plan */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Target className="size-5 text-[#2E7D32]" />
          <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
            My Action Plan
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Write one specific micro-commitment you can act on this week.
        </p>
        <Textarea
          value={actionPlan}
          onChange={(e) => setActionPlan(e.target.value)}
          placeholder="I commit to..."
          className="min-h-[80px] resize-y text-sm"
        />
      </section>

      {/* Final challenge */}
      {challenge && (
        <>
          <Separator />
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="size-5 text-[#F59E0B]" />
              <h3 className="font-display text-lg font-semibold text-[#1A1A2E]">
                Final Challenge
              </h3>
            </div>
            <Card className="border-[#F59E0B]/30 bg-[#F59E0B]/5">
              <CardContent className="py-4">
                <p className="text-sm text-[#1A1A2E] font-medium leading-relaxed">
                  {challenge}
                </p>
              </CardContent>
            </Card>
          </section>
        </>
      )}

      <Separator />

      {/* Save button */}
      <div className="flex justify-center py-2">
        <Button
          size="lg"
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
          onClick={handleSave}
          disabled={!canSave}
        >
          <CheckCircle2 className="size-4" />
          Save Reflection
        </Button>
      </div>
    </div>
  );
}
