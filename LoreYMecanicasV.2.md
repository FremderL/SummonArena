import type { ReactNode } from 'react';

const navItems = [
  ['vision', 'Vision'],
  ['historia', 'Historia'],
  ['dioses', 'Dioses'],
  ['apostoles', 'Apostoles'],
  ['mecanicas', 'Mecanicas'],
  ['mundo', 'Mundo'],
  ['economia', 'Economia'],
  ['npcs', 'NPCs'],
  ['reliquias', 'Reliquias'],
  ['final', 'Final'],
];

const designPillars = [
  {
    title: 'Accion con mando tactico',
    body: 'El jugador pelea en tiempo real, esquiva, bloquea y ejecuta, pero la victoria depende de colocar invocaciones, priorizar objetivos y romper formaciones enemigas.',
  },
  {
    title: 'Pactos con costo moral',
    body: 'Cada dios ofrece poder a cambio de alterar el cuerpo, la memoria o la voluntad del protagonista. Subir de nivel tambien significa decidir que parte humana se sacrifica.',
  },
  {
    title: 'Exploracion de ruina viva',
    body: 'Las zonas cambian con el avance narrativo: rutas se sellan, cadaveres de dioses abren accesos y antiguos enemigos se convierten en mercaderes o jefes.',
  },
  {
    title: 'Invocaciones como identidad',
    body: 'No son simples mascotas. Son doctrinas jugables: muerte para control, guerra para asalto, tiempo para manipulacion, caos para mutacion y sol negro para castigo.',
  },
];

const gods = [
  {
    name: 'Nhal-Kor, el Sepulturero de Nombres',
    domain: 'Muerte, memoria y reposo imposible',
    personality: 'Paciente, compasivo y aterrador. Habla como un padre cansado que sabe que todo amor termina en polvo.',
    history:
      'Antes del Cataclismo de la Segunda Aurora, Nhal-Kor guiaba a los muertos hacia el silencio. Cuando el mundo se rompio, las almas dejaron de partir y quedaron atrapadas en huesos, campanas y rios de ceniza. Nhal-Kor fue acusado de debilidad por los otros dioses, pero en secreto custodio los recuerdos que aun podian salvar a la humanidad.',
    relation:
      'Sus templos son cementerios verticales donde las tumbas cuelgan de cadenas. Los pueblos le temen, aunque rezan a el cuando desean que sus muertos no regresen como bestias.',
    summons:
      'Invocaciones de control: espectros que silencian, guardianes osarios, recolectores de alma y coros funebres que debilitan hordas.',
  },
  {
    name: 'Maelvara, la Santa de las Espadas Rotas',
    domain: 'Guerra, juramento y sacrificio',
    personality: 'Noble, feroz y contradictoria. Detesta la cobardia, pero desprecia aun mas la guerra sin proposito.',
    history:
      'Fue la diosa que enseno a los primeros reyes a defender las ciudades contra los titanes de hambre. Durante la Segunda Aurora, sus ejercitos celestiales fueron devorados por sus propios estandartes cuando los juramentos se corrompieron. Desde entonces solo responde a quienes aceptan perder algo por proteger a otro.',
    relation:
      'Sus fortalezas son trincheras santas. Los sobrevivientes usan sus simbolos para sellar pactos de sangre, matrimonios de guerra y condenas de traicion.',
    summons:
      'Invocaciones de asalto: lanceros juramentados, colosos de hierro, heraldos de carga y verdugos que crecen al recibir dano.',
  },
  {
    name: 'Odran, el Relojero Ciego',
    domain: 'Tiempo, destino y ruina repetida',
    personality: 'Calmo, criptico y cruel por exactitud. No miente; solo omite el instante que destruiria a quien lo escucha.',
    history:
      'Odran construyo los calendarios que mantenian a las estaciones obedientes. Cuando los hombres intentaron encender un sol artificial, vio todos los futuros partirse en miles de arenas. Arranco sus ojos para no elegir uno, pero cada ojo cayo al mundo como un reloj maldito.',
    relation:
      'Sus devotos son cronistas, verdugos y profetas quemados. Las ruinas bajo su influencia repiten batallas pasadas como ecos jugables.',
    summons:
      'Invocaciones de manipulacion: duplicados retardados, centinelas que congelan proyectiles, bestias de retroceso y relojes vivientes que reinician posiciones.',
  },
  {
    name: 'Yssha, la Madre del Desorden Hermoso',
    domain: 'Caos, mutacion y deseo',
    personality: 'Carismatica, maternal y monstruosa. Cree que toda forma estable es una jaula y que la belleza nace de la ruptura.',
    history:
      'Yssha nacio de la primera criatura que quiso ser otra. Durante siglos regalo alas, branquias, ojos y garras a cambio de plegarias. Tras el cataclismo, sus dones se volvieron incontrolables: bosques que respiran, ninos con coronas de insectos y ciudades que cambian de lugar.',
    relation:
      'Es adorada por mutantes, artistas, plagas inteligentes y madres que desean hijos capaces de sobrevivir al mundo muerto.',
    summons:
      'Invocaciones adaptativas: quimeras, enjambres, mimicos organicos y larvas que evolucionan durante el combate segun el dano recibido.',
  },
  {
    name: 'Asterion, el Sol Negro Encadenado',
    domain: 'Fuego sagrado, culpa y juicio',
    personality: 'Majestuoso, severo y roto. Ama a la humanidad como un juez ama la ley: sin ternura, pero con devocion absoluta.',
    history:
      'Asterion era el sol original. Al sentir que los mortales se apagaban, acepto ser drenado para alimentar la Torre Helio, el sol artificial que debia salvar las cosechas. La torre exploto y lo dejo como una estrella negra encadenada al nucleo del mundo.',
    relation:
      'Sus rayos ya no iluminan: revelan pecado. Donde cae su luz, las mentiras arden y los cuerpos impuros se vitrifican.',
    summons:
      'Invocaciones de castigo: serafines carbonizados, lobos de brasa, arcontes de luz negra y soles menores que consumen tanto a enemigos como recursos del jugador.',
  },
];

