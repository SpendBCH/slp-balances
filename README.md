# slp-balances

Returns the address and balance for all holders of a given token

## Installation
```sh
npm install slp-balances
```

## Usage

### getBalances(bitdbApiKey, tokenId)

Returns array of objects containing an address and amount property

```javascript
const slpBalances = require("slp-balances")

async function main() {
  const bitdbApiKey = "your_bitdb_api_key"
  const tokenId =
    "d7c32d972a21b664f60b5fc422900179d8883dec7bd61418434aa12b09b99c12"

  const balances = await slpBalances.getBalances(bitdbApiKey, tokenId)
  console.log(balances)
  // [
  //   {
  //     cashAddress: "bitcoincash:qrxqcmh8ryux52s9uudgs6n2vqlxva2n9c0ygmxtr9",
  //     slpAddress: "simpleledger:qrxqcmh8ryux52s9uudgs6n2vqlxva2n9crlrqntam",
  //     legacyAddress: "1Kbuk1UjWWisaQ8YqyXgfgKAjcYJ2djRGw",
  //     balance: "1.25"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qpj6mrzrygelddyzp978cz379g68ywks9ug7xcpf4s",
  //     slpAddress: "simpleledger:qpj6mrzrygelddyzp978cz379g68ywks9uy9dr5ftw",
  //     legacyAddress: "1AGd9hGgiBKD7KrXaVb1E3T6vz2EGNCByn",
  //     balance: "82.75"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qq44hua5vzwllg3z0v2v47zqa4d86yqmasl7delpn0",
  //     slpAddress: "simpleledger:qq44hua5vzwllg3z0v2v47zqa4d86yqmasn9xz2pd3",
  //     legacyAddress: "14xGDBerF92TY8hVWhYcf26hP9Cdf6LVCK",
  //     balance: "6"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qpau56wwgyetef54wlxlfdkaqr87kh05mvfqghkz7y",
  //     slpAddress: "simpleledger:qpau56wwgyetef54wlxlfdkaqr87kh05mv9mrvrzq6",
  //     legacyAddress: "1CHYbX3dMNmzh8jLQU2Sj18B2j1V6CgFVX",
  //     balance: "2"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qrv9s50hk4q8pfhj82mfkuev22f2z5emsgyat52pzq",
  //     slpAddress: "simpleledger:qrv9s50hk4q8pfhj82mfkuev22f2z5emsggxq0lpu7",
  //     legacyAddress: "1Livm2i9hpTpd5nHrFix3LyW4JTGEC4s27",
  //     balance: "1.5"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qqn4tcdqvaz6frepnrymcu4zv34w5kke2ye6txu4rp",
  //     slpAddress: "simpleledger:qqn4tcdqvaz6frepnrymcu4zv34w5kke2y4pqaf4al",
  //     legacyAddress: "14azEd6xTYVvFbsz6ZqTyDu66QaEA1Vu9m",
  //     balance: "6"
  //   },
  //   {
  //     cashAddress: "bitcoincash:qqn4tcdqvaz6frepnrymcu4zv34w5kke2ye6txu4rp",
  //     slpAddress: "simpleledger:qqn4tcdqvaz6frepnrymcu4zv34w5kke2y4pqaf4al",
  //     legacyAddress: "14azEd6xTYVvFbsz6ZqTyDu66QaEA1Vu9m",
  //     balance: "0.5"
  //   }
  // ]
}

main()
```
