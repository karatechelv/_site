(function() {
  let currentLang = 'en';
  const splash = document.getElementById('splash');
  const dashboard = document.getElementById('dashboard');

  // Enter button
  document.getElementById('enterBtn').addEventListener('click', function() {
    splash.classList.add('hidden');
    dashboard.classList.add('active');
  });

  // Language switch
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentLang = this.dataset.lang;
      translatePage(currentLang);
      document.body.classList.toggle('lang-persian', currentLang === 'fa');
    });
  });

  function translatePage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.dataset[lang];
      if (text) {
        const childNodes = el.childNodes;
        for (let node of childNodes) {
          if (node.nodeType === 3) {
            node.textContent = text;
            break;
          }
        }
      }
    });
    
    const sub = document.querySelector('.splash-sub');
    if (sub) {
      const txt = sub.dataset[lang];
      if (txt) sub.textContent = txt;
    }
    
    const btnSpan = document.querySelector('.splash-btn span');
    if (btnSpan) {
      const txt = btnSpan.dataset[lang];
      if (txt) btnSpan.textContent = txt;
    }
  }

  // Academy card click - show details
  document.querySelectorAll('.card-academy').forEach(card => {
    card.addEventListener('click', function() {
      const key = this.dataset.key;
      const descriptions = {
        electrical: 'Power systems, protection coordination, load calculation.',
        automation: 'PLC programming, HMI design, SCADA, industrial networks.',
        instrumentation: 'Sensors, transmitters, control valves, analyzers.',
        design: 'CAD, schematics, panel design, cable routing.',
        quality: 'Inspection, testing, quality plans, continuous improvement.',
        standards: 'IEC, NEC, ISO, API, IEEE standards application.',
        management: 'Project management, engineering workflow, resource planning.',
        hse: 'Safety, environment, health, risk mitigation.'
      };
      
      const examples = {
        electrical: 'Motor control center, power distribution panel.',
        automation: 'PLC program for conveyor sorting, SCADA HMI.',
        instrumentation: 'Pressure transmitter calibration, flow meter.',
        design: 'Electrical schematics, panel layout in EPLAN.',
        quality: 'FAT procedure, ISO 9001 checklist.',
        standards: 'IEC 61439, NEC article 430.',
        management: 'Gantt chart, risk register, weekly reports.',
        hse: 'LOTO procedure, risk assessment, safety audit.'
      };

      alert(
        `🔧 ${key.charAt(0).toUpperCase() + key.slice(1)}\n\n` +
        `${descriptions[key] || 'Engineering discipline'}\n\n` +
        `📌 Example: ${examples[key] || 'Practical case'}\n\n` +
        `📚 Learning path: Foundation → Intermediate → Advanced\n` +
        `🔧 Software: EPLAN, TIA Portal, AutoCAD, etc.\n` +
        `🎥 Videos & future lessons available.`
      );
    });
  });

  // Initial translation
  translatePage('en');
})();
