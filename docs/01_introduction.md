# 1. 项目介绍 (Introduction)

## 1.1 项目背景
Nutri-Baby Web 是一个现代化的母婴护理管理平台，旨在帮助家长轻松记录宝宝的喂养、睡眠、排泄和生长数据，并通过可视化图表提供健康建议。本项目是从原有的 Uni-app + Go 架构重构而来的 Web 版本。

## 1.2 核心功能
*   **宝宝管理**: 多宝宝档案管理，支持头像上传和协作者邀请。
*   **记录追踪**:
    *   喂养记录 (母乳、奶瓶、辅食)
    *   睡眠记录 (入睡时间、时长)
    *   排泄记录 (尿布更换、性状分析)
    *   生长记录 (身高、体重)
*   **数据统计**: 提供日、周、月维度的健康数据可视化图表。
*   **多端适配**: 基于响应式设计，适配 PC 和移动端浏览器。

## 1.3 技术栈
*   **前端**: Vue 3, TypeScript, Vite, Element Plus, Pinia, Vue Router, ECharts.
*   **后端**: Node.js (Vercel Serverless Functions), Prisma ORM.
*   **数据库**: PostgreSQL (Vercel Postgres).
*   **部署**: Vercel (Production), Docker (Self-hosted).
