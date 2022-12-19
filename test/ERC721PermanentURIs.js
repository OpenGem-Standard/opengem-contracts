const { expect } = require("chai");

describe('test', () => {
    before(async () => {
        [deployer, account1, account2, account3] = await ethers.getSigners()
    
        const ExampleToken = await ethers.getContractFactory("ERC721PermanentURIsExample");
        token = await ExampleToken.deploy(
            "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/",
            ""
        );
        await token.deployed();

    })

    describe('Storage permanent URI when minting', async () => {
        it('Store the permanent token URI when minting', async () => {
            await token.connect(deployer).safeMint(account1.address, 0, "http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98") 
            uris = await token.tokenURIsPermanent(0)
            expect(uris.length).to.equal(2)
            expect(uris[0]).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/0")
            expect(uris[1]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        })
        it('Store a new permanent token URI when minting', async () => {
            await token.connect(deployer).safeMint(account1.address, 1, "http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA") 
            uris = await token.tokenURIsPermanent(1)
            expect(uris.length).to.equal(2)
            expect(uris[0]).to.equal("ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1")
            expect(uris[1]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
        })
    })
})