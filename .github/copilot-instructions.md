

# Repository Wide Custom Instructions

This file contains guidelines and instructions for all contributors and maintainers of this repository. To maintain code quality and consistency, always follow the path-specific Copilot instructions files in `.github/instructions/` for:
- **Frontend (React + Vite):** See `frontend.instructions.md` for standards, structure, and best practices.
- **Backend (Java 21 + Spring Boot):** See `backend.instructions.md` for standards, structure, and best practices.

## Project Architecture Overview
- **Monorepo Structure:** Frontend and backend in separate directories with shared documentation
- **Frontend:** React 18 + Vite build system with Jest/Playwright testing
- **Backend:** Java 21 + Spring Boot 3.x with H2 database and Maven build
- **Infrastructure:** Docker Compose for local development, Terraform for AWS ECS deployment
- **Documentation:** Centralized in `docs/` with API, architecture, and security documentation

## Development Workflow Standards
### Branch Management
- **Main Branches:** `main` (production), `develop` (integration)
- **Feature Branches:** `feature/[JIRA-KEY]-[description]` (e.g., `feature/GV-123-voucher-redemption`)
- **Bug Fix Branches:** `bugfix/[JIRA-KEY]-[description]`
- **Hotfix Branches:** `hotfix/[JIRA-KEY]-[description]`

### Commit Standards
- **Format:** `[JIRA-KEY] Brief description of changes`
- **Example:** `GV-123 Add voucher redemption validation logic`
- **Body:** Include detailed description for complex changes
- **Reference:** Always link to Jira story or issue

### Code Review Process
- **Pre-Review:** All linters pass, tests complete, documentation updated
- **Review Requirements:** At least one approver from CODEOWNERS
- **Quality Gates:** Code coverage thresholds, security scans, performance checks
- **Merge Strategy:** Squash and merge to maintain clean history

## General Maintenance & Collaboration
### Documentation Standards
- **Keep Current:** Update `docs/` folder for any significant change
- **API Documentation:** Maintain `docs/API.md` with OpenAPI/Swagger specs
- **Architecture Records:** Document decisions in `docs/ARCHITECTURE.md`
- **Change Tracking:** Update `docs/CHANGELOG.md` for user-facing changes
- **Security Documentation:** Maintain `docs/SECURITY.md` for vulnerability reporting

### Project Management
- **Story Tracking:** Use Jira for all feature development and bug tracking
- **Sprint Planning:** Reference Jira epics and stories in development discussions
- **Release Notes:** Generate from Jira and Git commit history
- **Issue Templates:** Use GitHub issue templates for bug reports and feature requests

## Code Quality Standards
### Testing Requirements
- **Unit Tests:** Minimum 80% code coverage for new code
- **Integration Tests:** Cover API endpoints and critical user flows
- **E2E Tests:** Playwright tests for complete user journeys
- **Test Naming:** Descriptive test names following `should_do_something_when_condition`
- **Test Organization:** Group tests by feature/component with clear setup/teardown

### Security Standards
- **No Secrets:** Never commit API keys, passwords, or sensitive configuration
- **Input Validation:** Sanitize and validate all user inputs on both frontend and backend
- **Authentication:** Implement proper session management and CSRF protection
- **Authorization:** Use role-based access control where applicable
- **Dependency Security:** Regular security audits and dependency updates
- **Vulnerability Reporting:** Follow `docs/SECURITY.md` procedures

### Performance Standards
- **Frontend:** Bundle size optimization, lazy loading, image optimization
- **Backend:** Database query optimization, caching strategies, async processing
- **Monitoring:** Application performance monitoring (APM) integration
- **Load Testing:** Performance testing for critical user flows

## DevOps & Infrastructure
### Container Standards
- **Docker:** Use multi-stage builds for production optimization
- **Base Images:** Use official, minimal base images with security updates
- **Health Checks:** Implement proper health check endpoints
- **Resource Limits:** Define appropriate CPU and memory limits

### Deployment Standards
- **Environment Parity:** Development, staging, and production environment consistency
- **Blue-Green Deployment:** Zero-downtime deployment strategy
- **Rollback Strategy:** Quick rollback procedures for failed deployments
- **Infrastructure as Code:** All infrastructure defined in Terraform

### Monitoring & Observability
- **Logging:** Structured logging with appropriate log levels
- **Metrics:** Application and infrastructure metrics collection
- **Alerting:** Proactive alerting for system and business metrics
- **Tracing:** Distributed tracing for complex request flows

## Accessibility & UX Standards
- **WCAG Compliance:** Meet WCAG 2.1 AA standards for accessibility
- **Responsive Design:** Mobile-first approach with desktop enhancement
- **Progressive Enhancement:** Core functionality works without JavaScript
- **Performance Budget:** Page load times under 3 seconds on 3G connections

## Dependency Management
### Frontend Dependencies
- **Package Updates:** Regular dependency updates with security patches
- **Bundle Analysis:** Monitor bundle size and optimize imports
- **Version Pinning:** Use exact versions for production dependencies

### Backend Dependencies
- **Security Updates:** Regular Maven dependency security scans
- **Version Management:** Use Spring Boot BOM for version consistency
- **Transitive Dependencies:** Explicit management of critical transitive dependencies

## Environment Configuration
### Local Development
- **Docker Compose:** Complete local environment with all services
- **Environment Variables:** Use `.env.example` files for configuration templates
- **Database Seeding:** Consistent test data for development and testing

### Production Configuration
- **Environment Variables:** All sensitive configuration via environment variables
- **Configuration Management:** Centralized configuration for different environments
- **Secret Management:** Use proper secret management tools (AWS Secrets Manager, etc.)

---

*This file should be updated as standards and processes evolve. All team members are responsible for maintaining these standards and suggesting improvements.*
