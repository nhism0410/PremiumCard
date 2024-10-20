// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./ItemManager.sol";

contract Item {
    uint public priceInWei;
    uint public pricePaid;
    uint public index;
    ItemManager parentContract;

    event PaymentReceived(uint indexed index, uint amount);

    constructor(ItemManager _parentContract, uint _priceInWei, uint _index) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePaid == 0, "Item is paid already!");
        require(priceInWei == msg.value, "Only full payments allowed");
        pricePaid += msg.value;
        
        (bool success,) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "The transaction wasn't successful, cancelling");
        
        emit PaymentReceived(index, msg.value);
    }

    fallback() external {
        // Optional: Add logic to handle unexpected calls or Ether transfers
    }
}
