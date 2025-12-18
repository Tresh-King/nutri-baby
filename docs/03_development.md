# 3. 开发指南 (Development)

## 3.1 环境准备
*   Node.js v18+
*   PostgreSQL 14+ (本地或云端)
*   Git

## 3.2 快速开始

1.  **克隆项目**
    ```bash
    git clone https://your-repo/nutri-baby-web.git
    cd nutri-baby-web
    ```

2.  **安装依赖**
    ```bash
    npm install
    cd frontend && npm install && cd ..
    ```

3.  **环境配置**
    复制 `.env.example` 为 `.env` 并填入数据库连接信息。
    ```bash
    cp .env.example .env
    ```

4.  **数据库初始化**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **启动开发服务器**
    ```bash
    # 同时启动前端和后端 API 模拟
    vercel dev
    ```
    访问: `http://localhost:3000`

## 3.3 常用命令
| 命令 | 说明 |
| :--- | :--- |
| `npm run dev` (root) | 仅启动 Vercel 开发环境 |
| `npm run dev` (frontend) | 仅启动前端 Vite 开发环境 |
| `npx prisma studio` | 打开 Prisma 数据库管理界面 |
| `frontend/npm run build` | 构建前端生产代码 |

## 3.4 API 开发规范
*   新建 API 文件于 `api/` 目录下。
*   文件名对应路由路径 (例如 `api/user/[id].ts` 对应 `/api/user/:id`)。
*   使用 `export default async function handler(req, res)` 导出处理函数。
*   始终使用 `lib/prisma` 导入单例数据库客户端。
