// Items with `children` render as dropdowns; the parent href is the first child.
export const NAV_ITEMS: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About the Firm", href: "/about" },
      { label: "Our People", href: "/people" },
      { label: "Join Us", href: "/join-us" },
    ],
  },
  { label: "Expertise", href: "/expertise" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Contact", href: "/contact" },
];

export const HERO_SLIDES = [
  {
    src: "/images/hero-towers.webp",
    alt: "Corporate office towers in daylight",
  },
  {
    src: "/images/hero-office.webp",
    alt: "Modern law office interior",
  },
  {
    src: "/images/hero-gavel.webp",
    alt: "Gavel and law books on a desk",
  },
];

// Shared inner-page hero art — cycles through every file in public/backgrounds.
export const PAGE_HERO_IMAGES = [
  "/backgrounds/28337.webp",
  "/backgrounds/29196636.webp",
  "/backgrounds/62.webp",
  "/backgrounds/835373_preview.webp",
  "/backgrounds/99671.webp",
];

// Services as set out in the firm's About copy. Each has a page at /expertise/<slug>;
// those in FEATURED_ORDER (all have card art) lead the homepage.
export const SERVICES: {
  title: string;
  slug: string;
  description: string;
  /** Matched against a person's `focus` label to link that label to this service page. */
  keywords: string[];
  /** Longer page copy for /expertise/<slug> — add once the firm has approved it. */
  body?: string[];
  image?: string;
  alt?: string;
}[] = [
  {
    title: "Mining, Oil and Gas",
    slug: "mining-oil-gas",
    keywords: ["Mining", "Oil and Gas"],
    description:
      "Licensing, regulatory compliance, local content requirements, and agreements across the extractive sector.",
    image:
      "/images/practice-energy.webp",
    alt: "Energy infrastructure at dusk",
  },
  {
    title: "Corporate and Commercial Law",
    slug: "corporate-commercial",
    keywords: ["Corporate"],
    description:
      "Company formation, corporate governance, commercial contracts, and mergers and acquisitions.",
    image:
      "/images/practice-corporate.webp",
    alt: "Glass corporate building",
  },
  {
    title: "Insolvency and Restructuring",
    slug: "insolvency-restructuring",
    keywords: ["Insolvency"],
    description:
      "Business rescue, administration, liquidation, and debt restructuring for companies and creditors.",
  },
  {
    title: "Foreign Direct Investment",
    slug: "foreign-direct-investment",
    keywords: ["Investment"],
    description:
      "Structuring market entry, investment registration, incentives, and protections for foreign investors.",
  },
  {
    title: "International Law",
    slug: "international-law",
    keywords: ["International"],
    description:
      "Cross-border transactions, treaty-related questions, and matters involving more than one legal system.",
  },
  {
    title: "Medical Law",
    slug: "medical-law",
    keywords: ["Medical"],
    description:
      "Regulation of health practitioners and facilities, patients’ rights, consent, and professional liability.",
  },
  {
    title: "Immigration and Nationality",
    slug: "immigration-nationality",
    keywords: ["Immigration"],
    description:
      "Work and residence permits, citizenship, dual nationality, and the right of abode for Ghanaians abroad and foreign nationals.",
    image:
      "/images/practice-immigration.webp",
    alt: "Airplane wing above clouds",
  },
  {
    title: "Property Law",
    slug: "property-law",
    keywords: ["Property"],
    description:
      "Land acquisition, title searches, registration, leases, conveyancing, and land disputes.",
    image:
      "/images/practice-property.webp",
    alt: "Property keys and house model",
  },
  {
    title: "Litigation and ADR",
    slug: "litigation-adr",
    keywords: ["Litigation", "Dispute"],
    description:
      "Representation in civil and criminal disputes before the courts, and resolution of disputes through arbitration, mediation and negotiation.",
  },
];

// Homepage shows four featured services, in the same order as /expertise (SERVICES order).
const FEATURED = ["corporate-commercial", "mining-oil-gas", "property-law", "immigration-nationality"];
export const PRACTICES = SERVICES.filter((s) => FEATURED.includes(s.slug));

