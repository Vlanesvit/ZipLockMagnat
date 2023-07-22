
/* ====================================
Меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header .menu');

	// Бургер
	function menuBurger() {
		menus.forEach(menu => {
			const menuBurgerBtn = menu.querySelector('.menu__icon');

			menuBurgerBtn.addEventListener("click", function (e) {
				// Показать меню
				menuToggle();
			});
		});
	};
	if (document.querySelector(".menu__icon")) {
		menuBurger()
	}

	// Меню
	function menuInit() {
		menus.forEach(menu => {
			// Все пункты с выпадающим меню
			const menuItemDropdowns = menu.querySelectorAll('.menu__list .dropdown');
			const menuItemDropdownsMenu = menu.querySelectorAll('.menu__list .dropdown__menu');

			// 0-ой уровень
			const menuItemDropdownsNull = menu.querySelectorAll('.menu__list > .dropdown');
			const menuItemDropdownsMenuNull = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu');

			// 1-ый уровень
			const menuItemDropdownsFirst = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown');
			const menuItemDropdownsMenuFirst = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu');

			// 2-ой уровень
			const menuItemDropdownsTwo = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown');
			const menuItemDropdownsMenuTwo = menu.querySelectorAll('.menu__list > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu > .dropdown > .dropdown__menu');

			// Добавление иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				const menuLinkDropdowns = item.querySelector('a');
				let iconDropdown = document.createElement('i');
				menuLinkDropdowns.append(iconDropdown);
			});

			/* Один и тот же код для отдельных уровней меню, 
			чтобы открывался только один пункт, а открытые - закрывались, кроме тех, кто выше уровнем */
			function openLvlMenu(li, ul) {
				li.forEach(item => {
					const menuItemList = item.querySelector('ul');
					const menuItemIcons = item.querySelector('a > i');

					// Открытие меню при клике на иконку
					menuItemIcons.addEventListener('click', (e) => {
						e.preventDefault();
						_slideToggle(menuItemList, 500);
						ul.forEach(menu => {
							if (!menu.hasAttribute('hidden')) {
								_slideUp(menu, 500);
							}
						});

						// Проходимся по всем пунктам и ищем активные классы, убираем их и добавляем активный класс кликнутому пункту
						if (!menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							li.forEach(itemDrop => {
								if (itemDrop.classList.contains('_open-menu')) {
									itemDrop.classList.remove('_open-menu')
								}
							});
							menuItemIcons.closest('.dropdown').classList.add('_open-menu');
						} else if (menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							menuItemIcons.closest('.dropdown').classList.remove('_open-menu');
						}
					});
				});
			}
			// Пункты 0-го уровня меню
			openLvlMenu(menuItemDropdownsNull, menuItemDropdownsMenuNull)
			// Пункты 1-го уровня меню
			openLvlMenu(menuItemDropdownsFirst, menuItemDropdownsMenuFirst)
			// Пункты 2-го уровня меню
			openLvlMenu(menuItemDropdownsTwo, menuItemDropdownsMenuTwo)

			// При клике на бургер убираем открые меню и активные класс
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__icon')) {
					menuItemDropdownsMenu.forEach(menu => {
						_slideUp(menu, 800);
					});
					menuItemDropdowns.forEach(item => {
						item.classList.remove('_open-menu');
					});
				}
			});
		});
	}
	menuInit()

	// Вспомогательные функции ========================================================================================================================================================
	// Функции открытия/закрытия бургер-меню с блокировкой скролла
	function menuOpen() {
		bodyLock();
		document.documentElement.classList.add("menu-open");
	}
	function menuClose() {
		bodyUnlock();
		document.documentElement.classList.remove("menu-open");
	}
	function menuToggle() {
		bodyLockToggle();
		document.documentElement.classList.toggle("menu-open");
	}
}
menuFunction()

