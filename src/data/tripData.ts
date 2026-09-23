// נתוני הטיול המשפחתי לפראג — נתונים סטטיים בלבד, בלי שכבת נתונים חיצונית.
// זהו מודל נתונים לדוגמה (mock) המשקף את עיצוב ה-UI; יש להחליף בנתונים מדויקים
// (מחירים, שעות, כתובות) לפני הנסיעה בפועל.

export type IconType =
  | "flight"
  | "takeoff"
  | "landing"
  | "car"
  | "hotel"
  | "attraction"
  | "restaurant"
  | "shopping"
  | "park";

export type Currency = "EUR";

export interface Cost {
  amount: number;
  currency: Currency;
}

export interface Activity {
  /** שעה משוערת, לדוגמה "09:30" */
  time: string;
  title: string;
  iconType: IconType;
  description: string;
  /** התאמה לילדים — עגלה, שירותים, אורך שהייה מומלץ וכו' */
  childFriendlyNote: string;
  /** מידע על חניה ועלותה, או הערה אם אין צורך ברכב */
  parkingAndCost: string;
  cost?: Cost;
  /** קישור ניווט ב-Waze ליעד הפעילות, בפורמט https://waze.com/ul?ll=<lat>,<lon>&navigate=yes */
  wazeUrl?: string;
}

export interface MapRoute {
  totalKm: number;
  /** משך נסיעה/הליכה משוער, לדוגמה "45 דקות נסיעה" */
  totalDuration: string;
  /** רצף קואורדינטות [lat, lon] של תחנות היום, לפי סדר הביקור */
  coordinates: [number, number][];
}

/** תמצית יומית לכרטיסי המידע התחתונים במסך היום */
export interface DayInfoCards {
  parkingAndEntry: string;
  whereToEat: string;
  whereToShop: string;
  familyStrategy: string;
}

/** תמונת גלריה עם כיתוב שם האתר המקומי בעברית */
export interface DayImage {
  url: string;
  caption: string;
}

export interface DayItinerary {
  id: number;
  /** לדוגמה "21.10" */
  dateString: string;
  /** לדוגמה "ד'" */
  dayOfWeek: string;
  title: string;
  summary: string;
  /** שתי תמונות נוף להצגה בגלריה שבראש היום */
  images: DayImage[];
  mapRoute: MapRoute;
  activities: Activity[];
  infoCards: DayInfoCards;
}

export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "partly-cloudy";

export interface WeatherCell {
  tempMax: number;
  tempMin: number;
  rainChance: number;
  condition: WeatherCondition;
}

/** עמודת תאריך משותפת לכל שורות מטריצת מזג האוויר */
export interface WeatherMatrixDate {
  date: string;
  dayOfWeek: string;
  /** היעד המתוכנן לאותו יום בטיול, מוצג מתחת לתאריך בכותרת העמודה */
  destination: string;
}

export interface WeatherMatrixRow {
  location: string;
  /** מידע נוסף על המיקום (גובה, מרחק וכו') */
  meta?: string;
  /** תא אחד לכל תאריך ב-weatherMatrix.dates, באותו סדר */
  cells: WeatherCell[];
}

export interface WeatherMatrix {
  dates: WeatherMatrixDate[];
  rows: WeatherMatrixRow[];
}

/** פרטי המלון הקבוע של הטיול — מקור אמת יחיד, כדי שלא יופיע בשם שונה בכל מקום */
export interface HotelInfo {
  name: string;
  metroStation: string;
  metroLine: string;
}

export interface TripConfig {
  whatsappGroupUrl: string;
  totalBudget: Cost;
  /** תאריך תחילת הטיול, בפורמט ISO (YYYY-MM-DD) */
  startDate: string;
  hotel: HotelInfo;
}

export const tripConfig: TripConfig = {
  whatsappGroupUrl: "https://chat.whatsapp.com/BEfaUcG19GPDrlMJEqUOKR?s=cl&p=i&mlu=0&ilr=4",
  totalBudget: { amount: 1800, currency: "EUR" },
  startDate: "2026-10-21",
  hotel: {
    name: "Hotel DUO Prague",
    metroStation: "Střížkov",
    metroLine: "C",
  },
};

