export const AIRecommendationService = {
    getRecommendations: async (destination) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock response based on destination
        const recommendations = [
            {
                name: `Лучшее в ${destination.name}е`, // Basic grammar check usually needed but keeping simple
                description: `Эксклюзивный тур по главным достопримечательностям.`,
                url: `https://experience.tripster.ru/experience/${destination.id}/`,
                icon: '✨'
            },
            {
                name: `Гастро-тур (${destination.name})`,
                description: 'Попробуйте местную кухню в лучших ресторанах.',
                url: `https://www.sputnik8.com/ru/${destination.id}/category/gastro`,
                icon: '🍽️'
            },
            {
                name: `Скрытые места`,
                description: 'Узнайте секреты города, о которых не знают туристы.',
                url: `https://www.sputnik8.com/ru/${destination.id}/category/unusual`,
                icon: '🔍'
            }
        ];

        return recommendations;
    }
};
