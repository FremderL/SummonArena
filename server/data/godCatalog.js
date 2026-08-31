module.exports = Object.freeze([
  {
    id: 'helion',
    name: 'Helion',
    title: 'Soberano del Alba Inextinguible',
    alignment: 'luminoso',
    domains: ['luz', 'brasas sagradas', 'renacimiento', 'firmamento'],
    governsRaces: [
      'Serafines del Velo',
      'Dracos Magmaticos',
      'Fenix del Cenit',
      'Quimeras Astrales',
      'Heraldos del Santuario'
    ],
    description: 'Helion sostiene la llama original del mundo y protege a las especies ligadas al alba, la aurora y la firmeza espiritual.',
    lore: 'Cuando el primer cielo se rasgo, Helion lo cosio con fuego sagrado. Sus hijos recuerdan ese acto como la promesa de que incluso un mundo roto puede volver a levantarse.',
    signatureAbilities: [
      { id: 'coronaDelEclipse', name: 'Corona del Eclipse', role: 'castiga defensas y abre ventanas de remate.' },
      { id: 'renacerSolar', name: 'Renacer Solar', role: 'restaura vida y devuelve al campo una presencia casi divina.' },
      { id: 'letaniaDelAlba', name: 'Letania del Alba', role: 'sostiene a sus heraldos mientras la luz no se extinga.' }
    ],
    projectedStats: { vida: 240, ataque: 34, defensa: 22, regen: 12 },
    rewardTrack: {
      soundtrackId: 'helion_theme',
      soundtrackName: 'Helion, Hymn of the First Dawn',
      soundtrackAsset: 'assets/music/gods/helion_theme.ogg',
      profileBackgroundId: 'helion_parhelion'
    }
  },
  {
    id: 'kairon',
    name: 'Kairon',
    title: 'Cazador del Rayo Errante',
    alignment: 'tempestuoso',
    domains: ['viento', 'caceria', 'trueno', 'velocidad'],
    governsRaces: [
      'Fauces Etereas',
      'Hidras Tempestivas',
      'Behemoths del Trueno'
    ],
    description: 'Kairon gobierna a las especies que viven del impulso, la embestida y la persecucion perfecta sobre un horizonte siempre cambiante.',
    lore: 'Ninguna frontera dura mucho bajo Kairon. Sus criaturas aprendieron a sobrevivir en la carrera, con el rugido del cielo como unica ley estable.',
    signatureAbilities: [
      { id: 'vendavalRasante', name: 'Vendaval Rasante', role: 'rompe la postura rival y acelera el ritmo del duelo.' },
      { id: 'embateSalvaje', name: 'Embate Salvaje', role: 'abre ventanas de burst para el remate.' },
      { id: 'himnoDeGuerra', name: 'Himno de Guerra', role: 'convierte la ofensiva en una marcha imparable.' }
    ],
    projectedStats: { vida: 228, ataque: 38, defensa: 18, regen: 8 },
    rewardTrack: {
      soundtrackId: 'kairon_theme',
      soundtrackName: 'Kairon, Hunt Beyond the Storm',
      soundtrackAsset: 'assets/music/gods/kairon_theme.ogg',
      profileBackgroundId: 'kairon_tempest'
    }
  },
  {
    id: 'sylvara',
    name: 'Sylvara',
    title: 'Madre del Verdor Perdurable',
    alignment: 'vital',
    domains: ['bosque', 'raiz', 'hielo ritual', 'tiempo petrificado'],
    governsRaces: [
      'Colosos del Verdor',
      'Centinelas del Hielo',
      'Basiliscos de Cuarzo',
      'Mantis Cronicas',
      'Titanes Ferricos',
      'Guardianes Verdantes'
    ],
    description: 'Sylvara rige a los pueblos que persisten: guardianes, vigias, colosos y criaturas que convierten el paso del tiempo en estructura.',
    lore: 'Se dice que Sylvara fue quien enseño al mundo a cicatrizar. Alli donde otras fuerzas avanzaban o consumian, ella dejo memoria, corteza y paciencia.',
    signatureAbilities: [
      { id: 'resguardoDeRaiz', name: 'Resguardo de Raiz', role: 'levanta una defensa viva y regenerativa.' },
      { id: 'selloDelTitan', name: 'Sello del Titan', role: 'consolida escudos y presencia de muro.' },
      { id: 'juramentoDelBastion', name: 'Juramento del Bastion', role: 'transforma resistencia en compromiso sagrado.' }
    ],
    projectedStats: { vida: 260, ataque: 28, defensa: 28, regen: 11 },
    rewardTrack: {
      soundtrackId: 'sylvara_theme',
      soundtrackName: 'Sylvara, Roots Beneath the Ruin',
      soundtrackAsset: 'assets/music/gods/sylvara_theme.ogg',
      profileBackgroundId: 'sylvara_canopy'
    }
  },
  {
    id: 'nerea',
    name: 'Nerea',
    title: 'Reina de las Profundidades Veladas',
    alignment: 'abismal',
    domains: ['mareas', 'profundidad', 'corrientes selladas', 'hambre del mar'],
    governsRaces: [
      'Mareas Coronadas',
      'Colosos de Marea'
    ],
    description: 'Nerea gobierna los linajes de agua oscura y presion antigua, donde la paciencia del oceano se mezcla con el instinto de arrastrar todo hacia abajo.',
    lore: 'Sus templos no se alzan: se hunden. En ellos, Nerea prometio abrigo a quienes aceptaran que todo reino acaba obedeciendo a la marea.',
    signatureAbilities: [
      { id: 'mareaVoraz', name: 'Marea Voraz', role: 'drena vida y profundiza la guerra de desgaste.' },
      { id: 'golpeVoraz', name: 'Golpe Voraz', role: 'convierte el dano infligido en supervivencia.' },
      { id: 'mareaUmbria', name: 'Marea Umbria', role: 'marchita la ofensiva enemiga con oscuridad marina.' }
    ],
    projectedStats: { vida: 252, ataque: 31, defensa: 24, regen: 10 },
    rewardTrack: {
      soundtrackId: 'nerea_theme',
      soundtrackName: 'Nerea, Crown of the Drowned Deep',
      soundtrackAsset: 'assets/music/gods/nerea_theme.ogg',
      profileBackgroundId: 'nerea_tidecourt'
    }
  },
  {
    id: 'vorath',
    name: 'Vorath',
    title: 'El Dios Que Nacio Del Abismo',
    alignment: 'corruptor',
    domains: ['vacio', 'corrupcion', 'sangre', 'ceniza', 'silencio'],
    governsRaces: [
      'Acechantes Umbrios',
      'Juggernauts Infernos',
      'Leviatanes de la Fosa',
      'Segadores Luna Roja',
      'Djinn del Umbral',
      'Hierofantes de Ceniza'
    ],
    description: 'Vorath no pertenecia al orden original. Su sola presencia deformo legados, consumio razas y torcio a apostoles y dioses por igual.',
    lore: 'No se le recuerda por haber creado vida, sino por haberla rehecho a la fuerza. Donde Vorath posa la mano, la eternidad deja de ser bendicion y se vuelve condena.',
    signatureAbilities: [
      { id: 'marcaDelVacio', name: 'Marca del Vacio', role: 'silencia y rompe el compas del enemigo.' },
      { id: 'decretoDeCeniza', name: 'Decreto de Ceniza', role: 'erosiona defensa y esperanza al mismo tiempo.' },
      { id: 'cosechaEscarlata', name: 'Cosecha Escarlata', role: 'premia la agresion con sangre y persistencia.' }
    ],
    projectedStats: { vida: 270, ataque: 36, defensa: 24, regen: 9 },
    rewardTrack: {
      soundtrackId: 'vorath_theme',
      soundtrackName: 'Vorath, Last Word of the Abyss',
      soundtrackAsset: 'assets/music/gods/vorath_theme.ogg',
      profileBackgroundId: 'vorath_black_sun'
    }
  }
]);
