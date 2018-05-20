import Packet from "./models/Packet";
export default class GoDispatcher {
    static go: any;
    static listening: boolean;
    private static executablePath;
    constructor(hasteExecutable: string);
    send(packet: Packet): Promise<any>;
    close(): void;
    private startProcess();
    private onClose();
    private register();
}
