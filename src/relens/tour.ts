import { fit, union } from "./components/AppFrame";
import { PLATE_RECTS as R } from "./plates";
import type { TourConfig } from "./scenes/TourSlide";

const search = R["01-search"];
const picked = R["02-picked"];
const dossier = R["03-dossier"];
const timeline = R["05-timeline"];
const micro = R["06-micro"];
const partner = R["07-partner"];
const circle = R["08-circle"];
const portrait = R["09-portrait"];
const gaps = R["09b-gaps"];
const map = R["10-map"];
const mapNode = R["11-map-node"];

/** Encuadre ancho del área de trabajo: sin la barra lateral de expedientes. */
const WORK = { x: 300, y: 40, w: 1610 };

/**
 * Texto y coreografía del tour. Voz Annorak: directo, sin relleno.
 * Cada plano abre con lo que gana el club y la marca numerada lo prueba en la app.
 */
export const TOUR: Record<
  | "search"
  | "dossier"
  | "radar"
  | "circle"
  | "timeline"
  | "partner"
  | "portrait"
  | "map"
  | "mapNode",
  TourConfig
> = {
  search: {
    eyebrow: "01  ·  ABRIR EXPEDIENTE",
    title: "Basta con un nombre.",
    lead: "Relens arranca desde Transfermarkt y trabaja solo. Puedes cerrar la ventana.",
    points: [
      { n: 1, text: "Busca al jugador en Transfermarkt", at: 34 },
      { n: 2, text: "Avisa si ya existe su expediente", at: 74 },
      { n: 3, text: "Un clic en Comenzar", at: 150 },
    ],
    shots: [
      { plate: "01-search", from: 0, cams: [{ at: 0, x: 300, y: 70, w: 1080 }] },
      { plate: "02-picked", from: 120, cams: [{ at: 0, x: 300, y: 70, w: 1080 }] },
    ],
    marks: [
      { shot: 0, rect: search.input, at: 34, n: 1, spot: true },
      { shot: 0, rect: search.hit, at: 74, n: 2, spot: true },
      { shot: 1, rect: picked.exist, at: 132, n: 2, pad: 6 },
      { shot: 1, rect: picked.run, at: 150, n: 3, spot: true },
    ],
  },

  dossier: {
    eyebrow: "02  ·  EXPEDIENTE",
    title: "El jugador fuera del campo, en una pantalla.",
    points: [
      { n: 1, text: "Posición, Transfermarkt, Instagram y X", at: 34 },
      { n: 2, text: "188 hechos, 354 microhechos y 254 fuentes", at: 76 },
      { n: 3, text: "Las cuatro fases, completadas", at: 124 },
      { n: 4, text: "Las personas de su entorno, a un clic", at: 172 },
    ],
    shots: [
      {
        plate: "03-dossier",
        from: 0,
        cams: [
          { at: 0, ...WORK },
          { at: 60, ...fit(union(dossier.head, dossier.phases), 40) },
          { at: 150, ...fit(union(dossier.phases, dossier.contacts), 40) },
        ],
      },
    ],
    marks: [
      { shot: 0, rect: dossier.name, at: 34, n: 1, spot: true },
      { shot: 0, rect: dossier.stats, at: 76, n: 2, spot: true },
      { shot: 0, rect: dossier.phases, at: 124, n: 3, spot: true, pad: 4 },
      { shot: 0, rect: dossier.contacts, at: 172, n: 4, spot: true, pad: 6 },
    ],
  },

  radar: {
    eyebrow: "03  ·  VALORACIÓN",
    title: "Cuánto suma cada ámbito de su vida.",
    lead: "Ocho ejes, de familia a redes. 50 es neutro.",
    points: [
      { n: 1, text: "Radar con los ocho ámbitos", at: 34 },
      { n: 2, text: "Origen 73 y formación 69: suman", at: 84 },
      { n: 3, text: "Familia 34 y pareja 31: restan", at: 130 },
      { n: 4, text: "Y la lectura, en dos líneas", at: 180 },
    ],
    shots: [
      {
        plate: "03-dossier",
        from: 0,
        cams: [{ at: 0, x: 300, y: dossier.assessment.y - 24, w: 1110 }],
      },
    ],
    marks: [
      { shot: 0, rect: dossier.radar, at: 34, n: 1, spot: true, pad: 0 },
      { shot: 0, rect: union(dossier.origen, dossier.formacion), at: 84, n: 2, spot: true, pad: 2, badgeRight: true },
      { shot: 0, rect: dossier.familia, at: 130, n: 3, spot: true, pad: 2 },
      { shot: 0, rect: dossier.pareja, at: 130, pad: 2 },
      { shot: 0, rect: dossier.prose, at: 180, n: 4, spot: true },
    ],
  },

  circle: {
    eyebrow: "04  ·  CÍRCULO",
    title: "Las personas que importan, con nombre.",
    lead: "Cada una con su relación con el jugador y la fuente que la cita.",
    points: [
      { n: 1, text: "Familia y pareja identificadas", at: 34 },
      { n: 2, text: "Una ficha por persona del círculo", at: 150 },
      { n: 3, text: "Cada ficha abre su subexpediente", at: 196 },
    ],
    shots: [
      { plate: "03-dossier", from: 0, cams: [{ at: 0, x: 300, y: dossier.contacts.y - 330, w: 1100 }] },
      { plate: "08-circle", from: 130, cams: [{ at: 0, ...fit(union(circle.keyne, circle.ines), 50) }] },
    ],
    marks: [
      { shot: 0, rect: dossier.keyne, at: 34, n: 1, label: "Hermano" },
      { shot: 0, rect: dossier.ines, at: 52, label: "Pareja" },
      { shot: 0, rect: dossier.mounir, at: 70, label: "Padre" },
      { shot: 0, rect: dossier.sheila, at: 88, label: "Madre" },
      { shot: 1, rect: circle.grid, at: 150, n: 2, pad: 4 },
      { shot: 1, rect: circle.sheila, at: 196, n: 3, spot: true, pad: 4 },
    ],
  },

  timeline: {
    eyebrow: "05  ·  VIDA PERSONAL",
    title: "Su vida fuera del campo, hecho a hecho.",
    points: [
      { n: 1, text: "Categorías: familia, pareja, amigos, redes…", at: 34 },
      { n: 2, text: "Filtro por año", at: 76 },
      { n: 3, text: "Cada hecho, con fecha, fuente y fiabilidad", at: 118 },
      { n: 4, text: "Y desplegado en microhechos", at: 200 },
    ],
    shots: [
      {
        plate: "05-timeline",
        from: 0,
        cams: [{ at: 0, ...WORK }],
      },
      {
        plate: "06-micro",
        from: 176,
        cams: [{ at: 0, x: 310, y: micro.row.y - 20, w: 1200 }],
      },
    ],
    marks: [
      { shot: 0, rect: timeline.filters, at: 34, n: 1, spot: true, pad: 6 },
      { shot: 0, rect: timeline.year, at: 76, n: 2, spot: true, pad: 4 },
      { shot: 0, rect: timeline.first, at: 118, n: 3, spot: true, pad: 2 },
      { shot: 0, rect: timeline.firstWhen, at: 136, label: "Fecha  ·  confianza  ·  fiabilidad", pad: 6 },
      { shot: 1, rect: micro.kids, at: 200, n: 4, spot: true, pad: 6 },
    ],
  },

  partner: {
    eyebrow: "06  ·  BUSCAR",
    title: "Pregunta al expediente.",
    lead: "Un nombre, un handle o un tema. La timeline se queda con lo que lo menciona.",
    points: [
      { n: 1, text: "Buscador dentro del expediente", at: 34 },
      { n: 2, text: "Solo los hechos que la citan", at: 110 },
    ],
    shots: [
      {
        plate: "07-partner",
        from: 0,
        cams: [
          { at: 0, x: 780, y: 40, w: 1140 },
          { at: 60, x: 780, y: 40, w: 1140 },
          { at: 96, x: 300, y: 40, w: 1140 },
        ],
      },
    ],
    marks: [
      { shot: 0, rect: partner.search, at: 34, n: 1, spot: true, pad: 6 },
      { shot: 0, rect: partner.first, at: 110, n: 2, spot: true, pad: 4 },
    ],
  },

  portrait: {
    eyebrow: "07  ·  RETRATO",
    title: "Un retrato escrito solo con lo citado.",
    lead: "Relens redacta la biografía a partir de los hechos. Si no hay datos, lo dice.",
    points: [
      { n: 1, text: "Biografía redactada desde los hechos", at: 34 },
      { n: 2, text: "Sin datos, no inventa", at: 156 },
      { n: 3, text: "Cada ámbito, en su apartado", at: 200 },
    ],
    shots: [
      { plate: "09-portrait", from: 0, cams: [{ at: 0, x: 330, y: portrait.bio.y + 12, w: 774 }] },
      { plate: "09b-gaps", from: 130, cams: [{ at: 0, x: 330, y: gaps.formacionHead.y - 22, w: 774 }] },
    ],
    marks: [
      { shot: 0, rect: portrait.retrato, at: 34, n: 1, spot: true },
      { shot: 1, rect: gaps.formacion, at: 156, n: 2, spot: true },
      { shot: 1, rect: union(gaps.parejaHead, gaps.pareja), at: 200, n: 3 },
    ],
  },

  map: {
    eyebrow: "08  ·  MAPA",
    title: "Su círculo, dibujado.",
    lead: "Personas, cuentas, lugares y clubes. Cada línea es una relación con fuente.",
    points: [
      { n: 1, text: "Tipos de nodo, activables", at: 30 },
      { n: 2, text: "El jugador, en el centro", at: 120 },
      { n: 3, text: "Familia, pareja y club a su alrededor", at: 156 },
    ],
    shots: [
      {
        plate: "10-map",
        from: 0,
        cams: [
          { at: 0, x: 300, y: map.types.y - 44, w: 1610 },
          { at: 74, x: 300, y: map.types.y - 44, w: 1610 },
          { at: 110, ...fit(map.canvas, 10) },
        ],
      },
    ],
    marks: [
      { shot: 0, rect: map.types, at: 30, until: 72, n: 1, spot: true, pad: 6 },
      { shot: 0, rect: map.lamine, at: 120, n: 2, spot: true, pad: 10 },
      { shot: 0, rect: map.mounir, at: 156, label: "Padre", side: "top", pad: 6 },
      { shot: 0, rect: map.sheila, at: 170, label: "Madre", side: "top", pad: 6 },
      { shot: 0, rect: map.ines, at: 184, label: "Pareja", side: "top", pad: 6 },
      { shot: 0, rect: map.barcelona, at: 198, label: "Club", side: "top", pad: 6 },
    ],
  },

  mapNode: {
    eyebrow: "08  ·  MAPA",
    title: "Pulsa un nodo y aparece su ficha.",
    lead: "Relaciones, contacto en redes, hechos del expediente y referencias.",
    points: [
      { n: 1, text: "Sheila Ebana, la madre", at: 34 },
      { n: 2, text: "Sus relaciones, citadas", at: 80 },
      { n: 3, text: "Y de ahí, a su subexpediente", at: 150 },
    ],
    shots: [
      {
        plate: "11-map-node",
        from: 0,
        cams: [
          { at: 0, ...fit(mapNode.canvas, 10) },
          { at: 60, ...fit(union(mapNode.sheila, mapNode.card), 40) },
        ],
      },
    ],
    marks: [
      { shot: 0, rect: mapNode.sheila, at: 34, n: 1, spot: true, pad: 10 },
      { shot: 0, rect: mapNode.card, at: 80, n: 2, spot: true, pad: 2 },
    ],
  },
};
