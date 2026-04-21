import type { Case } from "../types";

const midnightMasqueradeMurderCase: Case = {
  id: "case-005",
  title: "午夜假面舞会谋杀案",
  difficulty: 5,
  description:
    "在兰亭会所举办的假面舞会上，彭文涛被人谋杀。请跟随线索，揭开真正的凶手身份。",
  xpReward: 300,
  completed: false,
  isNew: false,
  category: "advanced",
  brief: `1987年10月31日，在“兰亭会所”的假面舞会上，彭文涛被发现死于花园中。你能拼凑出所有线索，揭开真正的凶手吗？`,
  objectives: ["揭示这个复杂案件中的真正凶手。"],
  solution: {
    answer: "桑梓诺",
    successMessage:
      "出色的侦探工作！证据确凿地表明桑梓诺是真正的凶手。",
    explanation: `你首先检索了犯罪现场记录并查看了证人陈述，其中提到在华玺礼遇酒店有一笔预订（1987/10/30 的 707 号房）。
	根据这些线索筛选酒店入住记录，返回了多条结果。将其与监控记录进行 JOIN 后，范围被缩小到一条关键记录：该记录注明有一名目标人员在电话中大喊与杀人有关的内容。
	随后你查阅通话记录，发现了一通拨给苗子杰的电话，通话中出现了这句话：“老兄，你为什么要杀了他？你本该让木匠自己做这事！” 接着，
	将终极审讯表与人员表进行关联，并按“木匠”筛选，找到了桑梓诺的认罪陈述。由此可见，真正的凶手是桑梓诺。`,
  },
};

export default midnightMasqueradeMurderCase;
