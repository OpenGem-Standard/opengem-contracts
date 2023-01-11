const { expect } = require("chai");

describe('ERC721PermanentURIsExample tests', () => {
    before(async () => {
        [deployer, account1, account2, account3] = await ethers.getSigners()
    
        const ExampleToken = await ethers.getContractFactory("ERC721PermanentURIsExample");
        token = await ExampleToken.deploy();
        await token.deployed();

        await token.connect(deployer).safeMint(account1.address, 0) 
    })

    it('Add token URI', async () => {
        await token.connect(deployer).addPermanentTokenURI(0, "http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(1)
        expect(uris[0]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
    })

    it('Add another token URI', async () => {
        await token.connect(deployer).addPermanentTokenURI(0, "http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(2)
        expect(uris[0]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        expect(uris[1]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
    })

    it('Add base URI', async () => {
        await token.connect(deployer).addPermanentBaseURI("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/", ".json") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(3)
        expect(uris[0]).to.equal("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/0.json")
        expect(uris[1]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        expect(uris[2]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
    })

    it('Add another base URI', async () => {
        await token.connect(deployer).addPermanentBaseURI("ipfs://QmAGrEznHpPjkGrEfSssGhJnkjdsfkjnnggFzReRextReF/", "") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(4)
        expect(uris[0]).to.equal("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/0.json")
        expect(uris[1]).to.equal("ipfs://QmAGrEznHpPjkGrEfSssGhJnkjdsfkjnnggFzReRextReF/0")
        expect(uris[2]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        expect(uris[3]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
    })

    it('Add global URI', async () => {
        await token.connect(deployer).addPermanentGlobalURI("http://global.uri.json") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(5)
        expect(uris[0]).to.equal("http://global.uri.json")
        expect(uris[1]).to.equal("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/0.json")
        expect(uris[2]).to.equal("ipfs://QmAGrEznHpPjkGrEfSssGhJnkjdsfkjnnggFzReRextReF/0")
        expect(uris[3]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        expect(uris[4]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
    })

    it('Add another global URI', async () => {
        await token.connect(deployer).addPermanentGlobalURI("http://another.global.uri.json") 
        uris = await token.tokenURIsPermanent(0)
        expect(uris.length).to.equal(6)
        expect(uris[0]).to.equal("http://global.uri.json")
        expect(uris[1]).to.equal("http://another.global.uri.json")
        expect(uris[2]).to.equal("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/0.json")
        expect(uris[3]).to.equal("ipfs://QmAGrEznHpPjkGrEfSssGhJnkjdsfkjnnggFzReRextReF/0")
        expect(uris[4]).to.equal("http://arweave.net/jWr16e0Yt9H__uzxCf8ACHKbmh8Q7RScNZMoFunuo98")
        expect(uris[5]).to.equal("http://arweave.net/fSXG0uqsAxECuTBhyK8dd9z6EVu72zTiEZrlhOYoXSA")
    })

    it('Mint and check uris', async () => {
        await token.connect(deployer).safeMint(account1.address, 1)
        uris = await token.tokenURIsPermanent(1)
        expect(uris.length).to.equal(4)
        expect(uris[0]).to.equal("http://global.uri.json")
        expect(uris[1]).to.equal("http://another.global.uri.json")
        expect(uris[2]).to.equal("ipfs://QmeGrEznHpPnmXmspMjwiXyN6zS4E9zccariGR3jxtReF/1.json")
        expect(uris[3]).to.equal("ipfs://QmAGrEznHpPjkGrEfSssGhJnkjdsfkjnnggFzReRextReF/1")
    })
})