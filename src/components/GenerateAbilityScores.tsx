import React from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { Ability, AbilityScores, generateAbilityScores } from "../models/Abilities";
import { addRecords } from "../services/Utilities";

const noBonuses = { Strength: 0, Intelligence: 0, Wisdom: 0, Dexterity: 0, Constitution: 0, Charisma: 0 };

interface Props {
    readonly abilityScores: AbilityScores;
    readonly setAbilityScores: (abilityScores: AbilityScores) => void;
    readonly next: (abilityScores: AbilityScores) => void;
}

export function GenerateAbilityScores(props: Props) {

    const [bonuses, setBonuses] = React.useState(noBonuses);

    const statTotal = React.useMemo(
        () => Object.values(props.abilityScores).reduce((a, b) => a + b, 0) + Object.values(bonuses).reduce((a, b) => a + b, 0),
        [props.abilityScores, bonuses]);

    React.useEffect(() => {
        setBonuses(noBonuses);
    }, [props.abilityScores]);

    function reset() {
        props.setAbilityScores(generateAbilityScores());
    }

    function addBonus(stat: Ability, value: number) {
        setBonuses({ ...bonuses, [stat]: bonuses[stat] + value });
    }

    function changeBonus(stat: Ability, value: number) {
        const abilityScore = props.abilityScores ? props.abilityScores[stat] : 0;
        return value < 0
            ? (bonuses[stat] > 0 ? <Button color="warning" onClick={() => { addBonus(stat, -2) }}>v</Button> : <span>&nbsp;</span>)
            : (abilityScore + bonuses[stat] < 17 && statTotal < 63 ? <Button color="success" onClick={() => { addBonus(stat, 2) }}>^</Button> : <span>&nbsp;</span>)
    }

    function addScores() {
        return addRecords(props.abilityScores, bonuses);
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>Value</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Strength</td>
                        <td>{(props.abilityScores?.Strength ?? 0) + bonuses.Strength}</td>
                        <td>{changeBonus("Strength", -2)}</td>
                        <td>{changeBonus("Strength", 2)}</td>
                    </tr>
                    <tr>
                        <td>Intelligence</td>
                        <td>{(props.abilityScores?.Intelligence ?? 0) + bonuses.Intelligence}</td>
                        <td>{changeBonus("Intelligence", -2)}</td>
                        <td>{changeBonus("Intelligence", 2)}</td>
                    </tr>
                    <tr>
                        <td>Wisdom</td>
                        <td>{(props.abilityScores?.Wisdom ?? 0) + bonuses.Wisdom}</td>
                        <td>{changeBonus("Wisdom", -2)}</td>
                        <td>{changeBonus("Wisdom", 2)}</td>
                    </tr>
                    <tr>
                        <td>Dexterity</td>
                        <td>{(props.abilityScores?.Dexterity ?? 0) + bonuses.Dexterity}</td>
                        <td>{changeBonus("Dexterity", -2)}</td>
                        <td>{changeBonus("Dexterity", 2)}</td>
                    </tr>
                    <tr>
                        <td>Constitution</td>
                        <td>{(props.abilityScores?.Constitution ?? 0) + bonuses.Constitution}</td>
                        <td>{changeBonus("Constitution", -2)}</td>
                        <td>{changeBonus("Constitution", 2)}</td>
                    </tr>
                    <tr>
                        <td>Charisma</td>
                        <td>{(props.abilityScores?.Charisma ?? 0) + bonuses.Charisma}</td>
                        <td>{changeBonus("Charisma", -2)}</td>
                        <td>{changeBonus("Charisma", 2)}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>{statTotal}</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </tfoot>
            </Table>
            <Row className="row-cols-auto" style={{ paddingTop: "8px" }}>
                <Col>
                    <Button color="warning" onClick={reset}>Reset</Button>
                </Col>
                {statTotal === 63 ? <Col><Button color="success" onClick={() => props.next(addScores())} >Choose Species</Button></Col> : <></>}
            </Row>
        </>
    );
}