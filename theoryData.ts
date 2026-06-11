export interface ExerciseQuestion {
  id: string;
  question: string;
  hint?: string;
  correctAnswer: string;
  userAnswer?: string;
  options?: string[];
}

export interface ExerciseSection {
  id: number;
  title: string;
  description: string;
  questions: ExerciseQuestion[];
}

export interface VerbConjugationTable {
  verb: string;
  translation: string;
  type: 'afirmativo' | 'negativo';
  headers: string[];
  rows: { person: string; form: string; translation?: string }[];
}

export interface ExampleSentence {
  spanish: string;
  armenian: string;
  audioText?: string;
}

export interface DialogLine {
  speaker: string;
  textEs: string;
  textHy: string;
}

export interface TheorySection {
  id: number;
  title: string;
  category: 'introduction' | 'regular' | 'negative' | 'stem-changing' | 'irregular' | 'pronouns' | 'reflexive' | 'situational' | 'exercises' | 'summary';
  shortDesc: string;
  theoryText: string;
  tables?: VerbConjugationTable[];
  examples?: ExampleSentence[];
  dialogue?: {
    titleEs: string;
    titleHy: string;
    lines: DialogLine[];
  };
}

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 1,
    title: "1. Imperativo-ում ինչ անձեր կան",
    category: "introduction",
    shortDesc: "Իմացեք, թե որ դերանուններն են օգտագործվում հրամայական եղանակում:",
    theoryText: "Imperativo-ում հիմնականում օգտագործվում են այս անձերը.\n\nYo ձև չկա, որովհետև մարդը սովորաբար ինքն իրեն հրաման չի տալիս (Yo habla ❌ - Սխալ է):\n\nԲայց կա **nosotros** ձևը, որը նշանակում է՝ **եկեք անենք** (օրինակ՝ Hablemos - Եկեք խոսենք, Comamos - Եկեք ուտենք, Vamos - Գնանք / եկեք գնանք):",
    tables: [
      {
        verb: "Imperativo Persons",
        translation: "Անձերը հրամայականում",
        type: "afirmativo",
        headers: ["Անձ", "Իմաստ", "Օրինակ (Hablar/Comer/Ir)"],
        rows: [
          { person: "tú", form: "դու", translation: "Habla / Come / Ve" },
          { person: "usted", form: "Դուք՝ հարգանքով", translation: "Hable / Coma / Vaya" },
          { person: "nosotros/as", form: "եկեք մենք անենք (եկեք անենք)", translation: "Hablemos / Comamos / Vamos" },
          { person: "vosotros/as", form: "դուք՝ ոչ պաշտոնական, Իսպանիա", translation: "Hablad / Comed / Id" },
          { person: "ustedes", form: "դուք / Դուք՝ մի քանի հոգի", translation: "Hablen / Coman / Vayan" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "2. Imperativo-ի երկու հիմնական տեսակ",
    category: "introduction",
    shortDesc: "Դրական (Afirmativo) և ժխտական (Negativo) հրամայականների տարբերությունը:",
    theoryText: "Իսպաներենում հրամայականը լինում է երկու հիմնական տեսակի.\n\n1. **Imperativo afirmativo — դրական հրամայական**\nԵրբ ասում ենք՝ արա՛:\n\n2. **Imperativo negativo — ժխտական հրամայական**\nԵրբ ասում ենք՝ մի՛ արա:",
    examples: [
      { spanish: "Habla.", armenian: "Խոսի՛ր: (Դրական)" },
      { spanish: "Come.", armenian: "Կեր: (Դրական)" },
      { spanish: "Escribe.", armenian: "Գրի՛ր: (Դրական)" },
      { spanish: "No hables.", armenian: "Մի՛ խոսիր: (Ժխտական)" },
      { spanish: "No comas.", armenian: "Մի՛ կեր: (Ժխտական)" },
      { spanish: "No escribas.", armenian: "Մի՛ գրիր: (Ժխտական)" }
    ]
  },
  {
    id: 3,
    title: "3. Կանոնավոր բայեր — Imperativo afirmativo",
    category: "regular",
    shortDesc: "Կանոնավոր բայերի խոնարհումը դրական հրամայականում (-AR, -ER, -IR):",
    theoryText: "Դիտարկենք երեք կանոնավոր բայեր տարբեր վերջավորություններով՝ **hablar** (խոսել), **comer** (ուտել) և **vivir** (ապրել) դրական հրամայական ձևում:",
    tables: [
      {
        verb: "Imperativo Afirmativo (Կանոնավոր բայեր)",
        translation: "Դրական Հրամայական",
        type: "afirmativo",
        headers: ["Անձ", "Hablar (-AR)", "Comer (-ER)", "Vivir (-IR)"],
        rows: [
          { person: "tú", form: "habla", translation: "come / vive" },
          { person: "usted", form: "hable", translation: "coma / viva" },
          { person: "nosotros/as", form: "hablemos", translation: "comamos / vivamos" },
          { person: "vosotros/as", form: "hablad", translation: "comed / vivid" },
          { person: "ustedes", form: "hablen", translation: "coman / vivan" }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "4. Tú ձև — դու",
    category: "regular",
    shortDesc: "Ինչպես կազմել դրական 'tú' (դու) ձևը ընկերների և ընտանիքի համար:",
    theoryText: "**Tú** օգտագործում ենք ընկերների, երեխաների, ընտանիքի անդամների հետ:\n\nԴրական tú ձևը շատ հաճախ նման է ներկա ժամանակի (Presente Indicativo) **él / ella / usted** ձևին:\n\n*   **hablar** (խոսել) → Presente él: *habla* → Imperativo tú: *habla*\n*   **comer** (ուտել) → Presente él: *come* → Imperativo tú: *come*\n*   **vivir** (ապրել) → Presente él: *vive* → Imperativo tú: *vive*",
    examples: [
      { spanish: "Habla más despacio.", armenian: "Խոսի՛ր ավելի դանդաղ:" },
      { spanish: "Come la sopa.", armenian: "Կե՛ր ապուրը:" },
      { spanish: "Escribe la frase.", armenian: "Գրի՛ր նախասասությունը:" },
      { spanish: "Lee el texto.", armenian: "Կարդա՛ տեքստը:" },
      { spanish: "Abre la puerta.", armenian: "Բացի՛ր դուռը:" },
      { spanish: "Mira la pizarra.", armenian: "Նայի՛ր գրատախտակին:" }
    ]
  },
  {
    id: 5,
    title: "5. Usted ձև — հարգալից Դուք",
    category: "regular",
    shortDesc: "Հարգալից, պաշտոնական եզակի դիմելաձևը (Usted) խանութում, բժշկի մոտ կամ անծանոթի հետ:",
    theoryText: "**Usted** օգտագործում ենք պաշտոնական կամ հարգալից խոսքում՝ խանութում, հյուրանոցում, բժշկի մոտ, կամ անծանոթ մարդկանց հետ հաղորդակցվելիս:\n\nԱյստեղ վերջավորություններն անցնում են «հակառակ» կողմը՝ -AR բայերի համար -e, իսկ -ER/-IR բայերի համար՝ -a:",
    examples: [
      { spanish: "Hable más despacio, por favor.", armenian: "Խոսե՛ք ավելի դանդաղ, խնդրում եմ:" },
      { spanish: "Coma despacio.", armenian: "Կերե՛ք դանդաղ:" },
      { spanish: "Escriba su nombre aquí.", armenian: "Գրե՛ք Ձեր անունը այստեղ:" },
      { spanish: "Abra la puerta, por favor.", armenian: "Բացե՛ք դուռը, խնդրում եմ:" },
      { spanish: "Pase, por favor.", armenian: "Անցե՛ք / ներս եկեք, խնդրում եմ:" }
    ]
  },
  {
    id: 6,
    title: "6. Ustedes ձև — դուք / Դուք մի քանի հոգի",
    category: "regular",
    shortDesc: "Հոգնակի հարգալից կամ ընդհանուր հոգնակի դիմելաձևը (Ustedes):",
    theoryText: "**Ustedes** օգտագործում ենք մի քանի մարդու դիմելիս (թե՛ հարգական, թե՛ սովորական՝ Լատինական Ամերիկայում, և հարգական՝ Իսպանիայում):\n\nԿազմվում է usted ձևին **-n** տառն ավելացնելով:\n*   hablar → *hablen*\n*   comer → *coman*\n*   vivir → *vivan*\n*   escribir → *escriban*\n*   abrir → *abran*",
    examples: [
      { spanish: "Hablen más alto.", armenian: "Խոսե՛ք ավելի բարձր:" },
      { spanish: "Coman ahora.", armenian: "Հիմա կերե՛ք:" },
      { spanish: "Escriban las respuestas.", armenian: "Գրե՛ք պատասխանները:" },
      { spanish: "Abran los libros.", armenian: "Բացե՛ք գրքերը:" },
      { spanish: "Escuchen al profesor.", armenian: "Լսե՛ք ուսուցչին:" }
    ]
  },
  {
    id: 7,
    title: "7. Nosotros ձև — եկեք անենք",
    category: "regular",
    shortDesc: "Երբ առաջարկում ենք որևէ բան միասին անել (եկեք խոսենք, եկեք ուտենք):",
    theoryText: "**Nosotros** ձևն օգտագործում ենք համատեղ գործողություն առաջարկելիս, որը թարգմանվում է որպես **«եկեք [ինչ-որ բան] անենք»**:\n\n*   hablar → *hablemos* (եկեք խոսենք)\n*   comer → *comamos* (եկեք ուտենք)\n*   vivir → *vivamos* (եկեք ապրենք)\n*   estudiar → *estudiemos* (եկեք սովորենք)\n*   abrir → *abramos* (եկեք բացենք)\n*   escribir → *escribamos* (եկեք գրենք)",
    examples: [
      { spanish: "Hablemos español.", armenian: "Եկեք իսպաներեն խոսենք:" },
      { spanish: "Comamos juntos.", armenian: "Եկեք միասին ուտենք:" },
      { spanish: "Estudiemos esta regla.", armenian: "Եկեք սովորենք այս կանոնը:" },
      { spanish: "Escribamos un diálogo.", armenian: "Եկեք գրենք դիալոգ:" },
      { spanish: "Leamos el texto.", armenian: "Եկեք կարդանք տեքստը:" },
      { spanish: "Vayamos al centro.", armenian: "Եկեք գնանք կենտրոն:" }
    ]
  },
  {
    id: 8,
    title: "8. Vosotros ձև — դուք, Իսպանիա",
    category: "regular",
    shortDesc: "Ոչ պաշտոնական հոգնակի 'vosotros' ձևը՝ հիմնականում Իսպանիայում օգտագործվող:",
    theoryText: "**Vosotros** օգտագործվում է հիմնականում Իսպանիայում՝ ոչ պաշտոնական «դուք» (ընկերական, հարազատ միջավայրում) իմաստով:\n\nԿանոնը չափազանց հեշտ է.\n**infinitivo-ի վերջի -r տառը փոխվում է -d-ի:**\n*   hablar → *hablad*\n*   comer → *comed*\n*   vivir → *vivid*\n*   escribir → *escribid*\n*   abrir → *abrid*",
    examples: [
      { spanish: "Hablad más despacio.", armenian: "Խոսե՛ք ավելի դանդաղ:" },
      { spanish: "Comed la comida.", armenian: "Կերե՛ք ուտելիքը:" },
      { spanish: "Escribid en el cuaderno.", armenian: "Գրե՛ք տետրում:" },
      { spanish: "Abrid la ventana.", armenian: "Բացե՛ք պատուհանը:" },
      { spanish: "Leed el texto.", armenian: "Կարդացե՛ք տեքստը:" }
    ]
  },
  {
    id: 9,
    title: "9. Imperativo negativo — ժխտական հրամայական",
    category: "negative",
    shortDesc: "Ինչպես արգելել կամ ասել՝ «մի արա» (No + բայ):",
    theoryText: "Ժխտական հրամայականում միշտ բայից առաջ դնում ենք **no**:\n\nԿառուցվածքը՝ **no + բայ (subjuntivo ձևով)**:\n\n*   No hables. (Մի՛ խոսիր:)\n*   No comas. (Մի՛ կեր:)\n*   No escribas. (Մի՛ գրիր:)\n*   No vayas. (Մի՛ գնա:)\n*   No digas eso. (Դա մի՛ ասա:)",
    examples: [
      { spanish: "No hables.", armenian: "Մի՛ խոսիր:" },
      { spanish: "No comas.", armenian: "Մի՛ կեր:" },
      { spanish: "No escribas.", armenian: "Մի՛ գրիր:" },
      { spanish: "No vayas.", armenian: "Մի՛ գնա:" },
      { spanish: "No digas eso.", armenian: "Դա մի՛ ասա:" }
    ]
  },
  {
    id: 10,
    title: "10. Կանոնավոր բայեր — Imperativo negativo",
    category: "negative",
    shortDesc: "Կանոնավոր բայերի ժխտական խոնարհումը: Վերջավորությունները փոխվում են «հակառակ» տարբերակով:",
    theoryText: "Ժխտական հրամայականում վերջավորությունները փոխվում են **«հակառակ»** ձևով.\n*   -AR բայերը ստանում են **-ER/-IR** խմբի վերջավորությունները:\n*   -ER/-IR բայերը ստանում են **-AR** խմբի վերջավորությունները:\n\nՏեսնենք խոնարհման աղյուսակները.",
    tables: [
      {
        verb: "Hablar (-AR բայեր) - Imperativo Negativo",
        translation: "Մի՛ խոսիր (hablar, no hables)",
        type: "negativo",
        headers: ["Անձ", "Ժխտական ձև", "Հայերեն թարգմանություն"],
        rows: [
          { person: "tú", form: "no hables", translation: "Այդքան արագ մի՛ խոսիր (No hables tan rápido.)" },
          { person: "usted", form: "no hable", translation: "Այստեղ մի՛ խոսեք (No hable aquí.)" },
          { person: "nosotros/as", form: "no hablemos", translation: "Եկեք դրա մասին չխոսենք (No hablemos de eso.)" },
          { person: "vosotros/as", form: "no habléis", translation: "Բարձր մի՛ խոսեք (No habléis alto.)" },
          { person: "ustedes", form: "no hablen", translation: "Հիմա մի՛ խոսեք (No hablen ahora.)" }
        ]
      },
      {
        verb: "Comer (-ER բայեր) - Imperativo Negativo",
        translation: "Մի՛ կեր (comer, no comas)",
        type: "negativo",
        headers: ["Անձ", "Ժխտական ձև", "Հայերեն թարգմանություն"],
        rows: [
          { person: "tú", form: "no comas", translation: "Շատ շոկոլադ մի՛ կեր (No comas mucho chocolate.)" },
          { person: "usted", form: "no coma", translation: "Արագ մի՛ կերեք (No coma rápido.)" },
          { person: "nosotros/as", form: "no comamos", translation: "Եկեք հիմա չուտենք (No comamos ahora.)" },
          { person: "vosotros/as", form: "no comáis", translation: "Ուշ մի՛ կերեք (No comáis tarde.)" },
          { person: "ustedes", form: "no coman", translation: "Այստեղ մի՛ կերեք (No coman aquí.)" }
        ]
      },
      {
        verb: "Vivir / Escribir (-IR բայեր) - Imperativo Negativo",
        translation: "Մի՛ ապրիր / Մի՛ գրիր",
        type: "negativo",
        headers: ["Անձ", "Vivir (ապրել)", "Escribir (գրել)"],
        rows: [
          { person: "tú", form: "no vivas", translation: "no escribas (Այստեղ մի՛ գրիր / No escribas aquí.)" },
          { person: "usted", form: "no viva", translation: "no escriba (Մենակ մի՛ ապրեք / No viva solo.)" },
          { person: "nosotros/as", form: "no vivamos", translation: "no escribamos (Եկեք այդ բառը չգրենք / No escribamos esa palabra.)" },
          { person: "vosotros/as", form: "no viváis", translation: "no escribáis (Պատի վրա մի՛ գրեք / No escribáis en la pared.)" },
          { person: "ustedes", form: "no vivan", translation: "no escriban (Կենտրոնից հեռու մի՛ ապրեք / No vivan lejos del centro.)" }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "11. Դրական և ժխտական ձևերի համեմատություն",
    category: "negative",
    shortDesc: "Կողք-կողքի համեմատեք նույն բայերի դրական և ժխտական հրամայականները:",
    theoryText: "Այստեղ կարող եք տեսնել, թե ինչպես են փոխվում նույն բայերը դրական և ժխտական տարբերակներում. նկատեք վերջավորության ձայնավորի փոփոխությունը (tú դեպքում):",
    tables: [
      {
        verb: "Afirmativo vs Negativo Comparison",
        translation: "Համեմատության աղյուսակ",
        type: "afirmativo",
        headers: ["Դրական", "Հայերեն", "Ժխտական", "Հայերեն"],
        rows: [
          { person: "habla", form: "խոսիր", translation: "no hables (մի՛ խոսիր)" },
          { person: "come", form: "կեր", translation: "no comas (մի՛ կեր)" },
          { person: "vive", form: "ապրիր", translation: "no vivas (մի՛ ապրիր)" },
          { person: "escribe", form: "գրիր", translation: "no escribas (մի՛ գրիր)" },
          { person: "lee", form: "կարդա", translation: "no leas (մի՛ կարդա)" },
          { person: "abre", form: "բացիր", translation: "no abras (մի՛ բացիր)" }
        ]
      }
    ],
    examples: [
      { spanish: "Habla conmigo.", armenian: "Խոսիր ինձ հետ:" },
      { spanish: "No hables conmigo.", armenian: "Ինձ հետ մի՛ խոսիր:" },
      { spanish: "Come ahora.", armenian: "Հիմա կեր:" },
      { spanish: "No comas ahora.", armenian: "Հիմա մի՛ կեր:" },
      { spanish: "Abre la puerta.", armenian: "Բացիր դուռը:" },
      { spanish: "No abras la puerta.", armenian: "Դուռը մի՛ բացիր:" }
    ]
  },
  {
    id: 12,
    title: "12. Արմատափոխվող բայեր Imperativo-ում",
    category: "stem-changing",
    shortDesc: "Ինչպես են խոնարհվում E->IE, E->I, O->UE, U->UE արմատափոխվող բայերը:",
    theoryText: "Որոշ բայեր փոխում են արմատի ձայնավորը (ներկա ժամանակի նման): Այդ փոփոխությունը պահպանվում է նաև Imperativo-ում (բացի vosotros և հաճախ nosotros ձևերից, ընդ որում ժխտականում նույնպես պահպանվում է):\n\n**1. E → IE**\n*   **Pensar** (մտածել) → *piensa* (դրական tú) / *no pienses* (ժխտական tú)\n*   **Cerrar** (փակել) → *cierra* / *no cierres*\n*   **Empezar** (սկսել) → *empieza* / *no empieces*\n\n**2. E → I**\n*   **Pedir** (խնդրել / պատվիրել) → *pide* / *no pidas*\n*   **Repetir** (կրկնել) → *repite* / *no repitas*\n\n**3. O → UE**\n*   **Dormir** (քնել) → *duerme* / *no duermas*\n*   **Volver** (վերադառնալ) → *vuelve* / *no vuelvas*\n*   **Recordar** (հիշել) → *recuerda* / *no recuerdes*\n\n**4. U → UE**\n*   **Jugar** (խաղալ) → *juega* / *no juegues* (Ուշադրություն՝ այստեղ գրվում է *juegues*, որպեսզի պահպանվի 'g' հնչյունը, ոչ թե juegas):",
    examples: [
      { spanish: "Piensa bien.", armenian: "Լավ մտածիր:" },
      { spanish: "No pienses mucho.", armenian: "Շատ մի՛ մտածիր:" },
      { spanish: "Cierra la puerta.", armenian: "Փակիր դուռը:" },
      { spanish: "No cierres la ventana.", armenian: "Պատուհանը մի՛ փակիր:" },
      { spanish: "Empieza la tarea.", armenian: "Սկսիր տնայինը:" },
      { spanish: "No empieces ahora.", armenian: "Հիմա մի՛ սկսիր:" },
      { spanish: "Pide ayuda.", armenian: "Օգնություն խնդրիր:" },
      { spanish: "No pidas dinero.", armenian: "Փող մի՛ խնդրիր:" },
      { spanish: "Repite la frase.", armenian: "Կրկնի՛ր նախադասությունը:" },
      { spanish: "No repitas el error.", armenian: "Մի՛ կրկնիր սխալը:" },
      { spanish: "Duerme bien.", armenian: "Լավ քնիր:" },
      { spanish: "No duermas en clase.", armenian: "Դասի ժամանակ մի՛ քնիր:" },
      { spanish: "Vuelve temprano.", armenian: "Շուտ վերադարձիր:" },
      { spanish: "No vuelvas tarde.", armenian: "Ուշ մի՛ վերադարձիր:" },
      { spanish: "Recuerda mi name (nombre).", armenian: "Հիշիր իմ անունը:" },
      { spanish: "No recuerdes eso.", armenian: "Դա մի՛ հիշիր:" },
      { spanish: "Juega conmigo.", armenian: "Խաղա ինձ հետ:" },
      { spanish: "No juegues aquí.", armenian: "Այստեղ մի՛ խաղա:" }
    ]
  },
  {
    id: 13,
    title: "13. Դրական tú ձևի կարևոր անկանոնները",
    category: "irregular",
    shortDesc: "8 կարճ և կարևոր հատուկ միավանկ ձևեր, որոնք պետք է անգիր հիշել (haz, ven, di և այլն):",
    theoryText: "Այս ձևերը չափազանց կարևոր են և օգտագործվում են ամեն օր: Դրանք պետք է անգիր հիշել. դրանք շատ կարճ են:\n\n*   **decir** (ասել) → **di** (ասա՛)\n*   **hacer** (անել) → **haz** (արա՛)\n*   **ir** (գնալ) → **ve** (գնա՛)\n*   **poner** (դնել) → **pon** (դիր)\n*   **salir** (դուրս գալ) → **sal** (դուրս արի)\n*   **ser** (լինել) → **sé** (եղի՛ր)\n*   **tener** (ունենալ) → **ten** (ունեցի՛ր / պահի՛ր)\n*   **venir** (գալ) → **ven** (արի՛)\n*   **oír** (լսել) → **oye** (լսի՛ր)",
    examples: [
      { spanish: "Di la verdad.", armenian: "Ասա՛ ճշմարտությունը:" },
      { spanish: "Haz la tarea.", armenian: "Արա՛ տնայինը:" },
      { spanish: "Ve a casa.", armenian: "Գնա՛ տուն:" },
      { spanish: "Pon el libro en la mesa.", armenian: "Դիր գիրքը սեղանին:" },
      { spanish: "Sal rápido.", armenian: "Արագ դուրս արի:" },
      { spanish: "Sé amable.", armenian: "Եղի՛ր բարի:" },
      { spanish: "Ten cuidado.", armenian: "Զգույշ եղիր:" },
      { spanish: "Ven aquí.", armenian: "Արի՛ այստեղ:" },
      { spanish: "Oye esta canción.", armenian: "Լսի՛ր այս երգը:" }
    ]
  },
  {
    id: 14,
    title: "14. Նույն բայերի բոլոր դրական ձևերը",
    category: "irregular",
    shortDesc: "Անկանոն բայերի ամբողջական խոնարհումը դրական հրամայականում (բոլոր անձերով):",
    theoryText: "Տեսնենք նախորդ բաժնի անկանոն բայերի ամբողջական դրական խոնարհումը բոլոր անձերով:",
    tables: [
      {
        verb: "Անկանոն բայեր (Դրական)",
        translation: "Irregular Verbs (Afirmativo)",
        type: "afirmativo",
        headers: ["Բայ", "tú", "usted", "nosotros/as", "vosotros/as", "ustedes"],
        rows: [
          { person: "decir", form: "di", translation: "diga | dejamos | decid | digan" },
          { person: "hacer", form: "haz", translation: "haga | hagamos | haced | hagan" },
          { person: "ir", form: "ve", translation: "vaya | vayamos | id | vayan" },
          { person: "poner", form: "pon", translation: "ponga | pongamos | poned | pongan" },
          { person: "salir", form: "sal", translation: "salga | salgamos | salid | salgan" },
          { person: "ser", form: "sé", translation: "sea | seamos | sed | sean" },
          { person: "tener", form: "ten", translation: "tenga | tengamos | tened | tengan" },
          { person: "venir", form: "ven", translation: "venga | vengamos | venid | vengan" },
          { person: "oír", form: "oye", translation: "oiga | oigamos | oíd | oigan" }
        ]
      }
    ],
    examples: [
      { spanish: "Diga su nombre, por favor.", armenian: "Ասեք Ձեր անունը, խնդրում եմ:" },
      { spanish: "Hagamos el ejercicio.", armenian: "Եկեք անենք վարժությունը:" },
      { spanish: "Vayan al hotel.", armenian: "Գնացեք հյուրանոց:" },
      { spanish: "Ponga la llave aquí.", armenian: "Բանալին դրեք այստեղ:" },
      { spanish: "Seamos tranquilos.", armenian: "Եկեք հանգիստ լինենք:" }
    ]
  },
  {
    id: 15,
    title: "15. Ժխտական tú ձևի անկանոնները",
    category: "irregular",
    shortDesc: "Ինչպես արգելել օգտագործելով անկանոն բայերը (no hagas, no digas, no vayas):",
    theoryText: "Ժխտականում դրանք սովորաբար գալիս են Subjuntivo ձևից (որոնք կառուցվում են yo ձևի հիման վրա, օրինակ՝ hago -> no hagas):\n\n*   **decir** → **no digas** (մի՛ ասա)\n*   **hacer** → **no hagas** (մի՛ արա)\n*   **ir** → **no vayas** (մի՛ գնա)\n*   **poner** → **no pongas** (մի՛ դիր)\n*   **salir** → **no salgas** (դուրս մի՛ արի)\n*   **ser** → **no seas** (մի՛ եղիր)\n*   **tener** → **no tengas** (մի՛ ունեցիր)\n*   **venir** → **no vengas** (մի՛ արի)\n*   **oír** → **no oigas** (մի՛ լսիր)",
    examples: [
      { spanish: "No digas eso.", armenian: "Դա մի՛ ասա:" },
      { spanish: "No hagas ruido.", armenian: "Աղմուկ մի՛ արա:" },
      { spanish: "No vayas solo.", armenian: "Մենակ մի՛ գնա:" },
      { spanish: "No pongas eso aquí.", armenian: "Դա այստեղ մի՛ դիր:" },
      { spanish: "No salgas tarde.", armenian: "Ուշ դուրս մի՛ արի:" },
      { spanish: "No seas malo.", armenian: "Վատը մի՛ եղիր:" },
      { spanish: "No tengas miedo.", armenian: "Մի՛ վախեցիր:" },
      { spanish: "No vengas tarde.", armenian: "Ուշ մի՛ արի:" },
      { spanish: "No oigas esa música.", armenian: "Այդ երաժշտությունը մի՛ լսիր:" }
    ]
  },
  {
    id: 16,
    title: "16. Բոլոր անձերով ժխտական անկանոն բայեր",
    category: "irregular",
    shortDesc: "Անկանոն բայերի ամբողջական ժխտական խոնարհումը (բոլոր անձերով):",
    theoryText: "Ահա բոլոր անկանոն բայերի ամբողջական ժխտական աղյուսակը բոլոր անձերով. բոլոր ձևերի սկզբում դրվում է **no**:",
    tables: [
      {
        verb: "Անկանոն բայեր (Ժխտական)",
        translation: "Irregular Verbs (Negativo)",
        type: "negativo",
        headers: ["Բայ", "tú", "usted", "nosotros/as", "vosotros/as", "ustedes"],
        rows: [
          { person: "decir", form: "no digas", translation: "no diga | no digamos | no digáis | no digan" },
          { person: "hacer", form: "no hagas", translation: "no haga | no hagamos | no hagáis | no hagan" },
          { person: "ir", form: "no vayas", translation: "no vaya | no vayamos | no vayáis | no vayan" },
          { person: "poner", form: "no pongas", translation: "no ponga | no pongamos | no pongáis | no pongan" },
          { person: "salir", form: "no salgas", translation: "no salga | no salgamos | no salgáis | no salgan" },
          { person: "ser", form: "no seas", translation: "no sea | no seamos | no seáis | no sean" },
          { person: "tener", form: "no tengas", translation: "no tenga | no tengamos | no tengáis | no tengan" },
          { person: "venir", form: "no vengas", translation: "no venga | no vengamos | no vengáis | no vengan" },
          { person: "oír", form: "no oigas", translation: "no oiga | no oigamos | no oigáis | no oigan" }
        ]
      }
    ]
  },
  {
    id: 17,
    title: "17. Yo ձևով անկանոն բայեր և Imperativo negativo",
    category: "irregular",
    shortDesc: "Ինչպես է ներկա ժամանակի Yo ձևի անկանոնությունը փոխանցվում ժխտական հրամայականին:",
    theoryText: "Եթե բայը ներկա ժամանակի **yo** ձևում անկանոն է, ապա ժխտական Imperativo-ում այդ անկանոնությունը (օրինակ՝ 'g'-ի, 'zc'-ի հայտնվելը) պահպանվում է բոլոր անձերում (քանի որ հիմնված է Subjuntivo-ի վրա):\n\n*   **tener** → yo *tengo* → *no tengas*\n*   **hacer** → yo *hago* → *no hagas*\n*   **decir** → yo *digo* → *no digas*\n*   **venir** → yo *vengo* → *no vengas*\n*   **poner** → yo *pongo* → *no pongas*\n*   **salir** → yo *salgo* → *no salgas*\n*   **caer** (ընկնել) → yo *caigo* → *no caigas*\n*   **conocer** (ճանաչել) → yo *conozco* → *no conozcas*\n*   **conducir** (վարել) → yo *conduzco* → *no conduzcas*",
    tables: [
      {
        verb: "Yo-irregularity connection",
        translation: "Yo ձևի կապը ժխտականի հետ",
        type: "negativo",
        headers: ["Infinitivo", "Presente Yo", "Tú Negativo", "Հայերեն իմաստ"],
        rows: [
          { person: "tener", form: "tengo", translation: "no tengas (մի՛ ունեցիր)" },
          { person: "hacer", form: "hago", translation: "no hagas (մի՛ արա)" },
          { person: "decir", form: "digo", translation: "no digas (մի՛ ասա)" },
          { person: "venir", form: "vengo", translation: "no vengas (մի՛ արի)" },
          { person: "poner", form: "pongo", translation: "no pongas (մի՛ դիր)" },
          { person: "salir", form: "salgo", translation: "no salgas (դուրս մի՛ արի)" },
          { person: "caer", form: "caigo", translation: "no caigas (մի՛ ընկիր)" },
          { person: "conocer", form: "conozco", translation: "no conozcas (մի՛ ճանաչիր)" },
          { person: "conducir", form: "conduzco", translation: "no conduzcas (մի՛ վարիր)" }
        ]
      }
    ],
    examples: [
      { spanish: "No tengas miedo.", armenian: "Մի՛ վախեցիր:" },
      { spanish: "No hagas eso.", armenian: "Դա մի՛ արա:" },
      { spanish: "No digas nada.", armenian: "Ոչինչ մի՛ ասա:" },
      { spanish: "No vengas tarde.", armenian: "Ուշ մի՛ արի:" },
      { spanish: "No pongas el vaso aquí.", armenian: "Բաժակը այստեղ մի՛ դիր:" },
      { spanish: "No salgas solo.", armenian: "Մենակ դուրս մի՛ արի:" },
      { spanish: "No caigas.", armenian: "Մի՛ ընկիր:" },
      { spanish: "No conduzcas rápido.", armenian: "Արագ մի՛ վարիր:" }
    ]
  },
  {
    id: 18,
    title: "18. Դերանունները Imperativo-ում",
    category: "pronouns",
    shortDesc: "Իսպաներեն հայցական և տրական դերանունները, որոնք օգտագործվում են հրամայականում:",
    theoryText: "Imperativo-ում դերանունների տեղը չափազանց կարևոր է և ենթարկվում է խիստ օրենքների: Դերանունները կարող են լինել՝\n\n*   **me** — ինձ\n*   **te** — քեզ / քեզ համար / վերադարձական\n*   **lo / la** — դա / նրան (արական / իգական)\n*   **nos** — մեզ\n*   **os** — ձեզ\n*   **los / las** — դրանք / նրանց\n*   **se** — իրեն / նրան / նրանց (օգտագործվում է նաև երրորդ դեմքերում վերադարձական կամ կրկնակի դերանունների դեպքում):",
    examples: [
      { spanish: "Dime.", armenian: "Ասա ինձ (me):" },
      { spanish: "Míralo.", armenian: "Նայիր դրան (lo):" },
      { spanish: "No me llames.", armenian: "Ինձ (me) մի՛ զանգիր:" }
    ]
  },
  {
    id: 19,
    title: "19. Դրական Imperativo-ում դերանունը կպչում է վերջում",
    category: "pronouns",
    shortDesc: "Դրական հրամայականում դերանունները դառնում են բայի վերջավորություն (Ayúdame, Dime):",
    theoryText: "Դրական հրամայականում դերանունը գրվում է **անմիջապես բայի վերջում՝ կպած** (դառնալով մեկ ամբողջական բառ):\n\n*   Ayuda (օգնիր) + me (ինձ) = **Ayúdame** (Օգնիր ինձ)\n*   Di (ասա) + me (ինձ) = **Dime** (Ասա ինձ)\n*   Mira (նայիր) + lo (նրան/դրան) = **Míralo** (Նայիր դրան / նրան)\n*   Compra (գնիր) + la (այն - իգական) = **Cómprala** (Գնիր այն)\n*   Escucha (լսիր) + me (ինձ) = **Escúchame** (Լսիր ինձ)\n*   Llama (զանգիր) + me (ինձ) = **Llámame** (Զանգիր ինձ)\n*   Espera (սպասիր) + me (ինձ) = **Espérame** (Սպասիր ինձ)\n*   Lee (կարդա) + lo (այն) = **Léelo** (Կարդա այն)",
    examples: [
      { spanish: "Ayúdame.", armenian: "Օգնիր ինձ:" },
      { spanish: "Dime.", armenian: "Ասա ինձ:" },
      { spanish: "Míralo.", armenian: "Նայիր դրան / նրան:" },
      { spanish: "Cómprala.", armenian: "Գնիր այն:" },
      { spanish: "Escúchame.", armenian: "Լսիր ինձ:" },
      { spanish: "Llámame.", armenian: "Զանգիր ինձ:" },
      { spanish: "Espérame.", armenian: "Սպասիր ինձ:" },
      { spanish: "Léelo.", armenian: "Կարդա այն:" }
    ]
  },
  {
    id: 20,
    title: "20. Երկու դերանուն դրական Imperativo-ում",
    category: "pronouns",
    shortDesc: "Ինչպես միացնել երկու դերանուն միաժամանակ (ում + ինչ կանոնը, օրինակ՝ Dímelo):",
    theoryText: "Երբ ունենք երկու դերանուն (օրինակ՝ անուղղակի և ուղղակի խնդիր), նրանք երկուսն էլ կպչում են բայի վերջում:\n\nՀերթականությունը միշտ հետևյալն է. **ում** (ձևական/անուղղակի) + **ինչ** (ուղղակի):\n*   **me + lo** (ինձ դա)\n*   **te + la** (քեզ դա)\n*   **se + lo** (նրան դա - 'le'-ն փոխվում է 'se'-ի 'lo'-ից առաջ)\n\n*   di (ասա) + me (ինձ) + lo (դա) = **Dímelo** (Ասա դա ինձ)\n*   da (տուր) + se (նրան) + lo (դա) = **Dáselo** (Տուր դա նրան)\n*   compra (գնիր) + me (ինձ համար) + lo (դա) = **Cómpramelo** (Գնիր դա ինձ համար)\n*   explica (բացատրիր) + me (ինձ) + lo (դա) = **Explícamelo** (Բացատրիր դա ինձ)\n*   enseña (ցույց տուր) + se (նրան) + lo (դա) = **Enséñaselo** (Ցույց տուր դա նրան)",
    examples: [
      { spanish: "Dímelo.", armenian: "Ասա դա ինձ:" },
      { spanish: "Dáselo.", armenian: "Տուր դա նրան:" },
      { spanish: "Cómpramelo.", armenian: "Գնիր դա ինձ համար:" },
      { spanish: "Explícamelo.", armenian: "Բացատրիր դա ինձ:" },
      { spanish: "Enséñaselo.", armenian: "Ցույց տուր դա նրան:" }
    ]
  },
  {
    id: 21,
    title: "21. Ինչու Dímelo, Dáselo բառերի վրա շեշտ կա",
    category: "pronouns",
    shortDesc: "Գրավոր շեշտի (tilde) կանոնները, երբ բառը երկարում է կպած դերանունների պատճառով:",
    theoryText: "Երբ մեկ կամ երկու դերանուն կպչում են բայի վերջում, բառը զգալիորեն երկարում է:\n\nՈրպեսզի արտասանական շեշտը մնա բնօրինակ վանկի վրա (որտեղ այն կար դերանուններից առաջ), մենք ստիպված ենք գրավոր շեշտ (accent/tilde) դնել:\n\n*   **di** + me + lo = **dímelo** (շեշտը 'i'-ի վրա)\n*   **da** + se + lo = **dáselo** (շեշտը 'á'-ի վրա)\n*   **explica** + me + lo = **explícamelo** (շեշտը 'í'-ի վրա, քանի որ implica-ում շեշտն ընկնում էր 'i'-ի վրա)\n*   **compra** + me + lo = **cómpramelo** (շեշտը 'ó'-ի վրա)",
    examples: [
      { spanish: "dímelo", armenian: "ասա դա ինձ (di -> dímelo)" },
      { spanish: "dáselo", armenian: "տուր դա նրան (da -> dáselo)" },
      { spanish: "explícamelo", armenian: "բացատրիր դա ինձ (explica -> explícamelo)" },
      { spanish: "cómpramelo", armenian: "գնիր դա ինձ համար (compra -> cómpramelo)" }
    ]
  },
  {
    id: 22,
    title: "22. Ժխտական Imperativo-ում դերանունը բայից առաջ է",
    category: "pronouns",
    shortDesc: "Ժխտական հրամայականում դերանունները երբեք չեն կպչում, այլ գրվում են բայից առաջ (No me digas):",
    theoryText: "Ժխտական հրամայականում դերանունները **չեն կպչում** վերջում:\n\nԱյն դրվում է **բայից առաջ** (առանձին բառով), անմիջապես 'no'-ից հետո:\n\nԿառուցվածքը՝ **no + դերանուն(ներ) + բայ** (եթե կա երկու դերանուն՝ նորից ում + ինչ հերթականությամբ):\n\n*   no + me (ինձ) + llames (զանգիր) = **No me llames** (Ինձ մի՛ զանգիր)\n*   no + lo (դրան) + mires (նայիր) = **No lo mires** (Մի՛ նայիր դրան)\n*   no + la (այն) + compres (գնիր) = **No la compres** (Մի՛ գնիր այն)\n*   no + me (ինձ) + digas (ասա) = **No me digas** (Ինձ մի՛ ասա / Մի՛ ասա ինձ)\n*   no + me (ինձ) + lo (դա) + digas (ասա) = **No me lo digas** (Դա ինձ մի՛ ասա)\n*   no + se (նրան) + lo (դա) + des (տուր) = **No se lo des** (Դա նրան մի՛ տուր)\n*   no + te (քեզ) + levantes (վեր կաց) = **No te levantes** (Վեր մի՛ կաց / Մի՛ վերկաց)",
    examples: [
      { spanish: "No me llames.", armenian: "Ինձ մի՛ զանգիր:" },
      { spanish: "No lo mires.", armenian: "Մի՛ նայիր դրան:" },
      { spanish: "No la compres.", armenian: "Մի՛ գնիր այն:" },
      { spanish: "No me digas.", armenian: "Ինձ մի՛ ասա:" },
      { spanish: "No me lo digas.", armenian: "Դա ինձ մի՛ ասա:" },
      { spanish: "No se lo des.", armenian: "Դա նրան մի՛ տուր:" },
      { spanish: "No te levantes.", armenian: "Վեր մի՛ կաց:" }
    ]
  },
  {
    id: 23,
    title: "23. Դրական և ժխտական դերանուններով համեմատություն",
    category: "pronouns",
    shortDesc: "Տեսողական համեմատություն, թե ինչպես է դերանունը փոխում իր դիրքը դրական և ժխտական ձևերում:",
    theoryText: "Համեմատեք, թե ինչպես է դերանունը «վազում» վերջից դեպի սկիզբ, երբ դրական նախադասությունը դառնում է ժխտական:",
    tables: [
      {
        verb: "Pronoun Placement Comparison",
        translation: "Դերանունների դիրքերի համեմատություն",
        type: "afirmativo",
        headers: ["Դրական (կպած վերջում)", "Հայերեն", "Ժխտական (առանձին սկզբում)", "Հայերեն"],
        rows: [
          { person: "dime", form: "ասա ինձ", translation: "no me digas (ինձ մի՛ ասա)" },
          { person: "dímelo", form: "ասա դա ինձ", translation: "no me lo digas (դա ինձ մի՛ ասա)" },
          { person: "míralo", form: "նայիր դրան", translation: "no lo mires (մի՛ նայիր դրան)" },
          { person: "cómprala", form: "գնիր այն", translation: "no la compres (մի՛ գնիր այն)" },
          { person: "ayúdame", form: "օգնիր ինձ", translation: "no me ayudes (մի՛ օգնիր ինձ)" },
          { person: "levántate", form: "վեր կաց", translation: "no te levantes (վեր մի՛ կաց)" }
        ]
      }
    ]
  },
  {
    id: 24,
    title: "24. Վերադարձական բայերով Imperativo",
    category: "reflexive",
    shortDesc: "Վերադարձական բայերի (levantarse, sentarse) խոնարհումը 'te' և 'se' մասնիկներով:",
    theoryText: "Վերադարձական բայերի (Infinitive-ի վերջում **-se** մասնիկով բայեր) խոնարհումը հետևում է նույն դերանունների օրենքին: Դրականում մասնիկը դառնում է **-te, -se, -nos, -os** և կպչում է վերջում, իսկ ժխտականում՝ գրվում է սկզբում առանձին (**te, se, nos, os**):\n\nՎերադարձական բայեր են՝ **levantarse** (վեր կենալ), **ducharse** (ցնցուղ ընդունել), **vestirse** (հագնվել), **sentarse** (նստել), **acostarse** (պառկել), **prepararse** (պատրաստվել), **lavarse** (լվացվել):\n\nԱհա տրված բայերի համեմատական ձևերը տարբեր դեմքերով.",
    tables: [
      {
        verb: "Դրական Վերադարձական (Afirmativo)",
        translation: "Positive Reflexives",
        type: "afirmativo",
        headers: ["Բայ", "Tú (դու)", "Usted (հարգալից)", "Ustedes (դուք)"],
        rows: [
          { person: "levantarse", form: "levántate (շուտ վեր կաց / temprano)", translation: "levántese | levántense" },
          { person: "ducharse", form: "dúchate (հիմա ցնցուղ ընդունիր / ahora)", translation: "dúchese | dúchense" },
          { person: "sentarse", form: "siéntate (նստիր այստեղ / aquí)", translation: "siéntese | siéntense" },
          { person: "acostarse", form: "acuéstate (շուտ պառկիր / temprano)", translation: "acuéstese | acuéstense" },
          { person: "prepararse", form: "prepárate (պատրաստվիր ճանապարհորդության / para el viaje)", translation: "prepárese | prepárense" },
          { person: "lavarse", form: "lávate (լվա ձեռքերդ / las manos)", translation: "lávese | lávense" }
        ]
      },
      {
        verb: "Ժխտական Վերադարձական (Negativo)",
        translation: "Negative Reflexives",
        type: "negativo",
        headers: ["Բայ", "Tú", "Usted", "Ustedes"],
        rows: [
          { person: "levantarse", form: "no te levantes (ուշ վեր մի՛ կաց / tarde)", translation: "no se levante | no se levanten" },
          { person: "ducharse", form: "no te duches (հիմա մի՛ ընդունիր / ahora)", translation: "no se duche | no se duchen" },
          { person: "sentarse", form: "no te sientes (այստեղ մի՛ նստիր / aquí)", translation: "no se siente | no se sienten" },
          { person: "acostarse", form: "no te acuestest (ուշ մի՛ պառկիր / tarde)", translation: "no se acueste | no se acuesten" },
          { person: "prepararse", form: "no te prepares (արագ մի՛ պատրաստվիր / rápido)", translation: "no se prepare | no se preparen" },
          { person: "lavarse", form: "no te laves (սառը ջրով մի՛ լվացվիր / con agua fría)", translation: "no se lave | no se laven" }
        ]
      }
    ]
  },
  {
    id: 25,
    title: "25. Nosotros վերադարձական բայերով",
    category: "reflexive",
    shortDesc: "Ինչպես է 'nos' մասնիկը կպչում nosotros ձևին (վերջին -s տառը կորչում է, օրինակ՝ levantémonos):",
    theoryText: "**Nosotros** ձևով վերադարձական բայի դեպքում ունենք շատ կարևոր հնչյունական օրենք.\n\nԴրական ձևում, երբ **nos** դերանունը կպչում է բայի վերջում, բայի վերջին **-s** տառը **դուրս է ընկնում** (կորչում է), որպեսզի արտասանությունը հեշտ լինի:\n\n*   levantemos + nos = **levantémonos** (ոչ թե levantemosnos ❌)\n*   sentemos + nos = **sentémonos**\n*   preparemos + nos = **preparémonos**\n*   lavemos + nos = **lavémonos**\n\nԺխտական ձևում դերանունն ուղղակի գրվում է բայից առաջ առանձին և **-s** տառը չի կորչում՝ **no nos levantemos**:",
    tables: [
      {
        verb: "Nosotros Reflexives",
        translation: "Nosotros վերադարձական",
        type: "afirmativo",
        headers: ["Բայ", "Դրական (Afirmativo)", "Ժխտական (Negativo)"],
        rows: [
          { person: "levantarse", form: "levantémonos (եկեք վեր կենանք)", translation: "no nos levantemos (եկեք վեր չկենանք)" },
          { person: "sentarse", form: "sentémonos (եկեք նստենք)", translation: "no nos sentemos (եկեք չնստենք)" },
          { person: "prepararse", form: "preparémonos (եկեք պատրաստվենք)", translation: "no nos preparemos (եկեք չպատրաստվենք)" },
          { person: "lavarse", form: "lavémonos (եկեք լվացվենք)", translation: "no nos lavemos (եկեք չլվացվենք)" }
        ]
      }
    ],
    examples: [
      { spanish: "Levantémonos temprano.", armenian: "Եկեք շուտ վեր կենանք:" },
      { spanish: "Sentémonos aquí.", armenian: "Եկեք այստեղ նստենք:" },
      { spanish: "Preparémonos para el viaje.", armenian: "Եկեք պատրաստվենք ճանապարհորդության համար:" },
      { spanish: "No nos levantemos tarde.", armenian: "Եկեք ուշ վեր չկենանք:" },
      { spanish: "No nos sentemos aquí.", armenian: "Եկեք այստեղ չնստենք:" },
      { spanish: "No nos preocupemos.", armenian: "Եկեք չանհանգստանանք:" }
    ]
  },
  {
    id: 26,
    title: "26. Irse բայի հատուկ ձևերը",
    category: "reflexive",
    shortDesc: "Irse (հեռանալ/գնալ) բայի յուրահատուկ ձևերը՝ vete, vámonos և այլն:",
    theoryText: "**Irse** (գնալ, հեռանալ) բանը շատ տարածված է և ունի յուրահատուկ վերադարձական ձևեր, որոնք պետք է հիշել:\n\n*   tú դրական՝ **vete** (հեռացի՛ր / գնա՛ տուն)\n*   tú ժխտական՝ **no te vayas** (մի՛ հեռացիր)\n*   nosotros դրական՝ **vámonos** (գնա՛նք / եկեք հեռանանք, շատ հայտնի արտահայտություն)",
    tables: [
      {
        verb: "Irse (գնալ/հեռանալ) Conjugation",
        translation: "Irse բայի խոնարհումը",
        type: "afirmativo",
        headers: ["Անձ", "Դրական (Afirmativo)", "Ժխտական (Negativo)"],
        rows: [
          { person: "tú", form: "vete", translation: "no te vayas (մի՛ գնա / մի՛ հեռացիր)" },
          { person: "usted", form: "váyase", translation: "no se vaya (հեռացեք, խնդրում եմ)" },
          { person: "nosotros/as", form: "vámonos", translation: "no nos vayamos (եկեք դեռ չգնանք)" },
          { person: "vosotros/as", form: "idos / marchaos", translation: "no os vayáis" },
          { person: "ustedes", form: "váyanse", translation: "no se vayan" }
        ]
      }
    ],
    examples: [
      { spanish: "Vete a casa.", armenian: "Գնա տուն / հեռացիր տուն:" },
      { spanish: "No te vayas.", armenian: "Մի՛ գնա / մի՛ հեռացիր:" },
      { spanish: "Vámonos.", armenian: "Գնանք:" },
      { spanish: "No nos vayamos todavía.", armenian: "Եկեք դեռ չգնանք:" },
      { spanish: "Váyase, por favor.", armenian: "Հեռացեք, խնդրում եմ:" }
    ]
  },
  {
    id: 27,
    title: "27. Քաղաքավարի Imperativo",
    category: "situational",
    shortDesc: "Ինչպես հնչել քաղաքավարի՝ օգտագործելով usted / ustedes և 'por favor':",
    theoryText: "Քաղաքավարի խոսքում հաճախ օգտագործում ենք **usted / ustedes** ձևերը, իսկ կոպիտ չհնչելու համար ավելացնում ենք **por favor** (խնդրում եմ):",
    examples: [
      { spanish: "Pase, por favor.", armenian: "Անցե՛ք / ներս եկեք, խնդրում եմ:" },
      { spanish: "Espere un momento, por favor.", armenian: "Սպասե՛ք մի պահ, խնդրում եմ:" },
      { spanish: "Escriba su nombre aquí.", armenian: "Գրե՛ք Ձեր անունը այստեղ:" },
      { spanish: "Firme aquí, por favor.", armenian: "Ստորագրե՛ք այստեղ, խնդրում եմ:" },
      { spanish: "Siéntese aquí.", armenian: "Նստե՛ք այստեղ:" },
      { spanish: "No se preocupe.", armenian: "Մի՛ անհանգստացեք:" },
      { spanish: "No hable tan rápido.", armenian: "Այդքան արագ մի՛ խոսեք:" },
      { spanish: "Muéstreme su pasaporte, por favor.", armenian: "Ցույց տվեք ինձ Ձեր անձնագիրը, խնդրում եմ:" }
    ]
  },
  {
    id: 28,
    title: "28. Imperativo օդանավակայանում",
    category: "situational",
    shortDesc: "Օդանավակայանում հաճախ հանդիպող հրամայական արտահայտությունները:",
    theoryText: "Օդանավակայանի անձնակազմի կամ ցուցանակների կողմից տրվող հրահանգներ.",
    examples: [
      { spanish: "Muestre su pasaporte, por favor.", armenian: "Ցույց տվեք Ձեր անձնագիրը, խնդրում եմ:" },
      { spanish: "Ponga la maleta aquí.", armenian: "Դրեք ճամպրուկը այստեղ:" },
      { spanish: "Espere aquí.", armenian: "Սպասեք այստեղ:" },
      { spanish: "Siga recto.", armenian: "Ողիղ գնացեք (շարունակեք ուղիղ):" },
      { spanish: "No deje su equipaje solo.", armenian: "Ձեր ուղեբեռը մենակ մի՛ թողեք:" },
      { spanish: "Abra la mochila.", armenian: "Բացեք ուսապարկը:" }
    ]
  },
  {
    id: 29,
    title: "29. Imperativo հյուրանոցում",
    category: "situational",
    shortDesc: "Հյուրանոցի ընդունարանում և սպասարկման ժամանակ օգտագործվող արտահայտություններ:",
    theoryText: "Հյուրանոցում գրանցվելու կամ սպասարկող անձնակազմի հետ խոսելիս.",
    examples: [
      { spanish: "Deme la llave, por favor.", armenian: "Տվեք ինձ բանալին, խնդրում եմ:" },
      { spanish: "Suba al tercer piso.", armenian: "Բարձրացեք երրորդ հարկ:" },
      { spanish: "Espere un momento.", armenian: "Սպասեք մի պահ:" },
      { spanish: "Firme aquí.", armenian: "Ստորագրեք այստեղ:" },
      { spanish: "No pierda la tarjeta.", armenian: "Քարտը (բանալի-քարտը) մի՛ կորցրեք:" },
      { spanish: "Llame a recepción.", armenian: "Զանգահարեք ընդունարան:" }
    ]
  },
  {
    id: 30,
    title: "30. Imperativo ռեստորանում",
    category: "situational",
    shortDesc: "Ռեստորանում պատվեր կատարելու կամ մատուցողին դիմելու հրամայականները:",
    theoryText: "Ռեստորանում մատուցողին դիմելու կամ ուտելիքի հետ կապված հանձնարարականներ.",
    examples: [
      { spanish: "Traiga la carta, por favor.", armenian: "Բերեք ճաշացանկը, խնդրում եմ:" },
      { spanish: "Deme agua sin gas.", armenian: "Տվեք ինձ առանց գազի ջուր:" },
      { spanish: "Espere un momento.", armenian: "Սպասեք մի պահ:" },
      { spanish: "Pruebe este plato.", armenian: "Փորձեք այս ուտեստը:" },
      { spanish: "No coma rápido.", armenian: "Արագ մի՛ կերեք:" },
      { spanish: "Pida la cuenta.", armenian: "Խնդրեք հաշիվը (պատվիրեք հաշիվը):" }
    ]
  },
  {
    id: 31,
    title: "31. Imperativo խանութում",
    category: "situational",
    shortDesc: "Գնումներ կատարելիս, փորձասենյակում կամ դրամարկղի մոտ օգտագործվող խոսքը:",
    theoryText: "Խանութում ապրանքներ ընտրելիս կամ վաճառողի հետ հաղորդակցվելիս.",
    examples: [
      { spanish: "Mire esta camisa.", armenian: "Նայեք այս վերնաշապիկը:" },
      { spanish: "Pruébese este vestido.", armenian: "Փորձեք (ձեզ վրա) այս զգեստը:" },
      { spanish: "Pague en caja.", armenian: "Վճարեք դրամարկղում:" },
      { spanish: "Deme otra talla, por favor.", armenian: "Տվեք ինձ ուրիշ չափս, խնդրում եմ:" },
      { spanish: "No compre eso.", armenian: "Դա մի՛ գնեք:" },
      { spanish: "Pregunte el precio.", armenian: "Հարցրեք գինը:" }
    ]
  },
  {
    id: 32,
    title: "32. Ամենօրյա Imperativo օրինակներ",
    category: "situational",
    shortDesc: "Տանը, դասարանում կամ դրսում ամեն օր հնչող կարճ ու օգտակար հրամաններ:",
    theoryText: "Ամենօրյա կյանքում, դպրոցում, տանը հանդիպող հրամայական խոսք.",
    examples: [
      { spanish: "Escucha.", armenian: "Լսիր:" },
      { spanish: "Repite.", armenian: "Կրկնիր:" },
      { spanish: "Lee el texto.", armenian: "Կարդա տեքստը:" },
      { spanish: "Escribe la respuesta.", armenian: "Գրիր պատասխանը:" },
      { spanish: "Abre el libro.", armenian: "Բացիր գիրքը:" },
      { spanish: "Cierra la puerta.", armenian: "Փակիր դուռը:" },
      { spanish: "Mira aquí.", armenian: "Նայիր այստեղ:" },
      { spanish: "Ven conmigo.", armenian: "Արի ինձ հետ:" },
      { spanish: "No corras.", armenian: "Մի՛ վազիր:" },
      { spanish: "No grites.", armenian: "Մի՛ գոռա:" },
      { spanish: "No tengas miedo.", armenian: "Մի՛ վախեցիր:" },
      { spanish: "No llegues tarde.", armenian: "Ուշ մի՛ հասիր (ուշ մի՛ ուշացիր):" }
    ]
  },
  {
    id: 33,
    title: "33. Imperativo և “por favor”",
    category: "situational",
    shortDesc: "Հրամայականի մեղմացումը «խնդրում եմ» արտահայտությամբ կապված քաղաքավարության հետ:",
    theoryText: "Իսպաներենում հրամայականը կարող է կոպիտ հնչել, եթե շատ ուղիղ ասենք (հատկապես անծանոթի հետ):\n\nՔաղաքավարի դարձնելու համար ավելացնում ենք **por favor** (խնդրում եմ):\n\n*   **Dame agua.** (Տուր ինձ ջուր:)\n*   Ավելի քաղաքավարի՝ **Dame agua, por favor.** (Տուր ինձ ջուր, խնդրում եմ:)\n*   Ավելի հարգալից՝ **Deme agua, por favor.** (Տվեք ինձ ջուր, խնդրում եմ:)",
    examples: [
      { spanish: "Dame agua.", armenian: "Տուր ինձ ջուր: (Ուղիղ/ընկերական)" },
      { spanish: "Dame agua, por favor.", armenian: "Տուր ինձ ջուր, խնդրում եմ: (Քաղաքավարի)" },
      { spanish: "Deme agua, por favor.", armenian: "Տվեք ինձ ջուր, խնդրում եմ: (Հարգալից)" }
    ]
  },
  {
    id: 34,
    title: "34. Imperativo և poder",
    category: "situational",
    shortDesc: "Հարցական «Poder» բային դիմելը ավելի մեղմ և նուրբ խնդրանքների համար:",
    theoryText: "Երբեմն ուղիղ հրամայականի փոխարեն ավելի քաղաքավարի է օգտագործել **poder** (կարողանալ) բայը հարցականով.\n\n*   **Abre la ventana.** (Բացիր պատուհանը:)\n*   Ավելի մեղմ՝ **¿Puedes abrir la ventana?** (Կարո՞ղ ես բացել պատուհանը:)\n*   Հարգալից՝ **¿Puede abrir la ventana, por favor?** (Կարո՞ղ եք բացել պատուհանը, խնդրում եմ:)",
    examples: [
      { spanish: "Abre la ventana.", armenian: "Բացիր պատուհանը: (Հրամայական)" },
      { spanish: "¿Puedes abrir la ventana?", armenian: "Կարո՞ղ ես բացել պատուհանը: (Մեղմ ընկերական)" },
      { spanish: "¿Puede abrir la ventana, por favor?", armenian: "Կարո՞ղ եք բացել պատուհանը, խնդրում եմ: (Հարգալից)" }
    ]
  },
  {
    id: 35,
    title: "35. Փոքրիկ դիալոգ Imperativo-ով",
    category: "situational",
    shortDesc: "Իրական դիալոգ ուսուցչուհու և աշակերտների միջև՝ հրամայական ձևերի կիրառմամբ:",
    theoryText: "Կարդացեք և լսեք այս գեղեցիկ երկխոսությունը, որտեղ ուսուցչուհին (Profesora) հանձնարարություններ է տալիս Կառլոսին (Carlos) և Լուսիային (Lucía):",
    dialogue: {
      titleEs: "Diálogo en clase de español",
      titleHy: "Երկխոսություն իսպաներենի դասարանում",
      lines: [
        { speaker: "Profesora", textEs: "Carlos, lee el texto, por favor.", textHy: "Կառլոս, կարդա տեքստը, խնդրում եմ։" },
        { speaker: "Carlos", textEs: "Sí, profesora.", textHy: "Այո, ուսուցչուհի։" },
        { speaker: "Profesora", textEs: "Lucía, escucha y escribe las palabras nuevas.", textHy: "Լուսիա, լսիր և գրիր նոր բառերը։" },
        { speaker: "Lucía", textEs: "De acuerdo.", textHy: "Լավ։" },
        { speaker: "Profesora", textEs: "Chicos, no habléis muy alto. Trabajad juntos y preguntad si no entendéis.", textHy: "Երեխաներ, շատ բարձր մի՛ խոսեք։ Աշխատեք միասին և հարցրեք, եթե չեք հասկանում։" },
        { speaker: "Carlos", textEs: "Profesora, no entiendo esta palabra.", textHy: "Ուսուցչուհի, ես այս բառը չեմ հասկանում։" },
        { speaker: "Profesora", textEs: "Pregúntame. No tengas miedo.", textHy: "Հարցրու ինձ։ Մի՛ վախեցիր։" }
      ]
    }
  },
  {
    id: 36,
    title: "36. Վարժություններ",
    category: "exercises",
    shortDesc: "Ստուգեք Ձեր գիտելիքները 3 ինտերակտիվ վարժություններով (դրական, ժխտական, թարգմանություն):",
    theoryText: "Այստեղ ներկայացված են նյութի երեք վարժությունները: Կարող եք դրանք լրացնել ինտերակտիվ տարբերակով ներքևում գտնվող **«Թեստեր»** բաժնում:\n\n**Վարժություն 1. Դարձրու դրական Imperativo**\n1. hablar — tú → *habla*\n2. comer — tú → *come*\n3. escribir — tú → *escribe*\n4. abrir — usted → *abra*\n5. estudiar — ustedes → *estudien*\n6. leer — vosotros → *leed*\n7. vivir — nosotros → *vivamos*\n\n**Վարժություն 2. Դարձրու ժխտական Imperativo**\n1. hablar — tú → *no hables*\n2. comer — tú → *no comas*\n3. escribir — tú → *no escribas*\n4. abrir — usted → *no abra*\n5. estudiar — ustedes → *no estudien*\n6. ir — tú → *no vayas*\n7. decir — tú → *no digas*\n\n**Վարժություն 3. Թարգմանիր իսպաներեն**\n1. Խոսիր ավելի դանդաղ: → *Habla más despacio.*\n2. Մի՛ խոսիր այդքան արագ: → *No hables tan rápido.*\n3. Գրի՛ր պատասխանը: → *Escribe la respuesta.*\n4. Մի՛ գրիր այստեղ: → *No escribas aquí.*\n5. Արի այստեղ: → *Ven aquí.*\n6. Մի՛ գնա այնտեղ: → *No vayas allí.*\n7. Տուր դա ինձ: → *Dámelo.*\n8. Մի՛ տուր դա ինձ: → *No me lo des.*\n9. Վեր կաց շուտ: → *Levántate temprano.*\n10. Ուշ մի՛ պառկիր: → *No te acuestes tarde.*"
  },
  {
    id: 37,
    title: "37. Ամենակարճ ամփոփում",
    category: "summary",
    shortDesc: "Արագ հուշաթերթիկ՝ հիմնական կանոններով և դերանունների դիրքերով:",
    theoryText: "**Imperativo afirmativo — արա՛**\n*   *Habla.* — խոսիր\n*   *Come.* — կեր\n*   *Escribe.* — գրիր\n*   *Ven.* — արի\n*   *Haz.* — արա\n*   *Di.* — ասա\n\n**Imperativo negativo — մի՛ արա**\n*   *No hables.* — մի՛ խոսիր\n*   *No comas.* — մի՛ կեր\n*   *No escribas.* — մի՛ գրիր\n*   *No vengas.* — մի՛ արի\n*   *No hagas.* — մի՛ արա\n*   *No digas.* — մի՛ ասա\n\n**Դերանունների դիրքը.**\n*   **Դրականում** դերանունը **վերջում** է. *Dímelo.* (Ասա դա ինձ:)\n*   **Ժխտականում** դերանունը **առաջ** է. *No me lo digas.* (Դա ինձ մի՛ ասա:)\n\n**Անձնային սահմանափակում.**\n*   **Yo ձև չկա**, բայց **nosotros կա** (եկեք անենք).\n    *   *Hablemos.* — Եկեք խոսենք:\n    *   *No hablemos.* — Եկեք չխոսենք:"
  }
];

export const EXERCISE_SECTIONS: ExerciseSection[] = [
  {
    id: 1,
    title: "Վարժություն 1. Դարձրու դրական Imperativo",
    description: "Դարձրեք տրված բայերը դրական հրամայականի համապատասխան անձի ձևով:",
    questions: [
      { id: "ex1_1", question: "hablar — tú", correctAnswer: "habla", hint: "él / ella / usted ձևի նման" },
      { id: "ex1_2", question: "comer — tú", correctAnswer: "come", hint: "él / ella / usted ձևի նման" },
      { id: "ex1_3", question: "escribir — tú", correctAnswer: "escribe", hint: "él / ella / usted ձևի նման" },
      { id: "ex1_4", question: "abrir — usted", correctAnswer: "abra", hint: "-AR -> -e, -ER/-IR -> -a հակառակ վերջավորություն" },
      { id: "ex1_5", question: "estudiar — ustedes", correctAnswer: "estudien", hint: "Usted ձևին ավելացնել -n" },
      { id: "ex1_6", question: "leer — vosotros", correctAnswer: "leed", hint: "infinitivo-ի վերջի -r-ը փոխվում է -d-ի" },
      { id: "ex1_7", question: "vivir — nosotros", correctAnswer: "vivamos", hint: "-IR բայի համար nosotros hակառակ ձևը (-amos)" }
    ]
  },
  {
    id: 2,
    title: "Վարժություն 2. Դարձրու ժխտական Imperativo",
    description: "Դարձրեք տրված բայերը ժխտական հրամայականի (չմոռանաք գրել 'no' բառը):",
    questions: [
      { id: "ex2_1", question: "hablar — tú", correctAnswer: "no hables", hint: "no + hablar-ի Subjuntivo tú ձևը" },
      { id: "ex2_2", question: "comer — tú", correctAnswer: "no comas", hint: "no + comer-ի Subjuntivo tú ձևը" },
      { id: "ex2_3", question: "escribir — tú", correctAnswer: "no escribas", hint: "no + escribir-ի Subjuntivo tú ձևը" },
      { id: "ex2_4", question: "abrir — usted", correctAnswer: "no abra", hint: "no + abrir-ի Subjuntivo usted ձևը" },
      { id: "ex2_5", question: "estudiar — ustedes", correctAnswer: "no estudien", hint: "no + estudiar-ի Subjuntivo ustedes ձևը" },
      { id: "ex2_6", question: "ir — tú", correctAnswer: "no vayas", hint: "ir բայի անկանոն ժխտական ձևը" },
      { id: "ex2_7", question: "decir — tú", correctAnswer: "no digas", hint: "decir բայի անկանոն ժխտական ձևը (digo-ից)" }
    ]
  },
  {
    id: 3,
    title: "Վարժություն 3. Թարգմանիր իսպաներեն",
    description: "Թարգմանեք նախադասությունները իսպաներեն հրամայականով:",
    questions: [
      { id: "ex3_1", question: "Խոսիր ավելի դանդաղ։", correctAnswer: "Habla más despacio.", hint: "Խոսել = hablar (tú), ավելի դանդաղ = más despacio" },
      { id: "ex3_2", question: "Մի՛ խոսիր այդքան արագ։", correctAnswer: "No hables tan rápido.", hint: "Մի՛ խոսիր = no hables, այդքան արագ = tan rápido" },
      { id: "ex3_3", question: "Գրի՛ր պատասխանը։", correctAnswer: "Escribe la respuesta.", hint: "Գրել = escribir (tú), պատասխանը = la respuesta" },
      { id: "ex3_4", question: "Մի՛ գրիր այստեղ։", correctAnswer: "No escribas aquí.", hint: "Մի՛ գրիր = no escribas, այստեղ = aquí" },
      { id: "ex3_5", question: "Արի այստեղ։", correctAnswer: "Ven aquí.", hint: " venir բայի անկանոն ձևը" },
      { id: "ex3_6", question: "Այնտեղ մի՛ գնա։", correctAnswer: "No vayas allí.", hint: "գնալ = ir (tú), այնտեղ = allí" },
      { id: "ex3_7", question: "Տուր դա ինձ։", correctAnswer: "Dámelo.", hint: "da (տուր) + me (ինձ) + lo (դա)" },
      { id: "ex3_8", question: "Դա ինձ մի՛ տուր։", correctAnswer: "No me lo des.", hint: "no + me (ինձ) + lo (դա) + des" },
      { id: "ex3_9", question: "Վեր կաց շուտ։", correctAnswer: "Levántate temprano.", hint: "levantarse (tú) = levántate, շուտ/կանուխ = temprano" },
      { id: "ex3_10", question: "Ուշ մի՛ պառկիր։", correctAnswer: "No te acuestes tarde.", hint: "acostarse (tú) = no te acuestes, ուշ = tarde" }
    ]
  }
];

export const SANDBOX_VERBS = [
  {
    infinitive: "hablar",
    meaning: "խոսել",
    stemChange: "ոչ",
    afirmativo: { tú: "habla", usted: "hable", nosotros: "hablemos", vosotros: "hablad", ustedes: "hablen" },
    negativo: { tú: "no hables", usted: "no hable", nosotros: "no hablemos", vosotros: "no habléis", ustedes: "no hablen" }
  },
  {
    infinitive: "comer",
    meaning: "ուտել",
    stemChange: "ոչ",
    afirmativo: { tú: "come", usted: "coma", nosotros: "comamos", vosotros: "comed", ustedes: "coman" },
    negativo: { tú: "no comas", usted: "no coma", nosotros: "no comamos", vosotros: "no comáis", ustedes: "no coman" }
  },
  {
    infinitive: "vivir",
    meaning: "ապրել",
    stemChange: "ոչ",
    afirmativo: { tú: "vive", usted: "viva", nosotros: "vivamos", vosotros: "vivid", ustedes: "vivan" },
    negativo: { tú: "no vivas", usted: "no viva", nosotros: "no vivamos", vosotros: "no viváis", ustedes: "no vivan" }
  },
  {
    infinitive: "pensar",
    meaning: "մտածել",
    stemChange: "E -> IE",
    afirmativo: { tú: "piensa", usted: "piense", nosotros: "pensemos", vosotros: "pensad", ustedes: "piensen" },
    negativo: { tú: "no pienses", usted: "no piense", nosotros: "no pensemos", vosotros: "no penséis", ustedes: "no piensen" }
  },
  {
    infinitive: "pedir",
    meaning: "խնդրել",
    stemChange: "E -> I",
    afirmativo: { tú: "pide", usted: "pida", nosotros: "pidamos", vosotros: "pedid", ustedes: "pidan" },
    negativo: { tú: "no pidas", usted: "no pida", nosotros: "no pidamos", vosotros: "no pidáis", ustedes: "no pidan" }
  },
  {
    infinitive: "dormir",
    meaning: "քնել",
    stemChange: "O -> UE",
    afirmativo: { tú: "duerme", usted: "duerma", nosotros: "durmamos", vosotros: "dormid", ustedes: "duerman" },
    negativo: { tú: "no duermas", usted: "no duerma", nosotros: "no durmamos", vosotros: "no dormáis", ustedes: "no duerman" }
  },
  {
    infinitive: "decir",
    meaning: "ասել (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "di", usted: "diga", nosotros: "digamos", vosotros: "decid", ustedes: "digan" },
    negativo: { tú: "no digas", usted: "no diga", nosotros: "no digamos", vosotros: "no digáis", ustedes: "no digan" }
  },
  {
    infinitive: "hacer",
    meaning: "անել (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "haz", usted: "haga", nosotros: "hagamos", vosotros: "haced", ustedes: "hagan" },
    negativo: { tú: "no hagas", usted: "no haga", nosotros: "no hagamos", vosotros: "no hagáis", ustedes: "no hagan" }
  },
  {
    infinitive: "ir",
    meaning: "գնալ (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "ve", usted: "vaya", nosotros: "vayamos", vosotros: "id", ustedes: "vayan" },
    negativo: { tú: "no vayas", usted: "no vaya", nosotros: "no vayamos", vosotros: "no vayáis", ustedes: "no vayan" }
  },
  {
    infinitive: "poner",
    meaning: "դնել (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "pon", usted: "ponga", nosotros: "pongamos", vosotros: "poned", ustedes: "pongan" },
    negativo: { tú: "no pongas", usted: "no ponga", nosotros: "no pongamos", vosotros: "no pongáis", ustedes: "no pongan" }
  },
  {
    infinitive: "salir",
    meaning: "դուրս գալ (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "sal", usted: "salga", nosotros: "salgamos", vosotros: "salid", ustedes: "salgan" },
    negativo: { tú: "no salgas", usted: "no salga", nosotros: "no salgamos", vosotros: "no salgáis", ustedes: "no salgan" }
  },
  {
    infinitive: "ser",
    meaning: "լինել (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "sé", usted: "sea", nosotros: "seamos", vosotros: "sed", ustedes: "sean" },
    negativo: { tú: "no seas", usted: "no sea", nosotros: "no seamos", vosotros: "no seáis", ustedes: "no sean" }
  },
  {
    infinitive: "tener",
    meaning: "ունենալ (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "ten", usted: "tenga", nosotros: "tengamos", vosotros: "tened", ustedes: "tengan" },
    negativo: { tú: "no tengas", usted: "no tenga", nosotros: "no tengamos", vosotros: "no tengáis", ustedes: "no tengan" }
  },
  {
    infinitive: "venir",
    meaning: "գալ (Անկանոն)",
    stemChange: "լրիվ անկանոն",
    afirmativo: { tú: "ven", usted: "venga", nosotros: "vengamos", vosotros: "venid", ustedes: "vengan" },
    negativo: { tú: "no vengas", usted: "no venga", nosotros: "no vengamos", vosotros: "no vengáis", ustedes: "no vengan" }
  }
];
