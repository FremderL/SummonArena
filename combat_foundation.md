# Base De Combate - Summon Arena

## Objetivo

Este documento traduce la vision jugable a una base practica para produccion.

Las 3 piezas de inicio son:
1. Arquetipos oficiales
2. Estados base del combate
3. Primer set de habilidades nucleares

La idea es que estas reglas sirvan como columna vertebral antes de agregar mas criaturas, jefes o historia.

## Opinion Sobre La Historia

Agregar historia es totalmente factible y no arruina el juego.

De hecho, puede mejorar mucho:
- la identidad de criaturas
- la presencia de los jefes
- el valor de coleccion
- la progresion del jugador

Pero recomiendo este orden:
1. definir primero el combate y las identidades jugables
2. despues escribir el lore alrededor de esos roles
3. por ultimo convertir ese lore en progresion narrativa

Si hacemos la historia demasiado pronto, corremos el riesgo de escribir mucho sobre criaturas o jefes que luego cambien de rol, habilidad o tono.

La mejor forma de integrar historia es:
- lore corto por criatura
- origen claro por jefe
- contexto simple del mundo
- progresion narrativa en enfrentamientos importantes

No recomiendo empezar con una historia gigante. Recomiendo empezar con:
- una premisa del mundo
- un conflicto central
- 3 jefes fundacionales
- un motivo de por que invocamos y peleamos

## 1. Arquetipos Oficiales

### Asaltante
- Rol: presion ofensiva
- Fortaleza: alto dano, castiga errores
- Debilidad: poca defensa o poca estabilidad
- Patron: quiere cerrar la pelea rapido

### Guardiana
- Rol: aguantar y responder
- Fortaleza: defensa alta, escudos, contraataque
- Debilidad: dano base moderado
- Patron: gana si controla el ritmo

### Vampirica
- Rol: desgaste y supervivencia agresiva
- Fortaleza: robo de vida, regeneracion por dano
- Debilidad: depende de conectar golpes
- Patron: se vuelve mas peligrosa si no la rematas

### Mistica
- Rol: control y efectos
- Fortaleza: debuffs, silencio, quemadura, manipular turnos
- Debilidad: stats medios o fragilidad
- Patron: gana por ventaja progresiva

### Salvaje
- Rol: escalado por caos
- Fortaleza: se potencia con dano recibido, estados o turnos
- Debilidad: inicio menos estable
- Patron: mientras mas larga la pelea, mas amenaza

### Support
- Rol: utilidad tactica
- Fortaleza: regen, escudos, limpieza o mejora temporal
- Debilidad: dano menos explosivo
- Patron: gana por valor y control del tempo

## 2. Estados Base Del Combate

Estos son los estados recomendados para la primera version tactica del sistema.

### Sangrado
- Efecto: pierde vida al final del turno
- Duracion sugerida: 2 turnos
- Uso: presion constante contra tanques o defensas

### Quemadura
- Efecto: pierde vida al final del turno y recupera menos al usar `Recuperar`
- Duracion sugerida: 2 turnos
- Uso: castiga estilo pasivo

### Escudo
- Efecto: absorbe una cantidad fija de dano
- Duracion sugerida: 2 turnos o hasta romperse
- Uso: defensa activa y tempo

### Debilidad
- Efecto: reduce el ataque base temporalmente
- Duracion sugerida: 2 turnos
- Uso: control contra asaltantes

### Expuesto
- Efecto: reduce defensa temporalmente o aumenta dano recibido
- Duracion sugerida: 2 turnos
- Uso: preparar burst

### Regeneracion
- Efecto: cura al final del turno
- Duracion sugerida: 2 turnos
- Uso: sustain y control de ritmo

### Silencio
- Efecto: bloquea habilidad activa mientras dure
- Duracion sugerida: 1 turno
- Uso: respuesta tactica a criaturas dependientes de habilidad

### Espinas
- Efecto: refleja parte del dano recibido
- Duracion sugerida: 2 turnos
- Uso: castigar agresion directa

## Reglas Base De Estados

- Ningun estado base debe durar mas de 2 turnos en la primera iteracion, salvo casos especiales de jefe.
- Todos los estados deben ser visibles en UI.
- No introducir mas de 5 estados activos simultaneos por criatura en la primera etapa.
- Los estados deben tener texto simple y nombres comprensibles.

## 3. Primer Set De Habilidades Nucleares

Estas 12 habilidades forman una primera base sana para el roster.

### 1. Golpe Voraz
- Arquetipo: Vampirica
- Tipo: activa
- Efecto: hace dano y cura una parte del dano infligido
- Rol: sustain ofensivo

### 2. Muro Astral
- Arquetipo: Guardiana
- Tipo: activa
- Efecto: gana escudo por 2 turnos
- Rol: absorcion de burst

