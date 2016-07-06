contract IdisContractsFTW {

  struct Account {
    address owner;
    uint balance;
  }

  Account example;

  function set(uint x) {
    example = Account(msg.sender, x);
  }

  function getBalance() constant returns (uint retVal) {
    return example.balance;
  }

  function getOwner() constant returns (address retVal) {
    return example.owner;
  }
}
