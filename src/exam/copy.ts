export type ExamLang = "es" | "en";

/**
 * Texto en pantalla. Voz Annorak: directo, cuantitativo, sin relleno.
 * Regla comercial: cada plano abre con el beneficio y cierra con una prueba.
 * La locucion (docs/vo/) lleva el detalle; aqui solo lo que se lee en 2 s.
 */
export const introCopy = {
  es: {
    crumb: "PFU  ·  Sistema de Exámenes",
    eyebrow: "SOFTWARE PARA ESCÁNERES fi SERIES",
    product: "Sistema de Exámenes",
    claim:
      "Exámenes tipo test corregidos por el escáner. Del diseño de la hoja a la nota, sin adivinar una casilla.",
    steps: [
      { n: "01", title: "Diseña", desc: "La hoja sale lista en minutos" },
      { n: "02", title: "Escanea", desc: "Una clase por pasada" },
      { n: "03", title: "Corrige", desc: "Tinta medida, no adivinada" },
    ],
    resultBadge: "Corregida  ·  8,5",
    scanLabel: "fi-7300NX  ·  escaneando",
    footer: "SOFTWARE  ANNORAK INTELLIGENCE GROUP   ·   CAPTURA  PAPERSTREAM CAPTURE PRO",
  },
  en: {
    crumb: "PFU  ·  Exam System",
    eyebrow: "SOFTWARE FOR fi SERIES SCANNERS",
    product: "Exam System",
    claim:
      "Multiple choice exams graded by the scanner. From sheet design to final grade, without guessing a single box.",
    steps: [
      { n: "01", title: "Design", desc: "Sheet ready in minutes" },
      { n: "02", title: "Scan", desc: "One class per pass" },
      { n: "03", title: "Grade", desc: "Ink measured, not guessed" },
    ],
    resultBadge: "Graded  ·  8.5",
    scanLabel: "fi-7300NX  ·  scanning",
    footer: "SOFTWARE  ANNORAK INTELLIGENCE GROUP   ·   CAPTURE  PAPERSTREAM CAPTURE PRO",
  },
} as const;

type Row = { before: string; after: string };
type Step = { n: string; label: string };
type Chip = { k: string; v: string };

export type SalesCopy = {
  problem: {
    eyebrow: string;
    title: string;
    lead: string;
    beforeHead: string;
    afterHead: string;
    rows: Row[];
    verdict: string;
  };
  hardware: {
    eyebrow: string;
    title: string;
    lead: string;
    chips: Chip[];
  };
  design: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    fields: Chip[];
    specTitle: string;
    coordTitle: string;
    coordNote: string;
    footnote: string;
  };
  identity: {
    eyebrow: string;
    title: string;
    lead: string;
    rosterTitle: string;
    students: string[];
    tokenTitle: string;
    tokenNote: string;
    badges: string[];
  };
  printScan: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: Step[];
    chips: Chip[];
  };
  vision: {
    eyebrow: string;
    title: string;
    lead: string;
    pipeline: string[];
    meterLabel: string;
    marked: string;
    doubtful: string;
    empty: string;
    verdict: string;
  };
  closing: {
    eyebrow: string;
    kicker: string[];
    line: string;
    outputs: string[];
    signoff: string;
  };
};

