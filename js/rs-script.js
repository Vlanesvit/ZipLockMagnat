/* ====================================
Проверка поддержки webp, добавление класса webp или no-webp для HTML
==================================== */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp()

/* ====================================
Проверка мобильного браузера
==================================== */
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
addTouchClass()

/* ====================================
Добавление loaded для HTML после полной загрузки страницы
==================================== */
function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
addLoadedClass()

//========================================================================================================================================================
// Вспомогательные модули плавного раскрытия и закрытия объекта
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

/* ====================================
Кастомный курсор
==================================== */
function addCursorHover(hoveredElement, selectedElement, newClass) {
	document.querySelectorAll(hoveredElement).forEach(hover => {
		hover.addEventListener('mouseover', function () {
			document.querySelector(selectedElement).classList.add(newClass)
		})
		hover.addEventListener('mouseleave', function () {
			document.querySelector(selectedElement).classList.remove(newClass)
		})
	});
}
function addCursorDrag(hoveredElement, selectedElement, newClass) {
	document.querySelectorAll(hoveredElement).forEach(hover => {
		hover.addEventListener('mousedown', function () {
			document.querySelector(selectedElement).classList.add(newClass)
		})
	});
	document.body.addEventListener('mouseup', function () {
		document.querySelector(selectedElement).classList.remove(newClass)
	})
}
function addCursorMove(selectedElement) {
	document.body.addEventListener('mousemove', function (e) {
		setTimeout(() => {
			document.querySelector(selectedElement).style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
		}, 0);
	});
}
function hideCursor(selectedElement, newClass) {
	document.querySelector(selectedElement).classList.remove(newClass)
}

/*
// Настройки
Для селекта (select):
class="имя класса" - модификатор к конкретному селекту
multiple - мультивыбор
data-class-modif= "имя модификатора"
data-tags - режим тегов, только для (только для multiple)
data-scroll - включит прокрутку для выпадающего списка, дополнительно можно подключить кастомный скролл simplebar в app.js. Указанное число для атрибута ограничит высоту
data-checkbox - стилизация элементов по checkbox (только для multiple)
data-show-selected - отключает скрытие выбранного элемента
data-search - позволяет искать по выпадающему списку
data-open - селект открыт сразу
data-submit - отправляет форму при изменении селекта

data-one-select - селекты внутри оболочки с атрибутом будут показываться только по одному
data-pseudo-label - добавляет псевдоэлемент к заголовку селекта с указанным текстом

Для плейсхолдера (Плейсхолдер - это option с value=""):
data-label для плейсхолдера, добавляет label к селекту
data-show для плейсхолдера, показывает его в списке (только для единичного выбора)

Для элемента (option):
data-class="имя класса" - добавляет класс
data-asset="путь к картинке или текст" - добавляет структуру 2х колонок и данными
data-href="адрес ссылки" - добавляет ссылку в элемент списка
data-href-blank - откроет ссылку в новом окне
*/

/*
// Возможные доработки:
попап на мобилке
*/

