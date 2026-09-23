// נתוני הטיול לפראג — מופרד לגמרי מקוד ה-UI.
// מידע עובדתי שלא סופק מסומן כ-Fact<T> עם status: "placeholder" ואינו מומצא.

import { googleMapsSearchUrl } from "@/lib/maps";

// --- ייצוג type-safe למידע שעשוי להיות חסר ---

export type Fact<T> =
  | { status: "known"; value: T }
  | { status: "placeholder"; note?: string };

export function known<T>(value: T): Fact<T> {
  return { status: "known", value };
}

export function placeholder<T>(note?: string): Fact<T> {
  return { status: "placeholder", note };
}

// --- מידע כללי על הטיול ---

export type HotelInfo = {
  name: string;
  address: string;
  mapsUrl?: string;
};

export type FlightInfo = {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
};

export type TripInfo = {
  destination: string;
  dates: { start: string; end: string };
  hotel: Fact<HotelInfo>;
  flights: {
    outbound: Fact<FlightInfo>;
    inbound: Fact<FlightInfo>;
  };
  currency: {
    local: string;
    notes?: Fact<string>;
  };
};

export const tripInfo: TripInfo = {
  destination: "פראג, צ'כיה",
  dates: { start: "2026-10-21", end: "2026-10-26" },
  hotel: placeholder("פרטי המלון טרם סופקו"),
  flights: {
    outbound: placeholder("פרטי טיסת ההלוך טרם סופקו"),
    inbound: placeholder("פרטי טיסת החזור טרם סופקו"),
  },
  currency: {
    local: "CZK",
    notes: placeholder("הערות המרה/שימוש בכרטיס אשראי טרם סופקו"),
  },
};

// --- מחירים ---

export type Price =
  | { status: "verified"; amount: number; currency: string }
  | { status: "estimated"; amount: number; currency: string }
  | { status: "placeholder" };

// --- מזג אוויר / אקלים ---

export type ClimateInfo = {
  avgHighC: number;
  avgLowC: number;
  rainNote: string;
};

export type WeatherInfo = Fact<ClimateInfo>;

// --- תוכן יומי ---

export type LocationRef = {
  name: string;
  mapsUrl?: string;
};

export type TimelineItemData = {
  time: string;
  title: string;
  description?: string;
  location?: LocationRef;
};

export type VisitDuration =
  | { type: "fixed"; minutes: number }
  | { type: "range"; min: number; max: number };

export type AttractionImage = {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl?: string;
  license?: string;
};

export type Attraction = {
  name: string;
  description: string;
  location?: LocationRef;
  openingHours?: Fact<string>;
  price?: Price;
  nameOriginal?: string;
  images?: AttractionImage[];
  wikipediaUrl?: string;
  arrivalTime?: string;
  visitDuration?: VisitDuration;
  highlights?: string;
  tip?: string;
  optional?: boolean;
  travelToNext?: TravelSegment;
};

export type TravelSegment = {
  from: string;
  to: string;
  mode: string;
  durationMinutes?: Fact<number>;
  mapsUrl?: string;
  price?: Price;
};

export type MealType = "ארוחת בוקר" | "ארוחת צהריים" | "ארוחת ערב" | "נשנוש";

export type Meal = {
  type: MealType;
  suggestion?: string;
  location?: LocationRef;
  price?: Price;
};

export type FreeTimeBlock = {
  title: string;
  description?: string;
};

export type RainPlanB = {
  description: string;
  alternativeAttractions?: Attraction[];
};

export type TripDay = {
  id: number;
  date: string;
  dayOfWeek: string;
  mainArea: Fact<string>;
  timeline: TimelineItemData[];
  attractions: Attraction[];
  meals: Meal[];
  travelSegments: TravelSegment[];
  weather: WeatherInfo;
  clothingTips: string[];
  freeTime: FreeTimeBlock[];
  rainPlanB: Fact<RainPlanB>;
  shortPlan?: {
    title: string;
    description: string;
  };
};

function hebrewWeekday(dateIso: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(dateIso));
}

