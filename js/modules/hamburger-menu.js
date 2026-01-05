const menuOptions = {
  'default': [
    { label: 'About me', href: '/about-me/'}
  ],
  'about-me': [
    { label: 'Home', href: '/'},
  ]
}

class HamburgerMenu extends HTMLElement {
  connectedCallback() {
    this.render();

    this._initElements();
    this._addEventListeners();
  }

  _initElements() {
    this.nav = this.querySelector('[data-js-trigger="menu-toggle"]');
    this.dropdown = this.querySelector('[data-js-menu="dropdown-options"]');
  }

  _addEventListeners() {
    if (!this.nav || !this.dropdown) return;

    this.nav.addEventListener('click', (e) => this._handleNavClick(e));
    document.addEventListener('click', (e) => this._handleDocumentClick(e));
  }

  _openMenu() {
    this.nav.classList.add('is-active');
    this.dropdown.classList.add('show');
  };

  _closeMenu() {
    this.nav.classList.remove('is-active');
    this.dropdown.classList.remove('show');
  };

  showOptions() {
    const path = window.location.pathname;

    const dropdownOptions = path.includes('about-me') ? menuOptions['about-me'] : menuOptions['default'];
    return dropdownOptions.map((opt) => {
      return `
        <li>
          <a href="${opt.href}">${opt.label}</a>
        </li>
      `;
    }).join('');
  }

  _handleNavClick(e) {
    e.stopPropagation();
    const isShown = this.dropdown.classList.contains('show');
    isShown ? this._closeMenu() : this._openMenu();
  }

  _handleDocumentClick(e) {
    if (!this.contains(e.target)) {
      this._closeMenu();
    }
    // if (!nav.contains(e.target) && !dropdown.classList.contains('show')) closeMenu();
  };

  render() {
    this.innerHTML = `
      <div class='menu-container'>
        <button
          class='hamburger'
          type='button'
          data-js-trigger='menu-toggle'
          aria-label='Open menu'
          aria-expanded='false'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class='dropdown' data-js-menu='dropdown-options'>
          <ul>
            ${this.showOptions()}
          </ul>
        </nav>
      </div>
    `;
  }
}

customElements.define('hamburger-menu', HamburgerMenu)