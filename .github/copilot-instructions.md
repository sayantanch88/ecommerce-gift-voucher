

# Repository Wide Custom Instructions

This file contains guidelines and instructions for all contributors and maintainers of this repository. To maintain code quality and consistency, always follow the path-specific Copilot instructions files in `.github/instructions/` for:
- **Frontend (React):** See `frontend.instructions.md` for standards, structure, and best practices.
- **Backend (PHP):** See `backend.instructions.md` for standards, structure, and best practices.

## General Maintenance & Collaboration
- Keep documentation up to date in the `docs/` folder for any major change.
- Add or update API documentation in `docs/API.md` for new endpoints.
- Document architectural decisions in `docs/ARCHITECTURE.md`.
- Use Jira for story tracking and planning.
- Reference the relevant documentation and standards in discussions and pull requests.

## Code Review & Contribution
- Ensure all code and documentation changes comply with the standards defined in the relevant instructions files.
- Run all linters and fix errors before submitting code.
- Add unit and integration tests for new features and bug fixes.
- Ensure all tests pass before requesting review.
- Provide a clear description of changes and reference related issues or stories (e.g., Jira).
- Ensure code is reviewed and approved by a code owner (see `docs/CODEOWNERS`).

## Security
- Do not commit sensitive information (API keys, credentials, etc.).
- Report vulnerabilities as described in `docs/SECURITY.md`.
- Sanitize all user inputs and validate data on both frontend and backend.

---

*Update this file as standards and processes evolve.*
