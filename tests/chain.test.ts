import { expect } from "chai";
import Block from "../src/block";
import Chain from "../src/chain";

describe("Construct Chain", () => {
  it("should return a chain with one block", () => {
    const chain = new Chain();
    expect(chain.blocks.length).to.equal(1);
  });
  it("chain block should have a hash", () => {
    const chain = new Chain();
    expect(chain.blocks[0].hash).to.not.be.empty;
  });
});

describe("Validate Chain", () => {
  it("validate chain with one block", () => {
    const chain = new Chain();
    expect(chain.validate());
  });
  it("validate chain with multiple blocks", () => {
    const chain = new Chain();
    const block = new Block(1, chain.blocks[0].hash, chain.timestamp(), "some data");
    chain.add(block);
    expect(chain.validate()).to.be.true;
  });
  it("fail validate chain with bad block hash", () => {
    const chain = new Chain();
    const block = new Block(1, chain.blocks[0].hash, chain.timestamp(), "some data");
    chain.add(block);
    chain.blocks[1].hash = "abcde";
    expect(chain.validate()).to.be.false;
  });
  it("fail validate chain with bad block data", () => {
    const chain = new Chain();
    const block = new Block(1, chain.blocks[0].hash, chain.timestamp(), "some data");
    chain.add(block);
    chain.blocks[1].data = "some other data";
    expect(chain.validate()).to.be.false;
  });
});