/* ====================================
Поиск
==================================== */
function search() {
	const searchs = document.querySelectorAll('.search');

	const searchModal = document.getElementById('search-modal');
	const searchShow = document.getElementById('search-show');

	// Показать поиск
	searchShow.addEventListener('click', function (e) {
		e.preventDefault();
		searchOpen()
	})

	// Закрываем поиск по оверлею
	searchModal.addEventListener('click', function (e) {
		const target = e.target;
		// Делегируем событие
		if (target.classList.contains('search__overlay') || target.classList.contains('search__close')) {
			searchClose()
		}
	});

	searchs.forEach(search => {
		const searchSubmit = search.querySelector('.search__submit')
		const searchClear = search.querySelector('.search__clear');
		const searchInput = search.querySelector('.search__input')
		const searchForm = search.querySelector('.search__form');

		// Отправка формы
		searchSubmit.addEventListener('click', function (e) {
			e.preventDefault();
			if (searchInput.value != '') {
				searchForm.submit();
			}
		})

		// При вводе появляется кнопка отчистки
		searchInput.addEventListener('input', function (e) {
			searchClear.style.display = "block";
		})

		// Очистить инпут
		searchClear.addEventListener('click', function (e) {
			searchInput.value = '';
			searchClear.style.display = "none";
			putСursorInInput(searchInput);
		})
	});

	// Вспомогательные функции ========================================================================================================================================================
	// Поставить курсор в инпут после клика
	function putСursorInInput(input) {
		setTimeout(function () {
			input.focus()
		}, 100);
	}
	// Функции открытия/закрытия поиска с блокировкой скролла
	function searchOpen() {
		bodyLock();
		document.documentElement.classList.add("search-open");
	}

	function searchClose() {
		bodyUnlock();
		document.documentElement.classList.remove("search-open");
	}

	function searchToggle() {
		bodyLockToggle();
		document.documentElement.classList.toggle("search-open");
	}
	// Функции вызова курсора
	addCursorHover(".search__overlay", ".cursor", "cursor__active");
	addCursorMove(".cursor__circle")
}
if (document.querySelector('.search')) {
	search()
}

/* ====================================
Каталог
==================================== */
function catalog() {
	const menuCatalogs = document.querySelectorAll('.menu-catalog');

	menuCatalogs.forEach(catalog => {
		const catalogBtn = catalog.querySelector('.menu-catalog__icon')
		const catalogBody = catalog.querySelector('.menu-catalog__body');
		let heightBody = document.querySelector('.menu-catalog__body').clientHeight + 35 + 'px';

		catalogBtn.addEventListener('click', function (e) {
			e.preventDefault();
			catalog.classList.toggle('catalog-open')
			_slideToggle(catalogBody, 500)

			// При закрытии или открытии дает отступ
			if (!catalog.classList.contains('catalog-open')) {
				if (document.querySelector('.rs-news') && document.querySelector('.menu-catalog__body')) {
					document.querySelector('.rs-news').style.marginTop = "0px";
				}
			} else {
				if (document.querySelector('.rs-news') && document.querySelector('.menu-catalog__body')) {
					document.querySelector('.rs-news').style.marginTop = heightBody;
				}
			}
		})

		function addMargin() {
			// Отступ блоку новостей
			if (document.querySelector('.rs-news') && document.querySelector('.menu-catalog__body')) {
				document.querySelector('.rs-news').style.marginTop = heightBody;
			}
		}
		window.addEventListener('load', function () {
			addMargin()
		})
		window.addEventListener('scroll', function () {
			if (window.scrollY > 3000) {
				_slideUp(catalogBody, 500)
				catalog.classList.remove('catalog-open')

				if (document.querySelector('.rs-news') && document.querySelector('.menu-catalog__body')) {
					document.querySelector('.rs-news').style.marginTop = "0px";
				}
			}
		})

		// Меню
		function menuCatalogInit() {
			// Все пункты с выпадающим меню
			const menuItemDropdowns = catalog.querySelectorAll('.menu-catalog__list .dropdown');
			const menuItemDropdownsMenu = catalog.querySelectorAll('.menu-catalog__list .dropdown__menu');

			// Добавление иконки в пункты с выпадающим меню
			menuItemDropdowns.forEach(item => {
				const menuLinkDropdowns = item.querySelector('a');
				let iconDropdown = document.createElement('i');
				menuLinkDropdowns.append(iconDropdown);
			});

			/* Один и тот же код для отдельных уровней меню, 
			чтобы открывался только один пункт, а открытые - закрывались, кроме тех, кто выше уровнем */
			function openLvlMenu(li, ul) {
				li.forEach(item => {
					const menuItemList = item.querySelector('ul');
					const menuItemIcons = item.querySelector('a > i');

					// Открытие меню при клике на иконку
					menuItemIcons.addEventListener('click', (e) => {
						e.preventDefault();
						_slideToggle(menuItemList, 300);
						ul.forEach(menu => {
							if (!menu.hasAttribute('hidden')) {
								_slideUp(menu, 300);
							}
						});

						// Проходимся по всем пунктам и ищем активные классы, убираем их и добавляем активный класс кликнутому пункту
						if (!menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							li.forEach(itemDrop => {
								if (itemDrop.classList.contains('_open-menu')) {
									itemDrop.classList.remove('_open-menu')
								}
							});
							menuItemIcons.closest('.dropdown').classList.add('_open-menu');
						} else if (menuItemIcons.closest('.dropdown').classList.contains('_open-menu')) {
							menuItemIcons.closest('.dropdown').classList.remove('_open-menu');
						}
					});
				});
			}
			// Пункты 0-го уровня меню
			openLvlMenu(menuItemDropdowns, menuItemDropdownsMenu)
		}
		menuCatalogInit()
	});
}
if (document.querySelector('.menu-catalog')) {
	catalog()
}

