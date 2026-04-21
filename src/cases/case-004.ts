import type { Case } from "../types";

const vanishingDiamondCase: Case = {
  id: "case-004",
  title: "消失的钻石",
  difficulty: 2,
  description:
    "著名的“亚特兰蒂斯之心”钻石项链在慈善晚会上突然消失了。",
  xpReward: 250,
  completed: false,
  isNew: true,
  category: "intermediate",
  brief: `在上海著名的“紫御国际酒店”慈善晚会上，著名的“亚特兰蒂斯之心”钻石项链突然从展示台上消失了。`,
  objectives: ["找出偷钻石的人。"],
  solution: {
    answer: "谭俊豪",
    successMessage:
      "出色的侦探工作！证据确凿地表明谭俊豪就是小偷。",
    explanation: `你首先检索了犯罪现场记录并审查了证人证词，其中提到了码头租赁、VIP-R 邀请函的一部分以及一套海军蓝西装。
根据这些线索筛选码头租赁信息返回了多个条目。
与宾客桌和着装登记处进行多重 JOIN 查询返回了一位候选人。
对该候选人的最终采访使其供认不讳。
因此，真正的小偷是谭俊豪。`,
  },
};

export default vanishingDiamondCase;
