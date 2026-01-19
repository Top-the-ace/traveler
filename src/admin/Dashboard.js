import { DataManager } from '../utils/DataManager.js';
import { BlogEditor } from './BlogEditor.js';
import { ResourceEditor } from './ResourceEditor.js';

export function Dashboard(onLogout) {
    const container = document.createElement('div');
    container.className = 'admin-dashboard';

    // Header
    const header = document.createElement('header');
    header.className = 'admin-header';

    const title = document.createElement('h1');
    title.textContent = 'Admin Dashboard';

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'admin-button secondary';
    logoutBtn.onclick = () => {
        DataManager.logout();
        onLogout();
    };

    const backLink = document.createElement('a');
    backLink.textContent = '🏠 Back to Site';
    backLink.href = '/';
    backLink.className = 'admin-link';

    header.appendChild(title);
    header.appendChild(backLink);
    header.appendChild(logoutBtn);

    // Tabs
    const tabs = document.createElement('div');
    tabs.className = 'admin-tabs';

    const contentArea = document.createElement('div');
    contentArea.className = 'admin-content';

    const renderTab = (name, component) => {
        contentArea.innerHTML = '';
        contentArea.appendChild(component);

        document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    };

    const createTabBtn = (name, component, isActive = false) => {
        const btn = document.createElement('button');
        btn.textContent = name;
        btn.className = `admin-tab-btn ${isActive ? 'active' : ''}`;
        btn.onclick = (e) => {
            renderTab(name, component);
            e.target.classList.add('active');
        };
        return btn;
    };

    const blogTab = createTabBtn('Blogs', BlogEditor(), true);
    // Resource editor not fully implemented yet, simplified placeholder
    const resourceTab = createTabBtn('Resources', ResourceEditor());

    tabs.appendChild(blogTab);
    tabs.appendChild(resourceTab);

    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(contentArea);

    // Initial render
    contentArea.appendChild(BlogEditor());

    return container;
}
