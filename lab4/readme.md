# Лабораторная работа №4

## Работа с DOM-деревом и событиями в JavaScript

**Вариант 2**

---

## Цель работы

Изучение взаимодействия с DOM-элементами, динамического создания и удаления HTML-элементов, обработки событий (`onClick`, `onHover`), а также реализация делегирования событий в JavaScript.

---

## Ход работы

### Структура проекта

```
/project-root
│
├── index.html
├── style.css
└── /src
    ├── index.js
    ├── classes.js
    ├── inventory.js
    ├── ui.js
    └── utils.js
```

---

### Классы

#### `classes.js`

```js
/**
 * Базовый класс для предметов.
 */
export class Item {
    id;
    name;
    category;
    rarity;
    description;

    constructor(id, name, category, rarity, description){
        this.id = id;
        this.name = name;
        this.category = category;
        this.rarity = rarity;
        this.description = description;
    }

    getInfo() {
        return `ID ${this.id}\tName ${this.name}\tCategory ${this.category}\tRarity ${this.rarity}\tDescription ${this.description}`;
    }
}

/**
 * Класс оружия, наследующий от Item.
 */
export class Weapon extends Item {
    damage;

    constructor(id, name, category, rarity, description, damage){
        super(id, name, category, rarity, description);
        this.damage = damage;
    }

    attack(){
        return `Оружие ${this.name} ${this.damage} урона!`;
    }
}
```

---

### 🧠 Логика работы интерфейса

#### `index.js`

```js
import * as item from './classes.js'
import * as inventory from './inventroy.js'
import { writeFromFormItem, clearAddingForm } from './ui.js';

let iventTable = document.querySelector('#inventroryTable');
let paragraphFeeld = document.querySelector('#itemDiscription');
let panelToAddActive = false;

// Кнопка добавления
document.querySelector("#submitFormAdding").addEventListener('click', () => {
    writeFromFormItem();
    if (panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        document.querySelector('#damageField').style.visibility = "hidden";
        panelToAddActive = false;
    }
});

// Отображение поля урона
document.getElementById('itemCategory').addEventListener('change', function () {
    const damageField = document.getElementById('damageField');
    damageField.style.visibility = this.value === 'weapon' ? 'visible' : 'hidden';
});

// Очистка формы
document.querySelector("#clearFormAdding").addEventListener('click', () => {
    clearAddingForm();
    if (panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        document.querySelector('#damageField').style.visibility = "hidden";
        panelToAddActive = false;
    }
});

// Показать форму
document.querySelector("#addNewItem").addEventListener('click', () => {
    if (!panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "visible";
        panelToAddActive = true;
    }
});

// Наведение на строку таблицы
inventroryTable.addEventListener('mouseover', (event) => {
    let row = event.target.closest('tr');
    if (row.rowIndex !== 0 && row.rowIndex !== inventroryTable.rows.length - 1) {
        row.style.outline = "3px solid rgb(0, 0, 0)";
        let itemIndex = row.rowIndex - 1;
        paragraphFeeld.textContent = inventory.inventory[itemIndex].description;
        paragraphFeeld.style.visibility = "visible";
    }
});

// Уход курсора
inventroryTable.addEventListener('mouseout', (event) => {
    let row = event.target.closest('tr');
    if (row.rowIndex !== 0 && row.rowIndex !== inventroryTable.rows.length - 1) {
        row.style.outline = "";
        paragraphFeeld.textContent = '';
        paragraphFeeld.style.visibility = "hidden";
    }
});

// Удаление
inventroryTable.addEventListener('click', (event) => {
    const cell = event.target.closest('.delleteOfCell');
    if (cell) {
        let row = cell.closest('tr');
        let itemIndexTodell = row.rowIndex - 1;
        inventory.inventory.splice(itemIndexTodell, 1);
        paragraphFeeld.textContent = '';
        paragraphFeeld.style.visibility = "hidden";
        row.remove();
    }
});
```

---

### Работа с инвентарём

#### `inventory.js`

```js
export let inventory = new Array();

export function addItemToInventory(item){
    inventory.push(item);
}

export function removeItemFromInventoryById(fid){
    inventory.splice(inventory.findIndex(item => item.id == fid), 1);
}

export function getItemCount(){
    return inventory.length;
}
```

---

### Работа с UI

#### `ui.js`

