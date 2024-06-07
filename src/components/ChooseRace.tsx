import { Col, Input, Row, Table } from "reactstrap";
import { Ability, AbilityScores } from "../models/Abilities";
import { Race, RaceName, meetsMinimumAbilityScores, raceNames, races } from "../models/Race";
import React from "react";

interface Props {
    readonly abilityScores: AbilityScores;
    readonly race: Race;
    readonly setRace: (race : Race) => void;
}

export function ChooseRace(props : Props) {
    
    const [allowedRaces, setAllowedRaces] = React.useState<RaceName[]>([]);

    React.useEffect(() => {
        setAllowedRaces(raceNames.filter(r => meetsMinimumAbilityScores(props.abilityScores, races[r])));
    }, [props]);
    
    function getMinimums(raceName: RaceName) {
        const race = races[raceName];
        return Object.entries(race.minimumAbilityScores).reduce((a, [k, v]) => `${a}${a ? ", " : " - Minimum Ability Score(s): "}${k} ${v}`, "");
    }

    function abilityModifier(ability : Ability) {
        if ((props.race.abilityScoreModifiers[ability] ?? 0) > 0) {
            return `+${props.race.abilityScoreModifiers[ability]}`;
        }
        if ((props.race.abilityScoreModifiers[ability] ?? 0) < 0) {
            return props.race.abilityScoreModifiers[ability];
        }
        return undefined;
    }

    function total(ability : Ability) {
        var base = props.abilityScores[ability]
        var modifier = props.race.abilityScoreModifiers[ability] ?? 0;
        return Math.min(18, base + modifier);
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Value</th>
                        <th>Racial Modifier</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Strength</td>
                        <td>{props.abilityScores.Strength}</td>
                        <td>{abilityModifier("Strength")}</td>
                        <td>{total("Strength")}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>{props.abilityScores.Intelligence}</td>
                        <td>{abilityModifier("Intelligence")}</td>
                        <td>{total("Intelligence")}</td>
                    </tr>
                    <tr>
                        <td>Wisdom</td>
                        <td>{props.abilityScores.Wisdom}</td>
                        <td>{abilityModifier("Wisdom")}</td>
                        <td>{total("Wisdom")}</td>
                    </tr>
                    <tr>
                        <td>Dexterity</td>
                        <td>{props.abilityScores.Dexterity}</td>
                        <td>{abilityModifier("Dexterity")}</td>
                        <td>{total("Dexterity")}</td>
                    </tr>
                    <tr>
                        <td>Constitution</td>
                        <td>{props.abilityScores.Constitution}</td>
                        <td>{abilityModifier("Constitution")}</td>
                        <td>{total("Constitution")}</td>
                    </tr>
                    <tr>
                        <td>Charisma</td>
                        <td>{props.abilityScores.Charisma}</td>
                        <td>{abilityModifier("Charisma")}</td>
                        <td>{total("Charisma")}</td>
                    </tr>
                </tbody>
            </Table>
            <Row>
                <Col>
                    <Input type="select" value={props.race.name} onChange={e => props.setRace(races[e.currentTarget.value as RaceName])}>
                        {raceNames.map(r => <option key={r} disabled={!allowedRaces.some(a => a === r)} value={r} >{r}{getMinimums(r)}</option>)}
                    </Input>
                </Col>
            </Row>        
        </>
    );
}