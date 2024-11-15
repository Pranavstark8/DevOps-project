pipeline {
    agent any

    environment {
        NODE_VERSION = "16"  // Specify the Node.js version
        REPO_URL = "https://github.com/pranav07/my-docker-repo.git"  // Replace with your repository URL
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Clone the GitHub repository
                    git url: "$REPO_URL", branch: 'main'  // Assuming you want to clone the 'main' branch
                }
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    // Installing Node.js
                    sh '''
                    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
                    apt-get install -y nodejs
                    '''
                }
            }
        }

        stage('Pull Docker Images') {
            steps {
                script {
                    // Example of pulling Docker images after cloning the repository
                    sh '''
                    docker pull node:16        # Pull the official Node.js image
                    docker pull pranav07/api:1.0  # Replace with your Docker Hub image
                    '''
                }
            }
        }

        stage('Build and Run Services with Docker Compose') {
            steps {
                script {
                    // Use Docker Compose to build and run services from docker-compose.yml
                    sh '''
                    docker-compose down      # Stop any existing services
                    docker-compose build     # Build Docker images
                    docker-compose up -d     # Start services in detached mode
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
        }
    }
}