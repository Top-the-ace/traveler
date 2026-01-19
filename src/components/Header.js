import './Header.css';

export function Header() {
  const header = document.createElement('header');
  header.className = 'site-header';

  header.innerHTML = `
    <div class="container header-content">
      <a href="/" class="logo animate-fade-in">Traveler</a>
      <nav class="main-nav animate-slide-in">
        <ul class="nav-list">
          <li><a href="#flights" class="nav-link">Авиабилеты</a></li>
          <li><a href="#hotels" class="nav-link">Отели</a></li>
          <li><a href="#activities" class="nav-link">Развлечения</a></li>
        </ul>
      </nav>
      <!-- Mobile menu button placeholder -->
    </div>
  `;

  return header;
}
