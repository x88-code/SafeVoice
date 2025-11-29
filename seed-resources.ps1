# PowerShell script to seed resources database
# Run this from PowerShell: .\seed-resources.ps1

$url = "https://safevoice-d9jr.onrender.com/api/resources/seed"

Write-Host "Seeding resources database..." -ForegroundColor Yellow
Write-Host "URL: $url" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -ContentType "application/json"
    
    Write-Host "`n✅ Success!" -ForegroundColor Green
    Write-Host "Message: $($response.message)" -ForegroundColor Green
    if ($response.count) {
        Write-Host "Resources seeded: $($response.count)" -ForegroundColor Green
    }
} catch {
    Write-Host "`n❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

