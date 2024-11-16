pipeline {
    agent any

    stages {
        stage('Verify Tools') {
            steps {
                sh '''
                echo "Verifying required tools..."
                docker version
                docker info
                docker compose version  docker-compose --version
                curl --version
                jq --version  { echo "jq not found! Please install it."; exit 1; }
                '''
            }
        }

        stage('Prune Docker Data') {
            steps {
                sh '''
                echo "Pruning unused Docker resources..."
                docker system prune -a --volumes -f
                '''
            }
        }

        stage('Start Container') {
            steps {
                script {
                    sh '''
                    echo "Starting containers..."

                    # Check if modern Docker Compose is available
                    if command -v docker compose &> /dev/null; then
                        docker compose up --no-color --wait --detach
                        docker compose ps
                    else
                        # Fallback to legacy docker-compose
                        docker-compose up -d --no-color
                        docker-compose ps
                    fi
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                    echo "Running tests..."
                    curl http://localhost:3000 | jq || { echo "Error: Test failed."; exit 1; }
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up resources after build'
            script {
                sh '''
                echo "Stopping and removing containers..."
                
                if command -v docker compose &> /dev/null; then
                    docker compose down
                else
                    docker-compose down
                fi
                '''
            }
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}