// Класс построения Select
(() => {
	"use strict";
	const modules = {};
	class SelectConstructor {
		constructor(props, data = null) {
			let defaultConfig = {
				init: true,
				logging: true
			};
			this.config = Object.assign(defaultConfig, props);
			this.selectClasses = {
				classSelect: "select",
				classSelectBody: "select__body",
				classSelectTitle: "select__title",
				classSelectValue: "select__value",
				classSelectLabel: "select__label",
				classSelectInput: "select__input",
				classSelectText: "select__text",
				classSelectLink: "select__link",
				classSelectOptions: "select__options",
				classSelectOptionsScroll: "select__scroll",
				classSelectOption: "select__option",
				classSelectContent: "select__content",
				classSelectRow: "select__row",
				classSelectData: "select__asset",
				classSelectDisabled: "_select-disabled",
				classSelectTag: "_select-tag",
				classSelectOpen: "_select-open",
				classSelectActive: "_select-active",
				classSelectFocus: "_select-focus",
				classSelectMultiple: "_select-multiple",
				classSelectCheckBox: "_select-checkbox",
				classSelectOptionSelected: "_select-selected",
				classSelectPseudoLabel: "_select-pseudo-label"
			};
			this._this = this;
			if (this.config.init) {
				const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll("select");
				if (selectItems.length) {
					this.selectsInit(selectItems);
				}
			}
		}
		getSelectClass(className) {
			return `.${className}`;
		}
		getSelectElement(selectItem, className) {
			return {
				originalSelect: selectItem.querySelector("select"),
				selectElement: selectItem.querySelector(this.getSelectClass(className))
			};
		}
		selectsInit(selectItems) {
			selectItems.forEach(((originalSelect, index) => {
				this.selectInit(originalSelect, index + 1);
			}));
			document.addEventListener("click", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("keydown", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("focusin", function (e) {
				this.selectsActions(e);
			}.bind(this));
			document.addEventListener("focusout", function (e) {
				this.selectsActions(e);
			}.bind(this));
		}
		selectInit(originalSelect, index) {
			const _this = this;
			let selectItem = document.createElement("div");
			selectItem.classList.add(this.selectClasses.classSelect);
			originalSelect.parentNode.insertBefore(selectItem, originalSelect);
			selectItem.appendChild(originalSelect);
			originalSelect.hidden = true;
			index ? originalSelect.dataset.id = index : null;
			if (this.getSelectPlaceholder(originalSelect)) {
				originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
				if (this.getSelectPlaceholder(originalSelect).label.show) {
					const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
					selectItemTitle.insertAdjacentHTML("afterbegin", `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
				}
			}
			selectItem.insertAdjacentHTML("beforeend", `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
			this.selectBuild(originalSelect);
			originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
			originalSelect.addEventListener("change", (function (e) {
				_this.selectChange(e);
			}));
		}
		selectBuild(originalSelect) {
			const selectItem = originalSelect.parentElement;
			selectItem.dataset.id = originalSelect.dataset.id;
			originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
			originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
			originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
			this.setSelectTitleValue(selectItem, originalSelect);
			this.setOptions(selectItem, originalSelect);
			originalSelect.hasAttribute("data-search") ? this.searchActions(selectItem) : null;
			originalSelect.hasAttribute("data-open") ? this.selectAction(selectItem) : null;
			this.selectDisabled(selectItem, originalSelect);
		}
		selectsActions(e) {
			const targetElement = e.target;
			const targetType = e.type;
			if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
				const selectItem = targetElement.closest(".select") ? targetElement.closest(".select") : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
				const originalSelect = this.getSelectElement(selectItem).originalSelect;
				if ("click" === targetType) {
					if (!originalSelect.disabled) if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
						const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
						const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
						this.optionAction(selectItem, originalSelect, optionItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) this.selectAction(selectItem); else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
						const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
						this.optionAction(selectItem, originalSelect, optionItem);
					}
				} else if ("focusin" === targetType || "focusout" === targetType) {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) "focusin" === targetType ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
				} else if ("keydown" === targetType && "Escape" === e.code) this.selectsСlose();
			} else this.selectsСlose();
		}
		selectsСlose(selectOneGroup) {
			const selectsGroup = selectOneGroup ? selectOneGroup : document;
			const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
			if (selectActiveItems.length) selectActiveItems.forEach((selectActiveItem => {
				this.selectСlose(selectActiveItem);
			}));
		}
		selectСlose(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (!selectOptions.classList.contains("_slide")) {
				selectItem.classList.remove(this.selectClasses.classSelectOpen);
				_slideUp(selectOptions, originalSelect.dataset.speed);
			}
		}
		selectAction(selectItem) {
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			if (originalSelect.closest("[data-one-select]")) {
				const selectOneGroup = originalSelect.closest("[data-one-select]");
				this.selectsСlose(selectOneGroup);
			}
			if (!selectOptions.classList.contains("_slide")) {
				selectItem.classList.toggle(this.selectClasses.classSelectOpen);
				_slideToggle(selectOptions, originalSelect.dataset.speed);
			}
		}
		setSelectTitleValue(selectItem, originalSelect) {
			const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
			const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
			if (selectItemTitle) selectItemTitle.remove();
			selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
		}
		getSelectTitleValue(selectItem, originalSelect) {
			let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
			if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
				selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map((option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`)).join("");
				if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
					document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
					if (originalSelect.hasAttribute("data-search")) selectTitleValue = false;
				}
			}
			selectTitleValue = selectTitleValue.length ? selectTitleValue : originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : "";
			let pseudoAttribute = "";
			let pseudoAttributeClass = "";
			if (originalSelect.hasAttribute("data-pseudo-label")) {
				pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
				pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
			}
			this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
			if (originalSelect.hasAttribute("data-search")) return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`; else {
				const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : "";
				return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
			}
		}
		getSelectElementContent(selectOption) {
			const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : "";
			const selectOptionDataHTML = selectOptionData.indexOf("img") >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
			let selectOptionContentHTML = ``;
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : "";
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : "";
			selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : "";
			selectOptionContentHTML += selectOption.textContent;
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			selectOptionContentHTML += selectOptionData ? `</span>` : "";
			return selectOptionContentHTML;
		}
		getSelectPlaceholder(originalSelect) {
			const selectPlaceholder = Array.from(originalSelect.options).find((option => !option.value));
			if (selectPlaceholder) return {
				value: selectPlaceholder.textContent,
				show: selectPlaceholder.hasAttribute("data-show"),
				label: {
					show: selectPlaceholder.hasAttribute("data-label"),
					text: selectPlaceholder.dataset.label
				}
			};
		}
		getSelectedOptionsData(originalSelect, type) {
			let selectedOptions = [];
			if (originalSelect.multiple) selectedOptions = Array.from(originalSelect.options).filter((option => option.value)).filter((option => option.selected)); else selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
			return {
				elements: selectedOptions.map((option => option)),
				values: selectedOptions.filter((option => option.value)).map((option => option.value)),
				html: selectedOptions.map((option => this.getSelectElementContent(option)))
			};
		}
		getOptions(originalSelect) {
			let selectOptionsScroll = originalSelect.hasAttribute("data-scroll") ? `data-simplebar` : "";
			let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : "";
			let selectOptions = Array.from(originalSelect.options);
			if (selectOptions.length > 0) {
				let selectOptionsHTML = ``;
				if (this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show || originalSelect.multiple) selectOptions = selectOptions.filter((option => option.value));
				selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : "";
				selectOptions.forEach((selectOption => {
					selectOptionsHTML += this.getOption(selectOption, originalSelect);
				}));
				selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
				return selectOptionsHTML;
			}
		}
		getOption(selectOption, originalSelect) {
			const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : "";
			const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute("data-show-selected") && !originalSelect.multiple ? `hidden` : ``;
			const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : "";
			const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
			const selectOptionLinkTarget = selectOption.hasAttribute("data-href-blank") ? `target="_blank"` : "";
			let selectOptionHTML = ``;
			selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
			selectOptionHTML += this.getSelectElementContent(selectOption);
			selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
			return selectOptionHTML;
		}
		setOptions(selectItem, originalSelect) {
			const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			selectItemOptions.innerHTML = this.getOptions(originalSelect);
		}
		optionAction(selectItem, originalSelect, optionItem) {
			if (originalSelect.multiple) {
				optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
				const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
				originalSelectSelectedItems.forEach((originalSelectSelectedItem => {
					originalSelectSelectedItem.removeAttribute("selected");
				}));
				const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
				selectSelectedItems.forEach((selectSelectedItems => {
					originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute("selected", "selected");
				}));
			} else {
				if (!originalSelect.hasAttribute("data-show-selected")) {
					if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
					optionItem.hidden = true;
				}
				originalSelect.value = optionItem.hasAttribute("data-value") ? optionItem.dataset.value : optionItem.textContent;
				this.selectAction(selectItem);
			}
			this.setSelectTitleValue(selectItem, originalSelect);
			this.setSelectChange(originalSelect);
		}
		selectChange(e) {
			const originalSelect = e.target;
			this.selectBuild(originalSelect);
			this.setSelectChange(originalSelect);
		}
		setSelectChange(originalSelect) {
			if (originalSelect.hasAttribute("data-validate")) formValidate.validateInput(originalSelect);
			if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
				let tempButton = document.createElement("button");
				tempButton.type = "submit";
				originalSelect.closest("form").append(tempButton);
				tempButton.click();
				tempButton.remove();
			}
			const selectItem = originalSelect.parentElement;
			this.selectCallback(selectItem, originalSelect);
		}
		selectDisabled(selectItem, originalSelect) {
			if (originalSelect.disabled) {
				selectItem.classList.add(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
			} else {
				selectItem.classList.remove(this.selectClasses.classSelectDisabled);
				this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
			}
		}
		searchActions(selectItem) {
			this.getSelectElement(selectItem).originalSelect;
			const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
			const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
			const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
			const _this = this;
			selectInput.addEventListener("input", (function () {
				selectOptionsItems.forEach((selectOptionsItem => {
					if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) selectOptionsItem.hidden = false; else selectOptionsItem.hidden = true;
				}));
				true === selectOptions.hidden ? _this.selectAction(selectItem) : null;
			}));
		}
		selectCallback(selectItem, originalSelect) {
			document.dispatchEvent(new CustomEvent("selectCallback", {
				detail: {
					select: originalSelect
				}
			}));
		}
	}
	modules.select = new SelectConstructor({});
})();

function oneSelect() {
	const selectOneSelects = document.querySelectorAll('.select_one-select');
	selectOneSelects.forEach(select => {
		const selectOptions = select.querySelectorAll('.select__options .select__option');

		selectOptions.forEach(option => {
			option.addEventListener('click', function () {
				selectOptions.forEach(option => {
					option.classList.remove('_select-selected')
				});
				this.classList.add('_select-selected')
			})
		});
	});
}
if (document.querySelector('.select_one-select')) {
	oneSelect()
}

/* ====================================
Параллакс элементов при движении мышью
==================================== */
/*
Предмету, который будет двигаться за мышью указать атрибут data-prlx-mouse.

// =========
Если нужны дополнительные настройки - указать 

Атрибут													Значение по умолчанию
-------------------------------------------------------------------------------------------------------------------
data-prlx-cx="коэффициент_х"					20							значение больше - меньше процент сдвига
data-prlx-cy="коэффициент_y"					20							значение больше - меньше процент сдвига
data-prlx-dxr																					против оси X
data-prlx-dyr																					против оси Y
data-prlx-a="скорость_анимации"				100							больше значение - больше скорость

// =========
Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse-wrapper
*/
const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
if (paralaxMouse.length) {
	this.paralaxMouseInit(paralaxMouse);
}
function paralaxMouseInit(paralaxMouse) {
	paralaxMouse.forEach(el => {
		const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

		// Коэф. X 
		const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 20;
		// Коэф. У 
		const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 20;
		// Напр. Х
		const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
		// Напр. У
		const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
		// Скорость анимации
		const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 100;


		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		setMouseParallaxStyle();

		// Проверяю на наличие родителя, в котором будет считываться положение мыши
		if (paralaxMouseWrapper) {
			mouseMoveParalax(paralaxMouseWrapper);
		} else {
			mouseMoveParalax();
		}

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;
			positionX = positionX + (distX * paramAnimation / 1000);
			positionY = positionY + (distY * paramAnimation / 1000);
			el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
			requestAnimationFrame(setMouseParallaxStyle);
		}
		function mouseMoveParalax(wrapper = window) {
			wrapper.addEventListener("mousemove", function (e) {
				const offsetTop = el.getBoundingClientRect().top + window.scrollY;
				if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
					// Получение ширины и высоты блока
					const parallaxWidth = window.innerWidth;
					const parallaxHeight = window.innerHeight;
					// Ноль по середине
					const coordX = e.clientX - parallaxWidth / 2;
					const coordY = e.clientY - parallaxHeight / 2;
					// Получаем проценты
					coordXprocent = coordX / parallaxWidth * 100;
					coordYprocent = coordY / parallaxHeight * 100;
				}
			});
		}
	});
}

/* ====================================
Спойлеры/аккордионы
==================================== */
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller

Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]');
	if (spollersArray.length > 0) {
		// Получение обычных слойлеров
		const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
			return !item.dataset.spollers.split(",")[0];
		});
		// Инициализация обычных слойлеров
		if (spollersRegular.length > 0) {
			initSpollers(spollersRegular);
		}
		// Получение слойлеров с медиа запросами
		const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
			return item.dataset.spollers.split(",")[0];
		});
		// Инициализация слойлеров с медиа запросами
		if (spollersMedia.length > 0) {
			const breakpointsArray = [];
			spollersMedia.forEach(item => {
				const params = item.dataset.spollers;
				const breakpoint = {};
				const paramsArray = params.split(",");
				breakpoint.value = paramsArray[0];
				breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
				breakpoint.item = item;
				breakpointsArray.push(breakpoint);
			});
			// Получаем уникальные брейкпоинты
			let mediaQueries = breakpointsArray.map(function (item) {
				return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
			});
			mediaQueries = mediaQueries.filter(function (item, index, self) {
				return self.indexOf(item) === index;
			});
			// Работаем с каждым брейкпоинтом
			mediaQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const spollersArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				// Событие
				matchMedia.addEventListener("change", function () {
					initSpollers(spollersArray, matchMedia);
				});
				initSpollers(spollersArray, matchMedia);
			});
		}
		// Инициализация
		function initSpollers(spollersArray, matchMedia = false) {
			spollersArray.forEach(spollersBlock => {
				spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
				if (matchMedia.matches || !matchMedia) {
					spollersBlock.classList.add('_spoller-init');
					initSpollerBody(spollersBlock);
					spollersBlock.addEventListener("click", setSpollerAction);
				} else {
					spollersBlock.classList.remove('_spoller-init');
					initSpollerBody(spollersBlock, false);
					spollersBlock.removeEventListener("click", setSpollerAction);
				}
			});
		}
		// Работа с контентом
		function initSpollerBody(spollersBlock, hideSpollerBody = true) {
			const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
			if (spollerTitles.length > 0) {
				spollerTitles.forEach(spollerTitle => {
					if (hideSpollerBody) {
						spollerTitle.removeAttribute('tabindex');
						if (!spollerTitle.classList.contains('_spoller-active')) {
							spollerTitle.nextElementSibling.hidden = true;
						}
					} else {
						spollerTitle.setAttribute('tabindex', '-1');
						spollerTitle.nextElementSibling.hidden = false;
					}
				});
			}
		}
		function setSpollerAction(e) {
			const el = e.target;
			if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
				const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
				const spollersBlock = spollerTitle.closest('[data-spollers]');
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
				if (!spollersBlock.querySelectorAll('._slide').length) {
					if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
						hideSpollersBody(spollersBlock);
					}
					spollerTitle.classList.toggle('_spoller-active');
					_slideToggle(spollerTitle.nextElementSibling, 500);
				}
				// e.preventDefault();
			}
		}
		function hideSpollersBody(spollersBlock) {
			const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
			if (spollerActiveTitle) {
				spollerActiveTitle.classList.remove('_spoller-active');
				_slideUp(spollerActiveTitle.nextElementSibling, 500);
			}
		}
	}
}
if (document.querySelector('[data-spollers]')) {
	spollers()
}

