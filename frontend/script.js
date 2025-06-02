// Service provider data
let serviceProviders = [];
let currentSortOption = 'none';

// Fetch data using Fetch API
window.addEventListener('DOMContentLoaded', () => {
    fetch('https://empty-cup-6y0t.onrender.com')
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
                isShortlisted: false,
                isBlurred: false,
                isReported: false
            }));
            renderProviders();
        })
        .catch(err => {
            console.error("Failed to fetch:", err);
            const emptyState = document.getElementById('emptyState');
            emptyState.innerHTML = '<p class="empty-state-title">Failed to load service providers.</p><p class="empty-state-subtitle">Please try again later.</p>';
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
const detailsModal = document.getElementById('detailsModal');
const sortDropdown = document.getElementById('sortDropdown');
const sortButton = document.getElementById('sortButton');

// Helper functions
function renderStars(rating, maxRating = 5) {
    let starsHTML = '';
    for (let i = 0; i < maxRating; i++) {
        const isFilled = i < Math.floor(rating);
        starsHTML += `<svg class="star ${isFilled ? 'filled' : ''}" fill="${isFilled ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>`;
    }
    return starsHTML;
}

function createServiceProviderCard(provider, originalIndex) {
    const cardClasses = `provider-card ${originalIndex % 2 === 0 ? 'provider-card--cream' : 'provider-card--white'} ${provider.isBlurred ? 'blurred' : ''} ${provider.isReported ? 'reported' : ''}`;
    
    return `
<div class="${cardClasses}" data-id="${provider.id}">
  <div class="card-content">
    <div class="card-main">
      <div class="card-header">
        <div>
          <h3 class="provider-name">${provider.name}</h3>
          <div class="star-rating">
            ${renderStars(provider.rating, provider.maxRating)}
          </div>
        </div>
      </div>

      <p class="provider-description">${provider.description}</p>

      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-value">${provider.projects}</div>
          <div class="stat-label">Projects</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${provider.experience}</div>
          <div class="stat-label">Years</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${provider.priceRange}</div>
          <div class="stat-label">Price</div>
        </div>
      </div>

      <div class="contact-info">
        <a href="tel:${provider.phone1}" class="contact-link">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          ${provider.phone1}
        </a>
        ${provider.phone2 ? `<a href="tel:${provider.phone2}" class="contact-link">
          <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          ${provider.phone2}
        </a>` : ''}
      </div>
    </div>

    <div class="action-buttons">
      <button class="action-button details-btn" data-id="${provider.id}" title="Details">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>
      <button class="action-button report-btn ${provider.isReported ? 'reported' : ''}" data-id="${provider.id}" title="Report">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </button>
      <button class="action-button blur-btn ${provider.isBlurred ? 'active' : ''}" data-id="${provider.id}" title="Hide">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
        </svg>
      </button>
      <button class="action-button ${provider.isShortlisted ? 'shortlisted' : ''}" data-id="${provider.id}" title="Shortlist">
        <svg width="20" height="20" fill="${provider.isShortlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
    `;
}

function sortProviders(providers, sortOption) {
    if (sortOption === 'rating') {
        return [...providers].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'projects') {
        return [...providers].sort((a, b) => b.projects - a.projects);
    }
    return providers;
}

function renderProviders() {
    let filteredProviders = showShortlistedOnly
        ? serviceProviders.filter(provider => provider.isShortlisted)
        : serviceProviders;

    // Apply sorting
    filteredProviders = sortProviders(filteredProviders, currentSortOption);

    if (filteredProviders.length === 0 && showShortlistedOnly) {
        providersContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        providersContainer.innerHTML = filteredProviders
            .map((provider) => {
                const originalIndex = serviceProviders.findIndex(p => p.id === provider.id);
                return createServiceProviderCard(provider, originalIndex);
            })
            .join('');
    }

    // Add event listeners
    document.querySelectorAll('.action-button[data-id]').forEach(btn => {
        if (btn.classList.contains('details-btn')) {
            btn.addEventListener('click', handleDetailsClick);
        } else if (btn.classList.contains('report-btn')) {
            btn.addEventListener('click', handleReportClick);
        } else if (btn.classList.contains('blur-btn')) {
            btn.addEventListener('click', handleBlurClick);
        } else {
            btn.addEventListener('click', handleToggleShortlist);
        }
    });
}

function handleDetailsClick(event) {
    const providerId = event.currentTarget.getAttribute('data-id');
    const provider = serviceProviders.find(p => p.id === providerId);
    
    if (provider) {
        showDetailsModal(provider);
    }
}

function handleReportClick(event) {
    const providerId = event.currentTarget.getAttribute('data-id');
    const provider = serviceProviders.find(p => p.id === providerId);
    
    if (provider) {
        provider.isReported = !provider.isReported;
        renderProviders();
    }
}

function handleBlurClick(event) {
    const providerId = event.currentTarget.getAttribute('data-id');
    const provider = serviceProviders.find(p => p.id === providerId);
    
    if (provider) {
        provider.isBlurred = !provider.isBlurred;
        renderProviders();
    }
}

function showDetailsModal(provider) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = provider.name;
    
    modalBody.innerHTML = `
        <div class="modal-rating">
            <div class="star-rating">
                ${renderStars(provider.rating, provider.maxRating)}
            </div>
            <span class="rating-text">${provider.rating.toFixed(1)} out of ${provider.maxRating}</span>
        </div>

        <div class="modal-description">
            <h3>Description</h3>
            <p>${provider.description}</p>
        </div>

        <div class="modal-stats">
            <div class="modal-stat-item">
                <span class="modal-stat-label">Projects Completed</span>
                <span class="modal-stat-value">${provider.projects}</span>
            </div>
            <div class="modal-stat-item">
                <span class="modal-stat-label">Years of Experience</span>
                <span class="modal-stat-value">${provider.experience}</span>
            </div>
            <div class="modal-stat-item">
                <span class="modal-stat-label">Price Range</span>
                <span class="modal-stat-value">${provider.priceRange}</span>
            </div>
        </div>

        <div class="modal-contact">
            <h3>Contact Information</h3>
            <div class="modal-contact-links">
                ${provider.phone1 ? `<a href="tel:${provider.phone1}" class="modal-contact-link">
                    <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    ${provider.phone1}
                </a>` : ''}
                ${provider.phone2 ? `<a href="tel:${provider.phone2}" class="modal-contact-link">
                    <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    ${provider.phone2}
                </a>` : ''}
            </div>
        </div>
    `;
    
    detailsModal.classList.remove('hidden');
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
    if (tab && tab !== 'Sort') {
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.remove('active');
            if (t.classList.contains('shortlist-filter')) {
                t.classList.remove('shortlist-active');
            }
        });
        
        event.currentTarget.classList.add('active');
        activeTab = tab;
        
        if (showShortlistedOnly) {
            showShortlistedOnly = false;
            renderProviders();
        }
    }
}

