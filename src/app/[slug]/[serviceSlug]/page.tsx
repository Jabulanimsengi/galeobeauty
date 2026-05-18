import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildLocalServiceMetadata,
  LocalServiceLandingPage,
} from "@/components/seo/LocalCommercialPages";
import {
  getAllLocalCategoryRoutes,
  getLocalServiceRoute,
  PRIMARY_LOCAL_ROUTE_LOCATIONS,
  resolveLocalServiceRoute,
} from "@/lib/local-seo-routes";

interface PageProps {
  params: Promise<{
    slug: string;
    serviceSlug: string;
  }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  if (process.env.NODE_ENV === "development") return [];

  return getAllLocalCategoryRoutes([...PRIMARY_LOCAL_ROUTE_LOCATIONS]).flatMap((categoryRoute) =>
    categoryRoute.category.subcategories.flatMap((subcategory) =>
      subcategory.items.flatMap((service) => {
        const route = getLocalServiceRoute(categoryRoute.categoryId, service.id, categoryRoute.locationSlug);
        return route
          ? [{ slug: categoryRoute.slug, serviceSlug: route.servicePathSlug }]
          : [];
      })
    )
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;
  const route = resolveLocalServiceRoute(slug, serviceSlug);

  if (!route) {
    return {
      title: "Page Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildLocalServiceMetadata(route);
}

export default async function LocalServicePage({ params }: PageProps) {
  const { slug, serviceSlug } = await params;
  const route = resolveLocalServiceRoute(slug, serviceSlug);

  if (!route) {
    notFound();
  }

  return <LocalServiceLandingPage route={route} />;
}
