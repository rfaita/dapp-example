// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Counter {
    address private _owner = msg.sender;
    uint256 private _count = 0;

    function increment() public {
        _count++;
    }

    function decrement() public restricted {
        if (_count > 0) {
            _count--;
        }
    }

    function incrementByTen() public payable {
        // 1 eth === 1_000_000_000_000_000_000 wei
        require(1_000_000_000_000_000_000 == msg.value, "Incorrect value");

        payable(_owner).transfer(msg.value);

        _count += 10;
    }

    function getCount() public view returns (uint256) {
        return _count;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    modifier restricted() {
        require(
            msg.sender == _owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }
}
