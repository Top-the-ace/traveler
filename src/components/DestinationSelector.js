import './DestinationSelector.css';

export function DestinationSelector({ destinations, onSelect }) {
    const container = document.createElement('div');
    container.className = 'destination-selector-container';

    // State
    let selectedContinent = '';
    let selectedCountry = '';

    // Create Generic Select Helper
    const createSelect = (id, labelText, options, onChange, disabled = false) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'selector-wrapper';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.className = 'selector-label';

        const select = document.createElement('select');
        select.className = 'destination-select';
        select.id = id;
        select.disabled = disabled;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Выберите...';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        select.appendChild(defaultOption);

        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => onChange(e.target.value));

        wrapper.appendChild(label);
        wrapper.appendChild(select);
        return wrapper;
    };

    // Render Function
    const render = () => {
        container.innerHTML = ''; // Clear

        // 1. Continents
        const continents = [...new Set(destinations.map(d => d.continent))].filter(Boolean);
        const continentOptions = continents.map(c => ({ value: c, text: c }));

        const continentSelect = createSelect(
            'continent-select',
            '1. Континент',
            continentOptions,
            (val) => {
                selectedContinent = val;
                selectedCountry = ''; // Reset country
                render(); // Re-render next steps
            }
        );
        // Retain selection
        if (selectedContinent) {
            // Need to set value after creation
            setTimeout(() => {
                const el = continentSelect.querySelector('select');
                if (el) el.value = selectedContinent;
            }, 0);
        }

        container.appendChild(continentSelect);

        // 2. Countries
        if (selectedContinent) {
            const countries = [...new Set(destinations
                .filter(d => d.continent === selectedContinent)
                .map(d => d.country))];
            const countryOptions = countries.map(c => ({ value: c, text: c }));

            const countrySelect = createSelect(
                'country-select',
                '2. Страна',
                countryOptions,
                (val) => {
                    selectedCountry = val;
                    render();
                }
            );

            if (selectedCountry) {
                setTimeout(() => {
                    const el = countrySelect.querySelector('select');
                    if (el) el.value = selectedCountry;
                }, 0);
            }

            container.appendChild(countrySelect);
        }

        // 3. Cities
        if (selectedCountry) {
            const cities = destinations.filter(d => d.country === selectedCountry);
            const cityOptions = cities.map(c => ({ value: c.id, text: c.name }));

            const citySelect = createSelect(
                'city-select',
                '3. Город',
                cityOptions,
                (val) => {
                    if (val) onSelect(val);
                }
            );
            container.appendChild(citySelect);
        }
    };

    render();
    return container;
}
