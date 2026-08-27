# LUCI WEBSITE — MASTER DEVELOPMENT INSTRUCTIONS

## IMPORTANT: FIGMA IS THE STRUCTURAL SOURCE OF TRUTH

The connected Figma design is the primary reference for the website's:

- Page structure
- Section layouts
- Component placement
- Visual hierarchy
- Spacing
- Typography hierarchy
- Image placement
- Navigation structure
- Footer structure
- Card layouts
- Forms
- Responsive layout intentions
- Overall user experience

The existing Figma design currently uses GREEN as its primary colour.

IMPORTANT:

THE GREEN COLOUR SYSTEM IS OUTDATED.

DO NOT RECREATE THE GREEN BRAND THEME.

Instead, preserve the existing Figma layout and design language while translating the entire visual system into the new LUCI brand theme.

---

# NEW LUCI BRAND THEME

Use:

DEEP MAROON + WHITE + A VERY SMALL AMOUNT OF GOLD

Primary colour:

#6E0F1A

Dark maroon:

#4A0810

White:

#FFFFFF

Warm white:

#FAF8F7

Gold accent:

#C9A227

Dark text:

#252525

Muted text:

#6B6464

---

# COLOUR PROPORTION

The visual balance should approximately be:

70% White / warm white
20% Deep maroon
5% or less Gold
Remaining percentage: neutral colours

White must remain the dominant background colour.

Maroon is the primary LUCI identity.

Gold is ONLY a subtle premium accent.

Do not allow gold to become a major colour.

---

# FIGMA IMPLEMENTATION RULE

DO NOT CHANGE THE EXISTING FIGMA LAYOUT JUST BECAUSE THE COLOUR SYSTEM IS CHANGING.

Preserve the same:

- Section order
- Section dimensions
- Grid structures
- Content hierarchy
- Component positioning
- Image treatment
- Navigation structure
- Footer structure
- Page relationships
- Forms
- Cards
- CTA placement
- Desktop layout
- Mobile layout

The goal is:

EXISTING FIGMA DESIGN
+
NEW LUCI COLOUR SYSTEM
=
FINAL WEBSITE

NOT:

NEW DESIGN FROM SCRATCH

---

# COLOUR TRANSLATION

Translate the existing green design into the new maroon theme intelligently.

Existing green primary elements should become DEEP MAROON.

Existing dark green elements should become DARK MAROON.

Existing light green backgrounds should become WARM WHITE or very subtle maroon-tinted backgrounds.

Existing white elements should generally remain WHITE.

Existing dark text should remain DARK CHARCOAL.

Existing accent elements can use SUBTLE GOLD where appropriate.

Do not mechanically replace every colour with maroon.

Use design judgement.

---

# MAROON USAGE

Use deep maroon for:

- Primary buttons
- Primary CTAs
- Important links
- Navigation active states
- Brand accents
- Major headings where appropriate
- Icons
- Section labels
- Important statistics
- Selected borders
- Hero overlays where necessary
- Major CTA backgrounds

Use dark maroon for:

- Hover states
- Footer background
- Strong contrast areas
- Dark sections

---

# GOLD USAGE

Gold must be VERY LIMITED.

Use gold only for:

- Small decorative lines
- Tiny accent icons
- Small dividers
- Selected highlights
- Small decorative dots
- Minor visual emphasis
- Premium micro-details

DO NOT:

- Make gold a primary button colour
- Use large gold backgrounds
- Use gold for large text blocks
- Use gold excessively
- Make the website look like a luxury jewellery/fashion website

Gold should feel like a subtle premium detail.

---

# WHITE

White should be the dominant visual background.

Use white for:

- Main page backgrounds
- Cards
- Forms
- Navigation where appropriate
- Content sections
- Clean editorial spaces

Use warm white #FAF8F7 for alternating sections where visual separation is needed.

---

# TYPOGRAPHY

Preserve the typography hierarchy from Figma.

Do not arbitrarily change:

- Font sizes
- Font weights
- Line heights
- Letter spacing
- Heading hierarchy

unless required for responsive implementation or accessibility.

Major headings should retain the editorial character of the Figma design.

---

# COMPONENT SYSTEM

Convert repeated Figma patterns into reusable components.

Examples:

- Header
- Navigation
- Footer
- Button
- Section heading
- Programme card
- Event card
- News card
- Resource card
- Testimonial
- Statistic
- CTA section
- Form fields
- Modal
- Gallery
- Pagination
- Filters

Do not duplicate components unnecessarily.

---

# RESPONSIVE IMPLEMENTATION

The Figma desktop design must not simply be shrunk on mobile.

Preserve the design intent while intelligently adapting:

Desktop
Tablet
Mobile

Pay particular attention to:

- Navigation
- Hero sections
- Image cropping
- Grids
- Typography
- Forms
- Cards
- CTA sections
- Tables
- Statistics

---

# FULL-STACK REQUIREMENT

This is NOT a static frontend recreation.

The website must be built as a real full-stack application.

Use:

Next.js
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Auth.js
Paystack
Resend
Cloudinary or S3-compatible storage

Use server-side validation.

Never expose secret keys.

---

# DATABASE

Create appropriate models for:

User
Programme
ProgrammeCategory
Event
EventRegistration
VolunteerApplication
MembershipApplication
PartnershipInquiry
Donation
DonationCampaign
Article
ArticleCategory
Resource
ResourceCategory
ImpactStatistic
ImpactStory
AnnualReport
Gallery
GalleryImage
NewsletterSubscriber
ContactMessage
SafeguardingReport
Partner
SiteSetting

Use relationships properly.

---

# CONTENT RULE

Do not invent LUCI facts.

Do not fabricate:

- Statistics
- Partners
- Addresses
- Registration numbers
- Programme achievements
- Founder information
- Impact numbers
- Legal claims

Use clearly labelled placeholders where real information has not been provided.

---

# BEFORE CODING

Before writing significant application code:

1. Inspect the connected Figma file.
2. Identify all pages.
3. Identify all reusable components.
4. Identify typography.
5. Identify spacing system.
6. Identify layout grids.
7. Identify responsive behaviour.
8. Identify image dimensions/aspect ratios.
9. Identify existing colour usage.
10. Map the old green colours to the new LUCI maroon/white/gold system.
11. Create a reusable design token system.
12. Confirm the implementation plan.

Do NOT redesign the Figma layout.

---

# FINAL DESIGN GOAL

The final website should look like the SAME website represented in Figma structurally.

However, instead of the original green theme, it should have the new:

DEEP MAROON
+
WHITE
+
VERY SMALL AMOUNT OF GOLD

brand identity.

The final result should feel:

- Premium
- Warm
- Human
- Trustworthy
- African
- Institutional
- Modern
- Professional
- Internationally credible

The design should communicate:

FAMILY
UNITY
DIVERSITY
COMMUNITY
TRUST
HOPE
SERVICE

Do not over-design.

Do not redesign.

Translate the existing Figma design into the new LUCI brand.