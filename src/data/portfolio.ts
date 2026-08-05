/**
 * Work / portfolio content.
 *
 * Content integrity rules for this file:
 * - Never add client names, logos, testimonials, ratings, revenue, user counts
 *   or outcome metrics that have not actually been verified.
 * - `ownership` must always describe the project honestly. Internal products,
 *   founder experience and demo concepts are presented differently on the page.
 *
 * ASSETS TODO (developer-facing only, never rendered):
 * - Founder projects and demo concepts have no `image` yet, so they render a
 *   coded abstract UI panel instead. To use a real screenshot, add a ~16:9 file
 *   to /public/work/ and set `image` plus a descriptive `imageAlt`.
 *   Founder-project screenshots must not expose the client's identity or any
 *   real business data before they are used here.
 * - Demo concepts have no `projectUrl` on purpose. Add one only when a live
 *   demo is actually deployed.
 */

export type ProjectOwnership = "internal-product" | "founder-project" | "demo-solution"

export type ProjectVisualVariant = "primary" | "accent" | "slate"

export interface Project {
    id: string
    title: string
    category: string
    /** Short uppercase badge, e.g. "INTERNAL PRODUCT · ACTIVE DEVELOPMENT". */
    status: string
    ownership: ProjectOwnership
    description: string
    /** The business problem the project exists to solve. */
    problem: string
    capabilities: string[]
    technologies: string[]
    /** Optional real screenshot in /public. Falls back to a coded UI panel. */
    image?: string
    imageAlt: string
    visualVariant: ProjectVisualVariant
    /** Only set when the project is publicly reachable. */
    projectUrl?: string
    ctaLabel: string
    /** Always shown. Makes ownership unambiguous. */
    disclosure: string
    confidentialityNote?: string
    featured?: boolean
}

export const internalProducts: Project[] = [
    {
        id: "jobgenie",
        title: "JobGenie",
        category: "Recruitment Platform",
        status: "Internal product · Active development",
        ownership: "internal-product",
        description:
            "An AI-powered recruitment platform designed to create better connections between employers and job seekers. The platform combines intelligent job matching, candidate management, application tracking, interview scheduling, and AI-assisted career tools within a single digital experience.",
        problem:
            "Hiring is spread across job boards, spreadsheets and inboxes. JobGenie brings sourcing, screening and scheduling into one workflow so both sides of a hire can move faster.",
        capabilities: [
            "Product strategy and architecture",
            "Responsive web application",
            "Candidate and employer portals",
            "AI-powered matching features",
            "Recruitment and application workflows",
            "Secure authentication and role management",
            "Cloud deployment",
        ],
        technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Prisma", "Google Gemini"],
        image: "/work/jobgenie.png",
        imageAlt:
            "The JobGenie homepage, headlined \"Hire the best, Hired by the best!\", showing an illustrated genie mascot, skills-match cards and a recruitment progress tracker",
        visualVariant: "primary",
        projectUrl: "https://jobgenie.biz/",
        ctaLabel: "Explore JobGenie",
        disclosure: "An internal product designed and developed by KodeMargin.",
        featured: true,
    },
    {
        id: "claz",
        title: "Claz",
        category: "Education Platform",
        status: "Internal product · Active development",
        ownership: "internal-product",
        description:
            "A digital education-management platform designed for teachers, students, parents, and education institutes. Claz brings attendance, payments, examinations, learning resources, communication, reporting, and AI-assisted learning into one connected platform.",
        problem:
            "Institutes run attendance, fees, exams and parent communication on disconnected tools. Claz consolidates them so every role sees the same, current picture.",
        capabilities: [
            "Product planning and user flows",
            "Multi-role dashboards",
            "Attendance and payment management",
            "Examination and assignment workflows",
            "Student and parent portals",
            "AI-powered educational assistance",
            "Reporting and analytics",
        ],
        technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Google Gemini", "RAG"],
        image: "/work/claz.png",
        imageAlt:
            "The Claz homepage, headlined \"Turn every class into momentum\", showing a student learning workspace with a live class card, revision cycle progress and an assignment due date",
        visualVariant: "accent",
        projectUrl: "https://class.pathumld.com/",
        ctaLabel: "Explore Claz",
        disclosure: "An internal education product designed and developed by the founder.",
        featured: true,
    },
]

