# Wallet Function (API)
The function required for this **wallet** task can be simply understood by building a simple Api algorithm which mimicks a real-world **wallet**
containing stocks whose values can be computed using exchange rates.The algorithm we used for  building the  **wallet** function can be worked on to capture both speed and space complexity [BigO notation].

## Technologies used
This wallet function is built with vanilla  javascript and an express server making up a simple API with one endpoint:
```js
app.post('/stock/compute')
```

##   Stock Split Rate Exchange Rules
The Stock Breakdown is computed using the following rate exchange rules/assumptions :
*  The user receives a certain amount from the company for trading.    With this amount he can add stocks to his wallet. The value of this wallet can be calculated to know the equivalent value of stocks after trading based on stocktypes and quantity.

 * Each split calculation is based on the Balance after the previous calculation's done. At the beginning of the stock-split calculation, the Balance is the  same as the transaction Amount(amount the company gives a user to trade and add stocks with). It then subsequently decreases by the value of the quantity computed for each item in the StockInfo array.

* There is a rule of precedence in the algorithm of our function.
     * Tesla Inc  stock types are computed before ETH OR BTC Stock-types
     * ETC  stock types are computed before BTC stock-types.
     * BTC  stock types are computed last.

* One other thing to note from the rate exchange is, the Balance in the wallet used to compute the split amount for all indexes with the BTC stock type is the same. This makes BTC computation different from the Tesla Inc and ETH stock types where the split amount is based on the previous balance in the wallet.

## Basic Constraints of Our algorithm

* The StockInfo array can contain a minimum of 1 split index and a maximum of 20 indexes.
* The sum of all split **Amount** values computed cannot be greater than the transaction **Amount**


## Rate Exchange of our Wallet Stocks in Details(TOP DOWN Approach)
```
Initial Balance:
Amount

Tesla Inc Stock types FIRST
split amount for quantity stockIndexId=TeslaAmount1
firstBalance = (Amount- TeslaAmount1)


split amount for quantity of next  Tesla stockIndexId =TeslaAmount2
secondBalance = (firstBalance - TeslaAmount2)


ETH Stock types COME NEXT
split amount for quantity of ETH stockIndexId= (quantity % OF secondBalance)=ETHAmount1
thirdBalance =  (secondBalance - ETHAmount)


Split amount for next  ETH stockIndexId = (quantity % OF thirdBalance)=ETHBalance2
fourthBalance = (thirdBalance - ETHBalance2)


FINALLY, BTC Stock TYPES
TOTAL BTC = quantity for a stockIndexId(quantity1) + quantity for next stockIndexId(quantity2)
BTC Balance = fourthBalance

split amount for BTC quantity of  a stockIndexId =  ((quantity1/TOTAL BTC) * BTC Balance
fifthBalance = (BTC Balance - split amount for BTC quantity of a stockIndexId)


split amount for quantity of next stockIndexId = ((quantity2/TOTAL BTC) * fifthBalance)
finalBalance = (fifthBalance- split amount for quantity for next stockIndexId)


Final Balance=Equivalent value of Stock
```
## Sample payloads when adding stock types and quantities to our wallet

### payload1
 ```json
{
    "ID": 13092,
    "Amount": 4500,
    "Currency": "USD($)",
    "CustomerEmail": "uconvert@coders.io",
    "StockInfo": [
        {
            "StockType": "Tesla Inc",
            "Quantity": 450,
            "StockIndexId": "TESACC0019"
        },
        {
            "StockType": "ETH",
            "Quantity": 3,
            "StockIndexId": "ETHACC0011"
        },
        {
            "StockType": "BTC",
            "Quantity": 3,
            "StockIndexId": "BTCACC0015"
        },
        {
            "StockType": "ETH",
            "Quantity": 2,
            "StockIndexId": "ETHACC0016"
        },
        {
            "StockType": "Tesla Inc",
            "Quantity": 2450,
            "StockIndexId": "TESACC0029"
        },
        {
            "StockType": "BTC",
            "Quantity": 10,
            "StockIndexId": "BTCACC0215"
        }
    ]
}
```

### payload2
```json
{
    "ID": 1308,
    "Amount": 12580,
    "Currency": "Euro(£)",
    "CustomerEmail": "uconvert9@coders.io",
    "StockInfo": [
        {
            "StockType": "Tesla Inc",
            "Quantity": 45,
            "StockIndexId": "TESACC0019"
        },
        {
            "StockType": "ETH",
            "Quantity": 3,
            "StockIndexId": "ETHACC0011"
        },
        {
            "StockType": "BTC",
            "Quantity": 3,
            "StockIndexId": "BTCACC0015"
        }
    ]
}
```

## Server
Our  express server runs on port 5000.Simple use __**npm install**__  to install dependencies and **__npm start__** to start the express server