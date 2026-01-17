import type { OnboardingOption, OnboardingStep, PoliticalLevel } from "./types";

export function getRoleOptionsByLevel(
  level?: PoliticalLevel,
): OnboardingOption[] {
  switch (level) {
    case "GOBIERNO_LOCAL":
      return [
        {
          value: "gobernador_regional",
          label: "Gobernador Regional",
          description: "Autoridad ejecutiva a nivel regional",
          icon: "map",
        },
        {
          value: "alcalde_provincial",
          label: "Alcalde Provincial",
          description: "Autoridad municipal provincial",
          icon: "building",
        },
        {
          value: "alcalde_distrital",
          label: "Alcalde Distrital",
          description: "Autoridad municipal distrital",
          icon: "home",
        },
      ];

    case "PARLAMENTARIO":
      return [
        {
          value: "senador_nacional",
          label: "Senador Nacional",
          description: "Senador de la República",
          icon: "landmark",
        },
        {
          value: "senador_distrito_multiple",
          label: "Senador distrito múltiple",
          description: "Senador representando a varios distritos",
          icon: "layers",
        },
        {
          value: "diputado",
          label: "Diputado",
          description: "Miembro de la Cámara de Diputados",
          icon: "users",
        },
        {
          value: "parlamentario_andino",
          label: "Parlamentario Andino",
          description: "Representante ante Parlamento Andino",
          icon: "globe",
        },
      ];

    case "PRESIDENCIAL":
      return [
        {
          value: "presidente",
          label: "Presidente",
          description: "Presidente de la República del Perú",
          icon: "crown",
        },
      ];

    default:
      return [
        {
          value: "alcalde_distrital",
          label: "Alcalde Distrital",
          description: "Gobierno municipal local",
          icon: "building",
        },
        {
          value: "diputado",
          label: "Diputado",
          description: "Poder legislativo nacional",
          icon: "users",
        },
        {
          value: "presidente",
          label: "Presidente",
          description: "Liderazgo ejecutivo nacional",
          icon: "crown",
        },
      ];
  }
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "role",
    title: "¿Qué rol cumples en la campaña?",
    subtitle: "Empezamos por tu enfoque principal",
    type: "single-select",
    options: [
      {
        value: "candidato",
        label: "Candidato",
        description: "Visión y liderazgo",
        icon: "sparkles",
      },
      {
        value: "estratega",
        label: "Estratega",
        description: "Dirección estratégica",
        icon: "target",
      },
    ],
  },
  {
    id: "politicalLevel",
    title: "Nivel de político",
    subtitle: "Selecciona el nivel que estás buscando",
    type: "single-select",
    options: [
      {
        value: "GOBIERNO_LOCAL",
        label: "Gobierno Local",
        description: "Gobiernos regionales y municipales",
        icon: "map",
      },
      {
        value: "PARLAMENTARIO",
        label: "Parlamentario",
        description: "Senado y cámara de diputados",
        icon: "landmark",
      },
      {
        value: "PRESIDENCIAL",
        label: "Presidencial",
        description: "Presidencia de la República",
        icon: "crown",
      },
    ],
  },
  {
    id: "politicalRole",
    title: "Rol político",
    subtitle: "Define la posición específica",
    type: "single-select",
  },
  {
    id: "politicalParty",
    title: "Partido político",
    subtitle: "Selecciona el partido o alianza",
    type: "single-select",
  },
  {
    id: "campaignProfile",
    title: "Datos del candidato",
    subtitle: "Completa el perfil político",
    type: "form",
    fields: [
      {
        id: "firstName",
        label: "Nombres",
        type: "text",
        required: true,
        placeholder: "Ej. Adriana",
      },
      {
        id: "lastName",
        label: "Apellidos",
        type: "text",
        required: true,
        placeholder: "Ej. Salazar",
      },
      {
        id: "birthDate",
        label: "Fecha de nacimiento",
        type: "date",
        required: true,
      },
      {
        id: "gender",
        label: "Sexo",
        type: "select",
        required: true,
        options: [
          { value: "F", label: "Femenino" },
          { value: "M", label: "Masculino" },
          { value: "X", label: "Otro" },
        ],
      },
      {
        id: "birthPlace",
        label: "Lugar de nacimiento",
        type: "text",
        required: true,
        placeholder: "Ej. Lima, Perú",
      },
      {
        id: "residence",
        label: "Lugar de residencia",
        type: "text",
        required: true,
        placeholder: "Ej. Miraflores, Lima",
      },
      {
        id: "facebookUrl",
        label: "URL de Facebook",
        type: "text",
        placeholder: "https://facebook.com/",
      },
      {
        id: "tiktokUrl",
        label: "URL de TikTok",
        type: "text",
        placeholder: "https://tiktok.com/@",
      },
      {
        id: "instagramUrl",
        label: "URL de Instagram",
        type: "text",
        placeholder: "https://instagram.com/",
      },
    ],
  },
  {
    id: "campaignStrategy",
    title: "¿Qué tipo de estrategia implementarás?",
    subtitle: "Elige tu estrategia principal",
    type: "single-select",
    guideText:
      "Elige una estrategia principal. Si seleccionas 'Mixto' podrás elegir cómo combinar las estrategias en el siguiente paso.",
    options: [
      {
        value: "RACIONAL",
        label: "Racional",
        description: "Plan de gobierno, equipo técnico",
        icon: "shield",
        detailedDescription:
          "Estrategia fundamentada en plan de gobierno, cifras y propuestas técnicas. Enfoque racional y estructurado con equipo técnico.",
        benefits: [
          "Gobernabilidad demostrada",
          "Credibilidad técnica",
          "Equipo técnico especializado",
          "Planificación detallada",
        ],
      },
      {
        value: "EMOTIVA",
        label: "Emotiva",
        description: "Esperanza, amor",
        icon: "heart",
        detailedDescription:
          "Estrategia centrada en generar conexión emocional con el electorado. Ideal para retención y movilización.",
        benefits: [
          "Conexión emocional profunda",
          "Narrativas inspiradoras",
          "Alta retención electoral",
          "Movilización efectiva",
        ],
      },
      {
        value: "INSTINTIVA",
        label: "Instintiva",
        description: "Odio y miedo",
        icon: "alert-circle",
        detailedDescription:
          "Estrategia basada en la percepción de amenaza y la necesidad de protección. Incluye identificación de adversarios.",
        benefits: [
          "Movilización por el miedo",
          "Identificación de enemigo común",
          "Mensaje protector",
          "Colectivismo defensivo",
        ],
      },
      {
        value: "MIXTO",
        label: "Mixto",
        description:
          "Integra paralela o secuencialmente Racional, Emotiva, Instintiva",
        icon: "layers",
        detailedDescription:
          "Estrategia completa que combina todas las dimensiones de campaña. Máximo alcance y cobertura.",
        benefits: [
          "Cobertura total",
          "Sinergia estratégica",
          "Presencia masiva",
          "Estrategia integrada",
        ],
      },
    ],
  },
  {
    id: "strategyCombination",
    title: "¿Cómo quieres combinar tus estrategias?",
    subtitle: "Selecciona la combinación que prefieres",
    type: "single-select",
    guideText:
      "Elige una combinación predefinida de estrategias para tu campaña mixta.",
    options: [
      {
        value: "RACIONAL+EMOTIVA",
        label: "Racional + Emotiva",
        description: "Plan de gobierno con conexión emocional",
        icon: "heart-shield",
        detailedDescription:
          "Combina propuestas técnicas con narrativas inspiradoras para una campaña equilibrada.",
        benefits: [
          "Credibilidad técnica",
          "Conexión emocional",
          "Mensaje integral",
          "Amplia cobertura",
        ],
      },
      {
        value: "EMOTIVA+INSTINTIVA",
        label: "Emotiva + Instintiva",
        description: "Conexión emocional con defensa",
        icon: "heart-alert",
        detailedDescription:
          "Combina conexión emocional profunda con estrategias de protección y pertenencia.",
        benefits: [
          "Alta movilización",
          "Vínculo emocional",
          "Identificación común",
          "Mensaje protector",
        ],
      },
      {
        value: "INSTINTIVA+RACIONAL",
        label: "Instintiva + Racional",
        description: "Defensa con propuestas técnicas",
        icon: "alert-shield",
        detailedDescription:
          "Combina protección contra amenazas con plan de gobierno estructurado.",
        benefits: [
          "Movilización defensiva",
          "Gobernabilidad",
          "Mensaje protector",
          "Base técnica",
        ],
      },
      {
        value: "EMOTIVA+RACIONAL+INSTINTIVA",
        label: "Emotiva + Racional + Instintiva",
        description: "Estrategia completa",
        icon: "layers",
        detailedDescription:
          "Integra todas las dimensiones: conexión emocional, propuestas técnicas y estrategias defensivas.",
        benefits: [
          "Cobertura total",
          "Sinergia estratégica",
          "Presencia masiva",
          "Estrategia integral",
        ],
      },
    ],
  },
];
