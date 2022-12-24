const { expect } = require("chai");

describe('ERC721PermanentProofExample tests', () => {
    before(async () => {
        [deployer, account1, account2, account3] = await ethers.getSigners()
    
        const ExampleToken = await ethers.getContractFactory("ERC721PermanentProofExample");
        token = await ExampleToken.deploy(
            "2b09e63451b3008af15758d7fd43c7cb2dae7097413df76d2a6223cfbacc4f27"
        );
        await token.deployed();

    })

    it('Read the global permanent proof', async () => {
        await token.connect(deployer).safeMint(account1.address, 0, "") 
        proof = await token.tokenProofPermanent(0)
        expect(proof).to.equal("2b09e63451b3008af15758d7fd43c7cb2dae7097413df76d2a6223cfbacc4f27")
    })
    it('Store the permanent proof when minting', async () => {
        await token.connect(deployer).safeMint(account1.address, 1, "0970ac84994a8026d2bf96afd240a0c1747a8660bedfc5606249b96cd8c1d3b8") 
        proof = await token.tokenProofPermanent(1)
        expect(proof).to.equal("0970ac84994a8026d2bf96afd240a0c1747a8660bedfc5606249b96cd8c1d3b8")
    })
    it('Rejects when trying to update a token proof', async () => {
        await expect(token.connect(deployer).setPermanentTokenProof(1, "Xxx")).to.be.rejectedWith('ERC721PermanentProof: Proof already set')
    })
    it('Rejects when trying to update a global proof', async () => {
        await expect(token.connect(deployer).setPermanentGlobalProof("Xxx")).to.be.rejectedWith('ERC721PermanentProof: Proof already set')
    })
})