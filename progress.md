Original prompt: Las habilidades dentro del archivo, /cliente/abilities.js, no estan aplicandose como deverian, las pasivas parecen no funcionar.

- Se estabilizo el combate con pasivas, activas, cooldowns y efectos temporales.
- Se separo `VS Jefe` de `Practica entre jugadores`.
- La practica entre jugadores ya termina sin llaves y restaura invocaciones.
- Se agrego banner de victoria contra jefes y mejoras visuales de cartas/arena.

- Fase 1 de migracion a servidor-autoritativo:
- Se creo `server/data/abilityCatalog.js` como catalogo serializable de habilidades del lado servidor.
- Se actualizo `server/data/creatures.js` para usar el catalogo de criaturas compartido.
- Se reescribio `server/core/creatureFactory.js` para que el servidor genere criaturas, rarezas, pity y habilidades.
- Se creo `server/core/playerStore.js` para mantener perfil por socket (`keys`, `wins`, `losses`, `creature`).
- `server/server.js` paso a emitir `profileSync`, resolver `summonCreature` y usar la criatura guardada en servidor al hacer `SUMMON`.
- `client/game.js` dejo de generar la invocacion principal localmente y ahora consume `profileSync` / `summonResult`.

- Fase 2:
- Se movio la generacion del jefe al servidor.
- `server/core/creatureFactory.js` ahora expone `invocarJefe()`.
- `server/server.js` expone `startBossBattle`.
- `client/game.js` ya no fabrica al jefe localmente.

- Fase 3:
- Se extrajo la logica de combate a `server/core/combatService.js`.
- `combatService` ahora concentra normalizacion de criaturas, pasivas, efectos, cooldowns, resolucion de acciones y turno del jefe.
- `server/server.js` fue reescrito como orquestador de sesiones PvP y `VS Jefe`, reutilizando `combatService`.
- `VS Jefe` ahora usa `gameStart`, `stateUpdate` y `duelEnd` autoritativos del servidor.
- Se eliminaron del cliente las referencias activas al combate local del jefe.

- Fase 4:
- Se introdujo identidad persistente de jugador con `playerId` almacenado en cliente y sincronizado con el servidor mediante `identify`.
- Se creo `server/core/profileRepository.js` para persistir perfiles en `server/data/profiles.json`.
- `server/core/playerStore.js` dejo de depender del socket y ahora administra progreso por `playerId`, incluyendo llaves, victorias, derrotas y criatura actual.
- `server/server.js` paso a resolver sincronizacion de perfil, invocacion y resultados usando la identidad persistente del jugador, incluso tras reconexion.
- Se rediseño `client/index.html` y `client/style.css` hacia una interfaz tipo dashboard con sidebar, perfil, lobby, preview de ranking y una arena preparada para futuras pantallas competitivas.
- `client/game.js` ahora sincroniza `playerId`, actualiza el panel de perfil/ranking y adapta los controles al nuevo flujo visual.

- Fase 5:
- Se fortalecio la identidad persistente con `sessionToken` guardado en perfil y cliente, para reducir suplantacion por simple cambio manual de `playerId`.
- `server/core/playerStore.js` ahora persiste `name`, `sessionToken`, `bossWins`, `createdAt` y `lastSeenAt`, y expone `identify`, `setPlayerName` y `getLeaderboard`.
- `server/server.js` ahora emite `identitySync` y `leaderboardSync`, y actualiza el ranking en tiempo real tras cambios de nombre y resultados de combate.
- `client/game.js` consume la identidad canonica del backend, persiste el `sessionToken`, y renderiza el ranking vivo en el sidebar.
- `client/index.html` y `client/style.css` ya muestran el ranking como panel activo en lugar de placeholder.

- Fase 6:
- Se separo el backend en modulos: `server/socket/gameGateway.js` concentra sockets/juego y `server/http/apiRouter.js` expone API HTTP.
- `server/server.js` quedo reducido a entrypoint, montaje de estaticos, API y arranque del gateway.
- Se agregaron endpoints `GET /api/health`, `GET /api/leaderboard` y `GET /api/profiles/:playerId`.
- `server/core/playerStore.js` ahora tambien expone `getPublicProfile` para futuras vistas de perfil, ranking y panel de carrera.

- Fase 7:
- Se agrego borrado de cuenta por socket (`deleteAccount`) y por API (`DELETE /api/profiles/:playerId`), validado con `sessionToken`.
- Las cuentas borradas ya no pueden seguir usandose, pero conservan su nombre en ranking con estado `deleted` para poder mostrarse como `CAIDO` mientras sigan dentro de la tabla.
- `client/index.html` y `client/game.js` ahora exponen el boton `Borrar cuenta` y limpian la identidad local al recibir `accountDeleted`.
- Se rediseño el render de cartas en `client/game.js` para soportar modo compacto en combate y modo coleccion/interactivo en invocacion.
- `client/style.css` ahora incluye cartas con doble cara, insignia `CAIDO`, boton de borrado y una arena mas aireada con cartas compactas.
- `client/animations.js` ahora agrega reveal de carta tras la invocacion.

- Fase 8:
- La arena de combate ahora apila los combatientes en vertical para que las cartas no se vean comprimidas lateralmente.
- Se completo otra fase de arquitectura interna: `server/socket/gameGateway.js` ahora solo orquesta y delega en `createSocketContext.js` y handlers por dominio.
- Se crearon handlers separados en `server/socket/handlers/profileHandlers.js`, `server/socket/handlers/roomHandlers.js` y `server/socket/handlers/combatHandlers.js`.
- Con esto, el backend ya quedo mejor preparado para seguir separando autenticacion, salas, jefes y ranking sin volver a crecer en un solo archivo.

- Fase 9:
- El ranking quedo limitado a 10 lugares desde backend para sockets y API.
- La capa HTTP tambien se separo por dominio en `server/http/routes/healthRoutes.js`, `server/http/routes/leaderboardRoutes.js` y `server/http/routes/profileRoutes.js`.
- `server/http/apiRouter.js` ahora solo compone esos routers, igual que el gateway de sockets ya hacia con sus handlers.

- Fase 10:
- Se agrego autenticacion real basica con cuentas `usuario + contrasena`.
- Se crearon `server/core/accountRepository.js` y `server/core/authService.js` para persistir cuentas y validar credenciales con hash derivado por `pbkdf2`.
- Se agregaron eventos de socket `registerAccount`, `loginAccount`, `logoutAccount` y `authSync`.
- La API HTTP ahora tambien expone autenticacion en `server/http/routes/authRoutes.js`.
- El cliente incorpora panel de cuenta en el sidebar para registrar, entrar y cerrar sesion.
- El borrado de cuenta ya elimina tanto el perfil como su cuenta asociada cuando se hace por API o socket.