/* ====================================
Табы
==================================== */
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/
function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	if (tabs.length > 0) {
		// const hash = getHash();
		// if (hash && hash.startsWith('tab-')) {
		// 	tabsActiveHash = hash.replace('tab-', '').split('-');
		// }
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});

		// Получение слойлеров с медиа запросами
		let mdQueriesArray = dataMediaQueries(tabs, "tabs");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Событие
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
	}
	// Установка позиций заголовков
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item;
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Работа с контентом
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles] .tabs__title');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body] .tabs__body');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
			tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
		}
		if (tabsContent.length) {
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.toggle('_tab-active');
				}
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash');
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = false;
					}
					// if (isHash && !tabsContentItem.closest('.popup')) {
					// 	setHash(`tab-${tabsBlockIndex}-${index}`);
					// }
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = true;
					}
				}
			});
		}
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]');
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
				tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
				tabTitle.classList.toggle('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}
	}
}
if (document.querySelector('[data-tabs]')) {
	tabs()
}

/* ====================================
Модальное окно
==================================== */
(() => {
	"use strict";
	const modules = {};
	class Popup {
		constructor(options) {
			let config = {
				logging: true,
				init: true,
				// Для кнопок 
				attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
				attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
				// Для сторонних объектов
				fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
				// Для объекта попапа
				youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
				youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
				setAutoplayYoutube: true,
				// Изменение классов
				classes: {
					popup: 'popup',
					// popupWrapper: 'popup__wrapper',
					popupContent: 'popup__content',
					popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
					bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
				},
				focusCatch: false, // Фокус внутри попапа зациклен
				closeEsc: true, // Закрытие по ESC
				bodyLock: true, // Блокировка скролла
				hashSettings: {
					location: true, // Хэш в адресной строке
					goHash: true, // Переход по наличию в адресной строке
				},
				on: { // События
					beforeOpen: function () { },
					afterOpen: function () { },
					beforeClose: function () { },
					afterClose: function () { },
				},
			}
			this.youTubeCode;
			this.isOpen = false;
			// Текущее окно
			this.targetOpen = {
				selector: false,
				element: false,
			}
			// Предыдущее открытое
			this.previousOpen = {
				selector: false,
				element: false,
			}
			// Последнее закрытое
			this.lastClosed = {
				selector: false,
				element: false,
			}
			this._dataValue = false;
			this.hash = false;

			this._reopen = false;
			this._selectorOpen = false;

			this.lastFocusEl = false;
			this._focusEl = [
				'a[href]',
				'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
				'button:not([disabled]):not([aria-hidden])',
				'select:not([disabled]):not([aria-hidden])',
				'textarea:not([disabled]):not([aria-hidden])',
				'area[href]',
				'iframe',
				'object',
				'embed',
				'[contenteditable]',
				'[tabindex]:not([tabindex^="-"])'
			];
			//this.options = Object.assign(config, options);
			this.options = {
				...config,
				...options,
				classes: {
					...config.classes,
					...options?.classes,
				},
				hashSettings: {
					...config.hashSettings,
					...options?.hashSettings,
				},
				on: {
					...config.on,
					...options?.on,
				}
			}
			this.bodyLock = false;
			this.options.init ? this.initPopups() : null
		}
		initPopups() {
			this.eventsPopup();
		}
		eventsPopup() {
			// Клик на всем документе
			document.addEventListener("click", function (e) {
				// Клик по кнопке "открыть"
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
				if (buttonOpen) {
					e.preventDefault();
					this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ?
						buttonOpen.getAttribute(this.options.attributeOpenButton) :
						'error';
					this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ?
						buttonOpen.getAttribute(this.options.youtubeAttribute) :
						null;
					if (this._dataValue !== 'error') {
						if (!this.isOpen) this.lastFocusEl = buttonOpen;
						this.targetOpen.selector = `${this._dataValue}`;
						this._selectorOpen = true;
						this.open();
						return;

					}

					return;
				}
				// Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
				const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
				if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
			}.bind(this));
			// Закрытие по ESC
			document.addEventListener("keydown", function (e) {
				if (this.options.closeEsc && e.which == 27 && e.code === 'Escape' && this.isOpen) {
					e.preventDefault();
					this.close();
					return;
				}
				if (this.options.focusCatch && e.which == 9 && this.isOpen) {
					this._focusCatch(e);
					return;
				}
			}.bind(this))

			// Открытие по хешу
			if (this.options.hashSettings.goHash) {
				// Проверка изменения адресной строки
				window.addEventListener('hashchange', function () {
					if (window.location.hash) {
						this._openToHash();
					} else {
						this.close(this.targetOpen.selector);
					}
				}.bind(this))

				window.addEventListener('load', function () {
					if (window.location.hash) {
						this._openToHash();
					}
				}.bind(this))
			}
		}
		open(selectorValue) {
			if (bodyLockStatus) {
				// Если перед открытием попапа был режим lock
				this.bodyLock = document.documentElement.classList.contains('lock') && !this.isOpen ? true : false;

				// Если ввести значение селектора (селектор настраивается в options)
				if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
					this.targetOpen.selector = selectorValue;
					this._selectorOpen = true;
				}
				if (this.isOpen) {
					this._reopen = true;
					this.close();
				}
				if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
				if (!this._reopen) this.previousActiveElement = document.activeElement;

				this.targetOpen.element = document.querySelector(this.targetOpen.selector);

				if (this.targetOpen.element) {
					// YouTube
					if (this.youTubeCode) {
						const codeVideo = this.youTubeCode;
						const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
						const iframe = document.createElement('iframe');
						iframe.setAttribute('allowfullscreen', '');

						const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
						iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

						iframe.setAttribute('src', urlVideo);

						if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
							const youtubePlace = this.targetOpen.element.querySelector('.popup__text').setAttribute(`${this.options.youtubePlaceAttribute}`, '');
						}
						this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
					}
					if (this.options.hashSettings.location) {
						// Получение хэша и его выставление 
						this._getHash();
						this._setHash();
					}

					// До открытия
					this.options.on.beforeOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("beforePopupOpen", {
						detail: {
							popup: this
						}
					}));

					this.targetOpen.element.classList.add(this.options.classes.popupActive);
					document.documentElement.classList.add(this.options.classes.bodyActive);

					if (!this._reopen) {
						!this.bodyLock ? bodyLock() : null;
					}
					else this._reopen = false;

					this.targetOpen.element.setAttribute('aria-hidden', 'false');

					// Запоминаю это открытое окно. Оно будет последним открытым
					this.previousOpen.selector = this.targetOpen.selector;
					this.previousOpen.element = this.targetOpen.element;

					this._selectorOpen = false;

					this.isOpen = true;

					setTimeout(() => {
						this._focusTrap();
					}, 50);

					// После открытия
					this.options.on.afterOpen(this);
					// Создаем свое событие после открытия попапа
					document.dispatchEvent(new CustomEvent("afterPopupOpen", {
						detail: {
							popup: this
						}
					}));
				}
			}
		}
		close(selectorValue) {
			if (selectorValue && typeof (selectorValue) === "string" && selectorValue.trim() !== "") {
				this.previousOpen.selector = selectorValue;
			}
			if (!this.isOpen || !bodyLockStatus) {
				return;
			}
			// До закрытия
			this.options.on.beforeClose(this);
			// Создаем свое событие перед закрытием попапа
			document.dispatchEvent(new CustomEvent("beforePopupClose", {
				detail: {
					popup: this
				}
			}));

			// YouTube
			if (this.youTubeCode) {
				if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`))
					this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = '';
			}
			this.previousOpen.element.classList.remove(this.options.classes.popupActive);
			// aria-hidden
			this.previousOpen.element.setAttribute('aria-hidden', 'true');
			if (!this._reopen) {
				document.documentElement.classList.remove(this.options.classes.bodyActive);
				!this.bodyLock ? bodyUnlock() : null;
				this.isOpen = false;
			}
			// Очищение адресной строки
			this._removeHash();
			if (this._selectorOpen) {
				this.lastClosed.selector = this.previousOpen.selector;
				this.lastClosed.element = this.previousOpen.element;

			}
			// После закрытия
			this.options.on.afterClose(this);
			// Создаем свое событие после закрытия попапа
			document.dispatchEvent(new CustomEvent("afterPopupClose", {
				detail: {
					popup: this
				}
			}));

			setTimeout(() => {
				this._focusTrap();
			}, 50);
		}
		// Получение хэша 
		_getHash() {
			if (this.options.hashSettings.location) {
				this.hash = this.targetOpen.selector.includes('#') ?
					this.targetOpen.selector : this.targetOpen.selector.replace('.', '#')
			}
		}
		_openToHash() {
			let classInHash = document.querySelector(`.${window.location.hash.replace('#', '')}`) ? `.${window.location.hash.replace('#', '')}` :
				document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` :
					null;

			const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace('.', "#")}"]`);
			if (buttons && classInHash) this.open(classInHash);
		}
		// Утсановка хэша
		_setHash() {
			history.pushState('', '', this.hash);
		}
		_removeHash() {
			history.pushState('', '', window.location.href.split('#')[0])
		}
		_focusCatch(e) {
			const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
			const focusArray = Array.prototype.slice.call(focusable);
			const focusedIndex = focusArray.indexOf(document.activeElement);

			if (e.shiftKey && focusedIndex === 0) {
				focusArray[focusArray.length - 1].focus();
				e.preventDefault();
			}
			if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
				focusArray[0].focus();
				e.preventDefault();
			}
		}
		_focusTrap() {
			const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
			if (!this.isOpen && this.lastFocusEl) {
				this.lastFocusEl.focus();
			} else {
				focusable[0].focus();
			}
		}
	}
	modules.popup = new Popup({});
})();