/* ====================================
Якорные ссылки
==================================== */
// data-goto - указать ID блока
// data-goto-header - учитывать header
// data-goto-top - недокрутить на указанный размер
// data-goto-speed - скорость (только если используется доп плагин)
let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = "";
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = ".header";
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains("_header-scroll")) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add("_header-scroll");
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove("_header-scroll");
				setTimeout((() => {
					headerElement.style.cssText = ``;
				}), 0);
			} else headerItemHeight = headerElement.offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed,
			header: headerItem,
			offset: offsetTop,
			easing: "linear"
		};
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;
		if ("undefined" !== typeof SmoothScroll) (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		};
	};
}
function pageNavigation() {
	document.addEventListener("click", pageNavigationAction);
	document.addEventListener("watcherCallback", pageNavigationAction);
	function pageNavigationAction(e) {
		if ("click" === e.type) {
			const targetElement = e.target;
			if (targetElement.closest("[data-goto]")) {
				const gotoLink = targetElement.closest("[data-goto]");
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
				const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if ("watcherCallback" === e.type && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			if ("navigator" === targetElement.dataset.watch) {
				document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
					const element = targetElement.classList[index];
					if (document.querySelector(`[data-goto=".${element}"]`)) {
						navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
						break;
					}
				}
				if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
			}
		}
	}
}
pageNavigation();

/* ====================================
Header при скролле
==================================== */
function headerFixed() {
	const header = document.querySelector('.rs-header');
	let lastScrollTop = 0;

	function headerClassAdd() {
		// Вычисляем высоту и даем класс после ее преодоления
		const wrapHeader = header.querySelector('.rs-header__wrapper').clientHeight;
		// header.classList.toggle('_header-fixed', window.scrollY > wrapHeader);

		let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Проверка на присутствие класса для бургер-меню. Если он есть, то шапка не скрывается
		if (document.documentElement.classList.contains('menu-open')) {
			header.classList.remove('_header-fixed')
			header.style.top = "0px";
		}
		else {
			// Скрытие шапки
			if (scrollTop > lastScrollTop) {
				header.classList.add('_header-fixed')
				header.style.top = -wrapHeader + 'px';
			} else {
				header.classList.remove('_header-fixed')
				header.style.top = "0px";
			}
		}
		lastScrollTop = scrollTop;
	}


	window.addEventListener('scroll', function () {
		headerClassAdd()
	})
	window.addEventListener('load', function () {
		headerClassAdd()
	})
	window.addEventListener('resize', function () {
		headerClassAdd()
	})
}
headerFixed()

