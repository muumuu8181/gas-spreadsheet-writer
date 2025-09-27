# CLI-Only Workflow for GAS Development

Complete GAS development without opening the browser - using only CLI commands.

## 🚀 Quick Setup (3 minutes)

```bash
# 1. Install CLASP globally
npm install -g @google/clasp

# 2. Login to Google (one-time)
npx @google/clasp login

# 3. Create new project
npx @google/clasp create --title "My Project" --type sheets

# 4. Push your code
npx @google/clasp push

# 5. Deploy
npx @google/clasp deploy --description "v1.0"
```

## 📁 Project Structure for CLI

```
my-gas-project/
├── .clasp.json          # CLASP configuration
├── appsscript.json      # GAS manifest
├── Code.gs              # Main backend code
├── tutorial.html        # HTML interface
├── tutorial-backend.gs  # Backend for HTML
└── deploy.sh            # Deployment script
```

## 🔧 Complete CLI Commands

### Project Management
```bash
# Create new project
npx @google/clasp create --title "Project Name"

# Clone existing project
npx @google/clasp clone <scriptId>

# List all your projects
npx @google/clasp list

# Open in browser (when needed)
npx @google/clasp open

# Open specific deployment
npx @google/clasp open --deploymentId <id>
```

### Code Development
```bash
# Push local files to GAS
npx @google/clasp push

# Pull remote changes
npx @google/clasp pull

# Watch for changes and auto-push
npx @google/clasp push --watch

# Force push (overwrites remote)
npx @google/clasp push -f
```

### Deployment & Versioning
```bash
# Create new version
npx @google/clasp version "Version description"

# List all versions
npx @google/clasp versions

# Deploy specific version
npx @google/clasp deploy --versionNumber 3

# List all deployments
npx @google/clasp deployments

# Undeploy
npx @google/clasp undeploy <deploymentId>
```

### Testing & Execution
```bash
# Run function from CLI
npx @google/clasp run functionName

# Run with parameters
npx @google/clasp run functionName --params '[{"name":"value"}]'

# View logs
npx @google/clasp logs

# Stream logs (real-time)
npx @google/clasp logs --watch

# View simplified logs
npx @google/clasp logs --simplified
```

## 🎯 CLI-Only Development Workflow

### Step 1: Initialize Project
```bash
mkdir my-gas-app
cd my-gas-app
npx @google/clasp create --title "My App" --type sheets
```

### Step 2: Add HTML and Code
```bash
# Create HTML file
cat > index.html << 'EOF'
<!DOCTYPE html>
<html>
<head><base target="_top"></head>
<body>
    <h1>My GAS App</h1>
    <button onclick="google.script.run.myFunction()">Run</button>
</body>
</html>
EOF

# Create backend
cat > Code.gs << 'EOF'
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function myFunction() {
  console.log('Function executed!');
  return 'Success';
}
EOF
```

### Step 3: Configure and Deploy
```bash
# Configure manifest
cat > appsscript.json << 'EOF'
{
  "timeZone": "Asia/Tokyo",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
EOF

# Push and deploy
npx @google/clasp push
npx @google/clasp deploy --description "Initial release"
```

### Step 4: Get Web App URL
```bash
# Get deployment info
npx @google/clasp deployments

# The Web App URL will be shown
# Format: https://script.google.com/macros/s/{deploymentId}/exec
```

## 🛠️ Advanced CLI Automation

### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Push code
echo "📤 Pushing code..."
npx @google/clasp push -f

# Create version
VERSION="v$(date +%Y%m%d-%H%M%S)"
echo "📌 Creating version: $VERSION"
npx @google/clasp version "$VERSION"

# Deploy
echo "🌐 Deploying..."
DEPLOYMENT=$(npx @google/clasp deploy --description "$VERSION")

# Extract URL
URL=$(echo "$DEPLOYMENT" | grep -oP 'https://[^\s]+')
echo "✅ Deployed to: $URL"

# Save to file
echo "$URL" > deployment-url.txt
echo "💾 URL saved to deployment-url.txt"
```

### CI/CD Pipeline Example
```yaml
# .github/workflows/deploy.yml
name: Deploy GAS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install CLASP
        run: npm install -g @google/clasp

      - name: Setup credentials
        run: |
          echo "${{ secrets.CLASPRC }}" > ~/.clasprc.json
          echo "${{ secrets.CLASP_JSON }}" > .clasp.json

      - name: Deploy
        run: |
          npx @google/clasp push -f
          npx @google/clasp deploy --description "Auto-deploy from GitHub"
```

## 📝 Working with HTML Files

### Push HTML with Backend
```bash
# Create paired files
touch dashboard.html
touch dashboard-server.gs

# Edit HTML
cat > dashboard.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <base target="_top">
    <style>
        body { font-family: Arial; padding: 20px; }
        .button {
            background: #4285f4;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Dashboard</h1>
    <button class="button" onclick="runProcess()">Run Process</button>
    <div id="output"></div>

    <script>
        function runProcess() {
            google.script.run
                .withSuccessHandler(showResult)
                .withFailureHandler(showError)
                .processData();
        }

        function showResult(result) {
            document.getElementById('output').innerHTML = result;
        }

        function showError(error) {
            document.getElementById('output').innerHTML = 'Error: ' + error;
        }
    </script>
</body>
</html>
EOF

# Create backend
cat > dashboard-server.gs << 'EOF'
function showDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('dashboard')
    .setTitle('Dashboard')
    .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

function processData() {
  // Your processing logic here
  const result = "Process completed at: " + new Date();
  return result;
}
EOF

# Push all files
npx @google/clasp push
```

## 🔄 File Watching & Auto-Deploy

### Setup Auto-Push on Save
```bash
# Install nodemon
npm install -g nodemon

# Create watch script
cat > watch.js << 'EOF'
const { exec } = require('child_process');

console.log('👁️ Watching for changes...');

exec('npx @google/clasp push --watch', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
});
EOF

