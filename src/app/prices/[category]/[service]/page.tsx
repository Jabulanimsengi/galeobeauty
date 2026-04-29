import { permanentRedirect } from "next/navigation";
import { resolveLegacyServiceRedirect } from "@/lib/legacy-service-redirects";

const legacySkinServiceRedirects: Record<string, string> = {
    "acne-solutions": "/services/dermalogica/skin-clearing-facial",
    "chemical-peel": "/services/dermalogica/pro-power-peel",
    "chemical-peels": "/services/dermalogica/pro-power-peel",
    "facial-proskin": "/services/dermalogica/pro-skin-60",
    "ipl-laser": "/services/dermalogica/pro-clear",
    microneedling: "/services/dermalogica/pro-microneedling",
};

interface PageProps {
    params: Promise<{ category: string; service: string }>;
}

export default async function PricesServiceRedirect({ params }: PageProps) {
    const { category, service } = await params;
    const legacyService = resolveLegacyServiceRedirect(service);

    if (category === "skin") {
        permanentRedirect(legacySkinServiceRedirects[service] ?? "/services/dermalogica");
    }

    if (legacyService) {
        permanentRedirect(
            legacyService.serviceSlug
                ? `/services/${legacyService.categoryId}/${legacyService.serviceSlug}`
                : `/services/${legacyService.categoryId}`
        );
    }

    permanentRedirect(`/services/${category}/${service}`);
}