- Fase 11:
- La cuenta ahora tiene una sesion propia separada del `sessionToken` del perfil de juego.
- `server/core/authService.js` ahora emite `authToken`, permite `resume` y `logout`, y actualiza `sessionIssuedAt`.
- Se agrego `resumeAccount` por socket y los endpoints HTTP `POST /api/auth/resume` y `POST /api/auth/logout`.
- El cliente ahora persiste la sesion de cuenta en `summonArenaAuthToken` y la intenta restaurar automaticamente al reconectar.
- Con esto quedaron mejor separados `cuenta`, `sesion de cuenta` y `perfil jugable`.

- Fase 12:
- Se inicio la primera iteracion jugable real del rework de combate.
- `server/data/creatures.js` ahora clasifica criaturas por `archetype` y les da un lore base mas claro.
- `server/data/abilityCatalog.js` y `client/abilities.js` fueron rehechos con un set inicial de habilidades mas alineado a la vision tactica.
- `server/core/creatureFactory.js` ahora intenta asignar habilidades compatibles con el arquetipo de la criatura.
- `server/core/combatService.js` fue reescrito para soportar mejor estados y efectos como Sangrado, Quemadura, Escudo, Regeneracion, Silencio, Debilidad y Expuesto.
- `client/game.js` ahora muestra tambien el arquetipo en la carta para que la identidad jugable sea visible.

- Fase 13:
- Se reemplazo la asignacion mayormente aleatoria de habilidades por un esquema de habilidades firma por criatura.
- `server/data/creatures.js` ahora define `signatureAbilityId` para las criaturas mas importantes del roster.
- `server/core/creatureFactory.js` ahora prioriza la habilidad firma y solo agrega variacion extra en rarezas altas.
- Tambien se hizo un primer ajuste de stats para que algunos roles se sientan mas claros (asaltantes, guardianas, misticas, support, vampiricas y salvajes).

- Fase 14:
- La UI de combate ahora empieza a mostrar los estados de forma visual en lugar de depender solo del texto del log.
- `client/game.js` ahora traduce `activeEffects` y `pendingDefenseBoost` del estado del servidor a chips visuales por criatura.
- `client/style.css` agrega estilos para estados como `Quemadura`, `Sangrado`, `Escudo`, `Silencio`, `Debilidad`, `Regeneracion`, `Guardia` y `Rabia`.

- Fase 15:
- `VS Jefe` dejo de depender de criaturas aleatorias infladas y ahora usa un roster inicial de jefes dedicado en `server/data/bossCatalog.js`.
- Se agregaron tres jefes base con identidad propia, lore, habilidades firma y fases: `Aurelion, Custodio del Eclipse`, `Nyxar, Hambre de la Fosa` y `Solara, Regente Cenital`.
- `server/data/abilityCatalog.js` y `client/abilities.js` ahora incluyen habilidades firma de jefe como `Corona Del Eclipse`, `Marea Voraz` y `Renacer Solar`.
- `server/core/creatureFactory.js` ahora genera jefes desde el catalogo dedicado en lugar de reciclar criaturas normales.
- `server/core/combatService.js` ahora mantiene `bossRuntime`, calcula fases, rota patrones y expone `bossIntent` para que el cliente sepa la siguiente accion del jefe.
- `server/socket/handlers/combatHandlers.js` ahora aplica pasivas al entrar a `VS Jefe` y prepara el estado inicial del jefe con su primera intencion.
- `client/index.html`, `client/game.js` y `client/style.css` ahora muestran un panel de `Intencion del jefe` dentro de la arena.
- Tambien se mejoro `temp/web_game_playwright_client.mjs` para permitir pasos con `clickSelector`, lo que deja la automatizacion mejor preparada para flujos multietapa.

- Verificacion:
- `node --check` paso en `server/server.js`, `server/core/combatService.js`, `server/core/creatureFactory.js`, `server/core/playerStore.js`, `server/data/abilityCatalog.js` y `client/game.js`.
- En fase 4 tambien paso `node --check` en `server/core/profileRepository.js`.
- Se corrio validacion visual con Playwright sobre `http://127.0.0.1:3000`, invocando una criatura desde la nueva interfaz.
- La captura valida del dashboard quedo en `output/web-game-long/shot-0.png` y el estado textual en `output/web-game-long/state-0.json`.
- Quedo un `console.error` residual con `Failed to load resource: net::ERR_CONNECTION_REFUSED`, que no impidio la conexion principal ni la invocacion, pero conviene revisarlo en la siguiente pasada.
- En fase 5 se repitio la validacion visual con Playwright; la captura nueva quedo en `output/web-game-phase5/shot-0.png`.
- En fase 6 tambien se valido por HTTP que `/api/health`, `/api/leaderboard` y `/api/profiles/:playerId` responden correctamente con el backend modular.
- En fase 7 se valido visualmente la nueva carta invocada en `output/web-game-phase7/shot-0.png`.
- Tambien se probo el flujo `deleteAccount` contra una cuenta temporal de prueba usando `playerStore.identify` + `deleteAccount`; la cuenta de prueba fue eliminada despues de la verificacion para no ensuciar el ranking.
- En fase 8 pasaron `node --check` en `client/game.js`, `server/server.js`, `server/socket/gameGateway.js`, `server/socket/createSocketContext.js` y los tres handlers nuevos.
- Pendiente visual util: revisar un duelo real para confirmar el nuevo layout vertical de combate en navegador.
- En fase 9 pasaron `node --check` en `server/http/apiRouter.js`, los tres routers HTTP nuevos, `server/socket/createSocketContext.js` y `server/server.js`.
- Tambien se validaron en ejecucion `GET /api/health` y `GET /api/leaderboard` con el servidor levantado; el leaderboard ya responde con un maximo de 10 puestos.
- En fase 10 pasaron `node --check` en `server/core/accountRepository.js`, `server/core/authService.js`, `server/socket/handlers/profileHandlers.js`, `server/http/routes/authRoutes.js`, `server/http/routes/profileRoutes.js`, `client/game.js` y `server/server.js`.
- Se valido en ejecucion el flujo HTTP `register -> login -> delete` con una cuenta temporal de prueba, y luego se limpio esa cuenta para no dejar residuos.
- En fase 11 pasaron `node --check` en `server/core/authService.js`, `server/socket/handlers/profileHandlers.js`, `server/http/routes/authRoutes.js` y `client/game.js`.
- Tambien se valido en ejecucion el flujo `register -> resume -> logout -> delete` con una cuenta temporal, confirmando la sesion de cuenta separada.
- En fase 12 pasaron `node --check` en `server/core/combatService.js`, `server/core/creatureFactory.js`, `client/game.js` y `server/server.js`.
- Tambien se valido `combatService` con una prueba directa de `Fisura Arcana`, confirmando dano + aplicacion de `Expuesto (2)`.
- En fase 13 pasaron `node --check` en `server/data/creatures.js` y `server/core/creatureFactory.js`.
- Tambien se validaron invocaciones directas comprobando que criaturas como `Frostbite Warden` y `Abyssal Kraken` salen con habilidades firma coherentes.
- En fase 14 pasaron `node --check` en `client/game.js` y `server/server.js`.
- Tambien se valido `combatService` con una prueba directa de `Llama Agonica`, confirmando que el enemigo recibe `Quemadura (2)` y el log refleja el tick inicial.
- En fase 15 pasaron `node --check` en `server/core/combatService.js`, `server/core/creatureFactory.js`, `server/data/bossCatalog.js`, `server/socket/handlers/combatHandlers.js`, `client/game.js` y `client/abilities.js`.
- Tambien se validaron directamente `invocarJefe()` y `combatService` con una prueba de consola, confirmando que un jefe nuevo expone sus fases, publica `bossIntent` y cambia a su fase final al bajar de vida.
- Se corrio Playwright con `temp/web_game_playwright_client.mjs` y la captura quedo en `output/web-game-boss-flow/shot-0.png`, pero la instancia viva en `http://127.0.0.1:3000` seguia sirviendo el servidor viejo; por eso la evidencia visual aun muestra el jefe legacy y `bossIntent: null`.
- Queda pendiente reiniciar el servidor activo y repetir esa pasada visual contra el backend nuevo para confirmar la arena de jefe end-to-end en navegador.

