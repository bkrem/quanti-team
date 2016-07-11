contract IdisContractsFTW {

  struct Account {
    address owner;
    uint balance;
  }

  Account example;

  modifier onlyOwner() {
      if (msg.sender != example.owner)
        throw;

    _ // `_` is synonymous to JS middleware's `next()`
  }

  event ActionEvent(address indexed userAddr, string actionType);
  function registerActionEvent(string actionType) {
      ActionEvent(msg.sender, actionType);
  }

  function set(uint x) {
    example = Account(msg.sender, x);
  }

  function getBalance() constant returns (uint retVal) {
      registerActionEvent("getBalance");
      return example.balance;
  }

  function getOwner() constant returns (address retVal) {
    return example.owner;
  }

  function destroy() onlyOwner {
      selfdestruct(example.owner);
  }

}
