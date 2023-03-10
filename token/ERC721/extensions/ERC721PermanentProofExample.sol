// SPDX-License-Identifier: MIT
// OpenGem Contracts (token/ERC721/extensions/ERC721PermanentProofExample.sol)

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERC721PermanentProof.sol";

contract ERC721PermanentProofExample is ERC721, ERC721PermanentProof {
    constructor() ERC721("ExampleToken", "ETK") { }

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function setPermanentGlobalProof(string calldata tokenProof) external {
        _setPermanentGlobalProof(tokenProof);
    }

    function setPermanentTokenProof(uint256 tokenId, string calldata tokenProof) external {
        _setPermanentTokenProof(tokenId, tokenProof);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721PermanentProof) {
        super._burn(tokenId);
    }
}