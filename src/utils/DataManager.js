import { blogPosts as initialBlogs } from '../data/blog.js';
import { resources as initialResources } from '../data/resources.js';
import { destinations } from '../data/destinations.js';

const STORAGE_KEYS = {
    RESOURCES: 'traveler_resources',
    BLOGS: 'traveler_blogs',
    DESTINATION: 'traveler_destination'
};

export const DataManager = {
    // Destinations
    getDestinations: () => destinations,

    getCurrentDestination: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.DESTINATION);
        return stored ? JSON.parse(stored) : null;
    },

    setDestination: (destinationId) => {
        const dest = destinations.find(d => d.id === destinationId);
        if (dest) {
            localStorage.setItem(STORAGE_KEYS.DESTINATION, JSON.stringify(dest));
            window.dispatchEvent(new CustomEvent('destination-changed', { detail: dest }));
        }
    },

    // Blogs
    getBlogs: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.BLOGS);
        if (stored) {
            return JSON.parse(stored);
        }
        return initialBlogs;
    },

    saveBlogs: (blogs) => {
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        // Dispatch event for reactive updates if needed
        window.dispatchEvent(new CustomEvent('data-updated'));
    },

    saveBlogPost: (post) => {
        const blogs = DataManager.getBlogs();
        const index = blogs.findIndex(b => b.id === post.id);

        if (index >= 0) {
            blogs[index] = post;
        } else {
            post.id = Date.now(); // Simple ID generation
            blogs.push(post);
        }
        DataManager.saveBlogs(blogs);
    },

    deleteBlogPost: (id) => {
        const blogs = DataManager.getBlogs().filter(b => b.id !== id);
        DataManager.saveBlogs(blogs);
    },

    // Resources
    getResources: () => {
        const stored = localStorage.getItem(STORAGE_KEYS.RESOURCES);
        if (stored) {
            return JSON.parse(stored);
        }
        return initialResources;
    },

    saveResources: (resources) => {
        localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
        window.dispatchEvent(new CustomEvent('data-updated'));
    },

    // Progress
    getProgress: () => {
        const stored = localStorage.getItem('traveler_progress');
        return stored ? JSON.parse(stored) : {};
    },

    saveProgress: (progress) => {
        localStorage.setItem('traveler_progress', JSON.stringify(progress));
    },

    toggleProgress: (stepId) => {
        const progress = DataManager.getProgress();
        progress[stepId] = !progress[stepId];
        DataManager.saveProgress(progress);
        return progress[stepId];
    },

    // Auth (Mock)
    login: (password) => {
        if (password === 'admin123') {
            localStorage.setItem('admin_session', 'true');
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem('admin_session');
        window.location.reload();
    },

    isLoggedIn: () => {
        return localStorage.getItem('admin_session') === 'true';
    }
};
