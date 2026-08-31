Original prompt: Las habilidades dentro del archivo, /cliente/abilities.js, no estan aplicandose como deverian, las pasivas parecen no funcionar.

# Vision Jugable - Summon Arena

## Identidad Del Juego

Summon Arena debe sentirse como un juego de duelos tacticos de criatura unica, con una capa fuerte de coleccion, progresion y enfrentamientos contra jefes.

La fantasia principal del jugador es:
- invocar una criatura poderosa
- aprender su estilo
- dominar sus tiempos y habilidades
- usarla para vencer otros jugadores o derrotar jefes unicos

No debe sentirse solo como "gacha + numeros". La victoria debe venir de decisiones, lectura del rival y conocimiento de la criatura.

## Pilares Del Proyecto

### 1. Criaturas Con Identidad

Cada criatura debe tener una identidad clara y facil de reconocer.

Eso significa:
- rol visible
- habilidad con personalidad
- fortalezas y debilidades
- estilo de juego propio

Ejemplos de identidad:
- agresor rapido que castiga recuperacion
- tanque que gana al defender y contraatacar
- vampirico que se cura al hacer dano
- controlador que debilita y bloquea habilidades
- berserker que mejora cuando baja de vida

### 2. Combate Tactico Facil De Entender

El combate debe ser simple de leer, pero dificil de dominar.

La base actual de acciones tiene buen potencial:
- atacar
- defender
- recuperar
- usar habilidad

La profundidad debe venir de:
- cooldowns
- estados alterados
- buffs y debuffs
- lectura del turno rival
- momento correcto para usar la habilidad

Objetivo:
- un jugador nuevo entiende el combate en minutos
- un jugador experto descubre counters, timings y patrones

### 3. Jefes Memorables

Los jefes no deben sentirse como una criatura mas con mas vida.

Deben tener:
- nombre fuerte
- presencia visual
- patron de acciones
- mecanica especial
- identidad propia

Ejemplos de diseño:
- jefe que entra en fase 2 al bajar de cierta vida
- jefe que carga una habilidad devastadora cada 3 turnos
- jefe que castiga si el jugador se cura demasiado
- jefe que invoca un escudo temporal y obliga a cambiar el ritmo

Derrotar un jefe debe sentirse como resolver una mecanica, no solo ganar por stats.

### 4. Progresion Visible

El jugador necesita sentir crecimiento aun cuando no gane todo.

La progresion ideal debe incluir:
- nuevas invocaciones
- historial de criaturas obtenidas
- jefes derrotados
- banners o insignias
- ranking
- metas y recompensas

Esto hace que el juego tenga vida aun fuera del combate.

## Direccion Jugable Recomendada

La direccion recomendada para Summon Arena es:

`coleccion + jefes + combate tactico`

Eso significa:
- la invocacion es importante
- las criaturas importan por su identidad
- los jefes son contenido central
- el PvP existe como espacio competitivo

No recomiendo llevarlo a un juego puramente arcade ni a un auto-battler pasivo.

La mejor version de este proyecto es una donde:
- el jugador se encarina con sus criaturas
- aprende a jugar con ellas
- consigue victorias por estrategia
- y presume sus logros contra jefes o en ranking

## Loop Principal Del Jugador

El loop ideal del juego deberia ser:

1. Obtener llaves o recompensas
2. Invocar criatura
3. Aprender su estilo de combate
4. Probarla en VS Jefe o PvP
5. Ganar recompensas, banners o progreso
6. Volver a invocar o perfeccionar estrategia

## Estructura De Arquetipos

Para dar claridad al roster, conviene agrupar criaturas por arquetipos.

Arquetipos recomendados:
- Asaltante: mucho dano, poca defensa
- Guardiana: aguanta, protege y contraataca
- Vampirica: roba vida
- Mistica: aplica efectos y control
- Salvaje: crece con el caos del combate
- Support: mejora regen, escudos o reduccion de dano

Esto ayuda a:
- balancear
- crear criaturas nuevas
- disenar jefes
- comunicar fantasy de cada carta

## Sistema De Estados

Para que el combate gane profundidad, deberia apoyarse en estados visibles.

Estados recomendados:
- Sangrado: dano por turno
- Quemadura: dano por turno con castigo al recuperar
- Escudo: absorbe dano temporal
- Debilidad: reduce ataque
- Expuesto: reduce defensa
- Regeneracion: cura al inicio o final de turno
- Silencio: bloquea habilidad activa
- Espinas: refleja dano

Regla importante:
- pocos estados al inicio
- iconos y duracion siempre visibles
- nombres faciles de entender

## Filosofia De Rareza

La rareza no debe significar solo "mas fuerte".

Debe significar:
- mas identidad
- mecanicas mas interesantes
- fantasia mas marcada
- mejor presentacion visual

Ideal:
- una criatura comun bien jugada puede vencer a una rara mal usada
- una legendaria o mitica ofrece complejidad y momentos memorables

## Filosofia De Jefes

Los jefes deben ser el contenido estrella del PvE.

Cada jefe deberia tener:
- titulo unico
- lore corto
- banner de victoria
- mecanica distintiva
- recompensa o logro asociado

A mediano plazo, cada jefe deberia sentirse casi como un "encuentro" y no solo como un enemigo.

## Filosofia Del PvP

El PvP debe premiar:
- lectura del rival
- control del cooldown
- timing
- conocimiento del matchup

Debe evitar:
- victorias automaticas por stats
- combates demasiado largos sin tension
- habilidades imposibles de contestar

## Direccion Visual

La presentacion visual debe reforzar la fantasia de carta de criatura poderosa.

Elementos clave:
- carta premium y detallada
- invocacion espectacular
- jefe con presencia visual propia
- feedback fuerte en impacto, cura, escudo y habilidad
- ranking, banners y logros visibles

La UI debe hacer sentir que el jugador colecciona entidades raras y peligrosas, no solo fichas de combate.

## Roadmap Jugable Recomendado

### Etapa 1. Profundidad Basica
- definir arquetipos
- rehacer habilidades hacia estilos de juego claros
- agregar estados basicos
- mejorar lectura de cooldowns y efectos

### Etapa 2. Jefes De Verdad
- varios jefes
- patrones distintos
- fases o ultimates
- banners e historial de victorias

### Etapa 3. Progresion
- historial de partidas
- coleccion
- logros
- recompensas diarias o misiones

### Etapa 4. Competitivo
- ranking mas formal
- temporadas
- perfil publico
- mejores recompensas visuales

## Riesgos A Evitar

- Demasiadas habilidades sin claridad
- Que la rareza vuelva irrelevante la estrategia
- Jefes inflados de vida sin mecanica
- PvP decidido por RNG sin control
- UI bonita pero poco clara en combate

## Decision De Diseño Recomendada

Si hubiera que resumir la direccion del proyecto en una frase:

`Summon Arena debe ser un juego de criaturas coleccionables donde cada duelo se gana por identidad, timing y estrategia, y donde los jefes se convierten en el gran contenido memorable del jugador.`

## Proxima Traduccion A Produccion

El siguiente paso practico recomendado es convertir esta vision en tres listas:

1. Arquetipos oficiales de criaturas
2. Estados y reglas de combate base
3. Primer set de 8 a 12 habilidades realmente bien diseñadas

Eso seria la mejor base para empezar el rework jugable sin improvisar.

Tambien podemos hacer una historia, El como termino todo asi en un mundo de enfrentamientos, la historia de cada criatura de los jefes, su origen, Por que estan peleando. sinceramente aun no tengo una historia escrita, y como progresar en esa historia.
