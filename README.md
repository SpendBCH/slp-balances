# slp-balances
Returns the address and balance for all holders of a given token

## Installation
npm install slp-balances

## Usage
### getBalances(bitdbApiKey, tokenId)
Returns array of objects containing an address and amount property

```javascript
const slpBalances = require('slp-balances')

async function main() {
  const bitdbApiKey = 'your_bitdb_api_key'
  const tokenId = 'd7c32d972a21b664f60b5fc422900179d8883dec7bd61418434aa12b09b99c12'

  const balances = await slpBalances.getBalances(bitdbApiKey, tokenId)
  console.log(balances)

  // [
  //   {
  //     address: "bitcoincash:qrxqcmh8ryux52s9uudgs6n2vqlxva2n9c0ygmxtr9",
  //     amount: "1.25"
  //   },
  //   {
  //     address: "bitcoincash:qpj6mrzrygelddyzp978cz379g68ywks9ug7xcpf4s",
  //     amount: "82.75"
  //   },
  //   {
  //     address: "bitcoincash:qq44hua5vzwllg3z0v2v47zqa4d86yqmasl7delpn0",
  //     amount: "6"
  //   },
  //   {
  //     address: "bitcoincash:qpau56wwgyetef54wlxlfdkaqr87kh05mvfqghkz7y",
  //     amount: "2"
  //   },
  //   {
  //     address: "bitcoincash:qrv9s50hk4q8pfhj82mfkuev22f2z5emsgyat52pzq",
  //     amount: "1.5"
  //   },
  //   {
  //     address: "bitcoincash:qqn4tcdqvaz6frepnrymcu4zv34w5kke2ye6txu4rp",
  //     amount: "6.5"
  //   }
  // ]
}

main()
```