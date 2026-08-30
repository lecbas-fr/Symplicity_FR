// Contenus et médias officiels Symplicity (récupérés depuis le site d'origine)

export const companyInfo = {
  name: "SYMPLICITY",
  legalName: "Symplicity",
  tagline: "Services informatiques sur-mesure, créateurs de valeur pour votre entreprise",
  description: "Depuis 2007, nous fournissons des solutions, des produits informatiques et des conseils sur mesure, afin d'accompagner la croissance de nos clients au quotidien.",
  phone: "01 85 450 300",
  phoneHref: "+33185450300",
  email: "contact@symplicity.fr",
  address: "38 rue des Processions, 91240 Saint-Michel-Sur-Orge, FRANCE",
  addressLines: ["38 rue des Processions", "91240 Saint-Michel-Sur-Orge, FRANCE"],
  siret: "49523209200025",
  hours: [
    { days: "Lundi au vendredi", time: "9h - 18h" },
    { days: "Samedi", time: "8h - 12h" },
    { days: "Dimanche", time: "Fermé" }
  ]
};

export const navigationLinks = [
  { name: "Accueil", path: "/" },
  { name: "RGPD", path: "/rgpd" },
  { name: "Cybersécurité", path: "/cybersecurite" },
  { name: "Infogérance", path: "/infogerance" },
  { name: "Actualités", path: "/actualites" },
  { name: "Contact", path: "/contact" }
];

export const stats = [
  { number: "15", label: "Années", sublabel: "d'expérience" },
  { number: "+30", label: "Partenaires IT", sublabel: "" },
  { number: "+700", label: "Clients nous ont", sublabel: "fait confiance" },
  { number: "12", label: "Engagements au service", sublabel: "de votre entreprise" }
];

export const services = [
  {
    id: 1,
    title: "RGPD",
    description: "Confiez votre mise en conformité RGPD à des professionnels certifiés, qui en feront un outil de création de valeur !",
    link: "/rgpd",
    icon: "Shield"
  },
  {
    id: 2,
    title: "CYBERSÉCURITÉ",
    description: "Faites auditer vos infrastructures IT, repérez les failles, et faites-vous accompagner pour une sécurisation optimale de vos installations",
    link: "/cybersecurite",
    icon: "Lock"
  },
  {
    id: 3,
    title: "INFOGÉRANCE",
    description: "Externalisez votre DSI en toute quiétude. Quel que soit votre enjeu IT (administration de parc, maintenance IT, choix de logiciel, achat de matériel...), nos experts vous accompagnent.",
    link: "/infogerance",
    icon: "Server"
  }
];

export const clientLogos = [
  { id: 1, name: "Eiffage Route", url: "/assets/clients/logo_eiffage.png" },
  { id: 2, name: "Commune de Ballainvilliers", url: "/assets/clients/logo_ballainvilliers.png" },
  { id: 3, name: "Clinique de Grosbois", url: "/assets/clients/logo_clinique_de_grosbois.png" },
  { id: 4, name: "Commune de Guignes", url: "/assets/clients/logo_guignes.png" },
  { id: 5, name: "Commune de Fontenay-lès-Briis", url: "/assets/clients/logo_fontenay_les_briis.png" },
  { id: 6, name: "Groupe BTL", url: "/assets/clients/logo_groupe_btl.png" },
  { id: 7, name: "MLO", url: "/assets/clients/logo_mlo.png" },
  { id: 8, name: "Client Symplicity", url: "/assets/clients/logo.png" }
];

export const certifications = [
  { id: 1, name: "Microsoft Certified Partner", url: "/assets/certifications/logo_microsoft.png" },
  { id: 2, name: "ExpertCyber - AFNOR", url: "/assets/certifications/logo_expert_cyber.png" },
  { id: 3, name: "ITIL", url: "/assets/certifications/logo_itil.png" },
  { id: 4, name: "ISO 27001", url: "/assets/certifications/logo_iso_27001.png" },
  { id: 5, name: "ISO 27005", url: "/assets/certifications/logo_iso_27005.png" },
  { id: 6, name: "DPO certifié CNIL", url: "/assets/certifications/logo_cnil.png" }
];

export const partnerLogos = [
  { id: 1, name: "Starware IT Services", url: "/assets/logo/logo-symplicity-horizontal.png" },
  { id: 2, name: "Network-ing", url: "/assets/img/logo-networking.png" }
];

export const testimonials = [
  {
    id: 1,
    quote: "Symplicity m'a fait redécouvrir le sens du mot « Service » ! Merci !",
    author: "Sébastien ROZIAK",
    company: "Eiffage Route"
  }
];

export const targetAudience = [
  { id: 1, title: "TPE / PME" },
  { id: 2, title: "Collectivités" },
  { id: 3, title: "Grands Groupes" }
];

export const aboutContent = {
  title: "QUI SOMMES-NOUS ?",
  description: "Depuis plus de 15 ans, Symplicity sert les TPE/PME et les collectivités locales, en veillant à leur proposer des solutions innovantes et créatrices de valeur dans le cycle de vie de leurs solutions informatiques.\n\nDepuis l'analyse des besoins jusqu'à l'infogérance avec une expertise dans les solutions Cloud, la cybersécurité et le RGPD, Symplicity se veut l'interlocuteur privilégié des structures de toutes tailles souhaitant externaliser leur DSI.\n\nPrestataire référence Cybermalveillance.Gouv.fr, nous avons été labellisés ExpertCyber par l'AFNOR en 2021.",
  image: "/assets/photos/photo1.jpg",
  certificationLogo: "/assets/certifications/cybermalveillance.png"
};

export const commitmentsContent = {
  title: "NOS ENGAGEMENTS",
  description: "Dans le cadre de notre activité, nous nous engageons et œuvrons chaque jour pour le respect de nos valeurs relatives à la Responsabilité Sociétale des Entreprises et des Collectivités Locales.\n\nPour nous, être une Entreprise Responsable c'est avant tout veiller au bien-être et à l'épanouissement professionnel de nos salariés, mais également à celui de nos clients, notamment en leur fournissant le meilleur matériel possible (réduction de bruit, ergonomie, etc).\n\nAu cœur de nos engagements se trouvent également l'optimisation des dépenses énergétiques, ainsi que de notre impact carbone.\n\nEnfin, le tri/recyclage de nos déchets numériques de la diversité est lui aussi un axe majeur de notre engagement. En effet, il est important pour nous d'être vigilants et actifs sur ces sujets, car nous sommes conscients de l'impact considérable de l'informatique sur l'environnement, et souhaitons agir à notre échelle sur ces enjeux."
};

export const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/company/starware-it-services/", icon: "Linkedin" },
  { name: "Twitter", url: "https://twitter.com/STARWARE_IT", icon: "Twitter" },
  { name: "Facebook", url: "https://www.facebook.com/Starware.IT/", icon: "Facebook" }
];
