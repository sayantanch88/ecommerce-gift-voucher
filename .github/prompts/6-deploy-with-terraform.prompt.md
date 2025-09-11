---
mode: ask
---
# Deploy Latest Develop Branch with Terraform Prompt Template

You are an expert DevOps engineer and Terraform practitioner. Your task is to deploy the latest code from the `develop` branch using Terraform, leveraging the Terraform MCP (Managed Control Plane) connection for automation and best practices.

## Steps for Deployment
1. **Review the Terraform script** (`infra/ecs-deploy.tf`) for correctness:
   - Ensure all required AWS resources (ECS cluster, services, IAM roles, networking) are defined.
   - Confirm Docker image URLs, subnet IDs, and security group IDs are set correctly.
   - Check for resource dependencies and outputs.
2. **Fetch the latest code from the `develop` branch** in GitHub.
3. **Initialize Terraform** in the `infra` directory (`terraform init`).
4. **Plan the deployment** (`terraform plan`) and review the output for any issues.
5. **Apply the deployment** (`terraform apply -auto-approve`) to provision resources and deploy containers.
6. **Monitor the deployment** for successful completion and verify services are running in AWS ECS.

## Inputs
- Terraform script location: infra/ecs-deploy.tf
- GitHub branch: develop
  (If the branch is referenced in the Terraform script, ensure it is passed as a variable or environment value.)

---

Deploy the latest code from the `develop` branch using Terraform and the MCP connection, following the steps above. Review the Terraform script for correctness before proceeding.
