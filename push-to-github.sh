#!/bin/bash
# GitHub Deployment Script for SH Real Estate

echo "=========================================="
echo "  SH Real Estate - GitHub Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: Git is not installed.${NC}"
    echo "Please install Git first: https://git-scm.com/downloads"
    exit 1
fi

# Navigate to app directory
cd app

# Initialize git if not already
echo -e "${YELLOW}Initializing Git repository...${NC}"
git init

# Configure git (if not already configured)
if [ -z "$(git config --global user.email)" ]; then
    echo "Enter your email address for Git:"
    read email
    git config --global user.email "$email"
fi

if [ -z "$(git config --global user.name)" ]; then
    echo "Enter your name for Git:"
    read name
    git config --global user.name "$name"
fi

# Add all files
echo -e "${YELLOW}Adding files to Git...${NC}"
git add .

# Commit
echo -e "${YELLOW}Creating commit...${NC}"
git commit -m "Initial commit - SH Real Estate website with bilingual support"

# Add remote origin
echo -e "${YELLOW}Connecting to GitHub repository...${NC}"
git remote add origin https://github.com/saidhousniimmo-pixel/immo.git 2>/dev/null || echo "Remote already exists"

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}==========================================${NC}"
    echo -e "${GREEN}  SUCCESS! Code pushed to GitHub!${NC}"
    echo -e "${GREEN}==========================================${NC}"
    echo ""
    echo "Your repository: https://github.com/saidhousniimmo-pixel/immo"
    echo ""
    echo "Next steps:"
    echo "1. Go to: https://github.com/saidhousniimmo-pixel/immo"
    echo "2. Click 'Settings' → 'Pages'"
    echo "3. Under 'Source', select 'GitHub Actions'"
    echo "4. Your site will be live at: https://saidhousniimmo-pixel.github.io/immo"
    echo ""
else
    echo ""
    echo -e "${RED}==========================================${NC}"
    echo -e "${RED}  Push failed. Common issues:${NC}"
    echo -e "${RED}==========================================${NC}"
    echo ""
    echo "1. Repository doesn't exist:"
    echo "   → Create it at: https://github.com/new"
    echo "   → Name: immo"
    echo "   → Make it Public"
    echo ""
    echo "2. Authentication required:"
    echo "   → Use GitHub token or SSH key"
    echo "   → Or upload files manually via GitHub website"
    echo ""
fi
