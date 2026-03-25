# SH Real Estate - Deployment Guide

## 🚀 GitHub Deployment Instructions

### Step 1: Push Code to GitHub Repository

1. Go to https://github.com/saidhousniimmo-pixel/immo
2. If the repository doesn't exist, create it:
   - Click "New Repository"
   - Name: `immo`
   - Make it Public
   - Click "Create repository"

3. Upload the code (two options):

#### Option A: Using Git Command Line
```bash
# Navigate to the app folder
cd app

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SH Real Estate website"

# Add remote
git remote add origin https://github.com/saidhousniimmo-pixel/immo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Option B: Direct Upload via GitHub Website
1. Go to https://github.com/saidhousniimmo-pixel/immo
2. Click "Add file" → "Upload files"
3. Drag and drop all files from the `app` folder
4. Click "Commit changes"

### Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/saidhousniimmo-pixel/immo
2. Click "Settings" (tab at the top)
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment workflow is already configured in `.github/workflows/deploy.yml`

### Step 3: Wait for Deployment

- After pushing code, GitHub Actions will automatically build and deploy
- Go to "Actions" tab to see the build progress
- Once complete, your site will be live at:
  **https://saidhousniimmo-pixel.github.io/immo/**

---

## 🌐 Free Domain Options

### Option 1: DigitalPlat FreeDomain (RECOMMENDED)
**Get a free domain like saidhousni.us.kg or saidhousni.dpdns.org**

1. Go to https://domain.digitalplat.org/
2. Click "Register a new domain"
3. Sign up with your email (Gmail, Outlook, Yahoo accepted)
4. Complete the KYC verification (requires GitHub account)
5. Search for available domains:
   - `saidhousni.us.kg`
   - `saidhousni.dpdns.org`
   - `saidhousni.qzz.io`
   - `saidhousni.xx.kg`
6. Once registered, add Cloudflare DNS for free hosting

**Advantages:**
- Completely free forever
- Legitimate domain extensions
- Works with Cloudflare
- No credit card required

---

### Option 2: GitHub Pages Subdomain (FREE)
**URL: saidhousniimmo-pixel.github.io/immo**

- Already configured in the deployment workflow
- No additional setup needed
- Free SSL certificate
- Automatic deployments

---

### Option 3: Netlify (FREE)
**URL: saidhousni.netlify.app**

1. Go to https://www.netlify.com/
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository: `saidhousniimmo-pixel/immo`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Advantages:**
- Free custom subdomain
- Free SSL
- Fast CDN
- Easy deployment from GitHub

---

### Option 4: Vercel (FREE)
**URL: saidhousni.vercel.app**

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Framework preset: Vite
6. Click "Deploy"

**Advantages:**
- Very fast global CDN
- Free SSL
- Automatic deployments
- Great performance

---

### Option 5: Freenom Alternative - Check Availability

**Note:** Freenom (.tk, .ml, .ga, .cf, .gq) has reliability issues. Instead, try:

#### Check if saidhousni.tk is available:
1. Go to https://www.freenom.com/
2. Search for `saidhousni`
3. Check available extensions

#### Or use Namecheap for cheap domains:
- saidhousni.com - ~$6-12/year
- saidhousni.net - ~$10/year
- saidhousni.org - ~$8/year

---

## 🔗 Connect Custom Domain to GitHub Pages

### If you got a free domain from DigitalPlat:

1. Go to your domain DNS settings (in Cloudflare or DNS provider)
2. Add these DNS records:

**For apex domain (saidhousni.us.kg):**
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**For www subdomain (www.saidhousni.us.kg):**
```
Type: CNAME
Name: www
Value: saidhousniimmo-pixel.github.io
```

3. In your GitHub repository:
   - Go to Settings → Pages
   - Under "Custom domain", enter your domain
   - Click "Save"
   - Check "Enforce HTTPS"

4. Wait for DNS propagation (up to 24 hours)

---

## 📋 Summary of Free Domain Options

| Option | Domain Example | Cost | Difficulty | Reliability |
|--------|---------------|------|------------|-------------|
| DigitalPlat | saidhousni.us.kg | FREE | Medium | High |
| GitHub Pages | saidhousniimmo-pixel.github.io/immo | FREE | Easy | High |
| Netlify | saidhousni.netlify.app | FREE | Easy | High |
| Vercel | saidhousni.vercel.app | FREE | Easy | High |

---

## 🆘 Troubleshooting

### Build fails on GitHub Actions:
- Check that all dependencies are in package.json
- Ensure Node.js version is compatible (v18+)
- Check the Actions logs for specific errors

### Domain not working:
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is properly registered
- Check GitHub Pages custom domain settings

### Website shows 404:
- Ensure vite.config.ts has correct `base` path
- Check that dist folder contains index.html
- Verify GitHub Pages source is set to GitHub Actions

---

## 📞 Need Help?

- GitHub Pages Docs: https://pages.github.com/
- DigitalPlat Discord: Check their website for support
- Netlify Docs: https://docs.netlify.com/
- Vercel Docs: https://vercel.com/docs
