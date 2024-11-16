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
                    // Clone the GitHub repository
                    git url: REPO_URL, branch: 'main'
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

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies for both backend services
                    sh '''
                    cd auth
                    npm install
                    cd ../api
                    npm install
                    '''
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    // Run tests for both auth and API services
                    sh '''
                    cd auth
                    npm test
                    cd ../api
                    npm test
                    '''
                }
            }
        }

        stage('Pull Docker Images') {
            steps {
                script {
                    // Pull Docker base images
                    sh '''
                    docker pull node:${NODE_VERSION}
                    docker pull mongo:5
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
        success {
            echo "Pipeline executed successfully."
        }
        failure {
            echo "Pipeline failed. Please check the logs for details."
        }
    }
}
