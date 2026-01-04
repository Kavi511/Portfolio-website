# PowerShell script to check for potential secrets in the repository

Write-Host "🔍 Checking for exposed secrets..." -ForegroundColor Cyan

# Check for MongoDB connection strings with actual cluster names (excluding examples)
Write-Host "Checking for MongoDB connection strings..." -ForegroundColor Yellow
$mongodbMatches = Get-ChildItem -Recurse -File -Exclude "*.log","*.env","node_modules" | 
    Select-String -Pattern "cluster0\.[a-z0-9]{5,}\.mongodb\.net" -ErrorAction SilentlyContinue |
    Where-Object { $_.Line -notmatch "your-cluster|example|xxxxx|placeholder" }

if ($mongodbMatches) {
    Write-Host "❌ WARNING: Found actual MongoDB cluster URLs!" -ForegroundColor Red
    $mongodbMatches | ForEach-Object { Write-Host "  - $($_.Path):$($_.LineNumber)" -ForegroundColor Red }
    exit 1
}

# Check for .env files that might be tracked by git
Write-Host "Checking for .env files tracked by git..." -ForegroundColor Yellow
try {
    $trackedEnvFiles = git ls-files | Where-Object { $_ -match "\.env$" -and $_ -notmatch "\.example|TEMPLATE" }
    if ($trackedEnvFiles) {
        Write-Host "❌ WARNING: Found .env files tracked by git!" -ForegroundColor Red
        $trackedEnvFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
        Write-Host "  Run: git rm --cached <file> to untrack them" -ForegroundColor Yellow
        exit 1
    }
} catch {
    # Git might not be initialized, that's okay
    Write-Host "  (Git not available or repo not initialized)" -ForegroundColor Gray
}

Write-Host "✅ No secrets found in tracked files!" -ForegroundColor Green
Write-Host "✅ Remember: .env files should never be committed!" -ForegroundColor Green

