// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {
    enum SupplyChainState {Created, Paid, Delivered}

    struct S_Item {
    Item _item;
    string _identifier;
    string _description;  // Thêm trường mô tả
    uint _itemPrice;
    SupplyChainState _state;
    address _buyer;
    uint8 _rating;
    bool _isRated;
    }

    mapping(uint => S_Item) public items;
    uint public itemIndex; // Chú ý là cần public để truy cập từ ngoài

    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress);
    event ItemRated(uint _itemIndex, uint8 _rating); 

function createItem(string memory _identifier, uint _itemPrice, string memory _description) public {
    Item item = new Item(this, _itemPrice, itemIndex);
    items[itemIndex]._item = item;
    items[itemIndex]._identifier = _identifier;
    items[itemIndex]._description = _description;  // Lưu mô tả vào sản phẩm
    items[itemIndex]._itemPrice = _itemPrice;
    items[itemIndex]._state = SupplyChainState.Created;
    items[itemIndex]._isRated = false;
    emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(item));
    itemIndex++;
}

    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Only full payments accepted!");
        require(items[_itemIndex]._state == SupplyChainState.Created, "Item is further in the chain!");
        
        items[_itemIndex]._state = SupplyChainState.Paid;
        items[_itemIndex]._buyer = msg.sender; 
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state), address(items[_itemIndex]._item));
    }

    function triggerDelivery(uint _itemIndex) public {
        require(items[_itemIndex]._state == SupplyChainState.Paid, "Item is further in the chain!");
        
        items[_itemIndex]._state = SupplyChainState.Delivered;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state), address(items[_itemIndex]._item));
    }

    function submitRating(uint _itemIndex, uint8 _rating) public {
        require(items[_itemIndex]._state == SupplyChainState.Delivered, "Item must be delivered to be rated!");
        require(msg.sender == items[_itemIndex]._buyer, "Only the buyer can submit a rating!");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5!");
        require(!items[_itemIndex]._isRated, "Item has already been rated!");

        items[_itemIndex]._rating = _rating;
        items[_itemIndex]._isRated = true; 
        emit ItemRated(_itemIndex, _rating); 
    }


    function getRating(uint _itemIndex) public view returns (uint8) {
        require(items[_itemIndex]._isRated, "Item has not been rated yet!");
        return items[_itemIndex]._rating;
    }

}