const matches = (keywords: string[], label: string) =>
  keywords.some((k) => label.toLowerCase().includes(k.toLowerCase()));

/** The service page a focus-area label belongs to, if any. */
export const serviceForFocus = (label: string) => SERVICES.find((s) => matches(s.keywords, label));

export const KNOWLEDGE_KINDS = [
  { value: "publication", singular: "Publication", plural: "Publications" },
  { value: "news", singular: "News", plural: "News" },
  { value: "event", singular: "Event", plural: "Events" },
] as const;

// Knowledge items. `kind` drives the Publications / News / Events tabs.
// `authorSlug` must match a PEOPLE slug; omit it for events without an author.
// `body` uses Portable Text blocks so the same renderer serves mock + Sanity data.
export const ARTICLES = [
  {
    title: "Corporate Insolvency in Ghana: Directors' Duties When a Company Is in Distress",
    slug: "directors-duties-company-in-distress",
    kind: "publication",
    date: "2026-08-20",
    excerpt:
      "What directors of distressed companies must and must not do under the Companies Act, 2019 (Act 992) — and why early advice matters.",
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    authorSlug: "samuel-boadi-adarkwah",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "When a company's finances deteriorate, the legal position of its directors changes. Under the Companies Act, 2019 (Act 992), directors who allow an insolvent company to keep trading can face personal liability for insolvent trading, and transactions entered into on the eve of insolvency may later be set aside.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [{ _type: "span", text: "Early advice protects directors" }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The practical lesson is timing. Directors who take restructuring advice at the first signs of distress — cash-flow pressure, creditor demands, covenant breaches — preserve far more options than those who wait for a winding-up petition. Administration, company voluntary arrangements, and negotiated standstills all work best when started early.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our insolvency practice advises boards, creditors, and insolvency practitioners across Kumasi and Ghana on every stage of the process, from contingency planning to formal proceedings before the courts.",
          },
        ],
      },
    ],
  },
  {
    title: "Medical Negligence Claims in Ghana: What Healthcare Providers Should Know",
    slug: "medical-negligence-healthcare-providers",
    kind: "publication",
    date: "2026-07-15",
    excerpt:
      "Duty of care, expert evidence, and record-keeping — the three pillars that decide clinical negligence claims.",
    heroImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    authorSlug: "ezekiel-osei",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Clinical negligence claims turn on three questions: did the provider owe a duty of care, was that duty breached judged against the standard of a reasonably competent practitioner, and did the breach cause the patient's injury? Ghanaian courts apply these principles alongside statute and professional regulation, including the rules of the Medical and Dental Council.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In practice, most claims are won or lost on evidence — and the most important evidence is the clinical record. Complete, contemporaneous notes, documented consent discussions, and clear escalation records give providers a defensible position long before a dispute reaches court.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We counsel hospitals, clinics, and practitioners on preventative compliance, consent protocols, and the defence of negligence and compensation claims.",
          },
        ],
      },
    ],
  },
  {
    title: "Property Due Diligence in Kumasi: A Practical Checklist",
    slug: "property-due-diligence-kumasi",
    kind: "publication",
    date: "2026-06-11",
    excerpt:
      "Six searches to run before you pay for land or a house in Kumasi — from the Lands Commission to the family stool.",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop",
    authorSlug: "abigail-appiah",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Land disputes are among the most common — and most avoidable — cases in our courts. Before money changes hands, run through this checklist:",
          },
        ],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Title search at the Lands Commission to confirm ownership and encumbrances." }],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Court search to confirm the land is not the subject of pending litigation." }],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Planning and use check with the Metropolitan Assembly for zoning and permits." }],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Site inspection with a licensed surveyor to confirm beacons and boundaries." }],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Consent verification where stool, skin, or family land is involved." }],
      },
      {
        _type: "block",
        listItem: "bullet",
        children: [{ _type: "span", text: "Written agreement prepared or reviewed by counsel before any deposit is paid." }],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our property team handles searches, documentation, and conveyancing for buyers, sellers, and developers across the Ashanti Region.",
          },
        ],
      },
    ],
  },
  {
    title: "SBA Legal Consult Opens Its Doors in Ahinsan Estate",
    slug: "sba-opens-ahinsan",
    kind: "news",
    date: "2026-07-14",
    excerpt:
      "Our Kumasi offices are open — a full-service firm serving individuals and businesses across Ghana.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    authorSlug: "samuel-boadi-adarkwah",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "SBA Legal Consult has opened its doors at the 2nd Floor, JP Station, Ahinsan Estate, Kumasi. The firm offers full-service counsel to individuals and businesses, with particular depth in commercial litigation, energy and natural resources, insolvency and restructuring, property, and medical law.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Clients can reach the firm by phone, WhatsApp, or through the contact page. We look forward to serving Kumasi, the Ashanti Region, and Ghana.",
          },
        ],
      },
    ],
  },
  {
    title: "Abena Frema Kyei-Baffour Called to the Ghana Bar",
    slug: "abena-kyei-baffour-called-to-bar",
    kind: "news",
    date: "2026-05-20",
    excerpt:
      "We congratulate Abena Frema Kyei-Baffour, Best Graduating Student of the KNUST Law Class of 2023, on her call to the Bar.",
    heroImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
    authorSlug: "samuel-boadi-adarkwah",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "SBA Legal Consult congratulates Abena Frema Kyei-Baffour on her call to the Ghana Bar following her professional training at the Ghana School of Law. Abena graduated from KNUST with First Class Honours as the Best Graduating Student of the Class of 2023.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Her practice focuses on medical law, international law, dispute resolution, and corporate and commercial advisory. We are delighted to have her on the team.",
          },
        ],
      },
    ],
  },
  {
    title: "Seminar: Doing Business in Ghana — Regulatory Essentials for Foreign Investors",
    slug: "seminar-doing-business-in-ghana",
    kind: "event",
    date: "2026-10-22",
    excerpt:
      "A half-day seminar in Kumasi on GIPC registration, tax, immigration, and land access for new market entrants. Registration opens soon.",
    heroImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Join SBA Legal Consult for a half-day seminar on the regulatory essentials for investing in Ghana: GIPC registration and incentives, corporate vehicles, tax compliance, work and residence permits, and securing land for commercial use.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Date: 22 October 2026. Venue in Kumasi to be confirmed. To reserve a seat, contact the firm through the contact page or WhatsApp. Attendance is free but seats are limited.",
          },
        ],
      },
    ],
  },
  {
    title: "Webinar: E-Signatures and Digital Transactions under Ghanaian Law",
    slug: "webinar-e-signatures-ghana",
    kind: "event",
    date: "2026-11-19",
    excerpt:
      "An online session on the Electronic Transactions Act and what businesses must get right before going paperless.",
    heroImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Can a click conclude a contract in Ghana? This webinar examines the Electronic Transactions Act, 2008 (Act 772), the documents excluded from its scope, and the authentication practices businesses should adopt before going paperless.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Date: 19 November 2026, online. Joining details will be published on this page. Contact the firm to pre-register.",
          },
        ],
      },
    ],
  },
];

