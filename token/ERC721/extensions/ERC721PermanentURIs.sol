// SPDX-License-Identifier: MIT
// OpenGem Contracts (token/ERC721/extensions/ERC721PermanentURIs.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract ERC721PermanentURIs is ERC721 {
    using Strings for uint256;

    mapping(uint256 => string[]) private _tokenURIsPermanent;

    uint256 _URIsPermanentIndex = 0;
    mapping(uint256 => string) private _prefixURIsPermanent;
    mapping(uint256 => string) private _suffixURIsPermanent;

    function tokenURIsPermanent(uint256 tokenId) public view virtual returns (string[] memory) {
        _requireMinted(tokenId);
        uint256 index = 0;
        string[] memory uris = new string[](_URIsPermanentIndex + _tokenURIsPermanent[tokenId].length);

        for (uint256 i = 0; i < _URIsPermanentIndex;) {
            uris[index] = string(abi.encodePacked(_prefixURIsPermanent[i], tokenId.toString(), _suffixURIsPermanent[i]));
            unchecked {
                index++;
                i++;
            }
        }

        for (uint256 i = 0; i < _tokenURIsPermanent[tokenId].length;) {
            uris[index] = string(_tokenURIsPermanent[tokenId][i]);
            unchecked {
                index++;
                i++;
            }
        }

        return uris;
    }

    function _addPermanentURI(string memory prefixURI_, string memory suffixURI_) internal virtual {
        _prefixURIsPermanent[_URIsPermanentIndex] = prefixURI_;
        _suffixURIsPermanent[_URIsPermanentIndex] = suffixURI_;
        _URIsPermanentIndex++;
    }

    function _addPermanentTokenURI(uint256 tokenId, string memory tokenURI_) internal virtual {
        require(_exists(tokenId), "ERC721PermanentURIs: PermanentURI set of nonexistent token");
        _tokenURIsPermanent[tokenId].push(tokenURI_);
    }

    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (_tokenURIsPermanent[tokenId].length != 0) {
            delete _tokenURIsPermanent[tokenId];
        }
    }
}