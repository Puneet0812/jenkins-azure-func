pipeline {
    agent any

    environment {
        AZURE_SP_CREDENTIALS = credentials('AZURE_CLIENT_CREDENTIALS')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
        RESOURCE_GROUP = credentials('RESOURCE_GROUP')
        FUNCTION_APP_NAME = credentials('FUNCTION_APP_NAME')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Azure...'
                bat """
                    az login --service-principal -u %AZURE_SP_CREDENTIALS_USR% -p %AZURE_SP_CREDENTIALS_PSW% --tenant %AZURE_TENANT_ID%
                    powershell Compress-Archive -Path * -DestinationPath function.zip
                    az functionapp deployment source config-zip --resource-group %RESOURCE_GROUP% --name %FUNCTION_APP_NAME% --src function.zip
                """
            }
        }
    }
}
