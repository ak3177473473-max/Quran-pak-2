/* ============================================================
   PROTECT.JS — Website Protection Script
   © 2026 AYUB KHAN — All Rights Reserved
   The Holy Quran | Surah-wise Edition
============================================================ */

(function() {
    'use strict';

    // ============================================================
    // ✅ ALLOWED DOMAINS — Sirf inhi domains pe site chalegi
    // ============================================================
    const ALLOWED_DOMAINS = [
        'quran-pak2.vercel.app',
        'khani.wuaze.com',
        'localhost',
        '127.0.0.1'
    ];

    const currentHost = window.location.hostname.toLowerCase();

    const isAllowed = ALLOWED_DOMAINS.some(function(d) {
        var domain = d.toLowerCase();
        return currentHost === domain || currentHost.endsWith('.' + domain);
    });

    if (!isAllowed) {
        // ❌ Unauthorized domain — site band karo
        document.addEventListener('DOMContentLoaded', function() {
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    inset: 0;
                    background: #000;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    font-family: 'Lato', sans-serif;
                    text-align: center;
                    padding: 20px;
                    z-index: 999999;
                ">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.2rem; font-weight: 700; color: #FFD400; margin-bottom: 0.5rem;">
                        Unauthorized Domain
                    </div>
                    <div style="font-size: 0.9rem; color: #aaa; max-width: 400px; line-height: 1.6;">
                        Ye website sirf <strong style="color:#FFD400;">quran-pak2.vercel.app</strong> par chal sakti hai.<br><br>
                        © 2026 AYUB KHAN — All Rights Reserved
                    </div>
                </div>
            `;
        });
        return;
    }

    // ============================================================
    // ✅ 1. Right-click block
    // ============================================================
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showWarning('❌ Right-click disabled');
        return false;
    });

    // ============================================================
    // ✅ 2. Text selection block
    // ============================================================
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
        e.preventDefault();
        return false;
    });

    // ============================================================
    // ✅ 3. Copy block (in-app Copy button kaam karega)
    // ============================================================
    document.addEventListener('copy', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
        e.preventDefault();
        showWarning('❌ Copy disabled. Use in-app Copy button.');
        return false;
    });

    // ============================================================
    // ✅ 4. Cut block
    // ============================================================
    document.addEventListener('cut', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
        e.preventDefault();
        return false;
    });

    // ============================================================
    // ✅ 5. Paste block
    // ============================================================
    document.addEventListener('paste', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
        e.preventDefault();
        return false;
    });

    // ============================================================
    // ✅ 6. Keyboard shortcuts block
    // ============================================================
    document.addEventListener('keydown', function(e) {
        var key = e.key ? e.key.toUpperCase() : '';

        // F12 - Dev tools
        if (e.key === 'F12') {
            e.preventDefault();
            showWarning('❌ Dev tools disabled');
            return false;
        }

        // Ctrl/Cmd + Shift + I/J/C/K - Dev tools
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C', 'K'].indexOf(key) !== -1) {
            e.preventDefault();
            showWarning('❌ Dev tools disabled');
            return false;
        }

        // Ctrl/Cmd + U - View source
        if ((e.ctrlKey || e.metaKey) && key === 'U') {
            e.preventDefault();
            showWarning('❌ View source disabled');
            return false;
        }

        // Ctrl/Cmd + S - Save page
        if ((e.ctrlKey || e.metaKey) && key === 'S') {
            e.preventDefault();
            showWarning('❌ Save disabled');
            return false;
        }

        // Ctrl/Cmd + A - Select all
        if ((e.ctrlKey || e.metaKey) && key === 'A') {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
            e.preventDefault();
            return false;
        }

        // Ctrl/Cmd + P - Print
        if ((e.ctrlKey || e.metaKey) && key === 'P') {
            e.preventDefault();
            showWarning('❌ Print disabled');
            return false;
        }

        // Ctrl/Cmd + C - Copy
        if ((e.ctrlKey || e.metaKey) && !e.shiftKey && key === 'C') {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return true;
            e.preventDefault();
            showWarning('❌ Copy disabled. Use in-app Copy button.');
            return false;
        }
    });

    // ============================================================
    // ✅ 7. Image drag block
    // ============================================================
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // ============================================================
    // ✅ 8. Long-press block on mobile
    // ============================================================
    var longPressTimer;
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        longPressTimer = setTimeout(function() { e.preventDefault(); }, 500);
    }, { passive: false });
    document.addEventListener('touchend', function() { clearTimeout(longPressTimer); });
    document.addEventListener('touchmove', function() { clearTimeout(longPressTimer); });

    // ============================================================
    // ✅ 9. Dev tools detection (silent)
    // ============================================================
    var devToolsOpen = false;
    var threshold = 160;
    setInterval(function() {
        var widthDiff = window.outerWidth - window.innerWidth > threshold;
        var heightDiff = window.outerHeight - window.innerHeight > threshold;
        if ((widthDiff || heightDiff) && !devToolsOpen) {
            devToolsOpen = true;
            console.clear();
            console.log('%c⚠️ Warning: Developer tools detected', 'color:#FFD400;font-size:16px;font-weight:bold;');
            console.log('%c© 2026 AYUB KHAN — All Rights Reserved', 'color:#9A7B00;font-size:14px;');
            console.log('%cThis website is protected. Unauthorized copying is prohibited.', 'color:#666;font-size:12px;');
        } else if (!widthDiff && !heightDiff && devToolsOpen) {
            devToolsOpen = false;
        }
    }, 1000);

    // ============================================================
    // ✅ 10. Console warning
    // ============================================================
    console.log('%c⚠️ STOP!', 'color:#DC2626;font-size:24px;font-weight:bold;');
    console.log('%c© 2026 AYUB KHAN — All Rights Reserved', 'color:#FFD400;font-size:16px;font-weight:bold;');
    console.log('%cThis is a protected application.', 'color:#666;font-size:14px;');
    console.log('%cUnauthorized copying, modification, or distribution of this code is strictly prohibited and may result in legal action.', 'color:#666;font-size:12px;');
    console.log('%c🌐 Domain: ' + currentHost, 'color:#9A7B00;font-size:12px;');

    // ============================================================
    // ✅ 11. Warning toast function
    // ============================================================
    function showWarning(msg) {
        var warning = document.getElementById('protect-warning');
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'protect-warning';
            warning.style.cssText = [
                'position: fixed',
                'bottom: 24px',
                'left: 50%',
                'transform: translateX(-50%) translateY(100px)',
                'background: linear-gradient(135deg, #DC2626, #991B1B)',
                'color: #fff',
                'padding: 10px 20px',
                'border-radius: 8px',
                'font-size: 13px',
                'font-weight: 600',
                'z-index: 999999',
                'opacity: 0',
                'transition: all 0.3s',
                'box-shadow: 0 8px 24px rgba(220, 38, 38, 0.4)',
                'border: 1px solid #FCA5A5',
                "font-family: 'Lato', sans-serif",
                'pointer-events: none',
                'white-space: nowrap'
            ].join(';');
            document.body.appendChild(warning);
        }
        warning.textContent = msg;
        warning.style.transform = 'translateX(-50%) translateY(0)';
        warning.style.opacity = '1';
        clearTimeout(warning._timer);
        warning._timer = setTimeout(function() {
            warning.style.transform = 'translateX(-50%) translateY(100px)';
            warning.style.opacity = '0';
        }, 2000);
    }

    // ============================================================
    // ✅ 12. iframe embedding block
    // ============================================================
    if (window.self !== window.top) {
        try {
            window.top.location = window.self.location;
        } catch (err) {
            document.body.innerHTML = '<div style="color:#fff;background:#000;height:100vh;display:flex;align-items:center;justify-content:center;font-family:Lato,sans-serif;font-size:18px;">This content cannot be embedded.</div>';
        }
    }

    // ============================================================
    // ✅ 13. Disable image saving
    // ============================================================
    document.querySelectorAll('img').forEach(function(img) {
        img.setAttribute('draggable', 'false');
        img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
    });

    // ============================================================
    // ✅ 14. Observe new images (dynamic content)
    // ============================================================
    var imageObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'IMG') {
                    node.setAttribute('draggable', 'false');
                    node.addEventListener('contextmenu', function(e) { e.preventDefault(); });
                }
                if (node.querySelectorAll) {
                    node.querySelectorAll('img').forEach(function(img) {
                        img.setAttribute('draggable', 'false');
                        img.addEventListener('contextmenu', function(e) { e.preventDefault(); });
                    });
                }
            });
        });
    });
    if (document.body) {
        imageObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            imageObserver.observe(document.body, { childList: true, subtree: true });
        });
    }

    // ============================================================
    // ✅ 15. Automation detection
    // ============================================================
    if (navigator.webdriver) {
        console.log('%c🤖 Automation detected', 'color:#DC2626;font-size:14px;font-weight:bold;');
    }

    // ============================================================
    // ✅ 16. Selection auto-clear
    // ============================================================
    document.addEventListener('mouseup', function(e) {
        var selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                selection.removeAllRanges();
            }
        }
    });

    // ============================================================
    // ✅ 17. Prevent middle-click new tab
    // ============================================================
    document.addEventListener('auxclick', function(e) {
        if (e.button === 1) {
            e.preventDefault();
            return false;
        }
    });

})();