# Enewable — Project Documentation

> **Solar Power Solutions for South Africa**
> Premium solar installations engineered for load shedding, Eskom independence, and long-term energy savings.

---

## 📋 Project Overview

**Company:** Enewable (enewable.co.za)
**Location:** Gauteng, South Africa (Sandton, Midrand, Fourways, Centurion)
**Industry:** Solar Energy / Renewable Power
**Target Market:** South African homeowners and businesses facing load shedding

### Business Model
- Free site assessments and custom quotes
- Turnkey solar installations (R15,000/kW all-inclusive)
- Residential (3-20kW) and Commercial (20-380kW+) systems
- Premium hardware: Tier 1 panels, hybrid inverters, lithium batteries

### Key Features
- **Solar Genius AI** - Google Gemini-powered chat assistant for system sizing
- **ROI Calculator** - Interactive savings calculator based on Eskom bills
- **Quote Request System** - Lead generation via Resend email API
- **Team Showcase** - Engineering credentials and expertise display

---

## 🎨 Brand Identity System

### Official Brand Spec
Based on Studio Kong brand identity guidelines (see: brand HTML spec)

#### Logo — Sun Brandmark
- **Design:** Circle with 8 rays (rounded rectangles)
- **Scales:**
  - Favicon: 23%
  - Card: 37.5%
  - Header: 62.5% (Navbar/Footer)
  - Signage: 100%
- **Component:** `SunLogo.tsx` (currentColor for theming)

#### Typography
- **Primary Font:** Outfit (Google Fonts)
  - Weights: 300 (Light), 400 (Regular), 700 (Bold), 800 (Extrabold)
- **Body Font:** Inter (Google Fonts)
- **Wordmark:** "ene**w**able" — "w" highlighted in brand yellow
  - Style: Extrabold, tight letter-spacing (-0.03em)

#### Color Palette
```css
/* Primary */
--color-saffron: #F5C107;          /* Brand yellow */

/* Backgrounds */
--color-background: #111111;       /* Dark background */
--color-foreground: #EDECEA;       /* Light text */

/* Light Theme */
--light-bg: #F0EDE4;               /* Light background */
--light-sun: #C48900;              /* Darker sun for contrast */
--light-text: #141414;             /* Dark text on light */

/* Shades (generated) */
--color-saffron-400: #F5C107;      /* Primary */
--color-saffron-500: #C48900;      /* Hover/Active */
--color-saffron-600: #B07800;      /* Dark theme accent */
```

### Design Principles
- **Dark Luxury Industrial** theme
- Glass morphism effects (`backdrop-blur`)
- Blueprint grid overlays (60px grid)
- Saffron accent for CTAs and highlights
- Smooth animations (Framer Motion)

---

## 🛠️ Technical Stack

### Core Framework
- **Next.js 16.1.6** (App Router)
- **React 19.2.3**
- **TypeScript 5**
- **Tailwind CSS 4** (via @tailwindcss/postcss)

### Key Dependencies
```json
{
  "@google/generative-ai": "^0.24.1",  // Solar Genius AI chat
  "@upstash/ratelimit": "^2.0.8",      // API rate limiting
  "@upstash/redis": "^1.36.3",         // Rate limit storage
  "resend": "^6.9.2",                  // Email service (quotes)
  "framer-motion": "^12.34.0"          // Animations
}
```

### Development
- **Node.js:** Latest LTS
- **Package Manager:** npm
- **Linting:** ESLint (Next.js config)
- **Deployment:** Vercel (auto-deploy from GitHub)

---

## 🔒 Security Features

**Security Score:** 9.5/10

### Implemented Security
✅ **HTTP Security Headers** (next.config.ts)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (camera, microphone, geolocation blocked)
- Strict-Transport-Security (HSTS)

✅ **Content Security Policy (CSP)**
- Restricts script sources to self + necessary CDNs
- Blocks inline scripts except framework essentials
- Allows: Google Fonts, Gemini AI API, Upstash Redis

✅ **Security Middleware** (src/middleware.ts)
- Path traversal protection (`../` blocked)
- XSS pattern blocking (`<script`, event handlers)
- Sensitive file access denied (.env, .git, configs)

