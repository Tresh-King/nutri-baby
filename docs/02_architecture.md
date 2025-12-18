# 2. 架构设计 (Architecture)

## 2.1 系统架构图

```mermaid
graph TD
    User[用户 (Browser)] --> |HTTPS| CDN[Vercel Edge Network / Nginx]
    
    subgraph "Frontend Layer"
        SPA[Vue 3 SPA]
        Router[Vue Router]
        Store[Pinia State]
        UI[Element Plus]
        SPA --> Router
        SPA --> Store
        SPA --> UI
    end
    
    CDN --> |Static Assets| SPA
    CDN --> |API Requests| API[Backend API Service]
    
    subgraph "Backend Layer (Serverless / Docker)"
        API --> Auth[Auth Middleware]
        API --> Services[Business Logic]
        Services --> Prisma[Prisma Client]
    end
    
    subgraph "Data Layer"
        Prisma --> DB[(PostgreSQL)]
    end
```

## 2.2 目录结构说明

```text
nutri-baby-web/
├── frontend/               # 前端应用源码
│   ├── src/
│   │   ├── api/            # Axios API 封装
│   │   ├── stores/         # Pinia 状态管理
│   │   ├── views/          # 页面视图组件
│   │   └── components/     # 通用 UI 组件
│   └── vite.config.ts      # Vite 构建配置
├── api/                    # 后端 Serverless 函数
│   ├── auth/               # 认证相关接口
│   ├── baby/               # 宝宝管理接口
│   └── ...
├── prisma/                 # 数据库模型定义
│   └── schema.prisma
├── docs/                   # 项目文档
├── deploy/                 # 部署配置
│   └── docker/             # Docker Compose 配置
├── vercel.json             # Vercel 路由配置
└── package.json            # 根项目依赖
```

## 2.3 关键设计决策
1.  **Serverless First**: 后端 API 设计采用无状态函数模式，既适配 Vercel Serverless，也易于封装为 Docker 容器服务。
2.  **Type Safety**: 前后端均使用 TypeScript，且通过 Prisma 生成数据库类型，确保全链路类型安全。
3.  **Modular State**: 前端使用 Pinia Store 分离业务逻辑与视图，通过 API Service 层统一管理网络请求。
