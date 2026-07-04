(function() {
    // ===== وضعیت اولیه =====
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

    // ===== تبدیل تاریخ میلادی به شمسی =====
    function toJalaali(gy, gm, gd) {
        const g_days = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        let gy2 = (gm > 2) ? (gy + 1) : gy;
        let days = 355666 + 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400) + g_days[gm - 1] + gd;
        if (gm > 2) days -= (gy2 % 4 === 0 && (gy2 % 100 !== 0 || gy2 % 400 === 0)) ? 0 : 1;
        let jy = -1595 + 33 * Math.floor(days / 12053);
        days %= 12053;
        jy += 4 * Math.floor(days / 1461);
        days %= 1461;
        if (days > 365) {
            jy += Math.floor((days - 1) / 366);
            days = (days - 1) % 366;
        }
        let jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
        let jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
        return { jy, jm, jd };
    }

    // ===== تبدیل اعداد انگلیسی به فارسی =====
    function toPersianDigits(num) {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, d => persian[parseInt(d)]);
    }

    // ===== آپدیت ساعت و تاریخ =====
    function updateDateTime() {
        const now = new Date();
        const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        let timeStr = `${hours}:${minutes}:${seconds}`;
        
        let dateStr = '';
        if (lang === 'fa') {
            const j = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
            dateStr = `${toPersianDigits(j.jy)}/${toPersianDigits(j.jm)}/${toPersianDigits(j.jd)}`;
            timeStr = `${toPersianDigits(hours)}:${toPersianDigits(minutes)}:${toPersianDigits(seconds)}`;
        } else {
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

    // ===== تابع رفرش دستی زمان =====
    window.refreshTime = function() {
        updateDateTime();
        const btn = document.querySelector('.refresh-time-btn i');
        if (btn) {
            btn.style.transition = 'transform 0.5s ease';
            btn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                btn.style.transform = 'rotate(0deg)';
            }, 500);
        }
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

})();

// ===== تابع خروج =====
function goToSplash() {
    localStorage.removeItem('dashboardActive');
    location.reload();
}