✅ **API Security**
- Rate limiting: 3 req/min (quote), 10 req/min (chat)
- Input validation & sanitization
- Enhanced email validation (RFC 5322 compliant)
- Length limits on all inputs

✅ **Production Hardening**
- Console logs disabled in production
- Environment variables server-side only
- No secrets in git history

### Documentation
- `SECURITY.md` - Full security audit & guidelines
- `DEPLOYMENT.md` - Deployment checklist & env vars

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Homepage
│   ├── team/page.tsx           # Team page
│   ├── globals.css             # Design system tokens
│   └── api/
│       ├── quote/route.ts      # Quote submission API
│       └── chat/route.ts       # Solar Genius AI API
├── components/
│   ├── SunLogo.tsx             # Brand sun icon (scalable)
│   ├── Navbar.tsx              # Navigation (sticky, mobile)
│   ├── Footer.tsx              # Footer with links
│   ├── HeroSection.tsx         # Hero with CTA
│   ├── FeaturesSection.tsx     # Product features grid
│   ├── ROICalculator.tsx       # Interactive ROI calculator
│   ├── QuoteForm.tsx           # Lead generation form
│   ├── SolarGenius.tsx         # AI chat widget (FAB)
│   ├── Testimonials.tsx        # Customer reviews
│   ├── Team.tsx                # Team member cards
│   └── ProcessSection.tsx      # Installation process
├── middleware.ts               # Security middleware
public/
├── favicon.svg                 # SVG favicon (sun logo)
├── og-image.png                # Social sharing image
└── images/
    └── team/                   # Team member photos
data/
└── pricing/                    # Pricing data for AI
    ├── panels.md
    ├── inverters.md
    ├── batteries.md
    └── systems.md
```

---

## 🔌 API Endpoints

### POST `/api/quote`
**Purpose:** Quote request submission → Email to sales team

**Request Body:**
```json
{
  "property": "house" | "complex" | "business" | "farm",
  "bill": "R2,500 – R5,000",
  "name": "John Doe",
  "email": "john@example.com",  // Optional if phone provided
  "phone": "082 123 4567",      // Optional if email provided
  "area": "Sandton"             // Optional
}
```

**Validation:**
- Email: RFC 5322 compliant regex
- Input sanitization: Removes `<>"'&` characters
- Length limits: name (100), email (100), phone (20)
- Rate limiting: 3 requests/minute (per IP)

**Emails Sent:**
1. Internal notification → `QUOTE_EMAIL_1`, `QUOTE_EMAIL_2`
2. Customer confirmation → User's email (if provided)

**Environment Variables:**
- `RESEND_API_KEY` - Resend API key
- `QUOTE_EMAIL_1` - Primary recipient
- `QUOTE_EMAIL_2` - Secondary recipient

---

### POST `/api/chat`
**Purpose:** Solar Genius AI chat (system sizing, pricing, questions)

**Request Body:**
```json
{
  "message": "What size system do I need?",
  "history": [
    { "role": "user", "text": "Previous question" },
    { "role": "assistant", "text": "Previous answer" }
  ]
}
```

**Validation:**
- Message length: max 2000 characters
- Type checking: must be string
- Rate limiting: 10 requests/minute (per IP)

**AI Model:**
- **Google Gemini 2.0 Flash** (via `@google/generative-ai`)
- System prompt: Includes pricing data from `data/pricing/*.md`
- Context: Last 10 messages from history

**Pricing Calculations:**
- DC/AC Ratio: 1.2 (panels can be 120% of inverter)
- Installation Cost: R15,000/kW all-inclusive
- Panel Sizing: kW ÷ 0.45kW per panel, rounded up to even number
- Inverter Combos: 100kW+ uses parallel inverters

**Environment Variables:**
- `GEMINI_API_KEY` - Google Generative AI API key
- `UPSTASH_REDIS_REST_URL` - (Optional) Redis for rate limiting
- `UPSTASH_REDIS_REST_TOKEN` - (Optional) Redis token

---

## 🎨 Component System

### Design Patterns
- **Client Components:** All interactive components (`"use client"`)
- **Framer Motion:** Smooth scroll animations, page transitions
- **Responsive:** Mobile-first design, breakpoints (sm, md, lg, xl)

### Key Components

