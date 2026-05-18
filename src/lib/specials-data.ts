import { serviceCategories, type ServiceCategory, type ServiceItem } from "./services-data";

export interface SpecialServiceRef {
    categoryId: string;
    serviceId: string;
}

export interface SpecialOffer {
    id: string;
    groupId: string;
    title: string;
    specialPrice: string;
    label: string;
    active: boolean;
    serviceRefs: SpecialServiceRef[];
    primaryServiceRef?: SpecialServiceRef;
    duration?: string;
    description?: string;
}

export interface SpecialGroup {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    dateLabel: string;
    offers: SpecialOffer[];
}

export interface ResolvedSpecialService extends SpecialServiceRef {
    category: ServiceCategory;
    item: ServiceItem;
    subcategoryId: string;
    subcategoryTitle: string;
}

export interface ResolvedSpecialOffer extends SpecialOffer {
    group: Omit<SpecialGroup, "offers">;
    services: ResolvedSpecialService[];
    primaryService: ResolvedSpecialService;
    originalPrice?: string;
    savingsAmount?: string;
    serviceHref: string;
}

export const specialGroups: SpecialGroup[] = [
    {
        id: "winter-pedicure-nails",
        title: "Winter Pedicure & Nail Specials",
        subtitle: "Pedicure and nail enhancements",
        image: "/images/gallery/nails/nude-almond-gel-nails-galeo-beauty-salon.jpg",
        dateLabel: "May - July 2026",
        offers: [
            {
                id: "winter-pedicure",
                groupId: "winter-pedicure-nails",
                title: "Pedicure",
                specialPrice: "R499",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "pedicure" }],
            },
            {
                id: "winter-acrylic-full-set",
                groupId: "winter-pedicure-nails",
                title: "Acrylic Full Set",
                specialPrice: "R400",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "acrylic-tips" }],
            },
            {
                id: "winter-gel-overlay",
                groupId: "winter-pedicure-nails",
                title: "Gel Overlay",
                specialPrice: "R280",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "gel-overlay-hands" }],
            },
        ],
    },
    {
        id: "winter-permanent-eyeliner",
        title: "Winter Eyeliner Specials",
        subtitle: "Permanent makeup",
        image: "/images/gallery/permanent-makeup/permanent-eyeliner-healed-results-galeo-beauty.jpg",
        dateLabel: "May - July 2026",
        offers: [
            {
                id: "winter-eyeliner-top",
                groupId: "winter-permanent-eyeliner",
                title: "Eyeliner Top",
                specialPrice: "R800",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "permanent-makeup", serviceId: "eyeliner-top" }],
            },
            {
                id: "winter-eyeliner-bottom",
                groupId: "winter-permanent-eyeliner",
                title: "Eyeliner Bottom",
                specialPrice: "R800",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "permanent-makeup", serviceId: "eyeliner-bottom" }],
            },
            {
                id: "winter-eyeliner-top-bottom-combo",
                groupId: "winter-permanent-eyeliner",
                title: "Combo: Eyeliner Top & Bottom",
                specialPrice: "R1500",
                label: "Combo Special",
                active: true,
                serviceRefs: [
                    { categoryId: "permanent-makeup", serviceId: "eyeliner-top" },
                    { categoryId: "permanent-makeup", serviceId: "eyeliner-bottom" },
                ],
                primaryServiceRef: { categoryId: "permanent-makeup", serviceId: "eyeliner-top" },
                duration: "2hr",
            },
        ],
    },
    {
        id: "winter-lola-lee-gel",
        title: "Winter Lola Lee Gel Specials",
        subtitle: "Gel toes and manicure combos",
        image: "/images/gallery/specials/galeo-beauty-nail-specials-price-list.jpg",
        dateLabel: "May - July 2026",
        offers: [
            {
                id: "winter-gel-toes",
                groupId: "winter-lola-lee-gel",
                title: "Gel Toes",
                specialPrice: "R150",
                label: "Winter Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "gel-toes" }],
            },
            {
                id: "winter-pedicure-with-gel-combo",
                groupId: "winter-lola-lee-gel",
                title: "Combo: Pedicure with Gel",
                specialPrice: "R350",
                label: "Combo Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "pedicure-gel" }],
            },
            {
                id: "winter-manicure-with-gel-combo",
                groupId: "winter-lola-lee-gel",
                title: "Combo: Manicure with Gel",
                specialPrice: "R200",
                label: "Combo Special",
                active: true,
                serviceRefs: [{ categoryId: "nails", serviceId: "full-manicure" }],
            },
            {
                id: "winter-gel-toes-hands-combo",
                groupId: "winter-lola-lee-gel",
                title: "Combo: Gel Toes & Gel Hands",
                specialPrice: "R300",
                label: "Combo Special",
                active: true,
                serviceRefs: [
                    { categoryId: "nails", serviceId: "gel-toes" },
                    { categoryId: "nails", serviceId: "gel-overlay-hands" },
                ],
                primaryServiceRef: { categoryId: "nails", serviceId: "gel-toes" },
                duration: "2hr",
            },
        ],
    },
];

