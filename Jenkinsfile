pipeline {
    agent any

    stages {
        stage('Veryfying tools'){
            steps{
                sh '''
                    docker version
                    docker info
                    docker compose version
                    curl --version
                    jq --version
                '''
            }
        }
        stage('Prune Docker Data'){
            steps{
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('Start Container'){
            steps{
                sh 'docker compose up -d --no-color --wait'
                sh 'docker compose ps'
            }
        }
        stage('Run tests'){
            steps{
                steps{
                    sh 'curl http://localhost:3000 | jq'
                }
            }
        }
        
    post {
        always {
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
}
