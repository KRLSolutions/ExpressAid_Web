# Azure Static Web Apps Deployment Guide

This guide explains how to deploy ExpressAid to Azure Static Web Apps.

## Prerequisites

1. Azure account with an active subscription
2. GitHub account
3. Node.js 18+ installed locally (for development)

## Deployment Steps

### 1. Create Azure Static Web App

1. Go to the Azure Portal (https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web App" and select it
4. Click "Create"
5. Fill in the required information:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `expressaid-web` (or your preferred name)
   - **Region**: Choose the region closest to your users
   - **Build Details**:
     - **Build Preset**: Custom
     - **App location**: `/`
     - **API location**: `/api`
     - **Output location**: Leave empty (not needed for static content)

### 2. Connect to GitHub

1. In the Azure Static Web App, go to "Source control"
2. Click "Connect"
3. Choose GitHub as your source
4. Select your repository and branch (main)
5. Configure the build settings:
   - **App location**: `/`
   - **API location**: `/api`
   - **Output location**: Leave empty

### 3. Configure Environment Variables

1. In your Azure Static Web App, go to "Configuration"
2. Add the following application settings:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
   - `EMAIL_RECEIVER`: Email address to receive applications

### 4. Deploy

1. Push your code to the main branch of your GitHub repository
2. Azure will automatically build and deploy your application
3. You can monitor the deployment in the Azure portal under "Overview"

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## File Structure

```
ExpressAid_Web/
├── index.html              # Main application
├── styles.css              # Styles
├── assets/                 # Static assets
├── api/                    # Azure Functions
│   └── submit-application/
│       ├── index.js        # Function code
│       ├── function.json   # Function configuration
│       └── package.json    # Function dependencies
├── staticwebapp.config.json # Azure Static Web Apps config
├── package.json            # Main dependencies
└── .github/workflows/      # GitHub Actions
    └── azure-static-web-apps.yml
```

## Environment Variables

Make sure to set these in your Azure Static Web App configuration:

- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password (use app password, not regular password)
- `EMAIL_RECEIVER`: Email address to receive nurse applications

## Troubleshooting

1. **Email not working**: Check that your Gmail app password is correct and 2FA is enabled
2. **Function not found**: Ensure the API location is set to `/api` in Azure
3. **Build fails**: Check that all dependencies are properly listed in package.json files

## Security Notes

- Never commit sensitive information like email passwords to your repository
- Use Azure Key Vault for production secrets
- Enable HTTPS for production deployments
- Consider implementing authentication for the API endpoints in production 