#!/bin/bash

# Exit the script on any failure
set -e

echo "Starting tests..."

# Run tests for the Auth service
echo "Running tests for Auth service..."
cd auth
npm install  # Ensure dependencies are installed
npm test     # Run tests using Jest (or whichever test framework you're using)
cd ..

# Run tests for the API service
echo "Running tests for API service..."
cd api
npm install  # Ensure dependencies are installed
npm test     # Run tests using Jest (or whichever test framework you're using)
cd ..

echo "Tests completed successfully!"