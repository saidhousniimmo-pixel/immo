@echo off
REM GitHub Deployment Script for SH Real Estate (Windows)

echo ==========================================
echo   SH Real Estate - GitHub Deployment
echo ==========================================
echo.

REM Navigate to app directory
cd app

REM Initialize git if not already
echo Initializing Git repository...
git init

REM Add all files
echo Adding files to Git...
git add .

REM Commit
echo Creating commit...
git commit -m "Initial commit - SH Real Estate website with bilingual support"

REM Add remote origin
echo Connecting to GitHub repository...
git remote add origin https://github.com/saidhousniimmo-pixel/immo.git 2>nul || echo Remote already exists

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo   SUCCESS! Code pushed to GitHub!
    echo ==========================================
    echo.
    echo Your repository: https://github.com/saidhousniimmo-pixel/immo
    echo.
    echo Next steps:
    echo 1. Go to: https://github.com/saidhousniimmo-pixel/immo
    echo 2. Click 'Settings' -^> 'Pages'
    echo 3. Under 'Source', select 'GitHub Actions'
    echo 4. Your site will be live at: https://saidhousniimmo-pixel.github.io/immo
    echo.
) else (
    echo.
    echo ==========================================
    echo   Push failed. Common issues:
    echo ==========================================
    echo.
    echo 1. Repository doesn't exist:
    echo    - Create it at: https://github.com/new
    echo    - Name: immo
    echo    - Make it Public
    echo.
    echo 2. Authentication required:
    echo    - Use GitHub token or SSH key
    echo    - Or upload files manually via GitHub website
    echo.
)

pause
