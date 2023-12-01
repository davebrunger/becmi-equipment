import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import { EquipmentLoadoutItem } from "../models/EquipmentLoadoutItem";
import { formatCurrency } from "../services/Utilities";

interface Props {
    readonly equipmentLoadout: readonly EquipmentLoadoutItem[];
    readonly totalEncumberanceInCoins: number;
    readonly removeItem: (itemName: string) => void;
    readonly changeItemQuamtity: (itemName: string, newQuantity: number) => void;
    readonly changeItemWorn: (itemName: string, newWorn: boolean) => void;
}

export function EquipmentLoadoutList(props: Props) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th className="text-end">Quantity</th>
                    <th className="text-end">Cost</th>
                    <th className="text-center">Worn</th>
                    <th className="text-end">Enc. (cn)</th>
                    <th className="text-end">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {props.equipmentLoadout.map((item, index) => (
                    <tr key={index}>
                        <td>{item.item.name}</td>
                        <td className="text-end"><input type="number" value={item.quantity} style={{ textAlign: "right" }} onChange={e => props.changeItemQuamtity(item.item.name, parseInt(e.currentTarget.value, 10))}></input></td>
                        <td className="text-end">{formatCurrency(item.costInGoldPieces)}</td>
                        <td className="text-center">
                            {
                                item.item.encumbranceInCoinsWhenWorn === undefined
                                    ? <>&nbsp;</>
                                    : (
                                        <Form>
                                            <FormGroup check inline>
                                                <Input type="checkbox" checked={item.worn} disabled={item.item.encumbranceInCoinsWhenWorn === undefined} onChange={e => props.changeItemWorn(item.item.name, e.currentTarget.checked)} />
                                            </FormGroup>
                                        </Form>
                                    )
                            }
                        </td>
                        <td className="text-end">{item.encumberanceInCoins}</td>
                        <td className="text-end"><Button size="sm" color="danger" onClick={() => props.removeItem(item.item.name)}>Remove</Button></td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>Total</th>
                    <td className="text-end">&nbsp;</td>
                    <td className="text-end">{formatCurrency(props.equipmentLoadout.map(i => i.costInGoldPieces).reduce((a, c) => a + c, 0))}</td>
                    <td className="text-center">&nbsp;</td>
                    <td className="text-end">{props.totalEncumberanceInCoins}</td>
                    <td className="text-end">&nbsp;</td>
                </tr>
            </tfoot>
        </Table>
    );
}