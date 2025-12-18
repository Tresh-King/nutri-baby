# Nutri-Baby Web 迁移项目说明文档

本文档详细说明了 Nutri-Baby 应用从 Uni-app/Go 迁移至 Vue 3/Node.js Serverless 架构的过程、环境配置及部署指南。

## 1. 架构调整说明 (Architecture)

### 1.1 总体架构

原有架构为基于 **Uni-app** 的跨平台前端配合 **Go (Gin+Gorm)** 的传统后端服务。
新的架构采用了 **Web First** 策略，针对 **Vercel** 平台进行了深度优化：

| 组件 | 原有方案 (Legacy) | 新方案 (New) | 优势 |
| :--- | :--- | :--- | :--- |
| **前端** | Uni-app (Vue 3 DSL) | **Vue 3 + Vite + Element Plus** | 标准 Web 技术栈，开发体验更佳，生态库更丰富 (如 ECharts)。 |
| **后端** | Go (Gin Framework) | **Node.js Serverless Functions** | 无需运维服务器，与 Vercel 托管完美集成，冷启动快，成本低。 |
| **数据库** | PostgreSQL (Gorm) | **Vercel Postgres (Prisma ORM)** | 类型安全，无需手动管理连接池，开发效率高。 |
| **部署** | 传统服务器/容器 | **Vercel** | 一键部署，全球 CDN 加速。 |

### 1.2 前端重构细节 (`frontend/`)
- **路由管理**: 从 `uni.navigateTo` 迁移至标准 `vue-router`。
- **状态管理**: 使用 `Pinia` 替代 Vuex 或全局变量，模块化管理 `User`、`Baby`、`Record` 状态。
- **UI 组件**: 替换 `wot-design-uni` 为 `Element Plus`，更适合桌面/移动端 Web 展示。
- **数据可视化**: 引入 `Vue-ECharts` 实现宝宝生长曲线和喂养统计图表。

### 1.3 后端重构细节 (`api/`)
- **API 路由**: 利用 Vercel 的文件系统路由 (`api/auth/login.ts` -> `/api/auth/login`)。
- **数据访问**: 使用 `Prisma` 定义 Schema (`prisma/schema.prisma`)，自动生成类型安全的数据库客户端。
- **认证**: 自研标准认证系统 (Phone/Password + JWT)，移除了原有的 Mock 微信登录。

### 1.4 新增功能说明 (New Features)
1. **标准认证 (Auth)**: 支持手机号注册与密码登录，提供更通用的访问方式。
2. **家庭协作 (Collaboration)**:
   - 支持生成 24小时有效的一次性邀请链接。
   - 允许家庭成员以不同权限 (Admin/Editor) 加入。
3. **生长标准 (Growth Standards)**:
   - 内置 WHO 0-12个月生长曲线数据。
   - 统计图表自动叠加 P50 标准线，辅助健康分析。
4. **AI 智能分析 (AI Insights)**:
   - 集成 Gemini API，基于宝宝近期喂养、睡眠记录生成健康建议。
   - 首页增加智能分析卡片。

---

## 2. 环境配置与部署指南 (Deployment & Setup)

### 2.1 本地开发环境配置

#### 前置要求
- Node.js (v18+)
- Vercel CLI (`npm i -g vercel`)

#### 步骤 1: 安装依赖
在项目根目录执行：
```bash
npm install
cd frontend
npm install
cd ..
```

#### 步骤 2: 配置环境变量 (`.env`)
项目根目录缺少 `.env` 文件会导致数据库连接失败。请复制 `.env.example` 为 `.env` 并填入真实值。

1. 复制模板：
   ```bash
   cp .env.example .env
   ```
2. 编辑 `.env` 文件：
   - `POSTGRES_PRISMA_URL`: 填入你的 Vercel Postgres 数据库连接串 (Pooling模式)。
   - `POSTGRES_URL_NON_POOLING`: 填入数据库连接串 (Non-Pooling模式)。
   - `JWT_SECRET`: 设置一个安全的密钥用于 Token 加密。
   - `AI_API_KEY`: 设置 AI 服务提供商 (如 Gemini) 的 API Key，用于智能分析功能。

#### 步骤 3: 数据库同步
确保 Schema 与数据库同步：
```bash
npx prisma generate  # 生成 Prisma Client
npx prisma db push   #推送 Schema 到数据库
```

#### 步骤 4: 启动本地开发服务
使用 Vercel CLI 模拟真实的 Serverless环境：
```bash
vercel dev
```
此命令会同时启动：
- 前端 (Vite Server): `http://localhost:3000`
- 后端 (API Functions): `http://localhost:3000/api/...`

### 2.2 Vercel 部署指南

1. **安装 Vercel CLI** (如果未安装):
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**:
   ```bash
   vercel login
   ```

3. **部署项目**:
   在项目根目录运行：
   ```bash
   vercel
   ```
   - 按照提示选择 Scope 和 Link to existing project (如果有)。
   - **关键**: 在 Vercel 控制台的项目设置 (Settings -> Environment Variables) 中，务必添加与本地 `.env` 一致的环境变量 (`POSTGRES_PRISMA_URL`, `JWT_SECRET` 等)。

4. **生产环境部署**:
   ```bash
   vercel --prod
   ```

### 2.3 常见问题排查

- **前端 Build 失败**: 
  - 检查 `frontend/package.json` 中的 `build` 脚本。如果遇到 TS 类型错误，可临时尝试 `vue-tsc --noEmit && vite build` 确认错误源，或在 `tsconfig.json` 中调整严格模式。
- **数据库连接超时**:
  - 检查 `.env` 中的 `POSTGRES_PRISMA_URL` 是否正确。
  - 确保本地 IP 被允许访问数据库（如果使用的是云托管数据库）。
