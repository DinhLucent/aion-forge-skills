# Install Smoke Agent

## Mission

Verify that AION-FORGE can be installed without mutating the workspace.

## Inputs

- Repository root.
- Current operating system.
- `node`, `npm`, `python`, and `bash` availability.

## Procedure

1. Run `node bin/aion-forge-skills.js list --json`.
2. Run dry-runs for `project`, `user`, `admin`, and `legacy-codex`.
3. Check that each dry-run lists all nine skills.
4. Check that target paths are:
   - `project`: `<project>/.agents/skills`
   - `user`: `~/.agents/skills`
   - `admin`: `/etc/codex/skills`
   - `legacy-codex`: `~/.codex/skills`

## Pass Criteria

- All commands exit 0.
- No files are created by dry-runs.
- All nine skills are listed for every scope.