### 3. Caza Implacable
- Arquetipo: Asaltante
- Tipo: pasiva
- Efecto: hace dano extra a objetivos por debajo de cierto porcentaje de vida
- Rol: remate

### 4. Sangre Abierta
- Arquetipo: Asaltante
- Tipo: activa
- Efecto: aplica Sangrado por 2 turnos
- Rol: presion

### 5. Eclipse Debilitante
- Arquetipo: Mistica
- Tipo: activa
- Efecto: aplica Debilidad por 2 turnos
- Rol: control

### 6. Fisura Arcana
- Arquetipo: Mistica
- Tipo: activa
- Efecto: aplica Expuesto por 2 turnos
- Rol: preparar burst

### 7. Caparazon De Espinas
- Arquetipo: Guardiana
- Tipo: pasiva
- Efecto: refleja dano al recibir ataques directos
- Rol: castigo al ataque frontal

### 8. Pulso Vital
- Arquetipo: Support
- Tipo: activa
- Efecto: aplica Regeneracion por 2 turnos
- Rol: sustain

### 9. Sello De Silencio
- Arquetipo: Mistica
- Tipo: activa
- Efecto: impide usar habilidad activa en el siguiente turno
- Rol: interrupcion

### 10. Rabia Primordial
- Arquetipo: Salvaje
- Tipo: pasiva
- Efecto: gana ataque al bajar de cierto umbral de vida
- Rol: escalado

### 11. Piel De Guerra
- Arquetipo: Guardiana
- Tipo: pasiva
- Efecto: al defender, obtiene reduccion de dano mejorada o escudo pequeno
- Rol: identidad defensiva

### 12. Llama Agonica
- Arquetipo: Mistica
- Tipo: activa
- Efecto: aplica Quemadura por 2 turnos
- Rol: anti-recuperacion

## Distribucion Recomendada Del Primer Roster

Para la primera gran iteracion jugable, recomiendo:
- 2 criaturas por arquetipo principal
- 1 jefe por cada 2 arquetipos introducidos
- 1 habilidad principal por criatura
- algunas pasivas compartidas para acelerar produccion

Ejemplo:
- 2 Asaltantes
- 2 Guardianas
- 2 Misticas
- 2 Vampiricas
- 2 Salvajes
- 2 Support

Total: 12 criaturas base bien definidas

## Filosofia De Implementacion

- Primero implementar estados y habilidades base
- Luego reasignar criaturas existentes a arquetipos
- Despues rebalancear stats
- Luego diseñar jefes usando estas mismas piezas

## Primera Historia Compatible Con Esta Base

Una premisa inicial simple y funcional podria ser:
##Lore del mundo
"El mundo fue creado con a aparicion de los 4 dioses primordiales, que dieron origen a las 15 diferentes razas, basadas en sus caracteriaticas divinas. Los dioses, para administrar mejor a las Razas, designo a un apostol de cada raza, siendo este más el más fuerte de su especie, obteniendo asi el derecho a la "Eternidad", sus almas no se veran afectadas por la muerte, pero entonces del abismo emergio un nuevo dios, aparecio, loderando a sus criaturas para tomar un lugar en el mundo, su llegada desequilibro el orden, trajo caos e inquietud, llevando asi al exterminio de una Raza, en consecuencia los dioses intentaron eliminarlo, pero fueron corrompidos por el, y de igual manera sus apostoles, ahora con la caida de los dioses, lo unico que queda de este mundo fragmentado es el caos y la guerra, esperando que alguien logre evitar su destruccion."

## Descriccion del uso de las cartas
-seguira siendo igual, el invocar una carta con una llave, y perder la si muere la criatura. Al invocarla se te permitira nombrar a la criatura, en la coleccion puedes ver a todas las criaturas que haz invocado(En el caso de las repetidas solo se vera la de rareza mayor.), al obtener una "esencia de eternidad", la carta ya no desaparece al morir o invocar otra, en este caso se guarda en la coleccion, hasta que la elijas para usar, además hay que ajustar las estadisticas de las cartas, ys que me gustaria que al enfrentarse a los Jefes (desde ahora apostoles) sean batallas dificiles de ganar, que solo despues de varios intentos se logre ganarles.

##descripcion de recompensas
-En la batalla de jefes, enfrentaremos a los 19 apostoles eternos (son todas las especies que actualmente cuenta el juego), de manera predeterminada, empesando con los apostoles más debiles, al derotarlos obtenemos "La esencia de eternidad" que le podemos dar a una carta para que no se pierda al morir la criatura, además de consegir oro, ya que se implementara una tienda.

##Tienda
-Aqui los jugadores puedan comprar items para las invocaciones, como curaciones, decorado para las cartas o para sus perfiles.

##Los jefes de temporada(Los Dioses)
-al igual que los apostoles se les podra desafiar para obtener recompensas, mi idea origuinal es que al derotarles obtengan los jugadores un soundtrak de 5, ya que al ser 5 dioses hay 5 soundtrak, su nivel de dificultad seria infernal, el jugador puede invovar hasta 5 especies, pero aun asi la dificultad de la batalla debe ser enorme.

