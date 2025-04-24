# DNS Configuration for Inner Echo Website on Vercel

## Current DNS Configuration
You've mentioned that you've already updated your DNS records to point inecho.org to 151.101.1.195. This appears to be a Cloudflare or similar CDN IP address, which is different from how Vercel DNS configuration typically works.

## Vercel DNS Configuration Instructions

For proper Vercel deployment, you'll need to update your DNS configuration as follows:

### Option 1: Using Vercel Domains (Recommended)
1. Add your domain in the Vercel dashboard under Project Settings > Domains
2. Vercel will provide you with specific nameserver records to set at your domain registrar
3. Update your domain's nameservers to the ones provided by Vercel
4. Wait for DNS propagation (can take up to 48 hours, but usually much faster)

### Option 2: Using A Records
If you prefer to keep your current DNS provider:

1. Add your domain in the Vercel dashboard under Project Settings > Domains
2. Create the following A records at your domain registrar:
   - Type: A
   - Name: @ (root domain)
   - Value: 76.76.21.21
   - TTL: 3600 (or Auto)

3. Create the following CNAME record for the www subdomain:
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com.
   - TTL: 3600 (or Auto)

### Additional DNS Records for Services
You may need these additional records for various services:

1. For email services (if using a third-party email provider):
   - MX records as specified by your email provider
   - TXT records for SPF, DKIM, and DMARC as needed

2. For domain verification:
   - TXT records for domain verification with Google services
   - TXT records for domain verification with other services

## SSL Configuration
Vercel automatically provisions and renews SSL certificates for all domains configured in your project. No additional configuration is required for SSL.

## Verifying DNS Configuration
After updating your DNS records:

1. Use a tool like [dnschecker.org](https://dnschecker.org/) to verify propagation
2. Check the Vercel dashboard to confirm domain verification
3. Visit your domain with https:// to verify SSL is working correctly

## Troubleshooting
If you encounter issues with your domain configuration:

1. Verify that DNS records are correctly set up
2. Check for DNS propagation (can take up to 48 hours)
3. Ensure there are no conflicting DNS records
4. Contact Vercel support if issues persist
