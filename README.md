# OpenGem | contracts
[![NPM Package](https://img.shields.io/npm/v/@opengem/contracts.svg)](https://www.npmjs.org/package/@opengem/contracts)

The standard for secure NFT offering sovereignty for creators and the best level of ownership for owners. Feel free to visit our products on [OpenGem](https://opengem.com/).

## Overview
OpenGem contracts help you to enforce ownership for your owners. To make your work easier, all our contracts are extensions to the ERCs provided by [OpenZeppelin](https://www.openzeppelin.com/).

## Installation
```console
npm install @opengem/contracts
```

Once installed, you can use the contracts in the library by importing them like in this example:
```solidity
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@opengem/contracts/token/ERC721/extensions/ERC721PermanentURIs.sol";

```

## ERC721PermanentURIs
*ERC721PermanentURIs.sol* is an implementation of **ERC721** with a permanent storage based token URI management.
It comes with ```_addPermanentURI()``` and ```_addPermanentTokenURI()```. These functions let you add permanent URIs, in the contract. With this implementation, no one can alter or delete these URIs.

### _addPermanentURI
Set your global URIs for all the tokens. ```_addPermanentURI()``` takes two arguments :
- ```prefixURI``` **(string)** 
- ```suffixURI``` **(string)**

As output, it will concatenate ```prefixURI``` + ```tokenID``` + ```suffixURI```.

#### Usage
```solidity
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@opengem/contracts/token/ERC721/extensions/ERC721PermanentURIs.sol";

contract Example is ERC721, ERC721PermanentURIs {
    constructor()
        ERC721("ExampleToken", "ETK") {
            _addPermanentURI('ipfs://QmXXX/', '.json');
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentURIs) {
        super._burn(tokenId);
    }
}

```
In this example, we set an IPFS CID that is common for all the tokens. We just added ".json" as suffix that comes after the tokenID in the naming files. Feel free to use at your convenance. You can add as many URIs as you want if you need to multiply permanent storage providers. These URIs will be publicly accessible.

**Notice**: as you see above, you need to override the native ```_burn()``` function as the extension is using it.

### _addPermanentTokenURI
You can set individual URIs for each minted tokens if you need to. ```_addPermanentTokenURI()``` takes two arguments :
- ```tokenId``` **(uint256)**
- ```uri``` **(string)**

#### Usage
```solidity
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@opengem/contracts/token/ERC721/extensions/ERC721PermanentURIs.sol";

contract Example is ERC721, ERC721PermanentURIs {
    constructor()
        ERC721("ExampleToken", "ETK") {
            _addPermanentURI('ipfs://QmXXX/', '.json');
    }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
        _addPermanentTokenURI(tokenId, 'arweave.net/Xxxx');
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentURIs) {
        super._burn(tokenId);
    }
}

```
In this example, we set an Arweave hash that is specific for the minted token asset. You can add as many token URIs as you want if you need to multiply permanent storage providers for a token. These URIs will be publicly accessible.

As you can see, you can add global permanent URIs **and** permanent token URIs.

### Outputs
**ERC721PermanentURIs** will render a publicly accessible read function:
- ```tokenURIsPermanent(uint256 tokenID)```

As output it give an array of URIs: **global and specific URIs for this token**. According to the above example, from Etherscan we have :

<img src="https://fetch.opengem.com/img/etherscan.png" height="100%">