param(
    [ValidateSet("project", "user", "legacy-codex", "global")]
    [string]$Scope = "project",
    [string]$ProjectPath = (Get-Location).Path,
    [string]$HomePath = $HOME,
    [string]$CodexHome = $env:CODEX_HOME,
    [switch]$Force,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$source = Join-Path $repoRoot "skills"

if (-not (Test-Path -LiteralPath $source)) {
    throw "Skills source not found: $source"
}

if ($Scope -eq "global") {
    $Scope = "user"
}

if ($Scope -eq "legacy-codex") {
    if ([string]::IsNullOrWhiteSpace($CodexHome)) {
        $CodexHome = Join-Path $HOME ".codex"
    }
    $target = Join-Path $CodexHome "skills"
} elseif ($Scope -eq "user") {
    $target = Join-Path $HomePath ".agents\skills"
} else {
    $projectFullPath = (Resolve-Path -LiteralPath $ProjectPath).Path
    $target = Join-Path $projectFullPath ".agents\skills"
}

Write-Host "AION-FORGE install scope: $Scope"
Write-Host "Source: $source"
Write-Host "Target: $target"

if ($DryRun) {
    Get-ChildItem -LiteralPath $source -Directory | ForEach-Object {
        Write-Host "Would install: $($_.Name)"
    }
    exit 0
}

New-Item -ItemType Directory -Force -Path $target | Out-Null

Get-ChildItem -LiteralPath $source -Directory | ForEach-Object {
    $destination = Join-Path $target $_.Name
    if ((Test-Path -LiteralPath $destination) -and -not $Force) {
        Write-Warning "Skipping existing skill '$($_.Name)'. Re-run with -Force to overwrite files."
        return
    }

    Copy-Item -LiteralPath $_.FullName -Destination $target -Recurse -Force
    Write-Host "Installed: $($_.Name)"
}

Write-Host "Done."
