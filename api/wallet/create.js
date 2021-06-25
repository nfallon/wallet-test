
    var Wallet = require('ethereumjs-wallet');

    module.exports = () => (req, res) => {
      const ethWallet = Wallet.default.generate();
      const wallet = {
        pk: ethWallet.getAddressString(),
        sk: ethWallet.getPrivateKeyString()
      }
      res.json(wallet);
  };
