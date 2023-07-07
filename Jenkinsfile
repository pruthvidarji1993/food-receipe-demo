pipeline {
  agent any
  environment {
    INSTANCE_IP = '15.206.7.200'
  }
  stages {
    stage('Deploy'){
      when {
              expression {
                env.GIT_BRANCH == 'origin/develop' && env.INSTANCE_IP == '15.206.7.200' 
              }
            }
            steps {
                echo 'Deployment'
                sshagent(credentials: ['zignuts-ubuntu-ssh']) {
                  sh '''
                    ssh -o StrictHostKeyChecking=no 'ubuntu'@${INSTANCE_IP} sh /apps/food-recipe/scripts/website-auto-deploy.sh
                    '''
                }
            }
    }
  }
}