const express = require("express");
const app = express();
app.use(express.json());


// this algorithm can be worked on to capture both speed and space complexity [BigO notation]
// but i considered only speed and not space complexity


//initialize empty arrays
let arrHolde = []
let arrSingleHolder = [];

const findValues = (stockType, amount, quantity, splitId) => {

    //initialize an object for collecting key-value pairs
    let objCollector = {};

    //define a balance variable which receives an amount
    let balance = Number(amount);

    //using switch statement to evaluate each stock type
    switch (stockType) {
        case "Tesla Inc":

            //we use tenary operator to if we have any value stored in arrHolde else we use the amount received from payload
            balance = (arrHolde.length != 0) ? balance = arrHolde[arrHolde.length - 1] : balance = Number(amount);

            // calculating value of stock according to Tesla
            let v = (balance - Number(quantity));

            //setting key value pairs in the objcollector
            objCollector["Amount"] = Number(quantity);
            objCollector["StockIndexId"] = splitId;

            arrHolde.push(v) //push the value of Tesla stock to arrHolde
            arrSingleHolder.push(quantity) //push a single Tesla stock quantity

            break;


        case "ETH":

            //we use tenary operator to if we have any value stored in arrHolde else we use the amount received from payload
            balance = (arrHolde.length != 0) ? balance = arrHolde[arrHolde.length - 1] : balance = Number(amount);

            // calculating value of stock according to ETH
            let ethValue = Math.floor(((Number(balance) * quantity) / 100));

            //re-setting the amount in the objCollector with a current value
            objCollector["Amount"] = ethValue;
            objCollector["StockIndexId"] = splitId;

            let sbalance = Number(amount) - ethValue;

            arrHolde.push(sbalance)
            arrSingleHolder.push(ethValue)

            break;

        case "BTC":
            balance = (arrHolde.length != 0) ? balance = arrHolde[arrHolde.length - 1] : balance = Number(amount);

            // calculating value of stock according to  BTC
            let btcValue = Math.floor((balance) / quantity);

            objCollector["Amount"] = btcValue;
            objCollector["StockIndexId"] = splitId;

            let balancer = balance - btcValue;

            arrHolde.push(balancer);
            arrSingleHolder.push(btcValue);

            break;

        default:
            return {}

            console.log(amount, arrHolde)
    }

    return objCollector;

}


// Api end-point for computing stock
app.post('/stock/compute', (req, res) => {

    //we retrieve our payload from request body
    let jsonBody = req.body;
    let amount = jsonBody.Amount;
    let stockInfo = jsonBody.StockInfo;
    let customerEmail = jsonBody.CustomerEmail;
    let id = jsonBody.ID;
    let currency = jsonBody.Currency;


    //we initialize an empty splitArray
    let splitArray = [];

    //we loop through each individual stocks in the stock array
    for (const i in stockInfo) {
        splitArray.push(findValues(stockInfo[i].StockType, amount, stockInfo[i].Quantity, stockInfo[i].StockIndexId));
    }


    //define a new function to help manage the balance of stock
    const manageBalance = () => {

        let collectBalance = 0;

        for (const i in arrSingleHolder) {
            collectBalance += arrSingleHolder[i];

        }

        return amount - collectBalance;

    }

    console.log(arrHolde)

    res.status(200).json({ "ID": id, "EquiValue": manageBalance(), "StockBreakdown": splitArray })



})



app.listen(5000, () => console.log("app listening on port 5000"));