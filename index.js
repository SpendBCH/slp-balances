const axios = require('axios')
const BigNumber = require('bignumber.js')

async function main() {
  const bitdbApiKey = 'set_your_key'
  const tokenId = '00ea27261196a411776f81029c0ebe34362936b4a9847deb1f7a40a02b3a1476'
  const outputs = await getAllOutputs(bitdbApiKey, tokenId)
  console.log(outputs)
}

async function getAllOutputs(bitdbApiKey, tokenId) {
  try {
    var query = {
      "v": 3,
      "q": {
        "find": { 
          "out.h1": "534c5000",
          $or: [
            {
              $and: [ 
                { 
                  $or: [ 
                    { "out.s3": "MINT" }, 
                    { "out.s3": "SEND" } 
                  ], 
                  "out.h4": tokenId 
                }
              ]
            },
            {
              "tx.h": tokenId
            }
          ]
        },
        "limit": 1000
      }
    }
    
    var s = JSON.stringify(query);
    var b64 = Buffer.from(s).toString('base64');
    var url = "https://bitdb.network/q/" + b64;
    var header = {
      headers: { key: bitdbApiKey }
    }

    const tokenTxRes = await axios.get(url, header)
    const tokenTxs = tokenTxRes.data.c
    if (tokenTxRes.data.u && tokenTxRes.data.u.length) {
      tokenTxs.concat(tokenTxRes.u)
    }

    const outputs = parseSlpOutputs(tokenId, tokenTxs)

    return outputs
  } catch (err) {
    console.log(err)
    return []
  }
}

function parseSlpOutputs(tokenId, txs) {
  const genesisTx = txs.filter(tx => tx.tx.h === tokenId)[0]
  const decimals = parseGenesisDecimals(genesisTx)
  const genesisOutput = parseGenesisOutput(genesisTx, decimals)

  const mintTxs = txs.filter(tx => tx.tx.h !== tokenId && tx.out[0].s3 === 'MINT')
  const mintOutputs = mintTxs.map(tx => parseMintOutput(tx, decimals))

  const sendTxs = txs.filter(tx => tx.tx.h !== tokenId && tx.out[0].s3 === 'SEND')
  const sendOutputArrays = sendTxs.map(tx => parseSendOutputs(tx, decimals))
  const sendOutputs = [].concat(...sendOutputArrays)

  const outputs = [genesisOutput].concat(mintOutputs, sendOutputs)

  return outputs
}

function parseGenesisDecimals(tx) {
  const opReturn = tx.out[0]
  const decimals = parseInt(opReturn.h8, 16) || 0
  return decimals
}

function parseAmount(amountHex, decimals) {
  let amount = new BigNumber(amountHex, 16)
  amount = decimals ? amount.div(10 ** decimals) : amount
  return amount.toString()
}

function parseGenesisOutput(tx, decimals) {
  const opReturn = tx.out[0]
  const amount = opReturn.h10
  const address = tx.out[1].e.a
  
  const output = {
    txid: tx.tx.h,
    vout: 1,
    amount: parseAmount(amount, decimals),
    address: address
  }

  return output
}

function parseMintOutput(tx, decimals) {
  const opReturn = tx.out[0]
  const amount = opReturn.h6
  const address = tx.out[1].e.a
  
  const output = {
    txid: tx.tx.h,
    vout: 1,
    amount: parseAmount(amount, decimals),
    address: address
  }

  return output
}

function parseSendOutputs(tx, decimals) {
  const outputs = []

  try {
    const opReturn = tx.out[0]
    for (var i = 5; i < 20; i++) {
      const amount = opReturn[`h${i}`]
      if (typeof amount === 'undefined' || amount === null) break

      const address = tx.out[i-4].e.a
      const output = {
        txid: tx.tx.h,
        vout: i-4,
        amount: parseAmount(amount, decimals),
        address: address
      }

      outputs.push(output)
    }
  } catch(err) {
    console.log(err)
  }

  return outputs
}

main()