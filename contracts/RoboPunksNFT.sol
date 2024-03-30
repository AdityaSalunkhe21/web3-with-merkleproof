// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public whitelistPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 maxPerWallet;
    uint256 maxPerWhitelistWallet;
    bool public isPublicMintEnabled;
    bool public isWhitelistMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    bytes32 public whitelistMerkleRoot;
    mapping(address => uint256) public walletMints;
    mapping(address => bool) public whitelistClaimed;

    constructor() payable ERC721('RoboPunks', 'RP'){
        mintPrice = 0.0005 ether;
        whitelistPrice = 0.0001 ether;
        totalSupply = 0;
        maxSupply = 100;
        maxPerWallet = 5;
        maxPerWhitelistWallet = 2;
        withdrawWallet = payable(msg.sender) ;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner{
        isPublicMintEnabled = isPublicMintEnabled_;
    }
    
    function setIsWhitelistMintEnabled(bool isWhitelistMintEnabled_) external onlyOwner{
        isWhitelistMintEnabled = isWhitelistMintEnabled_;
    }

    function setwhitelistMerkleRoot(bytes32 whitelistMerkleRoot_) external onlyOwner{
        whitelistMerkleRoot = whitelistMerkleRoot_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'Sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');

        for(uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }

    function whitelistmint(uint256 quantity_, bytes32[] calldata _merkleProof) public payable {
        require(isWhitelistMintEnabled, 'whitelist minting not enabled');
        require(!whitelistClaimed[_msgSender()], "Address already claimed!");
        require(msg.value == quantity_ * whitelistPrice, "wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold out");
        require(walletMints[msg.sender] + quantity_ <= maxPerWhitelistWallet, "exceed max wallet");
        bytes32 leaf = keccak256(abi.encodePacked(_msgSender()));
        require(MerkleProof.verify(_merkleProof, whitelistMerkleRoot, leaf), "Invalid proof!");
        
        whitelistClaimed[_msgSender()] = true;
        for(uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
}