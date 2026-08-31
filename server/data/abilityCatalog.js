module.exports = [
  {
    id: 'golpeVoraz',
    name: 'Golpe Voraz',
    type: 'active',
    archetypes: ['vampirica'],
    cooldownTurns: 3,
    damageMultiplier: 1.15,
    lifestealPct: 0.45,
    desc: 'Inflige dano y cura parte del dano causado.'
  },
  {
    id: 'muroAstral',
    name: 'Muro Astral',
    type: 'active',
    archetypes: ['guardiana', 'support'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Otorga un escudo por 2 turnos.',
    effects: [{ target: 'self', stat: 'shield', amount: 18, durationTurns: 2 }]
  },
  {
    id: 'sangreAbierta',
    name: 'Sangre Abierta',
    type: 'active',
    archetypes: ['asaltante', 'salvaje'],
    cooldownTurns: 3,
    damageMultiplier: 1.0,
    durationTurns: 2,
    desc: 'Aplica Sangrado durante 2 turnos.',
    effects: [{ target: 'enemy', stat: 'bleed', amount: 6, durationTurns: 2 }]
  },
  {
    id: 'eclipseDebilitante',
    name: 'Eclipse Debilitante',
    type: 'active',
    archetypes: ['mistica'],
    cooldownTurns: 3,
    durationTurns: 2,
    desc: 'Reduce el ataque rival durante 2 turnos.',
    effects: [{ target: 'enemy', stat: 'attackFlat', amount: -4, durationTurns: 2 }]
  },
  {
    id: 'fisuraArcana',
    name: 'Fisura Arcana',
    type: 'active',
    archetypes: ['mistica', 'asaltante'],
    cooldownTurns: 3,
    damageMultiplier: 1.05,
    durationTurns: 2,
    desc: 'Causa dano y deja Expuesto al rival durante 2 turnos.',
    effects: [{ target: 'enemy', stat: 'defenseFlat', amount: -4, durationTurns: 2 }]
  },
  {
    id: 'pulsoVital',
    name: 'Pulso Vital',
    type: 'active',
    archetypes: ['support', 'guardiana'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Aplica Regeneracion durante 2 turnos.',
    effects: [{ target: 'self', stat: 'regenTurn', amount: 7, durationTurns: 2 }]
  },
  {
    id: 'selloDeSilencio',
    name: 'Sello De Silencio',
    type: 'active',
    archetypes: ['mistica'],
    cooldownTurns: 4,
    durationTurns: 1,
    desc: 'Impide al rival usar habilidad activa en su siguiente turno.',
    effects: [{ target: 'enemy', stat: 'silence', amount: 1, durationTurns: 1 }]
  },
  {
    id: 'llamaAgonica',
    name: 'Llama Agonica',
    type: 'active',
    archetypes: ['mistica', 'asaltante'],
    cooldownTurns: 3,
    durationTurns: 2,
    desc: 'Quema al rival y castiga su recuperacion.',
    effects: [{ target: 'enemy', stat: 'burn', amount: 5, durationTurns: 2 }]
  },
  {
    id: 'coronaDelEclipse',
    name: 'Corona Del Eclipse',
    type: 'active',
    archetypes: ['mistica', 'guardiana'],
    cooldownTurns: 4,
    damageMultiplier: 1.2,
    durationTurns: 2,
    desc: 'Golpe pesado que deja Expuesto al rival durante 2 turnos.',
    effects: [{ target: 'enemy', stat: 'defenseFlat', amount: -5, durationTurns: 2 }]
  },
  {
    id: 'mareaVoraz',
    name: 'Marea Voraz',
    type: 'active',
    archetypes: ['vampirica', 'salvaje'],
    cooldownTurns: 4,
    damageMultiplier: 1.1,
    lifestealPct: 0.35,
    durationTurns: 2,
    desc: 'Desgarra al rival, roba vida y aplica Sangrado.',
    effects: [{ target: 'enemy', stat: 'bleed', amount: 5, durationTurns: 2 }]
  },
  {
    id: 'renacerSolar',
    name: 'Renacer Solar',
    type: 'active',
    archetypes: ['support', 'mistica'],
    cooldownTurns: 5,
    durationTurns: 2,
    healPercent: 0.22,
    desc: 'Se cura, levanta Escudo y activa Regeneracion por 2 turnos.',
    effects: [
      { target: 'self', stat: 'shield', amount: 12, durationTurns: 2 },
      { target: 'self', stat: 'regenTurn', amount: 8, durationTurns: 2 }
    ]
  },
  {
    id: 'vendavalRasante',
    name: 'Vendaval Rasante',
    type: 'active',
    archetypes: ['asaltante'],
    cooldownTurns: 3,
    damageMultiplier: 1.18,
    durationTurns: 2,
    desc: 'Embiste con un corte veloz y deja Expuesto al objetivo.',
    effects: [{ target: 'enemy', stat: 'defenseFlat', amount: -3, durationTurns: 2 }]
  },
  {
    id: 'resguardoDeRaiz',
    name: 'Resguardo De Raiz',
    type: 'active',
    archetypes: ['guardiana', 'support'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Refuerza el cuerpo con corteza viva, Escudo y Regeneracion.',
    effects: [
      { target: 'self', stat: 'shield', amount: 14, durationTurns: 2 },
      { target: 'self', stat: 'regenTurn', amount: 4, durationTurns: 2 }
    ]
  },
  {
    id: 'marcaDelVacio',
    name: 'Marca Del Vacio',
    type: 'active',
    archetypes: ['mistica'],
    cooldownTurns: 4,
    damageMultiplier: 1.0,
    durationTurns: 1,
    desc: 'Golpea la mente rival y la deja en Silencio durante 1 turno.',
    effects: [{ target: 'enemy', stat: 'silence', amount: 1, durationTurns: 1 }]
  },
  {
    id: 'embateSalvaje',
    name: 'Embate Salvaje',
    type: 'active',
    archetypes: ['salvaje'],
    cooldownTurns: 4,
    damageMultiplier: 1.22,
    durationTurns: 2,
    desc: 'Carga con violencia y activa un impulso de ataque por 2 turnos.',
    effects: [{ target: 'self', stat: 'attackFlat', amount: 4, durationTurns: 2 }]
  },
  {
    id: 'cosechaEscarlata',
    name: 'Cosecha Escarlata',
    type: 'active',
    archetypes: ['vampirica'],
    cooldownTurns: 4,
    damageMultiplier: 1.08,
    lifestealPct: 0.3,
    durationTurns: 2,
    desc: 'Corta, roba vida y deja una Quemadura sangrienta en el rival.',
    effects: [{ target: 'enemy', stat: 'burn', amount: 4, durationTurns: 2 }]
  },
  {
    id: 'pactoLuminar',
    name: 'Pacto Luminar',
    type: 'active',
    archetypes: ['support'],
    cooldownTurns: 4,
    durationTurns: 2,
    healPercent: 0.16,
    desc: 'Restaura vida propia y debilita el ataque rival por 2 turnos.',
    effects: [{ target: 'enemy', stat: 'attackFlat', amount: -3, durationTurns: 2 }]
  },
  {
    id: 'juramentoDelBastion',
    name: 'Juramento Del Bastion',
    type: 'active',
    archetypes: ['guardiana', 'support'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Refuerza la defensa y levanta un escudo para aguantar el intercambio.',
    effects: [
      { target: 'self', stat: 'defenseFlat', amount: 4, durationTurns: 2 },
      { target: 'self', stat: 'shield', amount: 10, durationTurns: 2 }
    ]
  },
  {
    id: 'mareaUmbria',
    name: 'Marea Umbria',
    type: 'active',
    archetypes: ['vampirica', 'mistica'],
    cooldownTurns: 4,
    damageMultiplier: 1.08,
    durationTurns: 2,
    desc: 'Golpea con una ola oscura, quema al rival y marchita su ataque.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 4, durationTurns: 2 },
      { target: 'enemy', stat: 'attackFlat', amount: -2, durationTurns: 2 }
    ]
  },
  {
    id: 'letaniaDelAlba',
    name: 'Letania Del Alba',
    type: 'active',
    archetypes: ['support'],
    cooldownTurns: 4,
    durationTurns: 2,
    healPercent: 0.12,
    desc: 'Entona una letania que restaura vida y fortalece la defensa con regeneracion.',
    effects: [
      { target: 'self', stat: 'defenseFlat', amount: 3, durationTurns: 2 },
      { target: 'self', stat: 'regenTurn', amount: 5, durationTurns: 2 }
    ]
  },
  {
    id: 'decretoDeCeniza',
    name: 'Decreto De Ceniza',
    type: 'active',
    archetypes: ['mistica', 'support'],
    cooldownTurns: 4,
    damageMultiplier: 1.08,
    durationTurns: 2,
    desc: 'Un veredicto ardiente que quema al rival y agrieta su defensa.',
    effects: [
      { target: 'enemy', stat: 'burn', amount: 4, durationTurns: 2 },
      { target: 'enemy', stat: 'defenseFlat', amount: -2, durationTurns: 2 }
    ]
  },
  {
    id: 'himnoDeGuerra',
    name: 'Himno De Guerra',
    type: 'active',
    archetypes: ['support', 'salvaje'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Eleva el fervor de combate, aumentando el ataque y el sosten propio.',
    effects: [
      { target: 'self', stat: 'attackFlat', amount: 3, durationTurns: 2 },
      { target: 'self', stat: 'regenTurn', amount: 3, durationTurns: 2 }
    ]
  },
  {
    id: 'colmilloDeRuina',
    name: 'Colmillo De Ruina',
    type: 'active',
    archetypes: ['asaltante', 'vampirica'],
    cooldownTurns: 3,
    damageMultiplier: 1.12,
    durationTurns: 2,
    desc: 'Perfora la guardia del objetivo y deja un sangrado constante.',
    effects: [{ target: 'enemy', stat: 'bleed', amount: 4, durationTurns: 2 }]
  },
  {
    id: 'selloDelTitan',
    name: 'Sello Del Titan',
    type: 'active',
    archetypes: ['guardiana', 'mistica'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Marca la arena con un sello antiguo que fortalece tu defensa.',
    effects: [
      { target: 'self', stat: 'defenseFlat', amount: 5, durationTurns: 2 },
      { target: 'self', stat: 'shield', amount: 8, durationTurns: 2 }
    ]
  },
  {
    id: 'cazaImplacable',
    name: 'Caza Implacable',
    type: 'passive',
    archetypes: ['asaltante'],
    desc: 'Inflige mas dano a enemigos debilitados.'
  },
  {
    id: 'pielDeGuerra',
    name: 'Piel De Guerra',
    type: 'passive',
    archetypes: ['guardiana'],
    desc: 'Al defender, gana una guardia reforzada y un pequeno escudo.'
  },
  {
    id: 'caparazonEspinas',
    name: 'Caparazon De Espinas',
    type: 'passive',
    archetypes: ['guardiana'],
    desc: 'Refleja parte del dano recibido.'
  },
  {
    id: 'rabiaPrimordial',
    name: 'Rabia Primordial',
    type: 'passive',
    archetypes: ['salvaje'],
    desc: 'Gana ataque cuando cae por debajo del 40% de vida.'
  },
  {
    id: 'auraDeSosten',
    name: 'Aura De Sosten',
    type: 'passive',
    archetypes: ['support', 'vampirica'],
    desc: 'Mejora la regeneracion base.'
  },
  {
    id: 'garraRelampago',
    name: 'Garra Relampago',
    type: 'active',
    archetypes: ['asaltante', 'salvaje'],
    cooldownTurns: 3,
    damageMultiplier: 1.25,
    durationTurns: 1,
    desc: 'Un golpe fulminante que perfora la guardia enemiga.',
    effects: [{ target: 'enemy', stat: 'defenseFlat', amount: -2, durationTurns: 1 }]
  },
  {
    id: 'vorticeSombrío',
    name: 'Vortice Sombrio',
    type: 'active',
    archetypes: ['mistica', 'vampirica'],
    cooldownTurns: 4,
    damageMultiplier: 1.1,
    durationTurns: 2,
    desc: 'Crea un remolino de sombras que drena vida y reduce regeneracion rival.',
    effects: [
      { target: 'enemy', stat: 'attackFlat', amount: -3, durationTurns: 2 },
      { target: 'enemy', stat: 'regenTurn', amount: -3, durationTurns: 2 }
    ]
  },
  {
    id: 'escudoDeCristal',
    name: 'Escudo De Cristal',
    type: 'active',
    archetypes: ['guardiana', 'mistica'],
    cooldownTurns: 5,
    durationTurns: 3,
    desc: 'Crea una barrera cristalina que refleja dano magico.',
    effects: [
      { target: 'self', stat: 'shield', amount: 20, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 3, durationTurns: 2 }
    ]
  },
  {
    id: 'bendicionDeSylvara',
    name: 'Bendicion De Sylvara',
    type: 'active',
    archetypes: ['support', 'guardiana'],
    cooldownTurns: 4,
    durationTurns: 3,
    healPercent: 0.18,
    desc: 'Invoca la bendicion del bosque para curar y fortalecer.',
    effects: [
      { target: 'self', stat: 'regenTurn', amount: 6, durationTurns: 3 },
      { target: 'self', stat: 'defenseFlat', amount: 2, durationTurns: 2 }
    ]
  },
  {
    id: 'furiaCalamidad',
    name: 'Furia Calamidad',
    type: 'active',
    archetypes: ['salvaje', 'asaltante'],
    cooldownTurns: 4,
    damageMultiplier: 1.35,
    durationTurns: 1,
    desc: 'Desata toda la furia acumulada en un golpe devastador.',
    effects: [{ target: 'self', stat: 'attackFlat', amount: 5, durationTurns: 1 }]
  },
  {
    id: 'veloDeNeblina',
    name: 'Velo De Neblina',
    type: 'active',
    archetypes: ['mistica', 'vampirica'],
    cooldownTurns: 3,
    durationTurns: 2,
    desc: 'Envuelve al rival en una niebla que ciega y debilita.',
    effects: [
      { target: 'enemy', stat: 'attackFlat', amount: -4, durationTurns: 2 },
      { target: 'enemy', stat: 'accuracy', amount: -20, durationTurns: 2 }
    ]
  },
  {
    id: 'mantoDeEspinas',
    name: 'Manto De Espinas',
    type: 'active',
    archetypes: ['guardiana', 'support'],
    cooldownTurns: 4,
    durationTurns: 2,
    desc: 'Cubre el cuerpo de espinas que dañan al que ataca.',
    effects: [
      { target: 'self', stat: 'thorns', amount: 8, durationTurns: 2 },
      { target: 'self', stat: 'shield', amount: 10, durationTurns: 2 }
    ]
  },
  {
    id: 'soploDeFenix',
    name: 'Soplo De Fenix',
    type: 'active',
    archetypes: ['support', 'mistica'],
    cooldownTurns: 5,
    durationTurns: 2,
    healPercent: 0.25,
    desc: 'Un aliento de fuego sagrado que purifica y restaura.',
    effects: [
      { target: 'self', stat: 'shield', amount: 15, durationTurns: 2 },
      { target: 'self', stat: 'regenTurn', amount: 5, durationTurns: 2 }
    ]
  },
  {
    id: 'garraTierra',
    name: 'Garras De Tierra',
    type: 'active',
    archetypes: ['asaltante', 'guardiana'],
    cooldownTurns: 3,
    damageMultiplier: 1.15,
    durationTurns: 2,
    desc: 'Invoca garras de piedra que anclan al rival.',
    effects: [{ target: 'enemy', stat: 'bleed', amount: 5, durationTurns: 2 }]
  },
  {
    id: 'invocacionAstral',
    name: 'Invocacion Astral',
    type: 'active',
    archetypes: ['mistica', 'support'],
    cooldownTurns: 5,
    damageMultiplier: 1.0,
    durationTurns: 2,
    desc: 'Llama a fragmentos del firmamento para dañar y cegar.',
    effects: [
      { target: 'enemy', stat: 'accuracy', amount: -15, durationTurns: 2 },
      { target: 'enemy', stat: 'burn', amount: 3, durationTurns: 2 }
    ]
  },
  {
    id: 'torbellinoHelado',
    name: 'Torbellino Helado',
    type: 'active',
    archetypes: ['mistica', 'asaltante'],
    cooldownTurns: 4,
    damageMultiplier: 1.08,
    durationTurns: 2,
    desc: 'Un remolino de hielo que ralentiza y daña.',
    effects: [
      { target: 'enemy', stat: 'defenseFlat', amount: -3, durationTurns: 2 },
      { target: 'enemy', stat: 'burn', amount: 4, durationTurns: 2 }
    ]
  },
  {
    id: 'sedDeSangre',
    name: 'Sed De Sangre',
    type: 'passive',
    archetypes: ['vampirica', 'asaltante'],
    desc: 'Gana mas vida robada cuando el objetivo ya sangra.'
  },
  {
    id: 'corazonDePiedra',
    name: 'Corazon De Piedra',
    type: 'passive',
    archetypes: ['guardiana'],
    desc: 'Inmune a efectos de miedo y reduce dano magico.'
  },
  {
    id: 'ojoDelHuracan',
    name: 'Ojo Del Huracan',
    type: 'passive',
    archetypes: ['mistica', 'support'],
    desc: 'Ignora el primer efecto negativo cada turno.'
  },
  {
    id: 'instintoSalvaje',
    name: 'Instinto Salvaje',
    type: 'passive',
    archetypes: ['salvaje', 'asaltante'],
    desc: 'Ataque automatico adicional cuando la vida es baja.'
  },
  {
    id: 'armaduraOrganica',
    name: 'Armadura Organica',
    type: 'passive',
    archetypes: ['guardiana', 'support'],
    desc: 'Reduce dano recibidos un 10% fijo.'
  },
  {
    id: 'presenciaIntimidante',
    name: 'Presencia Intimidante',
    type: 'passive',
    archetypes: ['vampirica', 'mistica'],
    desc: 'Reduce el ataque del enemigo al comenzar el combate.'
  },
  {
    id: 'estructorSilencioso',
    name: 'Destructor Silencioso',
    type: 'passive',
    archetypes: ['asaltante'],
    desc: 'Inflige dano extra si no ha recibido dano este turno.'
  },
  {
    id: 'ultimoAliento',
    name: 'Ultimo Aliento',
    type: 'passive',
    archetypes: ['support', 'guardiana'],
    desc: 'Al caer por primera vez, revive con 15% de vida.'
  }
];
