import type { NavItem, BusinessInfo } from "@/types";

export const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Prices", href: "/prices" },
    { label: "Specials", href: "/specials" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

export const businessInfo: BusinessInfo = {
    name: "Galeo Beauty",
    phone: "+27121111730",
    email: "info@galeobeauty.co.za",
    address: {
        street: "Shop 6, Landsmeer Estate",
        area: "Jan Smuts Ave, Hartbeespoort Dam",
        city: "North West, South Africa",
    },
    hours: {
        weekday: "Mon-Fri: 8:00am - 6:00pm",
        saturday: "Saturday: 8:00am - 4:00pm",
        publicHoliday: "Public Holiday: 8:00am - 2:00pm",
    },
    socials: {
        facebook: "#",
        instagram: "#",
        whatsapp: "27121111730",
    },
};
