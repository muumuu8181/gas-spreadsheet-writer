# ⚠️ OUTDATED DOCUMENTATION - DO NOT USE

This folder contains outdated documentation that has been moved here because it contains **incorrect or non-existent CLASP commands**.

## Why These Documents Are Outdated

These documents contain references to CLASP commands that **DO NOT EXIST**:

### ❌ Incorrect Commands Found:
- `clasp login --status` - This option doesn't exist
- `clasp projects` - This command doesn't exist (use `clasp list` instead)
- `clasp open` - Incomplete command (should be `clasp open --webapp`)

### Files Moved Here:
1. **CLASP_CONTAINER_BOUND_COMPLETE_GUIDE.md** - Contains `clasp projects` which doesn't exist
2. **test-clasp-run.js** - Contains incorrect command examples
3. **02_TECHNICAL_COMPLETE_GUIDE.md** - Contains `clasp open` without --webapp flag
4. **03_QUICK_REFERENCE.md** - Contains incomplete commands

## ✅ Use the Main README Instead

For **correct and verified** CLASP commands, please refer to:
- **[../README.md](../README.md)** - Contains fully tested and verified commands
- **[../CLASP_AUTH_TROUBLESHOOT.md](../CLASP_AUTH_TROUBLESHOOT.md)** - Correct troubleshooting steps
- **[../clasp-test-from-zero/COMPLETE_CLASP_TEST_RESULTS.md](../clasp-test-from-zero/COMPLETE_CLASP_TEST_RESULTS.md)** - Full test results

## Correct Commands Summary

Always use these instead:
```bash
# ✅ CORRECT
npx @google/clasp list          # Check projects (NOT "projects")
npx @google/clasp open --webapp  # Open web app (NOT just "open")

# ❌ WRONG
clasp login --status    # Doesn't exist!
clasp projects          # Doesn't exist!
clasp open             # Incomplete!
```

---

**Note**: These documents are kept for historical reference only. They may contain other useful information, but any CLASP commands in them should be verified against the main README first.