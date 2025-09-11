#!/bin/bash
# Script to build and deploy the app locally using Docker Compose

set -e

echo "Pulling latest images (if any)..."
docker-compose pull

echo "Building and starting containers..."
docker-compose up --build -d

echo "App is running."
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"

echo "To stop the app, run: docker-compose down"
