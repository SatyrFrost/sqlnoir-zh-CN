import { useState, useMemo, useEffect } from "react";
import {
  Book,
  Code,
  Send,
  Database,
  ArrowLeft,
  PenLine,
  Columns,
  LayoutGrid,
} from "lucide-react";
import { CaseBrief } from "./case-study/CaseBrief";
import { SQLWorkspace } from "./case-study/SQLWorkspace";
import { SolutionSubmission } from "./case-study/SolutionSubmission";
import { DatabaseSchema } from "./case-study/DatabaseSchema";
import { CaseNotes } from "./case-study/CaseNotes";
import type { Case } from "../types";

const tabs = [
  { id: "brief", label: "案件概要", icon: Book },
  { id: "workspace", label: "SQL 查询区", icon: Code },
  { id: "schema", label: "数据库结构", icon: Database },
  { id: "notes", label: "调查笔记", icon: PenLine, desktopOnly: true },
  { id: "submit", label: "提交答案", icon: Send },
];

interface CaseSolverProps {
  caseData: Case;
  onBack: () => void;
  onSolve: () => void;
}

export function CaseSolver({ caseData, onBack, onSolve }: CaseSolverProps) {
  const [activeTab, setActiveTab] = useState("brief");
  const [isSolved, setIsSolved] = useState(false);
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [secondaryTab, setSecondaryTab] = useState("schema");
  const [activeTabSelector, setActiveTabSelector] = useState<1 | 2>(1);

  // === Back button guard: intercept browser back while CaseSolver is mounted ===
  useEffect(() => {
    const pushGuard = () =>
      history.pushState({ sqlnoir_guard: true, at: location.pathname }, "");

    pushGuard();

    const onPop = (e: PopStateEvent) => {
      if (!e.state || e.state.sqlnoir_guard) {
        pushGuard();
        const ok = window.confirm("退出本案件并返回案件列表？");
        if (ok) {
          window.removeEventListener("popstate", onPop);
          onBack();
        }
      }
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [onBack]);
  // === End back button guard ===

  const handleSideBySideToggle = () => {
    if (isSideBySide) {
      setSecondaryTab("schema");
      setActiveTabSelector(1);
    }
    setIsSideBySide(!isSideBySide);
  };

  const handleCaseSolved = () => {
    setIsSolved(true);
    onSolve();
  };

  const tabComponents = useMemo(
    () => ({
      brief: <CaseBrief caseData={caseData} />,
      workspace: <SQLWorkspace caseId={caseData.id} />,
      schema: <DatabaseSchema caseId={caseData.id} />,
      notes: <CaseNotes caseId={caseData.id} />,
      submit: (
        <SolutionSubmission caseData={caseData} onSolve={handleCaseSolved} />
      ),
    }),
    [caseData]
  );

  const handleTabClick = (tabId: string) => {
    if (isSideBySide) {
      if (activeTabSelector === 1) {
        setActiveTab(tabId);
      } else {
        setSecondaryTab(tabId);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-amber-100 border-b border-amber-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex items-center text-amber-900 hover:text-amber-700 font-detective"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回案件列表
          </button>
          <span className="font-mono text-amber-900 text-sm">
            案号：{caseData.id.split("-")[1]}
          </span>
        </div>

        {/* Mobile Navigation */}
        <div className="border-t border-amber-200 overflow-x-auto">
          <div className="flex p-2 gap-2 min-w-full justify-center lg:justify-start">
            {tabs
              .filter((tab) => !tab.desktopOnly)
              .map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center px-3 py-2 rounded-lg font-detective text-sm whitespace-nowrap ${
                      isActive
                        ? "bg-amber-200 text-amber-900"
                        : "bg-amber-100/50 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    {isActive ? (
                      <Icon className="w-4 h-4 mr-2" />
                    ) : (
                      <Icon className="w-4 h-4 lg:mr-2" />
                    )}
                    {isActive ? tab.label : ""}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-amber-900 hover:text-amber-700 font-detective"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回案件列表
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSideBySideToggle}
              className={`flex items-center px-3 py-1.5 rounded-lg font-detective text-sm ${
                isSideBySide
                  ? "bg-amber-200 text-amber-900"
                  : "bg-amber-100/50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              {isSideBySide ? (
                <LayoutGrid className="w-4 h-4 mr-2" />
              ) : (
                <Columns className="w-4 h-4 mr-2" />
              )}
              {isSideBySide ? "上下分栏视图" : "并排视图"}
            </button>
            <div className="bg-amber-100 px-4 py-2 rounded-lg">
              <span className="font-mono text-amber-900">
                案号：{caseData.id.split("-")[1]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8 mt-4 lg:mt-0">
        <div className="bg-amber-50 rounded-lg shadow-lg border border-amber-900/10">
          {/* Desktop Navigation */}
          <div className="hidden lg:block border-b border-amber-900/10">
            <div className="flex items-center justify-between">
              <div className="flex">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActiveInTab1 = activeTab === tab.id;
                  const isActiveInTab2 =
                    isSideBySide && secondaryTab === tab.id;
                  const isActive = isActiveInTab1 || isActiveInTab2;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab.id)}
                      className={`flex items-center px-6 py-4 font-detective text-sm focus:outline-none whitespace-nowrap ${
                        isActive
                          ? `bg-amber-100 text-amber-900 border-b-2 ${
                              isActiveInTab1
                                ? "border-amber-900"
                                : "border-amber-500"
                            }`
                          : "text-amber-700 hover:bg-amber-100/50"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                      {isSideBySide && isActive && (
                        <span className="ml-2 text-xs opacity-75">
                          {isActiveInTab1 ? "（窗口 1）" : "（窗口 2）"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {isSideBySide && (
                <div className="flex items-center gap-2 bg-amber-100 rounded-lg p-1 mr-4">
                  <button
                    onClick={() => setActiveTabSelector(1)}
                    className={`px-3 py-1.5 rounded-md font-detective text-sm transition-colors ${
                      activeTabSelector === 1
                        ? "bg-amber-200 text-amber-900"
                        : "text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    窗口 1
                  </button>
                  <button
                    onClick={() => setActiveTabSelector(2)}
                    className={`px-3 py-1.5 rounded-md font-detective text-sm transition-colors ${
                      activeTabSelector === 2
                        ? "bg-amber-200 text-amber-900"
                        : "text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    窗口 2
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div
            className={`p-4 lg:p-6 ${
              isSideBySide ? "lg:flex lg:gap-6 overflow-hidden" : ""
            }`}
          >
            <div className={`${isSideBySide ? "lg:w-1/2 min-w-0" : ""}`}>
              {isSideBySide && (
                <div className="mb-4 text-sm font-detective text-amber-900">
                  窗口 1
                </div>
              )}
              {Object.entries(tabComponents).map(([id, component]) => (
                <div key={id} className={activeTab === id ? "" : "hidden"}>
                  {component}
                </div>
              ))}
            </div>
            {isSideBySide && (
              <div className="hidden lg:block lg:w-1/2 min-w-0 border-l border-amber-200 pl-6">
                <div className="mb-4 text-sm font-detective text-amber-900">
                  窗口 2
                </div>
                {Object.entries(tabComponents).map(([id, component]) => (
                  <div key={id} className={secondaryTab === id ? "" : "hidden"}>
                    {component}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
