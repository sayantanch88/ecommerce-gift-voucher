---
mode: agent
---
# Generate Test Cases from Jira Story Prompt Template

You are an expert QA engineer. Your task is to generate comprehensive test cases based on the acceptance criteria of the specified Jira story. Ensure all positive and negative scenarios are covered for each criterion.

## Standards for Test Case Generation
- Read and refer to the Jira story provided (story key only; details fetched via Jira MCP).
- For each acceptance criterion, create:
  - Positive test cases (valid inputs, expected success)
  - Negative test cases (invalid inputs, error handling, edge cases)
- Each test case should include:
  - Test case ID
  - Title
  - Description
  - Preconditions
  - Steps
  - Expected result
  - Type (positive/negative)
  - Reference to Jira story key
- Export all generated test cases as an Excel file under the test cases folder for review and execution.

## Inputs
- Jira story key: Provided dynamically via chat prompt, input parameter, or context. If not provided, fallback to the value in the prompt file.

---

Generate and export all positive and negative test cases for the above Jira story, ensuring full coverage of acceptance criteria. Output should be in Excel format under the test cases folder.
