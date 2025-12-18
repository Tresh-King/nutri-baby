# 5. 部署指南 (Deployment)

## 5.1 Vercel 部署 (推荐)
本项目针对 Vercel 平台优化，部署最简单。
1. Fork 本仓库到 GitHub。
2. 登录 Vercel，Import 项目。
3. 在 Vercel Settings 中配置环境变量 (`POSTGRES_PRISMA_URL`, `JWT_SECRET`)。
4. 点击 Deploy。

## 5.2 Docker Compose 部署 (自托管)
适合部署在私有服务器或 NAS 环境。

### 前置条件
*   已安装 Docker 和 Docker Compose。

### 部署步骤
1.  **配置环境**: 确保项目根目录存在 `.env` 文件，且数据库连接指向 Docker 内的 DB 服务（或外部 DB）。
    *   若是 Docker 内 DB，Host 请使用 `postgreSQL` Service Name。

2.  **构建与启动**:
    ```bash
    cd deploy/docker
    docker-compose up -d --build
    ```

3.  **验证**:
    访问 `http://localhost:80` (或配置的端口)。

### 架构说明
Docker 部署包含三个容器：
1.  **Frontend**: Nginx 容器，托管构建后的 Vue 静态文件。
2.  **Backend**: Node.js 容器，运行自定义 Express Server (via `ts-node`) 适配 Vercel Functions。
3.  **Database**: PostgreSQL 容器 (可选，也可连接外部数据库)。
