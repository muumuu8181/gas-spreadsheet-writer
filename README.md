# GAS Spreadsheet Writer

Google Apps Script (GAS) and CLASP-based spreadsheet automation tools with verified documentation.

## ⚠️ IMPORTANT: Verified Working Instructions

This README contains **verified and tested** CLASP commands that actually work as of 2024-09-27.
All commands have been tested on Windows 11 with CLASP v2.4.2.

## 🚀 Quick Start - Verified Commands

### 1. Installation
```bash
# Install CLASP globally
npm install -g @google/clasp
```

### 2. Authentication
```bash
# Login to Google Account
npx @google/clasp login

# If port 8085 is blocked, use:
npx @google/clasp login --port 9000

# For manual authentication (most reliable):
npx @google/clasp login --no-localhost
```

### 3. Verify Authentication
```bash
# ✅ CORRECT - Check authentication status
npx @google/clasp list

# ❌ WRONG - These commands DO NOT exist:
# clasp login --status    # Does not exist!
# clasp projects          # Does not exist!
```

### 4. Create New Project
```bash
# Create a new GAS project
npx @google/clasp create --title "My Project" --type sheets

# Available types: sheets, docs, forms, slides, webapp, api
```

### 5. Push Code
```bash
# Push local files to GAS
npx @google/clasp push

# Force push (overwrites remote)
npx @google/clasp push -f
```

### 6. Deploy
```bash
# Create a deployment
npx @google/clasp deploy --description "Initial deployment"

# List all deployments
npx @google/clasp deployments
```

## ✅ Verified CLASP Commands (Windows)

All commands require `npx @google/clasp` prefix on Windows:

| Command | Description | Verified |
|---------|------------|----------|
| `login` | Authenticate with Google | ✅ Works |
| `logout` | Log out from Google | ✅ Works |
| `list` | Show all your GAS projects | ✅ Works |
| `create` | Create new GAS project | ✅ Works |
| `clone [scriptId]` | Clone existing project | ✅ Works |
| `push` | Upload code to GAS | ✅ Works |
| `pull` | Download code from GAS | ✅ Works |
| `deploy` | Create new deployment | ✅ Works |
| `deployments` | List all deployments | ✅ Works |
| `undeploy [deploymentId]` | Remove deployment | ✅ Works |
| `version [description]` | Create new version | ✅ Works |
| `versions` | List all versions | ✅ Works |
| `logs` | Show execution logs | ✅ Works |
| `run [functionName]` | Execute function | ✅ Works* |
| `open --webapp` | Open web app in browser | ✅ Works |
| `status` | Show files to be pushed | ✅ Works |

*Requires `executionApi` configuration in appsscript.json

## ❌ Commands That DO NOT Exist

These commands are mentioned in some documentation but **DO NOT EXIST**:

- `clasp login --status` - Use `clasp list` instead
- `clasp projects` - Use `clasp list` instead
- `clasp open` - Use `clasp open --webapp` instead

## 🔧 Authentication Troubleshooting

### Common Error: ERR_CONNECTION_REFUSED

If you see `ERR_CONNECTION_REFUSED` error when running `clasp login`:
```
Error: Failed to launch the browser process!
ERR_CONNECTION_REFUSED
```

**This happens because:**
- Port 8085 (default) is already in use or blocked
- Firewall is blocking the connection
- Antivirus software is interfering

### Solutions:

1. **Try manual authentication (most reliable - avoids port issues)**:
```bash
npx @google/clasp login --no-localhost
# Copy the code from browser and paste in terminal
```

2. **Change port if 8085 is blocked**:
```bash
npx @google/clasp login --port 9000
# Or try other ports: 8086, 8087, 3000, etc.
```

3. **Clear old credentials and retry**:
```bash
# Windows
del %USERPROFILE%\.clasprc.json
npx @google/clasp login
```

4. **Check authentication success**:
```bash
# If this shows your projects, you're authenticated
npx @google/clasp list
```

## 📁 Project Structure

### 01_code/
Production-ready GAS scripts and code
- Working CLASP configuration files
- Tested GAS functions
- HTML templates for Web Apps

### 02_docs/
Technical documentation (use with caution - some may be outdated)
- Business strategies
- Technical guides
- Quick references

### 03_tests/
Test results and verification reports
- `COMPLETE_CLASP_TEST_RESULTS.md` - Full test results from 2024-09-27
- Verification reports for all commands

### 04_templates/
Ready-to-use templates
- HTML dashboards
- Form templates
- Distribution guides

### 05_tools/
Testing and development tools
- API testing scripts
- CLASP testing tools

### 06_business/
Business resources and demos

### old/
⚠️ **Outdated documentation** - May contain incorrect commands
- Legacy documentation with errors
- Old guides that reference non-existent commands
- Kept for historical reference only

## 🎯 Essential Files

### For CLASP Setup:
- `.clasp.json` - Links your local project to GAS (auto-generated)
- `appsscript.json` - GAS project configuration

### Example appsscript.json:
```json
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
```

## 💡 Key Discoveries

1. **Windows requires `npx` prefix** - Never use `clasp` directly
2. **Authentication check is `list` not `projects`**
3. **Manual auth (`--no-localhost`) is most reliable**
4. **Web App URL format**: `https://script.google.com/macros/s/{deploymentId}/exec`

## 📚 Verified Resources

- [Official CLASP GitHub](https://github.com/google/clasp)
- Test Results: `03_tests/COMPLETE_CLASP_TEST_RESULTS.md`
- Troubleshooting: `CLASP_AUTH_TROUBLESHOOT.md`

## Version

v1.0 - Fully verified and tested documentation (2024-09-27)

---

**Note**: This documentation has been thoroughly tested. If you find any commands that don't work, please report them. Do NOT rely on documentation in the `old/` folder as it contains known errors.