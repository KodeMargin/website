
import {
    Globe,
    Smartphone,
    Palette,
    BarChart3,
    Cpu,
    Database,
    Workflow,
    Bot,
    Layout
} from "lucide-react"

import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTypescript,
    SiPython,
    SiPostgresql,
    SiAmazon,
    SiFigma,
    SiTailwindcss,
    SiDocker,
    SiGraphql,
    SiMongodb,
    SiFlutter,
    SiOpenai,
    SiSpringboot,
    SiDotnet,
    SiVuedotjs,
    SiAngular,
    SiKubernetes,
    SiRedis,
    SiGooglecloud,
    SiMysql,
    SiSupabase,
    SiFirebase,
    SiPrisma,
    SiVercel,
    SiStripe,
    SiOdoo,
    SiN8N,
    SiZapier,
    SiMake,
    SiLangchain,
    SiAnthropic,
    SiGooglegemini,
    SiHuggingface,
    SiDialogflow,
    SiTwilio,
    SiWhatsapp,
} from "react-icons/si"
import { FaMicrosoft } from "react-icons/fa"

export const services = [
    {
        title: "Web Application Development",
        description: "We build high-performance, SEO-friendly, and responsive websites. From simple landing pages to complex web applications.",
        icon: Globe,
        features: ["Custom Web Applications", "E-commerce Platforms", "CMS Development", "PWA (Progressive Web Apps)"]
    },
    {
        title: "Mobile App Development",
        description: "Reach your customers on the go with native and cross-platform mobile apps for iOS and Android.",
        icon: Smartphone,
        features: ["iOS & Android Apps", "React Native Development", "App Store Optimization", "Maintenance & Support"]
    },
    {
        title: "UI/UX Design",
        description: "We design user-centric interfaces that are intuitive, engaging, and aligned with your brand identity.",
        icon: Palette,
        features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Design Systems"]
    },
    {
        title: "Digital Marketing & Social Media Marketing",
        description: "Drive traffic, generate leads, and grow your revenue with our data-driven digital marketing strategies.",
        icon: BarChart3,
        features: ["SEO Optimization", "PPC Advertising", "Social Media Marketing", "Content Strategy"]
    },
    {
        title: "Software & SaaS Development",
        description: "Scalable software solutions designed to grow with your business. We handle the entire lifecycle from MVP to enterprise.",
        icon: Cpu,
        features: ["SaaS Product Development", "API Development", "Cloud Architecture", "Legacy System Modernization"]
    },
    {
        title: "ERP Solutions",
        description: "Custom ERP systems that bring inventory, finance, HR, and operations into one place, built around how your business actually runs.",
        icon: Database,
        features: ["Custom ERP Development", "Inventory & Order Management", "Accounting & HR Modules", "Third-Party System Integration"]
    },
    {
        title: "Workflow Automation",
        description: "Replace repetitive manual work with automated workflows that connect your existing tools and keep data moving without human hand-offs.",
        icon: Workflow,
        features: ["Business Process Automation", "System & API Integrations", "Document & Approval Flows", "Reporting & Alerts"]
    },
    {
        title: "AI Chatbots & Assistants",
        description: "Conversational assistants trained on your own content to handle customer questions, capture leads, and support your team around the clock.",
        icon: Bot,
        features: ["Website & WhatsApp Chatbots", "Customer Support Automation", "Knowledge-Base Trained AI", "CRM & Lead Capture Integration"]
    },
    {
        title: "Social Media Management & Social Media Posts",
        description: "Strategic social media management to grow your brand presence, engagement, and audience across all platforms.",
        icon: Layout,
        features: [
            "Content Planning & Scheduling",
            "Creative Post Design",
            "Account Management",
            "Engagement & Growth Strategy"
        ]
    }
]

export const techStack = [
    { name: "React", icon: SiReact, color: "hover:text-[#61DAFB]" },
    { name: "Next.js", icon: SiNextdotjs, color: "hover:text-black dark:hover:text-white" },
    { name: "Node.js", icon: SiNodedotjs, color: "hover:text-[#339933]" },
    { name: "TypeScript", icon: SiTypescript, color: "hover:text-[#3178C6]" },
    { name: "Python", icon: SiPython, color: "hover:text-[#3776AB]" },
    { name: "Spring Boot", icon: SiSpringboot, color: "hover:text-[#6DB33F]" },
    { name: "ASP.NET Core", icon: SiDotnet, color: "hover:text-[#512BD4]" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "hover:text-[#4169E1]" },
    { name: "MySQL", icon: SiMysql, color: "hover:text-[#4479A1]" },
    { name: "MongoDB", icon: SiMongodb, color: "hover:text-[#47A248]" },
    { name: "Redis", icon: SiRedis, color: "hover:text-[#DC382D]" },
    { name: "Prisma", icon: SiPrisma, color: "hover:text-[#2D3748]" },
    { name: "Supabase", icon: SiSupabase, color: "hover:text-[#3ECF8E]" },
    { name: "Firebase", icon: SiFirebase, color: "hover:text-[#FFCA28]" },
    { name: "AWS", icon: SiAmazon, color: "hover:text-[#FF9900]" },
    { name: "Azure", icon: FaMicrosoft, color: "hover:text-[#0078D4]" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "hover:text-[#4285F4]" },
    { name: "Vercel", icon: SiVercel, color: "hover:text-black dark:hover:text-white" },
    { name: "Docker", icon: SiDocker, color: "hover:text-[#2496ED]" },
    { name: "Kubernetes", icon: SiKubernetes, color: "hover:text-[#326CE5]" },
    { name: "GraphQL", icon: SiGraphql, color: "hover:text-[#E10098]" },
    { name: "Flutter", icon: SiFlutter, color: "hover:text-[#02569B]" },
    { name: "Vue.js", icon: SiVuedotjs, color: "hover:text-[#4FC08D]" },
    { name: "Angular", icon: SiAngular, color: "hover:text-[#DD0031]" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    { name: "Figma", icon: SiFigma, color: "hover:text-[#F24E1E]" },
    { name: "Stripe", icon: SiStripe, color: "hover:text-[#635BFF]" },
    { name: "Odoo", icon: SiOdoo, color: "hover:text-[#714B67]" },
    { name: "n8n", icon: SiN8N, color: "hover:text-[#EA4B71]" },
    { name: "Zapier", icon: SiZapier, color: "hover:text-[#FF4F00]" },
    { name: "Make", icon: SiMake, color: "hover:text-[#6D00CC]" },
    { name: "Twilio", icon: SiTwilio, color: "hover:text-[#F22F46]" },
    { name: "WhatsApp API", icon: SiWhatsapp, color: "hover:text-[#25D366]" },
    { name: "OpenAI", icon: SiOpenai, color: "hover:text-[#412991]" },
    { name: "Claude", icon: SiAnthropic, color: "hover:text-[#D97757]" },
    { name: "Gemini", icon: SiGooglegemini, color: "hover:text-[#8E75B2]" },
    { name: "LangChain", icon: SiLangchain, color: "hover:text-[#1C3C3C]" },
    { name: "Hugging Face", icon: SiHuggingface, color: "hover:text-[#FFD21E]" },
    //{ name: "Dialogflow", icon: SiDialogflow, color: "hover:text-[#FF9800]" },
]
