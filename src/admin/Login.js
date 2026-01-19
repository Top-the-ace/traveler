import { DataManager } from '../utils/DataManager.js';

export function Login(onLoginSuccess) {
    const container = document.createElement('div');
    container.className = 'admin-login-container';

    const form = document.createElement('form');
    form.className = 'admin-login-form';

    const title = document.createElement('h2');
    title.textContent = 'Admin Login';

    const input = document.createElement('input');
    input.type = 'password';
    input.placeholder = 'Password';
    input.className = 'admin-input';

    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Login';
    button.className = 'admin-button';

    const errorMsg = document.createElement('p');
    errorMsg.className = 'error-message';
    errorMsg.style.display = 'none';

    form.onsubmit = (e) => {
        e.preventDefault();
        if (DataManager.login(input.value)) {
            onLoginSuccess();
        } else {
            errorMsg.textContent = 'Invalid password';
            errorMsg.style.display = 'block';
        }
    };

    form.appendChild(title);
    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(errorMsg);
    container.appendChild(form);

    return container;
}
