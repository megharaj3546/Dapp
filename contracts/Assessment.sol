// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event DebitCardPayment(address cardHolder, uint256 amount);
    event CreditCardPayment(address cardHolder, uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        require(msg.sender == owner);
        uint256 previousBalance = balance;
        balance += _amount;
        assert(balance == previousBalance + _amount);
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 currentBalance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner);
        uint256 currentBalance = balance;
        if (currentBalance < _withdrawAmount) {
            revert InsufficientBalance({ currentBalance: currentBalance, withdrawAmount: _withdrawAmount });
        }
        balance -= _withdrawAmount;
        assert(balance == (currentBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }

    function makeDebitCardPayment(address _cardHolder, uint256 _amount) public {
        require(msg.sender == owner);
        uint256 remainingBalance = balance;
        if (remainingBalance < _amount) {
            revert InsufficientBalance({ currentBalance: remainingBalance, withdrawAmount: _amount });
        }
        balance -= _amount;
        assert(balance == (remainingBalance - _amount));
        emit DebitCardPayment(_cardHolder, _amount);
    }

    function makeCreditCardPayment(address _cardHolder, uint256 _amount) public {
        require(msg.sender == owner);
        uint256 newBalance = balance;
        balance += _amount;
        assert(balance == newBalance + _amount);
        emit CreditCardPayment(_cardHolder, _amount);
    }
}
