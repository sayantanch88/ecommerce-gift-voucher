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
- Access to Jira project with appropriate permissions
- Understanding of system architecture (frontend/backend separation)
- Knowledge of development team capacity and skills

## Standards & Guidelines
- Follow repository-wide standards in `.github/copilot-instructions.md`
- Use formal, concise, and unambiguous language in story descriptions
- Ensure stories follow INVEST principles (Independent, Negotiable, Valuable, Estimable, Small, Testable)
- Maintain traceability between BRD requirements and Jira stories

## Workflow Steps
1. **Analyze BRD:** Extract functional and non-functional requirements
2. **Decompose Requirements:** Break down into granular, actionable stories
3. **Categorize Work:** Separate backend and frontend development tasks
4. **Structure Stories:** Create comprehensive story descriptions and acceptance criteria
5. **Create in Jira:** Use MCP integration to create stories directly in Jira
6. **Link to Epic:** Associate stories with appropriate epic for tracking

## Inputs
- **BRD Document:** Business Requirements Document from Phase 1
  - Source: Generated BRD file from `docs/brd/` directory
  - Format: Structured requirements document
- **Project Key:** Jira project identifier for story creation
  - Source: Project configuration or input parameter
- **Epic Number:** Associated epic for story grouping
  - Source: Project planning or input parameter

## Outputs
- **Backend Stories:** Jira stories for API, database, and server-side logic
  - Location: Jira project with backend labels
  - Format: Structured stories with Given-When-Then acceptance criteria
- **Frontend Stories:** Jira stories for UI, UX, and client-side functionality
  - Location: Jira project with frontend labels
  - Format: Structured stories with Given-When-Then acceptance criteria

## Quality Gates
- Each story has clear summary and detailed description
- Acceptance criteria follow AC1, AC2 format with Given-When-Then structure
- Stories are appropriately labeled for backend or frontend work
- Epic linkage is established for proper story grouping
- Stories are estimated and ready for sprint planning

## Tools & Integrations
- **Jira MCP Integration:** Direct story creation and management
- **Epic Management:** Story-to-epic linking and hierarchy
- **Label Management:** Backend/frontend categorization

## Story Structure Standards
### Required Fields:
- **Summary:** Clear, concise story title
- **Description:** Detailed description of functionality
- **Acceptance Criteria:** Numbered criteria (AC1, AC2, etc.) with:
  - **Given:** Initial context or precondition
  - **When:** Action or event trigger
  - **Then:** Expected outcome or result
- **Labels:** Backend or frontend classification
- **Epic Link:** Association with relevant epic

### Story Numbering:
- Sequential numbering for easy tracking and reference
- Clear identification of story dependencies
- Logical grouping by feature or functional area

## Success Criteria
- All BRD requirements are covered by corresponding Jira stories
- Stories are appropriately sized for sprint planning
- Backend and frontend work is clearly separated
- Acceptance criteria are testable and comprehensive
- Epic linkage provides clear feature grouping
- Stories are ready for development team consumption

---

Automatically generate and create comprehensive Jira stories from the referenced BRD, with clear separation of backend and frontend work. Use MCP integration for direct Jira story creation with all required details and proper epic association.
