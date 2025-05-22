/**
 * Возвращает случайное целое число от 0 до max - 1.
 * @param {number} max - Верхняя граница диапазона (не включительно).
 * @returns {number}
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Генерирует случайный 5-значный ID.
 * @returns {string}
 */
export function randomingID(){
    return String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9)) + 
           String(getRandomInt(9));
}