export const salesCopy: Record<ExamLang, SalesCopy> = {
  es: {
    problem: {
      eyebrow: "POR QUÉ NO VALE UN OMR GENÉRICO",
      title: "Un OMR genérico corrige hojas que no ha creado.",
      lead: "Tiene que detectar dónde está cada casilla y adivinar qué significa. Cada deducción es un error posible y una tarde de calibración.",
      beforeHead: "OMR genérico",
      afterHead: "Sistema de Exámenes PFU",
      rows: [
        {
          before: "Busca las casillas en cada hoja escaneada",
          after: "Sabe dónde está cada casilla porque la ha impreso",
        },
        {
          before: "Reserva y anulación configuradas a mano",
          after: "Cada casilla nace con su regla de corrección",
        },
        {
          before: "Recalibrar con cada plantilla nueva",
          after: "Se autocalibra con marcas de control en la hoja",
        },
        {
          before: "Nombre y DNI escritos a mano",
          after: "Identidad por QR, sin transcribir nada",
        },
      ],
      verdict:
        "La diferencia es una: PFU genera la hoja, y por eso puede corregirla sin adivinar.",
    },
    hardware: {
      eyebrow: "EL HARDWARE YA ESTÁ EN EL CENTRO",
      title: "El fi Series que ya conocen, ahora también corrige.",
      lead: "El profesor pulsa un botón en el escáner y el lote llega corregido a la aplicación. Sin ordenador en el aula.",
      chips: [
        { k: "Equipo", v: "fi-7300NX" },
        { k: "Captura", v: "PaperStream Capture Pro" },
        { k: "Un botón", v: "Job ANK_Examenes" },
        { k: "Calidad", v: "300 ppp · escala de grises" },
      ],
    },
    design: {
      eyebrow: "01  ·  DISEÑA EN MINUTOS",
      title: "Un formulario. La hoja sale lista para imprimir.",
      lead: "Preguntas, opciones, reserva, anulación. De ahí salen el PDF y el mapa exacto de cada casilla, en el mismo acto.",
      formTitle: "Generador de examen",
      fields: [
        { k: "Preguntas", v: "120" },
        { k: "Opciones", v: "A · B · C · D" },
        { k: "Multirrespuesta", v: "Sí" },
        { k: "Anulación", v: "Sí" },
        { k: "Reserva", v: "2" },
        { k: "Versión", v: "V001" },
      ],
      specTitle: "Especificación del examen",
      coordTitle: "Mapa de casillas",
      coordNote: "Posición en milímetros, fijada al generar",
      footnote: "Lo que se imprime y lo que se corrige es la misma hoja. No puede desincronizarse.",
    },
    identity: {
      eyebrow: "02  ·  ANONIMATO REAL",
      title: "El profesor corrige sin ver el nombre.",
      lead: "Cada hoja lleva un QR con un identificador aleatorio. Solo el sistema sabe de qué alumno es, y solo lo revela al cerrar las notas.",
      rosterTitle: "Grupo 2.º BACH · A",
      students: [
        "Alonso Vidal, Marta",
        "Bermúdez Ruiz, Iván",
        "Castaño Lara, Nuria",
        "Duarte Peña, Alejandro",
      ],
      tokenTitle: "ID de la hoja",
      tokenNote: "El QR no contiene nombre, DNI ni grupo.",
      badges: [
        "Corrección anónima",
        "Nada personal en el papel",
        "RGPD por diseño",
      ],
    },
    printScan: {
      eyebrow: "03  ·  IMPRIME Y ESCANEA",
      title: "Una clase entera corregida en una pasada.",
      lead: "Un PDF por alumno. Tras el examen, el lote entra por el alimentador y cada hoja llega ya identificada.",
      steps: [
        { n: "01", label: "Un PDF por alumno, con su QR" },
        { n: "02", label: "Reimpresión inmediata si hace falta" },
        { n: "03", label: "Escaneo en lote desde el fi-7300NX" },
      ],
      chips: [
        { k: "Lote", v: "120 hojas" },
        { k: "Reimpresión", v: "Nueva versión, nuevo QR" },
      ],
    },
    vision: {
      eyebrow: "04  ·  CORRIGE",
      title: "Mide la tinta de cada casilla. No adivina.",
      lead: "Seis pasos de visión, siempre iguales. La misma hoja, siempre la misma nota.",
      pipeline: [
        "QR",
        "Marcas de referencia",
        "Alineado",
        "Casillas",
        "Tinta",
        "Medición",
      ],
      meterLabel: "Relleno medido",
      marked: "Marcada",
      doubtful: "Dudosa",
      empty: "Vacía",
      verdict: "Solo lo dudoso pasa a revisión humana. El resto ya está corregido.",
    },
    closing: {
      eyebrow: "SISTEMA DE EXÁMENES  ·  PFU",
      kicker: ["Genera.", "Imprime.", "Escanea.", "Corrige."],
      line: "El profesor revisa solo lo dudoso. Todo lo demás ya está hecho.",
      outputs: ["Nota por alumno", "Copia certificada", "Envío por correo"],
      signoff: "Una solución completa sobre el escáner fi Series.",
    },
  },
  en: {
    problem: {
      eyebrow: "WHY GENERIC OMR IS NOT ENOUGH",
      title: "Generic OMR grades sheets it never created.",
      lead: "It has to detect where every box is and guess what it means. Every inference is a possible error and an afternoon of calibration.",
      beforeHead: "Generic OMR",
      afterHead: "PFU Exam System",
      rows: [
        {
          before: "Searches for boxes on every scanned sheet",
          after: "Knows where every box is because it printed it",
        },
        {
          before: "Reserve and void boxes configured by hand",
          after: "Every box is born with its grading rule",
        },
        {
          before: "Recalibrate with every new template",
          after: "Self-calibrates with control marks on the sheet",
        },
        {
          before: "Name and ID written by hand",
          after: "Identity by QR, nothing to transcribe",
        },
      ],
      verdict:
        "One difference: PFU generates the sheet, so it can grade it without guessing.",
    },
    hardware: {
      eyebrow: "THE HARDWARE IS ALREADY ON SITE",
      title: "The fi Series they already know, now grading exams.",
      lead: "The teacher presses one button on the scanner and the batch arrives graded in the app. No computer in the classroom.",
      chips: [
        { k: "Device", v: "fi-7300NX" },
        { k: "Capture", v: "PaperStream Capture Pro" },
        { k: "One button", v: "ANK_Examenes job" },
        { k: "Quality", v: "300 dpi · grayscale" },
      ],
    },
    design: {
      eyebrow: "01  ·  DESIGN IN MINUTES",
      title: "One form. A sheet ready to print.",
      lead: "Questions, options, reserve, void. From there come the PDF and the exact map of every box, in one act.",
      formTitle: "Exam generator",
      fields: [
        { k: "Questions", v: "120" },
        { k: "Options", v: "A · B · C · D" },
        { k: "Multi answer", v: "Yes" },
        { k: "Void box", v: "Yes" },
        { k: "Reserve", v: "2" },
        { k: "Version", v: "V001" },
      ],
      specTitle: "Exam specification",
      coordTitle: "Box map",
      coordNote: "Position in millimetres, fixed at generation",
      footnote: "What is printed and what is graded is the same sheet. It cannot drift apart.",
    },
    identity: {
      eyebrow: "02  ·  REAL ANONYMITY",
      title: "Teachers grade without seeing a name.",
      lead: "Every sheet carries a QR with a random identifier. Only the system knows which student it belongs to, and reveals it only when grades are closed.",
      rosterTitle: "Group 12th grade · A",
      students: [
        "Alonso Vidal, Marta",
        "Bermudez Ruiz, Ivan",
        "Castano Lara, Nuria",
        "Duarte Pena, Alejandro",
      ],
      tokenTitle: "Sheet ID",
      tokenNote: "The QR holds no name, ID or group.",
      badges: ["Anonymous grading", "Nothing personal on paper", "GDPR by design"],
    },
    printScan: {
      eyebrow: "03  ·  PRINT AND SCAN",
      title: "A whole class graded in a single pass.",
      lead: "One PDF per student. After the exam, the batch goes through the feeder and every sheet arrives already identified.",
      steps: [
        { n: "01", label: "One PDF per student, with its QR" },
        { n: "02", label: "Instant reprint when needed" },
        { n: "03", label: "Batch scan from the fi-7300NX" },
      ],
      chips: [
        { k: "Batch", v: "120 sheets" },
        { k: "Reprint", v: "New version, new QR" },
      ],
    },
    vision: {
      eyebrow: "04  ·  GRADE",
      title: "It measures the ink in every box. No guessing.",
      lead: "Six vision steps, always the same. Same sheet, same grade, every time.",
      pipeline: [
        "QR",
        "Reference marks",
        "Alignment",
        "Boxes",
        "Ink",
        "Measurement",
      ],
      meterLabel: "Measured fill",
      marked: "Marked",
      doubtful: "Doubtful",
      empty: "Empty",
      verdict: "Only doubtful boxes go to human review. Everything else is already graded.",
    },
    closing: {
      eyebrow: "EXAM SYSTEM  ·  PFU",
      kicker: ["Design.", "Print.", "Scan.", "Grade."],
      line: "Teachers review only what is doubtful. Everything else is done.",
      outputs: ["Grade per student", "Certified copy", "Sent by email"],
      signoff: "A complete solution on top of the fi Series scanner.",
    },
  },
};
