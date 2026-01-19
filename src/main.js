import './style.css';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { Footer } from './components/Footer.js';
import { PlannerSection } from './components/PlannerSection.js';
import { DestinationSelector } from './components/DestinationSelector.js';
import { BlogSection } from './components/BlogSection.js';
import { BlogModal } from './components/BlogModal.js';
import { DataManager } from './utils/DataManager.js';
import { AIRecommendationService } from './services/AIRecommendationService.js';

const app = document.querySelector('#app');

// Router Logic
const router = () => {
  app.innerHTML = '';
  const hash = window.location.hash;

  if (hash === '#admin') {
    import('./admin/AdminApp.js').then(module => {
      app.appendChild(module.AdminApp());
    });
  } else {
    renderApp();
  }
};

// Helper to append components (Original App Logic)
const renderApp = () => {
  const main = document.createElement('main');

  // Header
  app.appendChild(Header());

  // Main Content
  // Blog Modal
  const blogModal = BlogModal();
  document.body.appendChild(blogModal.element);

  // Blog Section
  const blogs = DataManager.getBlogs();
  main.appendChild(BlogSection({
    title: 'Блог путешественника',
    id: 'blog',
    posts: blogs,
    onPostClick: (post) => blogModal.open(post)
  }));

  // State
  let currentDestination = DataManager.getCurrentDestination();

  // Hero Section with Selector
  const hero = Hero();
  const selector = DestinationSelector({
    destinations: DataManager.getDestinations(),
    onSelect: (destId) => {
      DataManager.setDestination(destId);
      currentDestination = DataManager.getCurrentDestination();
      renderPlanner(); // Re-render planner on change

      // Scroll to planner
      const planner = document.querySelector('.planner-container');
      if (planner) {
        planner.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Inject selector into Hero
  hero.querySelector('.hero-content').appendChild(selector);
  main.appendChild(hero);

  // Planner Container
  const plannerContainer = document.createElement('div');
  plannerContainer.className = 'planner-container';
  main.appendChild(plannerContainer);

  const renderPlanner = () => {
    plannerContainer.innerHTML = ''; // Clear previous
    if (!currentDestination) return; // Wait for selection

    const resources = DataManager.getResources();
    const progress = DataManager.getProgress();

    // Helper: Filter by Type
    const filter = (items) => items.filter(item =>
      !item.type || item.type === 'all' ||
      (currentDestination.type === 'domestic' && item.type === 'domestic') ||
      (currentDestination.type === 'international' && item.type === 'international')
    ).map(item => ({
      ...item,
      url: item.getUrl ? item.getUrl(currentDestination) : item.url // Dynamic URL
    }));

    // Step 1: Transport
    plannerContainer.appendChild(PlannerSection({
      title: `Транспорт в ${currentDestination.name}`,
      step: 1,
      id: 'transport',
      items: filter(resources.flights),
      description: `Поиск билетов в ${currentDestination.name}.`,
      isCompleted: progress['transport'],
      onToggle: () => DataManager.toggleProgress('transport')
    }));

    // Step 2: Accommodation
    plannerContainer.appendChild(PlannerSection({
      title: 'Проживание',
      step: 2,
      id: 'accommodation',
      items: filter(resources.hotels),
      description: `Где остановиться в ${currentDestination.name}?`,
      isCompleted: progress['accommodation'],
      onToggle: () => DataManager.toggleProgress('accommodation')
    }));

    // Step 3: Insurance
    plannerContainer.appendChild(PlannerSection({
      title: 'Страховка',
      step: 3,
      isOptional: true,
      id: 'insurance',
      items: filter(resources.insurance),
      description: 'Безопасность превыше всего.',
      isCompleted: progress['insurance'],
      onToggle: () => DataManager.toggleProgress('insurance')
    }));

    // Step 4: Visa (Only for International)
    if (currentDestination.type === 'international') {
      plannerContainer.appendChild(PlannerSection({
        title: 'Виза',
        step: 4,
        isOptional: true,
        id: 'visa',
        items: filter(resources.visa),
        description: `Проверьте визовые требования для ${currentDestination.country}.`,
        isCompleted: progress['visa'],
        onToggle: () => DataManager.toggleProgress('visa')
      }));
    }

    // Step 5: Activities
    plannerContainer.appendChild(PlannerSection({
      title: 'Развлечения',
      step: currentDestination.type === 'international' ? 5 : 4, // Adjust numbering
      isOptional: true,
      id: 'activities',
      items: filter(resources.activities),
      description: 'Добавьте яркости в поездку!',
      isCompleted: progress['activities'],
      onToggle: () => DataManager.toggleProgress('activities'),
      onAIRequest: () => AIRecommendationService.getRecommendations(currentDestination)
    }));

    // Step 6: Tours
    plannerContainer.appendChild(PlannerSection({
      title: 'Готовые туры',
      step: currentDestination.type === 'international' ? 6 : 5,
      isOptional: true,
      id: 'tours',
      items: filter(resources.tours),
      description: 'Или выберите готовый тур.',
      isCompleted: progress['tours'],
      onToggle: () => DataManager.toggleProgress('tours')
    }));
  };

  // Initial Render if destination exists
  if (currentDestination) {
    // Pre-select in dropdown logic would go here, skipping for brevity
    renderPlanner();
  }

  app.appendChild(main);

  // Footer
  app.appendChild(Footer());
};

// Initialize
window.addEventListener('hashchange', router);
router(); // Initial call

