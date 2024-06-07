import { Table } from "reactstrap";
import { EquipmentItem } from "../models/EquipmentItem";
import { formatCurrency } from "../services/Utilities";

interface Props {
    readonly equipmentList: EquipmentItem[];
}

export function EquipmentList(props: Props) {
    return (
        <Table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Description/Notes</th>
                    <th className="text-end">Cost</th>
                    <th className="text-end">Enc. (cn)</th>
                    <th className="text-end">Enc. When Worn (cn)</th>
                    <th className="text-end">Capacity (cn)</th>
                    <th className="text-end">Max. Enc. (cn)</th>
                    <th className="text-end">Bundle Size</th>
                    <th className="text-end">Bundle Cost</th>
                </tr>
            </thead>
            <tbody>
                {props.equipmentList.map((equipmentItem, index) => (
                    <tr key={index}>
                        <td>{equipmentItem.category}</td>
                        <td>{equipmentItem.name}</td>
                        <td>{equipmentItem.descriptionOrNotes}</td>
                        <td className="text-end">{formatCurrency(equipmentItem.costInGoldPieces)}</td>
                        <td className="text-end">{equipmentItem.encumbranceInCoins === 0.3333333333 ? <>&#8531;</> : equipmentItem.encumbranceInCoins}</td>
                        <td className="text-end">{equipmentItem.encumbranceInCoinsWhenWorn}</td>
                        <td className="text-end">{equipmentItem.capacityInCoins}</td>
                        <td className="text-end">{equipmentItem.maximumEncumberenceInCoins}</td>
                        <td className="text-end">{equipmentItem.bundleSize}</td>
                        <td className="text-end">{formatCurrency(equipmentItem.bundleCostInGoldPieces)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}