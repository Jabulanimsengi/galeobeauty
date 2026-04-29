import { permanentRedirect } from "next/navigation";
import { getServiceBySlug } from "@/lib/seo-data";

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function PricesCategoryRedirect({ params }: PageProps) {
    const { category } = await params;
    const service = getServiceBySlug(category);

    if (category === "skin") {
        permanentRedirect("/services/dermalogica");
    }

    if (service) {
        permanentRedirect(`/services/${service.categoryId}/${service.slug}`);
    }

    permanentRedirect(`/services/${category}`);
}
