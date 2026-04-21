import { Case } from "../types";
import { Search, Award, Database } from "lucide-react";
import vanishingBriefcaseCase from "./case-001";
import theStolenSound from "./case-002";
import miamiMarinaMurderCase from "./case-003";
import vanishingDiamondCase from "./case-004";
import midnightMasqueradeMurderCase from "./case-005";
import artBaselAssassinationCase from "./case-006";


// Export all cases
export const cases: Record<string, Case[]> = {
  beginner: [vanishingBriefcaseCase, theStolenSound],
  intermediate: [miamiMarinaMurderCase, vanishingDiamondCase],
  advanced: [midnightMasqueradeMurderCase, artBaselAssassinationCase],
};

// Export categories with metadata
export const categories = [
  {
    id: "beginner",
    title: "初学者案例",
    icon: Search,
    requiredXP: 0,
    description:
      "非常适合 SQL 新手。学习查询和数据分析的基础知识。",
  },
  {
    id: "intermediate",
    title: "中级案件",
    icon: Database,
    requiredXP: 100,
    description:
      "适合具有基本 SQL 知识的调查人员。能够处理更复杂的查询和优化。",
  },
  {
    id: "advanced",
    title: "高级案例",
    icon: Award,
    requiredXP: 300,
    description:
      "需要深厚 SQL 知识和解决问题能力的专家级案例。",
  },
];

// Export individual cases for direct imports
export {
  vanishingBriefcaseCase,
  theStolenSound,
  miamiMarinaMurderCase,
  midnightMasqueradeMurderCase,
  artBaselAssassinationCase,
  vanishingDiamondCase,
};
