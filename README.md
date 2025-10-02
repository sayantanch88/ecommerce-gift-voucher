# Freedom Gift Voucher E-commerce Platform

A modern, full-stack e-commerce gift voucher platform built with React and Java Spring Boot, featuring automated SDLC processes and comprehensive testing frameworks.

## 🏗️ Architecture Overview

### Frontend
- **Framework:** React 18 with Vite build system
- **UI Components:** Functional components with hooks
- **Styling:** CSS modules and responsive design
- **Testing:** Jest (unit tests) + Playwright (E2E tests)

### Backend
- **Framework:** Java 21 + Spring Boot 3.x
- **Database:** H2 (development) / Configurable for production
- **Build Tool:** Maven
- **API:** RESTful services with OpenAPI documentation

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Deployment:** Terraform for AWS ECS
- **Monitoring:** Health checks and observability

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Java 21** and Maven
- **Docker** and Docker Compose

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sayantanch88/bigcommerce-gift-voucher.git
   cd ecommerce-gift-voucher
   ```

2. **Start with Docker Compose (Recommended):**
   ```bash
   docker-compose up --build
   ```
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - H2 Console: http://localhost:8080/h2-console

3. **Or run services individually:**

   **Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📱 Application Features

### Customer Experience
- **Product Catalog:** Browse furniture and home goods
- **Gift Voucher Redemption:** Apply vouchers to products
- **Shopping Cart:** Add/remove items with real-time updates
- **Responsive Design:** Optimized for desktop and mobile

### Admin Features
- **Product Management:** CRUD operations for products
- **Voucher Management:** Create and manage gift vouchers
- **Order Tracking:** Monitor redemptions and sales

### Technical Features
- **RESTful API:** Clean, documented endpoints
- **Real-time Updates:** Dynamic UI state management
- **Error Handling:** Comprehensive error boundaries and validation
- **Accessibility:** WCAG 2.1 AA compliance
- **Security:** Input validation and XSS protection

## 🧪 Testing

### Unit Testing
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && mvn test
```

### End-to-End Testing
```bash
# Playwright E2E tests
cd frontend && npm run e2e

# View test results
npx playwright show-report
```

### Test Coverage
- **Frontend:** Jest with React Testing Library
- **Backend:** JUnit 5 with Mockito
- **E2E:** Playwright with cross-browser support
- **Target Coverage:** 80%+ for new code

## 🔧 Development Workflow

### SDLC Automation
This project includes automated SDLC prompts in `.github/prompts/`:

1. **Requirements:** BRD creation and Jira story generation
2. **Development:** Feature implementation with code standards
3. **Testing:** Automated test generation and execution
4. **Deployment:** Infrastructure provisioning with Terraform
5. **Documentation:** Automated docs updates

### Code Standards
- **Frontend:** ESLint + Prettier with React best practices
- **Backend:** Checkstyle + SpotBugs with Java conventions
- **Commits:** Conventional commits with Jira references
- **Branching:** GitFlow with feature/bugfix/hotfix branches

## 📚 API Documentation

### Backend Endpoints
```
GET    /api/products        # Get all products
GET    /api/products/{id}   # Get product by ID
POST   /api/products        # Create new product
PUT    /api/products/{id}   # Update product
DELETE /api/products/{id}   # Delete product

GET    /api/vouchers        # Get all vouchers
POST   /api/vouchers/redeem # Redeem voucher
```

### API Documentation
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI Spec:** http://localhost:8080/api-docs

## 🐳 Docker Configuration

### Services
- **Frontend:** React app served with Nginx
- **Backend:** Spring Boot application
- **Database:** H2 database with persistent volume

### Environment Variables
```bash
# Frontend
VITE_API_URL=http://localhost:8080/api

# Backend
SPRING_PROFILES_ACTIVE=dev
DATABASE_URL=jdbc:h2:mem:devdb
```

## 🚀 Deployment

### Production Deployment
```bash
# Deploy to AWS ECS with Terraform
cd infra
terraform init
terraform plan
terraform apply
```

### Environment Configuration
- **Development:** H2 database, hot reloading
- **Staging:** PostgreSQL, Docker containers
- **Production:** RDS, ECS with load balancing

## 📖 Documentation

### Project Documentation
- **Architecture:** `docs/ARCHITECTURE.md`
- **API Reference:** `docs/API.md`
- **Security:** `docs/SECURITY.md`
- **Changelog:** `docs/CHANGELOG.md`

### Development Guides
- **Frontend Standards:** `.github/instructions/frontend.instructions.md`
- **Backend Standards:** `.github/instructions/backend.instructions.md`
- **SDLC Prompts:** `.github/prompts/README.md`

## 🛠️ Project Structure

```
ecommerce-gift-voucher/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API services
│   │   └── __tests__/        # Unit tests
│   ├── e2e/                  # Playwright E2E tests
│   └── package.json
├── backend/                  # Spring Boot application
│   ├── src/main/java/        # Java source code
│   ├── src/test/java/        # Unit tests
│   └── pom.xml
├── infra/                    # Terraform infrastructure
├── docs/                     # Project documentation
├── .github/
│   ├── prompts/              # SDLC automation prompts
│   └── instructions/         # Development standards
└── docker-compose.yml        # Local development setup
```

## 🤝 Contributing

### Development Process
1. Create feature branch: `feature/GV-123-description`
2. Follow coding standards and add tests
3. Submit PR with Jira reference
4. Ensure all CI checks pass
5. Get code review approval

### Code Quality
- All tests must pass
- Code coverage > 80%
- No linting errors
- Security scan approval
- Documentation updates

## 📄 License

This project is a demonstration application for AI-powered SDLC automation and is not intended for production use without proper security and compliance reviews.

## 🆘 Support

### Troubleshooting
- **Port Conflicts:** Ensure ports 3000 and 8080 are available
- **Docker Issues:** Run `docker-compose down` and rebuild
- **Build Failures:** Check Node.js and Java versions

### Resources
- [React Documentation](https://react.dev/)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Vite Documentation](https://vitejs.dev/)
- [Playwright Documentation](https://playwright.dev/)

---

**Note:** This is a demonstration project showcasing modern full-stack development practices and automated SDLC workflows. The "Freedom" brand is used for demonstration purposes only.
