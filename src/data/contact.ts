
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from "lucide-react"

export const contactInfo = [
    {
        label: "Email",
        value: "kodemargin@gmail.com",
        icon: Mail,
        href: "mailto:kodemargin@gmail.com"
    },
    {
        label: "Phone",
        value: "+94 71 188 8358",
        icon: Phone,
        href: "tel:+94711888358"
    },
    {
        label: "Office",
        value: "Kurunegala, Sri Lanka",
        icon: MapPin,
        href: "https://maps.google.com" // Placeholder
    }
]

export const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/kodemargin/" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" }
]
