#!/bin/bash
# Script to deploy the app to AWS ECS using Terraform

set -e

cd "$(dirname "$0")/../infra"

echo "Initializing Terraform..."
terraform init

echo "Planning Terraform deployment..."
terraform plan

echo "Applying Terraform deployment..."
terraform apply -auto-approve

echo "Deployment to AWS ECS complete."
