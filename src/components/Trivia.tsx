"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const QUESTIONS: Question[] = [
  {
    question: "מה זז בכל שעה עגולה בשעון האסטרונומי בכיכר העיר העתיקה?",
    options: ["פסלי השליחים", "הנשר הזהוב", "פעמוני הכנסייה", "גלגל ענק"],
    correctIndex: 0,
  },
  {
    question:
      "מי היה היצור המסתורי שנוצר מבוץ ברובע היהודי כדי להגן על העיר?",
    options: ["הגולם מפראג", "הדרקון של פראג", "אביר הברזל", "רוח הטירה"],
    correctIndex: 0,
  },
  {
    question: "איזה נהר מפורסם חוצה את פראג ועובר מתחת לגשר קארל?",
    options: ["נהר הדנובה", "נהר הוולטאבה", "נהר האלבה", "נהר הריין"],
    correctIndex: 1,
  },
  {
    question: "בערך כמה פסלים מקשטים את גשר קארל?",
    options: ["12", "30", "50", "8"],
    correctIndex: 1,
  },
  {
    question: "איך קוראים לטירה הגדולה שמשקיפה על פראג מעל הגבעה?",
    options: ["טירת קרלשטיין", "טירת פראג", "ארמון שנברון", "מצודת אדינבורו"],
    correctIndex: 1,
  },
];

export default function Trivia() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = QUESTIONS[index];
  const isLastQuestion = index === QUESTIONS.length - 1;
  const isFinished = index === QUESTIONS.length;

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setIndex((i) => i + 1);
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
  };

  if (isFinished) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
      >
        <span className="text-3xl">🏆</span>
        <h3 className="text-lg font-semibold">כל הכבוד!</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          עניתם נכון על {score} מתוך {QUESTIONS.length} שאלות.
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-2 rounded-full bg-rose-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-rose-900"
        >
          לשחק שוב
        </button>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          🎯 טריוויה משפחתית — פראג
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          שאלה {index + 1} מתוך {QUESTIONS.length}
        </span>
      </div>

      <p className="text-sm font-medium leading-snug">{question.question}</p>

      <div className="flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrectOption = optionIndex === question.correctIndex;

          let stateClasses =
            "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900";
          if (selected !== null) {
            if (isCorrectOption) {
              stateClasses =
                "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200";
            } else if (isSelected) {
              stateClasses =
                "border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-200";
            } else {
              stateClasses =
                "border-zinc-100 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/40 dark:text-zinc-500";
            }
          }

          return (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleSelect(optionIndex)}
              disabled={selected !== null}
              className={`rounded-xl border px-4 py-2.5 text-right text-sm font-medium transition-colors ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="flex items-center justify-between">
          <p
            className={`text-sm font-medium ${
              selected === question.correctIndex
                ? "text-emerald-700 dark:text-emerald-300"
                : "text-rose-700 dark:text-rose-300"
            }`}
          >
            {selected === question.correctIndex ? "כל הכבוד, נכון!" : "לא בדיוק — התשובה הנכונה מסומנת בירוק."}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-rose-950 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-900"
          >
            {isLastQuestion ? "לסיכום" : "השאלה הבאה"}
          </button>
        </div>
      )}
    </div>
  );
}