export const founderProjects: Project[] = [
    {
        id: "bakery-operations",
        title: "Bakery Operations and Delivery Management Platform",
        category: "Enterprise business system",
        status: "Founder project · Enterprise business system",
        ownership: "founder-project",
        description:
            "An integrated business-management platform developed to coordinate production, inventory, recipes, outlet orders, deliveries, showroom operations, reporting, and administrative workflows.",
        problem:
            "The operation ran on disconnected manual processes. The platform replaced them with one centralised, traceable system across production, stock and delivery.",
        capabilities: [
            "Automated production planning",
            "Raw-material requirement calculation",
            "Inventory and freezer-stock management",
            "Outlet-order processing",
            "Delivery planning and tracking",
            "Offline-first point-of-sale system",
            "Cash and card payment processing",
            "Role-based access control",
            "Approval workflows and audit logs",
            "PDF, Excel, receipt, and label generation",
            "Docker-based deployment",
        ],
        technologies: ["Next.js", "ASP.NET Core", "PostgreSQL", "Electron", "Docker"],
        imageAlt: "Abstract interface panel representing a bakery operations management system",
        visualVariant: "slate",
        ctaLabel: "View project overview",
        disclosure: "Founder experience. Not delivered as a KodeMargin client engagement.",
        confidentialityNote:
            "Developed for a multi-outlet bakery operation. Client identity is withheld for confidentiality.",
    },
    {
        id: "delivery-management",
        title: "Delivery and Resource Management System",
        category: "Operations platform",
        status: "Founder project · Operations platform",
        ownership: "founder-project",
        description:
            "A centralized platform designed to manage orders, production requirements, inventory availability, outlet deliveries, reporting, and operational coordination.",
        problem:
            "Order intake, production capacity and delivery scheduling were tracked separately. The system connected them so planning decisions used one source of data.",
        capabilities: [
            "Outlet order management",
            "Production planning",
            "Resource calculations",
            "Delivery scheduling",
            "Operational dashboards",
            "Role-based workflows",
            "Reports and exports",
            "Containerized deployment",
        ],
        technologies: ["Next.js", "ASP.NET Core", "PostgreSQL", "Docker"],
        imageAlt: "Abstract interface panel representing a delivery and resource management system",
        visualVariant: "primary",
        ctaLabel: "View project overview",
        disclosure: "Founder experience. Not delivered as a KodeMargin client engagement.",
        confidentialityNote:
            "Presented as selected founder experience. Client and company information is not publicly disclosed.",
    },
]

export const demoSolutions: Project[] = [
    {
        id: "home-service-booking",
        title: "Home-Service Booking and Quotation Platform",
        category: "Service business",
        status: "Demo solution",
        ownership: "demo-solution",
        description:
            "A concept platform designed for plumbing, electrical, HVAC, cleaning, landscaping, and other field-service businesses. The solution helps customers request services while allowing the business to manage inquiries, quotations, appointments, technicians, and job progress.",
        problem:
            "Field-service enquiries arrive by phone and message, then get quoted and scheduled by hand. This concept turns that into one tracked path from request to invoice.",
        capabilities: [
            "Online service requests",
            "Photo and document uploads",
            "Quotation creation and approval",
            "Appointment scheduling",
            "Technician assignment",
            "Job-status tracking",
            "Customer notifications",
            "Payment and invoice records",
            "Operations dashboard",
        ],
        technologies: ["Next.js", "TypeScript", "PostgreSQL"],
        imageAlt: "Abstract interface panel representing a home-service booking and quotation concept",
        visualVariant: "primary",
        ctaLabel: "View concept",
        disclosure:
            "This is a demonstration concept created by KodeMargin and is not associated with a real client.",
    },
    {
        id: "restaurant-ordering",
        title: "Restaurant Ordering and Reservation Platform",
        category: "Restaurant and hospitality",
        status: "Demo solution",
        ownership: "demo-solution",
        description:
            "A concept digital platform designed to help restaurants manage online menus, table reservations, customer orders, promotions, and customer enquiries.",
        problem:
            "Menus, bookings and orders often live across a printed card, a phone line and a third-party app. This concept keeps them under the restaurant's own control.",
        capabilities: [
            "Digital menu",
            "Online reservations",
            "Pickup and delivery orders",
            "Order-status management",
            "Promotional offers",
            "Customer notifications",
            "Restaurant dashboard",
            "Basic sales insights",
        ],
        technologies: ["Next.js", "TypeScript", "PostgreSQL"],
        imageAlt: "Abstract interface panel representing a restaurant ordering and reservation concept",
        visualVariant: "accent",
        ctaLabel: "View concept",
        disclosure:
            "This is a demonstration concept created by KodeMargin and is not associated with a real client.",
    },
    {
        id: "salon-appointments",
        title: "Salon Appointment Management Platform",
        category: "Beauty and wellness",
        status: "Demo solution",
        ownership: "demo-solution",
        description:
            "A concept booking platform designed for salons, beauty centres, spas, and independent professionals.",
        problem:
            "Appointment books, staff availability and reminders are usually managed manually. This concept shows how a small team can run bookings without the admin overhead.",
        capabilities: [
            "Service catalogue",
            "Staff availability",
            "Online appointment booking",
            "Customer profiles",
            "Booking reminders",
            "Payment records",
            "Promotion management",
            "Business dashboard",
        ],
        technologies: ["Next.js", "TypeScript", "PostgreSQL"],
        imageAlt: "Abstract interface panel representing a salon appointment management concept",
        visualVariant: "slate",
        ctaLabel: "View concept",
        disclosure:
            "This is a demonstration concept created by KodeMargin and is not associated with a real client.",
    },
]

export interface BuildStep {
    step: string
    title: string
    description: string
}

export const buildSteps: BuildStep[] = [
    {
        step: "01",
        title: "Discover",
        description:
            "Understand the business, users, goals, workflows, constraints, and expected outcomes.",
    },
    {
        step: "02",
        title: "Define",
        description:
            "Clarify the project scope, priorities, architecture, milestones, and success criteria.",
    },
    {
        step: "03",
        title: "Design",
        description: "Create user flows, wireframes, interfaces, and interactive prototypes.",
    },
    {
        step: "04",
        title: "Build",
        description:
            "Develop the product using maintainable architecture, secure workflows, and regular progress reviews.",
    },
    {
        step: "05",
        title: "Launch and improve",
        description:
            "Deploy, monitor, support, collect feedback, and continue improving the product.",
    },
]
