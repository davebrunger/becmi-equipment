export interface EquipmentItem
{
    readonly category : string;
    readonly name : string;
    readonly descriptionOrNotes? : string;
    readonly costInGoldPieces? : number;
    readonly encumbranceInCoins : number;
    readonly encumbranceInCoinsWhenWorn? : number;
    readonly capacityInCoins? : number;
    readonly maximumEncumberenceInCoins? : number;
    readonly bundleSize? : number;
    readonly bundleCostInGoldPieces? : number;
}