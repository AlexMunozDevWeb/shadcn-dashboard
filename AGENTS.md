<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Guidelines

## Project characteristics

- This is a dashboard built with Next.js 16 App Router, React 19, and TypeScript.
- UI styling uses Tailwind CSS 4 and shadcn/ui (`base-nova`, Base UI primitives, and Lucide icons); follow the existing components and tokens in `src/components/ui` and `src/app/globals.css`.
- The source is organized under `src/app` (including dashboard routes), `src/components`, `src/data`, `src/lib`, and `src/types`.
- Existing form patterns use React Hook Form with Zod validation. Reuse project dependencies and established components before introducing new packages or patterns.

## Documentation and MCP

- Before writing or changing code that uses a framework, library, or tool, use the Context7 MCP server to resolve the relevant library and retrieve its current documentation. Do this for the technologies involved in the change, such as React, Next.js, shadcn/ui, Tailwind CSS, and related libraries; do not rely only on remembered APIs.
- Follow the APIs and migration guidance in the retrieved documentation. For Next.js, also read the relevant guide shipped in `node_modules/next/dist/docs/` as required by the generated Next.js instructions above.
- If Context7 MCP is unavailable in the current environment, state that limitation and consult the installed package documentation and/or official documentation before proceeding. Do not claim to have queried Context7 when it was not available.

## Code conventions

- Keep changes focused, preserve the current dashboard design and behavior, and follow existing TypeScript, component, and import patterns.
- Prefer the installed shadcn/ui components and project utilities over custom duplicates. Keep form validation explicit and accessible.
- Do not add dependencies unless the task requires them.

## Build and validation

- Use the package scripts: `npm run dev`, `npm run lint`, and `npm run build`.
- Run the smallest relevant validation for a change, then broader checks when needed.
