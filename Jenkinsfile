pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = "docker.io"
        DOCKER_IMAGE_NAME = "vadakkan01/nodeapp"
        DOCKER_IMAGE_TAG = "0.1"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'master']], userRemoteConfigs: [[url: 'https://github.com/adithyanrk67/nodeapp.git']]])
            }
        }
        stage('Build') {
            steps {
                sh "docker-compose build"
            }
        }
        stage('Test') {
            steps {
                sh "docker-compose up -d"
                sh "docker-compose exec -ti web npm install"  // Install the Node.js app dependencies
                sh "docker-compose exec -ti web node server.js &"  // Start the Node.js server in the background
                sh "docker-compose exec -ti web npm test"  // Run the tests
            }
        }
        stage('Push') {
            steps {
                withCredentials([
                    string(credentialsId: 'github_token_nodeapp', variable: 'GITHUB_TOKEN'),
                    string(credentialsId: 'dockerhub_nodeapp', variable: 'DOCKER_PASSWORD')
                ]) {
                    sh "docker login -u vadakkan01 -p \$DOCKER_PASSWORD \$DOCKER_REGISTRY"
                    sh "docker tag ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                    sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }
}