- Fase 16:
- Se despejo la pantalla principal para que ya no muestre cuenta y ranking de forma permanente.
- `client/index.html` ahora usa una `app-topbar` con accesos directos a `Cuenta` y `Ranking`, y ambos se abren como paneles overlay en lugar de vivir visibles todo el tiempo.
- El formulario de autenticacion, cambio de nombre y borrado de cuenta fue movido a `account-modal`, dejando el lobby mas limpio.
- El ranking ahora vive dentro de `ranking-modal`, por lo que solo aparece cuando el jugador lo solicita.
- `client/game.js` ahora administra apertura y cierre de modales con `openModal` y `closeModal`, y sincroniza el estado de autenticacion tanto en el boton superior como en el modal.
- `client/style.css` agrega estilos de topbar, overlays y paneles laterales para preparar una navegacion mas profesional y escalable.

- Verificacion fase 16:
- `node --check` paso en `client/game.js`.
- Quedo pendiente la validacion visual con Playwright porque en esta pasada no habia servidor respondiendo en `http://127.0.0.1:3000` al momento de correr la prueba.

- Fase 17:
- Se implemento la navegacion dedicada propuesta para `Inicio`, `Perfil`, `Ranking`, `Historial` y `Coleccion`.
- `client/index.html` ahora incluye una `dashboard-nav` y pantallas separadas para cada seccion.
- `client/game.js` ahora guarda `history` y `collection` en `localStorage`, registra eventos relevantes con `recordActivity`, y llena cada vista con datos utiles en lugar de placeholders vacios.
- La vista de `Perfil` muestra resumen de progreso, estado de autenticacion y criatura activa.
- La vista de `Ranking` ya existe como pagina dedicada, aparte del overlay rapido.
- La vista de `Historial` registra invocaciones, salas, resultados, cambios de nombre y sesiones.
- La vista de `Coleccion` registra criaturas invocadas, su mejor rareza y cuantas veces aparecieron.
- `client/style.css` ahora soporta esta navegacion tipo hub con listas de actividad y rejilla de coleccion.

- Verificacion fase 17:
- `node --check` paso en `client/game.js` y `client/abilities.js`.
- Tambien se verifico por busqueda directa la presencia de los nuevos ids, vistas y funciones de navegacion (`dashboard-tab`, `profile-screen`, `ranking-screen`, `history-screen`, `collection-screen`, `recordActivity`, `rememberCreature`, `setActiveView`).
- Sigue pendiente una validacion visual completa en navegador cuando el servidor vuelva a estar levantado.

- Fase 18:
- `Historial` y `Coleccion` dejaron de depender solo del navegador y ahora forman parte del perfil persistente del servidor.
- `server/core/playerStore.js` ahora guarda `history` y `collection`, registra invocaciones, actualizaciones de nombre y resultados de combate dentro del propio perfil, y los expone en `profileSync`.
- El cliente sigue conservando espejo local para resiliencia, pero [client/game.js](C:/Users/gotan/summon-arena/client/game.js) ya trata `profileSync` como fuente principal para `Historial` y `Coleccion`.
- Se eliminaron duplicados del lado cliente para eventos que ahora ya quedan registrados en backend, como invocaciones y resultados de combate.

- Verificacion fase 18:
- `node --check` paso en `server/core/playerStore.js` y `client/game.js`.
- Tambien se probo directamente `playerStore.summonCreature()` con un perfil temporal, confirmando que la respuesta persistida ya incluye `history` y `collection` con la criatura invocada.

- Fase 19:
- Se amplio el set de habilidades para cubrir mejor todos los arquetipos jugables.
- `server/data/abilityCatalog.js` y `client/abilities.js` ahora incluyen `Vendaval Rasante`, `Resguardo De Raiz`, `Marca Del Vacio`, `Embate Salvaje`, `Cosecha Escarlata`, `Pacto Luminar` y la pasiva `Piel De Guerra`.
- `server/core/combatService.js` ahora interpreta correctamente buffs positivos de ataque/defensa en los estados visibles y aplica el efecto especial de `Piel De Guerra` al defender.
- Se reasignaron varias criaturas invocables en `server/data/creatures.js` para que el roster del jugador tenga mas identidad y menos repeticion de firmas.
- Se agregaron dos jefes nuevos en `server/data/bossCatalog.js`: `Kaelith, Soberano del Vendaval` y `Orophis, Bastion del Verdor`, ambos con fases y patrones propios.

