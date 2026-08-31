/* abilities.js
   Responsable: definir habilidades visibles para UI y cliente
*/
(() => {
  const ALL = [
    { id: 'golpeVoraz', name: 'Golpe Voraz', type: 'active', cooldownTurns: 3, desc: 'Inflige dano y cura parte del dano causado.' },
    { id: 'muroAstral', name: 'Muro Astral', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Otorga un escudo por 2 turnos.' },
    { id: 'sangreAbierta', name: 'Sangre Abierta', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Aplica Sangrado durante 2 turnos.' },
    { id: 'eclipseDebilitante', name: 'Eclipse Debilitante', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Reduce el ataque rival durante 2 turnos.' },
    { id: 'fisuraArcana', name: 'Fisura Arcana', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Causa dano y deja Expuesto al rival durante 2 turnos.' },
    { id: 'pulsoVital', name: 'Pulso Vital', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Aplica Regeneracion durante 2 turnos.' },
    { id: 'selloDeSilencio', name: 'Sello De Silencio', type: 'active', cooldownTurns: 4, durationTurns: 1, desc: 'Impide al rival usar habilidad activa en su siguiente turno.' },
    { id: 'llamaAgonica', name: 'Llama Agonica', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Quema al rival y castiga su recuperacion.' },
    { id: 'coronaDelEclipse', name: 'Corona Del Eclipse', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Golpe pesado que deja Expuesto al rival durante 2 turnos.' },
    { id: 'mareaVoraz', name: 'Marea Voraz', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Desgarra al rival, roba vida y aplica Sangrado.' },
    { id: 'renacerSolar', name: 'Renacer Solar', type: 'active', cooldownTurns: 5, durationTurns: 2, desc: 'Se cura, levanta Escudo y activa Regeneracion por 2 turnos.' },
    { id: 'vendavalRasante', name: 'Vendaval Rasante', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Embiste con un corte veloz y deja Expuesto al objetivo.' },
    { id: 'resguardoDeRaiz', name: 'Resguardo De Raiz', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Refuerza el cuerpo con corteza viva, Escudo y Regeneracion.' },
    { id: 'marcaDelVacio', name: 'Marca Del Vacio', type: 'active', cooldownTurns: 4, durationTurns: 1, desc: 'Golpea la mente rival y la deja en Silencio durante 1 turno.' },
    { id: 'embateSalvaje', name: 'Embate Salvaje', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Carga con violencia y activa un impulso de ataque por 2 turnos.' },
    { id: 'cosechaEscarlata', name: 'Cosecha Escarlata', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Corta, roba vida y deja una Quemadura sangrienta en el rival.' },
    { id: 'pactoLuminar', name: 'Pacto Luminar', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Restaura vida propia y debilita el ataque rival por 2 turnos.' },
    { id: 'juramentoDelBastion', name: 'Juramento Del Bastion', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Refuerza la defensa y levanta un escudo para aguantar el intercambio.' },
    { id: 'mareaUmbria', name: 'Marea Umbria', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Golpea con una ola oscura, quema al rival y marchita su ataque.' },
    { id: 'letaniaDelAlba', name: 'Letania Del Alba', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Entona una letania que restaura vida y fortalece la defensa con regeneracion.' },
    { id: 'decretoDeCeniza', name: 'Decreto De Ceniza', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Un veredicto ardiente que quema al rival y agrieta su defensa.' },
    { id: 'himnoDeGuerra', name: 'Himno De Guerra', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Eleva el fervor de combate, aumentando el ataque y el sosten propio.' },
    { id: 'colmilloDeRuina', name: 'Colmillo De Ruina', type: 'active', cooldownTurns: 3, durationTurns: 2, desc: 'Perfora la guardia del objetivo y deja un sangrado constante.' },
    { id: 'selloDelTitan', name: 'Sello Del Titan', type: 'active', cooldownTurns: 4, durationTurns: 2, desc: 'Marca la arena con un sello antiguo que fortalece tu defensa.' },
    { id: 'cazaImplacable', name: 'Caza Implacable', type: 'passive', desc: 'Inflige mas dano a enemigos debilitados.' },
    { id: 'pielDeGuerra', name: 'Piel De Guerra', type: 'passive', desc: 'Al defender, gana una guardia reforzada y un pequeno escudo.' },
    { id: 'caparazonEspinas', name: 'Caparazon De Espinas', type: 'passive', desc: 'Refleja parte del dano recibido.' },
    { id: 'rabiaPrimordial', name: 'Rabia Primordial', type: 'passive', desc: 'Gana ataque cuando cae por debajo del 40% de vida.' },
    { id: 'auraDeSosten', name: 'Aura De Sosten', type: 'passive', desc: 'Mejora la regeneracion base.' }
  ];

  window.ABILITIES = { ALL };
})();
