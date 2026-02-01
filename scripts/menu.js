// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

// Проверяем, найдены ли элементы
console.log('menuToggle:', menuToggle);
console.log('mobileNav:', mobileNav);

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

console.log('navOverlay создан');

// Функция открытия/закрытия меню
function toggleMenu() {
    console.log('toggleMenu вызван');
    
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    console.log('isExpanded:', isExpanded);
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    console.log('Классы после переключения:');
    console.log('menuToggle классы:', menuToggle.className);
    console.log('mobileNav классы:', mobileNav.className);
    console.log('navOverlay классы:', navOverlay.className);
    
    // Блокируем скролл при открытом меню
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        console.log('Скролл заблокирован');
    } else {
        document.body.style.overflow = '';
        console.log('Скролл разблокирован');
    }
}

// Обработчики событий
menuToggle.addEventListener('click', function(e) {
    console.log('Клик по бургеру');
    e.stopPropagation();
    toggleMenu();
});

navOverlay.addEventListener('click', function(e) {
    console.log('Клик по оверлею');
    e.stopPropagation();
    toggleMenu();
});

// Закрытие меню при клике на ссылку в мобильном меню
const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
console.log('Найдено ссылок:', mobileNavLinks.length);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Клик по ссылке меню');
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла
window.addEventListener('scroll', () => {
    if (window.scrollY > 150) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Прокрутка к началу страницы
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Закрытие меню при ресайзе
window.addEventListener('resize', () => {
    console.log('Ресайз окна, ширина:', window.innerWidth);
    if (window.innerWidth > 768) {
        // Закрываем мобильное меню если оно открыто
        if (mobileNav.classList.contains('active')) {
            console.log('Закрываем мобильное меню из-за ресайза');
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});

// Закрытие меню при клике вне меню
document.addEventListener('click', function(e) {
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        window.innerWidth <= 768) {
        console.log('Клик вне меню, закрываем');
        toggleMenu();
    }
});