/* ====================================
// Загрузка изображений и вывод его названия
==================================== */
function uploadImage() {
	const uploads = document.querySelectorAll('.upload');

	uploads.forEach(upload => {
		const uploadInput = upload.querySelector('.upload__input');
		const uploadText = upload.querySelector('.upload__label');
		const uploadLoad = upload.querySelector('.upload__load');
		const uploadDel = upload.querySelector('.upload__del');
		let uploadFiles = "";

		function uploadPicture(file, size, input) {
			// // Проверка на формат
			// if (!['.png', '.pdf', '.ai', '.cdr', '.psd'].includes(file.type)) {
			// 	alert('Выбран неверный формат файла');
			// 	// Очистка
			// 	input.value = '';
			// 	uploadFiles = '';
			// 	input.parentNode.querySelector('.upload__label').innerText = 'Выберите файл в формате png, pdf, ai, cdr, psd';
			// 	return;
			// }
			// // Проверка на размер
			// else 
			if (file.size > size * 1000) {
				alert(`Файл должен быть не более ${size}мб`);
				// Очистка
				input.value = '';
				uploadFiles = '';
				input.parentNode.querySelector('.upload__label').innerText = 'Выберите файл в формате png, pdf, ai, cdr, psd';
				document.documentElement.classList.remove('_file-load')
				return;
			}
			uploadText.innerText = input.value.match(/[\/\\]([\w\d\s\.\-(\)]+)$/)[1];
			document.documentElement.classList.add('_file-load')

			// Удаляем
			uploadDel.addEventListener('click', function () {
				input.value = '';
				uploadFiles = '';
				input.parentNode.querySelector('.upload__label').innerText = 'Выберите файл в формате png, pdf, ai, cdr, psd';
				document.documentElement.classList.remove('_file-load')
			})
		}

		uploadInput.addEventListener('change', function () {
			for (let i = 0; i < uploadInput.files.length; ++i) {
				uploadPicture(uploadInput.files.item(i), 100, uploadInput);
			}
		});
	});
}
if (document.querySelector('.upload')) {
	uploadImage()
}

