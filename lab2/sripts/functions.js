/**
 * Возвращает массив уникальных типов транзакций
 * 
 * @param {trans} trans принимает массив транзакций 
 * @returns {trans} - типы транзакций  
 */
function getUniqueTransactionTypes(trans){
    //let unuqueTransTypesArr=new Set();
    
    //unuqueTransTypesArr.add(trans.filter(t => t.transaction_type => ));
    let outTrans=new Set();
    for (let i = 0; i < trans.length; i++){  
            outTrans.add(trans[i].transaction_type);
    }
    return Array.from(outTrans);
}
/**
 * Возвращает сумму всех компонентов приложенного списка транзакций 
 * 
 * @param {trans} trans - вводимый массив транзакций
 * @return {number}  сумма всех транзакций
 */
function calculateTotalAmount(trans){
    /*
    let sum=0;
    
    for (let i = 0; i<trans.length; i++)
    {
       sum += trans[i].transaction_amount;
    }
*/
    let sum=trans.reduce((sum, curT) => sum+curT.transaction_amount, 0 );
    return sum;
}


/**
 * Возвращает сумму транзакций за указанную дату
 * 
 * @param {trans} trans вводимый массив транзакций
 * @param {string} year год транзакций
 * @param {string} month месяц транзакции
 * @param {string} day день транзакции
 * @returns {number} возвращает сумму за указаннуые [trans, year, month, day]
 */
function calculateTotalAmountByDate(trans, year="", month="", day="")
{
        if (year !==""){
            const yearAmount = trans.filter(t => t.transaction_date.slice(0,4)==year);
            if (month !==""){
                const monthAmount = yearAmount.filter(t => t.transaction_date.slice(5,7)==month);
                if (day !=""){
                    const dayAmount = monthAmount.filter(t =>t.transaction_date.slice(8,10)==day);
                    return calculateTotalAmount(dayAmount);
                }
                return calculateTotalAmount(monthAmount);
            }
            return calculateTotalAmount(yearAmount);
        }
        return calculateTotalAmount(trans);
}
        
/**
 * Возвращает транзакции указанного типа
 * 
 * @param {trans} trans вводимый массив транзакций
 * @param {string} type тип транзакции "debit" или "credit" 
 * @returns {Array} возвращает список трнзакций по параметру type
 */
function getTransactionByType(trans, type){
    let outTrans=[];
    for (let i = 0; i < trans.length; i++){

        if (trans[i].transaction_type === type){
            outTrans.push(trans[i]);
        }
    }
    return outTrans;
}
/**
 * Возвращает транзакции в указанном промежутке времени
 * 
 * @param {trans} trans вводимый массив транзакций
 * @param {string} startDate начальная дата в формате "0000-00-00"
 * @param {string} endDate конечная дата в формате "0000-00-00"
 * @returns {Array} возвращает массив трнзакци осуществлённые в период между startDate и endDate
 */
function getTransactionsInDateRange(trans, startDate, endDate){
    /*
    let outTrans=[];
    for (let i = 0; i < trans.length; i++){
        if (Date.parse(trans[i].transaction_date)>=Date.parse(startDate) && Date.parse(trans[i].transaction_date)<=Date.parse(endDate))
        {
            outTrans.push(trans[i]);
        }
    }
    */
    let outTrans = trans.filter(t => Date.parse(t.transaction_date)>=Date.parse(startDate) &&
                                    Date.parse(t.transaction_date)<=Date.parse(endDate));

    return outTrans;
}

/**
 * Выводит массив транзакций с указанным merchantName
 * 
 * @param {trans} trans вводимый массив транзакций
 * @param {string} merchantName 
 * @returns {Array} возвращает массив транзакций с указанным merchantName
 */
function getTransactionsByMerchant(trans, merchantName){
    let outTrans=[];
    console.log(outTrans);
    for (let i = 0; i<trans.length; i++){
       if(trans[i].merchant_name == merchantName)
       {
        outTrans.push(trans[i]);
       }
    }
    
    if (outTrans.length==0)
    {
        console.log("Нет транзакиций с указаном именеим")
    }
    else{

        return outTrans;
    }
}
/**
 * Выводит среднюю цену всех транзакций
 * 
 * @param {trans} trans вводимый массив транзакций
 * @returns {number} среднее значение transaction_amount
 */
