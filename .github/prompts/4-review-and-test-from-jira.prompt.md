---
mode: agent
sdlc_phase: testing
dependencies: [3]
---

# 4 - Code Review and Testing from Jira Story

## Overview
Conduct comprehensive code review and testing for implemented Jira stories, ensuring code quality, functionality, and readiness for production deployment through automated testing and pull request creation.

## Objectives
- Review code implementation against Jira story requirements
- Validate adherence to coding standards and best practices
- Create and execute comprehensive unit and integration tests
- Ensure all acceptance criteria are properly tested and validated
- Facilitate code review process through pull request creation

## Prerequisites
- Completed development implementation from Phase 3
- Feature branch with all changes committed and pushed
- Access to testing frameworks and tools
- Understanding of testing strategies and coverage requirements

## Standards & Guidelines
- Follow repository-wide standards in `.github/copilot-instructions.md`
- Frontend testing: `.github/instructions/frontend.instructions.md`
- Backend testing: `.github/instructions/backend.instructions.md`
- Ensure comprehensive test coverage for all new and modified code
- Validate security, performance, and maintainability aspects

## Workflow Steps
1. **Code Review:** Analyze implementation against requirements and standards
2. **Test Planning:** Identify test scenarios based on acceptance criteria
3. **Test Implementation:** Create unit and integration test cases
4. **Test Execution:** Run all tests and validate results
5. **Quality Validation:** Ensure code quality and coverage metrics
6. **Pull Request Creation:** Create PR for code review and merge process

## Inputs
- **Jira Story Key:** Story identifier for requirement validation
  - Source: Jira MCP connection for acceptance criteria verification
  - Format: Standard Jira story key (e.g., GV-123)
- **Feature Branch:** Implementation branch for review and testing
  - Source: Git repository with completed development changes
  - Format: `feature/[STORY-KEY]-[description]`

## Outputs
- **Test Suite:** Comprehensive unit and integration tests
  - Location: Appropriate test directories (`__tests__`, `test/`)
  - Coverage: All new and modified functionality
- **Pull Request:** Code review and merge request
  - Target: `develop` branch
  - Content: Implementation summary and testing evidence

## Quality Gates
- All acceptance criteria are covered by corresponding test cases
- Unit tests achieve minimum coverage threshold (80%+)
- Integration tests validate end-to-end functionality
- All tests pass without errors or failures
- Code review identifies no critical issues or violations
- Security and performance requirements are validated

## Tools & Integrations
- **Testing Frameworks:** Jest, Playwright, PHPUnit (as applicable)
- **Coverage Tools:** Code coverage analysis and reporting
- **GitHub Integration:** Pull request creation and management
- **CI/CD Pipeline:** Automated testing and quality checks

## Testing Strategy
### Unit Testing:
- Test individual functions, methods, and components
- Mock external dependencies and services
- Validate business logic and edge cases
- Ensure proper error handling and validation

### Integration Testing:
- Test component interactions and data flow
- Validate API endpoints and database operations
- Test user workflows and acceptance criteria
- Verify cross-functional requirements

### Code Review Checklist:
- Implementation matches Jira story requirements
- Code follows established patterns and standards
- Security best practices are implemented
- Performance considerations are addressed
- Documentation is complete and accurate

## Success Criteria
- All unit and integration tests pass successfully
- Code coverage meets or exceeds established thresholds
- Implementation fully satisfies Jira story acceptance criteria
- Pull request is created with comprehensive description
- Code is ready for peer review and potential merge to develop branch

---

Conduct comprehensive code review and testing for the specified Jira story implementation. Create and execute all necessary test cases, validate code quality, and create a pull request for team review and merge consideration.
