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
    cell: "082 444 7389",
    email: "info@galeobeauty.com",
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
        facebook: "https://web.facebook.com/galeobeauty",
        instagram: "https://www.instagram.com/galeo_beauty/",
        whatsapp: "27824447389",
        tiktok: "https://www.tiktok.com/@dandimeyer711",
        fresha: "https://www.fresha.com/a/galeo-beauty-hartbeespoort-galeo-beauty-landsmeer-equestrian-estate-sb28s52l?pId=1023476",
    },
    banking: {
        companyName: "GALEO BEAUTY PTY LTD",
        regNumber: "2017/232885/07",
        bank: "Standard Bank",
        accountType: "CURRENT",
        accountNumber: "41 134 058 1",
        branch: "MENLYN PARK",
        branchCode: "002345",
        swiftCode: "SBZAZAJJ",
    },
};