# Run watcher
node watch.js
```

### Alternative with npm scripts
```json
// package.json
{
  "name": "gas-project",
  "scripts": {
    "push": "clasp push",
    "deploy": "clasp push && clasp deploy",
    "watch": "clasp push --watch",
    "logs": "clasp logs --watch",
    "dev": "npm run watch & npm run logs"
  }
}
```

## 🎨 HTML Template System

### Multi-page Application
```bash
# Create multiple HTML files
for page in home settings profile; do
  cat > $page.html << EOF
<!DOCTYPE html>
<html>
<head><base target="_top"></head>
<body>
    <h1>$(echo $page | tr '[:lower:]' '[:upper:]') Page</h1>
    <nav>
        <a href="#" onclick="navigate('home')">Home</a>
        <a href="#" onclick="navigate('settings')">Settings</a>
        <a href="#" onclick="navigate('profile')">Profile</a>
    </nav>
    <div id="content"></div>
    <script>
        function navigate(page) {
            google.script.run.loadPage(page);
        }
    </script>
</body>
</html>
EOF
done

# Push all HTML files
npx @google/clasp push
```

## ⚡ Performance Tips

### Batch Operations
```bash
# Push multiple files efficiently
npx @google/clasp push --force

# Skip .claspignore
npx @google/clasp push --no-ignore

# Push specific files only
echo "*.html" > .claspignore
npx @google/clasp push
```

### Debug Mode
```bash
# Enable verbose logging
export CLASP_DEBUG=true
npx @google/clasp push

# Check CLASP config
npx @google/clasp status
```

## 🔒 Security & Credentials

### Store Credentials Securely
```bash
# Backup credentials
cp ~/.clasprc.json ~/.clasprc.backup

# Use environment variables
export CLASP_CREDS=$(cat ~/.clasprc.json | base64)

# Restore from env
echo $CLASP_CREDS | base64 -d > ~/.clasprc.json
```

## 📊 Complete Example: Data Dashboard

```bash
#!/bin/bash
# create-dashboard.sh

echo "Creating Data Dashboard..."

# Initialize
npx @google/clasp create --title "Data Dashboard" --type sheets

# Create all files
cat > dashboard.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <base target="_top">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-4">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Data Dashboard</h1>

        <div class="grid grid-cols-3 gap-4 mb-4">
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold">Total Records</h2>
                <p class="text-3xl" id="total">0</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold">Active</h2>
                <p class="text-3xl text-green-600" id="active">0</p>
            </div>
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold">Pending</h2>
                <p class="text-3xl text-yellow-600" id="pending">0</p>
            </div>
        </div>

        <button onclick="refreshData()" class="bg-blue-500 text-white px-4 py-2 rounded">
            Refresh Data
        </button>

        <div id="data-table" class="mt-4"></div>
    </div>

    <script>
        function refreshData() {
            google.script.run
                .withSuccessHandler(updateDashboard)
                .getDashboardData();
        }

        function updateDashboard(data) {
            document.getElementById('total').textContent = data.total;
            document.getElementById('active').textContent = data.active;
            document.getElementById('pending').textContent = data.pending;

            // Update table
            let html = '<table class="w-full bg-white rounded shadow">';
            html += '<thead><tr class="bg-gray-200">';
            html += '<th class="p-2">ID</th><th class="p-2">Name</th><th class="p-2">Status</th>';
            html += '</tr></thead><tbody>';

            data.records.forEach(record => {
                html += `<tr class="border-t">
                    <td class="p-2">${record.id}</td>
                    <td class="p-2">${record.name}</td>
                    <td class="p-2">${record.status}</td>
                </tr>`;
            });

            html += '</tbody></table>';
            document.getElementById('data-table').innerHTML = html;
        }

        // Load on startup
        window.onload = refreshData;
    </script>
</body>
</html>
EOF

cat > Code.gs << 'EOF'
function doGet() {
  return HtmlService.createHtmlOutputFromFile('dashboard')
    .setTitle('Data Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDashboardData() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Skip header
  const records = data.slice(1).map((row, index) => ({
    id: index + 1,
    name: row[0],
    status: row[1]
  }));

  return {
    total: records.length,
    active: records.filter(r => r.status === 'Active').length,
    pending: records.filter(r => r.status === 'Pending').length,
    records: records.slice(0, 10) // Top 10
  };
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Dashboard')
    .addItem('Open Dashboard', 'openDashboard')
    .addToUi();
}

function openDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('dashboard')
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi()
    .showModalDialog(html, 'Data Dashboard');
}
EOF

# Push and deploy
npx @google/clasp push
npx @google/clasp deploy --description "Dashboard v1"

echo "✅ Dashboard created and deployed!"
```

## 🎓 Tips & Best Practices

1. **Always use `npx @google/clasp` on Windows**
2. **Keep `.clasp.json` in version control**
3. **Use `.claspignore` to exclude files**
4. **Test locally with `clasp run` before deploying**
5. **Use `--watch` during development**
6. **Automate with shell scripts**
7. **Version your deployments properly**

---

**💡 CLI-only workflow enables:**
- CI/CD automation
- Version control integration
- Batch operations
- Remote development
- Scriptable deployments