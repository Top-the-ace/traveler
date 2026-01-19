import './BlogModal.css';

export function BlogModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Structure
    const content = document.createElement('div');
    content.className = 'modal-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';

    const image = document.createElement('img');
    image.className = 'modal-image';

    const body = document.createElement('div');
    body.className = 'modal-body';

    const date = document.createElement('time');
    date.className = 'modal-date';

    const title = document.createElement('h2');
    title.className = 'modal-title';

    const textContainer = document.createElement('div');
    textContainer.className = 'modal-text';

    // Assembly
    body.appendChild(date);
    body.appendChild(title);
    body.appendChild(textContainer);

    content.appendChild(closeBtn);
    content.appendChild(image);
    content.appendChild(body);
    overlay.appendChild(content);

    // Methods
    const close = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
            image.src = ''; // Clear image to prevent flicker on next open
        }, 300);
    };

    const open = (post) => {
        image.src = post.image;
        image.alt = post.title;
        date.textContent = post.date;
        title.textContent = post.title;
        textContainer.innerHTML = post.content;

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Event Listeners
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            close();
        }
    });

    return {
        element: overlay,
        open
    };
}
