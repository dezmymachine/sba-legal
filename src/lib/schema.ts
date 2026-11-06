// Schema.org JSON-LD builders. BaseLayout always emits the firm; pages pass extra
// nodes (Person, Article, Service, BreadcrumbList…) that point back to it by @id.
import { PEOPLE, SERVICES, SITE } from "../data/content";

type Node = Record<string, unknown>;

const abs = (path: string, site: URL) => new URL(path, site).toString();
export const firmId = (site: URL) => abs("/#firm", site);
export const personId = (slug: string, site: URL) => abs(`/people/${slug}/#person`, site);

export function firmLd(site: URL): Node {
  const managingPartner = PEOPLE.find((p) => p.title === "Managing Partner");
  return {
    "@type": "LegalService",
    "@id": firmId(site),
    name: SITE.name,
    description:
      "A law firm based in Kumasi, Ghana, advising local and international clients on matters where law, business and regulation meet.",
    url: abs("/", site),
    logo: abs("/logo.png", site),
    image: abs("/og-default.jpg", site),
    email: SITE.email,
    telephone: [SITE.phone1, SITE.phone2].map((p) => `+233${p.substring(1)}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, JP Station Building, Off J.K. Acheampong Ave, Ahinsan Estate",
      addressLocality: "Kumasi",
      addressRegion: "Ashanti",
      addressCountry: "GH",
    },
    // Approximate (Ahinsan Estate). Replace with the Google Business Profile pin.
    geo: { "@type": "GeoCoordinates", latitude: 6.6885, longitude: -1.6244 },
    areaServed: { "@type": "Country", name: "Ghana" },
    foundingDate: "2025",
    ...(managingPartner && { founder: { "@id": personId(managingPartner.slug, site) } }),
    employee: PEOPLE.map((p) => ({ "@id": personId(p.slug, site) })),
    knowsAbout: SERVICES.map((s) => s.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": abs(`/expertise/${s.slug}/#service`, site) },
      })),
    },
    ...(SITE.socials.length > 0 && { sameAs: SITE.socials.map((s) => s.href) }),
  };
}

export function websiteLd(site: URL): Node {
  return {
    "@type": "WebSite",
    "@id": abs("/#website", site),
    name: SITE.name,
    url: abs("/", site),
    publisher: { "@id": firmId(site) },
    inLanguage: "en-GH",
  };
}

export function personLd(person: (typeof PEOPLE)[number], site: URL): Node {
  return {
    "@type": "Person",
    "@id": personId(person.slug, site),
    name: person.name,
    jobTitle: person.title,
    url: abs(`/people/${person.slug}/`, site),
    image: abs(person.image, site),
    worksFor: { "@id": firmId(site) },
    ...(person.focus && { knowsAbout: person.focus }),
    alumniOf: person.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
    ...(person.memberOf && {
      memberOf: person.memberOf.map((name) => ({ "@type": "Organization", name })),
    }),
  };
}

export function serviceLd(service: (typeof SERVICES)[number], site: URL): Node {
  return {
    "@type": "Service",
    "@id": abs(`/expertise/${service.slug}/#service`, site),
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: abs(`/expertise/${service.slug}/`, site),
    provider: { "@id": firmId(site) },
    areaServed: { "@type": "Country", name: "Ghana" },
  };
}

export function articleLd(
  article: { title: string; slug: string; date: string; excerpt?: string; heroImage?: string; author: { slug: string } | null },
  site: URL
): Node {
  const url = abs(`/knowledge/${article.slug}/`, site);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    ...(article.excerpt && { description: article.excerpt }),
    datePublished: article.date,
    ...(article.heroImage && { image: abs(article.heroImage, site) }),
    ...(article.author && { author: { "@id": personId(article.author.slug, site) } }),
    publisher: { "@id": firmId(site) },
    mainEntityOfPage: url,
    inLanguage: "en-GH",
  };
}

// crumbs: [["Home", "/"], ["Our People", "/people/"], …] — last one is the current page.
export function breadcrumbLd(crumbs: [string, string][], site: URL): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(path, site),
    })),
  };
}
