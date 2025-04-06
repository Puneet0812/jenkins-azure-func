# Azure Function CI/CD Pipeline with Jenkins

This project demonstrates a simple CI/CD pipeline using Jenkins, GitHub, and Azure Functions.

---

## 1. Azure Function Setup

- Created Resource Group & Storage:
  ```bash
  az group create --name MyResourceGroup --location centralus
  az storage account create --name puneetstorage12345 --location centralus --resource-group MyResourceGroup --sku Standard_LRS
  ```
- Created Function App:
  ```bash
  az functionapp create --resource-group MyResourceGroup --consumption-plan-location centralus --runtime node --functions-version 4 --name puneet-hello-func --storage-account puneetstorage12345
  ```
- Published using:
  ```bash
  func azure functionapp publish puneet-hello-func
  ```

---

## 2. GitHub Setup

- Repo: [jenkins-azure-func](https://github.com/Puneet0812/jenkins-azure-func)
- Pushed function code, tests, Jenkinsfile

---

## 3. Jenkins Setup

- Installed Plugins:
  - GitHub, Pipeline, Azure CLI, NodeJS, Credentials Binding
- Created Credentials:
  - Azure SPN (username/password)
  - AZURE_TENANT_ID, FUNCTION_APP_NAME, RESOURCE_GROUP (secret text)
  - GitHub PAT

---

## 4. Jenkinsfile Pipeline

Stages:
- **Build**: `npm install`
- **Test**: `npm test` (using Jest - 3 test cases)
- **Deploy**:
  ```bat
  az login --service-principal -u %AZURE_CLIENT_ID% -p %AZURE_CLIENT_SECRET% --tenant %AZURE_TENANT_ID%
  powershell Compress-Archive -Path * -DestinationPath function.zip
  az functionapp deployment source config-zip --resource-group %RESOURCE_GROUP% --name %FUNCTION_APP_NAME% --src function.zip
  ```

---

## 5. Auto-Trigger on GitHub Push

- GitHub Webhook added → Payload URL: `http://<jenkins-local-or-ngrok-url>/github-webhook/`
- Jenkins job configured with:
  - “GitHub hook trigger for GITScm polling”

---

## 6. Verification

- Azure Function URL: https://puneet-hello-func.azurewebsites.net/api/HelloFunction
- All Jenkins stages succeeded
- All tests passed
- Auto-trigger works after each push

---

## Author

**Puneet Mishra** | Submitted on 2025-04-06
Jenkins auto-trigger test on 2025-04-05 22:35:49.71
