import { DataManager } from '../utils/DataManager.js';
import { Login } from './Login.js';
import { Dashboard } from './Dashboard.js';
import './admin.css';

export function AdminApp() {
    const container = document.createElement('div');
    container.className = 'admin-app';

    const render = () => {
        container.innerHTML = '';
        if (DataManager.isLoggedIn()) {
            container.appendChild(Dashboard(render));
        } else {
            container.appendChild(Login(render));
        }
    };

    render();
    return container;
}
