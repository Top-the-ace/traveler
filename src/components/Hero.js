import './Hero.css';

export function Hero() {
  const section = document.createElement('section');
  section.className = 'hero-section';

  section.innerHTML = `
    <div class="container hero-content">
      <h1 class="hero-title animate-fade-in">Собери свое идеальное путешествие</h1>
      <p class="hero-subtitle animate-slide-in">Пошаговый план: от поиска билетов до незабываемых впечатлений. Твой конструктор приключений.</p>
      <!-- Selector will be injected here -->
    </div>
  `;

  return section;
}
