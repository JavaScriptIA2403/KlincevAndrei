/**
 * Базовый класс для предметов.
 */
export class Item {
    /** @type {string} */
    id;
    /** @type {string} */
    name;
    /** @type {string} */
    category;
    /** @type {string} */
    rarity;
    /** @type {string} */
    description;

    /**
     * @param {string} id - Уникальный идентификатор.
     * @param {string} name - Название предмета.
     * @param {string} category - Категория.
     * @param {string} rarity - Редкость.
     * @param {string} description - Описание.
     */
    constructor(id, name, category, rarity, description){
        this.id = id;
        this.name = name;
        this.category = category;
        this.rarity = rarity;
        this.description = description;
    }

    /**
     * Возвращает информацию о предмете.
     * @returns {string}
     */
    getInfo() {
        return `ID ${this.id}\tName ${this.name}\tCategory ${this.category}\tRarity ${this.rarity}\tDescription ${this.description}`;
    }
}

/**
 * Класс оружия, наследующий от Item.
 */
export class Weapon extends Item {
    /** @type {string|number} */
    damage;

    /**
     * @param {string} id
     * @param {string} name
     * @param {string} category
     * @param {string} rarity
     * @param {string} description
     * @param {string|number} damage - Урон.
     */
    constructor(id, name, category, rarity, description, damage){
        super(id, name, category, rarity, description);
        this.damage = damage;
    }

    /**
     * Симулирует атаку оружием.
     * @returns {string}
     */
    attack(){
        return `Оружие ${this.name} ${this.damage} урона!`;
    }
}
