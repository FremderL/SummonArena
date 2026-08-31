const SHOP_CATALOG = Object.freeze([
  {
    id: 'key_token',
    name: 'Llave del Nexus',
    description: 'Compra 1 llave adicional para volver a invocar.',
    category: 'progreso',
    costGold: 45,
    effectType: 'keys',
    amount: 1,
    icon: 'Llave'
  },
  {
    id: 'essence_orb',
    name: 'Orbe de Eternidad',
    description: 'Entrega 1 Esencia de Eternidad para preservar criaturas.',
    category: 'progreso',
    costGold: 140,
    effectType: 'essence',
    amount: 1,
    icon: 'Esencia'
  },
  {
    id: 'restoration_rite',
    name: 'Rito de Restauracion',
    description: 'Restaura por completo la vida de tu criatura activa.',
    category: 'consumible',
    costGold: 30,
    effectType: 'restoreCreature',
    amount: 'full',
    icon: 'Curacion'
  },
  {
    id: 'mending_salve',
    name: 'Salva De Marea',
    description: 'Guarda una cura parcial reutilizable fuera de combate para tu criatura activa.',
    category: 'consumible',
    costGold: 24,
    effectType: 'addConsumable',
    consumableId: 'mending_salve',
    amount: 1,
    icon: 'Consumible'
  },
  {
    id: 'star_sigil',
    name: 'Sigilo De Resonancia',
    description: 'Garantiza que tu siguiente invocacion sea al menos de rareza rara.',
    category: 'consumible',
    costGold: 70,
    effectType: 'addConsumable',
    consumableId: 'star_sigil',
    amount: 1,
    icon: 'Consumible'
  },
  {
    id: 'bg_eclipse_velvet',
    name: 'Fondo: Terciopelo del Eclipse',
    description: 'Desbloquea un fondo cosmetico de eclipse para tu interfaz.',
    category: 'cosmetico',
    costGold: 90,
    effectType: 'unlockBackground',
    backgroundId: 'eclipse_velvet',
    icon: 'Fondo'
  },
  {
    id: 'bg_verdant_sanctum',
    name: 'Fondo: Santuario Verdor',
    description: 'Desbloquea un fondo cosmetico inspirado en reliquias del bosque.',
    category: 'cosmetico',
    costGold: 90,
    effectType: 'unlockBackground',
    backgroundId: 'verdant_sanctum',
    icon: 'Fondo'
  },
  {
    id: 'bg_abyssal_throne',
    name: 'Fondo: Trono Abisal',
    description: 'Desbloquea un fondo cosmetico dominado por mareas y vacio.',
    category: 'cosmetico',
    costGold: 110,
    effectType: 'unlockBackground',
    backgroundId: 'abyssal_throne',
    icon: 'Fondo'
  },
  {
    id: 'frame_solar',
    name: 'Marco: Alba Ritual',
    description: 'Desbloquea un marco cosmetico dorado para tus cartas.',
    category: 'cosmetico',
    costGold: 80,
    effectType: 'unlockCardFrame',
    cardFrameId: 'solar_frame',
    icon: 'Marco'
  },
  {
    id: 'frame_verdant',
    name: 'Marco: Verdor Antiguo',
    description: 'Desbloquea un marco vegetal y relicario para tus cartas.',
    category: 'cosmetico',
    costGold: 85,
    effectType: 'unlockCardFrame',
    cardFrameId: 'verdant_frame',
    icon: 'Marco'
  },
  {
    id: 'frame_abyss',
    name: 'Marco: Marea Umbria',
    description: 'Desbloquea un marco abisal para tus invocaciones.',
    category: 'cosmetico',
    costGold: 95,
    effectType: 'unlockCardFrame',
    cardFrameId: 'abyss_frame',
    icon: 'Marco'
  },
  {
    id: 'bg_glacier_cathedral',
    name: 'Fondo: Catedral Glaciar',
    description: 'Desbloquea un fondo cosmetico de hielo ritual para tu encabezado.',
    category: 'cosmetico',
    costGold: 105,
    effectType: 'unlockBackground',
    backgroundId: 'glacier_cathedral',
    icon: 'Fondo'
  },
  {
    id: 'bg_infernal_forge',
    name: 'Fondo: Forja Infernal',
    description: 'Desbloquea un fondo cosmetico de metal y brasas para tu encabezado.',
    category: 'cosmetico',
    costGold: 115,
    effectType: 'unlockBackground',
    backgroundId: 'infernal_forge',
    icon: 'Fondo'
  },
  {
    id: 'frame_glacier',
    name: 'Marco: Vitrales de Hielo',
    description: 'Desbloquea un marco glaciar para tus cartas.',
    category: 'cosmetico',
    costGold: 92,
    effectType: 'unlockCardFrame',
    cardFrameId: 'glacier_frame',
    icon: 'Marco'
  },
  {
    id: 'frame_infernal',
    name: 'Marco: Forja en Guerra',
    description: 'Desbloquea un marco infernal para tus cartas.',
    category: 'cosmetico',
    costGold: 102,
    effectType: 'unlockCardFrame',
    cardFrameId: 'infernal_frame',
    icon: 'Marco'
  }
]);

module.exports = SHOP_CATALOG;
