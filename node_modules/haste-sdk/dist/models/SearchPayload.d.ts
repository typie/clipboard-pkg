export default class SearchPayload {
    type: string;
    limit: number;
    value: string;
    orderBy: string;
    direction: string;
    packageName: string;
    db: string;
    constructor();
}
