import { Ability, AbilityScores } from "./Abilities";

export const raceNames = ["Drow", "Duergar", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Svirfneblin"] as const;
export type RaceName = typeof raceNames[number];

export type Race = {
    readonly name: string;
    readonly abilityScoreModifiers: Partial<AbilityScores>;
    readonly minimumAbilityScores: Partial<AbilityScores>;
    readonly languages: readonly string[];
    readonly abilities: { readonly [abilityName: string]: string };
}

export const races: Record<RaceName, Race> = {
    Drow: {
        name: "Drow",
        abilityScoreModifiers: {
            Dexterity: 1,
            Constitution: -1
        },
        minimumAbilityScores: {
            Intelligence: 9
        },
        languages: ["Alignment", "Common", "Deepcommon", "Elvish", "Gnomish"],
        abilities: {
            "Detect Secret Doors": "Drow have keen eyes that allow them, when actively searching, to detect hidden and secret doors with a 2-in-6 chance.",
            "Immunity to Ghoul Paralysis": "Drow are completely unaffected by the paralysis ghouls can inflict.",
            "Infravision": "Drow have infravision to 90'.",
            "Innate Magic": "At 2nd level, a drow is able to cast the darkness spell (the reverse of light) once per day and, at 4th level, detect magic once per day.",
            "Light Sensitivity": "When in bright light (daylight, continual light), drow suffer a -2 penalty to attack rolls and a -1 penalty to Armour Class.",
            "Listening at Doors": "Drow have a 2-in-6 chance to hear noises."
        }
    },
    Duergar: {
        name: "Duergar",
        abilityScoreModifiers: {
            Constitution: 1,
            Charisma: -1
        },
        minimumAbilityScores: {
            Intelligence: 9,
            Constitution: 9
        },
        languages: ["Alignment", "Common", "Deepcommon", "Dwavish", "Gnomish", "Goblin", "Kobold"],
        abilities: {
            "Combat": "Due to their short height, duergars can only use small or normal sized weapons. They cannot use longbows or two-handed swords.",
            "Detect Construction Tricks": "As expert miners, duergars have a 2-in-6 chance of being able to detect new construction, sliding walls, or sloping passages when searching.",
            "Detect Room Traps": "Due to their expertise with construction, duergars have a 2-in-6 chance of detecting non-magical room traps when searching.",
            "Infravision": "Duergars have infravision to 90'.",
            "Light Sensitivity": "When in bright light (daylight, continual light), duergars suffer a -2 penalty to attack rolls and a -1 penalty to Armour Class.",
            "Listening at Doors": "Duergars have a 2-in-6 chance to hear noises.",
            "Resilience": "Duergars' natural constitution and resistance to magic grants them a bonus to saving throws versus paralysis, poison, spells, and magic wands, rods, and staves. This bonus depends on a duergar's CON score, as follows: ▶ 6 or lower: No bonus ▶ 7-10: +2 ▶ 11-14: +3 ▶ 15-17: +4 ▶ 18: +5",
            "Stealth": "Underground, duergars have a 3-in-6 chance of moving silently."
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
        },
        languages: ["Alignment", "Common", "Dwavish", "Gnomish", "Goblin", "Kobold"],
        abilities: {
            "Combat": "Due to their short height, dwarves can only use small or normal sized weapons. They cannot use longbows or two-handed swords.",
            "Detect Construction Tricks": "As expert miners, dwarves have a 2-in-6 chance of being able to detect new construction, sliding walls, or sloping passages when searching.",
            "Detect Room Traps": "Due to their expertise with construction, dwarves have a 2-in-6 chance of detecting non-magical room traps when searching.",
            "Infravision": "Dwarves have infravision to 60'.",
            "Listening at Doors": "Dwarves have a 2-in-6 chance to hear noises.",
            "Resilience": "Dwarves' natural constitution and resistance to magic grants them a bonus to saving throws versus paralysis, poison, spells, and magic wands, rods, and staves. This bonus depends on a dwarf's CON score, as follows: ▶ 6 or lower: No bonus ▶ 7-10: +2 ▶ 11-14: +3 ▶ 15-17: +4 ▶ 18: +5",
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
        },
        languages: ["Alignment", "Common", "Elvish", "Gnoll", "Hobgoblin", "Orcish"],
        abilities: {
            "Detect Secret Doors": "Elves have keen eyes that allow them, when actively searching, to detect hidden and secret doors with a 2-in-6 chance.",
            "Immunity to Ghoul Paralysis": "Elves are completely unaffected by the paralysis ghouls can inflict.",
            "Infravision": "Elves have infravision to 60'.",
            "Listening at Doors": "Elves have a 2-in-6 chance to hear noises."
        }
    },
    Gnome: {
        name: "Gnome",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Intelligence: 9,
            Constitution: 9
        },
        languages: ["Alignment", "Common", "Dwavish", "Gnomish", "Goblin", "Kobold"],
        abilities: {
            "Combat": "Armour must be tailored to gnomes' small size. Likewise, gnomes can only use weapons appropriate to their stature (as determined by the referee). They cannot use longbows or two-handed swords.",
            "Defensive bonus": "Due to their small size, gnomes gain a +2 bonus to Armour Class when attacked by large opponents (greater than human-sized).",
            "Detect Construction Tricks": "As expert miners, gnomes have a 2-in-6 chance of being able to detect new construction, sliding walls, or sloping passages when searching.",
            "Infravision": "Gnomes have infravision to 90'.",
            "Listening at Doors": "Gnomes have a 2-in-6 chance to hear noises.",
            "Magic Resistance": "Gnomes are naturally resistant to magic, gaining a bonus to saving throws versus spells and magic wands, rods, and staves. This bonus depends on a gnome's CON score, as follows: ▶ 6 or lower: No bonus ▶ 7-10: +2 ▶ 11-14: +3 ▶ 15-17: +4 ▶ 18: +5",
            "Speak with Burrowing Animals": "Gnomes often keep burrowing mammals such as badgers and moles as pets. They know the secret language of such creatures.",
        }
    },
    "Half-Elf": {
        name: "Half-Elf",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Constitution: 9,
            Charisma: 9
        },
        languages: ["Alignment", "Common", "Elvish"],
        abilities: {
            "Detect Secret Doors": "Half-Elves have keen eyes that allow them, when actively searching, to detect hidden and secret doors with a 2-in-6 chance.",
            "Infravision": "Half-Elves have infravision to 60'.",
        }
    },
    Halfling: {
        name: "Halfling",
        abilityScoreModifiers: {
            Strength: -1,
            Dexterity: 1,
        },
        minimumAbilityScores: {
            Dexterity: 9,
            Constitution: 9
        },
        languages: ["Alignment", "Common", "Halfling"],
        abilities: {
            "Combat": "Armour must be tailored to halflings' small size. Likewise, halflings can only use weapons appropriate to their stature (as determined by the referee). They cannot use longbows or two-handed swords.",
            "Defensive bonus": "Due to their small size, halflings gain a +2 bonus to Armour Class when attacked by large opponents (greater than human-sized).",
            "Initiative Bonus": "If using the optional rule for individual initiative, halflings get a bonus of +1 to initiative rolls.",
            "Listening at Doors": "Halflings have a 2-in-6 chance to hear noises.",
            "Resilience": "Halflings' natural constitution and resistance to magic grants them a bonus to saving throws versus paralysis, poison, spells, and magic wands, rods, and staves. This bonus depends on a halflings's CON score, as follows: ▶ 6 or lower: No bonus ▶ 7-10: +2 ▶ 11-14: +3 ▶ 15-17: +4 ▶ 18: +5",
        }
    },
    "Half-Orc": {
        name: "Half-Orc",
        abilityScoreModifiers: {
            Strength: 1,
            Constitution: 1,
            Charisma: -2
        },
        minimumAbilityScores: {},
        languages: ["Alignment", "Common", "Orcish"],
        abilities: {
            "Infravision": "Half-Orcs have infravision to 60'.",
        }
    },
    Human: {
        name: "Human",
        abilityScoreModifiers: {
            Constitution: 1,
            Charisma: 1
        },
        minimumAbilityScores: {},
        languages: ["Alignment", "Common"],
        abilities: {
            "Blessed": "When rolling hit points (including at 1st level), the player of a human PC may roll twice and take the best result.",
            "Decisiveness": "When an initiative roll is tied, humans act first, as if they had won initiative. If using the optional rule for individual initiative, humans get a bonus of +1 to initiative rolls.",
            "Leadership": "All of a human’s retainers and mercenaries gain a +1 bonus to loyalty and morale."
        }
    },
    Svirfneblin: {
        name: "Svirfneblin",
        abilityScoreModifiers: {},
        minimumAbilityScores: {
            Constitution: 9
        },
        languages: ["Alignment", "Common", "Deepcommon", "Dwavish", "Gnomish", "Kobold"],
        abilities: {
            "Blend into Stone": "Svirfneblins have the uncanny ability to go unnoticed when in an environment of natural or carved stone so long as they remain silent and motionless. The chance of success is 4-in-6 in gloomy conditions or 2-in-6 in well-lit conditions.",
            "Combat": "Armour must be tailored to svirfneblins' small size. Likewise, svirfneblins can only use weapons appropriate to their stature (as determined by the referee). They cannot use longbows or two-handed swords.",
            "Defensive bonus": "Due to their small size, svirfneblins gain a +2 bonus to Armour Class when attacked by large opponents (greater than human-sized).",
            "Detect Construction Tricks": "As expert miners, svirfneblins have a 2-in-6 chance of being able to detect new construction, sliding walls, or sloping passages when searching.",
            "Infravision": "Svirfneblins have infravision to 90'.",
            "Light Sensitivity": "When in bright light (daylight, continual light), svirfneblins suffer a -2 penalty to attack rolls and a -1 penalty to Armour Class.",
            "Listening at Doors": "Svirfneblins have a 2-in-6 chance to hear noises.",
            "Illusion Resistance": "Svirfneblins gain a +2 bonus to all saving throws against illusions.",
            "Speak with Earth Elementals": "Svirfneblins can speak with natives of the plane of elemental earth."
        }
    }
};

export function meetsMinimumAbilityScores(abilityScores: AbilityScores, race: Race) {
    return Object.entries(race.minimumAbilityScores).every(([ability, minimum]) => abilityScores[ability as Ability] >= minimum);
}