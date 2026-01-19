import './PlannerSection.css';
import { Card } from './Card.js';

export function PlannerSection({ title, step, isOptional = false, id, items, description, isCompleted, onToggle, onAIRequest }) {
    const section = document.createElement('section');
    section.id = id;
    section.className = `planner-section container ${isOptional ? 'optional-step' : ''} ${isCompleted ? 'completed' : ''}`;

    // Step Header
    const header = document.createElement('div');
    header.className = 'planner-header';

    const headerTop = document.createElement('div');
    headerTop.className = 'planner-header-top';

    const stepBadge = document.createElement('div');
    stepBadge.className = 'step-badge';
    stepBadge.textContent = isOptional ? 'Дополнительно' : `Шаг ${step}`;

    // Checkbox
    const checkboxLabel = document.createElement('label');
    checkboxLabel.className = 'planner-checkbox-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted || false;
    checkbox.className = 'planner-checkbox';
    checkbox.onchange = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            section.classList.add('completed');
        } else {
            section.classList.remove('completed');
        }
        if (onToggle) onToggle(isChecked);
    };

    const labelText = document.createElement('span');
    labelText.className = 'planner-checkbox-text';
    labelText.textContent = 'Готово';

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(labelText);

    headerTop.appendChild(stepBadge);
    headerTop.appendChild(checkboxLabel);

    const h2 = document.createElement('h2');
    h2.className = 'planner-title';
    h2.textContent = title;

    const desc = document.createElement('p');
    desc.className = 'planner-description';
    desc.textContent = description;

    header.appendChild(headerTop);
    header.appendChild(h2);
    header.appendChild(desc);

    // AI Button
    if (onAIRequest) {
        const aiButton = document.createElement('button');
        aiButton.className = 'btn btn-sm btn-outline-primary';
        aiButton.textContent = '✨ AI Подборка';
        aiButton.style.marginTop = '1rem';

        aiButton.onclick = async () => {
            aiButton.disabled = true;
            aiButton.textContent = 'Думаю...';
            const recommendations = await onAIRequest();
            aiButton.textContent = '✨ Обновить подборку';
            aiButton.disabled = false;

            // Append new items
            recommendations.forEach((item, index) => {
                const cardWrapper = document.createElement('div');
                cardWrapper.className = 'card-wrapper animate-fade-in';
                cardWrapper.appendChild(Card(item));
                grid.insertBefore(cardWrapper, grid.firstChild); // Add to top
            });
        };
        header.appendChild(aiButton);
    }

    // Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    section.appendChild(header);
    observer.observe(header);

    // Grid
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
