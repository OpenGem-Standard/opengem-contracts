// SPDX-License-Identifier: MIT
// OpenGem Contracts (token/ERC721/extensions/ERC721PermanentProofExample.sol)

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721PermanentProof.sol";

contract ERC721PermanentProofExample is ERC721, ERC721PermanentProof {
    constructor(string memory globalProof)
        ERC721("ExampleToken", "ETK") {
            _setPermanentGlobalProof(globalProof);
    }

    function safeMint(address to, uint256 tokenId, string calldata tokenProof) public {
        _safeMint(to, tokenId);
        _setPermanentTokenProof(tokenId, tokenProof);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentProof) {
        super._burn(tokenId);
    }
}