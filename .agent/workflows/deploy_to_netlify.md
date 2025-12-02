---
description: How to deploy Ethio-Origin to Netlify
---

# Deploying to Netlify

This guide explains how to host your Ethio-Origin frontend on Netlify.

## Prerequisites
- A [Netlify account](https://app.netlify.com/signup).
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## Steps

1.  **Log in to Netlify**
    - Go to [app.netlify.com](https://app.netlify.com) and log in.

2.  **Add New Site**
    - Click **"Add new site"** > **"Import an existing project"**.

3.  **Connect to Git**
    - Select your Git provider (e.g., **GitHub**).
    - Authorize Netlify if asked.
    - Pick the `Ethio-Origin-frontend` repository from the list.

4.  **Configure Build**
    - Netlify should automatically detect the settings from the `netlify.toml` file we added.
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
    - If these are pre-filled, you are good to go!

5.  **Deploy**
    - Click **"Deploy site"**.
    - Netlify will start building your project. This usually takes 1-2 minutes.

6.  **Verify**
    - Once the build is complete, click the green link (e.g., `https://random-name-12345.netlify.app`) to view your live site.
    - Test navigation (e.g., click "Get Started", refresh the page) to ensure the redirect rules are working.

## Troubleshooting
- **Page Not Found on Refresh**: Ensure `netlify.toml` exists in the root directory with the `[[redirects]]` rule.
- **Build Failures**: Check the "Deploy log" on Netlify for error messages. Common issues are missing dependencies or type errors.
