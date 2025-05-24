
// Service provider data
let serviceProviders = []


// Fetch data using Fetch API
window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            serviceProviders = data.map((company, idx) => ({
                id: idx.toString(),
                name: company.name,
                rating: company.rating,
                maxRating: 5,
                description: company.description,
                projects: company.projects,
                experience: company.years_experience,
                priceRange: company.price_level,
                phone1: company.contacts[0] || '',
                phone2: company.contacts[1] || '',
                showDetails: true,
                isShortlisted: false
            }));
            renderProviders();
        })
        .catch(err => {
            console.error("Failed to fetch:", err);
            emptyState.textContent = "Failed to load service providers.";
            emptyState.classList.remove('hidden');
        });
});

// State management
let activeTab = 'Portfolios';
let showShortlistedOnly = false;

// DOM elements
const providersContainer = document.getElementById('providersContainer');
const emptyState = document.getElementById('emptyState');
const shortlistFilter = document.getElementById('shortlistFilter');

// Helper functions
function renderStars(rating, maxRating = 5) {
    let starsHTML = '';
    for (let i = 0; i < maxRating; i++) {
        const isFilled = i < Math.floor(rating);
        const isHalfFilled = i < rating && i >= Math.floor(rating);
        starsHTML += `<svg class="w-4 h-4 star ${isFilled ? 'filled' : ''}" fill="${isFilled ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>`;
    }
    return starsHTML;
}

function createServiceProviderCard(provider, index) {
    const cardColorClass = index % 2 === 0 ? 'card-cream' : 'card-white';
    
    return `
        <div class="provider-card ${cardColorClass}">
            <div class="card-content">
                <div class="card-main">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 mb-1">${provider.name}</h3>
                            <div class="flex items-center space-x-1 mb-2">
                                ${renderStars(provider.rating, provider.maxRating)}
                            </div>
                        </div>
                        ${provider.showDetails ? `
                            <button class="details-button">
                                Details
                                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        ` : ''}
                    </div>

                    <p class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">${provider.description}</p>

                    <div class="flex justify-between items-center mb-4">
                        <div class="text-center">
                            <div class="text-xl md:text-2xl font-bold text-gray-900">${provider.projects}</div>
                            <div class="text-xs text-gray-500">Projects</div>
                        </div>
                        <div class="text-center">
                            <div class="text-xl md:text-2xl font-bold text-gray-900">${provider.experience}</div>
                            <div class="text-xs text-gray-500">Years</div>
                        </div>
                        <div class="text-center">
                            <div class="text-xl md:text-2xl font-bold text-gray-900">${provider.priceRange}</div>
                            <div class="text-xs text-gray-500">Price</div>
                        </div>
                    </div>

                    <div class="space-y-2 mb-4">
                        <div class="flex items-center justify-between">
                            <a href="tel:${provider.phone1}" class="text-gray-700 text-sm md:text-base font-medium flex items-center">
                                <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                ${provider.phone1}
                            </a>
                        </div>
                        <div class="flex items-center justify-between">
                            <a href="tel:${provider.phone2}" class="text-gray-700 text-sm md:text-base font-medium flex items-center">
                                <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                ${provider.phone2}
                            </a>
                        </div>
                    </div>
                </div>

                <div class="action-buttons-column">
                    <button class="action-button p-2" title="Details">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </button>
                    <button class="action-button p-2" title="Report">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                    </button>
                    <button class="action-button p-2" title="Hide">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                        </svg>
                    </button>
                    <button class="action-button shortlist-btn p-2 ${provider.isShortlisted ? 'shortlisted' : ''}" data-id="${provider.id}" title="Shortlist">
                        <svg class="w-5 h-5" fill="${provider.isShortlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderProviders() {
    const filteredProviders = showShortlistedOnly
        ? serviceProviders.filter(provider => provider.isShortlisted)
        : serviceProviders;

    if (filteredProviders.length === 0 && showShortlistedOnly) {
        providersContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        providersContainer.innerHTML = filteredProviders
            .map((provider, index) => createServiceProviderCard(provider, index))
            .join('');
    }

    // Add event listeners to shortlist buttons
    document.querySelectorAll('.shortlist-btn').forEach(btn => {
        btn.addEventListener('click', handleToggleShortlist);
    });
}

function handleToggleShortlist(event) {
    const providerId = event.currentTarget.getAttribute('data-id');
    const provider = serviceProviders.find(p => p.id === providerId);
    
    if (provider) {
        provider.isShortlisted = !provider.isShortlisted;
        renderProviders();
    }
}

function handleShortlistFilter() {
    // Remove active class from all other tabs
    document.querySelectorAll('.nav-tab').forEach(t => {
        if (!t.classList.contains('shortlist-filter')) {
            t.classList.remove('active');
        }
    });
    
    showShortlistedOnly = !showShortlistedOnly;
    
    if (showShortlistedOnly) {
        shortlistFilter.classList.add('shortlist-active');
        activeTab = 'Shortlisted';
    } else {
        shortlistFilter.classList.remove('shortlist-active');
        // Set back to first tab when turning off shortlist
        const firstTab = document.querySelector('.nav-tab:not(.shortlist-filter)');
        if (firstTab) {
            firstTab.classList.add('active');
            activeTab = firstTab.getAttribute('data-tab') || 'Portfolios';
        }
    }
    
    renderProviders();
}

function handleTabClick(event) {
    const tab = event.currentTarget.getAttribute('data-tab');
    if (tab) {
        // Remove active class from all tabs including shortlist
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.remove('active');
            if (t.classList.contains('shortlist-filter')) {
                t.classList.remove('shortlist-active');
            }
        });
        
        // Add active class to clicked tab
        event.currentTarget.classList.add('active');
        activeTab = tab;
        
        // Turn off shortlist filter when clicking other tabs
        if (showShortlistedOnly) {
            showShortlistedOnly = false;
            renderProviders();
        }
    }
}

// Initialize the application
function init() {
    renderProviders();
    
    // Add event listeners
    shortlistFilter.addEventListener('click', handleShortlistFilter);
    
    // Add event listeners to navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (!tab.classList.contains('shortlist-filter')) {
            tab.addEventListener('click', handleTabClick);
        }
    });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
