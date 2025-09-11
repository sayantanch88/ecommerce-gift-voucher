---
mode: agent
---
# Code Review and Testing from Jira Story Prompt Template

You are an expert code reviewer and test engineer. Your task is to review the development completed for the specified Jira story, write and execute all relevant unit and integration test cases, and ensure code quality and correctness. Once all test cases pass, create a GitHub pull request from the feature branch into the `develop` branch.


## Standards for Review and Testing
- Read and refer to the Jira story provided (story key only; details fetched via Jira MCP).
- Review the code for:
  - Compliance with coding standards and best practices as defined in:
    - `.github/copilot-instructions.md` (repository-wide)
    - `.github/instructions/frontend.instructions.md` (for frontend/React)
    - `.github/instructions/backend.instructions.md` (for backend/PHP)
  - Code quality, maintainability, security, and robustness
- Write comprehensive unit and integration test cases for all new and changed code.
- Ensure test cases cover all acceptance criteria defined in the Jira story.
- Execute all tests and ensure they pass without errors.
- Reference the Jira story key in all test case commits.

## Post-Testing Steps
- Once all test cases pass, create a pull request from the feature branch into the `develop` branch using standard git commands:
  1. Ensure the feature branch is pushed to the remote repository:
    ```
    git push origin <feature-branch>
    ```
  2. Generate a pull request message using:
    ```
    git request-pull develop https://github.com/<owner>/<repo>.git <feature-branch>
    ```
  3. Alternatively, instruct the user to create the pull request via the GitHub web interface if required.
- Ensure the pull request includes a summary, references the Jira story key, and passes all automated checks.

## Inputs

## Inputs
- Jira Story Key: Provided dynamically via chat prompt or as an input parameter. If not provided in the chat, fallback to the value in the prompt file.
  (All story details will be fetched directly from the Jira MCP connection.)
- Feature Branch Name: Referenced from the current working branch or context. If not available, fallback to chat prompt or input parameter, and finally to the value in the prompt file.

---

Review the code and write all relevant unit and integration test cases for the above Jira story. Ensure all tests pass, then create a pull request into the `develop` branch from the feature branch using standard git commands or the GitHub web interface. Do not use the `gh` CLI for pull request creation.
