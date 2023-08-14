class Slider {
  static #content = null // відповідає за посилання
  static #left = null // відповідає за кнопку
  static #right = null // відповідає за кнопку

  static #count = 1 // відповідає за номер наявного зображення
  static #max = null // відповідає за загальну кількість зображень

  static init = () => {
    this.#content = document.querySelector(
      '.slider__content',
    )

    this.#left = document.querySelector(
      '.slider__button--left',
    )

    this.#right = document.querySelector(
      '.slider__button--right',
    )

    this.#max = this.#content.childElementCount

    this.#left.onclick = () => this.#slide('left')
    this.#right.onclick = () => this.#slide('right')
  }

  static #slide = (side) => {
    const offsetWidth = this.#content.offsetWidth // ширина картинки
    const scrollLeft = this.#content.scrollLeft // прокручування від лівого краю
    const scrollWidth = this.#content.scrollWidth // загальна ширина прокручуваняя

    let scroll = 0

    // варіант з #count, без використання scrollLeft та scrollWidth або ("||") варіант з використанням scrollLeft та scrollWidth без #count
    //----------------------------------------------------
    if (side === 'left') {
      if (this.#count === 1 || scrollLeft === 0) {
        this.#count = this.#max
        scroll = (this.#count - 1) * offsetWidth
      } else {
        this.#count -= 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }

    if (side === 'right') {
      if (
        this.#count === this.#max ||
        scrollLeft === scrollWidth - offsetWidth
      ) {
        this.#count = 1
        scroll = 0
      } else {
        this.#count += 1
        scroll = (this.#count - 1) * offsetWidth
      }
    }
    //----------------------------------------------------

    this.#content.scrollTo({
      top: 0,
      left: scroll,
      behavior: 'smooth',
    })
  }
}

Slider.init()

class Header {
  static #height = null // висота нижнього меню
  static #wrapper = null // вспливаюче вікно
  static #button = null // кнопка, яка закриває та відкриває додаткове меню

  static #isOpen = false

  static init() {
    this.#height = document.querySelector(
      '.header__bottom',
    ).offsetHeight

    this.#wrapper = document.querySelector(
      '.header__wrapper',
    )

    this.#button = document.querySelector('.header__button')

    this.#button.onclick = this.#toggle
  }

  static #toggle = () => {
    if (this.#isOpen) {
      this.#button.classList.replace(
        'header__button--close',
        'header__button--open',
      )

      this.#wrapper.style.height = 0
    } else {
      this.#button.classList.replace(
        'header__button--open',
        'header__button--close',
      )

      this.#wrapper.style.height = `${this.#height}px`
    }

    this.#isOpen = !this.#isOpen
  }
}

Header.init()
