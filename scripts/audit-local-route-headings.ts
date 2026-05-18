import {
  getAllLocalCategoryRoutes,
  getLocalServiceRoute,
  PRIMARY_LOCAL_ROUTE_LOCATIONS,
} from "../src/lib/local-seo-routes";

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[&+]/g, " and ")
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const mismatches: string[] = [];
const categoryRoutes = getAllLocalCategoryRoutes([...PRIMARY_LOCAL_ROUTE_LOCATIONS]);

for (const route of categoryRoutes) {
  const headingSlug = slugifyHeading(route.h1);

  if (headingSlug !== route.slug) {
    mismatches.push(`Category ${route.href}: h1 "${route.h1}" slugifies to "${headingSlug}"`);
  }

  for (const subcategory of route.category.subcategories) {
    for (const service of subcategory.items) {
      const serviceRoute = getLocalServiceRoute(route.categoryId, service.id, route.locationSlug);
      if (!serviceRoute) continue;

      const serviceHeadingSlug = slugifyHeading(serviceRoute.serviceH1);
      if (serviceHeadingSlug !== serviceRoute.servicePathSlug) {
        mismatches.push(
          `Service ${serviceRoute.serviceHref}: h1 "${serviceRoute.serviceH1}" slugifies to "${serviceHeadingSlug}"`
        );
      }
    }
  }
}

if (mismatches.length > 0) {
  console.error(mismatches.join("\n"));
  process.exit(1);
}

console.log(`Local route headings align with ${categoryRoutes.length} category routes and their service URLs.`);