## Base Actual Del Panteon Primordial

El proyecto ya queda encaminado con 5 dioses definidos:

- `Helion`
  - linajes: luz, brasas sagradas, firmamento
  - especies: Serafines del Velo, Dracos Magmaticos, Fenix del Cenit, Quimeras Astrales, Heraldos del Santuario
  - recompensa futura: `helion_theme.ogg` y fondo `helion_parhelion`

- `Kairon`
  - linajes: viento, caceria, trueno
  - especies: Fauces Etereas, Hidras Tempestivas, Behemoths del Trueno
  - recompensa futura: `kairon_theme.ogg` y fondo `kairon_tempest`

- `Sylvara`
  - linajes: raiz, bosque, hielo ritual, tiempo petrificado
  - especies: Colosos del Verdor, Centinelas del Hielo, Basiliscos de Cuarzo, Mantis Cronicas, Titanes Ferricos, Guardianes Verdantes
  - recompensa futura: `sylvara_theme.ogg` y fondo `sylvara_canopy`

- `Nerea`
  - linajes: marea, profundidad, presion marina
  - especies: Mareas Coronadas, Colosos de Marea
  - recompensa futura: `nerea_theme.ogg` y fondo `nerea_tidecourt`

- `Vorath`
  - linajes: vacio, corrupcion, sangre, ceniza
  - especies: Acechantes Umbrios, Juggernauts Infernos, Leviatanes de la Fosa, Segadores Luna Roja, Djinn del Umbral, Hierofantes de Ceniza
  - recompensa futura: `vorath_theme.ogg` y fondo `vorath_black_sun`

## Rutas De Assets Preparadas

Ya quedaron listas las carpetas base para arte y audio:

- `C:\Users\gotan\summon-arena\client\assets\backgrounds\profile`
- `C:\Users\gotan\summon-arena\client\assets\backgrounds\gods`
- `C:\Users\gotan\summon-arena\client\assets\music\gods`

Asi, cuando produzcas fondos o musica, solo hara falta colocarlos ahi y vincularlos al catalogo correspondiente.

Esto permite:
- justificar invocaciones
- justificar bosses
- justificar ranking
- justificar que cada criatura tenga lore

Sin obligarnos aun a escribir una novela completa.

## Traduccion Del Comentario A Produccion

La vision de `apostoles`, `esencia de eternidad` y `dioses de temporada` es factible, pero conviene introducirla por capas.

### Capa 1. Apostoles Eternos
- Los jefes actuales pasan a interpretarse como `apostoles`.
- Cada apostol representa a una especie importante del mundo.
- Derrotar a un apostol por primera vez debe dejar una marca persistente:
  - estandarte
  - registro en archivo
  - una `Esencia de Eternidad`

### Capa 2. Esencia De Eternidad
- La `Esencia de Eternidad` sirve para preservar una criatura concreta.
- Una criatura preservada:
  - ya no desaparece al morir
  - ya no se pierde al invocar otra
  - queda guardada en la coleccion preservada
  - puede volver a equiparse manualmente

### Capa 3. Coleccion En Dos Capas
- `Compendio`: todas las criaturas vistas o invocadas, mostrando la mejor rareza alcanzada.
- `Coleccion preservada`: criaturas concretas que el jugador salvo usando Esencia de Eternidad.

### Capa 4. Economia
- Los apostoles deben dar:
  - llaves
  - oro
  - esencia en su primera derrota
- El oro queda reservado para una tienda futura con:
  - curaciones limitadas
  - decorados de carta
  - decorados de perfil
  - consumibles de invocacion bien controlados

### Capa 5. Dioses De Temporada
- Los dioses deben ser contenido de fin de juego.
- No conviene introducirlos todavia con sistema de 5 criaturas simultaneas si el combate principal sigue siendo de criatura unica.
- Primero deben existir como encuentros superiores al apostol normal.
- El sistema de `5 especies` debe tratarse como una fase aparte, porque implica rehacer:
  - UI de combate
  - IA
  - balance
  - resolucion de turnos
  - seleccion de equipo

## Orden Recomendado Segun Esta Vision

1. Apostoles con identidad y recompensa persistente.
2. Esencia de Eternidad.
3. Coleccion preservada y eleccion de criatura.
4. Oro y tienda.
5. Apostoles por orden de dificultad.
6. Dioses de temporada.
7. Solo despues, combate multi-criatura si sigue haciendo sentido.

## Siguiente Paso Recomendado

Si seguimos este camino, la siguiente fase de produccion deberia ser:

1. mapear criaturas actuales a arquetipos
2. elegir 8 habilidades para implementar primero
3. implementar estados base en servidor y cliente
4. rehacer 1 jefe como prototipo con mecanica real