#### `<SunLogo />`
**Usage:**
```tsx
<SunLogo
  size="header"           // favicon | card | header | signage
  className="text-saffron"
/>
```
- SVG-based, scalable
- Uses `currentColor` for theming
- Matches brand spec exactly

#### `<ROICalculator />`
**Features:**
- Property type toggle (residential vs commercial)
- Monthly bill slider (R1,500 - R100,000)
- Real-time calculations:
  - Monthly & annual savings
  - Payback period (years + months)
  - 25-year projected savings (12% Eskom increase)
  - Load shedding hours avoided

**Calculations:**
```typescript
// Residential: 72% offset, R28 cost multiplier
// Commercial: 80% offset, R22 cost multiplier
const monthlySaving = monthlyBill * offsetPct;
const systemCost = monthlyBill * costMultiplier;
```

#### `<SolarGenius />`
**Features:**
- Floating Action Button (FAB) - bottom right
- Chat interface with conversation history
- Quick question buttons
- Typing indicator
- Auto-scroll to new messages

**Integration:**
```tsx
// Automatic welcome message on first open
// Conversation persists during session
// API calls to /api/chat
```

---

## 👥 Team Information

### Key Team Members

**Rob Bagley** - Director & Chief Engineer
- 35+ years electrical engineering
- BSc Electrical Engineering (Wits)
- Phone: +27 82 900 6199

**Johnathan Bagley** - Marketing Consultant
- BSc Chemical Engineering
- Marketing & business development

**Chris Wagner** - Structural & Electrical Engineer
- MEng Structural Engineering (UP)
- PrEng, Registered with ECSA

**John Beukes** - Data Scientist & Process Engineer
- BSc Chemical Engineering (Wits)
- MEng Process Engineering (Wits)

---

## 🚀 Deployment & Environment

### Vercel Configuration
- **Platform:** Vercel (linked to GitHub: JonTheory/Enewable)
- **Branch:** main (auto-deploy)
- **Build Command:** `npm run build`
- **Output Directory:** `.next`

### Environment Variables (Production)
```bash
# Email Service
RESEND_API_KEY=re_***
QUOTE_EMAIL_1=johnathan@zeffkong.com
QUOTE_EMAIL_2=johnathanbagleysa@gmail.com

# AI Chat
GEMINI_API_KEY=AIzaSy***

# Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL=https://***
UPSTASH_REDIS_REST_TOKEN=***
```

### Deployment Checklist
1. Environment variables set in Vercel
2. Build succeeds locally (`npm run build`)
3. No TypeScript errors
4. Security headers configured
5. Rate limiting active (if Redis configured)

---

## 📊 Analytics & Monitoring

### Recommended Setup
- **Vercel Analytics** - Traffic & performance
- **Error Tracking** - Sentry (optional)
- **Upstash Console** - Rate limit monitoring
- **Resend Dashboard** - Email delivery tracking

### Key Metrics to Monitor
- Quote form conversion rate
- Solar Genius chat engagement
- Page load times (Core Web Vitals)
- API error rates
- Rate limit hits

---

## 🔧 Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Making Changes

#### Adding New Components
1. Create component in `src/components/`
2. Use TypeScript interfaces for props
3. Add `"use client"` if interactive
4. Import in page where needed
5. Test responsive design

#### Updating Brand Colors
- Edit `src/app/globals.css` color tokens
- Update CSP in `next.config.ts` if adding external resources
- Test dark mode compatibility

#### Modifying API Routes
1. Edit route in `src/app/api/[endpoint]/route.ts`
2. Update input validation
3. Test error handling
4. Check rate limiting works
5. Update documentation

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Description"

