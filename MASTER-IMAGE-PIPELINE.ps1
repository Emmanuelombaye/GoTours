# ==========================================
# MASTER IMAGE PIPELINE (SAFE VERSION)
# ==========================================

Write-Host ""
Write-Host "🚀 MASTER IMAGE PIPELINE STARTING..." -ForegroundColor Cyan

# ==========================================
# STEP 1: VERIFY IMAGE COUNTS
# ==========================================

$webpCount = (Get-ChildItem public/images/villas -Recurse -Include *.webp -ErrorAction SilentlyContinue).Count
$avifCount = (Get-ChildItem public/images/villas -Recurse -Include *.avif -ErrorAction SilentlyContinue).Count

Write-Host "WebP images : $webpCount"
Write-Host "AVIF images : $avifCount"

# ==========================================
# STEP 2: next.config.js
# ==========================================

Write-Host ""
Write-Host "=== STEP 2: Writing next.config.js ===" -ForegroundColor Yellow

$nextConfig = @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [320, 640, 1280, 1920],
    minimumCacheTTL: 31536000
  }
};

module.exports = nextConfig;
'@

Set-Content -Path "next.config.js" -Value $nextConfig -Encoding UTF8

# ==========================================
# STEP 3: vercel.json
# ==========================================

Write-Host ""
Write-Host "=== STEP 3: Writing vercel.json ===" -ForegroundColor Yellow

$vercelConfig = @'
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
'@

Set-Content -Path "vercel.json" -Value $vercelConfig -Encoding UTF8

# ==========================================
# STEP 4: FINAL STATUS
# ==========================================

Write-Host ""
Write-Host "✅ PIPELINE COMPLETE" -ForegroundColor Green
Write-Host "• Images verified"
Write-Host "• next.config.js written"
Write-Host "• vercel.json written"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. npm run build"
Write-Host "2. vercel --prod"
Write-Host "3. Check x-vercel-cache = HIT"