# Development from Jira Story Prompt Template

You are an expert developer. Your task is to complete all required development changes for the specified Jira story, strictly following the recommended coding standards and code quality guidelines for this repository. Unit and integration tests will be handled in a separate prompt.

## Pre-Development Steps
- Before starting development:
  1. Fetch and pull the latest changes from the `develop` branch in GitHub using the GitHub MCP connection.
  2. Create a new branch checked out from `develop`, named using the Jira story key and a short description (e.g., `feature/TM-3-redeem-voucher-button`).

## Standards for Development
- Read and refer to the Jira story provided (story key only; details fetched via Jira MCP).
- Follow all relevant coding standards and best practices as defined in:
  - `.github/copilot-instructions.md` (repository-wide)
  - `.github/instructions/frontend.instructions.md` (for frontend/React)
  - `.github/instructions/backend.instructions.md` (for backend/PHP)
- Ensure code is:
  - Well-structured and maintainable
  - Properly documented
  - Linted and formatted
  - Secure and robust
- Update or create files as needed to fully implement the Jira story.
- Reference the Jira story key in all commits and pull requests.
- Ensure all changes pass code review and automated checks.

## Inputs
- Jira Story Key: GV-8
  (All story details will be fetched directly from the Jira MCP connection.)

---

Complete all development changes for the above Jira story, maintaining the highest standards of code quality and documentation. Ensure all work is traceable to the Jira story and ready for review and deployment. Unit and integration tests will be covered separately.
Complete all development changes for the above Jira story, maintaining the highest standards of code quality and documentation. Ensure all work is traceable to the Jira story and ready for review and deployment.
