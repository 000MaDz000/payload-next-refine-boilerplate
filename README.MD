# Refined Payload: Next.js + Refine + Payload CMS Boilerplate

A production-ready, high-performance boilerplate for building data-driven applications, multi-tenant SaaS, and management dashboards. This template combines the power of **Payload CMS 3.0**, **Next.js 15 (App Router)**, and **Refine** with **Ant Design**.

## 🚀 Features

- **Payload CMS 3.0**: Fully integrated headless CMS with MongoDB support and Lexical rich text editor.
- **Next.js 15 + App Router**: Leveraging the latest React 19 features, Turbopack, and server components.
- **Refine Framework**: A powerful toolkit for building data-intensive applications with zero-config routing and data hooks.
- **Ant Design 5 (v5)**: Modern UI component library with a custom theme system and persistent dark mode.
- **Full Internationalization (i18n)**: 
  - Complete English and Arabic support.
  - Custom Refine i18n provider with nested key support.
  - Persistent locale switching using cookies.
  - RTL/LTR layout awareness.
- **Authentication System**: 
  - Seamlessly integrated Payload CMS authentication.
  - Refine `authProvider` for client-side and server-side route protection.
- **Custom Data Provider**: Optimized data provider specifically built for Payload CMS API.
- **Developer Experience**:
  - **Git Workflow**: Semantic commits using Commitizen (`cz-conventional-changelog`).
  - **Release Management**: Automatic versioning and changelog generation with `release-it`.
  - **Quality Tools**: Husky git hooks, ESLint, and TypeScript.
  - **Devtools**: Refine Devtools and KBar integration.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **CMS**: [Payload CMS](https://payloadcms.com/)
- **Admin Framework**: [Refine](https://refine.dev/)
- **UI library**: [Ant Design](https://ant.design/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Icons**: [Ant Design Icons](https://ant.design/components/icon/)
- **i18n**: [Refine i18n](https://refine.dev/docs/core/providers/i18n-provider/) & `js-cookie`

## 🏁 Getting Started

### Prerequisites

- Node.js >= 20.x
- MongoDB instance (local or Atlas)
- pnpm

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    MONGODB_URI=mongodb://localhost/your-db-name
    PAYLOAD_SECRET=your-payload-secret
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    ```

4.  **Run in Development**:
    ```bash
    pnpm dev
    ```

## 📜 Available Scripts

- `pnpm dev`: Starts the development server with Turbopack.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint for code quality checks.
- `pnpm commit`: Invokes Commitizen for semantic commits.
- `pnpm release`: Triggers a new release (tagging, changelog, version bump).

## 📁 Project Structure

- `src/app`: Next.js App Router (Frontend & Payload Admin).
- `src/providers`: Refine context, Data Provider, Auth Provider, and i18n Provider.
- `src/components`: Reusable UI components and layouts.
- `src/contexts`: React contexts for theme/color mode.
- `locales`: JSON translation files for English and Arabic.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---
Made with ❤️ by the open-source community.