/* ====================================
Инициализация галереи
==================================== */
/*
data-gallery - блок галереи 
data-gallery-item - блок с картинкой
data-src - ссылка на картинку 
*/
if (document.querySelector('[data-gallery]')) {
	const galleries = document.querySelectorAll('[data-gallery]');
	if (galleries.length) {
		let galleyItems = [];
		galleries.forEach(gallery => {
			galleyItems.push({
				gallery,
				galleryClass: lightGallery(gallery, {
					plugins: [lgZoom],
					licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
					selector: '[data-gallery-item]',
					// Скорость
					speed: 800,
					// Отключить кнопку Скачать
					download: false,
					// Надпись под фото (Вывод атрибута alt у img)
					appendSubHtmlTo: false,
				})
			})
		});
	}
}

/* ====================================
Блок "Показать больше"
==================================== */
function showMore() {
	window.addEventListener("load", function (e) {
		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
		let showMoreBlocksRegular;
		let mdQueriesArray;
		if (showMoreBlocks.length) {
			// Получение обычных объектов
			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
				return !item.dataset.showmoreMedia;
			});
			// Инициализация обычных объектов
			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

			document.addEventListener("click", showMoreActions);
			window.addEventListener("resize", showMoreActions);

			// Получение объектов с медиа запросами
			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Событие
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
				});
				initItemsMedia(mdQueriesArray);
			}
		}
		function initItemsMedia(mdQueriesArray) {
			mdQueriesArray.forEach(mdQueriesItem => {
				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		function initItems(showMoreBlocks, matchMedia) {
			showMoreBlocks.forEach(showMoreBlock => {
				initItem(showMoreBlock, matchMedia);
			});
		}
		function initItem(showMoreBlock, matchMedia = false) {
			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		}
		function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
				const showMoreItems = showMoreContent.children;
				for (let index = 1; index < showMoreItems.length; index++) {
					const showMoreItem = showMoreItems[index - 1];
					hiddenHeight += showMoreItem.offsetHeight;
					if (index == showMoreTypeValue) break
				}
			} else {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
				hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
		}
		function getOriginalHeight(showMoreContent) {
			let parentHidden;
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			if (showMoreContent.closest(`[hidden]`)) {
				parentHidden = showMoreContent.closest(`[hidden]`);
				parentHidden.hidden = false;
			}
			let originalHeight = showMoreContent.offsetHeight;
			parentHidden ? parentHidden.hidden = true : null;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
		}
		function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (targetType === 'click') {
				if (targetEvent.closest('[data-showmore-button]')) {
					const showMoreButton = targetEvent.closest('[data-showmore-button]');
					const showMoreBlock = showMoreButton.closest('[data-showmore]');
					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (!showMoreContent.classList.contains('_slide')) {
						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
						showMoreBlock.classList.toggle('_showmore-active');
					}
				}
			} else if (targetType === 'resize') {
				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
			}
		}
	});
}
showMore()

