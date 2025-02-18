//Task 1
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");


//Task 2
let name="Винсент Сколетто";
let birthDay=28;
let isStudent=true;

let score = prompt("Введите ваш балл:");
if (score >= 90) {
  console.log("Отлично!");
} else if (score >= 70) {
  console.log("Хорошо");
} else {
  console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
  console.log(`Итерация: ${i}`);
}