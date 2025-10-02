---
mode: agent
sdlc_phase: testing
dependencies: [2]
---

# 6 - Playwright UI Test Generation and Execution from Jira Story

## Overview
Generate comprehensive Playwright UI automation test cases from Jira story acceptance criteria and execute them using MCP browser automation tools to validate frontend functionality with real-time browser testing and visual evidence.

## Objectives
- Extract UI test scenarios from Jira story acceptance criteria
- Generate executable Playwright test cases with comprehensive coverage
- Execute tests using MCP browser automation for real-time validation
- Provide visual evidence and detailed test execution reports
- Ensure frontend functionality meets specified requirements

## Prerequisites
- Jira story with defined acceptance criteria from Phase 2
- Frontend application running and accessible (typically http://localhost:3000 or http://localhost:5173)
- MCP browser automation tools available and functional
- Understanding of UI testing patterns and user workflows

## Standards & Guidelines
- Follow repository-wide testing standards in `.github/copilot-instructions.md`
- Frontend testing standards: `.github/instructions/frontend.instructions.md`
- Use existing Playwright configuration from `playwright.config.js`
- Generate tests that are maintainable, readable, and reliable
- Reference Jira story key in all test artifacts for traceability

## Workflow Steps
1. **Jira Story Analysis:** Extract acceptance criteria and UI interaction requirements
2. **Test Scenario Design:** Identify positive, negative, and edge case scenarios
3. **Test Generation:** Create Playwright test files with comprehensive coverage
4. **MCP Tool Activation:** Activate necessary browser automation capabilities
5. **Test Execution:** Run tests using MCP tools for real-time validation
6. **Results Documentation:** Generate comprehensive reports with visual evidence

## Inputs
- **Jira Story Key:** Story identifier for acceptance criteria extraction
  - Source: Jira MCP connection for story details and requirements
  - Format: Standard Jira story key (e.g., GV-123)
- **Frontend Application URL:** Running application endpoint for testing
  - Source: Local development server or deployed environment
  - Default: http://localhost:3000 or http://localhost:5173

## Outputs
- **Playwright Test Files:** Generated test cases in JavaScript
  - Location: `frontend/e2e/` directory
  - Naming: `{JIRA-KEY}-{description}.spec.js`
  - Content: Comprehensive test scenarios covering acceptance criteria
- **MCP Execution Results:** Real-time test validation with browser automation
  - Format: Step-by-step execution logs and page snapshots
  - Evidence: Screenshots and visual validation artifacts
- **Test Report:** Comprehensive summary of test execution and results
  - Content: Pass/fail status, performance metrics, issues identified

## Quality Gates
- All Jira acceptance criteria have corresponding test scenarios
- Test cases cover positive, negative, and edge case scenarios
- Generated tests follow Playwright best practices and patterns
- MCP execution validates all critical user interactions
- Visual evidence confirms expected UI behavior and state
- Test artifacts are properly organized and traceable to requirements

## Tools & Integrations
- **Jira MCP Integration:** Acceptance criteria extraction and requirement analysis
- **MCP Browser Tools:** Real-time browser automation and validation
  - Navigation tools for page traversal
  - Interaction tools for user actions
  - Screenshot tools for visual documentation
- **Playwright Framework:** Test structure and assertion capabilities
- **Test Reporting:** Comprehensive execution summaries and evidence

## Test Generation Standards
### Playwright Test Structure:
```javascript
// ✅ Good: Comprehensive test structure
const { test, expect } = require('@playwright/test');

test.describe('GV-123: Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('AC1: User can log in with valid credentials', async ({ page }) => {
    // Given: User is on login page
    await expect(page.locator('input[name="username"]')).toBeVisible();
    
    // When: User enters valid credentials and clicks login
    await page.fill('input[name="username"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'validpassword');
    await page.click('button[type="submit"]');
    
    // Then: User is redirected to dashboard
    await expect(page.locator('text=Welcome')).toBeVisible();
    await expect(page.url()).toContain('/dashboard');
  });
});
```

### Test Coverage Requirements:
- **Positive Scenarios:** Valid user inputs and expected success paths
- **Negative Scenarios:** Invalid inputs, error handling, boundary conditions
- **UI Validation:** Element visibility, text content, styling verification
- **User Interactions:** Clicks, form submissions, navigation flows
- **Accessibility:** Keyboard navigation, screen reader compatibility
- **Cross-browser:** Ensure compatibility across different browsers

## MCP Tool Mapping
| Traditional Playwright | MCP Browser Tool | Purpose |
|------------------------|------------------|---------|
| `page.goto(url)` | `browser_navigate` | Navigate to pages |
| `expect().toBeVisible()` | `browser_snapshot` | Validate element presence |
| `page.click()` | `browser_click` | Click interactions |
| `page.fill()` | `browser_type` | Form input |
| `page.screenshot()` | `browser_take_screenshot` | Visual documentation |
| Test assertions | Snapshot analysis | State validation |

## MCP Execution Process
### Tool Activation Sequence:
1. `activate_browser_navigation_tools` - Enable page navigation
2. `activate_browser_interaction_tools` - Enable user interactions
3. `activate_browser_screenshot_tools` - Enable visual validation

### Execution Pattern:
```javascript
// Step 1: Navigate to application
await mcp_microsoft_pla_browser_navigate({ url: "http://localhost:3000" });

// Step 2: Validate page state
await mcp_microsoft_pla_browser_snapshot();

// Step 3: Perform user interactions
await mcp_microsoft_pla_browser_click({ element: "button[data-testid='login']" });

// Step 4: Capture visual evidence
await mcp_microsoft_pla_browser_take_screenshot({ 
  filename: "GV-123-login-success.png",
  fullPage: true 
});
```

## Success Criteria
- Playwright test files are generated and saved in correct directory structure
- All Jira acceptance criteria are covered by corresponding test scenarios
- MCP execution validates all critical user interactions successfully
- Visual evidence confirms expected UI behavior and functionality
- Test results provide clear pass/fail status with detailed error information
- Generated tests are maintainable and follow established patterns
- Test artifacts enable effective regression testing and validation

---

Generate comprehensive Playwright UI automation test cases for the specified Jira story, save them under `frontend/e2e/`, and execute them using MCP browser automation tools. Ensure all acceptance criteria are covered and provide detailed execution results with comprehensive visual evidence.
