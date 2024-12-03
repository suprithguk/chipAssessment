pipeline {
    agent any

    /* Uncomment the following block to schedule the Jenkins job for nightly runs to run 7:00 pm every day
    triggers {
        cron ("0 19 * * *")
    }. */
    tools {nodejs "Node"}
    stages {
        stage("apiTests") {
            steps {
                script {
                    git branch: 'main',
                    url: "https://github.com/suprithguk/chipAssessment.git"
                        sh 'npm install -g npm'
                        sh 'npm install typescript --save-dev' 
                        sh 'npm install cypress --save-dev' 
                        sh 'npm install cypress-mochawesome-reporter --save-dev'
                        sh 'npx cypress run --spec "cypress/e2e/weatherApi.cy.ts"'
                }
            }
        }
        stage("reporting") {
            steps {
                publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'cypress/reports/html',
                reportFiles: 'index.html',
                reportName: 'HTML Report', 
                reportTitles: ''])
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution complete.'
        }
        failure {
            echo 'Pipeline failed.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
    }
}