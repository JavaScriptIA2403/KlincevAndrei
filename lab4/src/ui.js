import * as item from './classes.js'
import * as inventory from './inventroy.js'
import { randomingID } from './utils.js'

/**
 * Очищает форму добавления предмета.
 */
export function clearAddingForm(){
    feeldsToAdd.forEach(item => item.value = '');
}

/**
 * Считывает данные из формы и добавляет предмет или оружие в инвентарь.
 * После добавления перерисовывает таблицу.
 */
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

    // Очистка таблицы
    while (table.rows.length > 2) {
        table.deleteRow(1);
    }

    // Перерисовка таблицы
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

// Вспомогательные DOM-переменные
let table = document.querySelector("#inventroryTable");
let feeldsToAdd = [
    document.getElementById("itemName"),
    document.getElementById("itemCategory"),
    document.getElementById("itemRarity"),
    document.getElementById("itemDescription"),
    document.getElementById("itemDamage")
];
