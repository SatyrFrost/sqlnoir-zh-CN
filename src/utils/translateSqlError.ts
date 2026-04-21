// src/utils/translateSqlError.ts
export default function translateSqlError(msg: string): string {
  const m = msg.toLowerCase();

  // Highly specific first
  if (m.includes('near "') && m.includes('syntax error')) {
    // e.g. near "犯罪现场": syntax error → likely missing FROM
    const near = msg.match(/near "(.+?)"/)?.[1] ?? "";
    return `SQL 错误：在 “${near}” 附近出现语法错误（可能是缺少 FROM 或关键字顺序不对）。`;
  }

  if (m.includes('no such table')) {
    const t = msg.match(/no such table:\s*([^\s"]+)/i)?.[1] ?? "（未知表）";
    return `SQL 错误：找不到数据表 “${t}”。请确认表名是否正确。`;
  }

  if (m.includes('no such column')) {
    const c = msg.match(/no such column:\s*([^\s"]+)/i)?.[1] ?? "（未知列）";
    return `SQL 错误：找不到列 “${c}”。请检查列名或使用正确的表别名。`;
  }

  if (m.includes('ambiguous column')) {
    const c = msg.match(/ambiguous column name:\s*([^\s"]+)/i)?.[1] ?? "（列名）";
    return `SQL 错误：列名 “${c}” 含义不明确，请加上表或别名前缀。`;
  }

  if (m.includes('datatype mismatch')) {
    return 'SQL 错误：数据类型不匹配，请检查比较/连接两侧的数据类型。';
  }

  if (m.includes('unique constraint')) {
    return 'SQL 错误：唯一性约束冲突，所插入/更新的值已存在。';
  }

  if (m.includes('foreign key constraint')) {
    return 'SQL 错误：外键约束冲突，请确认引用的主表记录存在。';
  }

  // Fallback: wrap the original message in Chinese
  return `SQL 错误：${msg}`;
}
