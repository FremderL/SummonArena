module.exports = [
  {
    id: 'linaje_fauces_etereas',
    name: 'Instinto del Horizonte',
    type: 'linaje',
    legacy: 'Kairon',
    races: ['Fauces Etereas'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.55,
    desc: 'La caceria de Kairon cae sobre un unico objetivo y le arranca la postura.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -7, durationTurns: 2 },
      { target: 'self', stat: 'attackFlat', amount: 4, durationTurns: 2 }
    ],
    lore: 'Las Fauces Etereas aprendieron a matar antes de tocar el suelo.'
  },
  {
    id: 'linaje_dracos_magmaticos',
    name: 'Colera Draconica',
    type: 'linaje',
    legacy: 'Helion',
    races: ['Dracos Magmaticos'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.55,
    desc: 'Una llamarada del nucleo de Helion cubre al rival con magma y ruina.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 9, durationTurns: 3 },
      { target: 'enemy', stat: 'defenseFlat', amount: -4, durationTurns: 2 }
    ],
    lore: 'Los Dracos Magmaticos fueron chispas del primer incendio sagrado.'
  },
  {
    id: 'linaje_heraldos_del_santuario',
    name: 'Refugio del Alba',
    type: 'linaje',
    legacy: 'Helion',
    races: ['Heraldos del Santuario'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    healPercent: 0.4,
    damageMultiplier: 1.1,
    desc: 'La ultima boveda del santuario desciende para sanar y proteger.',
    effects: [
      { target: 'self', stat: 'shield', amount: 22, durationTurns: 3 },
      { target: 'self', stat: 'regenTurn', amount: 8, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 4, durationTurns: 2 }
    ],
    lore: 'Incluso con los templos caidos, sus heraldos recuerdan como sostener la luz.'
  },
  {
    id: 'linaje_acechantes_umbrios',
    name: 'Sombra Eterna',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Acechantes Umbrios'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.35,
    desc: 'La presa queda marcada por el vacio y pierde la voz ante Vorath.',
    effects: [
      { target: 'enemy', stat: 'silence', amount: 2, durationTurns: 2 },
      { target: 'enemy', stat: 'defenseFlat', amount: -5, durationTurns: 2 }
    ],
    lore: 'Los Acechantes Umbrios no heredan territorio: heredan oscuridad.'
  },
  {
    id: 'linaje_colosos_del_verdor',
    name: 'Verdor Primordial',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Colosos del Verdor'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.25,
    healPercent: 0.28,
    desc: 'La savia de Sylvara convierte el aguante en un nuevo brote de fuerza.',
    effects: [
      { target: 'self', stat: 'regenTurn', amount: 10, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 4, durationTurns: 2 }
    ],
    lore: 'Cada Coloso del Verdor carga la memoria de un bosque que se nego a morir.'
  },
  {
    id: 'linaje_centinelas_del_hielo',
    name: 'Catedral Invernal',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Centinelas del Hielo'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.25,
    desc: 'El frio ritual inmoviliza la ofensiva rival y fortalece la guardia.',
    effects: [
      { target: 'enemy', stat: 'attackFlat', amount: -4, durationTurns: 2 },
      { target: 'self', stat: 'shield', amount: 20, durationTurns: 2 }
    ],
    lore: 'Los Centinelas del Hielo juran seguir en pie incluso cuando el mundo se inmoviliza.'
  },
  {
    id: 'linaje_hidras_tempestivas',
    name: 'Tormenta Eterna',
    type: 'linaje',
    legacy: 'Kairon',
    races: ['Hidras Tempestivas'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.4,
    desc: 'Rayos encadenados abren heridas y desgarran el ritmo del enemigo.',
    effects: [
      { target: 'enemy', stat: 'bleed', amount: 8, durationTurns: 3 },
      { target: 'enemy', stat: 'attackFlat', amount: -3, durationTurns: 2 }
    ],
    lore: 'Cada cuello de las Hidras Tempestivas recuerda una tormenta distinta.'
  },
  {
    id: 'linaje_juggernauts_infernos',
    name: 'Marcha de Escoria',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Juggernauts Infernos'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.5,
    desc: 'La forja corrupta aplasta al rival y deja brasas donde pisa.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 7, durationTurns: 3 },
      { target: 'self', stat: 'attackFlat', amount: 4, durationTurns: 2 }
    ],
    lore: 'Los Juggernauts Infernos fueron hechos para avanzar cuando todo lo demas retrocede.'
  },
  {
    id: 'linaje_basiliscos_de_cuarzo',
    name: 'Mirada Cristalina',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Basiliscos de Cuarzo'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.6,
    desc: 'El cuarzo vivo rompe capas de defensa y deja al rival expuesto.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -6, durationTurns: 3 },
      { target: 'enemy', stat: 'silence', amount: 1, durationTurns: 1 }
    ],
    lore: 'Los Basiliscos de Cuarzo no petrifican cuerpos: petrifican decisiones.'
  },
  {
    id: 'linaje_mantis_cronicas',
    name: 'Corte del Segundo Roto',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Mantis Cronicas'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.55,
    desc: 'Una cuchilla temporal adelanta la herida antes de que el rival reaccione.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -6, durationTurns: 2 },
      { target: 'self', stat: 'attackFlat', amount: 3, durationTurns: 2 }
    ],
    lore: 'Las Mantis Cronicas cazan entre segundos que nadie mas alcanza a ver.'
  },
  {
    id: 'linaje_leviatanes_de_la_fosa',
    name: 'Profundidad Abisal',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Leviatanes de la Fosa'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.35,
    lifestealPct: 0.4,
    desc: 'La fosa se abre bajo el enemigo y devuelve vida al leviatan.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 6, durationTurns: 2 },
      { target: 'self', stat: 'shield', amount: 15, durationTurns: 2 }
    ],
    lore: 'Los Leviatanes de la Fosa arrastran la guerra al fondo donde todo se quiebra.'
  },
  {
    id: 'linaje_fenix_del_cenit',
    name: 'Juicio del Cenit',
    type: 'linaje',
    legacy: 'Helion',
    races: ['Fenix del Cenit'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.6,
    desc: 'El fuego del cenit cae para quemar y debilitar a quien siga en pie.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 7, durationTurns: 3 },
      { target: 'enemy', stat: 'attackFlat', amount: -4, durationTurns: 2 }
    ],
    lore: 'Cada Fenix del Cenit recuerda que renacer tambien es juzgar.'
  },
  {
    id: 'linaje_titanes_ferricos',
    name: 'Grito del Ultimo Muro',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Titanes Ferricos'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.25,
    desc: 'La armadura ferrica se convierte en bastion y no admite retirada.',
    effects: [
      { target: 'self', stat: 'shield', amount: 30, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 6, durationTurns: 3 }
    ],
    lore: 'Los Titanes Ferricos fueron el ultimo argumento de Sylvara contra el colapso.'
  },
  {
    id: 'linaje_segadores_luna_roja',
    name: 'Goce de Vorath',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Segadores Luna Roja'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.35,
    lifestealPct: 0.6,
    desc: 'La luna roja reclama sangre y la devuelve como euforia de combate.',
    effects: [
      { target: 'enemy', stat: 'bleed', amount: 10, durationTurns: 3 },
      { target: 'self', stat: 'attackFlat', amount: 3, durationTurns: 2 }
    ],
    lore: 'Los Segadores Luna Roja celebran cada herida como una ofrenda a Vorath.'
  },
  {
    id: 'linaje_mareas_coronadas',
    name: 'Marea Coronada',
    type: 'linaje',
    legacy: 'Nerea',
    races: ['Mareas Coronadas'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.4,
    desc: 'La realeza del abismo somete la defensa enemiga y se fortalece con la corriente.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -5, durationTurns: 3 },
      { target: 'self', stat: 'regenTurn', amount: 5, durationTurns: 2 }
    ],
    lore: 'Las Mareas Coronadas no suplican territorio: lo hunden.'
  },
  {
    id: 'linaje_behemoths_del_trueno',
    name: 'Estampida del Cielo',
    type: 'linaje',
    legacy: 'Kairon',
    races: ['Behemoths del Trueno'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.5,
    desc: 'Un trueno frontal desordena el combate y empuja al enemigo al borde.',
    effects: [
      { target: 'enemy', stat: 'bleed', amount: 6, durationTurns: 2 },
      { target: 'self', stat: 'attackFlat', amount: 5, durationTurns: 2 }
    ],
    lore: 'Los Behemoths del Trueno convierten cada embestida en una tormenta completa.'
  },
  {
    id: 'linaje_guardianes_verdantes',
    name: 'Raices del Mundo',
    type: 'linaje',
    legacy: 'Sylvara',
    races: ['Guardianes Verdantes'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.2,
    desc: 'Las raices antiguas abrazan al guardian y rehacen su defensa.',
    effects: [
      { target: 'self', stat: 'shield', amount: 25, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 5, durationTurns: 3 },
      { target: 'self', stat: 'regenTurn', amount: 6, durationTurns: 3 }
    ],
    lore: 'Los Guardianes Verdantes llevan en el pecho un santuario de savia.'
  },
  {
    id: 'linaje_djinn_del_umbral',
    name: 'Velo del Umbral',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Djinn del Umbral'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.3,
    desc: 'El umbral silencia al rival y lo deja a merced del vacio.',
    effects: [
      { target: 'enemy', stat: 'silence', amount: 2, durationTurns: 1 },
      { target: 'enemy', stat: 'attackFlat', amount: -4, durationTurns: 2 }
    ],
    lore: 'Los Djinn del Umbral firman pactos donde el precio siempre llega tarde.'
  },
  {
    id: 'linaje_quimeras_astrales',
    name: 'Firmamento Roto',
    type: 'linaje',
    legacy: 'Helion',
    races: ['Quimeras Astrales'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.45,
    desc: 'La quimera hace caer un fragmento de cielo sobre la arena.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -5, durationTurns: 2 },
      { target: 'enemy', stat: 'burn', amount: 5, durationTurns: 2 }
    ],
    lore: 'Las Quimeras Astrales nacieron de un firmamento que aprendio a rugir.'
  },
  {
    id: 'linaje_hierofantes_de_ceniza',
    name: 'Liturgia Extinta',
    type: 'linaje',
    legacy: 'Vorath',
    races: ['Hierofantes de Ceniza'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.5,
    desc: 'Una plegaria arruinada quema, debilita y marchita la recuperacion rival.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 10, durationTurns: 3 },
      { target: 'enemy', stat: 'attackFlat', amount: -5, durationTurns: 2 },
      { target: 'enemy', stat: 'regenTurn', amount: -4, durationTurns: 2 }
    ],
    lore: 'Los Hierofantes de Ceniza convierten el duelo en rito y el rito en ruina.'
  },
  {
    id: 'linaje_serafines_del_velo',
    name: 'Arco del Mediodia',
    type: 'linaje',
    legacy: 'Helion',
    races: ['Serafines del Velo'],
    cooldownTurns: 999,
    usesPerCombat: 1,
    damageMultiplier: 1.35,
    healPercent: 0.22,
    desc: 'La luz atraviesa el velo y deja al enemigo bajo un cielo sin sombra.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 8, durationTurns: 3 },
      { target: 'self', stat: 'regenTurn', amount: 6, durationTurns: 2 }
    ],
    lore: 'Los Serafines del Velo son la promesa de Helion hecha forma viviente.'
  }
];
