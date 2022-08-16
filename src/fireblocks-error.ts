export default class FireBlocksError extends Error {
    private statusCode: number;
    private fireblocksCode: number;

    constructor(message: string, fireblocksCode: number, statusCode: number,) {
        super(message);
        this.name = "FireBlocksError";
        this.message = message;
        this.statusCode = statusCode;
        this.fireblocksCode = fireblocksCode;
    }
}
