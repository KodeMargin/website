
import {
    Globe,
    Smartphone,
    Palette,
    BarChart3,
    Cpu,
    Code2,
    Server,
    Terminal,
    Database,
    Cloud,
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
} from "react-icons/si"
import { FaMicrosoft } from "react-icons/fa"

export const services = [
    {
        title: "Web Development",
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
        title: "Digital Marketing",
        description: "Drive traffic, generate leads, and grow your revenue with our data-driven digital marketing strategies.",
        icon: BarChart3,
        features: ["SEO Optimization", "PPC Advertising", "Social Media Marketing", "Content Strategy"]
    },
    {
        title: "Software & SaaS",
        description: "Scalable software solutions designed to grow with your business. We handle the entire lifecycle from MVP to enterprise.",
        icon: Cpu,
        features: ["SaaS Product Development", "API Development", "Cloud Architecture", "Legacy System Modernization"]
    },
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
    { name: "MongoDB", icon: SiMongodb, color: "hover:text-[#47A248]" },
    { name: "Redis", icon: SiRedis, color: "hover:text-[#DC382D]" },
    { name: "AWS", icon: SiAmazon, color: "hover:text-[#FF9900]" },
    { name: "Azure", icon: FaMicrosoft, color: "hover:text-[#0078D4]" },
    { name: "Google Cloud", icon: SiGooglecloud, color: "hover:text-[#4285F4]" },
    { name: "Docker", icon: SiDocker, color: "hover:text-[#2496ED]" },
    { name: "Kubernetes", icon: SiKubernetes, color: "hover:text-[#326CE5]" },
    { name: "GraphQL", icon: SiGraphql, color: "hover:text-[#E10098]" },
    { name: "Flutter", icon: SiFlutter, color: "hover:text-[#02569B]" },
    { name: "Vue.js", icon: SiVuedotjs, color: "hover:text-[#4FC08D]" },
    { name: "Angular", icon: SiAngular, color: "hover:text-[#DD0031]" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
    { name: "Figma", icon: SiFigma, color: "hover:text-[#F24E1E]" },
    { name: "OpenAI", icon: SiOpenai, color: "hover:text-[#412991]" },
]
