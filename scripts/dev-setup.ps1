param(
    [switch]$SkipBackend,
    [switch]$SkipFrontend
)

$ErrorActionPreference = 'Stop'

Write-Host "[Kingken] Bootstrapping development environment..." -ForegroundColor Cyan

if (-not $SkipBackend) {
    Write-Host "[Backend] Installing dependencies" -ForegroundColor Yellow
    Push-Location "$PSScriptRoot\..\backend"
    npm ci --no-audit --no-fund
    npx prisma generate --schema prisma/schema.prisma
    Pop-Location
}

if (-not $SkipFrontend) {
    Write-Host "[Frontend] Installing dependencies" -ForegroundColor Yellow
    Push-Location "$PSScriptRoot\..\frontend"
    npm ci --no-audit --no-fund
    Pop-Location
}

Write-Host "[Kingken] Bootstrap complete." -ForegroundColor Green
