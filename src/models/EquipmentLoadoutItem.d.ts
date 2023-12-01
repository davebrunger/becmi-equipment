import { EquipmentItem } from "./EquipmentItem";

export interface EquipmentLoadoutItem
{
    readonly item : EquipmentItem;
    readonly quantity: number; 
    readonly costInGoldPieces : number;
    readonly encumberanceInCoins : number;
    readonly worn : boolean;
}