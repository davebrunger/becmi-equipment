async function getSaveHandle() {
    try {
        return await window.showSaveFilePicker({
            types: [{
                description: 'CSV Files',
                accept: {
                    'text/csv': ['.csv']
                }
            }]
        });
    } catch (error) {
        return undefined;
    }
}

async function getLoadHandle() {
    try {
        return window.showOpenFilePicker({
            types: [{
                description: 'CSV Files',
                accept: {
                    'text/csv': ['.csv']
                }
            }], multiple: false
        });
    } catch (error) {
        return undefined;
    }
}

function getContents<T extends {[key : string] : string}>(data : T[]) {
    if (data.length === 0) {
        return "";
    }
    const keys = Object.keys(data[0]);
    let contents = keys.join(",");
    for (const item of data) {
        contents += `\n${keys.map(key => item[key]).join(",")}`;
    }
    return contents;
}

export async function save<T>(data : T[], map : (item : T) => {[key : string] : string}) {
    const handle = await getSaveHandle();
    if (!handle) {
        return;
    }
    const writable = await handle.createWritable();
    await writable.write(getContents(data.map(map)));
    await writable.close();
}

export async function load<T>(map : (keys : string[], line : string[]) => T) {
    const handle = await getLoadHandle();
    if (!handle) {
        return undefined;
    }
    const file = await handle[0].getFile();
    const contents = await file.text();
    const lines = contents.split("\n").filter(a => a);
    if (lines.length === 0) {
        return [];
    }
    const keys = lines[0].split(",");
    return lines.slice(1).map(line => map(keys, line.split(",")));
}
