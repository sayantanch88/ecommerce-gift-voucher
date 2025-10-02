---
mode: agent
sdlc_phase: requirement
dependencies: [1]
---

# 2 - Jira Story Creation from BRD

## Overview
Decompose Business Requirements Documents into actionable Jira stories, enabling efficient development planning and sprint management with clear separation of backend and frontend work.

## Objectives
- Break down BRD requirements into granular, actionable development stories
- Separate backend and frontend work for parallel development
- Create well-structured Jira stories with comprehensive acceptance criteria
- Establish clear traceability from requirements to development tasks
- Enable effective sprint planning and story estimation

## Prerequisites
- Completed BRD document from Phase 1
- **User must specify BRD file name to process**
- **User must provide Jira project key for story creation**
- **User must specify epic key/number for story association (optional)**
- Access to Jira project with appropriate permissions
- Understanding of system architecture (frontend/backend separation)
- Knowledge of development team capacity and skills

## Standards & Guidelines
- Follow repository-wide standards in `.github/copilot-instructions.md`
- Use formal, concise, and unambiguous language in story descriptions
- Ensure stories follow INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Maintain traceability between BRD requirements and Jira stories

## Workflow Steps
1. **Request User Inputs:** Prompt user to specify BRD file, project key, and epic (optional)
2. **Analyze BRD:** Extract functional and non-functional requirements from specified file
3. **Decompose Requirements:** Break down into granular, actionable stories
4. **Categorize Work:** Separate backend and frontend development tasks
5. **Structure Stories:** Create comprehensive story descriptions with all metadata in description
6. **Create in Jira:** Use MCP integration with standard fields only (avoid custom fields)
7. **Verify Creation:** Ensure stories are created successfully without field errors

## Inputs
- **BRD Document:** Business Requirements Document from Phase 1 (REQUIRED USER INPUT)
  - Source: User must specify BRD filename from `docs/brd/` directory
  - Format: Structured requirements document (.md format)
  - Example: "gift-voucher-redemption-feature-brd.md"
- **Project Key:** Jira project identifier for story creation (REQUIRED USER INPUT)
  - Source: User must provide target Jira project key
  - Format: Standard Jira project key format
  - Example: "GV" for Gift Voucher project
- **Epic Key:** Associated epic for story grouping (OPTIONAL USER INPUT)
  - Source: User can optionally provide epic key for story association
  - Format: Standard Jira epic key (e.g., GV-1) or leave blank
  - Note: If not provided, stories will be created without epic association

## Outputs
- **Backend Stories:** Jira stories for API, database, and server-side logic
  - Location: Jira project with backend labels
  - Format: Structured stories with Given-When-Then acceptance criteria
- **Frontend Stories:** Jira stories for UI, UX, and client-side functionality
  - Location: Jira project with frontend labels
  - Format: Structured stories with Given-When-Then acceptance criteria

## Quality Gates
- Each story has clear summary with frontend/backend prefix and detailed description
- Acceptance criteria follow AC1, AC2 format with Given-When-Then structure
- Stories are categorized through title prefix and description labels
- All metadata is included in description to avoid custom field issues
- Stories are appropriately sized and ready for sprint planning

## Tools & Integrations
- **Jira MCP Integration:** Direct story creation and management using standard fields only
- **Story Creation:** Use basic Jira fields (summary, description, issue type, project key)
- **Label Management:** Backend/frontend categorization through description text instead of custom fields

## Story Structure Standards
### Required Fields (Standard Jira Fields Only):
- **Summary:** Clear, concise story title with frontend/backend prefix
- **Description:** Detailed description including:
  - Story description and background
  - Technical requirements
  - Acceptance criteria (AC1, AC2, etc.) with Given-When-Then structure
  - Definition of Done
  - Dependencies
  - Labels section in description text (e.g., "## Labels\nfrontend, ui, modal")
- **Issue Type:** Use "Story" issue type
- **Project Key:** Target Jira project identifier

### Avoid Custom Fields:
- Do not use custom fields that may not exist in the target Jira instance
- Include all categorization and metadata within the description field
- Use description formatting to organize information clearly

### Story Numbering:
- Sequential numbering for easy tracking and reference
- Clear identification of story dependencies
- Logical grouping by feature or functional area

## Success Criteria
- All BRD requirements are covered by corresponding Jira stories
- Stories are appropriately sized for sprint planning
- Backend and frontend work is clearly separated through title prefixes
- Acceptance criteria are testable and comprehensive
- All categorization is handled through standard Jira fields only
- Stories are ready for development team consumption

---

**REQUIRED USER INPUTS:** 
1. **BRD File Name:** Specify the BRD filename from docs/brd/ directory (e.g., "gift-voucher-redemption-feature-brd.md")
2. **Jira Project Key:** Provide the target Jira project key (e.g., "GV")
3. **Epic Key (Optional):** Optionally provide epic key for story association (e.g., "GV-1") or leave blank

Once inputs are provided, automatically generate and create comprehensive Jira stories from the specified BRD, with clear separation of backend and frontend work. Use MCP integration for direct Jira story creation using only standard Jira fields (summary, description, issue type, project key) to avoid custom field errors. Include all metadata and categorization within the description field using structured formatting.
