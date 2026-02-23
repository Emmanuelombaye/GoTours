@echo off
echo 🚀 Converting Villa Images to WebP Format...
echo.

REM Check if cwebp is available (part of WebP tools)
where cwebp >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ WebP tools not found!
    echo 📥 Please download from: https://developers.google.com/speed/webp/docs/precompiled
    echo 📦 Extract and add cwebp.exe to your PATH
    pause
    exit /b 1
)

echo ✅ WebP tools found
echo.

set BASE_DIR=public\images\villas
set WEBP_DIR=public\images\villas\webp
set BACKUP_DIR=public\images\villas\originals

REM Create directories
if not exist "%WEBP_DIR%" mkdir "%WEBP_DIR%"
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

set total_images=0
set converted_images=0
set total_original_size=0
set total_webp_size=0

echo 📁 Processing villa folders...
echo.

REM Process all villa folders
for /d %%d in ("%BASE_DIR%\villa-*") do (
    echo 🏠 Processing %%~nd...
    
    REM Process all JPG and PNG files
    for %%f in ("%%d\*.jpg" "%%d\*.png") do (
        if exist "%%f" (
            set /a total_images+=1
            
            REM Get original file size
            for %%S in ("%%f") do set /a total_original_size+=%%~zS
            
            REM Create backup
            copy "%%f" "%BACKUP_DIR%\%%~nd_%%~nxf" >nul
            
            REM Convert to WebP
            set input_file=%%f
            set output_file=%WEBP_DIR%\%%~nd_%%~nf.webp
            
            cwebp -q 85 -m 6 "%%f" -o "!output_file!" >nul 2>&1
            
            if exist "!output_file!" (
                set /a converted_images+=1
                
                REM Get WebP file size
                for %%W in ("!output_file!") do set /a total_webp_size+=%%~zW
                
                REM Calculate sizes in MB
                set /a original_mb=%%~zS/1048576
                set /a webp_mb=%%~zW/1048576
                set /a savings_mb=original_mb-webp_mb
                
                echo   📸 %%~nxf: !original_mb!MB → !webp_mb!MB (-!savings_mb!MB)
            ) else (
                echo   ❌ Failed to convert %%~nxf
            )
        )
    )
)

echo.
echo 🎉 WebP Conversion Complete!
echo.
echo 📊 Statistics:
echo   📁 Total images processed: %total_images%
echo   🔄 Images converted: %converted_images%
echo   📦 Original size: %total_original_size:~0,-6% MB
echo   📦 WebP size: %total_webp_size:~0,-6% MB
echo.
echo 💡 Tip: WebP images are ~25%% smaller with same quality!
echo 📁 WebP versions saved in: %WEBP_DIR%
echo 📁 Originals backed up in: %BACKUP_DIR%
echo.
echo 🔄 To use WebP images, update your JSON paths to point to webp/ folder
pause
