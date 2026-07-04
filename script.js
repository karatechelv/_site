(function() {
    // ===== وضعیت اولیه =====
    if (localStorage.getItem('dashboardActive') === 'true') {
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('splash').classList.add('hidden');
            document.getElementById('dashboard').classList.add('active');
        });
    }

    // ===== دکمه ورود =====
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('enterBtn').addEventListener('click', function() {
            localStorage.setItem('dashboardActive', 'true');
            document.getElementById('splash').classList.add('hidden');
            document.getElementById('dashboard').classList.add('active');
        });
    });

    // ===== تبدیل اعداد به فارسی =====
    function toPersianDigits(num) {
        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return String(num).replace(/\d/g, d => persian[parseInt(d)]);
    }

    // ===== آپدیت ساعت و تاریخ =====
    function updateDateTime() {
        const now = new Date();
        const lang = document.querySelector('.lang-btn.active')?.dataset.lang || 'en';

        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');

        let timeStr;
        if (lang === 'fa') {
            timeStr = `${toPersianDigits(hh)}:${toPersianDigits(mm)}:${toPersianDigits(ss)}`;
        } else {
            timeStr = `${hh}:${mm}:${ss}`;
        }

        let dateStr;
        if (lang === 'fa') {
            const formatter = new Intl.DateTimeFormat('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Asia/Tehran'
            });
            dateStr = formatter.format(now).replace(/\d/g, d => toPersianDigits(d));
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
