# Deployment Checklist

## Environment Variables Required in Production

Before deploying, ensure these environment variables are set in Vercel:

### Required (Critical):
1. **GEMINI_API_KEY** - Google Generative AI API key for Solar Genius chat
2. **RESEND_API_KEY** - Resend API key for sending quote emails
3. **QUOTE_EMAIL_1** - Primary email recipient for quote requests
4. **QUOTE_EMAIL_2** - Secondary email recipient for quote requests

### Optional (Rate Limiting):
5. **UPSTASH_REDIS_REST_URL** - Upstash Redis URL for rate limiting
6. **UPSTASH_REDIS_REST_TOKEN** - Upstash Redis token

**Note:** Without Redis credentials, rate limiting will be disabled (graceful degradation).

## Setting Environment Variables in Vercel

### Option 1: Via Vercel CLI
```bash
npx vercel env add GEMINI_API_KEY production
npx vercel env add RESEND_API_KEY production
npx vercel env add QUOTE_EMAIL_1 production
npx vercel env add QUOTE_EMAIL_2 production
```

### Option 2: Via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable for Production environment

## Deployment Commands

### Deploy to Production:
```bash
npx vercel --prod
```

### Deploy Preview (for testing):
```bash
npx vercel
```

## Post-Deployment Checklist

- [ ] Verify site is accessible
- [ ] Test quote form submission
- [ ] Test Solar Genius chat
- [ ] Check security headers (use securityheaders.com)
- [ ] Test mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Check all images load correctly
- [ ] Test navigation links

## Security Features Active

✅ All security headers configured in next.config.ts
✅ Content Security Policy active
✅ Rate limiting code deployed (activates when Redis configured)
✅ Input validation on all API endpoints
✅ Enhanced email validation
✅ Security middleware blocking malicious requests
✅ Production logging disabled

## Monitoring

After deployment, monitor:
- Vercel Analytics for traffic
- Function logs for errors
- Email delivery success rate
- Chat API usage

## Rollback

If issues occur:
```bash
# List deployments
npx vercel ls

# Rollback to previous deployment
npx vercel rollback [deployment-url]
```

---

Last Updated: 2026-03-26
