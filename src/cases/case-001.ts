import type { Case } from "../types";

const vanishingBriefcaseCase: Case = {
  id: "case-001",
  title: "消失的公文包",
  difficulty: 1, // 简单（3步）
  description:
    "一个装有机密文件的公文包在“蓝调笔记酒廊”消失了。请跟随线索找出小偷。",
  xpReward: 50,
  completed: false,
  isNew: false,
  category: "beginner",
  brief:
    "故事发生在充满犯罪气息的1980年代，一个贵重的公文包在“蓝调笔记酒廊”失踪了。有目击者称一名穿风衣的男子被看到逃离现场。请调查犯罪现场，查看嫌疑人列表，并分析采访记录，以找出罪犯。",
  objectives: [
    "检索正确的犯罪现场信息以获取关键线索。",
    "确认与目击者描述相符的嫌疑人。",
    "通过采访记录验证嫌疑人身份。",
  ],
  solution: {
    answer: "赵俊豪",
    successMessage:
      "恭喜你，侦探！你成功地确认了赵俊豪就是罪犯。",
    explanation: `首先，你从 '犯罪现场' 表中检索到了犯罪现场的细节，提到了一名左脸有疤、穿风衣的男子。接着，查询 '嫌疑人' 表将范围缩小到两人。最后，通过查看 '讯问' 表，确认了赵俊豪确实偷了公文包。`,
  },
};

export default vanishingBriefcaseCase;