function emptyDay(id: number, date: string): TripDay {
  return {
    id,
    date,
    dayOfWeek: hebrewWeekday(date),
    mainArea: placeholder("האזור המרכזי ליום זה טרם נקבע"),
    timeline: [],
    attractions: [],
    meals: [],
    travelSegments: [],
    weather: placeholder(
      "אין תחזית או מידע אקלימי מאומת — יתווסף מקור מהימן בהמשך, סמוך למועד הטיול"
    ),
    clothingTips: [],
    freeTime: [],
    rainPlanB: placeholder("תוכנית חלופית לגשם טרם נקבעה"),
  };
}

const day1: TripDay = {
  id: 1,
  date: "2026-10-21",
  dayOfWeek: hebrewWeekday("2026-10-21"),
  mainArea: known(
    "הגעה לפראג והיכרות ראשונה עם העיר – מרכז העיר ההיסטורי (כיכר ואצלב, העיר העתיקה, גשר קארל והאי קמפה). יום הגעה עם הליכה רגועה, בקצב קל עד בינוני."
  ),
  timeline: [
    {
      time: "10:30",
      title: "הגעה לפראג",
      description: "שעת ההגעה משוערת ותעודכן לאחר קבלת פרטי הטיסה.",
    },
    {
      time: "11:30–12:00",
      title: "הגעה למלון, השארת מזוודות / צ'ק-אין ומנוחה קצרה",
      description:
        "פרטי המלון וזמן ההגעה המדויק יעודכנו לאחר בחירת המלון.",
    },
    {
      time: "12:00–13:30",
      title: "ארוחת צהריים באזור המלון",
      description: "מסעדה מומלצת באזור תתווסף לאחר בחירת המלון.",
    },
    {
      time: "לאחר ארוחת הצהריים",
      title: "תחילת מסלול ההליכה במרכז העיר",
      description:
        "המסלול מתוכנן להתחיל ברגל, בהנחה שהמלון יהיה במיקום מרכזי. במידת הצורך נוסיף הסעה לנקודת ההתחלה לאחר בחירת המלון.",
    },
    {
      time: "גמיש, בסביבות כיכר העיר העתיקה",
      title: "הפסקת קפה / מנוחה",
      description:
        "הפסקה גמישה למנוחה, שתייה ושירותים בהתאם לקצב הקבוצה. מקום מתאים ייבחר במהלך המסלול.",
    },
    {
      time: "שעות אחר הצהריים המאוחרות / ערב",
      title: "חזרה למלון",
      description:
        "אופן החזרה וזמן הנסיעה יעודכנו לאחר בחירת המלון.",
    },
    {
      time: "ערב",
      title: "ארוחת ערב וזמן חופשי",
      description: "ארוחת ערב חופשית, בהתאם למיקום המלון ולהעדפת הקבוצה.",
    },
  ],
  attractions: [
    {
      name: "כיכר ואצלב",
      nameOriginal: "Wenceslas Square",
      wikipediaUrl: "https://he.wikipedia.org/wiki/כיכר_ואצלב",
      images: [
        {
          src: "/images/day1/wenceslas-square-1.jpg",
          alt: "כיכר ואצלב בפראג ביום שטוף שמש, עם בנייני הכיכר, עצים ואנשים מהלכים",
          credit: "Kawon Kez Sel",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Wenceslas_Square,_Prague,_August_2025.jpg",
        },
        {
          src: "/images/day1/wenceslas-square-2.jpg",
          alt: "מבט אווירי על כיכר ואצלב ופסל ואצלב הקדוש, עם הרחוב הראשי הנמשך לעבר טירת פראג באופק",
          credit: "Szombat78",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Wenceslas_square_Prague.jpg",
        },
      ],
      description:
        "אחת הכיכרות המרכזיות בפראג ואזור חשוב מבחינה היסטורית, עירונית ומסחרית.",
      highlights:
        "הליכה רגועה לאורך הכיכר, תצפית חיצונית על המוזיאון הלאומי, פסל ואצלב הקדוש והאווירה העירונית של האזור.",
      tip: "אין צורך להיכנס למוזיאון ביום הראשון. המטרה היא היכרות רגועה עם האזור.",
      optional: false,
      visitDuration: { type: "range", min: 30, max: 45 },
      location: {
        name: "Wenceslas Square",
        mapsUrl: googleMapsSearchUrl("Wenceslas Square, Prague"),
      },
      travelToNext: {
        from: "כיכר ואצלב",
        to: "פסאז' לוצרנה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "פסאז' לוצרנה",
      nameOriginal: "Lucerna Passage",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Lucerna_Palace",
      images: [
        {
          src: "/images/day1/lucerna-passage.jpg",
          alt: "פסל הסוס התלוי הפוך עם רוכבו מאת דויד סרני בפסאז' לוצרנה, מתחת לכיפת הזכוכית ההיסטורית",
          credit: "Txllxt TxllxT",
          license: "CC BY-SA 4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Praha_%27Lucerna%27_Passage_with_David_Cerny%27s_Wenceslav.jpg",
        },
      ],
      description: "פסאז' היסטורי ומוכר במרכז פראג.",
      highlights: "עצירה קצרה לצפייה בפסל הסוס ההפוך ובחלל הפנימי של הפסאז'.",
      optional: false,
      visitDuration: { type: "range", min: 10, max: 15 },
      location: {
        name: "Lucerna Passage",
        mapsUrl: googleMapsSearchUrl("Lucerna Passage, Prague"),
      },
      travelToNext: {
        from: "פסאז' לוצרנה",
        to: "מוסטק",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "מוסטק",
      nameOriginal: "Můstek",
      description:
        "אזור מעבר טבעי בין החלק התחתון של כיכר ואצלב לכיוון העיר העתיקה.",
      location: {
        name: "Můstek",
        mapsUrl: googleMapsSearchUrl("Můstek, Prague"),
      },
      travelToNext: {
        from: "מוסטק",
        to: "שוק האבל",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "שוק האבל",
      nameOriginal: "Havel Market",
      images: [
        {
          src: "/images/day1/havel-market.jpg",
          alt: "דוכני שוק האבל עם פרחים ומזכרות, ואנשים מטיילים בין הדוכנים",
          credit: "Perituss",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Havelsk%C3%A9_tr%C5%BEi%C5%A1t%C4%9B_2010_1.jpg",
        },
      ],
      description: "שוק קטן במרכז העיר העתיקה.",
      highlights: "מעבר קצר בין הדוכנים ללא קניות ממושכות.",
      tip: "זהו מעבר קצר בלבד. אם יש עיכוב או עייפות אפשר לדלג עליו.",
      optional: true,
      visitDuration: { type: "range", min: 5, max: 10 },
      location: {
        name: "Havel Market",
        mapsUrl: googleMapsSearchUrl("Havel Market, Prague"),
      },
      travelToNext: {
        from: "שוק האבל",
        to: "תיאטרון האחוזות וכיכר שוק הפירות",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "תיאטרון האחוזות וכיכר שוק הפירות",
      nameOriginal: "Estates Theatre & Ovocný trh",
      description: "מעבר קצר באזור היסטורי יפה ליד תיאטרון האחוזות.",
      highlights: "צפייה חיצונית בלבד והמשך הליכה.",
      tip: "אין כניסה למבנה ביום 1.",
      optional: true,
      visitDuration: { type: "range", min: 5, max: 10 },
      location: {
        name: "Estates Theatre",
        mapsUrl: googleMapsSearchUrl("Estates Theatre, Prague"),
      },
      travelToNext: {
        from: "תיאטרון האחוזות וכיכר שוק הפירות",
        to: "כיכר העיר העתיקה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "כיכר העיר העתיקה",
      nameOriginal: "Old Town Square",
      wikipediaUrl: "https://he.wikipedia.org/wiki/כיכר_העיר_העתיקה",
      images: [
        {
          src: "/images/day1/old-town-square-1.jpg",
          alt: "כיכר העיר העתיקה עם מגדל השעון האסטרונומי, כנסיית טין והמון מבקרים",
          credit: "Kawon Kez Sel",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Old_Town_Square,_Prague,_August_2025.jpg",
        },
        {
          src: "/images/day1/old-town-square-2.jpg",
          alt: "כיכר העיר העתיקה עם מגדל השעון, עמוד מריה וכנסיית סנט ניקולאס תחת שמיים כחולים",
          credit: "Mattsjc",
          license: "CC BY-SA 4.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Old_Town_Square_in_Prague.jpg",
        },
      ],
      description:
        "הלב ההיסטורי של העיר העתיקה ואחת התחנות המרכזיות ביום הראשון.",
      highlights:
        "השעון האסטרונומי, בית העירייה, כנסיית טין, חזיתות הבתים והאווירה של הכיכר.",
      tip: "אם השעה העגולה מתאימה באופן טבעי למסלול, אפשר לצפות במופע השעון. אין צורך למהר במיוחד כדי להגיע אליו.",
      optional: false,
      visitDuration: { type: "range", min: 45, max: 60 },
      location: {
        name: "Old Town Square",
        mapsUrl: googleMapsSearchUrl("Old Town Square, Prague"),
      },
      travelToNext: {
        from: "כיכר העיר העתיקה",
        to: "הכיכר הקטנה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "הכיכר הקטנה",
      nameOriginal: "Malé náměstí",
      description:
        "כיכר קטנה שחוצים בדרך בין כיכר העיר העתיקה לרחוב קרלובה, ללא עצירה מרכזית.",
      location: {
        name: "Malé náměstí",
        mapsUrl: googleMapsSearchUrl("Malé náměstí, Prague"),
      },
      travelToNext: {
        from: "הכיכר הקטנה",
        to: "רחוב קרלובה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "רחוב קרלובה",
      nameOriginal: "Karlova Street",
      description: "רחוב היסטורי המחבר את אזור העיר העתיקה לכיוון גשר קארל.",
      highlights: "הליכה לאורך הרחוב כחלק מהמסלול, ללא עצירה נפרדת ארוכה.",
      optional: false,
      location: {
        name: "Karlova Street",
        mapsUrl: googleMapsSearchUrl("Karlova Street, Prague"),
      },
      travelToNext: {
        from: "רחוב קרלובה",
        to: "הקלמנטינום",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "הקלמנטינום",
      nameOriginal: "Klementinum",
      description: "מעבר חיצוני ליד מתחם הקלמנטינום.",
      highlights: "צפייה חיצונית בלבד.",
      tip: "אין כניסה ביום הראשון. אם הקבוצה עייפה אפשר לעבור ישירות הלאה.",
      optional: true,
      location: {
        name: "Klementinum",
        mapsUrl: googleMapsSearchUrl("Klementinum, Prague"),
      },
      travelToNext: {
        from: "הקלמנטינום",
        to: "מגדל גשר העיר העתיקה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "מגדל גשר העיר העתיקה",
      nameOriginal: "Old Town Bridge Tower",
      description: "מגדל הכניסה ההיסטורי לגשר קארל מצד העיר העתיקה.",
      highlights: "צפייה חיצונית בלבד לפני העלייה לגשר.",
      tip: "אין עלייה למגדל ביום הראשון.",
      optional: false,
      location: {
        name: "Old Town Bridge Tower",
        mapsUrl: googleMapsSearchUrl("Old Town Bridge Tower, Prague"),
      },
      travelToNext: {
        from: "מגדל גשר העיר העתיקה",
        to: "גשר קארל",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "גשר קארל",
      nameOriginal: "Charles Bridge",
      wikipediaUrl: "https://he.wikipedia.org/wiki/גשר_קארל",
      images: [
        {
          src: "/images/day1/charles-bridge-1.jpg",
          alt: "גשר קארל בשעת שקיעה ערפילית, עם פסליו ופנסי הרחוב הקלאסיים",
          credit: "www.Pixel.la Free Stock Photos",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Charles_Bridge_in_Prague.jpg",
        },
        {
          src: "/images/day1/charles-bridge-2.jpg",
          alt: "מבט מגשר קארל על נהר הוולטאבה ובנייני העיר העתיקה",
          credit: "Stefano Vigorelli",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:View_of_Charles_Bridge,_Prague.jpg",
        },
      ],
      description: "אחד האתרים המזוהים ביותר עם פראג.",
      highlights:
        "חצייה רגועה של הגשר, תצפיות על נהר הוולטאבה, הפסלים, קו הרקיע של העיר וצילומים.",
      tip: "אין צורך למהר. הקצב כאן צריך להיות רגוע.",
      optional: false,
      visitDuration: { type: "range", min: 30, max: 40 },
      location: {
        name: "Charles Bridge",
        mapsUrl: googleMapsSearchUrl("Charles Bridge, Prague"),
      },
      travelToNext: {
        from: "גשר קארל",
        to: "האי קמפה",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "האי קמפה",
      nameOriginal: "Kampa Island",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Kampa_Island",
      images: [
        {
          src: "/images/day1/kampa-island.jpg",
          alt: "רחוב וכיכר קטנה באי קמפה עם בניינים צבעוניים ודוכן קטן בשוק",
          credit: "K. Martens",
          license: "Public Domain",
          sourceUrl: "https://commons.wikimedia.org/wiki/File:Kampa_Prague.JPG",
        },
      ],
      description:
        "אזור שקט וירוק יחסית ליד הנהר, מתאים למנוחה לאחר חציית הגשר.",
      highlights: "הליכה קצרה ליד הנהר והתעלה, תצפיות ומנוחה.",
      tip: "אין כניסה למוזיאון קמפה ביום הראשון.",
      optional: false,
      visitDuration: { type: "range", min: 25, max: 35 },
      location: {
        name: "Kampa Island",
        mapsUrl: googleMapsSearchUrl("Kampa Island, Prague"),
      },
      travelToNext: {
        from: "האי קמפה",
        to: "חומת לנון",
        mode: "הליכה",
        durationMinutes: placeholder("זמן הליכה מדויק לא נקבע"),
      },
    },
    {
      name: "חומת לנון",
      nameOriginal: "Lennon Wall",
      wikipediaUrl: "https://he.wikipedia.org/wiki/קיר_ג'ון_לנון",
      images: [
        {
          src: "/images/day1/lennon-wall.jpg",
          alt: "קיר חומת לנון הצבעוני בפראג, עם כיתובים וציורים בהשראת שלום וחירות",
          credit: "Neslihan Turan",
          license: "CC0 1.0",
          sourceUrl:
            "https://commons.wikimedia.org/wiki/File:Prague_John_Lennon_Wall.jpg",
        },
      ],
      description: "קיר צבעוני ומוכר המזוהה עם מסרים של חופש, שלום ומוזיקה.",
      highlights: "עצירה קצרה לצפייה, צילום והסבר קצר על המקום.",
      optional: false,
      visitDuration: { type: "range", min: 10, max: 15 },
      location: {
        name: "Lennon Wall",
        mapsUrl: googleMapsSearchUrl("Lennon Wall, Prague"),
      },
    },
  ],
  meals: [
    {
      type: "ארוחת צהריים",
      suggestion:
        "ארוחת צהריים באזור המלון. המלצה למסעדה תתווסף לאחר בחירת המלון.",
    },
    {
      type: "ארוחת ערב",
      suggestion: "ארוחת ערב חופשית, בהתאם למיקום המלון ולהעדפת הקבוצה.",
    },
  ],
  travelSegments: [],
  weather: placeholder("תחזית מדויקת תתווסף סמוך למועד הנסיעה."),
  clothingTips: [],
  freeTime: [
    {
      title: "זמן חופשי בערב",
      description: "לאחר החזרה למלון, בהתאם לרמת העייפות ולצרכי הקבוצה.",
    },
    {
      title: "גן הפרנציסקנים (Franciscan Garden) — אופציה בלבד",
      description:
        "לא חלק מהמסלול הראשי. רלוונטי רק אם יתברר שהמלון נמצא בקרבת מקום.",
    },
  ],
  rainPlanB: placeholder("תוכנית חלופית ליום גשום תתווסף בהמשך."),
  shortPlan: {
    title: "מסלול מקוצר במקרה של עייפות או עיכוב",
    description:
      "כיכר ואצלב → פסאז' לוצרנה → מעבר דרך מוסטק → כיכר העיר העתיקה. אם הקבוצה עייפה, הטיסה מתעכבת או נשאר פחות זמן מהמתוכנן, אפשר לסיים לאחר כיכר העיר העתיקה ולהעביר את גשר קארל, קמפה וחומת לנון ליום אחר.",
  },
};

export const tripDays: TripDay[] = [
  day1,
  emptyDay(2, "2026-10-22"),
  emptyDay(3, "2026-10-23"),
  emptyDay(4, "2026-10-24"),
  emptyDay(5, "2026-10-25"),
  emptyDay(6, "2026-10-26"),
];

export function getTripDay(id: number): TripDay | undefined {
  return tripDays.find((day) => day.id === id);
}
