import React from "react";
import { Button, Col, Row } from "reactstrap";
import { EquipmentItem } from "../models/EquipmentItem";
import { EquipmentLoadoutList } from "./EquipmentLoadoutList";
import { EquipmentLoadoutItem } from "../models/EquipmentLoadoutItem";
import { AddItemModal } from "./AddItemModal";
import { getNormalSpeedInFeetPerTurn, getTotalCostInGoldPieces, getTotalEncumberence } from "../services/Utilities";

interface Props {
    readonly equipmentList: EquipmentItem[];
}

export function EquipmentLoadout(props: Props) {

    const [modal, setModal] = React.useState(false);
    const [equipmentLoadout, setEquipmentLoadout] = React.useState<EquipmentLoadoutItem[]>([]);
    const [totalEncumberanceInCoins, setTotalEncumberanceInCoins] = React.useState(0);
    const [normalSpeedInFeetPerTurn, setNormalSpeedInFeetPerTurn] = React.useState(0);
    const [encounterSpeedInFeetPerRound, setEncounterSpeedInFeetPerRound] = React.useState(0);
    const [runningSpeedInFeetPerRound, setRunningSpeedInFeetPerRound] = React.useState(0);

    React.useEffect(() => {
        const normalSpeedInFeetPerTurn = getNormalSpeedInFeetPerTurn(totalEncumberanceInCoins);
        setNormalSpeedInFeetPerTurn(normalSpeedInFeetPerTurn);
        setEncounterSpeedInFeetPerRound(normalSpeedInFeetPerTurn / 3);
        setRunningSpeedInFeetPerRound(normalSpeedInFeetPerTurn);
    }, [totalEncumberanceInCoins]);

    React.useEffect(() => {
        setTotalEncumberanceInCoins(equipmentLoadout.map(i => i.encumberanceInCoins).reduce((a, c) => a + c, 0));
    }, [equipmentLoadout]);

    function addItem(item: EquipmentItem | undefined, quantity: number) {
        setModal(false);
        if (!item) {
            return
        }
        const currentItem = equipmentLoadout.find(e => e.item.name === item.name);
        const newQuantity = (currentItem?.quantity ?? 0) + quantity;
        const newWorn = currentItem?.worn ?? false;
        const newItem = {
            item: item,
            quantity: newQuantity,
            costInGoldPieces: getTotalCostInGoldPieces(item, newQuantity),
            encumberanceInCoins: getTotalEncumberence(item, newQuantity, newWorn),
            worn : newWorn
        }
        const newLoadout = currentItem
            ? equipmentLoadout.map(e => e.item.name === item.name ? newItem : e)
            : [...equipmentLoadout, newItem];
        setEquipmentLoadout(newLoadout);
     }

     function removeItem(itemName: string) {
        const newLoadout = equipmentLoadout.filter(i => i.item.name !== itemName);
        setEquipmentLoadout(newLoadout);
    }

    function changeItemQuamtity(itemName: string, newQuantity: number) {
        if (newQuantity <= 0) {
            newQuantity = 1;
        }
        const currentItem = equipmentLoadout.find(e => e.item.name === itemName)!;
        const newItem = {
            ...currentItem,
            quantity: newQuantity,
            costInGoldPieces: getTotalCostInGoldPieces(currentItem.item, newQuantity),
            encumberanceInCoins: getTotalEncumberence(currentItem.item, newQuantity, currentItem.worn)
        }
        const newLoadout = equipmentLoadout.map(i => i.item.name === itemName ? newItem : i);
        setEquipmentLoadout(newLoadout);
    }

    function changeItemWorn(itemName: string, newWorn: boolean) {
        const currentItem = equipmentLoadout.find(e => e.item.name === itemName)!;
        const newItem = {
            ...currentItem,
            encumberanceInCoins: getTotalEncumberence(currentItem.item, currentItem.quantity, newWorn),
            worn : newWorn
        }
        const newLoadout = equipmentLoadout.map(i => i.item.name === itemName ? newItem : i);
        setEquipmentLoadout(newLoadout);
    }

    return (
        <>
            <div>
                <Row className="row-cols-auto" style={{ paddingTop: "8px" }}>
                    <Col>
                        <Button color="primary" onClick={() => setModal(true)}>Add Item</Button>
                    </Col>
                    <Col>
                        <Button color="danger" onClick={() => { if (window.confirm("Are you sure?")) { setEquipmentLoadout([]); } }}>Clear Items</Button>
                    </Col>
                    <Col style={{ paddingTop: "7px" }}>
                        Normal Speed: {normalSpeedInFeetPerTurn}'/Turn
                    </Col>
                    <Col style={{ paddingTop: "7px" }}>
                        Encounter Speed: {encounterSpeedInFeetPerRound}'/Round
                    </Col>
                    <Col style={{ paddingTop: "7px" }}>
                        Running Speed: {runningSpeedInFeetPerRound}'/Round
                    </Col>
                </Row>
            </div>
            <EquipmentLoadoutList equipmentLoadout={equipmentLoadout} totalEncumberanceInCoins={totalEncumberanceInCoins} removeItem={removeItem} changeItemQuamtity={changeItemQuamtity} changeItemWorn={changeItemWorn} />
            <AddItemModal equipmentList={props.equipmentList} modal={modal} setModal={setModal} addItem={addItem} />
        </>
    );
}