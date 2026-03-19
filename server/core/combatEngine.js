const abilitiesData = require('../data/abilities');

module.exports = {
  processAction(room, playerId, actionType, target = null) {
    if (!room || !room.state) return { error: "No hay combate activo" };

    const isP1 = room.p1.socketId === playerId;
    const attacker = isP1 ? room.state.p1 : room.state.p2;
    const defender = isP1 ? room.state.p2 : room.state.p1;

    if (!attacker || !defender) return { error: "Faltan criaturas" };

    let logEntry = "";
    let damage = 0;

    switch (actionType) {
      case "attack":
        damage = Math.max(1, attacker.ataque - defender.defensa);
        defender.currentVida = Math.max(0, defender.currentVida - damage);
        logEntry = `${attacker.name} ataca y causa ${damage} de daño`;
        break;

      case "defend":
        defender.defensa += 5; // temporal +5 defensa este turno
        logEntry = `${attacker.name} se defiende (+5 defensa)`;
        break;

      case "recover":
        const heal = Math.floor(attacker.regen * 1.5);
        attacker.currentVida = Math.min(attacker.vida, attacker.currentVida + heal);
        logEntry = `\( {attacker.name} se regenera + \){heal} vida`;
        break;

      case "ability":
        const ability = attacker.ability;
        damage = Math.max(1, Math.floor(attacker.ataque * ability.multiplier) - defender.defensa);
        defender.currentVida = Math.max(0, defender.currentVida - damage);
        logEntry = `${attacker.name} usa ${ability.name} y causa ${damage} de daño`;
        break;

      default:
        return { error: "Acción inválida" };
    }

    // Regeneración pasiva al final del turno
    attacker.currentVida = Math.min(attacker.vida, attacker.currentVida + attacker.regen);
    defender.currentVida = Math.min(defender.vida, defender.currentVida + defender.regen);

    room.log.push(logEntry);
    if (room.log.length > 15) room.log.shift();

    // Verificar si alguien murió
    const gameOver = defender.currentVida <= 0;
    if (gameOver) {
      logEntry += ` → ${defender.name} ha sido derrotado!`;
      room.log.push(logEntry);
    }

    return {
      newState: room.state,
      log: [...room.log],
      gameOver,
      winner: gameOver ? (isP1 ? "p1" : "p2") : null
    };
  },

  // IA para modo practice (servidor decide acción)
  simulateAI(room) {
    const aiCreature = room.state.p2;
    const playerCreature = room.state.p1;

    if (!aiCreature || !playerCreature) return "attack";

    const healthPercent = (aiCreature.currentVida / aiCreature.vida) * 100;

    // Prioridad 1: si puede matar de un golpe
    const damageAttack = Math.max(1, aiCreature.ataque - playerCreature.defensa);
    if (damageAttack >= playerCreature.currentVida) return "attack";

    // Prioridad 2: vida baja
    if (healthPercent < 35) {
      return Math.random() < 0.6 ? "recover" : "defend";
    }

    // Prioridad 3: usar habilidad (30% chance si tiene)
    if (Math.random() < 0.3) return "ability";

    // Por defecto: atacar
    return "attack";
  }
};