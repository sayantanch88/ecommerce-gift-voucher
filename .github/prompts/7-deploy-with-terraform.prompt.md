---
mode: ask
sdlc_phase: deployment
dependencies: [4, 6]
---

# 7 - Infrastructure Deployment with Terraform

## Overview
Deploy the latest developed and tested code to production infrastructure using Terraform automation, ensuring reliable, repeatable, and scalable deployment processes.

## Objectives
- Deploy latest code from develop branch to production environment
- Utilize Infrastructure as Code (IaC) principles for consistent deployments
- Ensure secure and scalable infrastructure provisioning
- Validate deployment success and service availability
- Maintain deployment history and rollback capabilities

## Prerequisites
- Successful completion of code review and testing (Phase 4)
- Validated Playwright UI tests (Phase 6)
- Terraform configuration files in `infra/` directory
- AWS credentials and appropriate deployment permissions
- Docker images built and available in container registry

## Standards & Guidelines
- Follow infrastructure best practices and security standards
- Use Terraform state management for deployment tracking
- Implement proper resource tagging and organization
- Ensure deployment monitoring and health checks
- Maintain infrastructure documentation and change logs

## Workflow Steps
1. **Pre-Deployment Validation:** Review Terraform scripts and infrastructure state
2. **Code Synchronization:** Fetch latest changes from develop branch
3. **Infrastructure Planning:** Execute Terraform plan and review changes
4. **Resource Deployment:** Apply Terraform configuration to provision resources
5. **Service Validation:** Verify successful deployment and service health
6. **Post-Deployment Monitoring:** Confirm application availability and performance

## Inputs
- **GitHub Branch:** Source branch for deployment (typically `develop`)
  - Source: Git repository with tested and approved code
  - Default: `develop` branch unless specified otherwise
- **Terraform Configuration:** Infrastructure definition files
  - Location: `infra/ecs-deploy.tf` and related configuration files
  - Content: AWS ECS, networking, and security configurations

## Outputs
- **Deployed Infrastructure:** Provisioned AWS resources and services
  - Components: ECS cluster, services, load balancers, security groups
  - Status: Running and accessible production environment
- **Deployment Report:** Summary of deployed resources and configuration
  - Format: Terraform output and deployment logs
  - Content: Resource identifiers, endpoints, and status information

## Quality Gates
- Terraform configuration validation passes without errors
- Infrastructure plan review confirms expected resource changes
- Deployment completes successfully without failures
- Health checks confirm service availability and functionality
- Security configurations meet compliance requirements

## Tools & Integrations
- **Terraform:** Infrastructure as Code provisioning and management
- **AWS Services:** ECS, EC2, VPC, IAM, and related cloud resources
- **GitHub Integration:** Source code synchronization and branch management
- **Container Registry:** Docker image storage and deployment
- **Monitoring Tools:** Service health and performance validation

## Terraform Deployment Standards
### Pre-Deployment Checklist:
- Terraform scripts are validated and properly formatted
- Required AWS resources and permissions are available
- Docker images are built and tagged correctly
- Environment variables and configurations are properly set
- Backup and rollback procedures are documented

### Infrastructure Components:
- **ECS Cluster:** Container orchestration platform
- **Services:** Application services with proper scaling configuration
- **Networking:** VPC, subnets, security groups, and load balancers
- **IAM Roles:** Proper permissions and security policies
- **Monitoring:** CloudWatch logs and metrics collection

### Deployment Process:
1. `terraform init` - Initialize Terraform working directory
2. `terraform plan` - Review infrastructure changes
3. `terraform apply` - Deploy infrastructure resources
4. Service validation and health checks
5. Documentation and deployment logging

## Success Criteria
- Infrastructure deployment completes without errors
- All services are running and accessible
- Health checks confirm application functionality
- Performance metrics meet expected thresholds
- Deployment documentation is updated and maintained
- Rollback procedures are tested and available

---

Deploy the latest code from the develop branch using Terraform infrastructure automation. Review and validate all configurations before executing deployment, and confirm successful service availability upon completion.
