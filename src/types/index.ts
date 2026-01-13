// Type definitions for the Galeo Beauty site

export interface NavItem {
  label: string;
  href: string;
}

export interface PriceItem {
  service: string;
  duration?: string;
  price: string;
  isBookable?: boolean;
}

export interface PriceCategory {
  title: string;
  items: PriceItem[];
  note?: string;
  subcategories?: {
    title: string;
    items: PriceItem[];
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: string;
  text: string;
  author: string;
  service: string;
  avatar: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BusinessInfo {
  name: string;
  phone: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
  };
  hours: {
    weekday: string;
    saturday: string;
    publicHoliday: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    whatsapp: string;
    tiktok?: string;
    fresha?: string;
  };
}