// `alumniOf` / `memberOf` repeat what each bio states; they feed Person structured data.
export const PEOPLE: {
  name: string;
  title: string;
  slug: string;
  email?: string;
  alumniOf: string[];
  memberOf?: string[];
  image: string;
  excerpt?: string;
  focus?: string[];
  bio?: string[];
}[] = [
  {
    name: "Dr Samuel Boadi Adarkwah",
    title: "Managing Partner",
    slug: "samuel-boadi-adarkwah",
    email: "s.adarkwah@sbalegalconsult.com",
    alumniOf: ["Cornell Law School", "Kwame Nkrumah University of Science and Technology"],
    memberOf: ["Ghana Bar Association", "Ashanti Bar Association"],
    image: "/portraits/samuel_boadi_adarkwah.webp",
    excerpt:
      "Barrister & Solicitor of the Supreme Court of Ghana with over 17 years' experience across commercial litigation, energy, mining, and insolvency.",
    focus: [
      "Commercial Litigation",
      "Oil and Gas",
      "Mining",
      "Insolvency and Restructuring",
      "Telecommunications",
    ],
    bio: [
      "Samuel Boadi Adarkwah is the Managing Partner of SBA Legal Consult in Kumasi. He has over 17 years' experience in legal practice, having been called to the Ghana Bar in 2009. As head of the firm, he leads its practice in commercial litigation, energy (oil and gas), mining, corporate insolvency and restructuring, and telecommunications, managing and supervising matters and appearing before the courts at every level of the Ghanaian judicial system.",
      "He has acted as Counsel in complex civil and commercial disputes and advises oil marketing companies on regulatory compliance, joint ventures, mineral and mining compensation and land acquisition.",
      "Samuel is a recognised voice on insolvency law in Ghana. His work has been published in the International Insolvency Review, the Commonwealth Law Bulletin, the African Journal of International and Comparative Law and the Routledge Handbook on African Law. He is a contributing author to Companies, Corporate Insolvency and Restructuring in Ghana: The Law and Practice (LexisNexis) and serves as Editor of the Ghana Insolvency and Restructuring Journal.",
      "Samuel holds a Doctor of the Science of Law (J.S.D.) and a Master of Laws (LL.M.) from Cornell Law School, Ithaca, New York, U.S.A., where he was a Rudolf B. Schlesinger Fellow, Institute for African Development Fellow and Degree Marshal of his LL.M. class. He also holds an LLB with First Class Honours from the Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, where he graduated as the overall best undergraduate student.",
      "He is a member of the Ghana Bar Association, the Ashanti Bar Association and a fellow of the Southern African Institute for Policy and Research.",
    ],
  },
  {
    name: "Abigail Appiah",
    title: "Associate",
    slug: "abigail-appiah",
    email: "abigail.appiah@sbalegalconsult.com",
    alumniOf: ["Kwame Nkrumah University of Science and Technology", "Ghana School of Law"],
    image: "/portraits/abigail_appiah.webp",
    excerpt:
      "Disputes practitioner resolving matters for institutions and individuals through litigation and alternative dispute resolution.",
    focus: [
      "Medical Law",
      "Corporate Law",
      "Property Law",
      "Intellectual Property",
      "Human Rights",
    ],
    bio: [
      "Abigail Appiah is a dedicated private legal practitioner at SBA Legal Consult, based in Ahinsan-Kumasi, where she provides legal services aimed at resolving disputes for both institutions and individuals through litigation or alternative dispute resolution mechanisms. Her practice is built on a strong foundation in several areas of law, including Medical Law, Corporate Law, Property Law, Intellectual Property Law, International Commercial Law, and Human Rights Law.",
      "Abigail obtained her Bachelor of Laws (LLB) degree from the Kwame Nkrumah University of Science and Technology (KNUST) in Kumasi, Ghana. She subsequently pursued her professional legal training at the Ghana School of Law and was enrolled as a barrister and solicitor of the Supreme Court of Ghana in November 2022. She is currently enrolled in the Master of Laws (LLM) programme at the KNUST Faculty of Law.",
      "Abigail is a MasterCard Foundation Scholar Alumni, having served the Scholars Community in various roles including Judicial Committee Chairperson and legal adviser to the Scholars Executive Council. She started her law practice with Koffie & Partners (Law Conclave) at Ahodwo, Kumasi, before joining SBA Legal Consult. Between November 2022 and August 2023, she served as a Research and Teaching Assistant, lecturing and tutoring in Equity and Succession and Medical Law and Ethics.",
      "Abigail is committed to using her expertise to help institutions, companies and individuals navigate complex legal challenges and to promote their interests in an increasingly competitive world.",
    ],
  },
  {
    name: "Ama Saah Dwumah",
    title: "Associate",
    slug: "ama-saah-dwumah",
    email: "ama.dwumah@sbalegalconsult.com",
    alumniOf: ["Kwame Nkrumah University of Science and Technology"],
    image: "/portraits/ama_saa_dwuman.webp",
    excerpt:
      "Internationally trained lawyer with cross-jurisdictional experience across Ghana and The Gambia.",
    focus: [
      "Dispute Resolution",
      "Civil Litigation",
      "Corporate and Commercial Advisory",
    ],
    bio: [
      "Ama Saah Dwumah is an internationally trained legal professional with academic and practical experience spanning Ghana and The Gambia. Her strong academic grounding and cross-jurisdictional training allow her to offer nuanced, adaptable legal insight.",
      "Ama holds a Bachelor of Laws (LLB) from the Kwame Nkrumah University of Science and Technology (KNUST) in Kumasi, Ghana. She then completed her professional legal training (BL) in The Gambia, a separate common law jurisdiction, where she was called to the Bar in 2024 and is entitled to appear before its courts.",
      "She also completed her professional legal training in Ghana and was enrolled as a Barrister and Solicitor of the Supreme Court of Ghana in March 2026. Her exposure to both jurisdictions deepens her understanding of comparative legal systems, procedural frameworks, and cross-border legal dynamics.",
      "Her areas of interest include dispute resolution, civil litigation, and corporate and commercial advisory. She is committed to delivering diligent legal support grounded in research and integrity, with a strong appreciation of jurisdictional differences across the West African legal landscape.",
      "Ama is passionate about professional excellence and continuous development, and she brings a disciplined, client-focused approach to every matter she handles.",
    ],
  },
  {
    name: "Ezekiel Osei",
    title: "Associate",
    slug: "ezekiel-osei",
    email: "ezekielosei@sbalegalconsult.com",
    alumniOf: ["University of Cambridge", "Kwame Nkrumah University of Science and Technology", "Ghana School of Law"],
    memberOf: ["Ghana Bar Association", "Young International Arbitration Group"],
    image: "/portraits/ezekiel_osei.webp",
    excerpt:
      "Cambridge-trained counsel advising on corporate and commercial law, insolvency, competition, international law and technology governance.",
    focus: [
      "Corporate and Commercial Law",
      "Corporate Insolvency",
      "International Law",
      "Competition Law",
      "International Investment Law",
      "AI and Technology Governance",
      "Human Rights Law",
    ],
    bio: [
      "Ezekiel Osei is an Associate at SBA Legal Consult, Ahinsan-Kumasi. His areas of specialty include Corporate and Commercial Law, Corporate Insolvency Law, International Law, Competition Law, International Investment Law, Artificial Intelligence (AI) and Technology Governance, and Human Rights Law. This breadth of expertise enables him to advise clients not only on domestic disputes, but also on cross-border transactions, regulatory compliance, and the legal risks posed by emerging technologies.",
      "Ezekiel obtained his Bachelor of Laws (LLB) degree with First Class Honours from the Kwame Nkrumah University of Science and Technology (KNUST), Kumasi, ranking third in a graduating class of 200. He then undertook his professional legal training at the Ghana School of Law. As a Chevening Scholar, he earned a Master of Laws (LLM) in Commercial Law with First Class Honours from the University of Cambridge, United Kingdom, where he graduated as the best student in the Commercial Law specialisation and ranked third out of 195 candidates overall. He was awarded the Faculty of Law Prizes in Competition Law and in Corporate Insolvency Law, as well as the Jeffrey W. Cook Prize in Law for the best-performing LLM student and the Johnston Prize for Postgraduate Studies, both awarded by Hughes Hall College. He is currently studying for a Doctor of Philosophy (PhD) in International Law at the University of Cambridge as a Cambridge Trust International Scholar. He is also an Affiliate Researcher at the Lauterpacht Centre for International Law, one of the world’s foremost centres for international law research.",
      "Ezekiel was enrolled as a Barrister and Solicitor of the Supreme Court of Ghana in November 2022. He is a member of the Ghana Bar Association and of the Young International Arbitration Group, London. He began his practice at Owusu-Dapaa Law and Associates Ltd, Kumasi, where he trained as a pupil and later served as an Associate specialising in general and corporate litigation, before joining SBA Legal Consult. In the course of his practice, he has acted for institutions, companies, foreign investors, and individuals in corporate transactions, commercial litigation, debt settlement and restructuring arrangements, and mining and land compensation claims.",
      "Alongside his practice, Ezekiel lectures in Public International Law and Company Law at the Faculty of Law, KNUST, and has taught International Trade and Investment Law and Advanced International Law at the GIMPA Law School. He is Co-Editor-in-Chief of the Cambridge Law Review and Managing Editor of the Cambridge International Law Journal. As a Contributing Editor of The Competition Brief, he co-directed the development of the first comprehensive database of African competition law jurisprudence. He is also a consultant to the Centre for Human Rights, University of Pretoria, South Africa. He has published widely in local and international journals on, among others, corporate law, creditor protection in liquidation, merger control under Ghanaian and ECOWAS law, and public international law.",
      "Ezekiel is committed to bringing professionalism, rigorous research, sound judgment, and integrity to every matter he handles. He is dedicated to helping institutions, companies, and individuals resolve their legal challenges and protect their interests in an increasingly complex commercial, regulatory, and technological environment.",
    ],
  },
  {
    name: "Abena Frema Kyei-Baffour",
    title: "Associate",
    slug: "abena-frema-kyei-baffour",
    email: "abena.baffour@sbalegalconsult.com",
    alumniOf: ["Kwame Nkrumah University of Science and Technology", "Ghana School of Law"],
    image: "/portraits/abena_frema_kyei_baffuor.webp",
    excerpt:
      "Client-focused practitioner advising individuals and institutions on disputes, medical law and corporate transactions.",
    focus: [
      "Medical Law",
      "Dispute Resolution",
      "Corporate and Commercial Advisory",
      "Property and Conveyancing",
      "Intellectual Property",
    ],
    bio: [
      "Abena Frema Kyei-Baffour is a driven and client-focused private legal practitioner at SBA Legal Consult, Ahinsan Estate-Kumasi, where she provides dispute resolution and legal advisory services to individuals and institutions. Her practice is built on strong training across Tort Law, Medical Law, Contract Law, Corporate Law, Immovable Property Law, Drafting and Conveyancing, Intellectual Property Law, International Commercial Law, and Human Rights Law.",
      "Abena obtained her Bachelor of Laws (LLB) degree from the Kwame Nkrumah University of Science and Technology (KNUST) in Kumasi, graduating with First Class Honours as the Best Graduating Student for the Class of 2023. She subsequently pursued her professional legal training at the Ghana School of Law and was called to the Ghanaian Bar upon successful completion.",
      "Her areas of interest include medical law, international law, dispute resolution, and corporate and commercial transactional advisory services. With strong research, organisational and people skills, Abena brings her expertise to help each client navigate legal challenges and achieve their goals.",
    ],
  },
];

export const SITE = {
  name: "SBA Legal Consult",
  heroHeading: ["Sound law.", "Practical solutions."],
  heroIntro:
    "At SBA Legal Consult, we aim to turn sound legal principle into practical solutions that move our clients’ case forward.",
  email: "chambers@sbalegalconsult.com",
  // Official profiles only — footer icons and structured data use these. Empty until confirmed.
  socials: [] as { label: "LinkedIn" | "Facebook" | "X"; href: string }[],
  phone1: "0543557244",
  phone2: "0322291474",
  address:
    "2nd Floor, JP Station, Ahinsan Estate, Kumasi, Ashanti",
  poBox: "P.O. Box UP 824, Kumasi",
  // Ghana Post Digital Address
  gps: "AO-K189-9869",
  // Google Maps listing: "SBA LEGAL CONSULT PRUC" (plus code MCC5+9M3)
  geo: { latitude: 6.67088, longitude: -1.59083 },
  mapEmbed: "https://www.google.com/maps?q=MCC5+9M3+SBA+LEGAL+CONSULT+PRUC,+Kumasi&output=embed",
};
