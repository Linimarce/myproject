// Получаем элементы
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

console.log('=== ИНИЦИАЛИЗАЦИЯ МЕНЮ ===');
console.log('menuToggle найден:', !!menuToggle);
console.log('mobileNav найден:', !!mobileNav);

// Создаем оверлей для меню
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

console.log('navOverlay создан и добавлен в DOM');

// Состояние меню
let isMenuOpen = false;

// Функция открытия меню
function openMenu() {
    console.log('Открываем меню');
    
    // Добавляем классы
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    navOverlay.classList.add('active');
    
    // Обновляем атрибуты
    menuToggle.setAttribute('aria-expanded', 'true');
    
    // Блокируем скролл
    document.body.style.overflow = 'hidden';
    
    // Обновляем состояние
    isMenuOpen = true;
    
    console.log('Меню открыто');
    console.log('Классы mobileNav:', mobileNav.className);
}

// Функция закрытия меню
function closeMenu() {
    console.log('Закрываем меню');
    
    // Убираем классы
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    navOverlay.classList.remove('active');
    
    // Обновляем атрибуты
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Разблокируем скролл
    document.body.style.overflow = '';
    
    // Обновляем состояние
    isMenuOpen = false;
    
    console.log('Меню закрыто');
}

// Функция переключения меню
function toggleMenu() {
    console.log('toggleMenu вызван, текущее состояние:', isMenuOpen);
    
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

// Обработчики событий
menuToggle.addEventListener('click', function(e) {
    console.log('--- Клик по бургеру ---');
    e.preventDefault();
    e.stopPropagation();
    
    // Проверяем, что мы на мобильном
    if (window.innerWidth <= 768) {
        toggleMenu();
    } else {
        console.log('Игнорируем клик на десктопе');
    }
});

// Закрытие по клику на оверлей
navOverlay.addEventListener('click', function(e) {
    console.log('--- Клик по оверлею ---');
    e.stopPropagation();
    closeMenu();
});

// Закрытие меню при клике на ссылку
const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
console.log('Найдено ссылок в мобильном меню:', mobileNavLinks.length);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('Клик по ссылке:', this.textContent);
        if (window.innerWidth <= 768 && isMenuOpen) {
            setTimeout(() => {
                closeMenu();
            }, 300); // Небольшая задержка для анимации
        }
    });
});

// Закрытие меню при клике на пустое пространство
document.addEventListener('click', function(e) {
    // Если меню открыто И клик не по бургеру И не по меню
    if (isMenuOpen && 
        !menuToggle.contains(e.target) && 
        !mobileNav.contains(e.target) &&
        window.innerWidth <= 768) {
        console.log('Клик вне меню, закрываем');
        closeMenu();
    }
});

// Закрытие меню при ресайзе окна
window.addEventListener('resize', function() {
    console.log('Ресайз окна, ширина:', window.innerWidth);
    
    if (window.innerWidth > 768 && isMenuOpen) {
        console.log('Переход на десктоп, закрываем меню');
        closeMenu();
    }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        console.log('Нажата Escape, закрываем меню');
        closeMenu();
    }
});

// Кнопка "Наверх"
const scrollTopButton = document.getElementById('scrollTop');

if (scrollTopButton) {
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
}
