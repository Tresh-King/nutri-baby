# Vercel Postgres 配置指南

本指南将帮助您在 Vercel 平台上创建、配置并关联 PostgreSQL 数据库。

## 1. 创建数据库 (Create Database)

1.  登录 [Vercel Dashboard](https://vercel.com/dashboard)。
2.  点击顶部导航栏的 **Storage** 选项卡。
3.  点击右上角的 **Create Database** 按钮。
4.  选择 **Postgres** (Serverless SQL)。
5.  在弹出的对话框中：
    *   **Store Name**: 输入数据库名称 (例如 `nutri-baby-db`)。
    *   **Region**: 选择一个地理位置 (建议选择与您 Function Region 一致的地区，例如 `Washington, D.C. (iad1)` 或离用户最近的区域)。
6.  点击 **Create**。

## 2. 关联项目 (Connect Project)

数据库创建完成后，您需要将其连接到您的 `nutri-baby-web` 项目。

1.  在刚刚创建的数据库详情页面，点击左侧菜单的 **Projects**。
2.  点击 **Connect Project** 按钮。
3.  在下拉列表中选择您的项目 `nutri-baby-web`。
4.  点击 **Connect**。

> **关键点**: 连接成功后，Vercel 会自动向您的项目注入以下环境变量：
> *   `POSTGRES_URL`
> *   `POSTGRES_PRISMA_URL`
> *   `POSTGRES_URL_NON_POOLING`
> *   `POSTGRES_USER`
> *   `POSTGRES_HOST`
> *   `POSTGRES_PASSWORD`
> *   `POSTGRES_DATABASE`

## 3. 部署与同步 Schema

数据库关联后，您需要部署代码并初始化数据库结构。

1.  **提交代码**: 将本地代码推送到 GitHub/GitLab (Vercel 会自动触发构建)。
2.  **Schema 初始化**:
    *   Vercel 构建过程中会自动安装依赖，但如果你在 `package.json` 中的 `build` 脚本没有包含 `prisma db push`，数据库可能是空的。
    *   **推荐做法**: 在 `package.json` 中配置 `postinstall` 脚本，或者在本地手动推送 Schema 后再部署。

    **本地推送 Schema 到远程数据库 (推荐)**:
    1.  安装 Vercel CLI: `npm i -g vercel`
    2.  拉取环境变量到本地: `vercel env pull .env.production.local`
    3.  重命名文件: 将 `.env.production.local` 的内容复制到 `.env` (或者直接使用该文件)。
    4.  执行推送命令:
        ```bash
        npx prisma db push
        ```
    5.  执行数据填充 (可选):
        ```bash
        npx ts-node prisma/seed.ts
        ```

## 4. 验证连接

1.  部署完成后，访问您的 Vercel 项目 URL。
2.  尝试注册或登录，如果成功，说明数据库连接正常。
3.  您也可以在 Vercel 数据库页面的 **Data** 选项卡中直接查看表结构和数据，确认 `User`、`Baby` 等表已创建。
