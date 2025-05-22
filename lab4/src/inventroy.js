/**
 * Массив, представляющий инвентарь игрока.
 * @type {Array<Item|Weapon>}
 */
export let inventory = new Array();

/**
 * Добавляет предмет в инвентарь.
 * @param {Item|Weapon} item - Экземпляр предмета или оружия.
 */
export function addItemToInventory(item){
    inventory.push(item);
}

/**
 * Удаляет предмет из инвентаря по его ID.
 * @param {string} fid - Уникальный идентификатор предмета.
 */
export function removeItemFromInventoryById(fid){
    inventory.splice(inventory.findIndex(item => item.id == fid), 1);
}

/**
 * Возвращает количество предметов в инвентаре.
 * @returns {number} Количество предметов.
 */
export function getItemCount(){
    return inventory.length;
}
