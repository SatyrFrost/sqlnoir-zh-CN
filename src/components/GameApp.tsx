import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { BsIncognito } from "react-icons/bs";
import { SharePopup } from "./SharePopup";
import { CaseSolver } from "./CaseSolver";
import { Dashboard } from "./Dashboard";

/** Tiny modal confirm for Reset All */
function ConfirmModal({
  open,
  title = "确定要重置进度吗？",
  message = "这将清除所有已完成案件和笔记，且无法恢复。",
  confirmText = "确认重置",
  cancelText = "取消",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-[90%] max-w-md rounded-xl bg-white shadow-2xl border border-amber-200 p-5">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">{title}</h3>
        <p className="text-amber-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-lg border border-amber-200 text-amber-800 hover:bg-amber-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function GameApp() {
  const [started, setStarted] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);

  // Reset All modal state
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("unlockedCases") || "[]");
    setSolvedCases(stored);
  }, []);

  // Darker bg only on landing
  useEffect(() => {
    const cls = "gameapp-landing";
    if (!started && !selectedCase) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
    return () => document.body.classList.remove(cls);
  }, [started, selectedCase]);

  const handleCaseSolved = (caseId: string) => {
    setSolvedCases((prev) => {
      const updated = prev.includes(caseId) ? prev : [...prev, caseId];
      localStorage.setItem("unlockedCases", JSON.stringify(updated));
      return updated;
    });
  };

  // Reset All: ask first, then clear storage + state
  const handleResetAllRequest = () => setConfirmOpen(true);

  const handleResetAllConfirm = () => {
    localStorage.removeItem("unlockedCases");

    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)!;
      if (
        k.toLowerCase().includes("notes") ||
        k.startsWith("sqlnoir:notes:") ||
        k.startsWith("caseNotes:") ||
        /^notes[_:]/i.test(k)
      ) {
        toRemove.push(k);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));

    setSolvedCases([]);
    window.dispatchEvent(new Event("sqlnoir:reset"));
    setConfirmOpen(false);
  };

  const handleResetAllCancel = () => setConfirmOpen(false);

  if (selectedCase) {
    return (
      <>
        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={() => setIsSharePopupOpen(false)}
        />
        <ConfirmModal
          open={confirmOpen}
          onConfirm={handleResetAllConfirm}
          onCancel={handleResetAllCancel}
        />
        <CaseSolver
          caseData={selectedCase}
          onBack={() => setSelectedCase(null)}
          onSolve={() => handleCaseSolved(selectedCase.id)}
        />
      </>
    );
  }

  if (started) {
    return (
      <>
        <SharePopup
          isOpen={isSharePopupOpen}
          onClose={() => setIsSharePopupOpen(false)}
        />
        <ConfirmModal
          open={confirmOpen}
          onConfirm={handleResetAllConfirm}
          onCancel={handleResetAllCancel}
        />
        <Dashboard
          onCaseSelect={setSelectedCase}
          solvedCases={solvedCases}
          onResetAll={handleResetAllRequest} // small button shows on the 6-cases page
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/50 flex flex-col items-center justify-center p-4 md:p-8">
      <SharePopup
        isOpen={isSharePopupOpen}
        onClose={() => setIsSharePopupOpen(false)}
      />
      <ConfirmModal
        open={confirmOpen}
        onConfirm={handleResetAllConfirm}
        onCancel={handleResetAllCancel}
      />
      <div className="w-full max-w-xl mx-auto text-center space-y-12">
        <div className="flex items-center justify-center">
          <div className="w-40 h-40 relative mb-4 flex items-center justify-center">
            <BsIncognito className="w-full h-full text-amber-900 relative" />
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="font-detective text-5xl md:text-8xl text-amber-900 drop-shadow-lg">
            SQL黑探
          </h1>
        <p className="text-xl md:text-2xl text-amber-800 font-detective">
            用 SQL 破案
          </p>

          <button
            onClick={() => setStarted(true)}
            className="group bg-amber-800/90 hover:bg-amber-700/90 text-amber-100 px-10 py-5 rounded-lg 
                       text-2xl font-detective transition-all duration-300 transform hover:scale-105 
                       flex items-center justify-center mx-auto shadow-lg hover:shadow-xl
                       focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
          >
            开始调查
            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
	  <div className="fixed bottom-4 right-4 text-right text-xs md:text-sm text-amber-200/80 leading-relaxed">
		<div>改编自 Hristo Bogoev 创作的 SQL Noir</div>
		<div>
			<a
			  href="https://sqlnoir.com"
			  target="_blank"
			  rel="noopener noreferrer"
			  className="underline hover:text-amber-100 transition-colors"
			>
			sqlnoir.com
			</a>
		</div>
	  </div>
    </div>
  );
}