export const tripItinerary: DayItinerary[] = [
  {
    id: 1,
    dateString: "21.10",
    dayOfWeek: "ד'",
    title: "הגעה לפראג והתארגנות",
    summary:
      "טיסת בוקר מתל אביב (נתב\"ג) לפראג (PRG), הגעה למלון, צ'ק-אין ומנוחה קצרה. בהתאם לשעת הנחיתה — סיור היכרות ראשוני עם העיר: כיכר ואצלב, הרובע החדש והסביבה. ערב חופשי.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1730672356605-72b1c0b00b65?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "כיכר ואצלב והרובע החדש",
      },
      {
        url: "https://images.unsplash.com/photo-1660557989695-14fac79c086d?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "הלובי המפואר של Hotel DUO Prague",
      },
    ],
    mapRoute: {
      totalKm: 24,
      totalDuration: "45 דקות נסיעה ורכבת תחתית",
      coordinates: [
        [50.1008, 14.2632],
        [50.1147, 14.4931],
        [50.081, 14.4266],
      ],
    },
    activities: [
      {
        time: "08:30",
        title: "טיסה מתל אביב לפראג",
        iconType: "flight",
        description:
          "טיסת בוקר מנמל התעופה בן-גוריון לפראג (PRG), משך טיסה של כשלוש שעות וחצי.",
        childFriendlyNote:
          "כדאי להצטייד במטען נייד טעון, אוזניות ופעילויות שקטות לילדים לזמן הטיסה.",
        parkingAndCost: "לא רלוונטי — טרם איספנו רכב.",
      },
      {
        time: "12:30",
        title: `צ'ק-אין ב-${tripConfig.hotel.name}`,
        iconType: "hotel",
        description: `הגעה ל-${tripConfig.hotel.name}, צ'ק-אין, סידור החדר והשארת המזוודות, ומנוחה קצרה לפני היציאה לסיור הראשון בעיר.`,
        childFriendlyNote: `המלון ממוקם בסמיכות לתחנת הרכבת התחתית ${tripConfig.hotel.metroStation} (קו ${tripConfig.hotel.metroLine}), כך שהגישה למרכז העיר קלה ומהירה. יש במלון בריכה פנימית וחדר כושר — אופציה נעימה למנוחה משפחתית בערב אחרי יום הליכות.`,
        parkingAndCost: `חניה חינם לאורחי ${tripConfig.hotel.name}, בחניון הפרטי של המלון.`,
      },
      {
        time: "15:30",
        title: "סיור היכרות בכיכר ואצלב והרובע החדש",
        iconType: "attraction",
        description: `רכיבה קצרה ברכבת התחתית (קו ${tripConfig.hotel.metroLine}) מתחנת ${tripConfig.hotel.metroStation} הסמוכה למלון אל מרכז העיר, וסיור היכרות קליל בכיכר ואצלב ובסביבת הרובע החדש.`,
        childFriendlyNote:
          "קצב איטי ובלי כניסות לאתרים — מטרת הסיור היא רק להתרשם ולהתמצא בעיר לפני הימים העמוסים יותר.",
        parkingAndCost: `אין צורך ברכב — נסיעה ברכבת התחתית (קו ${tripConfig.hotel.metroLine}) מתחנת ${tripConfig.hotel.metroStation}, כ-15 דקות עד מרכז העיר.`,
      },
      {
        time: "19:00",
        title: "ארוחת ערב וזמן חופשי",
        iconType: "restaurant",
        description: `ערב חופשי — ארוחת ערב במסעדה משפחתית באזור ${tripConfig.hotel.name}, לסיום יום ההגעה.`,
        childFriendlyNote: "יש כיסאות תינוק ותפריטי ילדים ברוב המסעדות באזור.",
        parkingAndCost: `ללא צורך בנסיעה — בהליכה מ-${tripConfig.hotel.name}.`,
        cost: { amount: 50, currency: "EUR" },
      },
    ],
    infoCards: {
      parkingAndEntry: `חניה חינם לאורחי ${tripConfig.hotel.name}. אין כרטיסי כניסה ביום ההגעה — הגעה קלה למרכז העיר ברכבת התחתית (קו ${tripConfig.hotel.metroLine}) מתחנת ${tripConfig.hotel.metroStation} הסמוכה למלון.`,
      whereToEat: `ארוחת ערב ראשונה במסעדה משפחתית באזור ${tripConfig.hotel.name}, בהתאם לשעת ההגעה ולעייפות אחרי הטיסה.`,
      whereToShop:
        "אין תוכנית קניות מיוחדת היום — רק הצצה בחלונות הראווה בדרך לכיכר ואצלב.",
      familyStrategy:
        "יום ההגעה מתוכנן בקצב איטי בכוונה, וגמיש לפי שעת הנחיתה בפועל: הליכה קצרה בלבד ובלי כניסות לאתרים, כדי לתת לילדים (ולהורים) להתאושש מהטיסה.",
    },
  },
  {
    id: 2,
    dateString: "22.10",
    dayOfWeek: "ה'",
    title: "מצודת פראג והרובע היהודי",
    summary:
      "ביקור במצודת פראג המרשימה — הקתדרלה, הארמון ההיסטורי והסמטאות הציוריות. אחר הצהריים, סיור ברובע היהודי: בתי הכנסת, בית העלמין העתיק והסיפורים המרתקים של השכונה.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1616038242814-a6eac7845d88?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "מצודת פראג המרכזית",
      },
      {
        url: "https://images.unsplash.com/photo-1751972489693-683244bfd2dc?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "בית הכנסת הישן-חדש ברובע היהודי",
      },
    ],
    mapRoute: {
      totalKm: 14,
      totalDuration: "35 דקות נסיעה",
      coordinates: [
        [50.1147, 14.4931],
        [50.091, 14.4016],
        [50.0906, 14.4184],
      ],
    },
    activities: [
      {
        time: "09:00",
        title: "נסיעה למצודת פראג",
        iconType: "car",
        description: "נסיעה קצרה ברכב לאזור מצודת פראג, מעל הנהר.",
        childFriendlyNote: "כדאי לצאת מוקדם כדי להימנע מתורים ומעומס בצהריים.",
        parkingAndCost: "חניון סמוך למצודה, כ-2 € לשעה.",
        cost: { amount: 2, currency: "EUR" },
        wazeUrl: "https://waze.com/ul?ll=50.0910,14.4016&navigate=yes",
      },
      {
        time: "09:45",
        title: "סיור במצודת פראג",
        iconType: "attraction",
        description:
          "סיור בחצרות המצודה, קתדרלת סנט ויטוס מבחוץ וטקס חילופי המשמר.",
        childFriendlyNote:
          "טקס חילופי המשמר מרשים לילדים; מומלץ לתכנן הפסקות ישיבה כל 30–40 דקות.",
        parkingAndCost: "כרטיס כניסה משפחתי למתחם החצרות והקתדרלה.",
        cost: { amount: 22, currency: "EUR" },
      },
      {
        time: "13:00",
        title: "ארוחת צהריים באזור מלה סטרנה",
        iconType: "restaurant",
        description:
          "הפסקת צהריים במסעדה עם ישיבה בחוץ ונוף לעיר, בדרך מהמצודה לרובע היהודי.",
        childFriendlyNote:
          "תפריט ילדים זמין, ויש מקום פנוי להליכה חופשית סביב השולחנות.",
        parkingAndCost: "ללא חניה נוספת — בהמשך המסלול הרגלי.",
        cost: { amount: 45, currency: "EUR" },
      },
      {
        time: "14:30",
        title: "סיור ברובע היהודי",
        iconType: "attraction",
        description:
          "ביקור בבתי הכנסת ההיסטוריים ובבית העלמין היהודי העתיק, וסיפור קורות הקהילה היהודית בפראג.",
        childFriendlyNote:
          "הסיור כולל הליכה ועמידה ממושכת יחסית — מומלץ עגלה לילדים הקטנים ותכנון הפסקות.",
        parkingAndCost: "כרטיס כניסה משפחתי משולב לאתרי הרובע.",
        cost: { amount: 48, currency: "EUR" },
      },
    ],
    infoCards: {
      parkingAndEntry:
        "חניון סמוך למצודת פראג (כ-2 € לשעה). כרטיס כניסה משפחתי למצודה כ-22 €, וכרטיס משולב לרובע היהודי כ-48 €.",
      whereToEat:
        "ארוחת צהריים במסעדה עם ישיבה בחוץ באזור מלה סטרנה, בדרך מהמצודה לרובע היהודי.",
      whereToShop:
        "אין תוכנית קניות מיוחדת היום — הדגש הוא על ההיסטוריה של המצודה והרובע היהודי.",
      familyStrategy:
        "מתזמנים את ביקור המצודה לשעות הבוקר המוקדמות כדי להימנע מתורים, ומפצלים את הרובע היהודי לשעות אחר הצהריים כשהילדים כבר התחממו להליכה.",
    },
  },
  {
    id: 3,
    dateString: "23.10",
    dayOfWeek: "ו'",
    title: "העיר העתיקה, גשר קארל וגבעת פטרין",
    summary:
      "מכירים את הלב של פראג: כיכר העיר העתיקה, השעון האסטרונומי וסמטאות ציוריות, חציית גשר קארל והאי קמפא, ולבסוף עלייה לגבעת פטרין לתצפית מרהיבה על העיר.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600623471616-8c1966c91ff6?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "גשר קארל ההיסטורי בשקיעה",
      },
      {
        url: "https://images.unsplash.com/photo-1553713822-6b472e98ef99?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "השעון האסטרונומי בכיכר העיר העתיקה",
      },
    ],
    mapRoute: {
      totalKm: 9,
      totalDuration: "כ-2 שעות הליכה ונסיעה קצרה ברכבת התחתית",
      coordinates: [
        [50.1147, 14.4931],
        [50.087, 14.4207],
        [50.0865, 14.4114],
        [50.0836, 14.3953],
      ],
    },
    activities: [
      {
        time: "09:30",
        title: "כיכר העיר העתיקה והשעון האסטרונומי",
        iconType: "attraction",
        description:
          "סיור בכיכר העיר העתיקה, כולל צפייה במופע השעון האסטרונומי בשעה עגולה.",
        childFriendlyNote:
          "אם השעה העגולה מתאימה למסלול, המופע בשעון תופס את תשומת הלב של הילדים בקלות.",
        parkingAndCost: `אין צורך ברכב — נסיעה ברכבת התחתית (קו ${tripConfig.hotel.metroLine}) מתחנת ${tripConfig.hotel.metroStation} הסמוכה למלון, ומשם הליכה קצרה לכיכר.`,
      },
      {
        time: "12:00",
        title: "ארוחת צהריים בסמטאות העיר העתיקה",
        iconType: "restaurant",
        description:
          "עצירה לארוחת צהריים באחת הסמטאות הציוריות סביב הכיכר.",
        childFriendlyNote: "יש מסעדות עם תפריט ילדים ומקום ישיבה חיצוני.",
        parkingAndCost: "ללא חניה — בהמשך המסלול הרגלי.",
        cost: { amount: 42, currency: "EUR" },
      },
      {
        time: "13:30",
        title: "חציית גשר קארל והאי קמפא",
        iconType: "attraction",
        description:
          "הליכה רגועה על גשר קארל, צפייה בפסלים ובאמני הרחוב, והמשך לזמן מנוחה באי קמפא.",
        childFriendlyNote:
          "הגשר עמוס בשעות הצהריים — מומלץ להחזיק ידיים ולהשתמש ברצועת עגלה למי שקטן.",
        parkingAndCost: "אין צורך ברכב — מסלול הליכה.",
      },
      {
        time: "15:30",
        title: "רכבל עולה לגבעת פטרין ותצפית",
        iconType: "attraction",
        description:
          "עלייה ברכבל ההררי לגבעת פטרין, ותצפית מרהיבה על גגות פראג ממגדל התצפית שבפסגה.",
        childFriendlyNote:
          "הרכבל עצמו הוא כבר אטרקציה בעיני הילדים; אפשר לשלב עצירה בגן המבוך שלצדו.",
        parkingAndCost: "כרטיס תחבורה ציבורית משולב לרכבל, לפי תעריף משפחתי.",
        cost: { amount: 12, currency: "EUR" },
      },
    ],
    infoCards: {
      parkingAndEntry:
        "כל האתרים היום נגישים ברגל — כיכר העיר העתיקה, גשר קארל והאי קמפא ללא עלות כניסה. הרכבל לגבעת פטרין כלול בכרטיס התחבורה הציבורית, כ-12 € למשפחה.",
      whereToEat:
        "ארוחת צהריים באחת הסמטאות סביב כיכר העיר העתיקה, בדרך אל גשר קארל.",
      whereToShop:
        "סמטאות העיר העתיקה עמוסות בחנויות מזכרות ואמנות רחוב — הצצה בלבד, קניות עיקריות שמורות ליום אחר.",
      familyStrategy:
        "יום הליכה ברגל לגמרי, בלי צורך ברכב: מתחילים בבוקר בכיכר לפני העומס, וממשיכים בקצב חופשי דרך הגשר ועד לתצפית בגבעת פטרין.",
    },
  },
  {
    id: 4,
    dateString: "24.10",
    dayOfWeek: "ש'",
    title: "קוטנה הורה, קפלת העצמות וקרלשטיין",
    summary:
      'יום טיול מחוץ לעיר: קוטנה הורה עם קפלת העצמות הייחודית בסדלץ, טירת קרלשטיין המרשימה, ותצפית קצרה במחצבת "אמריקה הגדולה" (Velká Amerika) עם נוף עוצר נשימה.',
    images: [
      {
        url: "https://images.unsplash.com/photo-1722950830191-1a72b0406803?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "טירת קרלשטיין הציורית",
      },
      {
        url: "https://images.unsplash.com/photo-1781783591287-cbcf06ad7d2f?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "מחצבת אמריקה הגדולה",
      },
    ],
    mapRoute: {
      totalKm: 185,
      totalDuration: "כ-3 שעות נהיגה",
      coordinates: [
        [50.1147, 14.4931],
        [49.9502, 15.2739],
        [49.9391, 14.1879],
        [49.9613, 14.1144],
      ],
    },
    activities: [
      {
        time: "08:00",
        title: "יציאה מפראג לכיוון קוטנה הורה",
        iconType: "car",
        description:
          "נסיעה של כשעה ורבע לעיר ההיסטורית קוטנה הורה, מזרחית לפראג.",
        childFriendlyNote:
          "כדאי לצאת עם ארוחת בוקר וחטיפים ברכב — זהו יום עם נסיעות ארוכות יחסית.",
        parkingAndCost: "חניון ציבורי בעיר, כ-3 € ליום.",
        cost: { amount: 3, currency: "EUR" },
        wazeUrl: "https://waze.com/ul?ll=49.9502,15.2739&navigate=yes",
      },
      {
        time: "09:15",
        title: "קפלת העצמות בסדלץ וסיור בקוטנה הורה",
        iconType: "attraction",
        description:
          "ביקור בקפלת העצמות המפורסמת בסדלץ, מעוטרת בעצמות אדם, והמשך לסיור קצר במרכז ההיסטורי של קוטנה הורה.",
        childFriendlyNote:
          "המקום מיוחד ולא שגרתי — מומלץ להכין את הילדים מראש בסיפור קצר על המקום, ולשקול מראש אם מתאים לגיל שלהם.",
        parkingAndCost: "כרטיס כניסה משפחתי לקפלת העצמות.",
        cost: { amount: 38, currency: "EUR" },
      },
      {
        time: "12:30",
        title: "ארוחת צהריים בדרך לטירת קרלשטיין",
        iconType: "restaurant",
        description:
          "עצירה לארוחת צהריים באזור כפרי בדרך לטירת קרלשטיין.",
        childFriendlyNote:
          "מקומות ישיבה מרווחים ותפריט פשוט וידידותי לילדים.",
        parkingAndCost: "כלול בחניית העצירה, ללא תשלום נוסף.",
        cost: { amount: 46, currency: "EUR" },
      },
      {
        time: "14:30",
        title: 'טירת קרלשטיין ותצפית באמריקה הגדולה',
        iconType: "attraction",
        description:
          'סיור בטירת קרלשטיין המרשימה על הגבעה, ולסיום נסיעה קצרה לתצפית במחצבת "אמריקה הגדולה" — בור מחצבה עמוק וצבעוני המכונה "הגרנד קניון הצ\'כי".',
        childFriendlyNote:
          "הטירה כוללת עלייה מדורגת מהחניה — לתכנן זמן לילדים קטנים. התצפית במחצבה היא עצירת צילום קצרה וללא הליכה מאומצת.",
        parkingAndCost: "כרטיס כניסה משפחתי לטירה; התצפית במחצבה חופשית.",
        cost: { amount: 42, currency: "EUR" },
        wazeUrl: "https://waze.com/ul?ll=49.9391,14.1879&navigate=yes",
      },
    ],
    infoCards: {
      parkingAndEntry:
        'חניון ציבורי בקוטנה הורה (כ-3 € ליום). כרטיס כניסה משפחתי לקפלת העצמות כ-38 €, וכרטיס לטירת קרלשטיין כ-42 €. התצפית במחצבת "אמריקה הגדולה" חופשית.',
      whereToEat:
        "עצירת צהריים באזור כפרי בדרך בין קוטנה הורה לקרלשטיין — לא צמודה ללוח זמנים קשיח.",
      whereToShop:
        "דוכני מזכרות קטנים בסמוך לטירת קרלשטיין; אין תוכנית קניות מיוחדת נוספת היום.",
      familyStrategy:
        "היום הארוך ביותר בנסיעות בטיול — מתחילים מוקדם, ומחלקים אותו לשלוש תחנות ברורות (קפלת העצמות, ארוחת צהריים, קרלשטיין) כדי לשמור על מרווחי מנוחה לילדים בין נסיעה לנסיעה.",
    },
  },
  {
    id: 5,
    dateString: "25.10",
    dayOfWeek: "א'",
    title: "מלאדה בולסלב וגן העדן הבוהמי",
    summary:
      "ביקור במלאדה בולסלב – עיר הרכב סקודה, ולאחריו המשך לאזור גן העדן הבוהמי: טבע מרהיב, תצורות סלעים ייחודיות, אגמים ומסלולי הליכה קלים. בסיום היום, חזרה לפראג ולמלון.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1786907186603-75283f467051?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "סלעי ענק בגן העדן הבוהמי",
      },
      {
        url: "https://images.unsplash.com/photo-1723815264336-25f3d0200a48?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "מוזיאון הרכב של סקודה",
      },
    ],
    mapRoute: {
      totalKm: 195,
      totalDuration: "כ-3 שעות נהיגה",
      coordinates: [
        [50.1147, 14.4931],
        [50.4128, 14.906],
        [50.5386, 15.2069],
      ],
    },
    activities: [
      {
        time: "08:30",
        title: "נסיעה למלאדה בולסלב",
        iconType: "car",
        description:
          "נסיעה של כ-50 דקות צפונית לפראג, לעיר הבית של יצרנית הרכב סקודה.",
        childFriendlyNote:
          "נסיעה נעימה יחסית — כדאי לנצל אותה למשחקי דרך עם הילדים.",
        parkingAndCost: "חניון מוזיאון סקודה, כ-3 € ליום.",
        cost: { amount: 3, currency: "EUR" },
        wazeUrl: "https://waze.com/ul?ll=50.4128,14.9060&navigate=yes",
      },
      {
        time: "09:30",
        title: "מוזיאון סקודה במלאדה בולסלב",
        iconType: "attraction",
        description:
          "סיור במוזיאון הרכב של סקודה — רכבים היסטוריים, אולם תצוגה אינטראקטיבי וסימולטור נהיגה לילדים.",
        childFriendlyNote:
          "יש אזור סימולטורים ומשחקים שממש אהוב על ילדים חובבי רכבים.",
        parkingAndCost: "כרטיס כניסה משפחתי.",
        cost: { amount: 16, currency: "EUR" },
      },
      {
        time: "12:00",
        title: "נסיעה וארוחת צהריים בדרך לגן העדן הבוהמי",
        iconType: "restaurant",
        description:
          "המשך נסיעה לאזור גן העדן הבוהמי, עם עצירה לארוחת צהריים בדרך.",
        childFriendlyNote:
          "מומלץ לעצור במסעדה עם חצר או גינה כדי לתת לילדים לרוץ קצת לפני ההליכה בטבע.",
        parkingAndCost: "כלול בחניית העצירה, ללא תשלום נוסף.",
        cost: { amount: 40, currency: "EUR" },
      },
      {
        time: "13:30",
        title: "הליכה קלה בגן העדן הבוהמי",
        iconType: "park",
        description:
          "מסלול הליכה קליל בין תצורות סלעים ייחודיות ואגמים קטנים בשמורת הטבע, ולסיום היום נסיעה חזרה לפראג.",
        childFriendlyNote:
          "המסלולים הקלים מתאימים לעגלת טיולים; מומלץ נעליים נוחות ובקבוקי מים.",
        parkingAndCost: "כניסה חופשית לשמורת הטבע; חניון קטן במקום, כ-2 € ליום.",
        cost: { amount: 2, currency: "EUR" },
        wazeUrl: "https://waze.com/ul?ll=50.5386,15.2069&navigate=yes",
      },
    ],
    infoCards: {
      parkingAndEntry:
        "חניון מוזיאון סקודה במלאדה בולסלב (כ-3 € ליום). כרטיס כניסה משפחתי למוזיאון כ-16 €. שמורת גן העדן הבוהמי חופשית לכניסה, עם חניון קטן במקום (כ-2 € ליום).",
      whereToEat:
        "עצירת צהריים בדרך בין מלאדה בולסלב לגן העדן הבוהמי — מומלץ מקום עם חצר לילדים.",
      whereToShop:
        "חנות המזכרות של מוזיאון סקודה — בעיקר דגמי רכב מיניאטוריים; אין תוכנית קניות נוספת.",
      familyStrategy:
        "יום שמשלב תרבות (מוזיאון הרכב) וטבע (שמורת הסלעים) בקצב איטי, עם דגש על הליכה קלה ומרווחת ולא על מרחקים ארוכים ברגל.",
    },
  },
  {
    id: 6,
    dateString: "26.10",
    dayOfWeek: "ב'",
    title: "התארגנות במלון וחזרה הביתה",
    summary:
      "צ'ק-אאוט מהמלון בהתאם לשעת הטיסה, זמן חופשי עד היציאה לשדה התעופה והחזרת הרכב השכור. טיסה חזרה לישראל.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1561131668-f63504fc549d?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "אולם היציאה בנמל התעופה של פראג",
      },
      {
        url: "https://images.unsplash.com/photo-1778221658036-66664d57d594?auto=format&fit=crop&w=1600&h=1000&q=80",
        caption: "מבט פרידה על גגות פראג בשקיעה",
      },
    ],
    mapRoute: {
      totalKm: 17,
      totalDuration: "20 דקות נסיעה",
      coordinates: [
        [50.1147, 14.4931],
        [50.1008, 14.2632],
      ],
    },
    activities: [
      {
        time: "09:00",
        title: `צ'ק-אאוט מ-${tripConfig.hotel.name} ואחסון מזוודות`,
        iconType: "hotel",
        description: `פינוי החדר ב-${tripConfig.hotel.name}, ואחסון המזוודות בשמירת המלון עד היציאה לנמל התעופה, בהתאם לשעת הטיסה.`,
        childFriendlyNote:
          "לבקש מצוות המלון פינת המתנה עם צעצועים אם קיימת, למקרה שנשאר זמן המתנה לפני היציאה.",
        parkingAndCost: "אין תשלום נוסף — אחסון המזוודות כלול בשהות.",
      },
      {
        time: "09:30",
        title: "זמן חופשי אחרון באזור המלון",
        iconType: "shopping",
        description: `זמן חופשי לפי שעת הטיסה — הליכה קלה וקניות אחרונות באזור ${tripConfig.hotel.name}.`,
        childFriendlyNote: "מומלץ לקנות ממתקי שוקולד צ'כיים כמתנות אחרונות.",
        parkingAndCost: `אין צורך ברכב — בהליכה מ-${tripConfig.hotel.name}.`,
        cost: { amount: 20, currency: "EUR" },
      },
      {
        time: "12:00",
        title: "נסיעה לשדה התעופה והחזרת הרכב השכור",
        iconType: "car",
        description:
          "נסיעה לנמל התעופה והחזרת הרכב המשפחתי בדלפק ההשכרה.",
        childFriendlyNote:
          "כדאי לבדוק שלא נשארו צעצועים או ציוד ילדים ברכב לפני ההחזרה.",
        parkingAndCost: "כלול בעלות ההשכרה, אין תשלום נוסף.",
        wazeUrl: "https://waze.com/ul?ll=50.1008,14.2632&navigate=yes",
      },
      {
        time: "15:45",
        title: "טיסת חזרה לישראל",
        iconType: "flight",
        description: "טיסת אחר הצהריים חזרה לנתב\"ג, בסיום הטיול.",
        childFriendlyNote:
          "כדאי להגיע לפחות שעתיים מראש עם ילדים, ולהצטייד בחטיפים ומטען נייד לזמן ההמתנה.",
        parkingAndCost: "לא רלוונטי — הרכב כבר הוחזר.",
      },
    ],
    infoCards: {
      parkingAndEntry:
        "אין תשלום חניה נוסף — הרכב מוחזר ישירות בנמל התעופה במסגרת עלות ההשכרה.",
      whereToEat:
        "רק נשנוש קל בדרך או בנמל התעופה; אין ארוחה מתוכננת כדי לא להתעכב לפני הטיסה.",
      whereToShop:
        "זמן קניות אחרון וקצר באזור המלון, בעיקר ממתקים ומזכרות אחרונות.",
      familyStrategy:
        "יום העזיבה בנוי סביב שוליים גדולים של זמן: צ'ק-אאוט מוקדם, זמן חופשי קצר בלבד לפי שעת הטיסה, והגעה לנמל התעופה לפחות שעתיים לפני הטיסה כדי להימנע מלחץ עם ילדים.",
    },
  },
];

