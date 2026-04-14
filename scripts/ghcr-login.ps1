param(
    [string]$Registry = 'ghcr.io',
    [string]$Username = $env:GITHUB_ACTOR,
    [string]$Token = $env:GHCR_TOKEN
)

$ErrorActionPreference = 'Stop'

if (-not $Username) {
    throw 'Missing username. Set GITHUB_ACTOR or pass -Username.'
}

if (-not $Token) {
    throw 'Missing token. Set GHCR_TOKEN in your terminal before running this script.'
}

$Token | docker login $Registry -u $Username --password-stdin
Write-Host "Logged in to $Registry as $Username" -ForegroundColor Green
