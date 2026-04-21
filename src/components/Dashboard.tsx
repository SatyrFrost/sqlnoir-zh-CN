import { useState, useEffect } from "react";
import { CaseFile } from "./CaseFile";
import { Lock, RotateCcw } from "lucide-react";
import { cases, categories } from "../cases";

const SECRET_WORD = "answers";             // type this on the dashboard
const ANSWERS_URL = encodeURI("/SQL Noir Answers and Explanations 答案和解释.docx");

interface DashboardProps {
  onCaseSelect: (caseData: any) => void;
  solvedCases: string[];
  onResetAll?: () => void; // small Reset button will show if provided
}

export function Dashboard({ onCaseSelect, solvedCases, onResetAll }: DashboardProps) {
  const [_, setDummy] = useState(false); // dummy for re-renders

  // --- Secret keyboard listener: type "answers" to download the doc ---
  useEffect(() => {
    let buffer = "";
    let timerId: number | null = null;

    const onKeyDown = (e: KeyboardEvent) => {
      // ignore inputs/textareas/contenteditable & modifier combos
      const tgt = e.target as HTMLElement | null;
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        (tgt &&
          (tgt.tagName === "INPUT" ||
            tgt.tagName === "TEXTAREA" ||
            tgt.isContentEditable))
      ) {
        return;
      }

      const key = e.key.length === 1 ? e.key.toLowerCase() : "";
      if (!key) return;

      buffer += key;

      // keep only a valid prefix of SECRET_WORD
      if (!SECRET_WORD.startsWith(buffer)) {
        buffer = key === SECRET_WORD[0] ? SECRET_WORD[0] : "";
      }

      // reset buffer if idle for 1.5s
      if (timerId) window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        buffer = "";
      }, 1500);

      // trigger download when matched
      if (buffer === SECRET_WORD) {
        buffer = "";
        const a = document.createElement("a");
        a.href = ANSWERS_URL;
        a.download = "SQLNoir-Answers.docx";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timerId) window.clearTimeout(timerId);
    };
  }, []);

  const isCaseUnlocked = (caseId: string) => {
    const allCases = Object.values(cases).flat();
    const thisCase = allCases.find((c) => c.id === caseId);
    if (!thisCase) return false;

    const categoryCases = cases[thisCase.category as keyof typeof cases];
    const indexInCategory = categoryCases.findIndex((c) => c.id === caseId);

    if (indexInCategory === 0) {
      if (thisCase.category === "beginner") return true;

      if (thisCase.category === "intermediate") {
        const beginnerCases = cases["beginner"];
        return beginnerCases.every((c) => solvedCases.includes(c.id));
      }

      if (thisCase.category === "advanced") {
        const intermediateCases = cases["intermediate"];
        return intermediateCases.every((c) => solvedCases.includes(c.id));
      }
    }

    const prevCase = categoryCases[indexInCategory - 1];
    return solvedCases.includes(prevCase.id);
  };

  return (
    <div className="min-h-screen bg-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-detective text-3xl text-amber-900">Case Files</h2>

          {onResetAll && (
            <button
              onClick={onResetAll}
              title="清除所有已完成案件与笔记"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-red-200 text-red-700 hover:bg-red-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset 重置</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center space-x-2">
                <category.icon className="w-5 h-5 text-amber-700" />
                <h3 className="font-detective text-xl text-amber-800">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cases[category.id as keyof typeof cases].map((caseData) => {
                  const isUnlocked = isCaseUnlocked(caseData.id);
                  const isSolved = solvedCases.includes(caseData.id);

                  return (
                    <div key={caseData.id} className="relative">
                      <CaseFile
                        caseData={caseData}
                        onClick={() => isUnlocked && onCaseSelect(caseData)}
                        isSolved={isSolved}
                      />
                      {!isUnlocked && (
                        <div className="absolute inset-0 bg-amber-900/10 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
                          <div className="bg-amber-100 px-4 py-2 rounded-full flex items-center shadow-lg transform -rotate-12">
                            <Lock className="w-4 h-4 mr-2 text-amber-700" />
                            <span className="font-detective text-amber-900">
                              解开上一案件以解锁
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
