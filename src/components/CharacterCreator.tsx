import React from "react";
import { GenerateAbilityScores } from "./GenerateAbilityScores";
import { ChooseRace } from "./ChooseRace";
import { races } from "../models/Race";
import { generateAbilityScores } from "../models/Abilities";

const stages = ["Generate Ability Scores", "Choose Race", "Choose Class"] as const;
type Stage = typeof stages[number];


export function CharacterCreator() {
    
    const [state, setStage] = React.useState<Stage>("Generate Ability Scores");
    const [abilityScores, setAbilityScores] = React.useState(generateAbilityScores());
    const [race, setRace] = React.useState(races.Human);
    
    switch (state) {
        case "Generate Ability Scores":
            return <GenerateAbilityScores abilityScores={abilityScores} setAbilityScores={setAbilityScores} next={abilityScores => {setAbilityScores(abilityScores); setStage("Choose Race")}} />;
        case "Choose Race" :
            return <ChooseRace abilityScores={abilityScores} race={race} setRace={setRace} next={abilityScores => {setAbilityScores(abilityScores); setStage("Choose Class")}} />;
        default:
            return <h1>Not yet implemented</h1>;
    }
}