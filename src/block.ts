import * as crypto from "crypto-js";

export default class Block {
    index: number;
    previousHash: string;
    timestamp: number;
    data: string;
    hash: string;
    constructor(index: number, previousHash: string, timestamp: number, data: string) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash(): string {
        return crypto.SHA256(this.index + this.previousHash + this.timestamp + this.data).toString();
    }
}
