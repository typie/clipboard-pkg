import HasteRowItem from "./models/HasteRowItem";
export default class Haste {
    private search;
    private db;
    private packageName;
    private command;
    private payload;
    private goDispatcher;
    constructor(packageName: string, db?: string);
    pasteText(): this;
    addCollection(): this;
    updateCalled(item: any): this;
    multipleInsert(itemList: any): this;
    insert(item: HasteRowItem, persist?: boolean): this;
    getKey(value: string): this;
    getExecList(): this;
    fuzzySearch(value: string): this;
    getRows(limit: number): this;
    setPkg(name: string): this;
    setDB(name: string): this;
    orderBy(field: string): this;
    asc(): this;
    desc(): this;
    go(): Promise<any>;
}
