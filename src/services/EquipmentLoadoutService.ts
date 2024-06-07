import { EquipmentItem } from "../models/EquipmentItem";
import { EquipmentLoadoutItem } from "../models/EquipmentLoadoutItem";
import { load as loadCsv, save as saveCsv } from "./CsvUtils";
import { getTotalCostInGoldPieces, getTotalEncumberence } from "./Utilities";

export function save(data : EquipmentLoadoutItem[]) {
    return saveCsv(data, item => ({name : item.item.name, quantity: item.quantity.toString(), worn: item.worn.toString()}));
}

export function load(equipmentList: EquipmentItem[]) : Promise<EquipmentLoadoutItem[] | undefined> {
    return loadCsv((keys, values) => {
        const item = equipmentList.find(item => item.name === values[keys.indexOf("name")]);
        if (!item) {
            throw new Error(`Could not find equipment item with name ${values[keys.indexOf("name")]} in equipment list`);
        }
        const quantity = parseInt(values[keys.indexOf("quantity")]);
        const worn = values[keys.indexOf("worn")] === "true";
        return {
            item: item,
            quantity: quantity,
            costInGoldPieces: getTotalCostInGoldPieces(item, quantity),
            encumberanceInCoins: getTotalEncumberence(item, quantity, worn),
            worn: worn
        };
    });
}
