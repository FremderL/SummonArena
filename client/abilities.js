const abilities = {
    active: {
        fireBall: {
            damage: 30,
            effects: ["burn", "knockback"],
        },
        iceSpear: {
            damage: 20,
            effects: ["freeze"],
        },
    },
    passive: {
        healthRegen: {
            amount: 5,
            interval: 1000, // milliseconds
        },
        damageResistance: {
            percent: 15,
        },
    },
};

export default abilities;