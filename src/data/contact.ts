
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram, Facebook, X } from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"

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
        label: "Location",
        value: "Kurunegala, Sri Lanka",
        icon: MapPin,
        href: "https://maps.app.goo.gl/CeeGkwqL5HaPcFRo9" // Placeholder
    }
]

export const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/kodemargin/" },
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=61568407317471" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/kodemargin/" },
    { name: "WhatsApp", icon: BsWhatsapp, href: "https://wa.me/94711888358" },
]
