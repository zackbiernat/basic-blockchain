import * as crypto from "crypto-js";
import { log } from "winston";
import Block from "./Block";

export default class Chain {
    blocks: Block[] = [];
    constructor() {
        this.blocks[0] = this.genesisBlock();
    }
    add(block: Block): void {
        if (this.validateBlock(block)) {
        this.blocks.push(block);
    }
    }
    validate(): boolean {
        for (const block of this.blocks) {
            if (!this.validateBlock(block)) {
                return false;
            }
        }
        return true;
    }
    validateBlock(block: Block): boolean {
        if (block.index === 0) {
            if (block.calculateHash() !== block.hash) {
                log("error", "genesis block has bad hash");
                return false;
            }
        } else {
            if (block.previousHash !== this.blocks[block.index - 1].hash) {
                log("error", "block %s previousHash is invalid", block.index);
                return false;
            }
            if (block.calculateHash() !== block.hash) {
                log("error", "block %s hash is invalid", block.index);
                return false;
            }
        }
        return true;
    }
    timestamp(): number {
        return new Date().getTime() / 1000;
    }
    genesisBlock(): Block {
        return new Block(0, "", this.timestamp(), "");
    }
    getLast(): Block {
        return this.blocks[this.blocks.length - 1];
    }
    nextIndex(): number {
        return this.getLast().index + 1;
    }
}
