# AI Spec Builder

## Project Overview
AI Spec Builder is a web‑based tool that transforms a free‑form product idea description into a complete technical specification ready to share with developers. It removes the friction between an entrepreneur’s vision and the technical execution.

## Vision
- **Zero friction**: No authentication or database – anyone can drop a description and instantly get a spec.
- **AI‑driven**: Uses the Anthropic Claude model via the official SDK to generate clear, structured specifications.
- **English‑only**: All code, comments, and generated docs are written in English.

## Technical Stack
- **Frontend**: Next.js 16 (React) with Tailwind CSS for styling.
- **Backend**: Serverless API Routes provided by Next.js.
- **AI Integration**: Anthropic SDK connected to Claude.
- **Deployment**: Vercel (edge‑ready, zero‑config CI).
- **No Auth / No DB**: The app is stateless – specifications are generated on‑the‑fly and returned to the user.

## Key Features
1. **Description Form** – Simple UI for entering product ideas.
2. **Spec Generation** – Prompt engineering to produce:
   - High‑level overview
   - System architecture diagram (mermaid)
   - API contracts (OpenAPI style)
   - Front‑end component list
   - Technical milestones & milestones
3. **Export Options** – Download as Markdown, JSON, or PDF.
4. **Template Customization** – Optional config to tweak output format.

## Implementation Details
- **Language**: JavaScript/TypeScript (project defaults to JavaScript, but can be migrated to TS).
- **Frontend**:
  - Pages built with Next.js `app/` directory.
  - Tailwind CSS for responsive UI.
  - Form handling with React Hook Form.
- **Backend**:
  - API route `/api/generate-spec` receives the description, calls the Anthropic SDK, and streams back the spec.
  - Uses serverless functions; no persistent storage.
- **AI**:
  - `@anthropic-ai/sdk` package.
  - Prompt includes guidelines to keep output concise and in English.
- **Testing**:
  - Unit tests for the API route using Jest.
  - End‑to‑end UI tests with Playwright.

## Deployment & CI
- **Vercel** integration with automatic preview deployments on PRs.
- **GitHub Actions**:
  - Lint (`eslint`) and format (`prettier`).
  - Run tests on every push.
  - Deploy to Vercel on merge to `main`.

## Roadmap (high‑level)
- **MVP** – Basic description → spec pipeline.
- **UI polish** – Better editor UX, live preview.
- **Template marketplace** – Community‑contributed spec templates.
- **Advanced AI** – Chain‑of‑thought prompting, multi‑model fallback.
- **Export formats** – Word, Confluence, etc.

---
*This CLAUDE.md file is used by Claude Code to provide project context and manage future assistance.*