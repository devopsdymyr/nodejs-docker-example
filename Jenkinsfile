properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  disableConcurrentBuilds()
]

node {
  def buildUrl = env.BUILD_URL
  def buildNumber = env.BUILD_NUMBER
  def workspace = env.WORKSPACE

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
  echo "PATH is $env.PATH"

  stage('Clean workspace') {
    deleteDir()
  }

  stage('Checkout') {
    checkout scm
  }

  stage('Build') {
    sh "npm run build"
  }

  stage('Deploy') {
    sh "npm run deploy"
  }
}
