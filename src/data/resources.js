export const resources = {
    flights: [
        {
            name: "Aviasales",
            description: "Крупнейший поисковик авиабилетов.",
            url: "https://www.aviasales.ru",
            icon: "✈️",
            getUrl: (dest) => dest ? `https://www.aviasales.ru/search/MOW${dest.code}1` : "https://www.aviasales.ru"
        },
        {
            name: "Tutu.ru",
            description: "Популярный сервис для покупки билетов.",
            url: "https://www.tutu.ru",
            icon: "🚆",
            getUrl: (dest) => dest ? `https://avia.tutu.ru/offers/?passengers=100&route[0]=MOW-${dest.code}&class=Y` : "https://www.tutu.ru"
        },
        {
            name: "OneTwoTrip",
            description: "Удобный сервис для планирования.",
            url: "https://www.onetwotrip.com",
            icon: "🧳",
            getUrl: (dest) => dest ? `https://www.onetwotrip.com/ru/flights/MOW-${dest.code}/` : "https://www.onetwotrip.com"
        }
    ],
    hotels: [
        {
            name: "Ostrovok",
            description: "Отели по всему миру (принимают карты РФ).",
            url: "https://ostrovok.ru",
            icon: "🏨",
            getUrl: (dest) => dest ? `https://ostrovok.ru/?q=${encodeURIComponent(dest.name)}` : "https://ostrovok.ru"
        },
        {
            name: "Яндекс Путешествия",
            description: "Отели и билеты с кэшбэком.",
            url: "https://travel.yandex.ru",
            icon: "YA",
            getUrl: (dest) => dest ? `https://travel.yandex.ru/hotels/?geoId=${dest.id === 'sochi' ? 239 : ''}` : "https://travel.yandex.ru" // Mocking geoId for simplicity
        },
        {
            name: "Суточно.ру",
            description: "Аренда квартир (актуально для РФ).",
            url: "https://sutochno.ru",
            icon: "🏠",
            type: 'domestic'
        }
    ],
    activities: [
        {
            name: "Sputnik8",
            description: "Экскурсии по всему миру.",
            url: "https://www.sputnik8.com",
            icon: "🌍",
            getUrl: (dest) => dest ? `https://www.sputnik8.com/ru/${dest.id}` : "https://www.sputnik8.com"
        },
        {
            name: "Tripster",
            description: "Необычные экскурсии.",
            url: "https://experience.tripster.ru",
            icon: "🚶",
            getUrl: (dest) => dest ? `https://experience.tripster.ru/experience/${dest.id}/` : "https://experience.tripster.ru"
        }
    ],
    insurance: [
        {
            name: "Cherehapa",
            description: "Сравнение страховок.",
            url: "https://cherehapa.ru",
            icon: "🛡️"
        }
    ],
    visa: [
        {
            name: "Visasam.ru",
            description: "Гайды по визам.",
            url: "https://visasam.ru",
            icon: "🛂",
            type: 'international'
        }
    ],
    tours: [
        {
            name: "Level.travel",
            description: "Поиск туров онлайн.",
            url: "https://level.travel",
            icon: "🏖️",
            getUrl: (dest) => dest ? `https://level.travel/search/${dest.country}` : "https://level.travel"
        }
    ]
};
