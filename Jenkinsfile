pipeline {
    agent any

    environment {
        NODE_VERSION = "16"  // Specify the Node.js version
        REPO_URL = "https://github.com/Pranavstark8/DevOps-project.git"  // Replace with your repository URL
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo "Cloning repository from ${REPO_URL}..."
                    // Clone the GitHub repository
                    git url: REPO_URL, branch: 'main'
                    echo "Repository cloned successfully."
                }
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    echo "Installing Node.js version ${NODE_VERSION}..."
                    // Installing Node.js
                    sh '''
                    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
                    apt-get install -y nodejs
                    '''
                    echo "Node.js ${NODE_VERSION} installation complete."
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing dependencies for auth service..."
                    // Install dependencies for auth service
                    sh '''
                    cd auth
                    npm install
                    '''
                    echo "Auth service dependencies installed."

                    echo "Installing dependencies for API service..."
                    // Install dependencies for API service
                    sh '''
                    cd ../api
                    npm install
                    '''
                    echo "API service dependencies installed."
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    echo "Running unit tests for auth service..."
                    // Run tests for auth service
                    sh '''
                    cd auth
                    npm test
                    '''
                    echo "Auth service tests completed."

                    echo "Running unit tests for API service..."
                    // Run tests for API service
                    sh '''
                    cd ../api
                    npm test
                    '''
                    echo "API service tests completed."
                }
            }
        }

        stage('Pull Docker Images') {
            steps {
                script {
                    echo "Pulling Docker images..."
                    // Pull Docker base images
                    sh '''
                    docker pull node:${NODE_VERSION}
                    docker pull pranav/api:latest
                    docker pull pranav/auth:latest
                    docker pull pranav/frontend:latest
                    '''
                    echo "Docker images pulled successfully."
                }
            }
        }

        stage('Build and Run Services with Docker Compose') {
            steps {
                script {
                    echo "Stopping any existing services..."
                    // Stop any existing services
                    sh 'docker-compose down'

                    echo "Building Docker images..."
                    // Build Docker images
                    sh 'docker-compose build'

                    echo "Starting services in detached mode..."
                    // Start services in detached mode
                    sh 'docker-compose up -d'

                    echo "Docker Compose services are up and running."
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
        }
        success {
            echo "Pipeline executed successfully."
        }
        failure {
            echo "Pipeline failed. Please check the logs for details."
        }
    }
}
