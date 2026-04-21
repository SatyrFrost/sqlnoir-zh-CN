import type { Case } from "../types";

const miamiMarinaMurderCase: Case = {
  id: "case-003",
  title: "上海码头谋杀案", // The Shanghai Marina Murder
  difficulty: 2, // 中级难度（多步骤、线索式）
  description:
    "一具尸体在“珊瑚湾码头”被发现。两名嫌疑人最后一次被看到在案发现场附近。找出凶手，将其绳之以法。",
  xpReward: 200,
  completed: false,
  isNew: false,
  category: "intermediate",
  brief: `1986年8月14日凌晨，一具尸体在“珊瑚湾码头”附近水中被发现。侦探，你的任务是找出凶手，并将其绳之以法。
本案可能需要使用 JOIN 查询、通配符搜索和逻辑推理。开始行动吧，侦探。`,
  objectives: [
    "找出凶手。（从案发现场入手，然后顺藤摸瓜）",
  ],
  solution: {
    answer: "黄语嫣",
    successMessage:
      "干得好，侦探！黄语嫣已承认犯罪事实。",
    explanation: `调查从案发现场的两名嫌疑人开始，一个人住在“海洋大道”，另一个人有一个与蛇有关的别名。
在对他们进行讯问后，通过两个线索过滤了酒店入住记录——先是按日期，再结合监控录像进一步筛选。
只有三人符合两个条件。
对这三人逐一询问后，黄语嫣 最终承认了犯罪事实。`,
  },
};

export default miamiMarinaMurderCase;
