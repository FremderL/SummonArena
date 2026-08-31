module.exports = Object.freeze({
  aurelion_eclipse: {
    relicId: 'relic_eclipse_shard',
    relicName: 'Fragmento Del Eclipse',
    attunement: 'Helion',
    effectText: 'Recuerdo del Custodio del Eclipse y de la primera fractura del velo.',
    lore: 'Una esquirla dorada que vibra cuando una defensa demasiado confiada esta por quebrarse.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 2, durationTurns: 99 }
    ]
  },
  kaelith_vendaval: {
    relicId: 'relic_storm_fang',
    relicName: 'Colmillo De Tempestad',
    attunement: 'Kairon',
    effectText: 'Trofeo del Soberano del Vendaval, simbolo de velocidad y remate.',
    lore: 'Cruje con electricidad residual y con el eco de mil cacerias abiertas en la tormenta.',
    combatEffects: [
      { stat: 'attackPct', amount: 0.12, durationTurns: 99 }
    ]
  },
  solara_regente: {
    relicId: 'relic_cenit_plume',
    relicName: 'Pluma Del Cenit',
    attunement: 'Helion',
    effectText: 'Vestigio de la Regente Cenital y de su renacer perpetuo.',
    lore: 'Nunca se enfria del todo. Su resplandor recuerda a las razas que aun resisten al ocaso.',
    combatEffects: [
      { stat: 'regenTurn', amount: 4, durationTurns: 99 }
    ]
  },
  nyxar_abyss: {
    relicId: 'relic_fosa_heart',
    relicName: 'Corazon De La Fosa',
    attunement: 'Vorath',
    effectText: 'Nucleo oscuro de la Hambre de la Fosa.',
    lore: 'Late como si el abismo siguiera hambriento y quisiera volver a tragarse el mundo.',
    combatEffects: [
      { stat: 'attackFlat', amount: 2, durationTurns: 99 },
      { stat: 'regenTurn', amount: 1, durationTurns: 99 }
    ]
  },
  orophis_bastion: {
    relicId: 'relic_savia_core',
    relicName: 'Nucleo De Savia Ancestral',
    attunement: 'Sylvara',
    effectText: 'Reliquia viva del Bastion del Verdor.',
    lore: 'Una savia mineralizada que aun respira con la memoria de bosques extinguidos.',
    combatEffects: [
      { stat: 'shield', amount: 12, durationTurns: 2 }
    ]
  },
  velkaris_umbral: {
    relicId: 'relic_umbral_page',
    relicName: 'Pagina Del Umbral',
    attunement: 'Vorath',
    effectText: 'Hoja arrancada del archivo prohibido de Velkaris.',
    lore: 'Las runas cambian de orden cada vez que alguien pronuncia el nombre de un dios caido.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 1, durationTurns: 99 },
      { stat: 'regenTurn', amount: 2, durationTurns: 99 }
    ]
  },
  seraphel_ceniza: {
    relicId: 'relic_ashen_edict',
    relicName: 'Edicto De Ceniza',
    attunement: 'Vorath',
    effectText: 'Acta funeraria de una raza consumida por el abismo.',
    lore: 'La ceniza no se desprende. Parece insistir en que alguien recuerde lo borrado.',
    combatEffects: [
      { stat: 'attackPct', amount: 0.08, durationTurns: 99 },
      { stat: 'defenseFlat', amount: 1, durationTurns: 99 }
    ]
  },
  thalmora_mareas: {
    relicId: 'relic_tide_crown',
    relicName: 'Corona De Marea Velada',
    attunement: 'Nerea',
    effectText: 'Simbolo de soberania de la Reina de las Mareas Veladas.',
    lore: 'Cada gota suspendida en su metal cuenta una traicion distinta del oceano abisal.',
    combatEffects: [
      { stat: 'shield', amount: 8, durationTurns: 2 },
      { stat: 'attackFlat', amount: 1, durationTurns: 99 }
    ]
  },
  morvath_forge: {
    relicId: 'relic_forge_heart',
    relicName: 'Corazon De La Forja Herida',
    attunement: 'Vorath',
    effectText: 'Nucleo ardiente del apostol que marcho sobre hierro y brasas.',
    lore: 'Golpea aun sin martillo, como si recordara el ruido de una guerra que nunca se apago.',
    combatEffects: [
      { stat: 'attackFlat', amount: 4, durationTurns: 99 }
    ]
  },
  selkaith_glacier: {
    relicId: 'relic_glacier_eye',
    relicName: 'Ojo De La Escarcha Vigia',
    attunement: 'Sylvara',
    effectText: 'Cristal helado del centinela que guardo el ultimo umbral de invierno.',
    lore: 'Dentro de su cuarzo tiemblan vitrales de hielo y plegarias congeladas.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 3, durationTurns: 99 }
    ]
  },
  zarynth_quartz: {
    relicId: 'relic_quartz_iris',
    relicName: 'Iris De Cuarzo Partido',
    attunement: 'Sylvara',
    effectText: 'Fragmento del oraculo basilisco que vio la fractura antes que nadie.',
    lore: 'Refleja un mundo roto en infinitas caras, como si nunca aceptara un solo futuro.',
    combatEffects: [
      { stat: 'regenTurn', amount: 2, durationTurns: 99 },
      { stat: 'attackPct', amount: 0.06, durationTurns: 99 }
    ]
  },
  rhaziel_horizon: {
    relicId: 'relic_horizon_fang',
    relicName: 'Colmillo Del Horizonte',
    attunement: 'Kairon',
    effectText: 'Trofeo del cazador que abre la primera herida del cielo.',
    lore: 'Su filo silba aun cuando no hay viento, como si buscara una presa mas alla del borde del mundo.',
    combatEffects: [
      { stat: 'attackFlat', amount: 3, durationTurns: 99 },
      { stat: 'attackPct', amount: 0.04, durationTurns: 99 }
    ]
  },
  vulkris_magma: {
    relicId: 'relic_magma_scale',
    relicName: 'Escama Del Crater Sagrado',
    attunement: 'Helion',
    effectText: 'Escama de un draco que ardia incluso despues del juicio final.',
    lore: 'Guarda calor como una brasa sellada en roca. Alimenta a quien decide pelear sin titubear.',
    combatEffects: [
      { stat: 'attackFlat', amount: 2, durationTurns: 99 },
      { stat: 'shield', amount: 8, durationTurns: 2 }
    ]
  },
  noctyra_umbra: {
    relicId: 'relic_umbra_claw',
    relicName: 'Garra Del Eclipse Negro',
    attunement: 'Vorath',
    effectText: 'Rastro de una cazadora que aprendio a abrir heridas en la oscuridad.',
    lore: 'La sombra bajo la garra nunca permanece quieta. Siempre parece buscar un nuevo cuello.',
    combatEffects: [
      { stat: 'attackPct', amount: 0.08, durationTurns: 99 },
      { stat: 'regenTurn', amount: 1, durationTurns: 99 }
    ]
  },
  xelthis_chrono: {
    relicId: 'relic_chrono_spine',
    relicName: 'Espina Del Reloj Quebrado',
    attunement: 'Sylvara',
    effectText: 'Vestigio de la mantis que corto segundos del aire.',
    lore: 'Vibra con un pulso desigual. A veces parece adelantarse al golpe antes de que ocurra.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 2, durationTurns: 99 },
      { stat: 'attackPct', amount: 0.05, durationTurns: 99 }
    ]
  },
  ferron_ironwall: {
    relicId: 'relic_ironwall_core',
    relicName: 'Nucleo De Muralla Ferrica',
    attunement: 'Sylvara',
    effectText: 'Corazon de un titan hecho para no retroceder.',
    lore: 'Pesa como una fortaleza entera. Responde mejor cuanto mas larga se vuelve la guerra.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 4, durationTurns: 99 },
      { stat: 'shield', amount: 10, durationTurns: 2 }
    ]
  },
  valzhar_bloodmoon: {
    relicId: 'relic_bloodmoon_sickle',
    relicName: 'Hoz De Luna Roja',
    attunement: 'Vorath',
    effectText: 'Arma ceremonial de un segador que nunca dejo de cosechar.',
    lore: 'En su hoja quedan manchas que ninguna aurora logra borrar.',
    combatEffects: [
      { stat: 'attackFlat', amount: 2, durationTurns: 99 },
      { stat: 'regenTurn', amount: 2, durationTurns: 99 }
    ]
  },
  thyron_thunder: {
    relicId: 'relic_thunder_heart',
    relicName: 'Corazon Del Estampido',
    attunement: 'Kairon',
    effectText: 'Nucleo cargado del behemoth que corria con la tormenta.',
    lore: 'Late con golpes irregulares, cada uno como el preludio de una embestida imposible de detener.',
    combatEffects: [
      { stat: 'attackPct', amount: 0.1, durationTurns: 99 }
    ]
  },
  elaria_sanctum: {
    relicId: 'relic_sanctum_bloom',
    relicName: 'Flor Del Santuario Ultimo',
    attunement: 'Sylvara',
    effectText: 'Brote del jardin sagrado que aun recuerda como sostener la vida.',
    lore: 'Nunca se marchita. Su perfume parece una promesa de refugio en medio del derrumbe.',
    combatEffects: [
      { stat: 'regenTurn', amount: 3, durationTurns: 99 },
      { stat: 'defenseFlat', amount: 1, durationTurns: 99 }
    ]
  },
  astrael_firmament: {
    relicId: 'relic_firmament_eye',
    relicName: 'Ojo Del Firmamento Roto',
    attunement: 'Helion',
    effectText: 'Ojo cristalizado de una quimera nacida bajo constelaciones heridas.',
    lore: 'Refleja estrellas que ya no existen, pero aun asi conserva su empuje hacia la luz.',
    combatEffects: [
      { stat: 'attackPct', amount: 0.07, durationTurns: 99 },
      { stat: 'defenseFlat', amount: 1, durationTurns: 99 }
    ]
  },
  luminara_sanctuary: {
    relicId: 'relic_sanctuary_taper',
    relicName: 'Cirio Del Santuario',
    attunement: 'Helion',
    effectText: 'Vela eterna de una heralda que se nego a dejar morir el alba.',
    lore: 'Su llama es serena y obstinada. No hiere, pero sostiene a quien aun tiene un juramento.',
    combatEffects: [
      { stat: 'regenTurn', amount: 4, durationTurns: 99 }
    ]
  },
  targor_tidebound: {
    relicId: 'relic_tidebound_anchor',
    relicName: 'Ancla De La Marea Dormida',
    attunement: 'Nerea',
    effectText: 'Ancla arrancada a un coloso que guardaba puertas sumergidas.',
    lore: 'Se siente pesada como una costa entera. Donde descansa, el combate parece asentarse.',
    combatEffects: [
      { stat: 'defenseFlat', amount: 3, durationTurns: 99 },
      { stat: 'regenTurn', amount: 1, durationTurns: 99 }
    ]
  }
});
