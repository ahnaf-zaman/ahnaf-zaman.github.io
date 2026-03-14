// main.js - render portfolio from PORTFOLIO object

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHero();
  renderAbout();
  renderProjects();
  renderSkills();
  renderExperience();
  renderAwards();
  renderContact();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  document.getElementById('footer-name').textContent = PORTFOLIO.name;

  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById('view-projects').addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  });
  typewriterEffect();
});

/* theme */
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}
function toggleTheme() {
  const current = localStorage.getItem('theme') || 'dark';
  setTheme(current === 'dark' ? 'light' : 'dark');
}
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
}

/* typewriter */
function typewriterEffect() {
  const el = document.getElementById('hero-tagline');
  if (!el || !PORTFOLIO.taglines || !PORTFOLIO.taglines.length) return;
  let index = 0;
  let subIndex = 0;
  let forward = true;
  const speed = 100;
  function tick() {
    const text = PORTFOLIO.taglines[index];
    if (forward) {
      el.textContent = text.slice(0, subIndex + 1);
      subIndex++;
      if (subIndex === text.length) {
        forward = false;
        setTimeout(tick, 1000);
        return;
      }
    } else {
      el.textContent = text.slice(0, subIndex - 1);
      subIndex--;
      if (subIndex === 0) {
        forward = true;
        index = (index + 1) % PORTFOLIO.taglines.length;
      }
    }
    setTimeout(tick, speed);
  }
  tick();
}

/* render sections */
function renderHero() {
  document.getElementById('hero-name').textContent = PORTFOLIO.name;
  document.getElementById('hero-bio').textContent = PORTFOLIO.bio;
  // const cv = document.getElementById('download-cv');
  // cv.href = PORTFOLIO.cv || '';
}

function renderAbout() {
  if (PORTFOLIO.avatar) {
    document.getElementById('about-avatar').src = PORTFOLIO.avatar;
  }
  document.getElementById('about-bio-long').textContent = PORTFOLIO.bio || '';
  const statsContainer = document.getElementById('about-stats');
  if (PORTFOLIO.stats && PORTFOLIO.stats.length) {
    PORTFOLIO.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'stat';
      div.innerHTML = `<strong>${s.value}</strong> ${s.label}`;
      statsContainer.appendChild(div);
    });
  }
}

function renderProjects() {
  const grid = document.getElementById('project-grid');
  const filters = document.getElementById('project-filters');
  const tags = new Set();
  PORTFOLIO.projects.forEach(p => {
    if (p.tags) p.tags.forEach(t => tags.add(t));
    const card = document.createElement('div');
    card.className = 'card project-card';
    card.setAttribute('data-tags', (p.tags || []).join(','));
    card.innerHTML = `
      <img src="${p.image || ''}" alt="${p.title}" />
      <p>${p.description}</p>
      <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="links">
        ${p.github?`<a class="btn" href="${p.github}" target="_blank">GitHub</a>`:''}
        ${p.demo?`<a class="btn" href="${p.demo}" target="_blank">Demo</a>`:''}
      </div>
    `;
    grid.appendChild(card);
  });
  // build filter pills
  buildProjectFilter(filters, Array.from(tags));
}

function buildProjectFilter(container, tags) {
  const all = document.createElement('button');
  all.textContent = 'All';
  all.className = 'filter-pill active';
  all.addEventListener('click', () => applyProjectFilter(''));
  container.appendChild(all);
  tags.forEach(t => {
    const btn = document.createElement('button');
    btn.textContent = t;
    btn.className = 'filter-pill';
    btn.addEventListener('click', () => applyProjectFilter(t));
    container.appendChild(btn);
  });
}

function applyProjectFilter(tag) {
  document.querySelectorAll('#project-filters .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === (tag || 'All'));
  });
  document.querySelectorAll('.project-card').forEach(card => {
    const tags = card.getAttribute('data-tags');
    if (!tag || (tags && tags.split(',').includes(tag))) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  (PORTFOLIO.skills||[]).forEach(cat => {
    const section = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = cat.category;
    section.appendChild(h3);
    cat.items.forEach(item => {
      const barWrapper = document.createElement('div');
      barWrapper.className = 'skill-bar-wrapper';
      barWrapper.innerHTML = `
        <span class="skill-name">${item.name}</span>
        <div class="skill-bar" data-level="${item.level}"><div class="skill-bar-fill"></div></div>
      `;
      section.appendChild(barWrapper);
    });
    container.appendChild(section);
  });
  // simple animation on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.skill-bar').forEach(bar => {
          const lvl = bar.dataset.level || 0;
          bar.querySelector('.skill-bar-fill').style.width = (lvl / 5 * 100) + '%';
        });
        observer.disconnect();
      }
    });
  });
  observer.observe(container);
}

function renderExperience() {
  const timeline = document.getElementById('experience-timeline');
  (PORTFOLIO.experience||[]).forEach(exp => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <span class="tl-label">${exp.dates}</span>
      <h4>${exp.role} @ ${exp.company}</h4>
      <p>${exp.location || ''}</p>
      <ul>${(exp.bullets||[]).map(b=>`<li>${b}</li>`).join('')}</ul>
    `;
    timeline.appendChild(item);
  });
}

function renderAwards() {
  const grid = document.getElementById('awards-grid');
  (PORTFOLIO.awards||[]).forEach(a => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>${a.title}</h4>
      <p>${a.org} &bull; ${a.year}</p>
    `;
    grid.appendChild(card);
  });
}

function renderContact() {
  const div = document.getElementById('contact-links');
  const c = PORTFOLIO.contact || {};
  if (c.email) {
    const btn = document.createElement('button');
    btn.textContent = "[MAIL]";
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(c.email);
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = "Mail"), 1500);
    });
    div.appendChild(btn);
  }
  if (c.github) {
    const a = document.createElement('a');
    a.className = 'btn';
    a.href = c.github;
    a.textContent = '[GH]';
    a.target = '_blank';
    div.appendChild(a);
  }
  if (c.linkedin) {
    const a = document.createElement('a');
    a.className = 'btn';
    a.href = c.linkedin;
    a.textContent = '[LI]';
    a.target = '_blank';
    div.appendChild(a);
  }
  if (c.cv) {
    const a = document.createElement('a');
    a.className = 'btn';
    a.id = 'download-cv';
    a.href = c.cv;
    a.textContent = '[CV]';
    a.download = '';
    div.appendChild(a);
  }
}
