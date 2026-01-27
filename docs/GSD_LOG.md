# GSD Log: Resume Repo Modernization

## 🎯 PHASE 1: SAFE FOUNDATION
**Status:** Not Started  
**Risk:** Low (additive only)  
**Files:** 3-4 files  
**Duration:** 1-2 hours  
**Dependencies:** None  

### Tasks:
1. **Create new template directories**  
   ```bash
   mkdir -p infrastructure/templates/default/{tex,html}
   mkdir -p user-content/templates/default/{tex,html}
   ```
2. **Copy templates to new location** (read-only backup)  
   ```bash
   cp -r infrastructure/cli/src/templates/* infrastructure/templates/default/
   ```
3. **Add environment variable flag** system  
   - Add `RESUME_TEMPLATE_MODE=legacy|theme` support  
   - Default to `legacy` for backward compatibility  
4. **Update sync-latex.ts** to check flag  
   - Add simple flag check at start of main()  
   - No logic changes yet  

### Validation:
- [ ] `RESUME_TEMPLATE_MODE=legacy bun run sync` produces same output as before  
- [ ] `RESUME_TEMPLATE_MODE=theme bun run sync` produces same output (templates identical)  
- [ ] No changes to generated `.tex` files in `sections/` directory  
- [ ] Feature flag can be easily removed  

### Agent Workflow:
```bash
# 1. Checkout and prepare
git fetch origin && git pull origin main
git checkout -b feature/phase-1-safe-foundation

# 2. Execute tasks
# (Use mcp__acp__Bash for directory creation)
# (Use mcp__serena__copy_symbol for template copying)

# 3. Test
cd infrastructure/cli
bun run sync
# Verify output unchanged
```

---

## 🎯 PHASE 2: CONFIGURATION SYSTEM  
**Status:** Not Started  
**Risk:** Medium (optional feature)  
**Files:** 3 files  
**Duration:** 2-3 hours  
**Dependencies:** Phase 1  

### Tasks:
1. **Create config schema types** (`config.types.ts`)  
   - Define `ResumeConfig` interface with defaults  
   - Export `DEFAULT_CONFIG`  
2. **Add config loader** (`config-loader.ts`)  
   - Function returns `null` if no config file  
   - Graceful fallback to current behavior  
3. **Update main()** to use config if present  
   - Add `if (config) { ... } else { legacy }` logic  
   - Maintain identical output when no config  
4. **Create example config file**  
   - `user-content/resume.config.json.example`  
   - Document all options  

### Validation:
- [ ] Without config file: uses current system (unchanged behavior)  
- [ ] With minimal config: produces identical output  
- [ ] Config validation catches malformed JSON  
- [ ] Example config loads without errors  

### Agent Workflow:
```bash
# 1. Start from Phase 1 completion
git checkout main && git pull origin main
git checkout -b feature/phase-2-config-system

# 2. Create types first, then implementation
# (Use mcp__serena__create_symbol for new files)
# (Keep files < 200 lines)

# 3. Test incremental changes
cd infrastructure/cli
bun run sync  # Should work before and after
```

---

## 🎯 PHASE 3: THEME LOADER
**Status:** Not Started  
**Risk:** Medium (behind flag)  
**Files:** 2-3 files  
**Duration:** 3-4 hours  
**Dependencies:** Phase 1, 2  

### Tasks:
1. **Implement ThemeLoader interface** (`theme.types.ts`)  
   - Define contract for template loading  
   - Support both LaTeX and HTML formats  
2. **Add fallback logic** (`theme-loader.ts`)  
   - User templates → default templates → legacy templates  
   - Respect `RESUME_TEMPLATE_MODE` flag  
3. **Integrate with config system**  
   - Use theme from config if specified  
   - Fall back to environment variable  
4. **Test with feature flag**  
   - Enable/disable via flag only  
   - No production impact until activated  

### Validation:
- [ ] User templates correctly override defaults  
- [ ] Missing templates fall back gracefully with clear errors  
- [ ] All 6 sections render correctly in both formats  
- [ ] Output identical to legacy system when using same templates  

### Agent Workflow:
```bash
# 1. Build on previous phases
git checkout main && git pull origin main  
git checkout -b feature/phase-3-theme-loader

# 2. Test fallback behavior
RESUME_TEMPLATE_MODE=theme bun run sync
# Should produce same output

# 3. Test user overrides
cp infrastructure/templates/default/tex/header.template.ets.tex \
   user-content/templates/default/tex/
# Edit user template, verify it's used
```

---

## 🎯 PHASE 4: UNIFIED CLI
**Status:** Not Started  
**Risk:** Low (wrapper only)  
**Files:** 1 file + documentation  
**Duration:** 1-2 hours  
**Dependencies:** None (can run in parallel)  

### Tasks:
1. **Create `./resume` bash script** at repo root  
   - Simple wrapper for existing commands  
   - Add `init`, `build`, `doctor` commands  
2. **Add proper error handling**  
   - Check for required tools (Bun, LaTeX)  
   - Clear error messages  