- Verificacion fase 19:
- `node --check` paso en `server/data/abilityCatalog.js`, `server/data/creatures.js`, `server/data/bossCatalog.js`, `server/core/combatService.js`, `client/game.js` y `client/abilities.js`.
- Tambien se validaron por consola los 5 jefes actuales con sus fases y habilidades, varias criaturas invocables con sus nuevas firmas, y un caso directo de `Piel De Guerra` confirmando guardia reforzada + escudo al defender.

- Fase 20:
- Se reforzo la presentacion visual de los jefes dentro de la arena.
- `client/index.html` ahora incluye un `boss-dossier-panel` para mostrar nombre, titulo y lore del jefe activo al iniciar `VS Jefe`.
- `client/game.js` ahora inyecta tambien el `title` del jefe y la `phaseLabel` actual dentro de su carta de combate, y aplica tema visual al `arena-screen` segun el arquetipo del boss.
- `client/style.css` ahora define fondos tematicos por jefe (`mistica`, `vampirica`, `support`, `salvaje`, `guardiana`), ademas de estilos para `boss-title`, `boss-phase` y el nuevo dossier del encuentro.

- Verificacion fase 20:
- `node --check` paso en `client/game.js` y `client/abilities.js`.
- Tambien se verifico por busqueda directa la presencia del nuevo dossier, titulos de jefe, fase visible y temas visuales del escenario.

- Fase 21:
- Se agregaron recompensas persistentes por jefe derrotado y un archivo PvE real dentro del perfil.
- `server/core/combatService.js` ahora entrega `bossId`, `bossTitle`, `bossArchetype`, `bossImage` y `bossRewardTitle` en el cierre de `VS Jefe`, ademas de aumentar la recompensa base de llaves a 2 por victoria contra jefe.
- `server/core/playerStore.js` ahora guarda `bossArchive` y `bossBanners`, registra el primer desbloqueo de cada estandarte y lo refleja tambien en `history`.
- `client/index.html` y `client/game.js` ahora muestran `Estandartes de jefe` y `Archivo de jefes` dentro de la vista de `Perfil`.
- El banner de victoria del jefe ahora tambien puede mostrar la recompensa obtenida.

- Verificacion fase 21:
- `node --check` paso en `server/core/playerStore.js`, `server/core/combatService.js` y `client/game.js`.
- Tambien se probo directamente `playerStore.applyDuelEnd()` con una victoria de jefe temporal, confirmando llaves, `bossArchive`, `bossBanners` e historial persistidos correctamente.

- Fase 22:
- Se inicio la implementacion real de `apostoles`, `Esencia de Eternidad` y coleccion preservada.
- `combat_foundation.md` ya traduce esa vision a un orden concreto de produccion.
- `server/core/playerStore.js` ahora persiste `essence` y `preservedCreatures`, y agrega los metodos `eternalizeCurrentCreature` y `equipPreservedCreature`.
- Derrotar un apostol por primera vez ahora concede una `Esencia de Eternidad` ademas del estandarte.
- `client/index.html` y `client/game.js` ahora muestran `Esencias`, permiten eternizar la criatura activa y equipar una criatura preservada desde la coleccion.
- La UI tambien empieza a renombrar `Jefe` hacia `Apostol` en los flujos principales de PvE.
- `server/socket/handlers/profileHandlers.js` agrega eventos dedicados para eternizar y equipar criaturas, y bloquea esas acciones durante combate.

- Verificacion fase 22:
- `node --check` paso en `server/core/playerStore.js`, `server/socket/handlers/profileHandlers.js` y `client/game.js`.
- Tambien se probo directamente el flujo `apostol -> esencia -> eternizar -> equipar`, confirmando que la esencia se gana, se consume, la criatura queda preservada y luego puede volver a equiparse.

- Fase 23:
- Se rebalanceo la curva entre criaturas invocables y apostoles para endurecer el PvE.
- `server/core/creatureFactory.js` ahora reduce el techo de escalado por rareza del jugador y aumenta la escala base de vida/ataque/defensa de los apostoles.
- `server/data/bossCatalog.js` ahora define `order` para cada apostol, dejando una ruta de progresion fija por dificultad.
- `server/core/playerStore.js` ahora expone `nextApostleIndex` y `nextApostle` en el perfil.
- `server/socket/handlers/combatHandlers.js` ya no invoca apostoles al azar: ahora usa la progresion del jugador para elegir el siguiente encuentro.
- `client/index.html` y `client/game.js` muestran en `Perfil` cual es el siguiente apostol de la escalera PvE.
- La UI empieza a consolidar el cambio de lenguaje de `jefe` a `apostol`.

- Verificacion fase 23:
- `node --check` paso en `server/core/creatureFactory.js`, `server/core/playerStore.js`, `server/socket/handlers/combatHandlers.js` y `client/game.js`.
- Tambien se validaron por consola los nuevos numeros de los apostoles de apertura y cierre de la escalera, asi como un ejemplo de criatura mitica del jugador para comprobar que la brecha se redujo.

- Fase 24:
- Se implemento la escalera visible de apostoles dentro del perfil.
- `server/core/creatureFactory.js` ahora expone `getApostleLadder`, que arma la ruta completa con estados `current`, `defeated` y `locked`.
- `server/core/playerStore.js` ahora envia `apostleLadder` dentro del perfil persistente y del perfil publico.
- `client/index.html` y `client/game.js` ahora muestran la escalera completa de apostoles con orden, estado, victorias y recompensa desbloqueada.
- Con esto el PvE ya no solo tiene un `siguiente apostol`, sino una ruta visible de progresion.

- Verificacion fase 24:
- `node --check` paso en `server/core/creatureFactory.js`, `server/core/playerStore.js` y `client/game.js`.
- Tambien se probo directamente el flujo del ladder: antes del primer combate el primer apostol aparece como `current`, y tras derrotarlo pasa a `defeated` mientras el segundo se convierte en el objetivo actual.

- Fase 25:
- Se abrio la economia inicial del juego con `oro` persistente y una `Tienda` dedicada.
- `server/core/playerStore.js` ahora persiste `gold`, expone `shopCatalog` y permite compras con `purchaseShopItem`.
- Se creo `server/data/shopCatalog.js` como catalogo inicial del mercado, con llaves, esencias y restauracion de criatura activa.
- `server/core/combatService.js` ahora entrega `rewardGold`, escalado por dificultad de apostol y en menor medida por duelo PvP normal; la practica sigue sin otorgar economia.
- `server/socket/handlers/profileHandlers.js` agrega `buyShopItem`, bloqueado durante combate para evitar abusos.
- `server/http/routes/shopRoutes.js` y `server/http/apiRouter.js` exponen la tienda tambien por HTTP.
- `client/index.html`, `client/game.js` y `client/style.css` ahora incluyen la vista `Tienda`, monedero visible, catalogo de compras y feedback de oro ganado/compras realizadas.

