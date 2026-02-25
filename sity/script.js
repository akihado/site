// Анимация при прокрутке
window.addEventListener('scroll', reveal);

function reveal() {
    let reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Логика корзины (счётчик)
let count = 0;
const cartCount = document.getElementById('cart-count');
const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        count++;
        cartCount.innerText = count;
        btn.innerText = "В корзине!";
        btn.style.borderColor = "#4dff88";
        btn.style.color = "#4dff88";
    });
});

// Плавное появление текста при загрузке
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hero-content').style.opacity = '1';
});



//КОРЗИНА
function loadCart() {
    const cartGrid = document.getElementById('cart-grid');
    const footer = document.getElementById('cart-footer');
    const emptyMsg = document.getElementById('empty-msg');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    // Получаем товары из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartGrid.innerHTML = '';
        footer.style.display = 'none';
        emptyMsg.style.display = 'block';
        cartCount.innerText = '0';
        return;
    }

    emptyMsg.style.display = 'none';
    footer.style.display = 'block';
    cartGrid.innerHTML = '';
    
    let total = 0;

    cart.forEach((item, index) => {
        total += parseInt(item.price);
        cartGrid.innerHTML += `
            <div class="card">
                <div class="card-img"></div>
                <h3>${item.name}</h3>
                <span class="price">${item.price.toLocaleString()} ₽</span>
                <button class="remove-btn" onclick="removeItem(${index})">Удалить</button>
            </div>
        `;
    });

    totalPrice.innerText = total.toLocaleString() + ' ₽';
    cartCount.innerText = cart.length;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Удаляем 1 элемент по индексу
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Перерисовываем страницу
}

document.getElementById('clear-cart').addEventListener('click', () => {
    localStorage.removeItem('cart');
    loadCart();
});

// Запускаем при открытии страницы
document.addEventListener('DOMContentLoaded', loadCart);





