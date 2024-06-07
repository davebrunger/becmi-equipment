import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { EquipmentItem } from "../models/EquipmentItem";
import React from "react";
import { getTotalEncumberence } from "../services/Utilities";

interface Props {
    readonly equipmentList: EquipmentItem[];
    readonly modal: boolean;
    readonly setModal: (modal: boolean) => void;
    readonly addItem: (item: EquipmentItem | undefined, quantity: number) => void;
}

function onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
}

export function AddItemModal(props: Props) {

    const [categories, setCategories] = React.useState<string[]>([]);
    const [items, setItems] = React.useState<string[]>([]);
    const [category, setCategory] = React.useState<string | undefined>(undefined);
    const [item, setItem] = React.useState<EquipmentItem | undefined>(undefined);
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        setCategories(props.equipmentList.map(i => i.category).filter(onlyUnique).sort());
    }, [props.equipmentList]);

    React.useEffect(() => {
        setCategory(categories.length > 0 ? categories[0] : undefined);
    }, [categories]);

    React.useEffect(() => {
        const items = category
            ? props.equipmentList.filter(e => e.category === category).map(e => e.name).sort()
            : [];
        setItems(items);
    }, [props.equipmentList, categories, category]);

    React.useEffect(() => {
        setItem(item => items.findIndex(i => i === item?.name) >= 0 ? item : props.equipmentList.find(i => i.name === items[0]));
    }, [props.equipmentList, items]);

    React.useEffect(() => {
        setQuantity(item?.costInGoldPieces ? 1 : item?.bundleSize ?? 1);
    }, [item]);

    React.useEffect(() => {
        if (!props.modal) {
            return;
        }
        setCategory(categories.length > 0 ? categories[0] : undefined);
    }, [props.modal, categories]);

    function addItem() {
        props.addItem(item, quantity);
    }

    return (
        <Modal isOpen={props.modal} backdrop="static">
            <ModalHeader>Add Item Of Equipment</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="categorySelect">Category</Label>
                        <Input type="select" id="categorySelect" name="categorySelect" value={category} onChange={e => setCategory(e.currentTarget.value)}>
                            {categories.map((category, index) => (
                                <option key={index}>{category}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="itemSelect">Item</Label>
                        <Input type="select" id="itemSelect" name="itemSelect" value={item?.name} onChange={e => setItem(props.equipmentList.find(i => i.name === e.currentTarget.value))}>
                            {items.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="quantityStaticOrSelect">Quantity</Label>
                        {
                            item?.costInGoldPieces && item?.bundleSize
                                ? (
                                    <Input type="select" id="quantityStaticOrSelect" name="quantityStaticOrSelect" value={quantity} onChange={e => setQuantity(parseInt(e.currentTarget.value, 10))}>
                                        <option>1</option>
                                        <option>{item.bundleSize}</option>
                                    </Input>
                                )
                                : <Input plaintext readOnly id="quantityStaticOrSelect" name="quantityStaticOrSelect" value={quantity} />
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="costStatic">Cost (gp)</Label>
                        <Input plaintext readOnly id="costStatic" name="costStatic" value={quantity === 1 ? item?.costInGoldPieces : item?.bundleCostInGoldPieces} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="encumberenceStatic">Encumberance (cn)</Label>
                        <Input plaintext readOnly id="encumberenceStatic" name="encumberenceStatic" value={getTotalEncumberence(item, quantity, false)} />
                    </FormGroup>
                </Form>
            </ModalBody >
            <ModalFooter>
                <Button color="success" onClick={addItem}>Add Item</Button>
                <Button color="danger" onClick={() => props.setModal(false)}>Cancel</Button>
            </ModalFooter>
        </Modal >
    );
}