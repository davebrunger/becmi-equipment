import { EquipmentItem } from "../models/EquipmentItem";

export async function fetchEquipmentItems() : Promise<EquipmentItem[]>
{
    const response = await fetch("/BECMI_ Equipment_List.csv");
    const equipmentItemsCsv = await response.text();
    const data = parseCsv(equipmentItemsCsv);
    return data.map(row => ({
        category: row[0],
        name: row[1],
        descriptionOrNotes: row[2] || undefined,
        costInGoldPieces: row[3] ? parseFloat(row[3]) : undefined,
        encumbranceInCoins: parseFloat(row[4]),
        encumbranceInCoinsWhenWorn: row[5] ? parseInt(row[5], 10) : undefined,
        capacityInCoins: row[6] ? parseInt(row[6], 10) : undefined,
        maximumEncumberenceInCoins: row[7] ? parseInt(row[7], 10) : undefined,
        bundleSize: row[8] ? parseInt(row[8], 10) : undefined,
        bundleCostInGoldPieces: row[9] ? parseInt(row[9], 10) : undefined,
    }));
}

function parseCsv(csv: string) : string[][] {
    const lines = csv.split("\n").filter(line => line.length > 0).slice(1);
    return lines.map(line => parseCsvLine(line));
}

function parseCsvLine(csvLine: string) : string[] {
    const line = csvLine.trim();
    const result = [];
    let currentField = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            inQuotes = !inQuotes;
        }
        else if (c === ',' && !inQuotes) {
            result.push(currentField);
            currentField = "";
        }
        else {
            currentField += c;
        }
    }
    result.push(currentField);
    return result;
}
