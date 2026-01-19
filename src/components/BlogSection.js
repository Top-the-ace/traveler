import './BlogSection.css';
import { BlogCard } from './BlogCard.js';

export function BlogSection({ title, id, posts, onPostClick }) {
    const section = document.createElement('section');
    section.id = id;
    section.className = 'category-section container blog-section';

    const h2 = document.createElement('h2');
    h2.className = 'section-title';
    h2.textContent = title;

    // Observer for animation
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
    grid.className = 'blog-grid';

    posts.forEach((post, index) => {
        const cardWrapper = document.createElement('div');
        cardWrapper.style.transitionDelay = `${index * 100}ms`;
        cardWrapper.className = 'card-wrapper'; // Reuse existing animation class

        cardWrapper.appendChild(BlogCard(post, onPostClick));

        grid.appendChild(cardWrapper);
        observer.observe(cardWrapper);
    });

    section.appendChild(grid);
    return section;
}
