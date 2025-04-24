# Inner Echo Website - Vercel Deployment Package

This package contains the complete source code and configuration files for deploying the Inner Echo website on Vercel.

## Package Contents

- **Website Source Code**: HTML, CSS, JS files in the root directory
- **API & Backend Functionality**: Located in the `/api` directory
- **CMS Setup**: Located in the `/admin` directory
- **Environment Variables**: Example file at `.env.example`
- **DNS Configuration**: Instructions in `DNS_CONFIGURATION.md`
- **Content Structure**: Empty content structure in `/content` directory

## Deployment Instructions

### 1. GitHub Repository Setup

1. Create a new GitHub repository
2. Upload all files from this package to the repository
3. Ensure the repository structure matches this package

### 2. Vercel Setup

1. Log in to your Vercel account
2. Click "New Project" and import your GitHub repository
3. Configure the project settings:
   - Framework Preset: Select "Other" (or "Next.js" if you convert to Next.js later)
   - Root Directory: ./
   - Build Command: Leave blank for static site (or use `npm run build` if you add build scripts)
   - Output Directory: Leave blank for static site (or set to `public` or `out` if you add build scripts)

### 3. Environment Variables

1. Copy variables from `.env.example` to Vercel's Environment Variables section
2. Replace placeholder values with your actual API keys and credentials
3. For the `SERVICE_ACCOUNT_JSON`, you can either:
   - Store it as a single-line JSON string in an environment variable
   - Use Vercel's "Environment Variable Files" feature for more complex values

### 4. Domain Configuration

1. Follow the instructions in `DNS_CONFIGURATION.md` to configure your domain
2. Add your domain in Vercel project settings
3. Verify domain ownership and wait for DNS propagation

### 5. CMS Setup

1. If using Netlify CMS with Vercel, you'll need to set up an authentication provider:
   - GitHub OAuth: Configure in your GitHub account and add credentials to Vercel
   - Netlify Identity: If you prefer to use Netlify Identity, you'll need a Netlify site as well
2. Run the content folder setup script locally before pushing to GitHub:
   ```
   chmod +x admin/setup-content-folders.sh
   ./admin/setup-content-folders.sh
   ```

### 6. API Routes

The API functionality is set up in the `/api` directory:
- `/api/stripe.js`: Handles payment processing
- `/api/calendar.js`: Handles Google Calendar integration
- `/api/cms.js`: Handles CMS operations

These files are configured to work as Vercel Serverless Functions automatically.

### 7. Testing

After deployment:
1. Test the website functionality
2. Test the booking system
3. Test the payment processing
4. Test the CMS admin interface

## Support

If you encounter any issues during deployment, please refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify CMS Documentation](https://www.netlifycms.org/docs/intro/)
- [Stripe Documentation](https://stripe.com/docs)
- [Google Calendar API Documentation](https://developers.google.com/calendar)