function parsePrice(value: string) {
    return Number.parseFloat(value.replace(/[^\d.]/g, ""));
}

function shouldShowOriginalPrice(originalPrice: string, specialPrice: string) {
    const original = parsePrice(originalPrice);
    const special = parsePrice(specialPrice);

    return Number.isFinite(original) && Number.isFinite(special) && original > special;
}

function formatPrice(value: number) {
    const roundedValue = Math.round(value);
    return `R${roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function findServiceByRef(ref: SpecialServiceRef): ResolvedSpecialService | null {
    const category = serviceCategories.find((item) => item.id === ref.categoryId);
    const subcategory = category?.subcategories.find((item) =>
        item.items.some((service) => service.id === ref.serviceId)
    );
    const service = subcategory?.items.find((item) => item.id === ref.serviceId);

    if (!category || !subcategory || !service) {
        return null;
    }

    return {
        categoryId: ref.categoryId,
        serviceId: ref.serviceId,
        category,
        item: service,
        subcategoryId: subcategory.id,
        subcategoryTitle: subcategory.title,
    };
}

export function resolveSpecialOffer(offer: SpecialOffer): ResolvedSpecialOffer | null {
    if (!offer.active) {
        return null;
    }

    const group = specialGroups.find((item) => item.id === offer.groupId);
    const services = offer.serviceRefs
        .map((ref) => findServiceByRef(ref))
        .filter((item): item is ResolvedSpecialService => Boolean(item));

    const primaryRef = offer.primaryServiceRef ?? offer.serviceRefs[0];
    const primaryService = services.find(
        (service) =>
            service.categoryId === primaryRef.categoryId &&
            service.serviceId === primaryRef.serviceId
    ) ?? services[0];

    if (!group || !primaryService || services.length === 0) {
        return null;
    }

    const originalTotal = services.reduce((total, service) => total + parsePrice(service.item.price), 0);
    const specialTotal = parsePrice(offer.specialPrice);
    const savingsAmount =
        Number.isFinite(originalTotal) &&
        Number.isFinite(specialTotal) &&
        originalTotal > specialTotal
            ? formatPrice(originalTotal - specialTotal)
            : undefined;

    return {
        ...offer,
        group: {
            id: group.id,
            title: group.title,
            subtitle: group.subtitle,
            image: group.image,
            dateLabel: group.dateLabel,
        },
        services,
        primaryService,
        originalPrice:
            services.length > 1 && savingsAmount
                ? formatPrice(originalTotal)
                : shouldShowOriginalPrice(primaryService.item.price, offer.specialPrice)
                  ? primaryService.item.price
                  : undefined,
        savingsAmount,
        serviceHref: `/services/${primaryService.categoryId}/${primaryService.serviceId}`,
    };
}

export function getActiveSpecialOffers() {
    return specialGroups.flatMap((group) =>
        group.offers.flatMap((offer) => {
            const resolvedOffer = resolveSpecialOffer(offer);
            return resolvedOffer ? [resolvedOffer] : [];
        })
    );
}

export function getSpecialForService(categoryId: string, serviceId: string) {
    return getActiveSpecialOffers().find(
        (offer) =>
            offer.serviceRefs.length === 1 &&
            offer.primaryService.categoryId === categoryId &&
            offer.primaryService.serviceId === serviceId
    ) ?? null;
}

export function getSpecialsForService(categoryId: string, serviceId: string) {
    return getActiveSpecialOffers().filter((offer) =>
        offer.services.some(
            (service) => service.categoryId === categoryId && service.serviceId === serviceId
        )
    );
}

export function getSpecialsForCategory(categoryId: string) {
    return getActiveSpecialOffers().filter((offer) =>
        offer.services.some((service) => service.categoryId === categoryId)
    );
}

export function getSpecialBookingItem(offer: ResolvedSpecialOffer): ServiceItem {
    return {
        ...offer.primaryService.item,
        id: offer.id,
        name: offer.title,
        price: offer.specialPrice,
        duration: offer.duration ?? offer.primaryService.item.duration,
        note: `${offer.label}: ${offer.group.dateLabel}`,
        description:
            offer.description ??
            `Special offer linked to ${offer.services.map((service) => service.item.name).join(" + ")}.`,
    };
}
