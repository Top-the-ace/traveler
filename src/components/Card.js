import './Card.css';

export function Card({ name, description, url, icon }) {
    const card = document.createElement('a');
    card.href = url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'resource-card glass-panel hover-lift';

    card.innerHTML = `
    <div class="card-icon">${icon}</div>
    <div class="card-content">
      <h3 class="card-title">${name}</h3>
      <p class="card-description">${description}</p>
    </div>
    <div class="card-arrow">→</div>
  `;

    return card;
}
