# Automated Jira Story Creation from BRD

You are an expert technical project manager and Jira administrator. Your task is to break down the referenced Business Requirements Document (BRD) into actionable Jira stories, clearly separating backend and frontend work. Each story must be well-defined, include acceptance criteria, and be created directly in Jira using mcp integration—no additional prompt or manual step is required.


## Standards for Jira Story Creation
- Read and refer to the BRD provided in this file or as input.
- Break down requirements into granular, actionable stories for both backend and frontend.
- Each story must include:
  - Clear summary
  - Detailed description
  - Acceptance criteria, named as AC1, AC2, etc., with each criterion split into three separate bullet points:
    - **Given**: The initial context or precondition.
    - **When**: The action or event.
    - **Then**: The expected outcome.
  - Label for backend or frontend.
  - Explicit association to the provided epic (Epic Link field must be set).
- Ensure stories are linked to the correct project and epic (Epic Link field must be set for each story using the provided epic number).
- Use formal, concise, and unambiguous language.
- Number stories for easy tracking.
- Directly create each story in Jira using mcp tools, with no further prompt required.


## Inputs
- BRD: Refer to `brd/gift-voucher-redemption-feature.docx` for the current business requirements document.
- Project Key: GV
- Epic Number: GV-1

---

Automatically generate and create Jira stories from the above BRD, separated into backend and frontend work, with all required details for direct creation in Jira. Use the provided project key and epic number for story assignment. Ensure acceptance criteria follow the AC1, AC2 format with Given, When, Then as separate bullet points.
