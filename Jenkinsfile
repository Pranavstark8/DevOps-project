pipeline {
    agent any

    stages {
        stage('Verify Tools') {
            steps {
                script {
                    sh '''
                    # Check and install jq if not available
                    if ! command -v jq &> /dev/null
                    then
                        echo "jq not found. Installing locally..."
                        curl -L -o jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64
                        chmod +x jq
                        echo "jq installed successfully."
                    fi

                    # Verify tools
                    echo "Verifying tools..."
                    docker version
                    docker info
                    docker compose --version
                    curl --version
                    ./jq --version
                    '''
                }
            }
        }

        stage('Prune Docker Data') {
            steps {
                script {
                    sh '''
                    echo "Pruning unused Docker resources..."
                    docker system prune -a --volumes -f
                    '''
                }
            }
        }

        stage('Start Container') {
            steps {
                script {
                    sh '''
                    echo "Starting containers..."
                    docker-compose up --build
                    docker-compose ps
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                    echo "Running tests..."
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up resources after build'
            sh '''
            echo "Stopping and removing containers..."
            docker compose down
            '''
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}