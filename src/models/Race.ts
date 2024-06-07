import { Ability, AbilityScores } from "./Abilities";

export const raceNames = ["Drow", "Duergar", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Svirfneblin"] as const;
export type RaceName = typeof raceNames[number];

export type Race = {
    readonly name: string;
    readonly abilityScoreModifiers: Partial<AbilityScores>;
    readonly minimumAbilityScores: Partial<AbilityScores>;
}

export const races : Record<RaceName, Race> = {
    Drow: {
        name: "Drow",
        abilityScoreModifiers: {
            Dexterity: 1,
            Constitution: -1
        },
        minimumAbilityScores: {
            Intelligence: 9
        },
    },
    Duergar: {
        name: "Duergar",
        abilityScoreModifiers: {
            Constitution: 1,
            Charisma: -1
        },
        minimumAbilityScores: {
            Constitution: 9
        }
    },
    Dwarf: {
        name: "Dwarf",
        abilityScoreModifiers: {
            Constitution: 1,
            Charisma: -1
        },
        minimumAbilityScores: {
            Constitution: 9
        }
    },
    Elf: {
        name: "Elf",
        abilityScoreModifiers: {
            Dexterity: 1,
            Constitution: -1
        },
        minimumAbilityScores: {
            Intelligence: 9
        }
    },
    Gnome: {
        name: "Gnome",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Intelligence: 9
        }
    },
    "Half-Elf": {
        name: "Half-Elf",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Constitution: 9
        }
    },
    Halfling: {
        name: "Halfling",
        abilityScoreModifiers: {
            Strength: -1,
            Dexterity: 1,
        },
        minimumAbilityScores: {
            Constitution: 9
        }
    },
    "Half-Orc": {
        name: "Half-Orc",
        abilityScoreModifiers: {
            Strength: 1,
            Constitution: 1,
            Charisma: -2
        },
        minimumAbilityScores: {}
    },
    Human: {
        name: "Human",
        abilityScoreModifiers: {
            Constitution: 1,
            Charisma: 1
        },
        minimumAbilityScores: {}
    },
    Svirfneblin: {
        name: "Svirfneblin",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Constitution: 9
        }
    }
};

export function meetsMinimumAbilityScores(abilityScores: AbilityScores, race: Race) {
    return Object.entries(race.minimumAbilityScores).every(([ability, minimum]) => abilityScores[ability as Ability] >= minimum);
}