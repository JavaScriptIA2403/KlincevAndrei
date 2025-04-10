
class Item{
    name;
    weight;
    rarity;
    /**
     * Конструктор, для создания объекта
     * 
     * @param {*} itemName - имя предмета
     * @param {*} weight  - вес предмета
     * @param {*} rarity  - редкость предмета ("common", "uncommon", "rare", "legenadary")
     */
    constructor(itemName, weight, rarity){
        this.name = itemName;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает значения полей
     * 
     * @returns возвращает строку со значенимяи полей ${this.name}, ${this.weight}, ${this.rarity}
     */
    getInfo(){
        return `Предмет инвентаря: ${this.name}, ${this.weight}, ${this.rarity}`;
    }
    /**
     * устанавливает новое значение веса объекту
     * @param {*} newWeight - новое значение веса с десятичной точкой 
     */
    setWeight(newWeight){
        this.weight = newWeight;
    }

};

class Weapon extends Item{
    damage;
    durability;


    /**
     * Конструктор для создания оружия
     * 
     * @param {*} itemName - название оружия 
     * @param {*} weight - вес оружия 
     * @param {*} rarity - редскость оружия ("common", "uncommon", "rare", "legenadary")
     * @param {*} damage  - наносимый урон
     * @param {*} durability - прочность
     */
    constructor(itemName, weight, rarity, damage, durability){
        super(itemName, weight,rarity);//наследование полей из класса родителя

        this.damage = damage;
        this.durability = durability;
    }
    /**
     * Возвращает значения полей
     * 
     * @returns возвращает строку со значенимяи полей ${this.name}, ${this.weight}, ${this.rarity}, ${this.damage}, ${this.durability}
     */
    getInfo(){
        return `Оружее: ${this.name}, ${this.weight}, ${this.rarity}, ${this.damage}, ${this.durability}`;
    }

    /**
     * Уменьшает прочность оружия на 10 едениц
     */
    use(){
        if (this.durability>0)
        {
            this.durability =this.durability-10; 
        }
    }

    /**
     * Увеличивает `durability` оружия
     * 
     * @param {*} repVar - значение на которое увеличиться durability
     */
    repair(repVar = 10){
        if (this.durability<100){
            this.durability = this.durability+repVar;
            console.log(`Вы починили ${this.name}, его прочность равна: ${this.durability}`);
        }
        else if(this.durability+repVar>100){
            this.durability = 100;
            console.log(`Вы не можете починить ${this.name}, его прочность уже равна: ${this.durability}`);
        }
    }
}


/**
* Конструктор, для создания объекта
* 
* @param {*} itemName - имя предмета
* @param {*} weight  - вес предмета
* @param {*} rarity  - редкость предмета ("common", "uncommon", "rare", "legenadary")
*/
function strangeItem (itemName, weight, rarity) {
    this.name = itemName;
    this.weight = weight;
    this.rarity = rarity;
}

     /**
     * Возвращает значения полей
     * 
     * @returns возвращает строку со значенимяи полей ${this.name}, ${this.weight}, ${this.rarity}, ${this.damage}, ${this.durability}
     */
    strangeItem.prototype.getInfo = function(){
        return `Предмет инвентаря: ${this.name}, ${this.weight}, ${this.rarity}`;
    }
     /**
     * устанавливает новое значение веса объекту
     * @param {*} newWeight - новое значение веса с десятичной точкой 
     */
    strangeItem.prototype.setWeight = function(newWeight){
        this.weight = newWeight;
    }



/**
* Конструктор для создания оружия
* 
* @param {*} itemName - название оружия 
* @param {*} weight - вес оружия 
* @param {*} rarity - редскость оружия ("common", "uncommon", "rare", "legenadary")
* @param {*} damage  - наносимый урон
* @param {*} durability - прочность
*/
function strangeWeapon (itemName, weight, rarity, damage, durability) {
    strangeItem.call(itemName, weight, rarity);

    this.damage = damage;
    this.durability = durability;
}
strangeWeapon.prototype = Object.create(strangeItem.prototype);//наследование методов из клаасса родителя
strangeWeapon.prototype.constructor = strangeWeapon;
     /**
     * Возвращает инфомацию о оружии
     * 
     * @returns возвращает строку со значенимяи полей ${this.name}, ${this.weight}, ${this.rarity}, ${this.damage}, ${this.durability}
     */
    strangeWeapon.prototype.getInfo = function(){
        return `Оружие: ${this.name}, ${this.weight}, ${this.rarity}, ${this.damage}, ${this.durability}`;
    }
    /**
     * Уменьшает прочность оружия на 10 едениц
     */
    strangeWeapon.prototype.use = function(){
        if (this.durability>0)
            {
                this.durability =this.durability-10; 
            }
    }
    /**
     * Увеличивает `durability` оружия
     * 
     * @param {*} repVar - значение на которое увеличиться durability
     */
    strangeWeapon.prototype.repair = function(repVar = 10){
        if (this.durability<100){
            this.durability = this.durability+repVar;
            console.log(`Вы починили ${this.name}, его прочность равна: ${this.durability}`);
        }
        else if(this.durability+repVar>100){
            this.durability = 100;
            console.log(`Вы не можете починить ${this.name}, его прочность уже равна: ${this.durability}`);
        }
    }




const glass =new Item("Glass bowl", 1.02, "rare");
console.log(glass.getInfo());

const knife = new Weapon("Knife", 1.5, "rare", 25, 58);
console.log(knife.getInfo());

let excalibur = new strangeWeapon("Excalibur", 1.5,"rare",1.7,85);

console.log(excalibur.getInfo());

let phone = new strangeItem("PhoneConstructor", 0.75, "common");
console.log(phone.getInfo())


knife.repair(25);
