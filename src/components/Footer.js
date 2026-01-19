import './Footer.css';

export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container footer-content">
      <div class="footer-brand">
        <span class="logo footer-logo">Traveler</span>
        <p>Ваш гид по самостоятельным путешествиям.</p>
      </div>
      <div class="footer-links">
        <a href="#">Политика конфиденциальности</a>
        <a href="#">Условия использования</a>
        <a href="#">Контакты</a>
      </div>
      <div class="footer-copyright">
        &copy; ${year} Traveler. Все права защищены.
      </div>
    </div>
  `;

  return footer;
}
