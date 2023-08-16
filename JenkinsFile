pipeline {
    agent any
    tools {nodejs "WS"}
    
    stages() {
        stage('git clone') {
            steps() {
                slackSend (
                    channel: '#jenkins', 
                    color: '#FFFF00', 
                    message: "STARTED: Job ${env.JOB_NAME}"
                )
                git branch: 'main', credentialsId: 'git-kjk7212', url: 'https://github.com/KEA-SWAVE-SURVEY/Frontend_moduled/'
            }
        }
        
        stage('Build User') {
            steps {
                dir('User') {
                    sh "npm install"
                    sh "npm run build"
                    script{
                        image = docker.build("kjk7212/user-front")
                        docker.withRegistry('https://registry.hub.docker.com/repository/docker/kjk7212/user-front/', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                        }
                    }
                }
            }
            post {
                success {
                    slackSend (
                        channel: '#jenkins', 
                        color: '#00FF00', 
                        message: "SUCCESS: Job ${env.JOB_NAME} Build User"
                    )
                }
                failure {
                    slackSend (
                       channel: '#jenkins', 
                       color: '#FF0000', 
                       message: "FAIL: Job ${env.JOB_NAME} Build User"
                    )
                }
            }
        }

        stage('Build Survey') {
            steps {
                dir('Survey') {
                    sh "npm install"
                    sh "npm run build"
                    script{
                        image = docker.build("kjk7212/survey-front")
                        docker.withRegistry('https://registry.hub.docker.com/repository/docker/kjk7212/survey-front/', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                        }
                    }
                }
            }
            post {
                success {
                    slackSend (
                        channel: '#jenkins', 
                        color: '#00FF00', 
                        message: "SUCCESS: Job ${env.JOB_NAME} Build Survey"
                    )
                }
                failure {
                    slackSend (
                       channel: '#jenkins', 
                       color: '#FF0000', 
                       message: "FAIL: Job ${env.JOB_NAME} Build Survey"
                    )
                }
            }
        }

        stage('Build Response') {
            steps {
                dir('Response') {
                    sh "npm install"
                    sh "npm run build"
                    script{
                        image = docker.build("kjk7212/response-front")
                        docker.withRegistry('https://registry.hub.docker.com/repository/docker/kjk7212/response-front/', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                        }
                    }
                }
            }
            post {
                success {
                    slackSend (
                        channel: '#jenkins', 
                        color: '#00FF00', 
                        message: "SUCCESS: Job ${env.JOB_NAME} Build Response"
                    )
                }
                failure {
                    slackSend (
                       channel: '#jenkins', 
                       color: '#FF0000', 
                       message: "FAIL: Job ${env.JOB_NAME} Build Response"
                    )
                }
            }
        }

        stage('Build Analysis') {
            steps {
                dir('Analysis') {
                    sh "npm install"
                    sh "npm run build"
                    script{
                        image = docker.build("kjk7212/analysis-front")
                        docker.withRegistry('https://registry.hub.docker.com/repository/docker/kjk7212/analysis-front/', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                        }
                    }
                }
            }
            post {
                success {
                    slackSend (
                        channel: '#jenkins', 
                        color: '#00FF00', 
                        message: "SUCCESS: Job ${env.JOB_NAME} Build Analysis"
                    )
                }
                failure {
                    slackSend (
                       channel: '#jenkins', 
                       color: '#FF0000', 
                       message: "FAIL: Job ${env.JOB_NAME} Build Analysis"
                    )
                }
            }
        }

        stage('AgroCD Manifest Update') {
            steps {
                   git credentialsId: 'git-kjk7212',
                       url: 'https://github.com/KEA-SWAVE-SURVEY/argocd-front',
                       branch: 'main'
                dir('apps') {
                   sh "sed -i 's/user-front:.*\$/user-front:${currentBuild.number}/g' user.yaml"
                   sh "git add user.yaml"
                   sh "sed -i 's/survey-front:.*\$/survey-front:${currentBuild.number}/g' survey.yaml"
                   sh "git add survey.yaml"
                   sh "sed -i 's/response-front:.*\$/response-front:${currentBuild.number}/g' response.yaml"
                   sh "git add response.yaml"
                   sh "sed -i 's/analysis-front:.*\$/analysis-front:${currentBuild.number}/g' analysis.yaml"
                   sh "git add analysis.yaml"
                   sshagent(credentials: ['git-ssh']) {
                       sh "git commit -m '[UPDATE] v${currentBuild.number} image versioning'"
                       sh "git remote set-url origin git@github.com:KEA-SWAVE-SURVEY/argocd-front.git"
                       sh "git push -u origin main"
                   }
                }
            }
            post {
                success {
                    slackSend (
                        channel: '#jenkins', 
                        color: '#00FF00', 
                        message: "SUCCESS: Job ${env.JOB_NAME} AgroCD Manifest Update"
                    )
                }
                failure {
                    slackSend (
                       channel: '#jenkins', 
                       color: '#FF0000', 
                       message: "FAIL: Job ${env.JOB_NAME} AgroCD Manifest Update"
                    )
                }
            }
        }
    }
    post {
        success {
            slackSend (
                channel: '#jenkins', 
                color: '#00FF00', 
                message: "SUCCESS: Job ${env.JOB_NAME}"
            )
        }
        failure {
            slackSend (
                channel: '#jenkins', 
                color: '#FF0000', 
                message: "FAIL: Job ${env.JOB_NAME}"
            )
        }
    }
}