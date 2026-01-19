import { DataManager } from '../utils/DataManager.js';

export function BlogEditor() {
    const container = document.createElement('div');

    const renderList = () => {
        container.innerHTML = '';

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.marginBottom = '2rem';

        const title = document.createElement('h2');
        title.textContent = 'Manage Blogs';

        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add New Post';
        addBtn.className = 'admin-button';
        addBtn.onclick = () => renderForm({});

        header.appendChild(title);
        header.appendChild(addBtn);
        container.appendChild(header);

        const list = document.createElement('div');
        list.className = 'editor-list';

        const posts = DataManager.getBlogs();
        posts.forEach(post => {
            const item = document.createElement('div');
            item.className = 'editor-item';

            const info = document.createElement('span');
            info.textContent = post.title;

            const actions = document.createElement('div');
            actions.className = 'editor-actions';
            actions.style.marginTop = '0';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'admin-button secondary';
            editBtn.onclick = () => renderForm(post);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'admin-button';
            deleteBtn.style.backgroundColor = '#ef4444';
            deleteBtn.onclick = () => {
                if (confirm('Are you sure?')) {
                    DataManager.deleteBlogPost(post.id);
                    renderList();
                }
            };

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            item.appendChild(info);
            item.appendChild(actions);
            list.appendChild(item);
        });

        container.appendChild(list);
    };

    const renderForm = (post) => {
        container.innerHTML = '';
        const form = document.createElement('div');
        form.className = 'editor-form';

        const title = document.createElement('h2');
        title.textContent = post.id ? 'Edit Post' : 'New Post';

        const createInput = (label, value, key, type = 'text') => {
            const group = document.createElement('div');
            group.className = 'form-group';

            const labelEl = document.createElement('label');
            labelEl.textContent = label;

            let input;
            if (type === 'textarea') {
                input = document.createElement('textarea');
            } else {
                input = document.createElement('input');
                input.type = type;
            }
            input.className = 'admin-input';
            input.value = value || '';
            input.onchange = (e) => { post[key] = e.target.value; };

            group.appendChild(labelEl);
            group.appendChild(input);
            return group;
        };

        form.appendChild(title);
        form.appendChild(createInput('Title', post.title, 'title'));
        form.appendChild(createInput('Excerpt', post.excerpt, 'excerpt'));
        form.appendChild(createInput('Image URL', post.image, 'image'));
        form.appendChild(createInput('Content (HTML)', post.content, 'content', 'textarea'));

        // Auto-set date for new posts
        if (!post.date) {
            const now = new Date();
            post.date = `${now.getDate()} Января ${now.getFullYear()}`;
        }

        const actions = document.createElement('div');
        actions.className = 'editor-actions';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'admin-button secondary';
        cancelBtn.onclick = renderList;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'admin-button';
        saveBtn.onclick = () => {
            DataManager.saveBlogPost(post);
            renderList();
        };

        actions.appendChild(cancelBtn);
        actions.appendChild(saveBtn);
        form.appendChild(actions);

        container.appendChild(form);
    };

    renderList();
    return container;
}