# Push to GitHub (triggers Vercel deploy)
git push origin main
```

### Code Style
- **TypeScript:** Strict mode enabled
- **Formatting:** Prettier (via VS Code)
- **Linting:** ESLint (Next.js recommended rules)
- **Naming:** camelCase (variables), PascalCase (components)

---

## 📝 Content Guidelines

### Tone & Voice
- **Professional yet approachable**
- **Technical but understandable** (avoid jargon for homeowners)
- **South African context** (load shedding, Eskom, ZAR pricing)
- **Solution-focused** (benefits over features)

### Key Messaging
- Beat load shedding with reliable solar power
- Eskom independence & long-term savings
- Premium hardware, professional installation
- Local expertise (35+ years engineering)
- Transparent pricing (R15,000/kW turnkey)

### SEO Keywords
- Solar panels South Africa
- Load shedding solution
- Eskom alternative
- Hybrid inverter SA
- Battery backup Gauteng
- Solar installation Sandton

---

## 🐛 Common Issues & Solutions

### Build Errors

**"Module not found: Can't resolve '@google/generative-ai'"**
```bash
npm install @google/generative-ai
```

**"Type error in component"**
- Check TypeScript interfaces match props
- Ensure all required props are passed
- Run `npm run build` to see full errors

### Runtime Issues

**Solar Genius not responding**
- Check `GEMINI_API_KEY` is set correctly
- Verify API quota not exceeded
- Check browser console for errors

**Quote form not sending**
- Verify `RESEND_API_KEY` is valid
- Check email addresses in env vars
- Review Resend dashboard for delivery status

**Rate limiting not working**
- Confirm `UPSTASH_REDIS_REST_URL` is set
- Check Redis credentials are valid
- Verify Upstash dashboard shows connections

### Styling Issues

**Fonts not loading**
- Clear browser cache
- Check Google Fonts CDN is accessible
- Verify font weights are correct (300, 400, 700, 800)

**Colors look wrong**
- Check `globals.css` color tokens
- Verify Tailwind config is correct
- Ensure dark mode class is applied to `<html>`

---

## 📚 Additional Resources

### Documentation
- `SECURITY.md` - Security implementation & guidelines
- `DEPLOYMENT.md` - Deployment checklist & procedures
- `README.md` - Quick start guide (create if needed)

### External Links
- **Vercel Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **Google Gemini API:** https://ai.google.dev/docs

### Design Assets
- Brand identity HTML spec (provided)
- Team photos: `public/images/team/`
- Logo SVG: `src/components/SunLogo.tsx`
- Favicon: `public/favicon.svg`

---

## 🎯 Future Enhancements

### Planned Features
- [ ] Client portal for project tracking
- [ ] Installation gallery (photos)
- [ ] Blog section (SEO content)
- [ ] Video testimonials
- [ ] Live chat support (replace Solar Genius FAB)
- [ ] Multi-language support (Afrikaans, Zulu)

### Technical Improvements
- [ ] Implement ISR for team page
- [ ] Add sitemap.xml generation
- [ ] Set up Google Analytics
- [ ] Add structured data (JSON-LD)
- [ ] Implement image optimization (next/image)
- [ ] Add Playwright E2E tests

### Marketing
- [ ] Google Ads integration
- [ ] Facebook Pixel
- [ ] WhatsApp Business API
- [ ] Email marketing (newsletter)
- [ ] Customer testimonial collection

---

## 📞 Support & Contacts

### Technical Support
- **GitHub:** github.com/JonTheory/Enewable
- **Vercel Dashboard:** vercel.com/dashboard
- **Upstash Console:** console.upstash.com

### Business Contacts
- **Sales:** Rob Bagley - +27 82 900 6199
- **Email:** quotes@enewable.co.za
- **Website:** enewable.co.za

---

**Last Updated:** 2026-03-26
**Version:** 2.0 (Brand Identity Update)
**Maintained by:** Studio Kong (brand), Development Team (technical)

---

## 🤖 AI Assistant Guidelines

When working on this project:

1. **Always maintain brand identity** - Use official colors, fonts, and logo
2. **Security first** - Never expose API keys, validate all inputs
3. **Mobile responsive** - Test all changes on mobile viewports
4. **South African context** - Use ZAR currency, local terminology
5. **Professional quality** - This is a premium brand, maintain high standards
6. **Document changes** - Update this file when making significant modifications
7. **Test thoroughly** - Quote form and Solar Genius are critical features
8. **Preserve security** - Don't disable rate limiting, CSP, or other protections

### Preferred Tools
- Use `npm` (not yarn/pnpm)
- TypeScript strict mode
- Functional components (no class components)
- Tailwind for styling (avoid inline styles)
- Framer Motion for animations

### Code Review Checklist
- [ ] TypeScript types defined
- [ ] Responsive on mobile
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] No console.logs in production
- [ ] Error handling implemented
- [ ] Loading states for async operations
- [ ] Security best practices followed