const apostles = [
  {
    god: 'Nhal-Kor',
    units: [
      {
        name: 'Erebus el Portador de Campanas',
        allegiance: 'Aliado opcional y jefe si se profanan tumbas',
        appearance: 'Un gigante encorvado cubierto por campanas funerarias; bajo la tunica no hay piel, solo nombres escritos en hueso.',
        abilities: 'Marcha del Duelo ralentiza hordas; Campana Final interrumpe conjuros; Juramento de Lapida revive una invocacion destruida con mitad de vida.',
        role: 'Control de masas y soporte defensivo.',
      },
      {
        name: 'Sor Vaela, la Novia del Ultimo Aliento',
        allegiance: 'Jefa principal de la Catedral Osea',
        appearance: 'Una figura nupcial con velo de ceniza y un ramo hecho de dedos momificados.',
        abilities: 'Beso de Mortaja drena vida; Procesion Sin Rostro invoca espectros; Voto de Silencio bloquea habilidades activas.',
        role: 'Duelo magico, castigo a jugadores agresivos y prueba de paciencia.',
      },
    ],
  },
  {
    god: 'Maelvara',
    units: [
      {
        name: 'Kael Diente de Estandarte',
        allegiance: 'Aliado si se salvan prisioneros en Bastion Rojo',
        appearance: 'Caballero sin mandibula que sostiene un estandarte clavado en su propia columna.',
        abilities: 'Carga Jurada rompe escudos; Linea de Sangre aumenta dano de aliados cercanos; No Retroceder lo vuelve inmune al empuje.',
        role: 'Vanguardia, iniciador y potenciador de formaciones.',
      },
      {
        name: 'Morgath de los Mil Juramentos',
        allegiance: 'Jefe de guerra y antagonista recurrente',
        appearance: 'Armadura compuesta por placas de soldados muertos, cada una susurrando un voto incumplido.',
        abilities: 'Desafio del Traidor obliga al jugador a enfrentarlo; Corte de Tribunal ejecuta invocaciones heridas; Estandarte Inverso convierte buffs en debuffs.',
        role: 'Anti-invocador, duelista y prueba de lectura tactica.',
      },
    ],
  },
  {
    god: 'Odran',
    units: [
      {
        name: 'Seraphel Minuto Trece',
        allegiance: 'Mercenario temporal y aliado limitado',
        appearance: 'Un angel mecanico con trece alas finas como agujas de reloj.',
        abilities: 'Desfase mueve unidades a su posicion de hace tres segundos; Minuto Robado reduce enfriamientos; Aguja del Fin marca un objetivo para dano retrasado.',
        role: 'Manipulador de tempo y reposicionamiento.',
      },
      {
        name: 'La Nona Sin Manos',
        allegiance: 'Jefa de puzzle-combate en Observatorio Hundido',
        appearance: 'Anciana flotante cuyo rostro cambia entre infancia, adultez y cadaver.',
        abilities: 'Cuna y Sepulcro invierte edades de unidades; Repeticion obliga a revivir oleadas; Hora Ciega apaga la interfaz durante segundos breves.',
        role: 'Control mental, patrones temporales y presion estrategica.',
      },
    ],
  },
  {
    god: 'Yssha',
    units: [
      {
        name: 'Iluun, Principe de las Larvas',
        allegiance: 'Aliado inestable si se acepta mutacion',
        appearance: 'Nino coronado por antenas doradas, sentado sobre una masa de orugas del tamano de lobos.',
        abilities: 'Eclosion Tactica transforma esbirros muertos en larvas aliadas; Piel Aprendida copia resistencias; Hambre Curiosa consume objetos para ganar mutaciones.',
        role: 'Crecimiento progresivo y adaptacion contra zonas largas.',
      },
      {
        name: 'Tarsia, la Flor que Camina',
        allegiance: 'Jefa o aliada segun trato a los mutados',
        appearance: 'Una mujer arbol con petalos de carne y raices que arrastran mascaras humanas.',
        abilities: 'Polen del Deseo confunde enemigos; Jardin de Dientes crea trampas; Injerto Materno fusiona dos invocaciones por tiempo limitado.',
        role: 'Control de terreno, sinergia y riesgo biologico.',
      },
    ],
  },
  {
    god: 'Asterion',
    units: [
      {
        name: 'Solm, el Arconte Carbonizado',
        allegiance: 'Aliado final si se rechaza la divinidad facil',
        appearance: 'Serafin sin rostro con seis alas quemadas y una corona que gotea luz negra.',
        abilities: 'Juicio de Ceniza marca mentirosos; Halo Punitivo quema corrupcion; Decreto Solar ejecuta elites con poca vida pero consume Fe Oscura.',
        role: 'Dano explosivo, purificacion y alto costo de recursos.',
      },
      {
        name: 'Lucerna, Hija de la Torre Helio',
        allegiance: 'Jefa final antes del nucleo',
        appearance: 'Humana vitrificada con un reactor sagrado en el pecho, rodeada de fragmentos de sol artificial.',
        abilities: 'Lanza Fotofaga atraviesa lineas; Claridad Cruel revela y dana unidades ocultas; Aurora Fallida reinicia la arena en fuego.',
        role: 'Prueba de posicionamiento y administracion de sacrificios.',
      },
    ],
  },
];