/* ====================================
Позиция sticky
==================================== */
function sticky() {
	let addWindowScrollEvent = false;
	function stickyBlock() {
		// data-sticky для родителя внутри которого прилипает блок *
		// data-sticky-header для родителя, учитываем высоту хедера
		// data-sticky-top="" для родителя, можно указать отступ сверху
		// data-sticky-bottom="" для родителя, можно указать отступ снизу
		// data-sticky-item для прилипающего блока *
		addWindowScrollEvent = true;

		function stickyBlockInit() {
			const stickyParents = document.querySelectorAll('[data-sticky]');

			if (stickyParents.length) {
				stickyParents.forEach(stickyParent => {
					let stickyConfig = {
						media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
						top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
						bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
						header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header').offsetHeight : 0
					}
					stickyBlockItem(stickyParent, stickyConfig);
				});
			}
		}
		function stickyBlockItem(stickyParent, stickyConfig) {
			const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
			const headerHeight = stickyConfig.header;
			const offsetTop = headerHeight + stickyConfig.top;
			const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

			document.addEventListener("windowScroll", stickyBlockActions);
			window.addEventListener("resize", stickyBlockActions);

			function stickyBlockActions(e) {
				const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
				let stickyItemValues = {
					position: "relative",
					bottom: "auto",
					top: "0px",
					left: "0px",
					width: "auto"
				}
				if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
					// if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
					if (offsetTop + stickyConfig.bottom) {
						if (scrollY >= startPoint && scrollY <= endPoint) {
							stickyItemValues.position = `fixed`;
							stickyItemValues.bottom = `auto`;
							stickyItemValues.top = `${offsetTop}px`;
							stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
							stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
						} else if (scrollY >= endPoint) {
							stickyItemValues.position = `absolute`;
							stickyItemValues.bottom = `${stickyConfig.bottom}px`;
							stickyItemValues.top = `auto`;
							stickyItemValues.left = `0px`;
							stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
						}
					}
				}
				stickyBlockType(stickyBlockItem, stickyItemValues);
			}
		}
		function stickyBlockType(stickyBlockItem, stickyItemValues) {
			stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
		}
		stickyBlockInit();
	}
	stickyBlock()

	// При подключении модуля обработчик события запустится автоматически
	setTimeout(() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", function (e) {
				document.dispatchEvent(windowScroll);
			});
		}
	}, 0);
}
function checkSticky() {
	if (document.querySelector('[data-sticky]') && (window.innerWidth > 1169.98)) {
		sticky()
	}
}
window.addEventListener('load', checkSticky)
window.addEventListener('resize', checkSticky)