function calculateAverageTransactionAmount(trans){
    /*
    let sum=0;
    for (let i = 0; i<trans.length; i++)
    {
       sum += trans[i].transaction_amount;
    }
    console.log(`Средняя сумма всех транзакций: `)
    */
    return calculateTotalAmount(trans)/trans.length;
}

/**
 * Возвращает транзакции в указанных пределах суммы
 * 
 * @param {trans} trans  вводимый массив транзакций
 * @param {number} startAmount начальнаый предел цены
 * @param {number} endAmount конечный предел цены
 * @returns {Array} возвращает массив трнзакци c ценой между startAmount и endAmount
 */
function getTransactionsByAmountRange(trans, startAmount, endAmount){
    /*
    let outTrans=[];
    for (let i = 0; i < trans.length; i++){
        if (trans[i].transaction_amount>=startSumm && trans[i].transaction_amount<=endSumm)
        {
            outTrans.push(trans[i]);
        }
    }
    */

    let outTrans=trans.filter(t => t.transaction_amount>=startAmount &&
                                    t.transaction_amount<=endAmount);
    console.log(`Массив транзакций в диапозоне от ${startAmount} до ${endAmount}: `);
    return outTrans;
}

/**
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {number} возвращает сумму "debit" трнзакци
 */
function calculateTotalDebitAmount(trans){
    let outTrans= [];
    outTrans = getTransactionByType(trans,"debit");


    return calculateTotalAmount(outTrans);
}
/**
 * Находит индекс месяца (0-январь, 11-декабрь), с наибольщим числом транзакций
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {number} возвращает идекс месяца с наибольшим числом транзакций
 */
function findMostTransactionsMonth(trans){
    let maxMonth= new Array(12).fill(0);
    for (let i = 0; i<trans.length; i++){
        const date = new Date(trans[i].transaction_date);
        maxMonth[date.getMonth()]+=1;
    };
    return maxMonth.indexOf(maxMonth.reduce((max, num) => (num > max ? num : max), maxMonth[0]));
}
/**
 * Находит индекс месяца (0-январь, 11-декабрь), с наибольщим числом "debit" транзакций
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {number} возвращает месяц с наибольшим числом дебитовых транзакций
 */
function findMostDebitTransactionMonth(trans){
    let outTrans=[];
    outTrans=getTransactionByType(trans,"debit");
    return findMostTransactionsMonth(outTrans);

}
/**
 * Возвращает тип (название) транзакции, котрая чаще всего встречается
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {string} возвращает тип транзакции "debit", "credit","equal"
 */
function mostTransactionTypes(trans){
    const debList =getTransactionByType(trans, "debit");
    const credList =getTransactionByType(trans, "credit");
    if (debList>credList){
        return "debit";
    }
    else "credit";
    return "equal";
}

/**
 * Выводит массив транзакций до указанной даты
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @param {string} date дата придельной транзакции
 * @returns {trans} возвращает массив транзакций до указаной даты date
 */
function getTransactionsBeforeDate(trans, date){
    return getTransactionsInDateRange(trans, "0001-01-01", date)
}
/**
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @param {string} id уникальное значение транзакции
 * @returns {trans} возвращает транзакцию с указанным id
 */
function indTransactionById(trans, id){
    return trans.find(t =>t.transaction_id = id)
}
/**
 * Выводит массив транзакций
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {Array} выводит масив из transaction_description каждой транзакции
 */
function mapTransactionDescriptions(trans){
    let outTrans =[]
    trans.forEach(element => {
        outTrans.push(element.transaction_description);
    });
    return outTrans;
}
/**
 * Возвращает список значений 
 * 
 * @param {trans} trans вводимый массив транзакций 
 * @returns {boolean} возвращает true/false если в массиве есть или нет элементов
 */
function checkTransExist(trans){
    return trans.length>0 ? true :console.log(`Нельзя просто так взять и работать с пустым массивом`);
}

export {checkTransExist,getUniqueTransactionTypes, calculateTotalAmount, calculateTotalAmountByDate, getTransactionByType, getTransactionsInDateRange, getTransactionsByMerchant, calculateAverageTransactionAmount, getTransactionsByAmountRange, calculateTotalDebitAmount, findMostTransactionsMonth, findMostDebitTransactionMonth, mostTransactionTypes, getTransactionsBeforeDate, indTransactionById, mapTransactionDescriptions};