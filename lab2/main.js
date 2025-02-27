import transactions from "./transactions.js";

function getUniqueTransactionTypes(trans){
    //let unuqueTransTypesArr=new Set();
    
    //unuqueTransTypesArr.add(trans[0].filter(t => t.transaction_type => ));

    let outTrans=new Set();
    for (let i = 0; i < trans[0].length; i++){
                
            outTrans.add(trans[0][i].transaction_type);
        
    }

    return Array(outTrans);
}

function calculateTotalAmount(trans){
    /*
    let sum=0;
    
    for (let i = 0; i<trans[0].length; i++)
    {
       sum += trans[0][i].transaction_amount;
    }
*/
    let sum=trans[0].reduce((sum, curT) => sum+curT.transaction_amount, 0 );

    return sum;
}


//Пределать, ибо функция должна проходить по году месяцу и дню
function calculateTotalAmountByDate(trans, year="", month="", day="")
{
    let sum=0;
    let flag=false;
    for (let i = 0; i < trans[0].length; i++){
            if (trans[0][i].transaction_date.slice(0,4) == year && trans[0][i].transaction_date.slice(5,7) == month && trans[0][i].transaction_date.slice(8,10) == day)
            { 
                sum += trans[0][i].transaction_amount;
                flag=true;
            }
        }
    if (flag){
        return sum;
    }
    else{
        console.log("За эту дату не было произведенено ни одной транзакции");
    }
}

function getTransactionByType(trans, type){
    let outTrans=[];
    for (let i = 0; i < trans[0].length; i++){

        if (trans[0][i].transaction_type === type){
            outTrans.push(trans[0][i]);
        }
    }
    return outTrans;
}

function getTransactionsInDateRange(trans, startDate, endDate){
    /*
    let outTrans=[];
    for (let i = 0; i < trans[0].length; i++){
        if (Date.parse(trans[0][i].transaction_date)>=Date.parse(startDate) && Date.parse(trans[0][i].transaction_date)<=Date.parse(endDate))
        {
            outTrans.push(trans[0][i]);
        }
    }
    */
    let outTrans = trans[0].filter(t => Date.parse(t.transaction_date)>=Date.parse(startDate) &&
                                    Date.parse(t.transaction_date)<=Date.parse(endDate));
    return outTrans;
}

function getTransactionsByMerchant(trans, merchantName){
    let outTrans=[];
    console.log(outTrans);
    for (let i = 0; i<trans[0].length; i++){
       if(trans[0][i].merchant_name==merchantName)
       {
        outTrans.push(trans[0][i]);
       }
    }
    
    if (outTrans.length=0)
    {
        console.log("Нет транзакиций с указаном именеим")
    }
    else{
        return outTrans;
    }
}

function calculateAverageTransactionAmount(trans){
    let sum=0;
    for (let i = 0; i<trans[0].length; i++)
    {
       sum += trans[0][i].transaction_amount;
    }
    return sum/trans[0].length;
}

function getTransactionsByAmountRange(trans, startSumm, endSumm){
    /*
    let outTrans=[];
    for (let i = 0; i < trans[0].length; i++){
        if (trans[0][i].transaction_amount>=startSumm && trans[0][i].transaction_amount<=endSumm)
        {
            outTrans.push(trans[0][i]);
        }
    }
    */

    let outTrans=trans[0].filter(t => t.transaction_amount>=startSumm &&
                                    t.transaction_amount<=endSumm)
    return outTrans;
}





console.log(typeof transactions[0][0].transaction_id);
console.log(calculateTotalAmount(transactions));

let a ="";


//console.log(calculateTotalAmountByDate(transactions, "2019", "01"));

console.log(getTransactionByType(transactions, "debit"));
console.log("Вывод транзакций в предеелах времени");
console.log(getTransactionsInDateRange(transactions,"2019-01-01","2019-04-06"));
console.log(getTransactionsByMerchant(transactions, "PizzaRestaurantXYZ"));

console.log(calculateAverageTransactionAmount(transactions));

console.log(getTransactionsByAmountRange(transactions, 10, 25));


console.log(getUniqueTransactionTypes(transactions));
