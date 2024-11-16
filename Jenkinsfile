pipeline {
    agent any

    environment {
        // Set the path to your Docker Compose file
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git 'https://github.com/Pranavstark8/DevOps-project.git'
            }
        }
        
        stage('Build and Deploy') {
            steps {
                script {
                    // Ensure Docker and Docker Compose are available on the agent
                    sh 'docker --version'
                    sh 'docker-compose --version'
                    
                    // Build and run the services using Docker Compose
                    sh '''
                    docker-compose -f $COMPOSE_FILE up --build -d
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                // You can add additional testing steps here
                echo "Run your tests here, if any"
            }
        }

        stage('Teardown') {
            steps {
                script {
                    // Bring down the services after testing/deployment
                    sh 'docker-compose -f $COMPOSE_FILE down'
                }
            }
        }
    }

    post {
        always {
            // Clean up any resources or logs if needed
            echo 'Cleaning up resources after build'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
