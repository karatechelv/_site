(function() {
    // ===== وضعیت اولیه =====
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
                const splash = document.getElementById('splash');
                const dashboard = document.getElementById('dashboard');
                if (splash && dashboard) {
                    splash.classList.add('hidden');
                    dashboard.classList.add('active');
                }
            });
        }
    });

    // ===== آپدیت ساعت و تاریخ با استفاده از Intl =====
    function updateDateTime() {
        const now = new Date();
        const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
        
        // ===== ساعت ۲۴ ساعته =====
        let timeStr;
        if (lang === 'fa') {
            // ساعت با اعداد فارسی
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            timeStr = h.replace(/\d/g, d => persian[parseInt(d)]) + ':' +
                      m.replace(/\d/g, d => persian[parseInt(d)]) + ':' +
                      s.replace(/\d/g, d => persian[parseInt(d)]);
        } else {
            timeStr = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
        }

        // ===== تاریخ =====
        let dateStr;
        if (lang === 'fa') {
            // تاریخ شمسی با استفاده از Intl
            dateStr = new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(now);
            // تبدیل تاریخ به فرمت با اسلش (مثلاً ۱۴۰۴/۰۱/۱۵)
            // با اعداد فارسی
            const parts = dateStr.split('/');
            const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            dateStr = parts.map(p => p.replace(/\d/g, d => persian[parseInt(d)])).join('/');
        } else {
            // تاریخ میلادی
            dateStr = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        const dateEl = document.getElementById('dateDisplay');
        const timeEl = document.getElementById('timeDisplay');
        if (dateEl) dateEl.textContent = dateStr;
        if (timeEl) timeEl.textContent = timeStr;
    }

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

        // به‌روزرسانی تاریخ و ساعت با زبان جدید
        updateDateTime();
    }

    translate(currentLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            translate(this.dataset.lang);
        });
    });

    // ===== اجرای هر ثانیه =====
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // ===== رفرش دستی =====
    window.refreshTime = function() {
        updateDateTime();
    };

})();

// ===== تابع خروج =====
function goToSplash() {
    localStorage.removeItem('dashboardActive');
    location.reload();
}
