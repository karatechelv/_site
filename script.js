(function() {
    // ===== وضعیت اولیه: بررسی localStorage برای نمایش Splash یا Dashboard =====
    if (!localStorage.getItem('dashboardActive')) {
        document.addEventListener('DOMContentLoaded', function() {
            const splash = document.getElementById('splash');
            const dashboard = document.getElementById('dashboard');
            if (splash && dashboard) {
                splash.classList.remove('hidden');
                dashboard.classList.remove('active');
            }
        });
    }

    if (localStorage.getItem('dashboardActive') === 'true') {
        document.addEventListener('DOMContentLoaded', function() {
            const splash = document.getElementById('splash');
            const dashboard = document.getElementById('dashboard');
            if (splash && dashboard) {
                splash.classList.add('hidden');
                dashboard.classList.add('active');
            }
        });
    }

    // ===== دکمه ورود =====
    document.addEventListener('DOMContentLoaded', function() {
        const enterBtn = document.getElementById('enterBtn');
        if (enterBtn) {
            enterBtn.addEventListener('click', function() {
                localStorage.setItem('dashboardActive', 'true');
                document.getElementById('splash').classList.add('hidden');
                document.getElementById('dashboard').classList.add('active');
            });
        }
    });

    // ===== تغییر زبان =====
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('karatech-lang') || 'en';

    function translate(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            const txt = el.dataset[lang];
            if (txt) {
                const nodes = el.childNodes;
                for (let n of nodes) {
                    if (n.nodeType === 3) {
                        n.textContent = txt;
                        break;
                    }
                }
            }
        });
        document.body.classList.toggle('lang-persian', lang === 'fa');
        localStorage.setItem('karatech-lang', lang);

        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    translate(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            translate(this.dataset.lang);
        });
    });
})();

// ===== تابع خروج =====
function goToSplash() {
    localStorage.removeItem('dashboardActive');
    location.reload();
}
