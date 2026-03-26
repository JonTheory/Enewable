# Security Implementation Guide

## Overview
This document outlines the security measures implemented in the Enewable website.

Last Updated: 2026-03-26

---

## 🛡️ Security Features

### 1. HTTP Security Headers
**Location:** `next.config.ts`

Implemented headers:
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
- `Permissions-Policy` - Restricts browser features (camera, microphone, geolocation)
- `Strict-Transport-Security` - Enforces HTTPS connections
- `Content-Security-Policy` - Comprehensive CSP to prevent XSS and injection attacks

### 2. Content Security Policy (CSP)
Configured to:
- Allow scripts only from self (with eval for Next.js)
- Restrict external resources to trusted domains
- Block inline scripts and styles except where necessary for framework
- Prevent framing of the site
- Upgrade insecure requests to HTTPS

Trusted domains:
- Google Fonts API (fonts.googleapis.com, fonts.gstatic.com)
- Google Generative AI (generativelanguage.googleapis.com)
- Upstash Redis (*.upstash.io)

### 3. Rate Limiting
**Locations:**
- `src/app/api/chat/route.ts` - 10 requests per 60 seconds
- `src/app/api/quote/route.ts` - 3 requests per 60 seconds

Uses Upstash Redis for distributed rate limiting. Gracefully degrades if Redis is not configured.

### 4. Input Validation & Sanitization
**Location:** `src/app/api/quote/route.ts`

Quote API validates:
- Required fields (property, bill, name, email/phone)
- Email format with robust regex
- Input length limits (prevents payload attacks)
- Sanitizes dangerous characters: `<>"'&`

Chat API validates:
- Message type and length (max 2000 chars)
- Rate limiting per IP

### 5. Enhanced Email Validation
RFC 5322 compliant validation with additional checks:
- Local part max 64 chars
- Domain max 255 chars
- Valid TLD (minimum 2 characters)
- Proper @ symbol usage

### 6. Security Middleware
**Location:** `src/middleware.ts`

Blocks:
- Path traversal attempts (`../`)
- XSS patterns (`<script`, event handlers)
- JavaScript protocol injections
- Eval injection attempts
- Prototype pollution (`__proto__`)
- Access to sensitive files (.env, .git, config files)

### 7. Environment Variable Security
- All `.env*` files in `.gitignore`
- No environment variables exposed to client-side
- API keys only accessed in API routes (server-side)
- Conditional Redis initialization to prevent errors

### 8. Production Logging
All console statements guarded with:
```typescript
if (process.env.NODE_ENV === 'development') {
  console.error(error);
}
```

This prevents sensitive information leakage in production.

---

## 🔒 API Security

### `/api/quote`
- Rate limited to 3 requests/minute
- Input validation on all fields
- Email validation
- Sanitization of user inputs
- Server-side only

### `/api/chat`
- Rate limited to 10 requests/minute
- Message length validation (max 2000 chars)
- Type checking
- Server-side API key usage
- Conversation history limited to last 10 messages

---

## 📋 Security Checklist

- [x] HTTPS enforced (Strict-Transport-Security)
- [x] XSS protection (CSP, no dangerouslySetInnerHTML)
- [x] Clickjacking protection (X-Frame-Options)
- [x] MIME sniffing protection
- [x] Rate limiting on all API endpoints
- [x] Input validation and sanitization
- [x] Environment variables secured
- [x] No secrets in git history
- [x] Production logging disabled
- [x] Security middleware active
- [x] Email validation enhanced
- [x] Path traversal protection
- [x] Prototype pollution protection

---

## 🚨 Future Considerations

### Recommended Additions:
1. **CAPTCHA** - Add reCAPTCHA v3 to quote form if spam increases
2. **Error Logging Service** - Implement Sentry or similar for production error tracking
3. **Security Monitoring** - Set up alerts for rate limit violations
4. **CSRF Protection** - Next.js handles this, but verify if custom forms added
5. **Regular Dependency Audits** - Run `npm audit` monthly
6. **Penetration Testing** - Annual security audit recommended

### Monitoring:
- Monitor rate limit hits in Upstash dashboard
- Track failed quote submissions
- Review error logs for attack patterns
- Check CSP violation reports (if implemented)

---

## 🔧 Maintenance

### Monthly Tasks:
- Run `npm audit` and update dependencies
- Review Upstash rate limit logs
- Check for new security headers/best practices

### Quarterly Tasks:
- Review and update CSP if new services added
- Test rate limiting effectiveness
- Review middleware blocking patterns
- Update this documentation

---

## 📞 Security Contacts

If you discover a security vulnerability:
1. Do NOT open a public GitHub issue
2. Email: [Your Security Email]
3. Include: Description, reproduction steps, potential impact

---

## Version History

- **2026-03-26**: Initial security implementation
  - Added security headers
  - Implemented rate limiting
  - Enhanced email validation
  - Added security middleware
  - Protected console logs