function handleSortClick() {
    sortDropdown.classList.remove('hidden');
}

function handleSortOptionClick(event) {
    const sortOption = event.currentTarget.getAttribute('data-sort');
    currentSortOption = sortOption;
    sortDropdown.classList.add('hidden');
    renderProviders();
}

function closeSortDropdown() {
    sortDropdown.classList.add('hidden');
}

function closeDetailsModal() {
    detailsModal.classList.add('hidden');
}

// Initialize the application
function init() {
    renderProviders();
    
    // Modal event listeners
    document.getElementById('closeModal').addEventListener('click', closeDetailsModal);
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            closeDetailsModal();
        }
    });
    
    // Sort dropdown event listeners
    document.getElementById('closeSortDropdown').addEventListener('click', closeSortDropdown);
    sortDropdown.addEventListener('click', (e) => {
        if (e.target === sortDropdown) {
            closeSortDropdown();
        }
    });
    
    document.querySelectorAll('.sort-dropdown-option').forEach(option => {
        option.addEventListener('click', handleSortOptionClick);
    });
    
    // Navigation event listeners
    if (shortlistFilter) {
        shortlistFilter.addEventListener('click', handleShortlistFilter);
    }
    
    if (sortButton) {
        sortButton.addEventListener('click', handleSortClick);
    }
    
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (!tab.classList.contains('shortlist-filter') && tab.getAttribute('data-tab') !== 'Sort') {
            tab.addEventListener('click', handleTabClick);
        }
    });
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
