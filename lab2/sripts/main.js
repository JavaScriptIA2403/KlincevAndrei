import transactions from "./transactions.js";
import {checkTransExist, 
        getUniqueTransactionTypes, 
        calculateTotalAmount, 
        calculateTotalAmountByDate, 
        getTransactionByType, 
        getTransactionsInDateRange, 
        getTransactionsByMerchant, 
        calculateAverageTransactionAmount, 
        getTransactionsByAmountRange, 
        calculateTotalDebitAmount, 
        findMostTransactionsMonth, 
        findMostDebitTransactionMonth, 
        mostTransactionTypes, 
        getTransactionsBeforeDate, 
        indTransactionById, 
        mapTransactionDescriptions} from "/sripts/functions.js";

function holiMenu(){
    let flag=true;
    if (checkTransExist(transactions)){  
        while (flag){
            console.log("Выбранное значение меню:");
            let chousedFunk = Number(prompt("Выберите функцию которую хотели бы обрабоать"));
            console.log(chousedFunk);
            switch (chousedFunk){
                case 1:
                    console.log(`Массив уникальных типов транзакций:`);
                    console.log(getUniqueTransactionTypes(transactions));
                    break;
                case 2:
                    console.log("Сумма всех транзакций");
                    console.log(calculateTotalAmount(transactions));
                    break;
                case 3:
                    console.log("Сумма транзакций за год/месяц/день");
                    console.log(calculateTotalAmountByDate(transactions, "2019", "01", "22"));
                    break;
                case 4:
                    console.log(`Список транзакций указаного типа:`);
                    console.log(getTransactionByType(transactions, "debit"));
                    break;
                case 5:
                    console.log(`Список транзакций в период времени: `);
                    console.log(getTransactionsInDateRange(transactions,"2019-01-01","2019-04-06"));
                    break;
                case 6:
                    console.log(`Массив транзакций с указаным merchantName: `);
                    console.log(getTransactionsByMerchant(transactions, "PizzaRestaurantXYZ"));
                    break;
                case 7:
                    console.log("Среднее значение всех транзакций:");
                    calculateAverageTransactionAmount(transactions)
                    break;
                case 8:
                    console.log(`Массив транзакций в диапозоне: `);
                    console.log(getTransactionsByAmountRange(transactions, 10, 25));
                    break;
                case 9:
                    console.log(`Общчая сумма транзакций типа "debit":`);
                    console.log(calculateTotalDebitAmount(transactions));
                    break;
                case 10:
                    console.log("Месяц с наибольшим количестовм транзакций (его индекс):");
                    console.log(findMostTransactionsMonth(transactions));
                    break;
                case 11:
                    console.log("Месяц с наибольшим количестовм ДЕБИТОВЫХ транзакций (его индекс):")
                    console.log(findMostDebitTransactionMonth(transactions));
                    break;
                case 12:
                    console.log("Транзакций какого типа больше: ");
                    console.log(mostTransactionTypes(transactions));
                    break;
                case 13:
                    console.log("Массив транзакций совершённых до указанной даты:")
                    console.log(getTransactionsBeforeDate(transactions, "2019-01-02"));
                    break;
                case 14:
                    console.log("Возвращает транзакцию по ID");
                    console.log(indTransactionById(transactions, "5"))
                    break;
                case 15:
                    console.log("Массив описаний:");
                    console.log(mapTransactionDescriptions(transactions))
                    break;
                default:
                    alert("Упси дупси, что-то пошло не так");
                    flag=!flag;
            }
        }
    }
}

holiMenu()