- Verificacion fase 25:
- `node --check` debe pasar en `server/core/playerStore.js`, `server/core/combatService.js`, `server/socket/handlers/profileHandlers.js`, `server/http/routes/shopRoutes.js`, `server/http/apiRouter.js` y `client/game.js`.
- Validacion funcional sugerida: derrotar un apostol, confirmar que se suma oro al perfil, abrir `Tienda`, comprar una llave o esencia y verificar el `profileSync` resultante.

- Siguiente fase documentada:
- Expandir la economia sin romper el balance: consumibles limitados, objetos temporales y primeros cosmeticos o estandartes comprables.
- Conectar esa economia a la escalera PvE con recompensas por tramo, primeras metas semanales y diferenciacion clara entre progreso de apostoles y gasto libre.
- Despues de eso, preparar el terreno para `Dioses de temporada` como contenido extremo del endgame, usando la misma estructura de dossier, archivo y recompensas unicas.

- Fase 26:
- Se amplio el contenido jugable con nuevas habilidades, un nuevo apostol y la primera capa real de cosmeticos equipables.
- `server/data/abilityCatalog.js` y `client/abilities.js` ahora incluyen `Juramento Del Bastion`, `Marea Umbria` y `Letania Del Alba`, ampliando opciones para guardianas, support, misticas y vampiricas.
- `server/data/creatures.js` suma nuevas criaturas invocables y reasigna firmas para que el roster del jugador tenga mas variedad tactica.
- `server/data/bossCatalog.js` agrega a `Velkaris, Archivista del Umbral` como nuevo apostol en la escalera PvE.
- Se creo `server/data/backgroundCatalog.js` y se extendio `server/data/shopCatalog.js` para soportar fondos cosmeticos vendibles.
- `server/core/playerStore.js` ahora persiste `unlockedBackgrounds` y `equippedBackgroundId`, y permite equipar fondos con `equipBackground`.
- `server/socket/handlers/profileHandlers.js` agrega el evento `equipBackground`.
- `client/index.html`, `client/game.js` y `client/style.css` ahora muestran fondos desbloqueados, permiten equiparlos y aplican el tema visual elegido al `body`.
- Con esto la tienda ya soporta no solo progreso utilitario, sino tambien personalizacion visual.

- Verificacion fase 26:
- `node --check` debe pasar en `server/core/playerStore.js`, `server/socket/handlers/profileHandlers.js`, `server/data/abilityCatalog.js`, `server/data/bossCatalog.js`, `server/data/creatures.js`, `client/game.js` y `client/abilities.js`.
- Validacion funcional sugerida: comprar un fondo en la tienda, equiparlo desde `Perfil` o `Tienda` y confirmar que la interfaz cambia de tema sin perderse al recibir `profileSync`.

- Ajuste posterior:
- Se corrigio la progresion de apostoles para que avance por orden real de la escalera y no por simple conteo de jefes unicos derrotados.
- `server/core/creatureFactory.js` ahora calcula `getApostleProgressIndex()` buscando el primer apostol pendiente dentro del orden oficial, incluso si existen perfiles viejos con derrotas fuera de secuencia.
- `server/core/playerStore.js` ahora usa ese indice para `nextApostle`, `nextApostleIndex` y `apostleLadder`.
- Con esto, derrotar al apostol actual siempre desbloquea el siguiente, y las cuentas antiguas quedan realineadas al primer hueco pendiente sin perder su historial.

- Fase 27:
- La tienda ahora esta separada por categorias claras: `Progreso`, `Consumibles` y `Cosmeticos`.
- `server/data/shopCatalog.js` ahora etiqueta cada articulo con su categoria para que cliente y backend compartan la misma organizacion.
- `server/core/playerStore.js` ahora maneja `apostleMilestones`, con recompensas de tramo por derrotar 2, 4 y 6 apostoles unicos.
- Esas recompensas entregan oro, llaves y esencia una sola vez, y quedan reflejadas en historial.
- `client/index.html`, `client/game.js` y `client/style.css` ahora muestran filtros de tienda y un panel de recompensas de tramo para conectar mejor la economia con la escalera PvE.

- Verificacion fase 27:
- `node --check` debe pasar en `server/core/playerStore.js`, `server/data/shopCatalog.js`, `client/game.js` y `client/style.css`.
- Validacion funcional sugerida: derrotar el segundo apostol unico y confirmar que aparece la recompensa de `Tramo I` sin poder reclamarse dos veces.

- Siguiente fase documentada:
- Empezar a introducir consumibles mas interesantes y limitados, como sellos temporales de invocacion o curaciones parciales.
- Sumar mas cosmeticos del usuario a la tienda usando la misma estructura de fondos y categorias.
- Preparar despues una capa de botin unico por apostol o por tramo para que el PvE no recompense solo con monedas, sino tambien con identidad.

- Fase 28:
- Se volvio a priorizar la jugabilidad central: mas habilidades, mas apostoles y una integracion mas natural del lore.
- `server/data/abilityCatalog.js` y `client/abilities.js` ahora incluyen `Decreto De Ceniza`, `Himno De Guerra`, `Colmillo De Ruina` y `Sello Del Titan`.
- `server/data/creatures.js` amplia el roster invocable y reasigna varias firmas para que la variedad tactica del jugador se note mas en partida.
- `server/data/bossCatalog.js` suma dos nuevos apostoles: `Seraphel, Heraldo de la Ceniza` y `Thalmora, Reina de las Mareas Veladas`, ambos con fases, patrones y presencia propia.
- Los apostoles ahora tambien cargan metadata narrativa como `race` y `pantheon`, visible en el dossier del encuentro.
- Se creo `server/data/loreCodex.js`, y `server/core/playerStore.js` ahora expone entradas de cronica desbloqueables segun el avance contra apostoles.
- `client/index.html`, `client/game.js` y `client/style.css` ahora muestran `Cronicas del Fragmento` en la pantalla principal y enriquecen el dossier del apostol con raza, legado y orden.