3. **Update documentation**  
   - Add to `SETUP.md`  
   - Show usage examples  
4. **Test local execution**  
   - Verify works from repo root  
   - Test all commands  

### Validation:
- [ ] `./resume build` generates resume successfully  
- [ ] `./resume doctor` reports missing tools accurately  
- [ ] Script exits cleanly on errors  
- [ ] Works on macOS/Linux (bash compatible)  

### Agent Workflow:
```bash
# 1. Create executable script
touch resume && chmod +x resume

# 2. Test incrementally
./resume --help  # Should show usage
./resume build   # Should generate PDF

# 3. Update documentation
# (Use mcp__acp__Edit for SETUP.md updates)
```

---

## 🎯 PHASE 5: MIGRATION & CLEANUP
**Status:** Not Started  
**Risk:** High (breaking changes)  
**Files:** All affected  
**Duration:** 2-3 hours  
**Dependencies:** Phase 1-4 stable and tested  

### Tasks:
1. **Remove legacy template paths**  
   - Delete `infrastructure/cli/src/templates/`  
   - Update all references to new paths  
2. **Remove feature flags**  
   - Remove `RESUME_TEMPLATE_MODE` checks  
   - Default to new theme system  
3. **Update all references**  
   - Update `file-names.ts`  
   - Update documentation  
4. **Final testing**  
   - Full regression test  
   - Verify no broken workflows  

### Validation:
- [ ] `bun run sync` works without environment variables  
- [ ] All generated files identical to previous versions  
- [ ] GitHub Actions workflow still works  
- [ ] No regressions in any use case  

### Agent Workflow:
```bash
# 1. ONLY proceed if all previous phases stable
git checkout main && git pull origin main
git checkout -b feature/phase-5-cleanup

# 2. Remove old directories
rm -rf infrastructure/cli/src/templates/

# 3. Test thoroughly
cd infrastructure/cli
bun run sync
# Compare output with backup

# 4. Update CI/CD if needed
# Check .github/workflows/release.yml
```

---

## 🚨 CRITICAL AI AGENT PROTOCOLS

### Before ANY Implementation:
1. **Check Git Status**  
   ```bash
   git status  # Must be clean
   git fetch origin && git pull origin main
   ```
2. **Create Feature Branch**  
   ```bash
   git checkout -b feature/phase-X-description
   ```
3. **Verify Current System Works**  
   ```bash
   cd infrastructure/cli && bun run sync
   ls -la ../sections/*.tex | wc -l  # Should be 6
   ```

### During Implementation:
- **Scope Gates:** Pause if touching >3 files in single change  
- **Testing:** Run `bun run sync` after EACH significant change  
- **Documentation:** Update ALL affected `.md` files  
- **Rollback:** Keep feature flags until final phase  

### After Each Phase:
1. **Thorough Testing**  
   ```bash
   # Create backup of current output
   cp -r infrastructure/sections infrastructure/sections.backup
   
   # Test new system
   bun run sync
   
   # Compare
   diff -r infrastructure/sections infrastructure/sections.backup
   # Should be identical or expected differences only
   ```
2. **Commit with Clear Message**  
   ```bash
   git add .
   git commit -m "feat: [PHASE X] Brief description
   
   - Specific change 1
   - Specific change 2
   - Testing: [describe verification]
   "
   ```
3. **Push and Create PR**  
   ```bash
   git push origin feature/phase-X-description
   gh pr create --fill --body "Closes #<issue> if applicable"
   ```

---

## 📊 SUCCESS METRICS

### Phase 1 Complete When:
- [ ] New template directories exist  
- [ ] Feature flag system implemented  
- [ ] Zero impact on current functionality  

### Phase 2 Complete When:
- [ ] Config system loads without errors  
- [ ] Optional feature doesn't break existing use  
- [ ] Example config serves as good documentation  

### Phase 3 Complete When:
- [ ] ThemeLoader loads all templates correctly  
- [ ] Fallback chain works as designed  
- [ ] Output remains consistent  

### Phase 4 Complete When:
- [ ] `./resume` script works from repo root  
- [ ] All commands execute successfully  
- [ ] Documentation updated  

### Phase 5 Complete When:
- [ ] Legacy code removed  
- [ ] All tests pass  
- [ ] No regressions in any workflow  

---

## ⚠️ RISK MITIGATION

1. **Backup Before Changes**  
   ```bash
   # Always backup current state
   cp -r infrastructure/sections /tmp/sections-backup-$(date +%s)
   cp infrastructure/resume.pdf /tmp/resume-backup-$(date +%s).pdf
   ```
2. **Incremental Testing**  
   - Test after each file change  
   - Compare outputs frequently  
3. **Feature Flags**  
   - All new features behind flags until Phase 5  
   - Easy rollback by removing flag  
4. **Documentation Updates**  
   - Update docs as part of each phase  
   - Never leave documentation outdated  

---

_Last Updated: 2026-01-26 | AI-Optimized for Serena Workflow | Version 2.0_
