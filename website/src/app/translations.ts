export type Lang = "en" | "es";

export const t = {
  nav: {
    howItWorks: { en: "How it works", es: "Como funciona" },
    features: { en: "Features", es: "Funciones" },
    whyXaut: { en: "Why XAU\u20AE", es: "Por que XAU\u20AE" },
    cta: { en: "Start Saving \u2192", es: "Empieza a Ahorrar \u2192" },
    ctaMobile: { en: "Get Started \u2192", es: "Empezar \u2192" },
  },

  hero: {
    headline: {
      en: "Gold savings while you sleep.",
      es: "Ahorra en oro mientras duermes.",
    },
    sub: {
      en: "Set your rules once. Auric watches XAU\u20AE markets and acts when your conditions are met \u2014 no charts, no alerts, no manual trades.",
      es: "Define tus reglas una vez. Auric monitorea XAU\u20AE y actua cuando se cumplen tus condiciones \u2014 sin graficos, sin alertas, sin trades manuales.",
    },
    cta: { en: "Start Saving", es: "Empieza a Ahorrar" },
  },

  features: {
    label: { en: "Features", es: "Funciones" },
    heading: {
      en: "Everything to automate your gold savings.",
      es: "Todo para automatizar tu ahorro en oro.",
    },

    dca: {
      title: { en: "DCA schedules", es: "Compras programadas" },
      desc: {
        en: "Pick an amount and a rhythm. Auric buys Tether Gold at your cadence \u2014 your gold position grows whether you check it or not.",
        es: "Elige un monto y un ritmo. Auric compra Tether Gold por ti \u2014 tu oro crece sin que estes pendiente.",
      },
      check1: {
        en: "Weekly, bi-weekly, or monthly \u2014 your choice",
        es: "Semanal, quincenal o mensual \u2014 tu decides",
      },
      check2: {
        en: "Runs silently on autopilot \u2014 you're notified after each buy",
        es: "Funciona solo \u2014 te avisa despues de cada compra",
      },
      check3: {
        en: "Adjust or pause any time from Telegram",
        es: "Ajusta o pausa cuando quieras desde Telegram",
      },
    },

    priceTrigger: {
      title: { en: "Price Triggers", es: "Disparadores de precio" },
      desc: {
        en: "Define a dip threshold and Auric buys the moment XAU\u20AE hits it. Act on dips without watching charts.",
        es: "Define un precio y Auric compra cuando XAU\u20AE lo toque. Aprovecha bajadas sin mirar graficos.",
      },
      check1: {
        en: "Set any price level as your trigger",
        es: "Configura cualquier precio como disparador",
      },
      check2: {
        en: "Instant settlement through Tether's infrastructure",
        es: "Liquidacion instantanea via infraestructura de Tether",
      },
      check3: {
        en: "Set multiple triggers, each with its own buy amount",
        es: "Multiples disparadores, cada uno con su monto",
      },
    },

    goal: {
      title: { en: "Goal-based saving", es: "Ahorro por meta" },
      desc: {
        en: "Set a target in XAU\u20AE \u2014 say, 1 oz of gold \u2014 and let Auric accumulate until you reach it.",
        es: "Fija una meta en XAU\u20AE \u2014 digamos, 1 oz \u2014 y deja que Auric acumule hasta llegar.",
      },
      check1: {
        en: "Target in XAU\u20AE or USD equivalent",
        es: "Meta en XAU\u20AE o equivalente en USD",
      },
      check2: {
        en: "Tracks progress in real time",
        es: "Sigue tu progreso en tiempo real",
      },
      check3: {
        en: "Notifies you the moment you hit your goal",
        es: "Te avisa cuando alcances tu meta",
      },
    },

    smartDca: {
      title: { en: "Smart DCA", es: "DCA inteligente" },
      desc: {
        en: "Same schedule, smarter sizing. Auric checks market conditions before each buy \u2014 if gold dipped, it buys more. If the price ran past your average, it dials back.",
        es: "Mismo calendario, mejor ejecucion. Auric revisa el mercado antes de cada compra \u2014 si el oro bajo, compra mas. Si el precio supero tu promedio, reduce el monto.",
      },
      check1: {
        en: "Adjusts buy size based on market conditions at execution time",
        es: "Ajusta el monto segun las condiciones del mercado al momento de ejecutar",
      },
      check2: {
        en: "Buys more on red days, less when price is above your average",
        es: "Compra mas en dias rojos, menos cuando el precio supera tu promedio",
      },
      check3: {
        en: "Same schedule, same budget ceiling \u2014 just better entries",
        es: "Mismo calendario, mismo presupuesto \u2014 mejores puntos de entrada",
      },
    },

    telegram: {
      title: { en: "Telegram interface", es: "Interfaz en Telegram" },
      desc: {
        en: "Everything lives in Telegram. Define rules, check your balance, and get execution confirmations \u2014 no app needed.",
        es: "Todo vive en Telegram. Define reglas, consulta saldo y recibe confirmaciones \u2014 sin otra app.",
      },
      check1: {
        en: "Guided setup in under 2 minutes",
        es: "Setup guiado en menos de 2 minutos",
      },
      check2: {
        en: "Instant notifications on every execution",
        es: "Notificacion instantanea en cada ejecucion",
      },
      check3: {
        en: "/status, /pause, /history, /withdraw commands",
        es: "Comandos /status, /pause, /history, /withdraw",
      },
    },
  },

  whyXaut: {
    heading: {
      en: "The next step beyond USDT in Latin America.",
      es: "El siguiente paso despues del USDT en Latinoamerica.",
    },
    body: {
      en: "If you've ever converted pesos, bolivares, or soles to USDT to protect your savings, you already understand why gold matters. XAU\u20AE is gold-backed, borderless, and settled on-chain.",
      es: "Si alguna vez pasaste pesos, bolivares o soles a USDT para proteger tus ahorros, ya sabes por que el oro importa. XAU\u20AE: respaldado por oro fisico, sin fronteras, liquidado on-chain.",
    },
    bodyHighlight: {
      en: "Auric automates this, so your gold position grows while you focus on other things.",
      es: "Auric lo automatiza. Tu oro crece mientras vos haces otra cosa.",
    },
  },

  howItWorks: {
    label: { en: "How it works", es: "Como funciona" },
    heading1: { en: "Set it up once.", es: "Configura una vez." },
    heading2: { en: "Let it compound.", es: "Deja que crezca." },

    step1: {
      title: { en: "Define your rules", es: "Define tus reglas" },
      desc: {
        en: "Tell Auric what you want \u2014 a schedule, a price target, or a goal. It does exactly that.",
        es: "Dile a Auric que quieres \u2014 frecuencia, precio o meta. Hace exactamente eso.",
      },
    },
    step2: {
      title: { en: "Fund your wallet", es: "Fondea tu wallet" },
      desc: {
        en: "Self-custodial from day one. Your seed phrase stays with you \u2014 private keys are derived on-demand and never stored.",
        es: "Auto-custodia desde el dia uno. Tu seed phrase es solo tuya \u2014 las llaves privadas nunca se almacenan.",
      },
    },
    step3: {
      title: { en: "Auric runs", es: "Auric ejecuta" },
      desc: {
        en: "Auric monitors XAU\u20AE conditions continuously, evaluates your rules, and settles through Tether's infrastructure. You just watch it grow.",
        es: "Auric monitorea XAU\u20AE, evalua tus reglas y liquida via Tether. Solo mira como crece.",
      },
    },
  },

  cta: {
    heading: {
      en: "Start building your gold position.",
      es: "Empieza a acumular oro.",
    },
    body: {
      en: "Launching with 50 early users. Request access.",
      es: "Lanzando con 50 usuarios iniciales. Solicita acceso.",
    },
    button: { en: "Go to App", es: "Ir a la App" },
  },

  footer: {
    byline: { en: "By TNT Labs", es: "Por TNT Labs" },
    hackathon: {
      en: "Tether Gold DCA Engine Hackathon",
      es: "Tether Gold DCA Engine Hackathon",
    },
  },
} as const;