- Verificacion fase 28:
- `node --check` debe pasar en `server/data/abilityCatalog.js`, `server/data/bossCatalog.js`, `server/data/creatures.js`, `server/core/playerStore.js`, `client/game.js` y `client/abilities.js`.
- Validacion funcional sugerida: iniciar `VS Apostol`, confirmar que el dossier del encuentro muestre raza/legado, y revisar que las cronicas desbloqueadas crezcan al derrotar apostoles unicos.

- Siguiente fase documentada:
- Seguir profundizando el PvE con mecanicas mas distintivas por apostol, incluyendo patrones anti-curacion, castigos a defensa o ventanas de burst.
- Empezar a ligar algunas criaturas invocables a razas o legados del lore para que la coleccion y el mundo se sientan parte de la misma ficcion.
- Luego abrir una capa de botin o recompensas unicas por apostol, no solo monedas y banners.

- Fase 29:
- Se profundizo el PvE con mecanicas especiales por apostol dentro del motor de combate.
- `server/core/combatService.js` ahora reconoce jefes que castigan la curacion (`anti_recover`), rompen la defensa (`anti_defense`) o abren ventanas de burst (`burst_window`).
- `server/data/bossCatalog.js` ahora marca esas mecanicas especiales por apostol para que el encuentro se sienta distinto tambien a nivel sistemico.
- `server/data/creatures.js` ahora conecta mejor la coleccion con el mundo, agregando `race` y `legacy` a las criaturas invocables.
- `client/game.js` ahora muestra esos datos en la carta y en el dossier del apostol.
- Con esto, el lore ya no vive solo en textos: tambien aparece en la lectura de la carta y en la identidad del combate.

- Verificacion fase 29:
- `node --check` paso en `server/core/combatService.js`, `server/data/creatures.js`, `server/data/bossCatalog.js`, `server/core/playerStore.js` y `client/game.js`.
- Tambien se probo el motor directamente, confirmando que un apostol `anti_defense` reduce la guardia del jugador al defender y que los apostoles `anti_recover` alteran la recuperacion.

- Siguiente fase documentada:
- Crear recompensas unicas por apostol o por raza para que el PvE entregue algo mas que oro, llaves y banners.
- Seguir ampliando habilidades y criaturas alrededor de las razas y legados ya definidos, para que la coleccion tenga sinergia tematica con el mundo.
- Despues de eso, empezar a preparar a los `Dioses de temporada` como encuentros extremos del endgame.

- Fase 30:
- Se agregaron consumibles con inventario real y uso fuera de combate.
- `server/data/shopCatalog.js` ahora vende `Salva De Marea` y `Sigilo De Resonancia`.
- `server/core/playerStore.js` ahora persiste `consumables` y `summonModifiers`, permite usar consumibles y hace que el `Sigilo De Resonancia` altere la siguiente invocacion.
- `server/core/creatureFactory.js` ahora acepta modificadores de invocacion, incluyendo un piso minimo de rareza.
- Tambien se agrego una capa de botin unico por apostol en `server/data/apostleRelicCatalog.js`, reflejada en `apostleRelics` dentro del perfil.
- `client/index.html` y `client/game.js` ahora muestran inventario util de consumibles y reliquias de apostol dentro del perfil.

- Verificacion fase 30:
- `node --check` debe pasar en `server/core/playerStore.js`, `server/core/creatureFactory.js`, `server/socket/handlers/profileHandlers.js`, `client/game.js` y `server/data/apostleRelicCatalog.js`.
- Validacion funcional sugerida: comprar y usar un `Sigilo De Resonancia`, invocar una criatura y confirmar que la rareza sea al menos rara; despues derrotar por primera vez a un apostol y revisar que se agregue su reliquia unica al perfil.

- Siguiente fase documentada:
- Diseñar reliquias con efectos pasivos o sets tematicos por raza, primero como coleccion y luego como bonus opcional bien balanceado.
- Profundizar el PvE con apostoles de mecanicas aun mas marcadas y preparar a largo plazo la capa de `Dioses de temporada`.

- Fase 31:
- Se profundizo el valor de las reliquias como sistema de coleccion con `resonancias` por legado.
- `server/core/playerStore.js` ahora expone `relicResonances`, agrupando reliquias por `attunement` para mostrar ecos, resonancias activas y resonancias mayores.
- `server/data/apostleRelicCatalog.js` ahora etiqueta cada reliquia con su legado.
- La interfaz de escritorio fue reordenada para separar mejor responsabilidades por vista:
- `Inicio` ahora prioriza invocacion, preparacion rapida y consumibles listos.
- `Perfil` concentra progreso, apostoles, reliquias, resonancias, fondos y cronicas.
- `Tienda` queda dedicada a economia, categorias, inventario util y recompensas de tramo.
- Con esto la GUI ya se siente mas ordenada para escritorio y queda mejor preparada para una pasada movil despues.

- Verificacion fase 31:
- `node --check` paso en `server/core/playerStore.js` y `client/game.js`.
- Se valido por prueba directa que `relicResonances` agrupe correctamente reliquias del mismo legado.
- Nota: `node --check` no aplica a `client/style.css`, por lo que la validacion util de layout sigue siendo visual en navegador.

- Siguiente fase documentada:
- Abrir una pasada visual completa en escritorio para pulir espaciados, alturas y lectura por seccion.
- Si la estructura queda estable, despues adaptar la misma separacion por responsabilidades al layout movil.

- Siguiente fase documentada:
- Empezar a separar la tienda por categorias claras: progreso, consumibles y cosmeticos.
- Introducir cosmeticos con arte del usuario usando la misma estructura de `backgroundCatalog`, para que solo haga falta registrar nuevos ids, descripciones y precio.
- Seguir ampliando el PvE con apostoles de especializacion mas extrema y loot unico por tramo, preparando despues la llegada de `Dioses de temporada`.

- Fase 32:
- Se abrio una vista dedicada de `Historia del mundo` para sacar el peso narrativo de `Perfil` y ordenar mejor la GUI de escritorio.
- `client/index.html` ahora agrega la pestana `Historia del mundo`, con tres bloques claros: `Cronicas del Fragmento`, `Bestiario de apostoles` y `Habilidades descubiertas`.
- `client/game.js` ahora renderiza un bestiario usando la escalera de apostoles sincronizada por el servidor, incluyendo raza, legado, estado de desbloqueo y el campo `invocationView`.
- `client/game.js` tambien consume `abilityJournal`, un diario de habilidades descubiertas desde invocaciones propias, criaturas preservadas y apostoles derrotados.
- `server/core/playerStore.js` ya expone `abilityJournal` y sigue entregando `loreCodex` y `apostleLadder` enriquecidos para alimentar esa nueva vista.
- `Perfil` queda ahora mas enfocado en progreso, recursos, reliquias y victorias, mientras lo narrativo vive en su propio apartado.

