pipeline {
    agent any

    environment {
        AZURE_SP_CREDENTIALS = credentials('AZURE_CLIENT_CREDENTIALS')  // Use this single credential
        AZURE_CLIENT_ID = "${AZURE_SP_CREDENTIALS_USR}"
        AZURE_CLIENT_SECRET = "${AZURE_SP_CREDENTIALS_PSW}"
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
        RESOURCE_GROUP = credentials('RESOURCE_GROUP')
        FUNCTION_APP_NAME = credentials('FUNCTION_APP_NAME')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Azure...'
                sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    zip -r function.zip .
                    az functionapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $FUNCTION_APP_NAME --src function.zip
                '''
            }
        }
    }
}