const minions = [
  {
    type: 'Raidos de Ceniza',
    behavior: 'Rapidos, cobardes y numerosos. Rodean al jugador, huyen si muere su lider y regresan cuando una invocacion esta aislada.',
    variants: 'En el Paramo llevan cuchillas oxidadas; en la Marisma de Vidrio se vuelven translucidos; en el Nucleo Solar explotan al morir.',
  },
  {
    type: 'Mastodontes de Escoria',
    behavior: 'Tanques lentos que bloquean corredores y absorben proyectiles. Obligan a usar flanqueo, control o dano verdadero.',
    variants: 'Los de Bastion tienen armadura militar; los de Catedral portan sarcofagos; los de Torre Helio tienen placas vitrificadas.',
  },
  {
    type: 'Salmistas Huecos',
    behavior: 'Magicos de apoyo. Cantan para curar, acelerar o resucitar esbirros. Son prioridad tactica.',
    variants: 'Los de Nhal-Kor silencian; los de Odran rebobinan curaciones; los de Asterion convierten sanacion en quemadura.',
  },
  {
    type: 'Quimeras de Yssha',
    behavior: 'Cazadores que mutan segun el dano recibido. Si se les golpea solo con fuego, desarrollan piel refractaria.',
    variants: 'Acuaticas en la Marisma; aladas en el Observatorio; florales en jardines contaminados.',
  },
  {
    type: 'Relojes Carnivoros',
    behavior: 'Constructos de Odran que predicen rutas y castigan patrones repetidos. Si el jugador abusa de una tecnica, la esquivan.',
    variants: 'De bolsillo como enjambre; de torre como elite; de arena negra como mini jefe.',
  },
];

const zones = [
  {
    name: 'Paramo de la Segunda Aurora',
    ambience: 'Un desierto de ceniza donde el cielo parece una herida circular. Aqui empieza el juego, entre caravanas muertas y antenas religiosas caidas.',
    enemies: 'Raidos de Ceniza, perros vitrificados, salmistas novatos y saqueadores que venden organos de invocador.',
    exploration: 'Tutorial organico: se aprenden esquiva, primer pacto, lectura de rastros y recuperacion de fragmentos en altares rotos.',
    reward: 'Primer nucleo de invocacion, acceso a la Caravana del Hueso y reliquias comunes de supervivencia.',
  },
  {
    name: 'Bastion Rojo de Maelvara',
    ambience: 'Fortaleza-trinchera construida con tanques, lanzas, reliquias militares y murallas que sangran cuando alguien rompe un juramento.',
    enemies: 'Mastodontes de Escoria, caballeros desertores, verdugos con escudo y Morgath como jefe de etapa.',
    exploration: 'Rutas alternativas segun se liberen o sacrifiquen prisioneros. La moral del bastion altera precios y aliados.',
    reward: 'Apostol Kael como aliado, artes de guerra, mejora de formaciones y acceso a tiendas de armas pesadas.',
  },
  {
    name: 'Marisma de Vidrio de Yssha',
    ambience: 'Pantano brillante donde los arboles tienen pulmones y el agua refleja cuerpos posibles, no cuerpos reales.',
    enemies: 'Quimeras, enjambres larvarios, cultistas mutados y Tarsia como jefa variable.',
    exploration: 'Biomas que cambian si el jugador acepta mutaciones. Se pueden cultivar invocaciones organicas con recursos raros.',
    reward: 'Mutaciones pasivas, acceso a trueque biologico y fragmentos de quimera adaptable.',
  },
  {
    name: 'Observatorio Hundido de Odran',
    ambience: 'Una ciudad astronomica sumergida en arena negra. Sus relojes aun miden dias que nunca ocurrieron.',
    enemies: 'Relojes Carnivoros, cronistas quemados, duplicados del jugador y la Nona Sin Manos.',
    exploration: 'Puzzles de ciclos temporales: una puerta se abre matando a un enemigo antes de haberlo encontrado, otra requiere perder voluntariamente una pelea menor.',
    reward: 'Habilidades de rebobinado, invocaciones retardadas y reliquias epicas de manipulacion temporal.',
  },
  {
    name: 'Catedral Osea de Nhal-Kor',
    ambience: 'Necropolis vertical donde los muertos cuelgan como campanas y cada escalon recita el nombre de alguien olvidado.',
    enemies: 'Salmistas Huecos, mastodontes-sarcofago, espectros judiciales y Sor Vaela.',
    exploration: 'El jugador recupera recuerdos perdidos del protagonista y decide cuales conservar como habilidades o entregar como moneda sagrada.',
    reward: 'Invocaciones de reposo, memoria como recurso, mejora de resurreccion y llaves para el nucleo final.',
  },
  {
    name: 'Torre Helio y Nucleo del Sol Negro',
    ambience: 'La instalacion postapocaliptica que perfora el centro del mundo. Es templo, reactor y cadaver de dios al mismo tiempo.',
    enemies: 'Serafines carbonizados, soldados vitrificados, Lucerna y el Avatar Encadenado de Asterion.',
    exploration: 'Zona final lineal y solemne. Cada dios exige una ultima decision que afecta la batalla final, no el cierre del argumento.',
    reward: 'Resolucion del pacto, forma final del protagonista y cierre definitivo del ciclo de invocaciones.',
  },
];

