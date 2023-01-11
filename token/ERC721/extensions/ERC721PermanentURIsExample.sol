// SPDX-License-Identifier: MIT
// OpenGem Contracts (token/ERC721/extensions/ERC721PermanentURIsExample.sol)

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721PermanentURIs.sol";

contract ERC721PermanentURIsExample is ERC721, ERC721PermanentURIs {
    constructor(string memory prefixURI, string memory suffixURI)
        ERC721("ExampleToken", "ETK") {
            _addPermanentURI(prefixURI, suffixURI);
    }

    function safeMint(address to, uint256 tokenId, string calldata permanentTokenURI) public {
        _safeMint(to, tokenId);
        _addPermanentTokenURI(tokenId, permanentTokenURI);
    }

    function addPermanentURI(string calldata prefixURI, string calldata suffixURI) external {
        _addPermanentURI(prefixURI, suffixURI);
    }

    function addPermanentTokenURI(uint256 tokenId, string calldata permanentTokenURI) external {
        _addPermanentTokenURI(tokenId, permanentTokenURI);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentURIs) {
        super._burn(tokenId);
    }
}