/* ====================================
Работа с полями формы
==================================== */
// Работа с полями формы. Добавление классов, работа с placeholder
function formFieldsInit(options = { viewPass: false, autoHeight: false }) {
	// Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		formFields.forEach(formField => {
			if (!formField.hasAttribute('data-placeholder-nohide')) {
				formField.dataset.placeholder = formField.placeholder;
			}
		});
	}
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('_form-focus');
				targetElement.parentElement.classList.add('_form-focus');
			}
			formValidate.removeError(targetElement);
		}
	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('_form-focus');
				targetElement.parentElement.classList.remove('_form-focus');
			}
			// Моментальная валидация
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
	// Если включено, добавляем функционал "Показать пароль"
	if (options.viewPass) {
		document.addEventListener("click", function (e) {
			let targetElement = e.target;
			if (targetElement.closest('[class*="__viewpass"]')) {
				let inputType = targetElement.classList.contains('_viewpass-active') ? "password" : "text";
				targetElement.parentElement.querySelector('input').setAttribute("type", inputType);
				targetElement.classList.toggle('_viewpass-active');
			}
		});
	}
	// Если включено, добавляем функционал "Автовысота"
	if (options.autoHeight) {
		const textareas = document.querySelectorAll('textarea[data-autoheight]');
		if (textareas.length) {
			textareas.forEach(textarea => {
				const startHeight = textarea.hasAttribute('data-autoheight-min') ?
					Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
				const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
					Number(textarea.dataset.autoheightMax) : Infinity;
				setHeight(textarea, Math.min(startHeight, maxHeight))
				textarea.addEventListener('input', () => {
					if (textarea.scrollHeight > startHeight) {
						textarea.style.height = `auto`;
						setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
					}
				});
			});
			function setHeight(textarea, height) {
				textarea.style.height = `${height}px`;
			}
		}
	}

	const formLines = document.querySelectorAll('.form__line');
	formLines.forEach(formLine => {
		const formInput = formLine.querySelector('.rs-input')
		const formClear = formLine.querySelector('.rs-input-clear')
		formInput.addEventListener('input', function () {
			if (formInput.value != '') {
				formClear.style.display = "block";
				formInput.parentElement.classList.add('_form-valid')
			} else {
				formClear.style.display = "none";
				formInput.parentElement.classList.remove('_form-valid')
			}
		})
		if (formClear) {
			formClear.addEventListener('click', function () {
				formInput.value = '';
				formClear.style.display = "none";
				formInput.parentElement.classList.remove('_form-valid')
				formInput.focus()
			})
		}
	});
}
// Валидация форм
let formValidate = {
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
				}
			});
		}
		return error;
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				this.removeRight(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addRight(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			this.removeRight(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				this.removeRight(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
				this.addRight(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_form-error');
		formRequiredItem.parentElement.classList.add('_form-error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_form-error');
		formRequiredItem.parentElement.classList.remove('_form-error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	addRight(formRequiredItem) {
		formRequiredItem.classList.add('_form-right');
		formRequiredItem.parentElement.classList.add('_form-right');
		let inputRight = formRequiredItem.parentElement.querySelector('.form__right');
		if (inputRight) formRequiredItem.parentElement.removeChild(inputRight);
		formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__right"></div>`);
	},
	removeRight(formRequiredItem) {
		formRequiredItem.classList.remove('_form-right');
		formRequiredItem.parentElement.classList.remove('_form-right');
		if (formRequiredItem.parentElement.querySelector('.form__right')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__right'));
		}
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea');
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove('_form-focus');
				el.classList.remove('_form-focus');
				formValidate.removeError(el);
			}
			let checkboxes = form.querySelectorAll('.checkbox__input');
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}
			if (flsModules.select) {
				let selects = form.querySelectorAll('.select');
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select');
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	}
}
function formSubmit() {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				formValidate.formClean(form);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax');
			if (ajax) { // Если режим ajax
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					formSent(form, responseResult);
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			} else if (form.hasAttribute('data-dev')) {	// Если режим разработки
				e.preventDefault();
				formSent(form);
			}
		} else {
			e.preventDefault();
			if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
				gotoBlock(formGoToErrorClass, true, 1000);
			}
		}
	}
	// Действия после отправки формы
	function formSent(form, responseResult = ``) {
		// Создаем событие отправки формы
		document.dispatchEvent(new CustomEvent("formSent", {
			detail: {
				form: form
			}
		}));
		// Показываем попап, если подключен модуль попапов 
		// и для формы указана настройка
		setTimeout(() => {
			if (flsModules.popup) {
				const popup = form.dataset.popupMessage;
				popup ? flsModules.popup.open(popup) : null;
			}
		}, 0);
		// Очищаем форму
		formValidate.formClean(form);
	}
}
formFieldsInit({
	viewPass: false,
	autoHeight: false
});

