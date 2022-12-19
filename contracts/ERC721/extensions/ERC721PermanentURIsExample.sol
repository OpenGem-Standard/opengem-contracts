// SPDX-License-Identifier: MIT
// OpenGem Contracts (contracts/ERC721/extensions/Example.sol)

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721PermanentURIs.sol"; // 0.854 +0.132 +0.396 = 1,382

contract ERC721PermanentURIsExample is ERC721, ERC721PermanentURIs {
    constructor(string memory prefixURI, string memory suffixURI)
        ERC721("ExampleToken", "ETK") {
            _addPermanentURI(prefixURI, suffixURI);
    }

    function safeMint(address to, uint256 tokenId, string calldata permanentTokenURI) public {
        _safeMint(to, tokenId);
        _addPermanentTokenURI(tokenId, permanentTokenURI);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentURIs) {
        super._burn(tokenId);
    }
}