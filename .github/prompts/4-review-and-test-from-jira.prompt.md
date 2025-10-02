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
- **User must specify Jira story key to review and test**
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
1. **Request Story Key:** Prompt user to specify which Jira story to review and test
2. **Branch Checkout:** Checkout the feature branch for the specified story
   - Identify feature branch: `feature/[STORY-KEY]-[description]`
   - Checkout the feature branch to review implementation
3. **Code Review:** Analyze implementation against specified story requirements and standards
4. **Test Planning:** Identify test scenarios based on acceptance criteria from Jira story
5. **Test Implementation:** Create unit and integration test cases
6. **Test Execution:** Run all tests and validate results
7. **Quality Validation:** Ensure code quality and coverage metrics
8. **Commit Test Changes:** Commit any new tests to the feature branch
9. **Note:** Pull request creation will be handled after Playwright execution in Phase 6

## Inputs
- **Jira Story Key:** Story identifier for requirement validation (REQUIRED USER INPUT)
  - Source: User must specify which Jira story to review and test
  - Format: Standard Jira story key (e.g., GV-43, GV-44)
  - Purpose: Extract acceptance criteria and requirements for validation
- **Feature Branch:** Implementation branch for review and testing
  - Source: Automatically identified from Git repository based on story key
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
- Test changes are committed to the feature branch
- Code is ready for Playwright testing phase (Phase 6)
- Feature branch is prepared for final push and PR creation

---

**REQUIRED USER INPUT:** Please specify the Jira story key (e.g., GV-43, GV-44) that you want to review and test. The agent will then conduct comprehensive code review and testing for the specified Jira story implementation. Create and execute all necessary test cases, validate code quality, and commit test changes to the feature branch. Pull request creation will be handled after Playwright execution in Phase 6.