function showMore() {
	window.addEventListener("load", function (e) {
		const showMoreBlocks = document.querySelectorAll('[data-showmore]');
		let showMoreBlocksRegular;
		let mdQueriesArray;
		if (showMoreBlocks.length) {
			// Получение обычных объектов
			showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
				return !item.dataset.showmoreMedia;
			});
			// Инициализация обычных объектов
			showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

			document.addEventListener("click", showMoreActions);
			window.addEventListener("resize", showMoreActions);

			// Получение объектов с медиа запросами
			mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
			if (mdQueriesArray && mdQueriesArray.length) {
				mdQueriesArray.forEach(mdQueriesItem => {
					// Событие
					mdQueriesItem.matchMedia.addEventListener("change", function () {
						initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
					});
				});
				initItemsMedia(mdQueriesArray);
			}
		}
		function initItemsMedia(mdQueriesArray) {
			mdQueriesArray.forEach(mdQueriesItem => {
				initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
		function initItems(showMoreBlocks, matchMedia) {
			showMoreBlocks.forEach(showMoreBlock => {
				initItem(showMoreBlock, matchMedia);
			});
		}
		function initItem(showMoreBlock, matchMedia = false) {
			showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
			let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
			let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
			showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
			const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
			if (matchMedia.matches || !matchMedia) {
				if (hiddenHeight < getOriginalHeight(showMoreContent)) {
					_slideUp(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = false;
				} else {
					_slideDown(showMoreContent, 0, hiddenHeight);
					showMoreButton.hidden = true;
				}
			} else {
				_slideDown(showMoreContent, 0, hiddenHeight);
				showMoreButton.hidden = true;
			}
		}
		function getHeight(showMoreBlock, showMoreContent) {
			let hiddenHeight = 0;
			const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
			if (showMoreType === 'items') {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
				const showMoreItems = showMoreContent.children;
				for (let index = 1; index < showMoreItems.length; index++) {
					const showMoreItem = showMoreItems[index - 1];
					hiddenHeight += showMoreItem.offsetHeight;
					if (index == showMoreTypeValue) break
				}
			} else {
				const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
				hiddenHeight = showMoreTypeValue;
			}
			return hiddenHeight;
		}
		function getOriginalHeight(showMoreContent) {
			let parentHidden;
			let hiddenHeight = showMoreContent.offsetHeight;
			showMoreContent.style.removeProperty('height');
			if (showMoreContent.closest(`[hidden]`)) {
				parentHidden = showMoreContent.closest(`[hidden]`);
				parentHidden.hidden = false;
			}
			let originalHeight = showMoreContent.offsetHeight;
			parentHidden ? parentHidden.hidden = true : null;
			showMoreContent.style.height = `${hiddenHeight}px`;
			return originalHeight;
		}
		function showMoreActions(e) {
			const targetEvent = e.target;
			const targetType = e.type;
			if (targetType === 'click') {
				if (targetEvent.closest('[data-showmore-button]')) {
					const showMoreButton = targetEvent.closest('[data-showmore-button]');
					const showMoreBlock = showMoreButton.closest('[data-showmore]');
					const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
					const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
					const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
					if (!showMoreContent.classList.contains('_slide')) {
						showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
						showMoreBlock.classList.toggle('_showmore-active');
					}
				}
			} else if (targetType === 'resize') {
				showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
				mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
			}
		}
	});
}
showMore()

/* ====================================
Блок "Количество"
==================================== */
function formQuantity() {
	document.addEventListener("click", function (e) {
		let targetElement = e.target;
		if (targetElement.closest('.quantity__button')) {
			let value = parseInt(targetElement.closest('.quantity').querySelector('input').value);
			if (targetElement.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				--value;
				if (value < 1) value = 1;
			}
			targetElement.closest('.quantity').querySelector('input').value = value;
		}
	});
}
if (document.querySelector('.quantity')) {
	formQuantity()
}

/* ====================================
Позиция sticky
==================================== */
function sticky() {
	let addWindowScrollEvent = false;
	function stickyBlock() {
		// data-sticky для родителя внутри которого прилипает блок *
		// data-sticky-header для родителя, учитываем высоту хедера
		// data-sticky-top="" для родителя, можно указать отступ сверху
		// data-sticky-bottom="" для родителя, можно указать отступ снизу
		// data-sticky-item для прилипающего блока *
		addWindowScrollEvent = true;

		function stickyBlockInit() {
			const stickyParents = document.querySelectorAll('[data-sticky]');

			if (stickyParents.length) {
				stickyParents.forEach(stickyParent => {
					let stickyConfig = {
						media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
						top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
						bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
						header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header').offsetHeight : 0
					}
					stickyBlockItem(stickyParent, stickyConfig);
				});
			}
		}
		function stickyBlockItem(stickyParent, stickyConfig) {
			const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
			const headerHeight = stickyConfig.header;
			const offsetTop = headerHeight + stickyConfig.top;
			const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

			document.addEventListener("windowScroll", stickyBlockActions);
			window.addEventListener("resize", stickyBlockActions);

			function stickyBlockActions(e) {
				const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
				let stickyItemValues = {
					position: "relative",
					bottom: "auto",
					top: "0px",
					left: "0px",
					width: "auto"
				}
				if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
					// if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
					if (offsetTop + stickyConfig.bottom) {
						if (scrollY >= startPoint && scrollY <= endPoint) {
							stickyItemValues.position = `fixed`;
							stickyItemValues.bottom = `auto`;
							stickyItemValues.top = `${offsetTop}px`;
							stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
							stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
						} else if (scrollY >= endPoint) {
							stickyItemValues.position = `absolute`;
							stickyItemValues.bottom = `${stickyConfig.bottom}px`;
							stickyItemValues.top = `auto`;
							stickyItemValues.left = `0px`;
							stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
						}
					}
				}
				stickyBlockType(stickyBlockItem, stickyItemValues);
			}
		}
		function stickyBlockType(stickyBlockItem, stickyItemValues) {
			stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
		}
		stickyBlockInit();
	}
	stickyBlock()

	// При подключении модуля обработчик события запустится автоматически
	setTimeout(() => {
		if (addWindowScrollEvent) {
			let windowScroll = new Event("windowScroll");
			window.addEventListener("scroll", function (e) {
				document.dispatchEvent(windowScroll);
			});
		}
	}, 0);
}
function checkSticky() {
	if (document.querySelector('[data-sticky]') && (window.innerWidth > 1169.98)) {
		sticky()
	}
}
window.addEventListener('load', checkSticky)
window.addEventListener('resize', checkSticky)


/* ====================================
Добавить картинкам draggable="false"
==================================== */
const imgs = document.getElementsByTagName('img');
for (let i = 0; i < imgs.length; i++) {
	imgs[i].setAttribute('draggable', false);
}

// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
	// Получение объектов с медиа запросами
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Инициализация объектов с медиа запросами
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получаем уникальные брейкпоинты
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Работаем с каждым брейкпоинтом
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// Объекты с нужными условиями
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}

// Уникализация массива
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

//========================================================================================================================================================
// Вспомогательные модули блокировки прокрутки
let bodyLockStatus = true;
let bodyLockToggle = (delay = 300) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 300) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			// el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}