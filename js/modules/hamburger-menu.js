const menuOptions = {
  'default': [
    { label: 'About me', href: '/about-me/'}
  ],
  'about-me': [
    { label: 'Home', href: '/'},
  ]
}

const menuStyles = new CSSStyleSheet();
menuStyles.replaceSync(`
  :host {
    display: block;
    --hamburger-color: var(--color-text);
  }

  li {
    padding: 10px;
    font-family: 'Lato', Arial, Helvetica, sans-serif;
    font-size: 18px;
    text-transform: uppercase;
    font-weight: 400;
    letter-spacing: 1px;
    border: 0px;
    margin: 0px;
  }

  .menu-container {
    position: fixed;
    top: 15px;
    left: 15px;
  }

  .hamburger {
    width: 3rem;
    aspect-ratio: 1;
    border: none;
    background: #222;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
  }

  .hamburger span {
    position: absolute;
    width: 60%;
    height: 2px;
    background: white;
    border-radius: 0.1rem;
    transform-origin: center;
    left: 20%;
    transition: transform  0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease;
  }
  
  /* POSIZIONAMENTO INIZIALE (3 LINEE) */
  .hamburger span:nth-child(1) { top: 30%; transform: translateY(-50%); }
  .hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
  .hamburger span:nth-child(3) { top: 70%; transform: translateY(-50%); }

  .hamburger.is-active span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  .hamburger.is-active span:nth-child(2) {
    opacity: 0;
    /*transform: translate(-20px, -50%);*/ /* Scivola via mentre sparisce */
  }

  .hamburger.is-active span:nth-child(3) {
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }

  /* Dropdown menu */
  .dropdown {
    display: none;
    position: absolute;
    left: 0;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    min-width: 150px;
    overflow: hidden;
  }

  .dropdown ul {
    padding-inline-start: 0%;
  }

  .dropdown ul li {
    margin: 10px 0;
    padding: 5px;
    background: #222;
    border-radius: 15px;
    font-size: 12px;
  }

  /* Dropdown links */
  .dropdown a {
    display: block;
    padding: 12px;
    text-decoration: none;
    color: white;
  }

  /* Show menu */
  .dropdown.show {
    display: block;
  }
`);

class HamburgerMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [menuStyles];
  }
  connectedCallback() {
    this.render();

    this._initElements();
    this._addEventListeners();
  }

  _initElements() {
    this.nav = this.shadowRoot.querySelector('[data-js-trigger="menu-toggle"]');
    this.dropdown = this.shadowRoot.querySelector('[data-js-menu="dropdown-options"]');
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
    this.shadowRoot.innerHTML = `
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