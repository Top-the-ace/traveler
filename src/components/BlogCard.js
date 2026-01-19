import './BlogCard.css';

export function BlogCard(post, onReadMore) {
    const article = document.createElement('article');
    article.className = 'blog-card';

    const image = document.createElement('img');
    image.src = post.image;
    image.alt = post.title;
    image.className = 'blog-card-image';
    image.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'blog-card-content';

    const date = document.createElement('time');
    date.className = 'blog-card-date';
    date.textContent = post.date;

    const title = document.createElement('h3');
    title.className = 'blog-card-title';
    title.textContent = post.title;

    const excerpt = document.createElement('p');
    excerpt.className = 'blog-card-excerpt';
    excerpt.textContent = post.excerpt;

    const button = document.createElement('button');
    button.className = 'blog-card-button';
    button.textContent = 'Читать далее';
    button.onclick = () => onReadMore(post);

    content.appendChild(date);
    content.appendChild(title);
    content.appendChild(excerpt);
    content.appendChild(button);

    article.appendChild(image);
    article.appendChild(content);

    return article;
}