- Verificacion fase 32:
- `node --check` debe pasar en `server/core/playerStore.js`, `server/data/bossCatalog.js` y `client/game.js`.
- Validacion funcional sugerida: abrir `Historia del mundo`, confirmar que aparezcan cronicas desbloqueadas, que el bestiario marque apostoles derrotados/bloqueados y que el diario de habilidades crezca tras invocar o derrotar criaturas nuevas.

- Siguiente fase documentada:
- Hacer una pasada visual de escritorio sobre `Historia del mundo`, `Perfil` y `Tienda` para unificar alturas, densidad visual y jerarquia de informacion.
- Empezar despues la adaptacion movil manteniendo la misma separacion por responsabilidades: juego, progreso, economia y lore.

- Fase 33:
- Se corrigio la progresion de descubrimiento para que las habilidades ya no dependan solo de la coleccion historica: ahora el perfil aprende habilidades al invocar, al equipar criaturas y al encontrarse con criaturas o apostoles en combate.
- `server/core/playerStore.js` ahora persiste `discoveredAbilities`, entrega un `abilityJournal` mas robusto y registra botin de apostol con consumibles adicionales segun el encuentro.
- `server/socket/createSocketContext.js` y `server/socket/handlers/combatHandlers.js` ahora registran habilidades vistas durante PvP y `VS Apostol`, para que el compendio crezca incluso si la criatura enemiga no se conserva en la cuenta.
- Se agrego un nuevo catalogo de marcos en `server/data/cardFrameCatalog.js` y la tienda ahora vende marcos cosmeticos en `server/data/shopCatalog.js`.
- `client/index.html`, `client/game.js` y `client/style.css` reorganizan `Perfil` para incluir un boton `Cosmeticos`, desde donde se configuran el fondo del encabezado del invocador y los marcos de carta.
- El fondo equipado ahora se aplica de forma clara al header del invocador en vez de sentirse solo como un tema general del fondo.
- Tambien se agrego un bloque visible de `Consumibles obtenidos` en `Perfil`, para que el botin y la economia se entiendan mejor al jugar.

- Verificacion fase 33:
- `node --check` paso en `server/core/playerStore.js`, `server/socket/createSocketContext.js`, `server/socket/handlers/profileHandlers.js`, `server/socket/handlers/combatHandlers.js`, `server/data/shopCatalog.js` y `client/game.js`.
- Validacion funcional sugerida: invocar una criatura nueva, abrir `Historia del mundo` y revisar que su habilidad aparezca; derrotar un apostol por primera vez y confirmar que se sumen reliquia, consumible y estandarte; comprar un marco cosmetico y equiparlo desde `Perfil -> Cosmeticos`.

- Siguiente fase documentada:
- Hacer una pasada visual de escritorio centrada en `Perfil`, `Historia del mundo` y `Tienda`, ahora que cosmeticos, botin y compendios ya tienen estructura mas clara.
- Preparar despues la adaptacion movil respetando la nueva separacion entre progreso, lore, economia y personalizacion.

- Fase 34:
- Se reforzo el sistema de recompensas de apostoles para que perfiles viejos o con datos incompletos no pierdan su primer botin unico.
- `server/core/playerStore.js` ahora usa `claimedBossRewards`, y separa mejor el registro de victoria del otorgamiento de banner, esencia, consumible y reliquia.
- `server/core/combatService.js` ahora envia tambien `bossRace`, `bossPantheon` e `invocationView` al cierre del duelo para enriquecer archivo y bestiario.
- `Historia del mundo` ahora muestra un bestiario centrado en apostoles derrotados, con raza y legado (el dios que los creo) visibles.
- Se agrego una nueva vista `Inventario` en `client/index.html` y `client/game.js`, donde se concentran consumibles, reliquias, estandartes y cosmeticos permanentes.
- La tienda y los catalogos crecieron con nuevos cosmeticos: `Catedral Glaciar`, `Forja Infernal`, `Vitrales de Hielo` y `Forja en Guerra`.
- Tambien se sumaron tres nuevos apostoles usando especies que aun no tenian encuentro propio:
- `Morvath, Senor De La Forja Herida` sobre `Juggernauts Infernos`
- `Selkaith, Vigia De La Catedral Glaciar` sobre `Centinelas del Hielo`
- `Zarynth, Oraculo Del Cuarzo Partido` sobre `Basiliscos de Cuarzo`
- Sus recompensas unicas quedaron registradas en `server/data/apostleRelicCatalog.js`.

- Verificacion fase 34:
- `node --check` paso en `server/data/bossCatalog.js`, `server/core/playerStore.js`, `server/core/combatService.js`, `server/data/backgroundCatalog.js`, `server/data/cardFrameCatalog.js` y `client/game.js`.
- Se probo por script un perfil con datos viejos donde un apostol ya figuraba en archivo pero sin botin, y al volver a derrotarlo ahora si obtuvo banner, reliquia, consumible y marca de recompensa reclamada.
- Se confirmo tambien que el roster de apostoles ya sube a 11 encuentros ordenados.

- Siguiente fase documentada:
- Hacer una pasada visual completa en escritorio sobre `Inventario`, `Historia del mundo` y `Perfil` para que el botin y la progresion se lean todavia mejor.
- Despues, empezar a dar identidad aun mas fuerte a cada apostol con cronicas propias en `invocationView` y recompensas cosmeticas o de coleccion ligadas a su legado.

- Fase 35:
- Se aclaro el flujo de marcos cosmeticos y ya se muestran tanto en `Perfil -> Cosmeticos` como en `Inventario`, ademas de aplicarse visualmente a las cartas propias.
- Se implemento la primera capa jugable de reliquias: ahora puedes equipar una reliquia desde `Perfil` o `Inventario`.
- `server/data/apostleRelicCatalog.js` ahora define tambien un `combatEffect` por reliquia, para que cada una aporte una aura controlada al iniciar combate.
- `server/core/playerStore.js` ahora guarda `equippedRelicId`, expone la reliquia equipada y permite cambiarla desde socket.
- `server/core/combatService.js` aplica el efecto de reliquia como aura temporal del combate, evitando contaminar las estadisticas base de la criatura fuera de la arena.
- `server/socket/handlers/combatHandlers.js` ya inyecta esa reliquia equipada tanto en duelos como en `VS Apostol`.

