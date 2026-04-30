import { Lightbulb, CheckCircle } from "lucide-react";

export function HintsAndTips() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-100/50 p-6 rounded-lg border border-amber-900/10">
        <h3 className="font-detective text-xl text-amber-900 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2" />
          调查提示
        </h3>
        <ul className="space-y-4">
          {[
            {
              title: "检查 NULL 值",
			  description:
			    "使用 IS NULL 查找关键字段中信息缺失的记录。",
			  example: 
			    "SELECT * FROM Orders WHERE ShipDate IS NULL;",
            },
            {
              title: "连接多张表",
              description:
                "使用 JOIN 将订单信息与客户信息关联起来。",
              example:
                "SELECT o.*, c.CompanyName FROM Orders o JOIN Customers c ON o.CustomerID = c.CustomerID;",
            },
            {
              title: "按日期范围筛选",
              description:
                "使用 BETWEEN 查找指定日期范围内的订单。",
              example:
                "SELECT * FROM Orders WHERE OrderDate BETWEEN '1998-03-01' AND '1998-04-30';",
            },
          ].map((tip, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg border border-amber-200"
            >
              <h4 className="font-detective text-amber-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-amber-700" />
                {tip.title}
              </h4>
              <p className="text-amber-800 mb-2 text-sm">{tip.description}</p>
              <pre className="bg-amber-50 p-2 rounded font-mono text-xs text-amber-800">
                {tip.example}
              </pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
