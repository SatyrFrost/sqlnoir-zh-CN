# SQL Noir SQL黑探  🔍

[➡️ Play the game online at noir.great-site.net](https://noir.great-site.net/)

## Acknowledgements

This project was inspired by **SQL Noir** at `sqlnoir.com`.

The original concept, theme, and gameplay format come from SQL Noir.  
This version is an independent educational adaptation created for teaching and classroom use, with localized content and custom cases.

All credit for the original game idea and creative foundation belongs to the creator of SQL Noir.

Step into the shoes of a real detective and solve crimes using SQL! SQL Noir is an interactive mystery-solving game where you crack cases by writing SQL queries.

## About

Welcome to SQL Noir, where you're a data detective solving criminal cases through the power of SQL. Each case file presents you with a unique crime scenario and a database full of evidence. Your mission is to:

- Uncover suspicious patterns in the data
- Track down missing records
- Connect the dots between suspects
- Expose fraudulent transactions
- Piece together the evidence using SQL

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Go to [Supabase](https://supabase.com/) and create a new project
4. Copy the generated `anon public key` and `Project URL` from the project
5. Create a `.env.local` file at the root of the project and set the following environment variables:
   ```bash
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_SUPABASE_URL=your_supabase_url
   ```
6. Install Supabase CLI:

   - Follow the instructions at [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)

7. Login to Supabase:

   ```bash
   supabase login
   ```

8. Link your project ( You need to be in the root of the project to run this command ):

   ```bash
   supabase link
   ```

   - Select the project you just created when prompted

9. Run database migrations:

   ```bash
   supabase db push
   ```

10. Start the development server:

    ```bash
    npm run dev
    ```

11. Open your browser and navigate to `http://localhost:5173`

## Case Files

Each case in SQL Noir is a unique crime that needs solving. Cases range from simple thefts to complex murders, organized by difficulty level. Put your SQL skills to the test and climb the ranks from rookie to master detective.

## Join the Detective Agency

We welcome new detectives! Whether you want to:

- Submit new cases for others to solve
- Improve existing investigations
- Fix bugs in the system
- Enhance the detective interface
- Improve documentation

Check the [Contributing Guidelines](CONTRIBUTING.md) to join the force and help make SQL Noir even better.


像一名真正的侦探一样，使用 SQL 破案！SQL Noir 是一款互动式推理游戏，你需要通过编写 SQL 查询来破解案件。

## 关于

欢迎来到 SQL Noir。在这里，你是一名“数据侦探”，通过 SQL 的力量侦破刑事案件。每个案件档案都会给你呈现一个独特的犯罪场景，以及一个充满证据的数据库。你的任务是：

- 找出数据中的可疑模式
- 追踪缺失的记录
- 连接嫌疑人之间的线索
- 揭露欺诈交易
- 使用 SQL 拼凑证据链

## 快速开始

1. 克隆此仓库
2. 安装依赖：
   ```bash
   npm install

3. 并创建一个新项目
4. 从项目中复制生成的 anon public key 和 Project URL
5. 在项目根目录创建一个 .env.local 文件，并设置以下环境变量：
   ```bash
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_SUPABASE_URL=your_supabase_url


6. 请按照 Supabase CLI
    中的说明进行安装
7. 登录 Supabase：
   ```bash
   supabase login
9. 关联你的项目（运行此命令时，你需要位于项目根目录）：
   ```bash
   supabase link

出现提示时，选择你刚刚创建的项目
10. 运行数据库迁移：
   ```bash
   supabase db push
```
11. 启动开发服务器：
 ```bash
   npm run dev
```
12. 打开浏览器并访问 http://localhost:5173

案件档案

SQL Noir 中的每个案件都是一宗等待你侦破的独特犯罪案件。案件从简单的盗窃案到复杂的谋杀案不等，并按难度等级进行分类。用你的 SQL 技能迎接挑战，从菜鸟侦探一步步成长为王牌神探。

加入侦探事务所

我们欢迎新的侦探加入！无论你想要：

提交新案件供他人破解
改进现有调查内容
修复系统中的错误
优化侦探界面
完善项目文档

请查看 贡献指南
，加入侦探队伍，一起让 SQL Noir 变得更出色。
