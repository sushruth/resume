# Template Positioning Implementation Plan

## Overview
Transform the personal resume repository into a fork-friendly template for others to use.

## Key Changes Required

### 1. Content Separation
**User-Editable (Template Content):**
- `resume/careerProfile.json` - Personal resume data
- `resume/resume.xmpdata` - PDF metadata
- `README.md` - Project description
- Personal documentation files

**Infrastructure (Template System):**
- `cli/` - Complete sync engine
- `.github/workflows/` - CI/CD pipeline  
- `resume/TLCresume.sty` - LaTeX styling
- All build and compilation systems

### 2. Documentation Updates
- Create SETUP.md with step-by-step instructions
- Rewrite README.md for template audience
- Update AGENTS.md for template context
- Add troubleshooting guide

### 3. Portability Enhancements
- Ensure all paths are relative
- Test CI/CD works for any repository name
- Add validation for user data
- Create migration guide

### 4. User Experience
- One-click setup: Fork and edit careerProfile.json
- Clear error messages for data issues
- Automated builds with no manual LaTeX compilation
- Comprehensive documentation

## SPEC.md Update Protocol (CRITICAL)

**MANDATORY**: All AI agents must update SPEC.md after completing ANY task:
1. Mark tasks with `[x]` and update status
2. Add completion notes with timestamp
3. Update next steps and new tasks
4. Follow the example format in SPEC.md

## Progress Update (2025-01-24) - Phase 1 Complete

✅ **COMPLETED**: Repository structure and documentation
- Restructured directory layout with clear separation
- Fixed all CLI and CI/CD path references  
- Created comprehensive SETUP.md guide
- Updated root README.md for template users
- Verified CLI sync works with new structure
- GitHub workflows updated for new paths

## Remaining Tasks
- Test actual fork workflow end-to-end
- Add data validation for user content
- Create migration guide for existing users

✅ **COMPLETED**: Repository structure restructuring
- Created clear separation: user-content/ vs infrastructure/
- Moved user-editable files to user-content/
- Moved infrastructure files to infrastructure/
- Updated all path references in config files
- Updated CI/CD workflow paths
- Created new PROJECT_STRUCTURE.md documentation

## Implementation Order
1. Create SPEC.md (✅ Done)
2. Restructure repository directories
3. Update documentation for template users
4. Test fork workflow
5. Add validation and error handling
6. Create setup guides

## Success Metrics
- New user can fork and generate resume in < 10 minutes
- No infrastructure changes required by users
- Clear separation of content vs. system
- Comprehensive documentation covers all use cases