- Verificacion fase 35:
- `node --check` paso en `server/core/playerStore.js`, `server/core/combatService.js`, `server/socket/handlers/combatHandlers.js`, `server/socket/handlers/profileHandlers.js`, `server/data/apostleRelicCatalog.js` y `client/game.js`.
- Se probo por script que una reliquia equipada agrega correctamente su aura al estado de combate.

- Siguiente fase documentada:
- Hacer una pasada visual de escritorio para que `Perfil -> Cosmeticos` y `Inventario` dejen mas claro donde se compran, equipan y aplican los marcos.
- Seguir profundizando las reliquias con efectos mas distintivos por apostol, manteniendo el limite de una reliquia activa para no romper el balance.

- Fase 36:
- Se cerro el reparto de razas bajo los cinco dioses del mundo: `Helion`, `Kairon`, `Sylvara`, `Nerea` y `Vorath`.
- `server/data/creatures.js` ahora alinea las criaturas invocables con ese panteon definitivo, agrupando por similitud natural a especies como `Titan Mossbeard`, `Verdant Guardian` y `Chrono Mantis` bajo `Sylvara`, y dejando las razas abisales o corrompidas bajo `Vorath`.
- `server/data/bossCatalog.js` completo la escalera PvE con apóstoles para las especies restantes, elevando el roster total a 22 encuentros.
- Se agregaron once apostoles nuevos para cerrar el bestiario actual:
- `Rhaziel, Colmillo del Horizonte`
- `Vulkris, Fauce del Crater`
- `Noctyra, Garra del Eclipse Negro`
- `Xelthis, Cuchilla del Tiempo Roto`
- `Ferron, Muralla Ferrica`
- `Valzhar, Segador de la Luna Roja`
- `Thyron, Corazon del Estampido`
- `Elaria, Flor del Santuario Ultimo`
- `Astrael, Ojo del Firmamento`
- `Luminara, Cirio del Santuario`
- `Targor, Ancla de la Marea Dormida`
- `server/data/apostleRelicCatalog.js` se expandio para cubrir tambien esos once apostoles nuevos, y todas las reliquias ahora usan la misma nomenclatura de afinidad basada en los cinco dioses.
- Con esto, el juego ya tiene correspondencia completa entre panteon, bestiario de apostoles y reliquias unicas.

- Verificacion fase 36:
- `node --check` paso en `server/data/creatures.js`, `server/data/bossCatalog.js` y `server/data/apostleRelicCatalog.js`.
- Se comprobo por script que el juego ahora tiene `22` apostoles, `22` reliquias unicas y `0` huecos de recompensa, y que tanto criaturas como apóstoles solo usan los cinco dioses definidos.

- Siguiente fase documentada:
- Empezar a escribir las cronicas especificas de `invocationView` para cada apóstol y convertirlas en una capa real de lore dentro de `Historia del mundo`.
- Revisar despues el balance de la escalera PvE completa, ahora que ya existe un apóstol por cada especie o variante importante del roster.

- Fase 37:
- Se escribieron las cronicas base de `invocationView` para los 22 apostoles en `server/data/bossCatalog.js`, reemplazando todos los placeholders pendientes.
- `Historia del mundo` ahora tiene una base de `Panteon primordial` en `client/index.html` y `client/game.js`, para mostrar a los cinco dioses y sus recompensas previstas.
- Se creo `server/data/godCatalog.js` con los 5 dioses fundacionales ya definidos:
- `Helion`
- `Kairon`
- `Sylvara`
- `Nerea`
- `Vorath`
- Cada dios ya tiene nombre, titulo, dominios, especies ligadas, descripcion, habilidades firma, stats proyectados y botin previsto de soundtrack/fondo.
- `server/core/playerStore.js` ahora sincroniza `godCatalog`, `defeatedGods` y `unlockedMusicTracks`, dejando lista la base para el futuro sistema de dioses.
- `server/data/backgroundCatalog.js` ahora incluye `assetPath` para los fondos actuales y registra tambien los 5 fondos reservados para recompensas divinas.
- Se prepararon las rutas reales para assets futuros en:
- `client/assets/backgrounds/profile`
- `client/assets/backgrounds/gods`
- `client/assets/music/gods`
- Esas carpetas ya incluyen README con los nombres de archivo esperados para que luego puedas agregar arte y audio sin tener que redescubrir las rutas.
- `combat_foundation.md` quedo actualizado con el resumen del panteon y las carpetas base de assets.

- Verificacion fase 37:
- `node --check` paso en `server/data/godCatalog.js`, `server/data/backgroundCatalog.js`, `server/data/bossCatalog.js`, `server/core/playerStore.js` y `client/game.js`.
- Se confirmo por script que existen `5` dioses definidos, que las `5` pistas previstas apuntan a `assets/music/gods/*.ogg` y que ya no queda ningun `invocationView` pendiente en los apostoles.

- Siguiente fase documentada:
- Empezar la implementacion jugable de los 5 dioses como contenido extremo, separando su diseño de combate del sistema actual de apostoles.
- Definir despues como se desbloquean sus pistas de musica, si por primera victoria, por victoria perfecta o por completar toda la escalera de su legado.
Original prompt: Las habilidades dentro del archivo, /cliente/abilities.js, no estan aplicandose como deverian, las pasivas parecen no funcionar.

- Fase 21:
- Se agrego un minijuego independiente tipo supervivencia dentro de `client/` con `INTRO.html`, `Nivel1.html`, `Nivel2.html`, `Nivel3.html`, `control.js` y `game.css`.
- El minijuego usa `canvas`, movimiento con flechas, barra de vida, cambio visual del personaje segun vida, enemigos con dano positivo y negativo, tres niveles y overlays de victoria/derrota.
- Tambien se generaron `ManualUsuario.md`, `ManualTecnico.md` y `Pruebas.md` para documentacion del proyecto.
- Los sonidos quedaron cableados con `Audio()` apuntando a `client/assets/sfx/*.mp3`.
- Verificacion fase 21:
- `node --check` paso en `client/control.js`.
- Se valido visualmente la intro en `output/escape-intro/shot-0.png`.
- Se valido visualmente el juego en `output/escape-game/shot-0.png` y el estado textual en `output/escape-game/state-0.json`.
- Los audios quedaron conectados a `Audio()` con archivos minimos en `client/assets/sfx/` para la integracion del proyecto.
