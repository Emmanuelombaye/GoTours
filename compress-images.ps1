$SOURCE = "public/images/villas"
$SIZES = @(320, 640, 1280, 1920)

Write-Host "Starting image optimization..."

$images = Get-ChildItem $SOURCE -Recurse -Include *.png,*.jpg,*.jpeg

foreach ($img in $images) {

    $input = $img.FullName
    $dir = $img.DirectoryName
    $name = [System.IO.Path]::GetFileNameWithoutExtension($img.Name)

    foreach ($size in $SIZES) {

        $webp = Join-Path $dir "$name-$size.webp"
        $avif = Join-Path $dir "$name-$size.avif"

        magick "$input" -resize "$size>" -strip -quality 82 "$webp"
        magick "$input" -resize "$size>" -strip -quality 45 "$avif"
    }

    Write-Host "Processed:" $img.Name
}

Write-Host "DONE. All images optimized."