const relics = [
  {
    name: 'Clavo de Campana',
    rarity: 'Comun',
    lore: 'Extraido de una tumba que seguia sonando bajo tierra.',
    effect: 'Las invocaciones derrotadas dejan una onda que ralentiza enemigos cercanos un segundo.',
  },
  {
    name: 'Venda del Juramentado',
    rarity: 'Comun',
    lore: 'Tela usada para cubrir los ojos de soldados que no querian ver a quien defendian.',
    effect: 'Al bloquear en el ultimo instante, la invocacion mas cercana gana armadura temporal.',
  },
  {
    name: 'Larva de Oro Frio',
    rarity: 'Raro',
    lore: 'Un embrion de Yssha que no nace hasta que su dueno esta a punto de morir.',
    effect: 'Una vez por arena, evita la muerte y convierte parte de la vida maxima en poder de invocacion.',
  },
  {
    name: 'Aguja del Minuto Perdido',
    rarity: 'Raro',
    lore: 'La manecilla de un reloj que marco una hora borrada de todos los calendarios.',
    effect: 'Permite cancelar una orden tactica y recuperar el costo si se hace en menos de dos segundos.',
  },
  {
    name: 'Estandarte de los Cobardes Salvados',
    rarity: 'Epico',
    lore: 'Bandera tejida con nombres de quienes huyeron y aun asi sobrevivieron para cuidar a otros.',
    effect: 'Las invocaciones que retroceden no pierden moral; al reagruparse, su siguiente ataque aturde.',
  },
  {
    name: 'Ojo Ciego de Odran',
    rarity: 'Epico',
    lore: 'Uno de los ojos que el dios arranco para no condenar un futuro sobre otro.',
    effect: 'Muestra la intencion del ataque enemigo mas peligroso, pero aumenta el dano recibido si se ignora la advertencia.',
  },
  {
    name: 'Corazon Vitrificado de Lucerna',
    rarity: 'Legendario',
    lore: 'El reactor sagrado de la hija de la Torre Helio, todavia latiendo con luz negra.',
    effect: 'Activa Juicio Total: todas las invocaciones descargan su habilidad maxima, luego quedan en ceniza hasta el proximo descanso.',
  },
  {
    name: 'Libro de los Nombres Devueltos',
    rarity: 'Legendario',
    lore: 'La unica obra que Nhal-Kor escribio con sus propias manos.',
    effect: 'Permite recuperar un recuerdo entregado como moneda y transformarlo en una habilidad pasiva permanente.',
  },
];

