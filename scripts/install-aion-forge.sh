#!/usr/bin/env bash
set -euo pipefail

scope="${1:-project}"
project_path="${2:-.}"
force="${AION_FORCE:-0}"

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd -- "$script_dir/.." && pwd)"
source_dir="$repo_root/skills"

if [[ ! -d "$source_dir" ]]; then
  echo "Skills source not found: $source_dir" >&2
  exit 1
fi

case "$scope" in
  global)
    codex_home="${CODEX_HOME:-$HOME/.codex}"
    target="$codex_home/skills"
    ;;
  project)
    target="$(cd -- "$project_path" && pwd)/.agents/skills"
    ;;
  *)
    echo "Usage: install-aion-forge.sh [project|global] [project_path]" >&2
    exit 2
    ;;
esac

mkdir -p "$target"

for skill_dir in "$source_dir"/*; do
  [[ -d "$skill_dir" ]] || continue
  name="$(basename "$skill_dir")"
  dest="$target/$name"
  if [[ -e "$dest" && "$force" != "1" ]]; then
    echo "Skipping existing skill '$name'. Set AION_FORCE=1 to overwrite files."
    continue
  fi
  cp -R "$skill_dir" "$target/"
  echo "Installed: $name"
done

echo "Done."