// מטריצת השוואת מזג אוויר — אקלים עונתי ממוצע לאוקטובר לפי אזור, לא תחזית מאומתת.
export const weatherMatrix: WeatherMatrix = {
  dates: [
    { date: "21.10", dayOfWeek: "ד'", destination: "הגעה ומרכז העיר" },
    { date: "22.10", dayOfWeek: "ה'", destination: "מצודת פראג" },
    { date: "23.10", dayOfWeek: "ו'", destination: "עיר עתיקה וגשר קארל" },
    { date: "24.10", dayOfWeek: "ש'", destination: "קוטנה הורה / קרלשטיין" },
    { date: "25.10", dayOfWeek: "א'", destination: "מלאדה בולסלב / גן העדן" },
    { date: "26.10", dayOfWeek: "ב'", destination: "טיסה הביתה" },
  ],
  rows: [
    {
      location: "העיר העתיקה פראג",
      meta: "כ-200 מ' מעל פני הים",
      cells: [
        { tempMax: 14, tempMin: 7, rainChance: 10, condition: "sunny" },
        { tempMax: 12, tempMin: 5, rainChance: 30, condition: "partly-cloudy" },
        { tempMax: 15, tempMin: 8, rainChance: 5, condition: "sunny" },
        { tempMax: 11, tempMin: 4, rainChance: 45, condition: "cloudy" },
        { tempMax: 12, tempMin: 5, rainChance: 25, condition: "partly-cloudy" },
        { tempMax: 14, tempMin: 7, rainChance: 10, condition: "sunny" },
      ],
    },
    {
      location: "מצודת פראג והסביבה",
      meta: "כ-270 מ', חשוף לרוח",
      cells: [
        { tempMax: 13, tempMin: 6, rainChance: 15, condition: "partly-cloudy" },
        { tempMax: 11, tempMin: 4, rainChance: 40, condition: "cloudy" },
        { tempMax: 14, tempMin: 7, rainChance: 10, condition: "sunny" },
        { tempMax: 10, tempMin: 3, rainChance: 50, condition: "rainy" },
        { tempMax: 11, tempMin: 4, rainChance: 30, condition: "partly-cloudy" },
        { tempMax: 13, tempMin: 6, rainChance: 15, condition: "partly-cloudy" },
      ],
    },
    {
      location: "קוטנה הורה / קרלשטיין",
      meta: "כ-40–50 ק\"מ מפראג",
      cells: [
        { tempMax: 12, tempMin: 5, rainChance: 20, condition: "partly-cloudy" },
        { tempMax: 10, tempMin: 3, rainChance: 45, condition: "cloudy" },
        { tempMax: 13, tempMin: 6, rainChance: 15, condition: "partly-cloudy" },
        { tempMax: 9, tempMin: 2, rainChance: 55, condition: "rainy" },
        { tempMax: 10, tempMin: 3, rainChance: 35, condition: "cloudy" },
        { tempMax: 12, tempMin: 5, rainChance: 20, condition: "partly-cloudy" },
      ],
    },
    {
      location: "גן העדן הבוהמי (Turnov)",
      meta: "כ-400 מ', אזור יערי",
      cells: [
        { tempMax: 10, tempMin: 4, rainChance: 25, condition: "partly-cloudy" },
        { tempMax: 8, tempMin: 2, rainChance: 50, condition: "rainy" },
        { tempMax: 11, tempMin: 5, rainChance: 15, condition: "partly-cloudy" },
        { tempMax: 7, tempMin: 1, rainChance: 65, condition: "rainy" },
        { tempMax: 8, tempMin: 2, rainChance: 40, condition: "cloudy" },
        { tempMax: 10, tempMin: 4, rainChance: 25, condition: "partly-cloudy" },
      ],
    },
  ],
};
