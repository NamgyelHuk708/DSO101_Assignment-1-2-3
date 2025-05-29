pipeline {
    agent any
    environment {
        DOCKER_CREDS = credentials('docker-credentials')  // matches your Jenkins credential ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/NamgyelHuk708/DSO101_Assignment-1-2-3'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t namgyelhuk708/secure-backend -f backend/Dockerfile backend/'
                }
            }
        }

        stage('Login & Push to Docker Hub') {
            steps {
                script {
                    sh '''
                    echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin
                    docker push namgyelhuk708/secure-backend
                    '''
                }
            }
        }
    }
}