```js
import * as item from './classes.js'
import * as inventory from './inventroy.js'
import { randomingID } from './utils.js'

export function clearAddingForm(){
    feeldsToAdd.forEach(item => item.value = '');
}

export function writeFromFormItem(){
    if (feeldsToAdd[4].style.visibility == "hidden") {
        inventory.inventory.push(
            new item.Item(
                randomingID(),
                feeldsToAdd[0].value,
                feeldsToAdd[1].value,
                feeldsToAdd[2].value,
                feeldsToAdd[3].value
            )
        );
    } else {
        inventory.inventory.push(
            new item.Weapon(
                randomingID(),
                feeldsToAdd[0].value,
                feeldsToAdd[1].value,
                feeldsToAdd[2].value,
                feeldsToAdd[3].value,
                feeldsToAdd[4].value
            )
        );
    }

    clearAddingForm();

    while (table.rows.length > 2) {
        table.deleteRow(1);
    }

    inventory.inventory.forEach((item, index) => {
        let row = table.insertRow(1 + index);

        for (let i = 1; i < 5; i++) {
            let cell = row.insertCell();
            cell.textContent = i === 4
                ? (item.category !== "weapon" ? "---" : item.damage)
                : Object.values(item)[i];
        }

        let delCell = row.insertCell();
        delCell.className = "delleteOfCell";
        delCell.textContent = 'Удалить';
        delCell.style.textAlign = "center";

        if (item.rarity === 'legendary') {
            row.style.backgroundColor = "yellow";
        }
    });
}

let table = document.querySelector("#inventroryTable");
let feeldsToAdd = [
    document.getElementById("itemName"),
    document.getElementById("itemCategory"),
    document.getElementById("itemRarity"),
    document.getElementById("itemDescription"),
    document.getElementById("itemDamage")
];
```

---

### 🔧 Вспомогательные функции

#### `utils.js`

```js
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function randomingID(){
    return String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9));
}
```

---

### HTML-интерфейс

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Inventory</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <table id="inventroryTable">
        <tr>
            <th>Название предмета</th>
            <th>Категория</th>
            <th>Редкость</th>
            <th>Урон</th>
            <th>Удаление</th>
        </tr>
        <tr>
            <td id="addNewItem" colspan="5">+</td>
        </tr>
    </table>

    <p id="itemDiscription"></p>

    <div id="inputNewItemBlock" style="visibility: hidden;">
        <h2>Добавить предмет</h2>
        <form id="item-form">
            <table>
                <tr>
                    <td>Название:</td>
                    <td><input type="text" id="itemName" required /></td>
                </tr>
                <tr>
                    <td>Описание:</td>
                    <td><textarea id="itemDescription" required></textarea></td>
                </tr>
                <tr>
                    <td>Категория:</td>
                    <td>
                        <select id="itemCategory" required>
                            <option value="">----</option>
                            <option value="armor">Броня</option>
                            <option value="weapon">Оружие</option>
                            <option value="potion">Зелье</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Редкость:</td>
                    <td>
                        <select id="itemRarity" required>
                            <option value="">----</option>
                            <option value="common">Обычный</option>
                            <option value="uncommon">Необычный</option>
                            <option value="rare">Редкий</option>
                            <option value="legendary">Легендарный</option>
                        </select>
                    </td>
                </tr>
                <tr id="damageField" style="visibility: hidden;">
                    <td>Урон:</td>
                    <td><input type="number" id="itemDamage" min="1" /></td>
                </tr>
            </table>
        </form>
        <div id="addButtonsBlock">
            <button type="submit" id="submitFormAdding">Добавить</button>
            <button type="button" id="clearFormAdding">Отмена</button>
        </div>
    </div>

    <p id="totalInventoryItems"></p>

    <script src="src/index.js" type="module"></script>
    <script src="src/utils.js" type="module"></script>
</body>
</html>
```

---

### 🎨 Стилизация

#### `style.css`

```css
#inventroryTable {
    background-color: gray;
    margin: auto;
    width: 85%;
    border-spacing: 2px;
}

th {
    background-color: darkgray;
    width: 20%;
}

#inventroryTable tr {
    padding: 10px;
    background-color: rgb(187, 187, 187);
}

#inventroryTable td {
    text-align: center;
}

#addNewItem {
    background-color: rgb(150, 150, 150);
    text-align: center;
}

#addNewItem:hover {
    background-color: rgb(173, 173, 173);
}

#inputNewItemBlock {
    width: 25%;
    margin: auto;
    border: 2px solid black;
}
```

---

## Контрольные вопросы

1. **Как получить доступ к элементу?**
   Через `document.querySelector`, `getElementById`, `getElementsByClassName`, `querySelectorAll` и др.

2. **Что такое делегирование событий?**
   Назначение одного обработчика на родительский элемент, который реагирует на события от дочерних элементов с помощью `event.target`.

3. **Как изменить содержимое DOM-элемента?**
   Используя свойства `textContent`, `innerHTML`, `value` и методы вроде `appendChild`, `removeChild`.

4. **Как добавить элемент в DOM-дерево?**
   С помощью `createElement`, `appendChild`, `insertBefore` и других методов DOM API.

---

Если хочешь — могу дополнительно сгенерировать PDF-отчёт или оформить обложку.
