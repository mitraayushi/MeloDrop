 // Navigation
 function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = sectionId === 'explore' ? 'grid' : 'block';
}

// Wallet Connection
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const button = document.querySelector('.connect-wallet');
            button.textContent = accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4);
            button.style.background = 'var(--gradient-card)';
            button.style.border = '1px solid var(--secondary)';
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    } else {
        alert('Please install MetaMask to use this feature!');
    }
}

// Recommendation Form
function addSongInput() {
    const songList = document.querySelector('.song-list');
    const songCount = songList.children.length + 1;
    
    const songGroup = document.createElement('div');
    songGroup.className = 'form-group';
    songGroup.innerHTML = `
        <label>Song ${songCount}</label>
        <input type="text" placeholder="Song name" required>
        <input type="url" placeholder="Song link" required>
    `;
    songList.appendChild(songGroup);
}

function submitRecommendation(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Here you would typically send the data to your backend
    showNotification('Recommendation submitted successfully!');
    event.target.reset();
    showSection('explore');
}

// Explore Page
function generateRecommendationCards() {
    const explore = document.getElementById('explore');
    const sampleData = [
        {
            genre: 'Pop',
            title: 'Summer Vibes 2024',
            curator: 'MusicLover123',
            songCount: 5
        },
        {
            genre: 'Rock',
            title: 'Classic Rock Essentials',
            curator: 'RockFan456',
            songCount: 8
        },
        {
            genre: 'Hip Hop',
            title: 'Underground Beats',
            curator: 'BeatMaster789',
            songCount: 6
        },
        {
            genre: 'Electronic',
            title: 'Late Night EDM',
            curator: 'RaveMaster',
            songCount: 7
        },
        {
            genre: 'Classical',
            title: 'Peaceful Piano',
            curator: 'ClassicalSoul',
            songCount: 4
        },
        {
            genre: 'Electronic',
            title: 'Late Night EDM',
            curator: 'RaveMaster',
            songCount: 7
        },
        {
            genre: 'Bollywood',
            title: 'Sangeet vibes',
            curator: 'RaveMaster',
            songCount: 5
        },
        {
            genre: 'Kpop',
            title: 'Late Night EDM',
            curator: 'RaveMaster',
            songCount: 2
        }
    ];
    
    explore.innerHTML = '';
    sampleData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <span class="genre-tag">${data.genre}</span>
            <h3>${data.title}</h3>
            <p>Curated by ${data.curator}</p>
            <p>${data.songCount} songs</p>
        `;
        card.onclick = () => showModal(data);
        explore.appendChild(card);
    });
}

// Modal
function showModal(data) {
    const modal = document.getElementById('recommendationModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = data.title;
    document.getElementById('recommenderName').textContent = data.curator;
    document.getElementById('recommenderWallet').textContent = '0x1234...5678';
    
    // Sample songs for the modal
    const sampleSongs = [
        { title: 'Amazing Song 1', artist: 'Artist A', link: 'https://www.youtube.com/watch?v=syFZfO_wfMQ' },
        { title: 'Incredible Track 2', artist: 'Artist B', link: '#' },
        { title: 'Awesome Tune 3', artist: 'Artist C', link: '#' }
    ];
    
    content.innerHTML = sampleSongs.map(song => `
        <div class="song-item">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <a href="${song.link}" target="_blank" class="hero-btn secondary-btn">Listen</a>
        </div>
    `).join('');
    
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('recommendationModal').style.display = 'none';
}

async function sendReward() {
    if (typeof window.ethereum !== 'undefined') {
        if (!window.ethereum.selectedAddress) {
            alert('Please connect your wallet first!');
            return;
        }
        try {
            // Here you would implement the actual token transfer
            showNotification('Reward sent successfully!');
            closeModal();
        } catch (error) {
            console.error('Error sending reward:', error);
            showNotification('Error sending reward. Please try again.', 'error');
        }
    } else {
        alert('Please install MetaMask to send rewards!');
    }
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--gradient-primary);
        color: white;
        border-radius: 10px;
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize
window.onload = () => {
    generateRecommendationCards();
    
    // Handle navigation
    const hash = window.location.hash.slice(1) || 'home';
    showSection(hash);

    // Add hash change listener
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.slice(1) || 'home';
        showSection(newHash);
    });
};

// Close modal on outside click
window.onclick = (event) => {
    const modal = document.getElementById('recommendationModal');
    if (event.target === modal) {
        closeModal();
    }
};

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

//profile
function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Add hover effects to recommendation cards
document.querySelectorAll('.recommendation-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 0 30px rgba(138, 43, 226, 0.3)';
    });

    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});
