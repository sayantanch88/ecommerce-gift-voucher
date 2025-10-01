# 8-generate-and-execute-playwright-from-jira.prompt.md

## Purpose
This prompt guides the AI to generate a Playwright UI automation test case based on a provided Jira story, save it in the correct location, and execute it automatically.

---

## Instructions

1. **Input:**
   - The user will provide a Jira story (as text or JSON).

2. **Test Generation:**
   - Analyze the Jira story and extract the acceptance criteria or user flows relevant for UI automation.
   - Generate a Playwright test case in JavaScript using the `@playwright/test` API.
   - The test file must be named using the Jira story key and a short description, e.g., `GV-123-login.spec.js`.
   - Save the test file under `frontend/e2e/`.

3. **Test Execution:**
   - Run the Playwright test using the configured Playwright setup.
   - Collect and display the test results, including any screenshots or videos if the test fails.

4. **Reporting:**
   - Summarize the test execution result (pass/fail, errors, and artifacts location).

---

## Example Prompt

> Given the following Jira story, generate a Playwright test case, save it, and execute it:
>
> **Jira Story:**
> Key: GV-123
> Summary: User can log in
> Acceptance Criteria:
> - User navigates to the login page
> - User enters valid credentials
> - User is redirected to the dashboard
> - A welcome message is displayed

---

## Output Format
- The generated Playwright test code
- The path where the test was saved
- The test execution result summary
- Any error messages or artifacts location if the test fails

---

## Notes
- Only generate Playwright tests for frontend UI stories.
- Do not overwrite existing test files unless explicitly instructed.
- Use the Playwright config and conventions already present in the repo.
