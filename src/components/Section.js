import './Section.css';
import { Card } from './Card.js';

export function Section({ title, id, items }) {
    const section = document.createElement('section');
    section.id = id;
    section.className = 'category-section container';

    const h2 = document.createElement('h2');
    h2.className = 'section-title';
    h2.textContent = title;

    // Observer for animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    section.appendChild(h2);
    observer.observe(h2);

    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    items.forEach((item, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.style.transitionDelay = `${index * 100}ms`;
        cardWrapper.className = 'card-wrapper';
        cardWrapper.appendChild(Card(item));
        grid.appendChild(cardWrapper);
        observer.observe(cardWrapper);
    });

    section.appendChild(grid);
    return section;
}
