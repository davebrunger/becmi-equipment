import { EquipmentItem } from "../models/EquipmentItem";

export function getNormalSpeedInFeetPerTurn(totalEncumberanceInCoins: number) {
    if (totalEncumberanceInCoins <= 400) {
        return 120;
    }
    if (totalEncumberanceInCoins <= 800) {
        return 90;
    }
    if (totalEncumberanceInCoins <= 1200) {
        return 60;
    }
    if (totalEncumberanceInCoins <= 1600) {
        return 30;
    }
    if (totalEncumberanceInCoins <= 2400) {
        return 15;
    }
    return 0;
}

export function getTotalEncumberence (item: EquipmentItem | undefined, quantity: number, worn: boolean) {
    if (!item) {
        return 0;
    }
    worn = worn && item.encumbranceInCoinsWhenWorn !== undefined;
    if (worn && quantity > 0)
    {
        quantity = quantity - 1;
    }
    return Math.ceil((item.encumbranceInCoins * quantity) + (worn ? item.encumbranceInCoinsWhenWorn ?? 0 : 0));
}

export function getTotalCostInGoldPieces(item: EquipmentItem, quantity: number) {
    if (item.bundleCostInGoldPieces === undefined) {
        return (item.costInGoldPieces ?? 0 * quantity);
    }
    let remainder = quantity % (item.bundleSize ?? 1);
    let bundles = (quantity - remainder) / (item.bundleSize ?? 1);
    if (!item.costInGoldPieces && remainder > 0)
    {
        remainder = 0;
        bundles++;
    }
    return (bundles * (item.bundleCostInGoldPieces ?? 0)) + (remainder * (item.costInGoldPieces ?? 0));
}

export function formatCurrency(costInGoldCoins: number | undefined) {
    if (!costInGoldCoins) {
        return "";
    }
    if (Math.floor(costInGoldCoins) === costInGoldCoins) {
        return `${costInGoldCoins}gp`;
    }
    if (Math.floor(costInGoldCoins * 10) === costInGoldCoins * 10) {
        return `${costInGoldCoins * 10}sp`;
    }
    return `${Math.ceil(costInGoldCoins * 100)}cp`;
}

export function shuffle<T>(source: readonly T[]) {
    const result = [...source];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function mergeRecords<T extends string | number | symbol, U>(source: Partial<Record<T, U>>, record: Partial<Record<T, U>>, merge: (a?: U, b?: U) => U) {
    return Object.keys(source).reduce(
        (a, b) => { 
            const c = b as T; 
            return { ...a, [c] : merge(source[c], record[c])}
        }, 
        {} as Record<T, U>); 
}

export function addRecords<T extends string | number | symbol>(source: Partial<Record<T, number>>, records: Partial<Record<T, number>>) {
    return mergeRecords(source, records, (a, b) => (a ?? 0) + (b ?? 0));
}