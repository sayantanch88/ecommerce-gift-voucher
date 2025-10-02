---
mode: agent
sdlc_phase: development
dependencies: [2]
---

# 3 - Development Implementation from Jira Story

## Overview
Complete comprehensive development implementation for specified Jira stories, following established coding standards and best practices to deliver production-ready code with proper version control management.

## Objectives
- Implement all functional requirements specified in Jira story acceptance criteria
- Follow repository coding standards and architectural patterns
- Ensure code quality, maintainability, and security compliance
- Maintain proper version control workflow with feature branching
- Deliver testable, reviewable, and deployable code changes

## Prerequisites
- Jira story with clear acceptance criteria from Phase 2
- Development environment setup and dependencies installed
- Access to repository with appropriate permissions
- Understanding of system architecture and existing codebase

## Standards & Guidelines
- Follow repository-wide standards in `.github/copilot-instructions.md`
- Frontend development: `.github/instructions/frontend.instructions.md`
- Backend development: `.github/instructions/backend.instructions.md`
- Ensure code is well-structured, documented, and maintainable
- Implement proper error handling and validation
- Follow security best practices and data sanitization

## Workflow Steps
1. **Setup Development Branch:** Create feature branch from latest develop
2. **Story Analysis:** Extract requirements and acceptance criteria from Jira
3. **Code Implementation:** Develop features according to specifications
4. **Code Review:** Self-review for quality, standards, and completeness
5. **Commit Changes:** Create descriptive commits referencing Jira story
6. **Push Branch:** Make feature branch available for review and testing

## Inputs
- **Jira Story Key:** Story identifier for requirement extraction
  - Source: Jira MCP connection for story details
  - Format: Standard Jira story key (e.g., GV-123)
- **Development Branch:** Feature branch for implementation
  - Source: Automatically created from develop branch
  - Naming: `feature/[STORY-KEY]-[description]`

## Outputs
- **Implementation Code:** Complete feature implementation
  - Location: Appropriate directories based on frontend/backend classification
  - Quality: Production-ready, tested, and documented code
- **Feature Branch:** Version-controlled implementation branch
  - Status: Pushed to remote repository
  - Content: All changes committed with descriptive messages

## Quality Gates
- All acceptance criteria are fully implemented
- Code follows established coding standards and patterns
- Proper error handling and validation are implemented
- Security best practices are applied
- Code is self-documenting with appropriate comments
- No linting or compilation errors exist

## Tools & Integrations
- **Jira MCP Integration:** Story details and requirement extraction
- **GitHub Integration:** Repository access and branch management
- **Code Quality Tools:** Linters, formatters, and static analysis
- **Development Environment:** Local testing and validation tools

## Git Workflow Standards
### Branch Management:
- **Base Branch:** Always branch from latest `develop`
- **Branch Naming:** `feature/[STORY-KEY]-[short-description]`
- **Commit Messages:** Reference Jira story key and describe changes clearly
- **Push Strategy:** Push feature branch to remote for collaboration

### Code Organization:
- **Frontend Changes:** React components, styling, and client-side logic
- **Backend Changes:** API endpoints, business logic, and data models
- **Shared Changes:** Configuration, documentation, and cross-cutting concerns

## Success Criteria
- All Jira story acceptance criteria are implemented and functional
- Code passes all quality checks and follows repository standards
- Feature branch is created, committed, and pushed successfully
- Implementation is ready for code review and testing phases
- Changes are properly documented and traceable to requirements

---

Complete all development implementation for the specified Jira story, following established coding standards and Git workflow. Create a feature branch, implement all acceptance criteria, and push changes for review and testing phases.
