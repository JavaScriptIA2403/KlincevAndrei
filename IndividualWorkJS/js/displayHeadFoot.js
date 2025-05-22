/**
 * Загружает и отображает содержимое `header.html` в элемент с ID `header`.
 */
export function displayHeader(){
    fetch('./HTML/header.html').then(response => response.text()).then(data => document.getElementById('header').innerHTML = data);
}

/**
 * Загружает и отображает содержимое `footer.html` в элемент с ID `footer`.
 */
export function displayFoot(){
    fetch('HTML/footer.html').then(response => response.text()).then(data => document.getElementById('footer').innerHTML = data);
}

/**
 * Загружает и отображает содержимое `head.html` в элемент с ID `head`.
 */
export function displayHead(){
    fetch('HTML/head.html').then(response => response.text()).then(data => document.getElementById('head').innerHTML = data);
    }

