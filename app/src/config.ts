// =============================================================================
// SH Real Estate Configuration
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "SH Real Estate | Said HOUSNI - Terrains Rabat, Shoul & Zaër",
  description: "Terrains agricoles et de construction à vendre à Rabat-Salé, Shoul et Zaër. Contact direct avec le propriétaire, expertise locale.",
  language: "fr",
  keywords: "terrain maroc, achat terrain rabat, terrain agricole shoul, terrain construction zaër, immobilier maroc, said housni",
  ogImage: "/images/hero-bg-1.jpg",
  canonical: "https://sh-realestate.ma",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  logo: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "SH",
  brandSubname: "Real Estate",
  tagline: "Said HOUSNI",
  logo: "/images/logo.png",
  navLinks: [
    { name: "Terrains", href: "#properties", icon: "Home" },
    { name: "Régions", href: "#regions", icon: "MapPin" },
    { name: "Témoignages", href: "#testimonials", icon: "Users" },
    { name: "Contact", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "WhatsApp",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
  logo: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "SH",
  brandSubname: "Real Estate",
  yearText: "Rabat, Morocco",
  logo: "/images/logo.png",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
}

export interface HeroConfig {
  scriptText: string;
  scriptTextAr: string;
  mainTitle: string;
  mainTitleAr: string;
  ctaButtonText: string;
  ctaButtonTextAr: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImages: string[];
}

export const heroConfig: HeroConfig = {
  scriptText: "Said HOUSNI Immobilier",
  scriptTextAr: "سعيد حسني للعقارات",
  mainTitle: "TROUVEZ VOTRE TERRAIN",
  mainTitleAr: "أرض أحلامك هنا",
  ctaButtonText: "Explorer les terrains",
  ctaButtonTextAr: "استكشف الأراضي",
  ctaTarget: "#properties",
  stats: [
    { value: 150, suffix: "+", label: "Terrains vendus", labelAr: "أرض مباعة" },
    { value: 3, suffix: "", label: "Régions couvertes", labelAr: "منطقة مغطاة" },
    { value: 15, suffix: "+", label: "Années d'expérience", labelAr: "سنة خبرة" },
  ],
  decorativeText: "Agricultural & Construction",
  backgroundImages: [
    "/images/hero-bg-1.jpg",
    "/images/hero-bg-2.jpg",
    "/images/hero-bg-3.jpg",
  ],
};

// -----------------------------------------------------------------------------
// Property Showcase Config
// -----------------------------------------------------------------------------
export interface Property {
  id: string;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  location: string;
  locationAr: string;
  image: string;
  type: string;
  typeAr: string;
  glowColor: string;
  description: string;
  descriptionAr: string;
  features: string;
  surface: string;
  surfaceAr: string;
  accessibility: string;
  accessibilityAr: string;
  potential: string;
  potentialAr: string;
}

export interface PropertyFeature {
  icon: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

export interface PropertyQuote {
  text: string;
  textAr: string;
  attribution: string;
  prefix: string;
  prefixAr: string;
}

export interface PropertyShowcaseConfig {
  scriptText: string;
  scriptTextAr: string;
  subtitle: string;
  subtitleAr: string;
  mainTitle: string;
  mainTitleAr: string;
  properties: Property[];
  features: PropertyFeature[];
  quote: PropertyQuote;
}

export const propertyShowcaseConfig: PropertyShowcaseConfig = {
  scriptText: "Nos Sélections",
  scriptTextAr: "اختياراتنا",
  subtitle: "TERRAINS PREMIUM",
  subtitleAr: "أراضي مميزة",
  mainTitle: "Des opportunités uniques",
  mainTitleAr: "فرص فريدة",
  properties: [
    {
      id: "shoul-agri",
      name: "SOL RICHE",
      nameAr: "تربة خصبة",
      subtitle: "Terrain Agricole Fertile",
      subtitleAr: "أرض زراعية خصبة",
      location: "Shoul",
      locationAr: "السهول",
      image: "/images/shoul-agricultural.jpg",
      type: "Agricole",
      typeAr: "زراعي",
      glowColor: "bg-emerald-500/15",
      description: "Terrain agricole ouvert avec irrigation établie, façade sur route et possibilité d'expansion. Convient aux vergers, oliviers ou agriculture mixte.",
      descriptionAr: "أرض زراعية مفتوحة مع ري قائم، واجهة على الطريق وإمكانية التوسع. مناسبة للبساتين والزيتون أو الزراعة المختلطة.",
      features: "Irrigation établie, Accès routier",
      surface: "5 à 50 hectares",
      surfaceAr: "5 إلى 50 هكتار",
      accessibility: "Route asphaltée",
      accessibilityAr: "طريق معبد",
      potential: "Oliviers, vergers, cultures mixtes",
      potentialAr: "زيتون، بساتين، زراعة مختلطة",
    },
    {
      id: "zaer-valley",
      name: "VALLÉE FERTILE",
      nameAr: "وادي خصب",
      subtitle: "Vallée Agricole",
      subtitleAr: "وادي زراعي",
      location: "Zaër",
      locationAr: "زعير",
      image: "/images/zaer-valley.jpg",
      type: "Agricole",
      typeAr: "زراعي",
      glowColor: "bg-amber-500/15",
      description: "Pentes douces, drainage naturel et bonnes heures d'ensoleillement. Un choix pratique pour les cultures à haut rendement ou l'investissement agricole à long terme.",
      descriptionAr: "منحدرات خفيفة، تصريف طبيعي وساعات شمس جيدة. خيار عملي للمحاصيل عالية الإنتاج أو الاستثمار الزراعي طويل المدى.",
      features: "Pentes douces, Drainage naturel",
      surface: "10 à 100 hectares",
      surfaceAr: "10 إلى 100 هكتار",
      accessibility: "Piste aménagée",
      accessibilityAr: "طريق ممهد",
      potential: "Cultures industrielles, élevage",
      potentialAr: "محاصيل صناعية، تربية مواشي",
    },
    {
      id: "rabat-const",
      name: "PRÊT À CONSTRUIRE",
      nameAr: "جاهز للبناء",
      subtitle: "Terrain Construction",
      subtitleAr: "أرض للبناء",
      location: "Rabat-Salé",
      locationAr: "الرباط-سلا",
      image: "/images/rabat-construction.jpg",
      type: "Construction",
      typeAr: "بناء",
      glowColor: "bg-blue-500/15",
      description: "Topographie plate, services à proximité et titre clair. Idéal pour le développement résidentiel ou une propriété privée avec vue sur la campagne.",
      descriptionAr: "تضاريس مسطحة، خدمات قريبة وعنوان واضح. مثالي للتطوير السكني أو ملكية خاصة مع إطلالة على الريف.",
      features: "Topographie plate, Services à proximité",
      surface: "500 à 5000 m²",
      surfaceAr: "500 إلى 5000 متر مربع",
      accessibility: "Route principale",
      accessibilityAr: "طريق رئيسي",
      potential: "Villa, résidence, projet immobilier",
      potentialAr: "فيلا، إقامة، مشروع عقاري",
    },
  ],
  features: [
    { 
      icon: "MapPin", 
      title: "Géolocalisation", 
      titleAr: "تحديد الموقع",
      description: "Coordonnées GPS précises pour chaque terrain",
      descriptionAr: "إحداثيات GPS دقيقة لكل قطعة أرض"
    },
    { 
      icon: "FileCheck", 
      title: "Titres vérifiés", 
      titleAr: "عناوين موثقة",
      description: "Documentation légale complète et vérifiée",
      descriptionAr: "وثائق قانونية كاملة وموثقة"
    },
    { 
      icon: "Phone", 
      title: "Contact direct", 
      titleAr: "اتصال مباشر",
      description: "Accès immédiat via WhatsApp ou téléphone",
      descriptionAr: "وصول فوري عبر واتساب أو الهاتف"
    },
  ],
  quote: {
    text: "Chaque terrain raconte une histoire. Laissez-nous vous aider à écrire la vôtre.",
    textAr: "كل قطعة أرض تحكي قصة. دعنا نساعدك في كتابة قصتك.",
    attribution: "Said HOUSNI",
    prefix: "Notre philosophie",
    prefixAr: "فلسفتنا",
  },
};

// -----------------------------------------------------------------------------
// Region Carousel Config
// -----------------------------------------------------------------------------
export interface RegionSlide {
  image: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  area: string;
  unit: string;
  unitAr: string;
  description: string;
  descriptionAr: string;
}

export interface RegionCarouselConfig {
  scriptText: string;
  scriptTextAr: string;
  subtitle: string;
  subtitleAr: string;
  mainTitle: string;
  mainTitleAr: string;
  locationTag: string;
  locationTagAr: string;
  slides: RegionSlide[];
}

export const regionCarouselConfig: RegionCarouselConfig = {
  scriptText: "Nos Régions",
  scriptTextAr: "مناطقنا",
  subtitle: "ZONES D'INTERVENTION",
  subtitleAr: "مناطق العمل",
  mainTitle: "Trois territoires d'exception",
  mainTitleAr: "ثلاثة أقاليم استثنائية",
  locationTag: "Rabat-Salé, Shoul & Zaër",
  locationTagAr: "الرباط-سلا، السهول وزعير",
  slides: [
    {
      image: "/images/rabat-agricultural.jpg",
      title: "RABAT-SALÉ",
      titleAr: "الرباط-سلا",
      subtitle: "Proche de la capitale",
      subtitleAr: "قرب العاصمة",
      area: "500",
      unit: "m² à 10 ha",
      unitAr: "م² إلى 10 هكتار",
      description: "Terrains agricoles et constructibles à proximité immédiate de la capitale. Idéal pour les investisseurs cherchant accessibilité et valeur ajoutée.",
      descriptionAr: "أراضي زراعية وقابلة للبناء بالقرب من العاصمة. مثالي للمستثمرين الباحثين عن إمكانية الوصول والقيمة المضافة.",
    },
    {
      image: "/images/shoul-mixed.jpg",
      title: "SHOUL",
      titleAr: "السهول",
      subtitle: "Terre d'agriculture",
      subtitleAr: "أرض الزراعة",
      area: "1",
      unit: "à 100 hectares",
      unitAr: "إلى 100 هكتار",
      description: "Région agricole par excellence avec des sols riches et une tradition séculaire de culture. Parfait pour les projets agricoles ambitieux.",
      descriptionAr: "منطقة زراعية بامتياز مع تربة خصبة وتقليد زراعي قديم. مثالي للمشاريع الزراعية الطموحة.",
    },
    {
      image: "/images/zaer-mixed.jpg",
      title: "ZAËR",
      titleAr: "زعير",
      subtitle: "Vallées fertiles",
      subtitleAr: "وديان خصبة",
      area: "5",
      unit: "à 200 hectares",
      unitAr: "إلى 200 هكتار",
      description: "Vallées verdoyantes et pentes douces offrant des conditions optimales pour l'agriculture et l'élevage. Un potentiel exceptionnel.",
      descriptionAr: "وديان خضراء ومنحدرات خفيفة توفر ظروف مثالية للزراعة والتربية. إمكانات استثنائية.",
    },
  ],
};

// -----------------------------------------------------------------------------
// About/Museum Config
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  year: string;
  event: string;
  eventAr: string;
}

export interface AboutTabContent {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  highlight: string;
  highlightAr: string;
}

export interface AboutTab {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  image: string;
  content: AboutTabContent;
}

export interface AboutQuote {
  prefix: string;
  prefixAr: string;
  text: string;
  textAr: string;
  attribution: string;
}

export interface AboutConfig {
  scriptText: string;
  scriptTextAr: string;
  subtitle: string;
  subtitleAr: string;
  mainTitle: string;
  mainTitleAr: string;
  introText: string;
  introTextAr: string;
  timeline: TimelineEvent[];
  tabs: AboutTab[];
  openingHours: string;
  openingHoursAr: string;
  openingHoursLabel: string;
  openingHoursLabelAr: string;
  ctaButtonText: string;
  ctaButtonTextAr: string;
  yearBadge: string;
  yearBadgeLabel: string;
  yearBadgeLabelAr: string;
  quote: AboutQuote;
  founderPhotoAlt: string;
  founderPhotoAltAr: string;
  founderPhoto: string;
}

export const aboutConfig: AboutConfig = {
  scriptText: "Notre Histoire",
  scriptTextAr: "قصتنا",
  subtitle: "AGENCE IMMOBILIÈRE",
  subtitleAr: "وكالة عقارية",
  mainTitle: "SH Real Estate",
  mainTitleAr: "إس إتش للعقارات",
  introText: "Fondée par Said HOUSNI, notre agence s'est spécialisée dans la vente de terrains agricoles et de construction dans les régions de Rabat-Salé, Shoul et Zaër. Notre expertise locale et notre réseau nous permettent de vous proposer les meilleures opportunités.",
  introTextAr: "تأسست بواسطة سعيد حسني، تخصصت وكالتنا في بيع الأراضي الزراعية والبناء في مناطق الرباط-سلا والسهول وزعير. خبرتنا المحلية وشبكتنا تسمحان لنا بتقديم أفضل الفرص.",
  timeline: [
    { year: "2008", event: "Création de l'agence à Rabat", eventAr: "تأسيس الوكالة بالرباط" },
    { year: "2012", event: "Expansion vers Shoul et Zaër", eventAr: "التوسع نحو السهول وزعير" },
    { year: "2018", event: "Lancement du service digital", eventAr: "إطلاق الخدمة الرقمية" },
    { year: "2024", event: "Plus de 150 terrains vendus", eventAr: "أكثر من 150 قطعة أرض مباعة" },
  ],
  tabs: [
    {
      id: "expertise",
      name: "Expertise",
      nameAr: "خبرة",
      icon: "Award",
      image: "/images/shoul-agricultural.jpg",
      content: {
        title: "Connaissance du terrain",
        titleAr: "معرفة الأرض",
        description: "Nous connaissons chaque parcelle, chaque chemin, chaque particularité des régions où nous intervenons. Cette expertise nous permet de vous conseiller avec précision.",
        descriptionAr: "نحن نعرف كل قطعة أرض، كل طريق، كل خصوصية للمناطق التي نعمل فيها. هذه الخبرة تسمح لنا بتقديم المشورة بدقة.",
        highlight: "15 ans d'expérience",
        highlightAr: "15 سنة خبرة",
      },
    },
    {
      id: "service",
      name: "Service",
      nameAr: "خدمة",
      icon: "BookOpen",
      image: "/images/zaer-valley.jpg",
      content: {
        title: "Accompagnement complet",
        titleAr: "مرافقة شاملة",
        description: "De la première visite à la signature finale, nous vous accompagnons à chaque étape. Documentation légale, formalités administratives, nous gérons tout.",
        descriptionAr: "من الزيارة الأولى إلى التوقيع النهائي، نرافقك في كل خطوة. الوثائق القانونية، الإجراءات الإدارية، ندير كل شيء.",
        highlight: "Service clé en main",
        highlightAr: "خدمة جاهزة",
      },
    },
    {
      id: "confiance",
      name: "Confiance",
      nameAr: "ثقة",
      icon: "History",
      image: "/images/rabat-construction.jpg",
      content: {
        title: "Transparence totale",
        titleAr: "شفافية تامة",
        description: "Pas de frais cachés, pas de mauvaises surprises. Nous vous fournissons toutes les informations nécessaires pour prendre votre décision en toute confiance.",
        descriptionAr: "لا رسوم خفية، لا مفاجآت سلبية. نقدم لك جميع المعلومات اللازمة لاتخاذ قرارك بثقة تامة.",
        highlight: "Contact direct",
        highlightAr: "اتصال مباشر",
      },
    },
  ],
  openingHours: "Lun - Sam: 9h00 - 18h00",
  openingHoursAr: "السبت - الأحد: 9:00 - 18:00",
  openingHoursLabel: "Horaires d'ouverture",
  openingHoursLabelAr: "ساعات العمل",
  ctaButtonText: "Nous contacter",
  ctaButtonTextAr: "اتصل بنا",
  yearBadge: "2008",
  yearBadgeLabel: "Fondée",
  yearBadgeLabelAr: "تأسست",
  quote: {
    prefix: "Notre engagement",
    prefixAr: "التزامنا",
    text: "Votre projet est notre priorité. Chaque client mérite une attention personnalisée et une solution adaptée à ses besoins.",
    textAr: "مشروعك هو أولويتنا. كل عميل يستحق اهتمام شخصي وحلاً يناسب احتياجاته.",
    attribution: "Said HOUSNI",
  },
  founderPhotoAlt: "Said HOUSNI - Fondateur SH Real Estate",
  founderPhotoAltAr: "سعيد حسني - مؤسس إس إتش للعقارات",
  founderPhoto: "/images/hero-bg-1.jpg",
};

// -----------------------------------------------------------------------------
// Testimonials/News Config
// -----------------------------------------------------------------------------
export interface SuccessStory {
  id: number;
  image: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  date: string;
  category: string;
  categoryAr: string;
}

export interface Testimonial {
  name: string;
  role: string;
  roleAr: string;
  text: string;
  textAr: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  prefixAr: string;
  text: string;
  textAr: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
  labelAr: string;
}

export interface TestimonialsConfig {
  scriptText: string;
  scriptTextAr: string;
  subtitle: string;
  subtitleAr: string;
  mainTitle: string;
  mainTitleAr: string;
  viewAllText: string;
  viewAllTextAr: string;
  readMoreText: string;
  readMoreTextAr: string;
  articles: SuccessStory[];
  testimonialsScriptText: string;
  testimonialsScriptTextAr: string;
  testimonialsSubtitle: string;
  testimonialsSubtitleAr: string;
  testimonialsMainTitle: string;
  testimonialsMainTitleAr: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storyScriptTextAr: string;
  storySubtitle: string;
  storySubtitleAr: string;
  storyTitle: string;
  storyTitleAr: string;
  storyParagraphs: string[];
  storyParagraphsAr: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
  storyImageCaptionAr: string;
}

export const testimonialsConfig: TestimonialsConfig = {
  scriptText: "Nos Réussites",
  scriptTextAr: "نجاحاتنا",
  subtitle: "HISTOIRES DE SUCCÈS",
  subtitleAr: "قصص النجاح",
  mainTitle: "Ils nous ont fait confiance",
  mainTitleAr: "من وثق بنا",
  viewAllText: "Voir tout",
  viewAllTextAr: "عرض الكل",
  readMoreText: "Lire plus",
  readMoreTextAr: "اقرأ المزيد",
  articles: [
    {
      id: 1,
      image: "/images/shoul-agricultural.jpg",
      title: "Projet oléicole à Shoul",
      titleAr: "مشروع زيتون في السهول",
      excerpt: "Un investisseur européen a acquis 25 hectares pour une oliveraie moderne.",
      excerptAr: "استثمر أوروبي في 25 هكتار لمزرعة زيتون حديثة.",
      date: "Mars 2024",
      category: "Agricole",
      categoryAr: "زراعي",
    },
    {
      id: 2,
      image: "/images/rabat-construction.jpg",
      title: "Villa familiale à Rabat",
      titleAr: "فيلا عائلية بالرباط",
      excerpt: "Construction d'une résidence secondaire avec vue sur la campagne.",
      excerptAr: "بناء إقامة ثانوية مع إطلالة على الريف.",
      date: "Janvier 2024",
      category: "Construction",
      categoryAr: "بناء",
    },
    {
      id: 3,
      image: "/images/zaer-mixed.jpg",
      title: "Exploitation mixte à Zaër",
      titleAr: "مشروع مختلط في زعير",
      excerpt: "Un projet combinant agriculture et tourisme rural sur 40 hectares.",
      excerptAr: "مشروع يجمع بين الزراعة والسياحة الريفية على 40 هكتار.",
      date: "Décembre 2023",
      category: "Mixte",
      categoryAr: "مختلط",
    },
  ],
  testimonialsScriptText: "Témoignages",
  testimonialsScriptTextAr: "شهادات",
  testimonialsSubtitle: "AVIS CLIENTS",
  testimonialsSubtitleAr: "آراء العملاء",
  testimonialsMainTitle: "Ce qu'ils disent de nous",
  testimonialsMainTitleAr: "ماذا يقولون عنا",
  testimonials: [
    {
      name: "Ahmed B.",
      role: "Investisseur",
      roleAr: "مستثمر",
      text: "Service professionnel et transparent. Said a su trouver le terrain parfait pour mon projet agricole en moins d'un mois.",
      textAr: "خدمة احترافية وشفافة. سعيد وجد الأرض المثالية لمشروعي الزراعي في أقل من شهر.",
      rating: 5,
    },
    {
      name: "Fatima L.",
      role: "Propriétaire",
      roleAr: "مالكة",
      text: "Accompagnement de A à Z. Toutes les formalités ont été gérées efficacement. Je recommande vivement SH Real Estate.",
      textAr: "مرافقة من الألف إلى الياء. تمت إدارة جميع الإجراءات بكفاءة. أنصح بشدة بإس إتش للعقارات.",
      rating: 5,
    },
    {
      name: "Karim M.",
      role: "Développeur",
      roleAr: "مطور",
      text: "Excellente connaissance du terrain et des procédures administratives. Un partenaire de confiance pour mes projets immobiliers.",
      textAr: "معرفة ممتازة بالأرض والإجراءات الإدارية. شريك موثوق لمشاريعي العقارية.",
      rating: 5,
    },
  ],
  storyScriptText: "Notre Approche",
  storyScriptTextAr: "نهجنا",
  storySubtitle: "MÉTHODOLOGIE",
  storySubtitleAr: "منهجية",
  storyTitle: "Comment nous travaillons",
  storyTitleAr: "كيف نعمل",
  storyParagraphs: [
    "Nous croyons en une approche personnalisée où chaque client est unique. Notre processus commence par une écoute attentive de vos besoins et de vos objectifs.",
    "Nous sélectionnons ensuite les terrains correspondant à vos critères et vous accompagnons sur site pour des visites détaillées. Notre expertise technique vous garantit une évaluation précise de chaque opportunité.",
  ],
  storyParagraphsAr: [
    "نؤمن بنهج شخصي حيث كل عميل فريد. تبدأ عمليتنا بالاستماع الجيد لاحتياجاتك وأهدافك.",
    "ثم نختار الأراضي التي تتوافق مع معاييرك ونرافقك في الموقع لزيارات مفصلة. خبرتنا التقنية تضمن لك تقييماً دقيقاً لكل فرصة.",
  ],
  storyTimeline: [
    { value: "01", label: "Consultation", labelAr: "استشارة" },
    { value: "02", label: "Sélection", labelAr: "اختيار" },
    { value: "03", label: "Visite", labelAr: "زيارة" },
    { value: "04", label: "Acquisition", labelAr: "اقتناء" },
  ],
  storyQuote: {
    prefix: "Notre promesse",
    prefixAr: "وعدنا",
    text: "Votre réussite est notre meilleure publicité. Nous construisons des relations durables basées sur la confiance et les résultats.",
    textAr: "نجاحك هو أفضل إعلان لنا. نبني علاقات دائمة قائمة على الثقة والنتائج.",
    attribution: "Said HOUSNI",
  },
  storyImage: "/images/zaer-construction.jpg",
  storyImageCaption: "Terrain prêt pour construction",
  storyImageCaptionAr: "أرض جاهزة للبناء",
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  labelAr: string;
  value: string;
  subtext: string;
  subtextAr: string;
}

export interface ContactFormFields {
  nameLabel: string;
  nameLabelAr: string;
  namePlaceholder: string;
  namePlaceholderAr: string;
  emailLabel: string;
  emailLabelAr: string;
  emailPlaceholder: string;
  emailPlaceholderAr: string;
  phoneLabel: string;
  phoneLabelAr: string;
  phonePlaceholder: string;
  phonePlaceholderAr: string;
  visitDateLabel: string;
  visitDateLabelAr: string;
  visitorsLabel: string;
  visitorsLabelAr: string;
  visitorsOptions: string[];
  visitorsOptionsAr: string[];
  messageLabel: string;
  messageLabelAr: string;
  messagePlaceholder: string;
  messagePlaceholderAr: string;
  submitText: string;
  submitTextAr: string;
  submittingText: string;
  submittingTextAr: string;
  successMessage: string;
  successMessageAr: string;
  errorMessage: string;
  errorMessageAr: string;
}

export interface ContactFormConfig {
  scriptText: string;
  scriptTextAr: string;
  subtitle: string;
  subtitleAr: string;
  mainTitle: string;
  mainTitleAr: string;
  introText: string;
  introTextAr: string;
  contactInfoTitle: string;
  contactInfoTitleAr: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  privacyNoticeAr: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "Contactez-nous",
  scriptTextAr: "اتصل بنا",
  subtitle: "PREMIER CONTACT",
  subtitleAr: "أول اتصال",
  mainTitle: "Discutons de votre projet",
  mainTitleAr: "لنناقش مشروعك",
  introText: "Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures. Vous pouvez aussi nous contacter directement par WhatsApp ou téléphone.",
  introTextAr: "املأ النموذج أدناه وسنرد عليك في غضون 24 ساعة. يمكنك أيضًا الاتصال بنا مباشرة عبر واتساب أو الهاتف.",
  contactInfoTitle: "Nos coordonnées",
  contactInfoTitleAr: "معلومات الاتصال",
  contactInfo: [
    { 
      icon: "Phone", 
      label: "Téléphone & WhatsApp", 
      labelAr: "الهاتف وواتساب",
      value: "+212 631-800376", 
      subtext: "Disponible 7j/7",
      subtextAr: "متاح 7/7"
    },
    { 
      icon: "Mail", 
      label: "Email", 
      labelAr: "البريد الإلكتروني",
      value: "saidhousni.immo@gmail.com", 
      subtext: "Réponse sous 24h",
      subtextAr: "رد خلال 24 ساعة"
    },
    { 
      icon: "MapPin", 
      label: "Bureau", 
      labelAr: "المكتب",
      value: "Rabat, Morocco", 
      subtext: "Sur rendez-vous",
      subtextAr: "بالموعد المسبق"
    },
    { 
      icon: "Clock", 
      label: "Horaires", 
      labelAr: "الساعات",
      value: "Lun-Sam: 9h-18h", 
      subtext: "Dimanche fermé",
      subtextAr: "الأحد مغلق"
    },
  ],
  form: {
    nameLabel: "Nom complet",
    nameLabelAr: "الاسم الكامل",
    namePlaceholder: "Votre nom",
    namePlaceholderAr: "اسمك",
    emailLabel: "Email",
    emailLabelAr: "البريد الإلكتروني",
    emailPlaceholder: "votre@email.com",
    emailPlaceholderAr: "بريدك@مثال.com",
    phoneLabel: "Téléphone",
    phoneLabelAr: "الهاتف",
    phonePlaceholder: "+212 6XX-XXXXXX",
    phonePlaceholderAr: "+212 6XX-XXXXXX",
    visitDateLabel: "Date de visite souhaitée",
    visitDateLabelAr: "تاريخ الزيارة المفضل",
    visitorsLabel: "Type de projet",
    visitorsLabelAr: "نوع المشروع",
    visitorsOptions: ["Agricole", "Construction", "Mixte", "Investissement"],
    visitorsOptionsAr: ["زراعي", "بناء", "مختلط", "استثمار"],
    messageLabel: "Message",
    messageLabelAr: "الرسالة",
    messagePlaceholder: "Décrivez votre projet...",
    messagePlaceholderAr: "صف مشروعك...",
    submitText: "Envoyer la demande",
    submitTextAr: "إرسال الطلب",
    submittingText: "Envoi en cours...",
    submittingTextAr: "جاري الإرسال...",
    successMessage: "Merci ! Nous vous contacterons sous 24 heures.",
    successMessageAr: "شكراً! سنتصل بك في غضون 24 ساعة.",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
    errorMessageAr: "حدث خطأ. يرجى المحاولة مرة أخرى.",
  },
  privacyNotice: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité.",
  privacyNoticeAr: "بتقديم هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا.",
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  nameAr: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  titleAr: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  descriptionAr: string;
  logo: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterLabelAr: string;
  newsletterPlaceholder: string;
  newsletterPlaceholderAr: string;
  newsletterButtonText: string;
  newsletterButtonTextAr: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  backToTopTextAr: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "SH",
  tagline: "Real Estate",
  description: "Votre partenaire de confiance pour l'achat de terrains agricoles et de construction à Rabat-Salé, Shoul et Zaër.",
  descriptionAr: "شريكك الموثوق لشراء الأراضي الزراعية والبناء في الرباط-سلا والسهول وزعير.",
  logo: "/images/logo.png",
  socialLinks: [
    { icon: "Facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575480530786" },
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com/SH_Lands_Rabat" },
    { icon: "MessageCircle", label: "Snapchat", href: "https://snapchat.com/add/SH_RealEstate" },
  ],
  linkGroups: [
    {
      title: "Terrains",
      titleAr: "أراضي",
      links: [
        { name: "Agricoles", nameAr: "زراعية", href: "#properties" },
        { name: "Construction", nameAr: "بناء", href: "#properties" },
        { name: "Mixte", nameAr: "مختلط", href: "#properties" },
      ],
    },
    {
      title: "Régions",
      titleAr: "مناطق",
      links: [
        { name: "Rabat-Salé", nameAr: "الرباط-سلا", href: "#regions" },
        { name: "Shoul", nameAr: "السهول", href: "#regions" },
        { name: "Zaër", nameAr: "زعير", href: "#regions" },
      ],
    },
  ],
  contactItems: [
    { icon: "Phone", text: "+212 631-800376" },
    { icon: "Mail", text: "saidhousni.immo@gmail.com" },
    { icon: "MapPin", text: "Rabat, Morocco" },
  ],
  newsletterLabel: "Newsletter",
  newsletterLabelAr: "النشرة الإخبارية",
  newsletterPlaceholder: "Votre email",
  newsletterPlaceholderAr: "بريدك الإلكتروني",
  newsletterButtonText: "S'inscrire",
  newsletterButtonTextAr: "اشتراك",
  newsletterSuccessText: "Inscription réussie !",
  newsletterErrorText: "Erreur. Veuillez réessayer.",
  copyrightText: "© 2024 SH Real Estate. Tous droits réservés.",
  legalLinks: ["Politique de confidentialité", "Conditions d'utilisation"],
  icpText: "Said HOUSNI Immobilier",
  backToTopText: "Haut de page",
  backToTopTextAr: "العودة للأعلى",
  ageVerificationText: "",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
  ariaLabelAr: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Retour en haut",
  ariaLabelAr: "العودة للأعلى",
};

// -----------------------------------------------------------------------------
// WhatsApp Config
// -----------------------------------------------------------------------------
export interface WhatsAppConfig {
  phoneNumber: string;
  message: string;
  messageAr: string;
  position: "left" | "right";
}

export const whatsAppConfig: WhatsAppConfig = {
  phoneNumber: "+212631800376",
  message: "Bonjour, je suis intéressé par un terrain. Pouvez-vous m'en dire plus ?",
  messageAr: "مرحباً، أنا مهتم بقطعة أرض. هل يمكنك إخباري المزيد؟",
  position: "right",
};

// -----------------------------------------------------------------------------
// Phone Config (Click to Call)
// -----------------------------------------------------------------------------
export interface PhoneConfig {
  phoneNumber: string;
  displayNumber: string;
}

export const phoneConfig: PhoneConfig = {
  phoneNumber: "+212631800376",
  displayNumber: "+212 631-800376",
};

// -----------------------------------------------------------------------------
// Admin Config
// -----------------------------------------------------------------------------
export interface AdminConfig {
  login: string;
  password: string;
  dashboardTitle: string;
  dashboardTitleAr: string;
}

export const adminConfig: AdminConfig = {
  login: "admin",
  password: "Mahjoub!2026",
  dashboardTitle: "SH Real Estate - Administration",
  dashboardTitleAr: "إس إتش للعقارات - الإدارة",
};
