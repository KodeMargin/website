import type { Metadata } from "next"
import { internalProducts } from "@/data/portfolio"

const SITE_URL = "https://kodemargin.com"
const PAGE_URL = `${SITE_URL}/portfolio`

const title = "Our Work | Products, Founder Projects and Demo Solutions | KodeMargin"
const description =
    "Explore products being built by KodeMargin, selected software projects completed by the founder, and demo solutions created for real business challenges."

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        type: "website",
        url: PAGE_URL,
        siteName: "KodeMargin",
        title,
        description,
        images: [`${SITE_URL}/KodeMargin.png`],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [`${SITE_URL}/KodeMargin.png`],
    },
}

/**
 * Only the publicly reachable internal products are described in structured
 * data. Founder projects and demo concepts are deliberately excluded — they are
 * not published applications, and marking them up would overstate them.
 */
const productsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products built by KodeMargin",
    itemListElement: internalProducts
        .filter((product) => product.projectUrl)
        .map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: product.title,
                url: product.projectUrl,
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                description: product.description,
            },
        })),
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                // Content is authored in src/data/portfolio.ts, not user input.
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd) }}
            />
            {children}
        </>
    )
}
