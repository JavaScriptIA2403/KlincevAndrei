/**
 * Главный скрипт управления интерфейсом инвентаря.
 * Настраивает обработчики событий и логику отображения панели.
 */

import * as item from './classes.js'
import * as inventory from './inventroy.js'
import { writeFromFormItem, clearAddingForm } from './ui.js';

let iventTable = document.querySelector('#inventroryTable');
let paragraphFeeld = document.querySelector('#itemDiscription');
let panelToAddActive = false;

// Кнопка добавления предмета
let addButton = document.querySelector("#submitFormAdding");
addButton.addEventListener('click', () => {
    writeFromFormItem();
    if (panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        document.querySelector('#damageField').style.visibility = "hidden";
        panelToAddActive = false;
    }
});

// Отображение поля урона, если выбрана категория "weapon"
document.getElementById('itemCategory').addEventListener('change', function () {
    const damageField = document.getElementById('damageField');
    damageField.style.visibility = this.value === 'weapon' ? 'visible' : 'hidden';
});

// Очистка формы по кнопке
document.querySelector("#clearFormAdding").addEventListener('click', () => {
    clearAddingForm();
    if (panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "hidden";
        document.querySelector('#damageField').style.visibility = "hidden";
        panelToAddActive = false;
    }
});

// Показать панель добавления
document.querySelector("#addNewItem").addEventListener('click', () => {
    if (!panelToAddActive) {
        document.querySelector('#inputNewItemBlock').style.visibility = "visible";
        panelToAddActive = true;
    }
});

// Отображение описания предмета при наведении
inventroryTable.addEventListener('mouseover', (event) => {
    let row = event.target.closest('tr');
    if (row.rowIndex !== 0 && row.rowIndex !== inventroryTable.rows.length - 1) {
        row.style.outline = "3px solid rgb(0, 0, 0)";
        let itemIndex = row.rowIndex - 1;
        paragraphFeeld.textContent = inventory.inventory[itemIndex].description;
        paragraphFeeld.style.visibility = "visible";
    }
});

// Скрытие описания при уходе мыши
inventroryTable.addEventListener('mouseout', (event) => {
    let row = event.target.closest('tr');
    if (row.rowIndex !== 0 && row.rowIndex !== inventroryTable.rows.length - 1) {
        row.style.outline = "";
        paragraphFeeld.textContent = '';
        paragraphFeeld.style.visibility = "hidden";
    }
});

// Удаление предмета из таблицы и массива
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
