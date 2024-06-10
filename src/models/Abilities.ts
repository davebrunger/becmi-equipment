import { mergeRecords, shuffle } from "../services/Utilities";

export const abilities = ["Strength", "Intelligence", "Wisdom", "Dexterity", "Constitution", "Charisma"] as const;
export type Ability = typeof abilities[number];
export type AbilityScores = Readonly<Record<Ability, number>>;

const abilityScoreCardValues : readonly number[]= [1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6];

export function generateAbilityScores() : AbilityScores
{
    const shuffled = shuffle(abilityScoreCardValues);
    const result = {
        Strength: shuffled.slice(0, 3).reduce((a, b) => a + b, 0),
        Intelligence: shuffled.slice(3, 6).reduce((a, b) => a + b, 0),
        Wisdom: shuffled.slice(6, 9).reduce((a, b) => a + b, 0),
        Dexterity: shuffled.slice(9, 12).reduce((a, b) => a + b, 0),
        Constitution: shuffled.slice(12, 15).reduce((a, b) => a + b, 0),
        Charisma: shuffled.slice(15, 18).reduce((a, b) => a + b, 0),
    };
    const isValid = Object.values(result).every(v => v >= 4);
    return isValid ? result : generateAbilityScores();
}

export function addModifiers(abilityScores: AbilityScores, modifiers: Partial<AbilityScores>) : AbilityScores {
    return mergeRecords(abilityScores, modifiers, (a, b) => Math.max(3, Math.min(18, (a ?? 0)+ (b ?? 0))));
}