const npcs = [
  {
    name: 'Mara de los Dientes de Plata',
    role: 'Comerciante de la Caravana del Hueso',
    personality: 'Pragmatica, burlona y supersticiosa. Nunca pregunta de donde viene un objeto si aun gotea.',
    function: 'Compra y venta de consumibles, mapas, cebos de esbirro y fragmentos menores. Sus precios bajan si el jugador protege caravanas.',
    dialogue: 'Si algo te susurra desde la mochila, te cobro doble. Si te salva la vida, me debes una historia.',
  },
  {
    name: 'Bramm, Herrero Sin Sombra',
    role: 'Herrero y mejorador de equipo',
    personality: 'Taciturno, culpable y obsesionado con fabricar un arma que no necesite matar.',
    function: 'Mejora armas, catalizadores de invocacion y armaduras. Acepta hierro, hueso santo y recuerdos de batalla.',
    dialogue: 'El metal recuerda la mano que lo uso. Dame una espada asesina y te devolvere una que dude.',
  },
  {
    name: 'Elya la Cronista Quemada',
    role: 'Sabia y guia narrativa',
    personality: 'Serena, ironica y agotada por haber visto morir al protagonista en futuros posibles.',
    function: 'Explica lore, marca rutas de historia, identifica reliquias y traduce profecias de Odran.',
    dialogue: 'No busco que ganes. Busco que, al perder, no repitas la misma derrota.',
  },
  {
    name: 'Rusk el Nino Campana',
    role: 'Personaje con historia y medidor moral',
    personality: 'Inocente de forma inquietante; habla con muertos como si fueran vecinos.',
    function: 'Revela consecuencias de decisiones. Si se le protege, desbloquea misiones de memoria y finales de NPC cerrados.',
    dialogue: 'Los muertos dicen que caminas con demasiadas voces. Yo creo que una de ellas todavia eres tu.',
  },
  {
    name: 'Abralux, Ex Sacerdote Solar',
    role: 'Intermediario de Asterion',
    personality: 'Fanatico quebrado que desea redencion, no perdon.',
    function: 'Permite purgar corrupcion, comprar ritos solares y acceder a desafios de juicio con grandes recompensas.',
    dialogue: 'La luz no cura. La luz decide que parte de ti merece seguir oscura.',
  },
];

const rewards = [
  'Marcas de Sal: moneda comun para tiendas, reparaciones y consumibles. Se obtiene de saqueadores, contratos y cofres de ruina.',
  'Oro Negro: moneda rara nacida de sangre divina coagulada. Sirve para reliquias epicas, pactos avanzados y compras a apostoles.',
  'Fragmentos de Invocacion: piezas de alma, hueso o doctrina. Al reunir suficientes, desbloquean criaturas o variantes de una familia.',
  'Ecos de Memoria: recurso narrativo y mecanico. Se gana al resolver tumbas, salvar NPCs o vencer jefes; mejora pasivas y abre dialogos.',
  'Nucleos de Arena: recompensa de jefes. Aumentan el limite de invocaciones activas, desbloquean ordenes tacticas y nuevas ranuras de reliquia.',
];

const mechanics = [
  {
    title: 'Combate base',
    body: 'El protagonista usa arma principal, catalizador de invocacion y tres tecnicas activas. La accion exige lectura de animaciones, esquiva con resistencia, bloqueo perfecto y ejecuciones contra enemigos quebrados.',
  },
  {
    title: 'Invocacion de criaturas',
    body: 'Cada invocacion cuesta Esencia, ocupa Capacidad de Vinculo y pertenece a una doctrina divina. Se ordenan con comandos simples: avanzar, proteger, flanquear, canalizar y sacrificarse. Invocar sin pensar genera Deuda de Pacto, una barra que aumenta corrupcion y puede volver hostil a una criatura.',
  },
  {
    title: 'Estrategia de arena',
    body: 'Las arenas tienen altares, cuellos de botella, zonas de luz negra, lodo mutageno y relojes de repeticion. El jugador gana al controlar espacio, no solo al hacer dano.',
  },
  {
    title: 'Progresion del jugador',
    body: 'Subir de nivel entrega puntos de Cuerpo, Voluntad y Doctrina. Cuerpo mejora supervivencia, Voluntad reduce costos y Doctrina profundiza una escuela divina. No se puede maximizar todo en una partida.',
  },
  {
    title: 'Dificultad creciente',
    body: 'Los enemigos aprenden patrones repetidos, aparecen apostoles rivales y las zonas mutan. La dificultad no aumenta solo por numeros: introduce contramedidas a invocaciones favoritas.',
  },
  {
    title: 'Muerte y retorno',
    body: 'Al morir, el protagonista despierta en un altar con parte de sus Marcas de Sal perdidas y una Cicatriz de Pacto. Muchas cicatrices dan poder, pero alteran dialogos, finales de NPC y comportamiento de aliados.',
  },
];

const storyStages = [
  {
    title: 'I. Ceniza y primer nombre',
    body: 'El protagonista, llamado oficialmente El Vinculante, despierta en el Paramo sin recordar su nombre real. En su pecho hay un sello con cinco grietas divinas. La primera invocacion surge al defender a Rusk de raidos: un perro de hueso que reconoce al protagonista como antiguo traidor de la Torre Helio.',
  },
  {
    title: 'II. La guerra que aun sangra',
    body: 'En Bastion Rojo se revela que la humanidad no cayo por castigo divino, sino por intentar fabricar un sol usando sangre de dioses cautivos. Maelvara prueba al protagonista con decisiones de mando: salvar soldados inutiles o sacrificar pocos para abrir una ruta estrategica.',
  },
  {
    title: 'III. La forma del deseo',
    body: 'La Marisma de Vidrio muestra comunidades mutadas que no desean curacion. Yssha confronta al jugador con una pregunta: si sobrevivir exige dejar de ser humano, que valor tiene la pureza?',
  },
  {
    title: 'IV. El futuro que acusa',
    body: 'En el Observatorio, Odran muestra futuros donde cada dios vence y todos son horribles. Tambien revela que el protagonista fue el arquitecto militar de la Torre Helio y firmo el protocolo que encadeno a Asterion.',
  },
  {
    title: 'V. Los muertos no absuelven',
    body: 'En la Catedral Osea, Nhal-Kor devuelve el nombre real del protagonista: Sareth Val. Sareth no era un elegido, sino el culpable que borro su memoria para poder vivir. El jugador decide conservar ese recuerdo como dolor o entregarlo para obtener poder.',
  },
  {
    title: 'VI. La ultima invocacion',
    body: 'La Torre Helio exige reunir a los cinco dioses, no para obedecerlos, sino para obligarlos a renunciar a su derecho de poseer el mundo. La batalla final enfrenta a Sareth contra el Avatar Encadenado de Asterion y las doctrinas divinas que intentan reclamar el nuevo ciclo.',
  },
];

