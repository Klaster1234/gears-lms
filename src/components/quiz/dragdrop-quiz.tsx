'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, GripVertical, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuizResult } from './quiz-result';
import { t } from '@/lib/quiz-text';
import type { DragDropQuiz as DragDropQuizData } from '@/types';

interface DragDropQuizProps {
  quiz: DragDropQuizData;
  passingScore: number;
  onComplete: (result: {
    answers: Record<string, string>;
    score: number;
    totalQuestions: number;
    passed: boolean;
  }) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function DragDropQuiz({ quiz, passingScore, onComplete }: DragDropQuizProps) {
  const shuffledItems = useMemo(() => shuffleArray(quiz.items), [quiz.items]);

  const [pool, setPool] = useState<string[]>(shuffledItems.map((item) => item.id));
  const [categoryItems, setCategoryItems] = useState<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {};
    quiz.categories.forEach((cat) => {
      map[cat.id] = [];
    });
    return map;
  });
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState({ correct: 0, total: 0, passed: false });

  const allPlaced = pool.length === 0;

  const getItemById = useCallback(
    (id: string) => quiz.items.find((item) => item.id === id),
    [quiz.items]
  );

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (checked) return;
      const { source, destination, draggableId } = result;
      if (!destination) return;

      const sourceId = source.droppableId;
      const destId = destination.droppableId;

      if (sourceId === destId) {
        // Reorder within same list
        if (sourceId === 'pool') {
          const newPool = [...pool];
          newPool.splice(source.index, 1);
          newPool.splice(destination.index, 0, draggableId);
          setPool(newPool);
        } else {
          const newItems = [...(categoryItems[sourceId] || [])];
          newItems.splice(source.index, 1);
          newItems.splice(destination.index, 0, draggableId);
          setCategoryItems((prev) => ({ ...prev, [sourceId]: newItems }));
        }
        return;
      }

      // Remove from source
      if (sourceId === 'pool') {
        setPool((prev) => prev.filter((id) => id !== draggableId));
      } else {
        setCategoryItems((prev) => ({
          ...prev,
          [sourceId]: prev[sourceId].filter((id) => id !== draggableId),
        }));
      }

      // Add to destination
      if (destId === 'pool') {
        setPool((prev) => {
          const newPool = [...prev];
          newPool.splice(destination.index, 0, draggableId);
          return newPool;
        });
      } else {
        setCategoryItems((prev) => {
          const newItems = [...(prev[destId] || [])];
          newItems.splice(destination.index, 0, draggableId);
          return { ...prev, [destId]: newItems };
        });
      }
    },
    [checked, pool, categoryItems]
  );

  const handleCheck = useCallback(() => {
    const itemResults: Record<string, boolean> = {};
    const answers: Record<string, string> = {};
    let correctCount = 0;

    Object.entries(categoryItems).forEach(([catId, itemIds]) => {
      itemIds.forEach((itemId) => {
        const item = getItemById(itemId);
        if (item) {
          const isCorrect = item.correctCategory === catId;
          itemResults[itemId] = isCorrect;
          answers[itemId] = catId;
          if (isCorrect) correctCount++;
        }
      });
    });

    setResults(itemResults);
    setChecked(true);

    const totalItems = quiz.items.length;
    const passed = (correctCount / totalItems) * 100 >= passingScore;

    setFinalScore({ correct: correctCount, total: totalItems, passed });
    onComplete({
      answers,
      score: correctCount,
      totalQuestions: totalItems,
      passed,
    });
  }, [categoryItems, getItemById, quiz.items.length, passingScore, onComplete]);

  const handleShowResults = useCallback(() => {
    setFinished(true);
  }, []);

  const handleRetry = useCallback(() => {
    const reshuffled = shuffleArray(quiz.items);
    setPool(reshuffled.map((item) => item.id));
    const newCategoryItems: Record<string, string[]> = {};
    quiz.categories.forEach((cat) => {
      newCategoryItems[cat.id] = [];
    });
    setCategoryItems(newCategoryItems);
    setChecked(false);
    setResults({});
    setFinished(false);
    setFinalScore({ correct: 0, total: 0, passed: false });
  }, [quiz.items, quiz.categories]);

  if (finished) {
    return (
      <QuizResult
        score={finalScore.correct}
        total={finalScore.total}
        passed={finalScore.passed}
        onRetry={handleRetry}
      />
    );
  }

  const gridCols =
    quiz.categories.length <= 3
      ? 'grid-cols-1 sm:grid-cols-3'
      : 'grid-cols-2 sm:grid-cols-3';

  return (
    <div className="space-y-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Item pool */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Drag each item to the correct category
          </h4>
          <Droppable droppableId="pool" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`min-h-[60px] flex flex-wrap gap-2 p-3 rounded-lg border-2 border-dashed transition-colors ${
                  snapshot.isDraggingOver
                    ? 'border-[#33AEB4] bg-[#33AEB4]/5'
                    : 'border-border bg-muted/30'
                }`}
              >
                {pool.length === 0 && !snapshot.isDraggingOver && (
                  <p className="text-sm text-muted-foreground italic w-full text-center py-2">
                    {checked ? 'All items placed!' : 'All items have been placed into categories'}
                  </p>
                )}
                {pool.map((itemId, index) => {
                  const item = getItemById(itemId);
                  if (!item) return null;
                  return (
                    <Draggable
                      key={itemId}
                      draggableId={itemId}
                      index={index}
                      isDragDisabled={checked}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-shadow ${
                            dragSnapshot.isDragging
                              ? 'shadow-lg bg-white border-[#33AEB4] z-50'
                              : 'bg-white border-border shadow-sm hover:shadow'
                          } ${checked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                        >
                          {!checked && (
                            <GripVertical className="size-3.5 text-muted-foreground/50" />
                          )}
                          <span className="text-[#1A1A2E]">{t(item.labelKey)}</span>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Category drop zones */}
        <div className={`grid ${gridCols} gap-3`}>
          {quiz.categories.map((category) => (
            <Droppable key={category.id} droppableId={category.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-lg border-2 transition-all min-h-[120px] ${
                    snapshot.isDraggingOver
                      ? 'border-solid shadow-md'
                      : 'border-dashed'
                  }`}
                  style={{
                    borderColor: snapshot.isDraggingOver
                      ? category.color
                      : `${category.color}80`,
                    backgroundColor: snapshot.isDraggingOver
                      ? `${category.color}15`
                      : `${category.color}08`,
                  }}
                >
                  {/* Category header */}
                  <div
                    className="px-3 py-2 rounded-t-md text-sm font-semibold text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {t(category.labelKey)}
                  </div>

                  {/* Dropped items */}
                  <div className="p-2 space-y-1.5 min-h-[70px]">
                    {(categoryItems[category.id] || []).map((itemId, index) => {
                      const item = getItemById(itemId);
                      if (!item) return null;
                      const isCorrect = results[itemId];
                      const isWrong = checked && isCorrect === false;

                      return (
                        <Draggable
                          key={itemId}
                          draggableId={itemId}
                          index={index}
                          isDragDisabled={checked}
                        >
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
                                checked
                                  ? isCorrect
                                    ? 'border-[#2E7D32] bg-[#2E7D32]/10 text-[#1B5E20]'
                                    : 'border-red-400 bg-red-50 text-red-700'
                                  : dragSnapshot.isDragging
                                    ? 'shadow-lg bg-white border-[#33AEB4]'
                                    : 'bg-white border-border/60 shadow-sm'
                              } ${checked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                            >
                              {!checked && (
                                <GripVertical className="size-3 text-muted-foreground/40 shrink-0" />
                              )}
                              {checked && isCorrect && (
                                <CheckCircle2 className="size-3.5 text-[#2E7D32] shrink-0" />
                              )}
                              {isWrong && (
                                <XCircle className="size-3.5 text-red-500 shrink-0" />
                              )}
                              <span className="flex-1">{t(item.labelKey)}</span>
                              {isWrong && (
                                <span className="text-[10px] text-red-400 shrink-0">
                                  {'\u2192'}{' '}
                                  {t(
                                    quiz.categories.find(
                                      (c) => c.id === item.correctCategory
                                    )?.labelKey ?? ''
                                  )}
                                </span>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!checked ? (
          <Button
            className="bg-[#33AEB4] hover:bg-[#2a9299] text-white"
            disabled={!allPlaced}
            onClick={handleCheck}
          >
            Check Answers
          </Button>
        ) : (
          <Button
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
            onClick={handleShowResults}
          >
            See Results
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
