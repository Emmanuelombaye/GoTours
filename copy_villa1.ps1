# Manual file copy script
$sourceFolder = "C:\Users\Antidote\Desktop\exact\GOTOURS@Orign"
$destFolder = "C:\Users\Antidote\Desktop\exact\public\images\villas\villa-1"

# Villa 1 - 8 images
$imagesToMove = @{
    "exterior-2.png" = "Screenshot 2026-02-22 155639.png"
    "living-room-1.png" = "Screenshot 2026-02-22 155744.png"
    "bedroom-2.png" = "Screenshot 2026-02-22 155809.png"
    "kitchen-1.png" = "Screenshot 2026-02-22 155837.png"
    "bathroom-1.png" = "Screenshot 2026-02-22 155855.png"
    "pool-1.png" = "Screenshot 2026-02-22 160025.png"
    "exterior-3.png" = "Screenshot 2026-02-23 095927.png"
    "living-room-2.png" = "Screenshot 2026-02-23 095948.png"
}

foreach ($target in $imagesToMove.Keys) {
    $source = Join-Path $sourceFolder $imagesToMove[$target]
    $destination = Join-Path $destFolder $target
    
    if (Test-Path $source) {
        try {
            Copy-Item $source $destination -Force
            Write-Host "SUCCESS: Copied $target"
        } catch {
            Write-Host "ERROR: Failed to copy $target - $_"
        }
    } else {
        Write-Host "WARNING: Source file not found: $source"
    }
}

Write-Host "Villa 1 image copy process completed."
