// ─────────────────────────────────────────────────────────────────────────────
// DISCOUNT CONTROL — flip this flag to show/hide the Startup Launch Banner
// true  = banner visible on every page
// false = banner completely hidden (no layout impact)
// ─────────────────────────────────────────────────────────────────────────────
export const DISCOUNT_ACTIVE = true

// How many spots remain (shown on banner + packages page hero)
export const DISCOUNT_SPOTS_LEFT = 10

// ─────────────────────────────────────────────────────────────────────────────
// Main Packages
// ─────────────────────────────────────────────────────────────────────────────
export type Tier = "platinum" | "gold" | "silver" | "bronze"

export interface MainPackage {
    tier: Tier
    emoji: string
    name: string
    tagline: string
    originalPrice: number
    discountPrice: number
    websitePages: number
    hostingIncluded: boolean
    socialDays: number
    posts: number
    reels: number
    recommended?: boolean
    color: string          // Tailwind class fragment used for accents
    features: string[]
}

export const mainPackages: MainPackage[] = [
    {
        tier: "platinum",
        emoji: "🏆",
        name: "Platinum",
        tagline: "Maximum exposure — total digital domination",
        originalPrice: 899,
        discountPrice: 699,
        websitePages: 5,
        hostingIncluded: true,
        socialDays: 30,
        posts: 30,
        reels: 4,
        recommended: true,
        color: "indigo",
        features: [
            "5-Page Custom Website",
            "Website Hosting Included",
            "30-Day Social Media Management",
            "30 Custom Posts (1/day)",
            "4 Reels (1/week)",
            "Caption Copywriting",
            "Scheduled Publishing",
            "Performance Report",
            "1 Round of Revisions",
            "Basic SEO Setup",
            "Google Maps & Contact Form",
        ],
    },
    {
        tier: "gold",
        emoji: "🥇",
        name: "Gold",
        tagline: "Scale your brand with 2 weeks of content",
        originalPrice: 699,
        discountPrice: 599,
        websitePages: 5,
        hostingIncluded: true,
        socialDays: 15,
        posts: 15,
        reels: 3,
        color: "amber",
        features: [
            "5-Page Custom Website",
            "Website Hosting Included",
            "15-Day Social Media Management",
            "15 Custom Posts (1/day)",
            "3 Reels (1/5 days)",
            "Caption Copywriting",
            "Scheduled Publishing",
            "Performance Report",
            "1 Round of Revisions",
            "Basic SEO Setup",
            "Google Maps & Contact Form",
        ],
    },
    {
        tier: "silver",
        emoji: "🥈",
        name: "Silver",
        tagline: "Solid online presence to get you started",
        originalPrice: 549,
        discountPrice: 499,
        websitePages: 5,
        hostingIncluded: true,
        socialDays: 10,
        posts: 10,
        reels: 2,
        color: "slate",
        features: [
            "5-Page Custom Website",
            "Website Hosting Included",
            "10-Day Social Media Management",
            "10 Custom Posts (1/day)",
            "2 Reels (1/5 days)",
            "Caption Copywriting",
            "Scheduled Publishing",
            "Performance Report",
            "1 Round of Revisions",
            "Basic SEO Setup",
            "Google Maps & Contact Form",
        ],
    },
    {
        tier: "bronze",
        emoji: "🥉",
        name: "Bronze",
        tagline: "Perfect entry point for new businesses",
        originalPrice: 499,
        discountPrice: 400,
        websitePages: 5,
        hostingIncluded: true,
        socialDays: 7,
        posts: 7,
        reels: 1,
        color: "orange",
        features: [
            "5-Page Custom Website",
            "Website Hosting Included",
            "7-Day Social Media Management",
            "7 Custom Posts (1/day)",
            "1 Reel (1/week)",
            "Caption Copywriting",
            "Scheduled Publishing",
            "Performance Report",
            "1 Round of Revisions",
            "Basic SEO Setup",
            "Google Maps & Contact Form",
        ],
    },
]

// ─────────────────────────────────────────────────────────────────────────────
// Standalone Social Media Plans
// ─────────────────────────────────────────────────────────────────────────────
export interface SocialPlan {
    name: string
    days: number
    posts: number
    reels: number | null
    price: number
    isFree?: boolean
    freeBonus: string
    note?: string
}

export const socialPlans: SocialPlan[] = [
    {
        name: "30-Day Plan",
        days: 30,
        posts: 30,
        reels: 4,
        price: 399,
        freeBonus: "+1 Post or Reel FREE",
    },
    {
        name: "15-Day Plan",
        days: 15,
        posts: 15,
        reels: 3,
        price: 199,
        freeBonus: "+1 Post or Reel FREE",
    },
    {
        name: "10-Day Plan",
        days: 10,
        posts: 10,
        reels: 2,
        price: 159,
        freeBonus: "+1 Post or Reel FREE",
    },
    {
        name: "7-Day Plan",
        days: 7,
        posts: 7,
        reels: 1,
        price: 99,
        freeBonus: "+1 Post or Reel FREE",
    },
    {
        name: "3-Day Kickstart",
        days: 3,
        posts: 3,
        reels: null,
        price: 0,
        isFree: true,
        freeBonus: "This package applies only to clients who require standalone website development.",
    },
]

// ─────────────────────────────────────────────────────────────────────────────
// Comparison table rows (what's included in each tier)
// ─────────────────────────────────────────────────────────────────────────────
export interface CompareRow {
    feature: string
    platinum: string | boolean
    gold: string | boolean
    silver: string | boolean
    bronze: string | boolean
}

export const compareRows: CompareRow[] = [
    { feature: "Custom 5-Page Website", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Website Hosting", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Mobile Responsive", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Basic SEO Setup", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Contact Form & Maps", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Social Media Days", platinum: "30 Days", gold: "15 Days", silver: "10 Days", bronze: "7 Days" },
    { feature: "Daily Posts", platinum: "30", gold: "15", silver: "10", bronze: "7" },
    { feature: "Reels", platinum: "4", gold: "3", silver: "2", bronze: "1" },
    { feature: "Caption Copywriting", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Performance Report", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "1 Round of Revisions", platinum: true, gold: true, silver: true, bronze: true },
    { feature: "Original Price", platinum: "$899", gold: "$699", silver: "$549", bronze: "$499" },
    { feature: "Startup Offer (10% OFF)", platinum: "$699", gold: "$599", silver: "$499", bronze: "$400" },
]
