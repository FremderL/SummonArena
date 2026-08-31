const abilityCatalog = require('./abilityCatalog');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function getAbilities(ids) {
  return ids
    .map((id) => abilityCatalog.find((ability) => ability.id === id))
    .filter(Boolean)
    .map((ability) => clone(ability));
}

module.exports = [
  {
    id: 'aurelion_eclipse',
    order: 1,
    name: 'Aurelion, Custodio del Eclipse',
    title: 'Custodio del Eclipse',
    race: 'Serafines del Velo',
    pantheon: 'Helion',
    bossMechanic: 'anti_defense',
    invocationView: 'Nuestra invocacion vio en Aurelion a un custodio que no quiso abandonar su puesto cuando el cielo se partio. Lo que queda de su luz ya no protege: ahora juzga.',
    rank: 'legendario',
    archetype: 'mistica',
    image: 'assets/creatures/aurelion_eclipse.png',
    lore: 'El guardian que vigila el borde entre las constelaciones y la fractura. Donde posa su mirada, la defensa del enemigo se deshace.',
    vida: 84,
    ataque: 18,
    defensa: 12,
    regen: 4,
    abilities: getAbilities(['muroAstral', 'eclipseDebilitante', 'coronaDelEclipse']),
    bossPhases: [
      {
        key: 'dictamen',
        label: 'Dictamen Astral',
        pattern: [
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Levantara un muro estelar para absorber el siguiente intercambio.' },
          { type: 'ABILITY', abilityId: 'eclipseDebilitante', intent: 'Apagara tu poder y reducira tu ataque.' },
          { type: 'ATTACK', intent: 'Lanzara una estocada precisa para medir tus defensas.' },
          { type: 'ABILITY', abilityId: 'coronaDelEclipse', intent: 'Descendera con su Corona del Eclipse para dejarte Expuesto.' }
        ]
      },
      {
        key: 'totalidad',
        label: 'Totalidad del Eclipse',
        triggerBelowPct: 0.45,
        announce: 'El eclipse se cierra. Aurelion entra en su fase final.',
        pattern: [
          { type: 'ABILITY', abilityId: 'coronaDelEclipse', intent: 'Caera con un golpe pesado que fracturara tu defensa.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Abrira una fisura arcana para dejarte aun mas Expuesto.' },
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Se blindara antes de rematar el duelo.' },
          { type: 'ATTACK', intent: 'Buscara un impacto directo mientras el eclipse sigue cerrandose.' }
        ]
      }
    ]
  },
  {
    id: 'nyxar_abyss',
    order: 4,
    name: 'Nyxar, Hambre de la Fosa',
    title: 'Hambre de la Fosa',
    race: 'Leviatanes de la Fosa',
    pantheon: 'Vorath',
    bossMechanic: 'anti_recover',
    invocationView: 'Las invocaciones del abismo cuentan que Nyxar no nacio maldito, sino hambriento. Cuando el mundo cayo, fue el primero en descubrir que la ruina tambien alimenta.',
    rank: 'mitico',
    archetype: 'vampirica',
    image: 'assets/creatures/Void_Leviathan.png',
    lore: 'Una boca imposible nacida donde el mar toca el vacio. Cada herida que abre se convierte en alimento para la fosa.',
    vida: 92,
    ataque: 19,
    defensa: 9,
    regen: 3,
    abilities: getAbilities(['sangreAbierta', 'golpeVoraz', 'mareaVoraz', 'rabiaPrimordial']),
    bossPhases: [
      {
        key: 'acecho',
        label: 'Acecho Abisal',
        pattern: [
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Abrira tus defensas y te dejara Sangrando.' },
          { type: 'ATTACK', intent: 'Mordera de frente para acercarte al borde.' },
          { type: 'ABILITY', abilityId: 'golpeVoraz', intent: 'Tragara tu fuerza para recuperar vida.' },
          { type: 'DEFEND', intent: 'Replegara sus escamas antes del siguiente festin.' }
        ]
      },
      {
        key: 'hambruna',
        label: 'Hambruna Primordial',
        triggerBelowPct: 0.4,
        announce: 'Nyxar ruge desde la fosa. La hambruna primordial ha despertado.',
        pattern: [
          { type: 'ABILITY', abilityId: 'mareaVoraz', intent: 'Desatara una marea voraz que roba vida y profundiza el Sangrado.' },
          { type: 'ATTACK', intent: 'Embestira sin descanso mientras la hambruna lo potencia.' },
          { type: 'ABILITY', abilityId: 'golpeVoraz', intent: 'Intentara sellar el duelo absorbiendo tu vida restante.' },
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Volvera a abrir la herida para mantener la presion.' }
        ]
      }
    ]
  },
  {
    id: 'solara_regente',
    order: 3,
    name: 'Solara, Regente Cenital',
    title: 'Regente Cenital',
    race: 'Fenix del Cenit',
    pantheon: 'Helion',
    bossMechanic: 'anti_recover',
    invocationView: 'Para nuestras criaturas, Solara es la prueba de que hasta el renacer puede corromperse. Sus llamas todavia recuerdan el calor del santuario, pero ya solo traen desgaste.',
    rank: 'legendario',
    archetype: 'support',
    image: 'assets/creatures/Sunflare_Phoenix.png',
    lore: 'Una soberana de brasas que cae como aurora sobre la arena. Cada renacer suyo convierte la pelea en una prueba de resistencia.',
    vida: 88,
    ataque: 17,
    defensa: 10,
    regen: 5,
    abilities: getAbilities(['llamaAgonica', 'pulsoVital', 'renacerSolar', 'auraDeSosten']),
    bossPhases: [
      {
        key: 'ascenso',
        label: 'Ascenso Solar',
        pattern: [
          { type: 'ABILITY', abilityId: 'llamaAgonica', intent: 'Cubrirá la arena con fuego y reducira tu recuperacion.' },
          { type: 'ABILITY', abilityId: 'pulsoVital', intent: 'Canalizara un pulso vital para sostenerse varios turnos.' },
          { type: 'ATTACK', intent: 'Golpeara con alas de brasas para mantener la presion.' },
          { type: 'DEFEND', intent: 'Tomara altura mientras prepara otro descenso.' }
        ]
      },
      {
        key: 'renacer',
        label: 'Renacer Cenital',
        triggerBelowPct: 0.35,
        announce: 'Solara prende el cielo. El renacer cenital acaba de comenzar.',
        pattern: [
          { type: 'ABILITY', abilityId: 'renacerSolar', intent: 'Renacera entre llamas, curandose y alzando un escudo.' },
          { type: 'ABILITY', abilityId: 'llamaAgonica', intent: 'Dejara brasas agónicas para castigarte mientras se recompone.' },
          { type: 'ATTACK', intent: 'Se lanzara desde el aire con un barrido incendiario.' },
          { type: 'ABILITY', abilityId: 'pulsoVital', intent: 'Asegurara otra ventana de Regeneracion si no la cierras ya.' }
        ]
      }
    ]
  },
  {
    id: 'kaelith_vendaval',
    order: 2,
    name: 'Kaelith, Soberano del Vendaval',
    title: 'Soberano del Vendaval',
    race: 'Hidras Tempestivas',
    pantheon: 'Kairon',
    bossMechanic: 'burst_window',
    invocationView: 'Los cazadores invocados narran que Kaelith fue un rey de rutas abiertas. Tras la caida, su vendaval ya no guia: despedaza todo lo que duda.',
    rank: 'legendario',
    archetype: 'salvaje',
    image: 'assets/creatures/Storm_Hydra.png',
    lore: 'Cada relampago de Kaelith parte la arena en rutas nuevas. Es un jefe que castiga a quien duda y premia la ofensiva perfecta.',
    vida: 90,
    ataque: 21,
    defensa: 9,
    regen: 2,
    abilities: getAbilities(['vendavalRasante', 'embateSalvaje', 'sangreAbierta', 'cazaImplacable']),
    bossPhases: [
      {
        key: 'tormenta',
        label: 'Avance de Tormenta',
        pattern: [
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Trazara un corte de viento para dejarte Expuesto.' },
          { type: 'ATTACK', intent: 'Descargara un golpe veloz buscando abrir la pelea.' },
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Forzara Sangrado para que no puedas estabilizarte.' },
          { type: 'DEFEND', intent: 'Reunira energia del vendaval antes de volver a caer.' }
        ]
      },
      {
        key: 'fulgor',
        label: 'Fulgor del Vendaval',
        triggerBelowPct: 0.42,
        announce: 'Kaelith invoca la tormenta total. El aire mismo se vuelve una cuchilla.',
        pattern: [
          { type: 'ABILITY', abilityId: 'embateSalvaje', intent: 'Entrara en frenesí y ganara Impulso de ataque.' },
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Golpeara de nuevo antes de que cierres la brecha.' },
          { type: 'ATTACK', intent: 'Buscara rematar con una descarga frontal.' },
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Mantendra la herida abierta hasta que cedas.' }
        ]
      }
    ]
  },
  {
    id: 'orophis_bastion',
    order: 5,
    name: 'Orophis, Bastion del Verdor',
    title: 'Bastion del Verdor',
    race: 'Colosos del Verdor',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_defense',
    invocationView: 'Orophis es recordado por las invocaciones del verdor como una muralla noble. Ahora sus raices aprietan la arena como si quisiera sepultar con ella el error de los dioses.',
    rank: 'mitico',
    archetype: 'guardiana',
    image: 'assets/creatures/Titan_Mossbeard.png',
    lore: 'Un titan de raiz y piedra que convierte la paciencia en un arma. Vencerlo exige romper su ritmo antes de que el bosque cierre filas.',
    vida: 104,
    ataque: 15,
    defensa: 14,
    regen: 4,
    abilities: getAbilities(['resguardoDeRaiz', 'pactoLuminar', 'muroAstral', 'pielDeGuerra']),
    bossPhases: [
      {
        key: 'muralla',
        label: 'Muralla Viva',
        pattern: [
          { type: 'ABILITY', abilityId: 'resguardoDeRaiz', intent: 'Se cubrirá de corteza viva y empezara a regenerarse.' },
          { type: 'DEFEND', intent: 'Clavara raices para reforzar su guardia.' },
          { type: 'ABILITY', abilityId: 'pactoLuminar', intent: 'Restaurara su vida mientras debilita tu ataque.' },
          { type: 'ATTACK', intent: 'Respondera con un golpe pesado de rama y piedra.' }
        ]
      },
      {
        key: 'ancestral',
        label: 'Bastion Ancestral',
        triggerBelowPct: 0.38,
        announce: 'Orophis despierta la savia ancestral. La muralla empieza a cerrar la arena.',
        pattern: [
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Levantara un escudo antiguo para sobrevivir otro intercambio.' },
          { type: 'DEFEND', intent: 'Fortificara su postura con Piel de Guerra.' },
          { type: 'ABILITY', abilityId: 'resguardoDeRaiz', intent: 'Volvera a ganar corteza viva y Regeneracion.' },
          { type: 'ABILITY', abilityId: 'pactoLuminar', intent: 'Apagara tu fuerza antes del cierre final.' }
        ]
      }
    ]
  },
  {
    id: 'velkaris_umbral',
    order: 6,
    name: 'Velkaris, Archivista del Umbral',
    title: 'Archivista del Umbral',
    race: 'Djinn del Umbral',
    pantheon: 'Vorath',
    bossMechanic: 'anti_recover',
    invocationView: 'Velkaris guarda nombres, pactos y derrotas que nuestras invocaciones preferirian olvidar. En su archivo, la caida del mundo ya no es tragedia: es material de estudio.',
    rank: 'mitico',
    archetype: 'mistica',
    image: 'assets/creatures/Nether_Djinn.png',
    lore: 'Custodia reliquias arrancadas a invocadores caidos. Cada pagina de su archivo distorsiona el campo y debilita la voluntad enemiga.',
    vida: 110,
    ataque: 20,
    defensa: 15,
    regen: 5,
    abilities: getAbilities(['mareaUmbria', 'marcaDelVacio', 'juramentoDelBastion', 'letaniaDelAlba']),
    bossPhases: [
      {
        key: 'catalogo',
        label: 'Catalogo Viviente',
        pattern: [
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Sellara tu voz para romper tu ritmo de combate.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Invocara una marea oscura para quemar tu esencia y debilitar tu ataque.' },
          { type: 'DEFEND', intent: 'Reforzara sus paginas con barreras antes del siguiente intercambio.' },
          { type: 'ATTACK', intent: 'Te golpeara con un tomo sellado cargado de vacio.' }
        ]
      },
      {
        key: 'archivo_final',
        label: 'Archivo Final',
        triggerBelowPct: 0.36,
        announce: 'Velkaris abre el archivo final. El umbral empieza a devorar la arena.',
        pattern: [
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Levantara un bastion oscuro para sobrevivir tu ofensiva.' },
          { type: 'ABILITY', abilityId: 'letaniaDelAlba', intent: 'Recitara una letania prohibida para restaurarse y cerrar filas.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Desatara otra marea umbria para rematarte mientras sigues debilitado.' },
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Intentara silenciar tu ultima respuesta.' }
        ]
      }
    ]
  },
  {
    id: 'seraphel_ceniza',
    order: 7,
    name: 'Seraphel, Heraldo de la Ceniza',
    title: 'Heraldo de la Ceniza',
    race: 'Hierofantes de Ceniza',
    pantheon: 'Vorath',
    bossMechanic: 'anti_recover',
    invocationView: 'Los restos de la raza extinguida sobreviven en la voz de Seraphel. Toda invocacion que lo enfrenta siente que combate contra un funeral que nunca pudo terminar.',
    rank: 'mitico',
    archetype: 'mistica',
    image: 'assets/creatures/seraphel_ceniza.png',
    lore: 'Antaño custodio de una raza extinguida, ahora dicta veredictos de fuego y silencio en nombre de los dioses caidos.',
    vida: 114,
    ataque: 21,
    defensa: 13,
    regen: 5,
    abilities: getAbilities(['decretoDeCeniza', 'marcaDelVacio', 'letaniaDelAlba', 'selloDelTitan']),
    bossPhases: [
      {
        key: 'edicto',
        label: 'Edicto De Ceniza',
        pattern: [
          { type: 'ABILITY', abilityId: 'decretoDeCeniza', intent: 'Pronunciara un edicto que quema tu esencia y resquebraja tu defensa.' },
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Sellara tu respuesta para controlar el tempo del duelo.' },
          { type: 'ATTACK', intent: 'Descendera con su cetro de ceniza para probar tu guardia.' },
          { type: 'DEFEND', intent: 'Levantara ceniza sagrada antes del siguiente veredicto.' }
        ]
      },
      {
        key: 'funeral',
        label: 'Liturgia Funeral',
        triggerBelowPct: 0.34,
        announce: 'Seraphel inicia la liturgia funeral. El aire se llena de cenizas de una raza olvidada.',
        pattern: [
          { type: 'ABILITY', abilityId: 'letaniaDelAlba', intent: 'Entonara una letania corrompida para sostenerse y reforzar su defensa.' },
          { type: 'ABILITY', abilityId: 'decretoDeCeniza', intent: 'Volvera a imponer el Decreto de Ceniza para quebrar tu armadura.' },
          { type: 'ABILITY', abilityId: 'selloDelTitan', intent: 'Sellara la arena con un bastion ceniciento para resistir tu ofensiva.' },
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Intentara silenciar tu ultimo intento de remate.' }
        ]
      }
    ]
  },
  {
    id: 'thalmora_mareas',
    order: 8,
    name: 'Thalmora, Reina De Las Mareas Veladas',
    title: 'Reina de las Mareas Veladas',
    race: 'Mareas Coronadas',
    pantheon: 'Nerea',
    bossMechanic: 'burst_window',
    invocationView: 'Las criaturas de marea susurran que Thalmora era una reina antes del silencio profundo. Desde la caida, su trono exige naufragios para sostenerse.',
    rank: 'mitico',
    archetype: 'vampirica',
    image: 'assets/creatures/thalmora_mareas.png',
    lore: 'Donde Thalmora camina, las aguas arrastran memoria, sangre y juramentos rotos. Su corte no deja sobrevivientes a medias.',
    vida: 120,
    ataque: 22,
    defensa: 15,
    regen: 4,
    abilities: getAbilities(['mareaUmbria', 'golpeVoraz', 'colmilloDeRuina', 'juramentoDelBastion']),
    bossPhases: [
      {
        key: 'oleaje',
        label: 'Oleaje Velado',
        pattern: [
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Cubrirá la arena con una marea sombría que marchita tu fuerza.' },
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Buscará abrir un sangrado constante en tu invocacion.' },
          { type: 'ATTACK', intent: 'Golpeara con la fuerza de una marea contenida.' },
          { type: 'DEFEND', intent: 'Reunira corrientes oscuras para el siguiente envite.' }
        ]
      },
      {
        key: 'trono',
        label: 'Trono Del Abismo',
        triggerBelowPct: 0.33,
        announce: 'Thalmora asciende a su trono. La marea ya no busca herirte: quiere devorarte.',
        pattern: [
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Levantará una barrera oceánica antes de cerrar la caceria.' },
          { type: 'ABILITY', abilityId: 'golpeVoraz', intent: 'Intentará robarte el aliento con un mordisco de la fosa.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'El abismo volverá a cubrirte con fuego negro y debilidad.' },
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Abrirá una ultima herida para dejarte caer con el oleaje.' }
        ]
      }
    ]
  },
  {
    id: 'morvath_forge',
    order: 9,
    name: 'Morvath, Senor De La Forja Herida',
    title: 'Senor de la Forja Herida',
    race: 'Juggernauts Infernos',
    pantheon: 'Vorath',
    bossMechanic: 'burst_window',
    invocationView: 'Morvath es visto por nuestras invocaciones como un yunque de guerra que rehuso enfriarse. Cada combate suyo suena como el eco de una civilizacion arrasada.',
    rank: 'mitico',
    archetype: 'salvaje',
    image: 'assets/creatures/Infernal_Juggernaut.png',
    lore: 'Avanza con placas al rojo vivo y el peso de una guerra que no acepto terminar con la caida del mundo.',
    vida: 128,
    ataque: 25,
    defensa: 14,
    regen: 2,
    abilities: getAbilities(['embateSalvaje', 'decretoDeCeniza', 'himnoDeGuerra', 'selloDelTitan']),
    bossPhases: [
      {
        key: 'forja',
        label: 'Martillo De Escoria',
        pattern: [
          { type: 'ABILITY', abilityId: 'embateSalvaje', intent: 'Entrara en frenesí y preparara una ventana de burst.' },
          { type: 'ATTACK', intent: 'Caera con un golpe de forja buscando partir tu postura.' },
          { type: 'ABILITY', abilityId: 'decretoDeCeniza', intent: 'Impondra ceniza ardiente para quebrar tu defensa.' },
          { type: 'DEFEND', intent: 'Sellara su coraza mientras recarga la forja.' }
        ]
      },
      {
        key: 'yunque_final',
        label: 'Yunque Del Ocaso',
        triggerBelowPct: 0.35,
        announce: 'Morvath golpea el yunque final. La forja herida vuelve a encenderse.',
        pattern: [
          { type: 'ABILITY', abilityId: 'himnoDeGuerra', intent: 'Elevara su fervor para rematar con mas violencia.' },
          { type: 'ABILITY', abilityId: 'embateSalvaje', intent: 'Abrira otra brecha de burst con una carga brutal.' },
          { type: 'ABILITY', abilityId: 'selloDelTitan', intent: 'Blindara su cuerpo con metal antiguo antes del cierre.' },
          { type: 'ATTACK', intent: 'Descargara un impacto final con toda la forja encima.' }
        ]
      }
    ]
  },
  {
    id: 'selkaith_glacier',
    order: 10,
    name: 'Selkaith, Vigia De La Catedral Glaciar',
    title: 'Vigia de la Catedral Glaciar',
    race: 'Centinelas del Hielo',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_defense',
    invocationView: 'Selkaith permanece en pie como si la catedral glaciar aun tuviera fieles. Las invocaciones del hielo lo veneran y lo temen, porque su guardia nunca acepto el final del mundo.',
    rank: 'mitico',
    archetype: 'guardiana',
    image: 'assets/creatures/Frostbite_Warden.png',
    lore: 'El ultimo centinela de una catedral congelada donde las plegarias quedaron atrapadas dentro del hielo.',
    vida: 132,
    ataque: 20,
    defensa: 18,
    regen: 4,
    abilities: getAbilities(['caparazonEspinas', 'muroAstral', 'resguardoDeRaiz', 'selloDelTitan']),
    bossPhases: [
      {
        key: 'nave_de_hielo',
        label: 'Nave De Hielo',
        pattern: [
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Levantara un muro helado para absorber tu siguiente intento.' },
          { type: 'DEFEND', intent: 'Adoptara una guardia rigida para castigarte al contacto.' },
          { type: 'ABILITY', abilityId: 'resguardoDeRaiz', intent: 'Sellara grietas con hielo vivo y regeneracion.' },
          { type: 'ATTACK', intent: 'Respondera con una estocada de escarcha ritual.' }
        ]
      },
      {
        key: 'vitral_partido',
        label: 'Vitral Partido',
        triggerBelowPct: 0.34,
        announce: 'Selkaith rompe el vitral central. La catedral glaciar cae sobre la arena.',
        pattern: [
          { type: 'ABILITY', abilityId: 'selloDelTitan', intent: 'Marcara el suelo con runas de escarcha blindada.' },
          { type: 'DEFEND', intent: 'Reforzara su postura mientras tus guardias se resquebrajan.' },
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Volvera a cubrirse antes del intercambio decisivo.' },
          { type: 'ATTACK', intent: 'Cerrara la distancia con una carga fria y pesada.' }
        ]
      }
    ]
  },
  {
    id: 'zarynth_quartz',
    order: 11,
    name: 'Zarynth, Oraculo Del Cuarzo Partido',
    title: 'Oraculo del Cuarzo Partido',
    race: 'Basiliscos de Cuarzo',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_recover',
    invocationView: 'Zarynth vio demasiados futuros antes de la fractura. Las invocaciones de cuarzo creen que enloquecio al descubrir que en casi todos el mundo terminaba igual.',
    rank: 'mitico',
    archetype: 'mistica',
    image: 'assets/creatures/Crystal_Basilisk.png',
    lore: 'Vio la fractura antes del resto y desde entonces cada uno de sus reflejos dicta un final distinto para el invocador.',
    vida: 126,
    ataque: 23,
    defensa: 15,
    regen: 5,
    abilities: getAbilities(['fisuraArcana', 'marcaDelVacio', 'decretoDeCeniza', 'coronaDelEclipse']),
    bossPhases: [
      {
        key: 'augurio',
        label: 'Augurio De Cuarzo',
        pattern: [
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Silenciara tu respuesta antes de abrir el destino.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Trazara una fisura para dejarte Expuesto.' },
          { type: 'ATTACK', intent: 'Golpeara donde el futuro ya te vio caer.' },
          { type: 'ABILITY', abilityId: 'decretoDeCeniza', intent: 'Marchitara tu defensa y tu recuperacion con polvo de cuarzo.' }
        ]
      },
      {
        key: 'profecia',
        label: 'Profecia Del Ruptor',
        triggerBelowPct: 0.32,
        announce: 'Zarynth abre su profecia final. Todas las caras del cuarzo apuntan hacia ti.',
        pattern: [
          { type: 'ABILITY', abilityId: 'coronaDelEclipse', intent: 'Caera con un juicio pesado para abrir tu defensa.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Profundizara la exposicion hasta quebrar tu linea.' },
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Intentara silenciar cualquier remontada.' },
          { type: 'ATTACK', intent: 'Sellara la profecia con un remate directo.' }
        ]
      }
    ]
  },
  {
    id: 'rhaziel_horizon',
    order: 12,
    name: 'Rhaziel, Colmillo del Horizonte',
    title: 'Colmillo del Horizonte',
    race: 'Fauces Etereas',
    pantheon: 'Kairon',
    bossMechanic: 'burst_window',
    invocationView: 'Rhaziel persigue la ultima linea del horizonte como si pudiera hallar un mundo sin ruina. Para nuestras invocaciones, es el instinto de caza vuelto destino.',
    rank: 'mitico',
    archetype: 'asaltante',
    image: 'assets/creatures/aetherfang.png',
    lore: 'El cazador mas veloz de Kairon. Donde su sombra cae, el horizonte deja de prometer escape.',
    vida: 130,
    ataque: 26,
    defensa: 13,
    regen: 2,
    abilities: getAbilities(['colmilloDeRuina', 'vendavalRasante', 'sangreAbierta', 'cazaImplacable']),
    bossPhases: [
      {
        key: 'acecho_del_rayo',
        label: 'Acecho Del Rayo',
        pattern: [
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Abrira tu guardia con un corte de horizonte.' },
          { type: 'ATTACK', intent: 'Saltara directo a la garganta del duelo.' },
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Marcara un sangrado para preparar la caza.' },
          { type: 'DEFEND', intent: 'Medira la distancia antes del siguiente salto.' }
        ]
      },
      {
        key: 'horizonte_roto',
        label: 'Horizonte Roto',
        triggerBelowPct: 0.32,
        announce: 'Rhaziel rompe el horizonte. La presa ya no tiene a donde correr.',
        pattern: [
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Caera sobre la herida ya abierta.' },
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Volvera a dejarte Expuesto antes del remate.' },
          { type: 'ATTACK', intent: 'Rematara con una embestida perfecta.' },
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Mantendra la presa sangrando hasta el final.' }
        ]
      }
    ]
  },
  {
    id: 'vulkris_magma',
    order: 13,
    name: 'Vulkris, Corazon Magmatico',
    title: 'Corazon Magmatico',
    race: 'Dracos Magmaticos',
    pantheon: 'Helion',
    bossMechanic: 'anti_recover',
    invocationView: 'Vulkris arde con la memoria de los crateres sagrados de Helion. Las invocaciones de fuego lo recuerdan como un heraldo del juicio, no como un monstruo.',
    rank: 'mitico',
    archetype: 'asaltante',
    image: 'assets/creatures/pyroclast_drake.png',
    lore: 'Cuando Helion quiso encender de nuevo el cielo roto, Vulkris fue la llama que aprendio a pelear sola.',
    vida: 132,
    ataque: 27,
    defensa: 14,
    regen: 2,
    abilities: getAbilities(['llamaAgonica', 'decretoDeCeniza', 'embateSalvaje', 'himnoDeGuerra']),
    bossPhases: [
      {
        key: 'brasa_inicial',
        label: 'Brasa Inicial',
        pattern: [
          { type: 'ABILITY', abilityId: 'llamaAgonica', intent: 'Cubrirá la arena con brasas que arruinan tu recuperacion.' },
          { type: 'ATTACK', intent: 'Caera con una mordida de magma fundido.' },
          { type: 'ABILITY', abilityId: 'decretoDeCeniza', intent: 'Impondra ceniza sobre tu armadura.' },
          { type: 'DEFEND', intent: 'Tomara altura mientras el fuego sigue ardiendo.' }
        ]
      },
      {
        key: 'sol_de_guerra',
        label: 'Sol De Guerra',
        triggerBelowPct: 0.34,
        announce: 'Vulkris abre el pecho. El corazon magmatico late como un sol de guerra.',
        pattern: [
          { type: 'ABILITY', abilityId: 'himnoDeGuerra', intent: 'Encendera su propio ritmo de guerra.' },
          { type: 'ABILITY', abilityId: 'embateSalvaje', intent: 'Desatara una carga brutal cubierta de escoria.' },
          { type: 'ABILITY', abilityId: 'llamaAgonica', intent: 'Volvera a castigar cualquier intento de curarte.' },
          { type: 'ATTACK', intent: 'Bajara con las alas envueltas en lava viva.' }
        ]
      }
    ]
  },
  {
    id: 'noctyra_umbra',
    order: 14,
    name: 'Noctyra, Matriarca de la Sombra Viva',
    title: 'Matriarca de la Sombra Viva',
    race: 'Acechantes Umbrios',
    pantheon: 'Vorath',
    bossMechanic: 'anti_recover',
    invocationView: 'Noctyra enseño a los acechantes umbrios que la oscuridad tambien puede ser patria. Tras la caida, su garra ya no acecha para sobrevivir, sino para imponer silencio.',
    rank: 'mitico',
    archetype: 'vampirica',
    image: 'assets/creatures/Umbra_Stalker.png',
    lore: 'Las camadas de Vorath aun recuerdan su nombre. Cada acechante umbrio caza para volver a ella.',
    vida: 134,
    ataque: 25,
    defensa: 14,
    regen: 3,
    abilities: getAbilities(['sangreAbierta', 'mareaUmbria', 'colmilloDeRuina', 'marcaDelVacio']),
    bossPhases: [
      {
        key: 'nido_de_sombras',
        label: 'Nido De Sombras',
        pattern: [
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Abrira el primer surco de sangre.' },
          { type: 'ATTACK', intent: 'Se abalanzara desde el punto ciego.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Hundira la arena en sombra corrosiva.' },
          { type: 'DEFEND', intent: 'Volvera a desaparecer un instante.' }
        ]
      },
      {
        key: 'luna_sin_piel',
        label: 'Luna Sin Piel',
        triggerBelowPct: 0.31,
        announce: 'Noctyra muestra la luna sin piel. El duelo ya huele a presa caida.',
        pattern: [
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Perforara la linea abierta para profundizar el sangrado.' },
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Silenciara tu ultima respuesta.' },
          { type: 'ATTACK', intent: 'Entrara a rematar antes de que respires.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Mantendra el desgaste hasta quebrarte.' }
        ]
      }
    ]
  },
  {
    id: 'xelthis_chrono',
    order: 15,
    name: 'Xelthis, Aguja del Tiempo Verde',
    title: 'Aguja del Tiempo Verde',
    race: 'Mantis Cronicas',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_defense',
    invocationView: 'Xelthis es la herida temporal de Sylvara hecha carne. Nuestras invocaciones sienten, al verla, que el tiempo mismo puede cortarse y sangrar.',
    rank: 'mitico',
    archetype: 'mistica',
    image: 'assets/creatures/Chrono_Mantis.png',
    lore: 'Sylvara escondio en Xelthis la paciencia del bosque y la precision del tiempo roto.',
    vida: 136,
    ataque: 24,
    defensa: 15,
    regen: 4,
    abilities: getAbilities(['marcaDelVacio', 'fisuraArcana', 'eclipseDebilitante', 'juramentoDelBastion']),
    bossPhases: [
      {
        key: 'segundo_quieto',
        label: 'Segundo Quieto',
        pattern: [
          { type: 'ABILITY', abilityId: 'marcaDelVacio', intent: 'Cortara tu voz y congelara tu ritmo.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Abrira una grieta donde tu defensa no llegue.' },
          { type: 'ATTACK', intent: 'Aprovechara el segundo inmovil para herirte.' },
          { type: 'DEFEND', intent: 'Replegara las cuchillas antes del siguiente salto.' }
        ]
      },
      {
        key: 'primavera_rota',
        label: 'Primavera Rota',
        triggerBelowPct: 0.3,
        announce: 'Xelthis abre la primavera rota. El tiempo ya no protege a nadie.',
        pattern: [
          { type: 'ABILITY', abilityId: 'eclipseDebilitante', intent: 'Marchitara tu fuerza antes del intercambio final.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Profundizara la abertura en tu defensa.' },
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Reforzara su cuerpo con corteza temporal.' },
          { type: 'ATTACK', intent: 'Caera justo cuando el tiempo te falle.' }
        ]
      }
    ]
  },
  {
    id: 'ferron_ironwall',
    order: 16,
    name: 'Ferron, Coloso del Ultimo Muro',
    title: 'Coloso del Ultimo Muro',
    race: 'Titanes Ferricos',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_defense',
    invocationView: 'Ferron fue levantado para resistir la primera embestida del fin. Las criaturas ferricas lo siguen viendo como una orden: no retroceder, aunque el mundo ya haya caido.',
    rank: 'mitico',
    archetype: 'guardiana',
    image: 'assets/creatures/armored_golem.png',
    lore: 'El hierro de Ferron no nacio para marchar: nacio para ser lo ultimo que cayera cuando el mundo se partiera.',
    vida: 146,
    ataque: 21,
    defensa: 20,
    regen: 3,
    abilities: getAbilities(['muroAstral', 'selloDelTitan', 'juramentoDelBastion', 'resguardoDeRaiz']),
    bossPhases: [
      {
        key: 'muro_muerto',
        label: 'Muro Muerto',
        pattern: [
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Alzara un muro ferrico para devorar el primer impacto.' },
          { type: 'DEFEND', intent: 'Tomara la forma de una muralla que no cede.' },
          { type: 'ABILITY', abilityId: 'selloDelTitan', intent: 'Sellara la arena para aplastar tu impulso.' },
          { type: 'ATTACK', intent: 'Descendera con el peso completo del muro.' }
        ]
      },
      {
        key: 'fortaleza_final',
        label: 'Fortaleza Final',
        triggerBelowPct: 0.33,
        announce: 'Ferron activa el Ultimo Muro. Cada paso suyo suena como el fin de una ciudad.',
        pattern: [
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Refijara su armadura antes del cierre.' },
          { type: 'DEFEND', intent: 'Convertira tu ofensiva en un eco contra el metal.' },
          { type: 'ABILITY', abilityId: 'resguardoDeRaiz', intent: 'Recompondra grietas con hierro vivo.' },
          { type: 'ATTACK', intent: 'Buscara rematar con un impacto total.' }
        ]
      }
    ]
  },
  {
    id: 'valzhar_bloodmoon',
    order: 17,
    name: 'Valzhar, Cosechador de la Luna Roja',
    title: 'Cosechador de la Luna Roja',
    race: 'Segadores Luna Roja',
    pantheon: 'Vorath',
    bossMechanic: 'burst_window',
    invocationView: 'Valzhar aparece en los relatos de luna roja como el cosechador que aprendio a sobrevivir del desastre. Toda invocacion sangrante lo siente cerca antes de verlo.',
    rank: 'mitico',
    archetype: 'vampirica',
    image: 'assets/creatures/Bloodmoon_Reaper.png',
    lore: 'Cada luna roja recuerda la noche en que Valzhar juro cosechar hasta el ultimo vestigio de piedad.',
    vida: 142,
    ataque: 27,
    defensa: 14,
    regen: 2,
    abilities: getAbilities(['cosechaEscarlata', 'golpeVoraz', 'colmilloDeRuina', 'mareaUmbria']),
    bossPhases: [
      {
        key: 'siega',
        label: 'Primera Siega',
        pattern: [
          { type: 'ABILITY', abilityId: 'cosechaEscarlata', intent: 'Abrira la cosecha y robara vida en el proceso.' },
          { type: 'ATTACK', intent: 'Cruzara la guadaña sobre tu linea frontal.' },
          { type: 'ABILITY', abilityId: 'colmilloDeRuina', intent: 'Profundizara la herida hasta volverla ritual.' },
          { type: 'DEFEND', intent: 'Esperara un segundo latido antes de volver a cortar.' }
        ]
      },
      {
        key: 'eclipse_rojo',
        label: 'Eclipse Rojo',
        triggerBelowPct: 0.3,
        announce: 'Valzhar alza la guadaña. La luna roja ha aceptado la ultima cosecha.',
        pattern: [
          { type: 'ABILITY', abilityId: 'golpeVoraz', intent: 'Tomara un gran bocado de tu vida restante.' },
          { type: 'ABILITY', abilityId: 'mareaUmbria', intent: 'Llenara la arena de sombra y desgaste.' },
          { type: 'ABILITY', abilityId: 'cosechaEscarlata', intent: 'Buscará el intercambio definitivo.' },
          { type: 'ATTACK', intent: 'Caera con el filo entero de la luna roja.' }
        ]
      }
    ]
  },
  {
    id: 'thyron_thunder',
    order: 18,
    name: 'Thyron, Bestia del Rayo Ancestral',
    title: 'Bestia del Rayo Ancestral',
    race: 'Behemoths del Trueno',
    pantheon: 'Kairon',
    bossMechanic: 'burst_window',
    invocationView: 'Thyron no lucha: atropella. Los behemoths del trueno lo evocan como una estampida sagrada que siguio corriendo incluso cuando el cielo dejo de obedecer.',
    rank: 'mitico',
    archetype: 'salvaje',
    image: 'assets/creatures/thunderous_Behemoth.png',
    lore: 'Thyron carga una tormenta entera dentro del pecho. Cada herida suya solo hace que el trueno aprenda tu nombre.',
    vida: 148,
    ataque: 28,
    defensa: 15,
    regen: 2,
    abilities: getAbilities(['embateSalvaje', 'himnoDeGuerra', 'vendavalRasante', 'sangreAbierta']),
    bossPhases: [
      {
        key: 'trueno_vivo',
        label: 'Trueno Vivo',
        pattern: [
          { type: 'ABILITY', abilityId: 'himnoDeGuerra', intent: 'Convertira la tormenta en fervor de combate.' },
          { type: 'ATTACK', intent: 'Golpeara con el peso del rayo ancestral.' },
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Abrira tu defensa a pura velocidad.' },
          { type: 'DEFEND', intent: 'Clavara las patas antes del siguiente estampido.' }
        ]
      },
      {
        key: 'tormenta_total',
        label: 'Tormenta Total',
        triggerBelowPct: 0.3,
        announce: 'Thyron libera la tormenta total. El suelo entero responde al rugido.',
        pattern: [
          { type: 'ABILITY', abilityId: 'embateSalvaje', intent: 'Entrara en una carga que quiere partir la arena.' },
          { type: 'ABILITY', abilityId: 'sangreAbierta', intent: 'Mantendra la presa herida mientras truena encima.' },
          { type: 'ATTACK', intent: 'Descargara el cuerpo completo contra tu criatura.' },
          { type: 'ABILITY', abilityId: 'vendavalRasante', intent: 'Aprovechara cualquier guardia para abrir otra ventana de burst.' }
        ]
      }
    ]
  },
  {
    id: 'elaria_sanctum',
    order: 19,
    name: 'Elaria, Custodia del Santuario Verdante',
    title: 'Custodia del Santuario Verdante',
    race: 'Guardianes Verdantes',
    pantheon: 'Sylvara',
    bossMechanic: 'anti_defense',
    invocationView: 'Elaria conserva la imagen de un santuario que ya no existe. Para nuestras invocaciones, derrotarla es como cerrar la puerta del ultimo refugio del bosque.',
    rank: 'mitico',
    archetype: 'support',
    image: 'assets/creatures/Verdant_Guardian.png',
    lore: 'Donde otros vieron ruina, Elaria siguio levantando refugios con savia y silencio.',
    vida: 150,
    ataque: 20,
    defensa: 18,
    regen: 5,
    abilities: getAbilities(['resguardoDeRaiz', 'pactoLuminar', 'pulsoVital', 'letaniaDelAlba']),
    bossPhases: [
      {
        key: 'refugio',
        label: 'Refugio Verde',
        pattern: [
          { type: 'ABILITY', abilityId: 'resguardoDeRaiz', intent: 'Levantara corteza viva y regeneracion.' },
          { type: 'ABILITY', abilityId: 'pactoLuminar', intent: 'Te debilitara mientras sostiene su postura.' },
          { type: 'DEFEND', intent: 'Cerrara filas en torno al santuario.' },
          { type: 'ATTACK', intent: 'Respondera con una estaca de raiz y piedra.' }
        ]
      },
      {
        key: 'bosque_ultimo',
        label: 'Ultimo Bosque',
        triggerBelowPct: 0.32,
        announce: 'Elaria despierta el ultimo bosque. El santuario entero entra al duelo.',
        pattern: [
          { type: 'ABILITY', abilityId: 'letaniaDelAlba', intent: 'Entonara una letania para sostenerse hasta el final.' },
          { type: 'ABILITY', abilityId: 'pulsoVital', intent: 'Asegurara otra ventana de recuperacion.' },
          { type: 'DEFEND', intent: 'Clavara raices profundas bajo la arena.' },
          { type: 'ABILITY', abilityId: 'pactoLuminar', intent: 'Marchitara tu fuerza una vez mas.' }
        ]
      }
    ]
  },
  {
    id: 'astrael_firmament',
    order: 20,
    name: 'Astrael, Espejo del Firmamento',
    title: 'Espejo del Firmamento',
    race: 'Quimeras Astrales',
    pantheon: 'Helion',
    bossMechanic: 'anti_recover',
    invocationView: 'Astrael lleva estrellas rotas en cada uno de sus rostros. Las invocaciones astrales la leen como un espejo de lo que Helion no pudo salvar.',
    rank: 'mitico',
    archetype: 'mistica',
    image: 'assets/creatures/Astral_Chimera.png',
    lore: 'Astrael refleja la forma en que Helion querria que el cielo siguiera existiendo: brillante, imposible y cruel.',
    vida: 154,
    ataque: 29,
    defensa: 16,
    regen: 3,
    abilities: getAbilities(['fisuraArcana', 'coronaDelEclipse', 'eclipseDebilitante', 'muroAstral']),
    bossPhases: [
      {
        key: 'espejo_alto',
        label: 'Espejo Alto',
        pattern: [
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Abrira una grieta luminosa bajo tus pies.' },
          { type: 'ABILITY', abilityId: 'eclipseDebilitante', intent: 'Reducira tu fuerza antes del cruce central.' },
          { type: 'ATTACK', intent: 'Bajara con la forma total del firmamento.' },
          { type: 'DEFEND', intent: 'Reflejará tu ofensiva en un cristal astral.' }
        ]
      },
      {
        key: 'cielo_partido',
        label: 'Cielo Partido',
        triggerBelowPct: 0.28,
        announce: 'Astrael quiebra el espejo. Todo el firmamento cae en fragmentos sobre la arena.',
        pattern: [
          { type: 'ABILITY', abilityId: 'coronaDelEclipse', intent: 'Emitira un juicio pesado desde el cielo roto.' },
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Levantara el ultimo reflejo antes del cierre.' },
          { type: 'ABILITY', abilityId: 'fisuraArcana', intent: 'Abrira otra vez la herida en tu defensa.' },
          { type: 'ATTACK', intent: 'Caera con todo el peso del cielo fragmentado.' }
        ]
      }
    ]
  },
  {
    id: 'luminara_sanctuary',
    order: 21,
    name: 'Luminara, Voz del Ultimo Santuario',
    title: 'Voz del Ultimo Santuario',
    race: 'Heraldos del Santuario',
    pantheon: 'Helion',
    bossMechanic: 'anti_recover',
    invocationView: 'Luminara es recordada por los heraldos como la voz que siguio cantando cuando todo templo cayo. Su compasion persiste, pero ahora esta atada al duelo eterno.',
    rank: 'mitico',
    archetype: 'support',
    image: 'assets/creatures/Luminary_Serap.png',
    lore: 'Luminara lleva sobre la lengua la ultima plegaria que no se perdio cuando el mundo se partio.',
    vida: 158,
    ataque: 21,
    defensa: 18,
    regen: 6,
    abilities: getAbilities(['letaniaDelAlba', 'pulsoVital', 'renacerSolar', 'juramentoDelBastion']),
    bossPhases: [
      {
        key: 'salmo_inicial',
        label: 'Salmo Inicial',
        pattern: [
          { type: 'ABILITY', abilityId: 'letaniaDelAlba', intent: 'Entonara el canto que sostiene al santuario.' },
          { type: 'ABILITY', abilityId: 'pulsoVital', intent: 'Abrira una ventana de regeneracion prolongada.' },
          { type: 'DEFEND', intent: 'Guardara la voz hasta el proximo verso.' },
          { type: 'ATTACK', intent: 'Golpeara con una onda de luz ritual.' }
        ]
      },
      {
        key: 'ultima_plegaria',
        label: 'Ultima Plegaria',
        triggerBelowPct: 0.28,
        announce: 'Luminara pronuncia la ultima plegaria. El santuario entero responde a su voz.',
        pattern: [
          { type: 'ABILITY', abilityId: 'renacerSolar', intent: 'Renacera una vez mas bajo la luz de Helion.' },
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Levantara una barrera sagrada antes del final.' },
          { type: 'ABILITY', abilityId: 'letaniaDelAlba', intent: 'Sostendra su defensa y su pulso hasta el cierre.' },
          { type: 'ATTACK', intent: 'Sellara el duelo con una nota de luz concentrada.' }
        ]
      }
    ]
  },
  {
    id: 'targor_tidebound',
    order: 22,
    name: 'Targor, Ancla de la Marea Sepultada',
    title: 'Ancla de la Marea Sepultada',
    race: 'Colosos de Marea',
    pantheon: 'Nerea',
    bossMechanic: 'anti_defense',
    invocationView: 'Targor duerme en los relatos de marea como una puerta viva. Nuestras invocaciones creen que, si alguna vez despierta por completo, el mar reclamara las ultimas ruinas.',
    rank: 'mitico',
    archetype: 'guardiana',
    image: 'assets/creatures/Abyssal_Kraken.png',
    lore: 'Targor no nada: arrastra sobre la arena el peso de una ciudad hundida que sigue obedeciendo a Nerea.',
    vida: 166,
    ataque: 24,
    defensa: 20,
    regen: 4,
    abilities: getAbilities(['selloDelTitan', 'muroAstral', 'mareaVoraz', 'juramentoDelBastion']),
    bossPhases: [
      {
        key: 'marea_hundida',
        label: 'Marea Hundida',
        pattern: [
          { type: 'ABILITY', abilityId: 'muroAstral', intent: 'Levantara una muralla de agua pesada.' },
          { type: 'DEFEND', intent: 'Anclara su cuerpo al fondo de la arena.' },
          { type: 'ABILITY', abilityId: 'mareaVoraz', intent: 'Golpeara con una marea que roba vida.' },
          { type: 'ATTACK', intent: 'Avanzara como si arrastrara el peso de un puerto entero.' }
        ]
      },
      {
        key: 'puerto_sepultado',
        label: 'Puerto Sepultado',
        triggerBelowPct: 0.26,
        announce: 'Targor levanta el puerto sepultado. La arena se vuelve un lecho de marea negra.',
        pattern: [
          { type: 'ABILITY', abilityId: 'selloDelTitan', intent: 'Marcará el terreno con un sello de marea y hierro.' },
          { type: 'ABILITY', abilityId: 'juramentoDelBastion', intent: 'Reforzara su casco antes del intercambio final.' },
          { type: 'DEFEND', intent: 'Tu ofensiva chocará contra el ancla del mundo hundido.' },
          { type: 'ATTACK', intent: 'Descendera con un peso imposible de detener.' }
        ]
      }
    ]
  }
];
