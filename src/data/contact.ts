
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from "lucide-react"

export const contactInfo = [
    {
        label: "Email",
        value: "hello@kodemargin.com",
        icon: Mail,
        href: "mailto:hello@kodemargin.com"
    },
    {
        label: "Phone",
        value: "+1 (555) 123-4567",
        icon: Phone,
        href: "tel:+15551234567"
    },
    {
        label: "Office",
        value: "101 Tech Hub, Innovation Dr, San Francisco, CA",
        icon: MapPin,
        href: "https://maps.google.com" // Placeholder
    }
]

export const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" }
]
