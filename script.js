// ============================================
// KARATECH ELV — Site Logic
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- DATA ---------- */

  const workflow = [
    { en: 'P&ID', fa: 'P&ID' },
    { en: 'Design', fa: 'طراحی' },
    { en: 'Panel Design', fa: 'طراحی تابلو' },
    { en: 'Procurement', fa: 'تأمین قطعات' },
    { en: 'Assembly', fa: 'مونتاژ' },
    { en: 'FAT', fa: 'FAT' },
    { en: 'Installation', fa: 'نصب' },
    { en: 'Loop Check', fa: 'تست لوپ' },
    { en: 'Commissioning', fa: 'راه‌اندازی' },
    { en: 'SAT', fa: 'SAT' },
    { en: 'Documentation', fa: 'مستندسازی' },
    { en: 'Operation', fa: 'بهره‌برداری' },
  ];

  const tools = [
    { en: 'Cable Calculator', fa: 'محاسبه‌گر کابل' },
    { en: 'Voltage Drop', fa: 'افت ولتاژ' },
    { en: 'Power Factor', fa: 'ضریب توان' },
    { en: 'Motor Current', fa: 'جریان موتور' },
    { en: 'Breaker Selection', fa: 'انتخاب کلید' },
    { en: 'Contactor Selection', fa: 'انتخاب کنتاکتور' },
    { en: 'Transformer', fa: 'ترانسفورماتور' },
    { en: 'AWG ⇄ mm²', fa: 'AWG ⇄ mm²' },
    { en: 'Unit Converter', fa: 'تبدیل واحد' },
    { en: 'IP Rating', fa: 'درجه IP' },
    { en: 'IEC Reference', fa: 'مرجع IEC' },
  ];

  const resources = [
    { en: 'Library', fa: 'کتابخانه', status: 'dev' },
    { en: 'Catalogs', fa: 'کاتالوگ‌ها', status: 'vision' },
    { en: 'Datasheets', fa: 'دیتاشیت‌ها', status: 'vision' },
    { en: 'Videos', fa: 'ویدیوها', status: 'vision' },
    { en: 'Downloads', fa: 'دانلودها', status: 'vision' },
  ];

  const vision = [
    {
      en: 'Factory', fa: 'کارخانه',
      purposeEn: 'A real production facility for low-voltage panels, built and operated under Karatech ELV standards.',
      purposeFa: 'یک واحد تولید واقعی برای تابلوهای فشار ضعیف، ساخته‌شده تحت استانداردهای Karatech ELV.',
      status: 'vision'
    },
    {
      en: 'Products', fa: 'محصولات',
      purposeEn: 'A defined product line of panel types — distribution, control, automation — each documented and repeatable.',
      purposeFa: 'یک خط محصول مشخص از انواع تابلو — توزیع، کنترل، اتوماسیون — هرکدام مستندشده و تکرارپذیر.',
      status: 'vision'
    },
    {
      en: 'Projects', fa: 'پروژه‌ها',
      purposeEn: 'A public record of completed work — only added once a project is real, delivered, and verifiable.',
      purposeFa: 'یک سابقه عمومی از کارهای انجام‌شده — فقط زمانی اضافه می‌شود که پروژه واقعی، تحویل‌شده و قابل تأیید باشد.',
      status: 'vision'
    },
    {
      en: 'R&D', fa: 'تحقیق و توسعه',
      purposeEn: 'Internal testing of new panel configurations and component combinations before they reach production.',
      purposeFa: 'آزمایش داخلی پیکربندی‌های جدید تابلو و ترکیب قطعات پیش از ورود به تولید.',
      status: 'vision'
    },
    {
      en: 'Community', fa: 'جامعه مهندسی',
      purposeEn: 'A space for engineers using this reference to ask questions and share field experience.',
      purposeFa: 'فضایی برای مهندسانی که از این مرجع استفاده می‌کنند تا سؤال بپرسند و تجربه میدانی به اشتراک بگذارند.',
      status: 'vision'
    },
  ];

  const taglines = [
    { en: 'Engineering begins long before the first wire.', fa: 'مهندسی خیلی قبل از اولین سیم شروع می‌شود.' },
    { en: 'Every great system starts with a single drawing.', fa: 'هر سیستم بزرگ از یک نقشه ساده شروع می‌شود.' },
    { en: 'Knowledge is the most valuable tool.', fa: 'دانش، باارزش‌ترین ابزار است.' },
  ];

  /* ---------- LANGUAGE STATE ---------- */

  let currentLang = 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = lang === 'fa' ? el.getAttribute('data-fa') : el.getAttribute('data-en');
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === lang);
    });
    renderWorkflow();
    renderTools();
    renderResources();
    renderVision();
  }

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.langBtn));
  });

  /* ---------- RENDER: WORKFLOW ---------- */

  function renderWorkflow() {
    const el = document.getElementById('workflowPipeline');
    if (!el) return;
    el.innerHTML = '';
    workflow.forEach((step, i) => {
      const div = document.createElement('div');
      div.className = 'wf-step';
      div.innerHTML = `<span class="wf-step-num">${String(i + 1).padStart(2, '0')}</span><span class="wf-step-label">${currentLang === 'fa' ? step.fa : step.en}</span>`;
      el.appendChild(div);
      if (i < workflow.length - 1) {
        const conn = document.createElement('div');
        conn.className = 'wf-connector';
        el.appendChild(conn);
      }
    });
  }

  /* ---------- RENDER: TOOLS ---------- */

  function renderTools() {
    const el = document.getElementById('toolsGrid');
    if (!el) return;
    el.innerHTML = '';
    tools.forEach(tool => {
      const div = document.createElement('div');
      div.className = 'tool-card';
      div.innerHTML = `
        <div class="t-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/></svg></div>
        <h4>${currentLang === 'fa' ? tool.fa : tool.en}</h4>
        <span class="t-desc">${currentLang === 'fa' ? 'به‌زودی' : 'Coming soon'}</span>
      `;
      el.appendChild(div);
    });
  }

  /* ---------- RENDER: RESOURCES ---------- */

  function renderResources() {
    const el = document.getElementById('resourcesGrid');
    if (!el) return;
    el.innerHTML = '';
    resources.forEach(res => {
      const div = document.createElement('div');
      div.className = 'dash-card';
      const statusClass = res.status === 'dev' ? 'status-dev' : 'status-vision';
      const statusLabel = res.status === 'dev'
        ? (currentLang === 'fa' ? 'در حال توسعه' : 'In Development')
        : (currentLang === 'fa' ? 'چشم‌انداز' : 'Vision');
      div.innerHTML = `
        <div class="dash-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg></div>
        <h3 style="font-size:1rem">${currentLang === 'fa' ? res.fa : res.en}</h3>
        <div class="card-foot" style="margin-top:auto">
          <span class="status-pill ${statusClass}"><span class="status-dot"></span>${statusLabel}</span>
        </div>
      `;
      el.appendChild(div);
    });
  }

  /* ---------- RENDER: VISION ---------- */

  function renderVision() {
    const el = document.getElementById('visionGrid');
    if (!el) return;
    el.innerHTML = '';
    vision.forEach(v => {
      const div = document.createElement('div');
      div.className = 'vision-card';
      div.innerHTML = `
        <h4>${currentLang === 'fa' ? v.fa : v.en}</h4>
        <p class="v-purpose">${currentLang === 'fa' ? v.purposeFa : v.purposeEn}</p>
        <div class="v-meta">
          <span class="status-pill status-vision"><span class="status-dot"></span>${currentLang === 'fa' ? 'چشم‌انداز' : 'Vision'}</span>
        </div>
      `;
      el.appendChild(div);
    });
  }

  applyLang('en');

  /* ---------- TAGLINE ROTATION ---------- */

  let taglineIndex = 0;
  const taglineEl = document.getElementById('tagline');

  function rotateTagline() {
    if (!taglineEl) return;
    taglineIndex = (taglineIndex + 1) % taglines.length;
    const t = taglines[taglineIndex];
    taglineEl.style.opacity = '0';
    setTimeout(() => {
      taglineEl.innerHTML = `${currentLang === 'fa' ? t.fa : t.en}<span class="cursor"></span>`;
      taglineEl.style.opacity = '1';
    }, 400);
  }
  taglineEl && (taglineEl.style.transition = 'opacity 0.4s ease');
  setInterval(rotateTagline, 5000);

  /* ---------- NAV HIDE ON SCROLL ---------- */

  const nav = document.getElementById('topnav');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 80) {
      nav.classList.remove('hidden');
    } else if (y > lastY) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastY = y;
  }, { passive: true });

  /* ---------- SCROLL REVEAL ---------- */

  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- SMOOTH ANCHOR SCROLL OFFSET ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = id === 'landing' ? 0 : 64;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
