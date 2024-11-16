pipeline {
    agent any
     environment {
        API_SERVICE_URL = 'http://localhost:5002'
        AUTH_SERVICE_URL = 'http://localhost:5001'
        NODE_VERSION='14'
    }
    stages {
        stage('Install NVM and Node.js') {
            steps {
                echo 'Installing NVM and setting up Node.js...'
                sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
                    nvm install $NODE_VERSION
                    nvm alias default $NODE_VERSION
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
                    nvm use $NODE_VERSION
                    cd auth
                    npm install
                    npm install jest --save-dev
                    cd ..
                    cd api
                    npm install
                    npm install jest --save-dev
                '''
            }
        }
        
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
                        docker-compose up -d
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh '''
                        echo "Running tests..."

                        npm install # Install dependencies
                        cd auth
                        npm test
                        cd ..
                        cd api
                        npm test
                    '''
            }
        }
    }

        stage('Stop Services') {
            steps {
                script {
                    echo 'Stopping services...'
                    sh 'docker-compose down' // Clean up after the tests
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