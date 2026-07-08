// SXIAUM Shared Wallet, Toast & Responsive Mobile Navigation System
document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS styles for modal, toast, and mobile menu
    injectStyles();
    
    // Inject the modal HTML structure
    injectModalHTML();
    
    // Inject the mobile navigation menu HTML structure
    injectMobileMenuHTML();
    
    // Initialize wallet state
    initWalletState();
    
    // Setup responsive mobile navigation hooks
    initMobileNav();
    
    // Listen for custom wallet updates
    window.addEventListener('sxiaum-wallet-trigger-connect', () => {
        openWalletModal();
    });
});

// Injects the necessary CSS for animations, glassmorphism, toast, and mobile navigation
function injectStyles() {
    if (document.getElementById('sxiaum-shared-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'sxiaum-shared-styles';
    style.innerHTML = `
        /* Global Mobile Overflow Protection */
        html, body {
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative !important;
        }

        /* Wallet Modal Styles */
        .sxiaum-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sxiaum-modal-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        .sxiaum-modal {
            background: rgba(15, 15, 20, 0.95);
            border: 1px solid rgba(147, 51, 234, 0.25);
            border-radius: 16px;
            width: 90%;
            max-width: 440px;
            padding: 28px;
            transform: scale(0.9) translateY(20px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            color: #ffffff;
            box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.25);
            position: relative;
        }
        .sxiaum-modal-overlay.active .sxiaum-modal {
            transform: scale(1) translateY(0);
        }
        .sxiaum-modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: color 0.2s;
        }
        .sxiaum-modal-close:hover {
            color: #ffffff;
        }
        .wallet-option {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 16px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            width: 100%;
            text-align: left;
            margin-bottom: 12px;
        }
        .wallet-option:hover {
            background: rgba(147, 51, 234, 0.1);
            border-color: rgba(147, 51, 234, 0.4);
            transform: translateY(-2px);
        }
        .wallet-option svg, .wallet-option img {
            width: 32px;
            height: 32px;
            object-fit: contain;
        }
        
        /* Spinner */
        .sxiaum-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-top: 2px solid #a855f7;
            border-radius: 50%;
            animation: sxiaum-spin 0.8s linear infinite;
        }
        @keyframes sxiaum-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Toast Styles */
        .sxiaum-toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 1100;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        }
        .sxiaum-toast {
            background: rgba(15, 15, 22, 0.9);
            backdrop-filter: blur(12px);
            border-left: 4px solid #a855f7;
            border-top: 1px solid rgba(255,255,255,0.08);
            border-right: 1px solid rgba(255,255,255,0.08);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            color: #ffffff;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            transform: translateX(120%);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: auto;
        }
        .sxiaum-toast.show {
            transform: translateX(0);
        }
        .sxiaum-toast.info {
            border-left-color: #3b82f6;
        }
        .sxiaum-toast.success {
            border-left-color: #22c55e;
        }
        .sxiaum-toast.error {
            border-left-color: #ef4444;
        }
        
        /* Connected Dot */
        .connected-dot {
            width: 8px;
            height: 8px;
            background-color: #22c55e;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #22c55e;
            animation: pulse-dot 2s infinite;
            vertical-align: middle;
        }
        @keyframes pulse-dot {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }

        /* Mobile Slide-out Navigation Menu */
        .sxiaum-mobile-menu {
            position: fixed;
            inset: 0;
            z-index: 999;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sxiaum-mobile-menu.active {
            opacity: 1;
            pointer-events: auto;
        }
        .sxiaum-mobile-menu-content {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 80%;
            max-width: 320px;
            background: rgba(10, 10, 15, 0.98);
            border-left: 1px solid rgba(147, 51, 234, 0.2);
            padding: 32px 24px;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            color: #ffffff;
            display: flex;
            flex-direction: column;
            box-shadow: -15px 0 35px rgba(0, 0, 0, 0.8);
        }
        .sxiaum-mobile-menu.active .sxiaum-mobile-menu-content {
            transform: translateX(0);
        }
        .sxiaum-mobile-menu-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            cursor: pointer;
            transition: color 0.2s;
        }
        .sxiaum-mobile-menu-close:hover {
            color: #ffffff;
        }
    `;
    document.head.appendChild(style);
}

// Injects the wallet connect modal HTML template
function injectModalHTML() {
    if (document.getElementById('sxiaum-wallet-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'sxiaum-wallet-modal-overlay';
    overlay.className = 'sxiaum-modal-overlay';
    overlay.innerHTML = `
        <div class="sxiaum-modal">
            <button class="sxiaum-modal-close" onclick="closeWalletModal()">
                <span class="material-symbols-outlined">close</span>
            </button>
            <h3 class="font-headline-lg text-[22px] font-bold mb-1 tracking-tight text-white">Connect Wallet</h3>
            <p class="font-body-md text-sm text-gray-400 mb-6">Select your preferred wallet to interface with the SXIAUM network.</p>
            
            <div id="wallet-options-list">
                <button class="wallet-option" onclick="connectWallet('MetaMask')">
                    <svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                        <path d="M29.5 13.5L25 4.5L16.5 11.5L20 15L29.5 13.5Z" fill="#E2761B"/>
                        <path d="M2.5 13.5L7 4.5L15.5 11.5L12 15L2.5 13.5Z" fill="#E2761B"/>
                        <path d="M25.5 22.5L29.5 13.5L20 15L22 19L25.5 22.5Z" fill="#E2761B"/>
                        <path d="M6.5 22.5L2.5 13.5L12 15L10 19L6.5 22.5Z" fill="#E2761B"/>
                        <path d="M16 28L23.5 24.5L25.5 22.5L22 19L16 22L10 19L6.5 22.5L8.5 24.5L16 28Z" fill="#E2761B"/>
                        <path d="M16 4.5L11 11L15.5 11.5L16 4.5Z" fill="#E2761B"/>
                        <path d="M16 4.5L21 11L16.5 11.5L16 4.5Z" fill="#E2761B"/>
                        <path d="M16 22L22 19L21.5 18.5L16.5 19L16 22Z" fill="#D7C1B1"/>
                        <path d="M16 22L10 19L10.5 18.5L15.5 19L16 22Z" fill="#D7C1B1"/>
                    </svg>
                    <div>
                        <div class="font-headline-lg text-base font-semibold text-white">MetaMask</div>
                        <div class="font-body-md text-xs text-gray-400">Connect to your MetaMask Browser Extension</div>
                    </div>
                </button>
                <button class="wallet-option" onclick="connectWallet('WalletConnect')">
                    <svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                        <path d="M22.5 11.5C18.91 7.91 13.09 7.91 9.5 11.5L6.5 8.5C11.75 3.25 20.25 3.25 25.5 8.5L22.5 11.5ZM26.5 15.5L29.5 12.5C27.91 10.91 25.09 10.91 23.5 12.5L26.5 15.5ZM5.5 12.5L8.5 15.5C6.91 10.91 4.09 10.91 2.5 12.5L5.5 12.5ZM16 18C14.07 18 12.5 16.43 12.5 14.5C12.5 12.57 14.07 11 16 11C17.93 11 19.5 12.57 19.5 14.5C19.5 16.43 17.93 18 16 18Z" fill="#3B99FC"/>
                    </svg>
                    <div>
                        <div class="font-headline-lg text-base font-semibold text-white">WalletConnect</div>
                        <div class="font-body-md text-xs text-gray-400">Scan QR code to connect with mobile wallets</div>
                    </div>
                </button>
                <button class="wallet-option" onclick="connectWallet('Coinbase Wallet')">
                    <svg class="w-8 h-8 flex-shrink-0" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="16" fill="#0052FF"/>
                        <rect x="8" y="8" width="16" height="16" rx="4" fill="white"/>
                    </svg>
                    <div>
                        <div class="font-headline-lg text-base font-semibold text-white">Coinbase Wallet</div>
                        <div class="font-body-md text-xs text-gray-400">Connect using Coinbase Dapp network</div>
                    </div>
                </button>
            </div>
            
            <div id="wallet-connecting-state" class="hidden flex flex-col items-center justify-center py-8">
                <div class="sxiaum-spinner mb-4"></div>
                <div class="font-headline-lg text-base font-semibold text-white mb-1" id="connecting-wallet-name">Connecting to MetaMask...</div>
                <div class="font-body-md text-xs text-gray-400">Please approve the connection in your wallet window.</div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Create toast container
    const toastContainer = document.createElement('div');
    toastContainer.id = 'sxiaum-toast-container';
    toastContainer.className = 'sxiaum-toast-container';
    document.body.appendChild(toastContainer);
}

// Injects the mobile side drawer navigation overlay
function injectMobileMenuHTML() {
    if (document.getElementById('sxiaum-mobile-menu-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'sxiaum-mobile-menu-overlay';
    overlay.className = 'sxiaum-mobile-menu';
    overlay.innerHTML = `
        <div class="sxiaum-mobile-menu-content">
            <button class="sxiaum-mobile-menu-close" onclick="toggleMobileMenu(false)">
                <span class="material-symbols-outlined text-[26px]">close</span>
            </button>
            <div class="flex items-center gap-2 mb-8 mt-2">
                <img src="logo.png" alt="SXIAUM Logo" class="h-8 w-auto">
                <span class="font-headline-lg text-xl font-bold tracking-tighter text-white">SXIAUM</span>
            </div>
            
            <!-- Dynamic Navigation Links -->
            <nav id="sxiaum-mobile-nav-links" class="flex flex-col gap-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                <!-- Populated via clone of desktop nav -->
            </nav>
            
            <!-- Mobile Action Buttons -->
            <div id="sxiaum-mobile-action-buttons" class="mt-auto flex flex-col gap-4 border-t border-purple-500/10 pt-6">
                <button id="sxiaum-mobile-connect-btn" class="w-full py-3 border border-purple-500/30 rounded text-purple-300 font-semibold text-xs hover:border-purple-500 hover:text-white transition-all uppercase tracking-wider">
                    Connect Wallet
                </button>
                <a href="console.html" class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded text-center block transition-colors uppercase tracking-wider">
                    Launch App
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Toggle mobile menu drawer visibility
function toggleMobileMenu(open) {
    const menu = document.getElementById('sxiaum-mobile-menu-overlay');
    if (menu) {
        if (open) {
            menu.classList.add('active');
        } else {
            menu.classList.remove('active');
        }
    }
}

// Scans header, creates mobile hamburger button, and populates links
function initMobileNav() {
    // Find first flex container inside header
    const headerDiv = document.querySelector('header > div');
    if (!headerDiv) return;

    // Verify button doesn't exist
    if (document.getElementById('sxiaum-mobile-menu-btn')) return;

    // Create hamburger trigger
    const menuBtn = document.createElement('button');
    menuBtn.id = 'sxiaum-mobile-menu-btn';
    menuBtn.className = 'md:hidden flex items-center justify-center p-2 text-primary hover:text-secondary focus:outline-none transition-colors ml-2';
    menuBtn.innerHTML = '<span class="material-symbols-outlined text-[28px]">menu</span>';
    
    // Append to the header container
    headerDiv.appendChild(menuBtn);
    menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu(true);
    });

    // Clone navigation links into drawer
    const desktopNav = document.querySelector('header nav');
    const mobileLinksContainer = document.getElementById('sxiaum-mobile-nav-links');
    
    if (desktopNav && mobileLinksContainer) {
        mobileLinksContainer.innerHTML = ''; // clear
        const links = desktopNav.querySelectorAll('a');
        links.forEach(link => {
            const cloned = link.cloneNode(true);
            cloned.className = 'hover:text-white transition-colors py-2 text-base font-semibold block border-b border-purple-500/5 normal-case';
            
            // Close mobile menu when clicking internal hash links
            cloned.addEventListener('click', () => toggleMobileMenu(false));
            mobileLinksContainer.appendChild(cloned);
        });
    }

    // Attach click listener to the mobile Connect Wallet button
    const mobConnectBtn = document.getElementById('sxiaum-mobile-connect-btn');
    if (mobConnectBtn) {
        mobConnectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu(false);
            
            const isConnected = localStorage.getItem('sxiaum_wallet');
            if (isConnected) {
                if (confirm('Do you want to disconnect your wallet?')) {
                    disconnectWallet();
                }
            } else {
                openWalletModal();
            }
        });
    }
}

// Opens the wallet connection modal
function openWalletModal() {
    const overlay = document.getElementById('sxiaum-wallet-modal-overlay');
    if (overlay) {
        document.getElementById('wallet-options-list').classList.remove('hidden');
        document.getElementById('wallet-connecting-state').classList.add('hidden');
        overlay.classList.add('active');
    }
}

// Closes the wallet connection modal
function closeWalletModal() {
    const overlay = document.getElementById('sxiaum-wallet-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Triggers the mock wallet connection flow
function connectWallet(walletName) {
    document.getElementById('wallet-options-list').classList.add('hidden');
    document.getElementById('connecting-wallet-name').textContent = `Connecting to ${walletName}...`;
    document.getElementById('wallet-connecting-state').classList.remove('hidden');

    // Simulate connection delay
    setTimeout(() => {
        const mockAddress = generateMockAddress();
        localStorage.setItem('sxiaum_wallet', mockAddress);
        localStorage.setItem('sxiaum_wallet_type', walletName);
        
        closeWalletModal();
        updateConnectButtons(mockAddress);
        showToast(`${walletName} connected successfully!`, 'success');
        
        // Dispatch global event for interactive pages
        window.dispatchEvent(new CustomEvent('sxiaum-wallet-changed', {
            detail: { connected: true, address: mockAddress, type: walletName }
        }));
    }, 1000);
}

// Triggers disconnect
function disconnectWallet() {
    const walletName = localStorage.getItem('sxiaum_wallet_type') || 'Wallet';
    localStorage.removeItem('sxiaum_wallet');
    localStorage.removeItem('sxiaum_wallet_type');
    
    updateConnectButtons(null);
    showToast(`${walletName} disconnected.`, 'info');
    
    window.dispatchEvent(new CustomEvent('sxiaum-wallet-changed', {
        detail: { connected: false, address: null, type: null }
    }));
}

// Generates a mock Ethereum-like address
function generateMockAddress() {
    const chars = '0123456789abcdefABCDEF';
    let address = '0x8fB9';
    for (let i = 0; i < 8; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    address += '...';
    for (let i = 0; i < 4; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

// Initializes the wallet state on page load
function initWalletState() {
    const savedWallet = localStorage.getItem('sxiaum_wallet');
    
    // Select all Connect buttons across headers (excluding the mobile connect button)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'Connect' || text.startsWith('0x') || btn.id === 'connect-wallet-btn') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isConnected = localStorage.getItem('sxiaum_wallet');
                if (isConnected) {
                    if (confirm('Do you want to disconnect your wallet?')) {
                        disconnectWallet();
                    }
                } else {
                    openWalletModal();
                }
            });
        }
    });

    if (savedWallet) {
        updateConnectButtons(savedWallet);
    }
}

// Updates all Connect buttons on the current page (desktop and mobile drawer)
function updateConnectButtons(address) {
    const buttons = document.querySelectorAll('button, #sxiaum-mobile-connect-btn');
    buttons.forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'Connect' || text === 'Connect Wallet' || text.startsWith('0x') || btn.id === 'connect-wallet-btn' || btn.id === 'sxiaum-mobile-connect-btn') {
            if (address) {
                btn.innerHTML = `<span class="connected-dot mr-2"></span><span style="font-family: 'JetBrains Mono', monospace; font-size: 11px;">${address}</span>`;
                btn.classList.remove('border-outline-variant', 'text-primary', 'text-purple-300', 'border-purple-500/30');
                btn.classList.add('border-green-500/50', 'text-green-600', 'dark:text-green-400');
            } else {
                btn.innerHTML = btn.id === 'sxiaum-mobile-connect-btn' ? 'Connect Wallet' : 'Connect';
                btn.classList.add('border-outline-variant', 'text-primary');
                if (btn.id === 'sxiaum-mobile-connect-btn') {
                    btn.classList.add('text-purple-300', 'border-purple-500/30');
                    btn.classList.remove('text-primary');
                }
                btn.classList.remove('border-green-500/50', 'text-green-600', 'dark:text-green-400');
            }
        }
    });
}

// Toast notification trigger
function showToast(message, type = 'success') {
    const container = document.getElementById('sxiaum-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `sxiaum-toast ${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check_circle';
    if (type === 'error') icon = 'error';

    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${icon}</span>
        <div class="font-body-md text-sm font-medium">${message}</div>
    `;

    container.appendChild(toast);
    
    // Trigger transition
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Export functions to global window object
window.openWalletModal = openWalletModal;
window.closeWalletModal = closeWalletModal;
window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
window.showToast = showToast;
window.toggleMobileMenu = toggleMobileMenu;
window.getConnectedWallet = () => localStorage.getItem('sxiaum_wallet');
window.getConnectedWalletType = () => localStorage.getItem('sxiaum_wallet_type');