const shopSystems = [
  'Compra: consumibles, mapas incompletos, catalizadores, reliquias comunes y contratos de caza.',
  'Venta: armas, restos de esbirro, reliquias duplicadas y fragmentos no vinculados. Los objetos con historia pueden venderse, pero eso cierra misiones personales.',
  'Mejora: Bramm refuerza equipo mediante ramas, no niveles lineales: filo, peso, canalizacion, memoria y sacrificio.',
  'Trueque: Yssha no acepta dinero, pide organos mutados; Nhal-Kor pide recuerdos; Odran pide segundos de vida maxima temporal; Asterion pide corrupcion purgada.',
  'Reputacion: ayudar a caravanas baja precios; matar apostoles aliados sube costos; abusar de deuda de pacto hace que comerciantes teman atender al jugador.',
];

function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-stone-800/80 py-14">
      {kicker ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">{kicker}</p> : null}
      <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-stone-100 md:text-5xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-[#0b0908] text-stone-200 selection:bg-amber-500 selection:text-black">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(146,64,14,0.24),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0),#0b0908_70%)]" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 px-5 lg:grid-cols-[220px_1fr] lg:gap-12 lg:px-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-0 flex h-screen flex-col justify-center gap-3 text-sm text-stone-500">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-amber-600">Indice</p>
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="transition hover:translate-x-1 hover:text-amber-400">
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <div>
          <header className="relative flex min-h-screen flex-col justify-end overflow-hidden py-16 md:py-24">
            <div className="absolute inset-x-[-20%] top-10 h-72 animate-[pulse_8s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(245,158,11,0.2),transparent_60%)] blur-3xl" />
            <div className="relative max-w-5xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.45em] text-amber-500">Documento de diseno narrativo</p>
              <h1 className="text-6xl font-black uppercase leading-none tracking-[-0.08em] text-stone-100 md:text-8xl lg:text-9xl">
                Summon Arena
              </h1>
              <p className="mt-8 max-w-3xl text-xl leading-8 text-stone-300 md:text-2xl md:leading-9">
                Videojuego conceptual de accion y estrategia con invocaciones, ambientado en un mundo de fantasia oscura postapocaliptica donde los dioses ya no salvan: administran las ruinas que provocaron.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#historia" className="bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-black transition hover:bg-amber-300">
                  Leer historia
                </a>
                <a href="#mecanicas" className="border border-stone-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-stone-100 transition hover:border-amber-500 hover:text-amber-300">
                  Ver sistemas
                </a>
              </div>
            </div>
          </header>

          <Section id="vision" title="Vision General" kicker="Objetivo general">
            <div className="grid gap-8 md:grid-cols-2">
              {designPillars.map((pillar) => (
                <article key={pillar.title} className="border-l border-amber-700/70 pl-5">
                  <h3 className="text-xl font-semibold text-amber-100">{pillar.title}</h3>
                  <p className="mt-3 leading-7 text-stone-400">{pillar.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 max-w-4xl text-lg leading-8 text-stone-300">
              <p>
                La fantasia de poder central no es ser un heroe puro, sino un comandante maldito capaz de negociar con dioses derrotados, monstruos hambrientos y memorias culpables. Todo sistema apunta al mismo dilema: para reconstruir el mundo, el jugador debe usar las mismas fuerzas que lo destruyeron sin convertirse en su nuevo tirano.
              </p>
            </div>
          </Section>

          <Section id="historia" title="Historia Principal" kicker="Origen, conflicto y desarrollo">
            <div className="max-w-5xl space-y-10">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-semibold text-stone-100">Origen del mundo</h3>
                  <p className="mt-4 leading-8 text-stone-400">
                    El mundo de Vharad fue creado cuando cinco dioses encerraron el caos primordial dentro de una arena infinita. La arena se solidifico en continentes, mares y cielos. Durante milenios, los dioses gobernaron mediante pactos: ofrecian lluvia, guerra justa, muerte serena, ciclos de tiempo y mutacion controlada. La humanidad prospero hasta que descubrio que los pactos no eran bendiciones, sino cadenas invisibles sobre el destino.
                  </p>
                  <p className="mt-4 leading-8 text-stone-400">
                    Para liberarse, los reinos construyeron la Torre Helio, una maquina-templo destinada a drenar a Asterion y crear un sol obediente. El experimento causo la Segunda Aurora: un amanecer negro que quemo cosechas, fracturo el tiempo, impidio el descanso de los muertos y convirtio la evolucion en plaga.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-stone-100">Conflicto central</h3>
                  <p className="mt-4 leading-8 text-stone-400">
                    Los dioses, heridos y debilitados, ya no pueden dominar directamente el mundo. En su lugar compiten mediante apostoles, cultos e invocadores. Cada uno quiere usar a Sareth Val, el protagonista, como recipiente para reiniciar Vharad bajo su doctrina. La humanidad necesita una fuente de orden, pero aceptar un unico dios significaria cambiar una ruina por una prision metafisica.
                  </p>
                  <p className="mt-4 leading-8 text-stone-400">
                    Sareth es el unico capaz de vincular invocaciones de todos los dioses porque su culpa participo en el cataclismo. Su alma fue partida en cinco por la explosion de la Torre Helio. Cada grieta puede contener poder divino, pero tambien una version de la verdad que intento olvidar.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Desarrollo narrativo por etapas</h3>
                <div className="mt-6 space-y-6">
                  {storyStages.map((stage) => (
                    <article key={stage.title} className="border-l border-stone-700 pl-5">
                      <h4 className="text-lg font-semibold text-amber-200">{stage.title}</h4>
                      <p className="mt-2 leading-7 text-stone-400">{stage.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="dioses" title="Dioses Principales" kicker="Panteon quebrado">
            <div className="space-y-10">
              {gods.map((god) => (
                <article key={god.name} className="grid gap-6 border-l border-amber-900/80 pl-5 md:grid-cols-[280px_1fr]">
                  <div>
                    <h3 className="text-2xl font-semibold text-amber-100">{god.name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-amber-600">{god.domain}</p>
                  </div>
                  <div className="space-y-4 leading-7 text-stone-400">
                    <p><span className="font-semibold text-stone-200">Personalidad:</span> {god.personality}</p>
                    <p><span className="font-semibold text-stone-200">Historia:</span> {god.history}</p>
                    <p><span className="font-semibold text-stone-200">Relacion con el mundo:</span> {god.relation}</p>
                    <p><span className="font-semibold text-stone-200">Invocaciones otorgadas:</span> {god.summons}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="apostoles" title="Apostoles" kicker="Sirvientes divinos y jefes">
            <div className="space-y-12">
              {apostles.map((group) => (
                <div key={group.god}>
                  <h3 className="mb-5 text-2xl font-semibold text-stone-100">Apostoles de {group.god}</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {group.units.map((unit) => (
                      <article key={unit.name} className="border border-stone-800 bg-stone-950/40 p-6 transition duration-300 hover:border-amber-800/70 hover:bg-stone-900/60">
                        <h4 className="text-xl font-semibold text-amber-100">{unit.name}</h4>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">{unit.allegiance}</p>
                        <p className="mt-4 leading-7 text-stone-400"><span className="text-stone-200">Apariencia:</span> {unit.appearance}</p>
                        <p className="mt-3 leading-7 text-stone-400"><span className="text-stone-200">Habilidades:</span> {unit.abilities}</p>
                        <p className="mt-3 leading-7 text-stone-400"><span className="text-stone-200">Rol:</span> {unit.role}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="mecanicas" title="Mecanicas y Sistemas" kicker="Accion estrategica">
            <div className="grid gap-6 md:grid-cols-2">
              {mechanics.map((item) => (
                <article key={item.title} className="border-t border-stone-800 pt-5">
                  <h3 className="text-xl font-semibold text-amber-100">{item.title}</h3>
                  <p className="mt-3 leading-7 text-stone-400">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Jerarquias</h3>
                <p className="mt-4 leading-7 text-stone-400">
                  Dioses dominan doctrinas, apostoles ejecutan voluntad, campeones lideran zonas, elites protegen objetivos y esbirros presionan recursos. El jugador escala esa jerarquia al derrotar, pactar o liberar cada nivel de mando.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Aliados</h3>
                <p className="mt-4 leading-7 text-stone-400">
                  Algunos apostoles y NPCs se unen si el jugador respeta sus valores. No son permanentes por defecto: cada aliado tiene una condicion moral, una deuda y una escena de cierre.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Invocaciones</h3>
                <p className="mt-4 leading-7 text-stone-400">
                  Las criaturas suben por uso, pero tambien por coherencia. Un espectro mejora mas si se usa para controlar y proteger que si se fuerza como atacante frontal.
                </p>
              </div>
            </div>
          </Section>

          <Section id="mundo" title="Mundo y Zonas" kicker="Vharad despues de la Segunda Aurora">
            <div className="space-y-8">
              {zones.map((zone, index) => (
                <article key={zone.name} className="grid gap-5 border-l border-stone-800 pl-5 md:grid-cols-[80px_1fr]">
                  <div className="text-4xl font-black text-amber-900/80">0{index + 1}</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-amber-100">{zone.name}</h3>
                    <p className="mt-3 leading-7 text-stone-400"><span className="text-stone-200">Ambientacion:</span> {zone.ambience}</p>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Enemigos:</span> {zone.enemies}</p>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Exploracion:</span> {zone.exploration}</p>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Recompensa:</span> {zone.reward}</p>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="economia" title="Economia, Tienda y Recompensas" kicker="Recursos con significado">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Recompensas</h3>
                <div className="mt-5 space-y-4">
                  {rewards.map((reward) => (
                    <p key={reward} className="border-l border-amber-900/70 pl-4 leading-7 text-stone-400">{reward}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-stone-100">Tienda</h3>
                <div className="mt-5 space-y-4">
                  {shopSystems.map((system) => (
                    <p key={system} className="border-l border-stone-800 pl-4 leading-7 text-stone-400">{system}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-stone-800 pt-8">
              <h3 className="text-2xl font-semibold text-stone-100">Exploracion y botin</h3>
              <p className="mt-4 max-w-4xl leading-8 text-stone-400">
                Cada zona contiene arenas principales, rutas de riesgo, criptas de memoria, altares de pacto y eventos de caravana. Las mejores recompensas no aparecen en cofres evidentes: se obtienen al resolver contradicciones del mundo, como enterrar a un jefe en vez de saquearlo o dejar vivir a una quimera que luego abre un atajo biologico.
              </p>
            </div>
          </Section>

          <Section id="npcs" title="NPCs Principales" kicker="Voces en la ruina">
            <div className="grid gap-6 md:grid-cols-2">
              {npcs.map((npc) => (
                <article key={npc.name} className="border-t border-stone-800 pt-5">
                  <h3 className="text-xl font-semibold text-amber-100">{npc.name}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.22em] text-stone-500">{npc.role}</p>
                  <p className="mt-4 leading-7 text-stone-400"><span className="text-stone-200">Personalidad:</span> {npc.personality}</p>
                  <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Funcion:</span> {npc.function}</p>
                  <blockquote className="mt-4 border-l border-amber-800 pl-4 italic text-stone-300">{npc.dialogue}</blockquote>
                </article>
              ))}
            </div>
          </Section>

          <Section id="reliquias" title="Reliquias y Esbirros" kicker="Objetos unicos y amenazas comunes">
            <div>
              <h3 className="text-2xl font-semibold text-stone-100">Reliquias</h3>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {relics.map((relic) => (
                  <article key={relic.name} className="border border-stone-800 bg-black/20 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-lg font-semibold text-amber-100">{relic.name}</h4>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">{relic.rarity}</span>
                    </div>
                    <p className="mt-3 leading-7 text-stone-400"><span className="text-stone-200">Historia:</span> {relic.lore}</p>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Efecto:</span> {relic.effect}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-stone-100">Esbirros comunes</h3>
              <div className="mt-6 space-y-5">
                {minions.map((minion) => (
                  <article key={minion.type} className="border-l border-stone-800 pl-5">
                    <h4 className="text-lg font-semibold text-amber-100">{minion.type}</h4>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Comportamiento:</span> {minion.behavior}</p>
                    <p className="mt-2 leading-7 text-stone-400"><span className="text-stone-200">Variantes por zona:</span> {minion.variants}</p>
                  </article>
                ))}
              </div>
            </div>
          </Section>

          <Section id="final" title="Final Cerrado" kicker="Resolucion filosofica">
            <div className="max-w-5xl space-y-6 text-lg leading-8 text-stone-300">
              <p>
                En el nucleo de la Torre Helio, Sareth comprende que la invocacion suprema no consiste en llamar a una criatura, sino en convocar una ley nueva. Los cinco dioses ofrecen sus finales: reposo absoluto, guerra noble eterna, destino ordenado, mutacion sin muerte o juicio solar. Todos son coherentes, todos son monstruosos.
              </p>
              <p>
                El jugador usa los Nucleos de Arena para invertir el pacto original: en vez de recibir poder de los dioses, los obliga a depositar una parte de si mismos en la humanidad restante. Nhal-Kor entrega memoria sin esclavizar a los muertos, Maelvara entrega valor sin guerra perpetua, Odran entrega ciclos sin destino fijo, Yssha entrega adaptacion sin perdida de identidad y Asterion entrega calor sin juicio.
              </p>
              <p>
                Sareth muere cerrando la Torre Helio desde dentro. No asciende, no es perdonado y no gobierna. Su ultima invocacion es una arena vacia sobre la que cae lluvia real por primera vez en cien anos. Los apostoles supervivientes pierden su mandato divino y deben elegir vivir como seres libres. Rusk encuentra el nombre de Sareth en una campana pequena, pero esta no suena: significa que, al fin, un muerto descanso.
              </p>
              <p className="border-l border-amber-700 pl-5 text-amber-100">
                El cierre es definitivo: los dioses no desaparecen, pero dejan de poseer el destino. Vharad no queda salvado; queda posible. La victoria no es restaurar el mundo antiguo, sino impedir que cualquier poder vuelva a llamarse eterno.
              </p>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}