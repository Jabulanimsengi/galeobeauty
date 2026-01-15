import type { NavItem, BusinessInfo } from "@/types";

export const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Prices", href: "/prices" },
    { label: "Specials", href: "/specials" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export const businessInfo: BusinessInfo = {
    name: "Galeo Beauty",
    phone: "+27121111730",
    email: "info@galeobeauty.co.za",
    address: {
        street: "Shop 6, Landsmeer",
        area: "Jan Smuts Rd, Hartbeespoort, 0216",
        city: "North West, South Africa",
    },
    hours: {
        weekday: "Mon-Fri: 8:00am - 6:00pm",
        saturday: "Saturday: 8:00am - 4:00pm",
        publicHoliday: "Public Holiday: 8:00am - 2:00pm",
    },
    socials: {
        facebook: "https://facebook.com/galeobeauty",
        instagram: "https://instagram.com/galeobeauty",
        whatsapp: "27121111730",
        tiktok: "https://tiktok.com/@galeobeauty",
        fresha: "https://www.fresha.com/a/galeo-beauty",
    },
};
