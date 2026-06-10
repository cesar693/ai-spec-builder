<!-- Sync Impact Report
Version change: none → 0.1.0
Added Principles: Zero Friction, AI‑Driven, English‑Only, Stateless Architecture, Test‑First Quality
Added Sections: Additional Constraints, Development Workflow
Templates updated: ✅ .specify/templates/constitution-template.md, ✅ .specify/templates/plan-template.md, ✅ .specify/templates/spec-template.md, ✅ .specify/templates/tasks-template.md
Follow‑up TODOs: None
-->
# AI Spec Builder Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### Zero Friction
<!-- Example: I. Library-First -->
The system must allow any user to generate a specification without authentication, registration, or persistent storage.
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### AI‑Driven
<!-- Example: II. CLI Interface -->
All specification content is produced by the Anthropic Claude model via the official SDK; human input is limited to the product description.
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### English‑Only
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
All code, variables, and technical comments in the backend and frontend must be written in English. However, the specifications generated for the end user and the public interface of the AI Spec Builder must be strictly in Spanish, as required by the validator in our API route.
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red‑Green‑Refactor cycle strictly enforced -->

### Stateless Architecture
<!-- Example: IV. Integration Testing -->
The backend must remain stateless; specifications are generated on‑the‑fly and returned directly without database persistence.
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter‑service communication, Shared schemas -->

### Test‑First Quality
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
Unit and end‑to‑end tests must be written and passing before any feature is considered complete; tests enforce correctness of the generation pipeline.
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## Additional Constraints
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->
- Must run on Vercel edge runtime.
- Must use Next.js 16 and Tailwind CSS.
- Must not exceed 1 second latency per request.

## Development Workflow
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->
- Feature development follows specification → implementation → test cycle.
- Code reviews must verify compliance with the constitution.
- CI pipeline enforces linting, formatting, and test execution.

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->
1. This constitution supersedes all other project guidelines.
2. Amendments require a documented proposal, review by at least two core contributors, and a merged PR updating this document.
3. Version increments follow semantic versioning based on the impact of changes.
4. Compliance is verified in CI via automated checks.

**Version**: 0.1.0 | **Ratified**: 2026-06-09 | **Last Amended**: 2026-06-10
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->