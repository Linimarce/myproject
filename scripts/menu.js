// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.querySelector('.nav'); // десктопное меню
const mobileNav = document.getElementById('mobileNav'); // мобильное меню

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

// Функция открытия/закрытия меню
function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Переключаем состояния
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

// Обработчики событий
menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку в мобильном меню
const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

// Показываем кнопку после скролла (раньше - при 150px)
window.addEventListener('scroll', () => {
    if (window.scrollY > 150) { // Было 300, уменьшили для более раннего появления
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

// Закрытие меню при ресайзе (если перешли на десктоп)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Закрываем мобильное меню если оно открыто
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            navOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
});