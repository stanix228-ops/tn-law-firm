/**
 * T&N Law Firm - Devil's Advocate High-Octane Client Script
 */

// Global state
let isMusicPlaying = false;

// Audio / Video sound controller for devil_loop.mp4
function initVideoSoundController() {
  const video = document.getElementById('devil-loop-video');
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-toggle-label');

  if (!video || !soundBtn) return;

  // Modern browsers require initial muted autoplay
  video.muted = true;
  video.play().catch(err => console.log('Autoplay policy note:', err));

  soundBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      video.play();
      isMusicPlaying = true;
      soundBtn.classList.add('playing', 'bg-red-600', 'border-white');
      if (soundLabel) soundLabel.innerText = 'Выключить звук';
      showToast('🔊 Саундтрек включен', 'success');
    } else {
      video.muted = true;
      isMusicPlaying = false;
      soundBtn.classList.remove('playing', 'bg-red-600', 'border-white');
      if (soundLabel) soundLabel.innerText = 'Включить звук';
      showToast('🔇 Звук выключен');
    }
  });
}

// Articles Data Store (Custom Dark Theme Generated Images)
const TN_ARTICLES = [
  {
    id: 'interrogation-rules',
    title: 'Правила которые спасут от фатальных ошибок',
    category: 'Уголовная защита',
    categoryId: 'criminal',
    author: 'Ерсаин Нурлан',
    authorRole: 'Учредитель адвокатской конторы «T&N»',
    authorPhoto: 'assets/media/advocate_1.jpeg',
    date: 'Февраль 2026',
    readTime: '6 мин чтения',
    image: 'assets/images/article_interrogation.jpg',
    summary: 'Хватит быть наивной жертвой. Следователю не нужна правда — ему нужна ваша подпись и обвинительный приговор. Как разбить психологическое давление с первых секунд.',
    content: `
      <p class="lead font-bold text-lg text-red-400 mb-6">
        «Чем дольше раздумываешь — тем меньше времени. Чем меньше времени — тем меньше вариантов. Чем меньше вариантов — тем меньше шансов.»
      </p>

      <p class="mb-4 text-slate-300">
        Каждую неделю к нам приходят граждане и предприниматели, которые пошли в РУВД «всего на 10 минут просто побеседовать». Они выходят оттуда через ИВС и СИЗО. Если против вас возбуждено дело — вас пришли уничтожить, а не вести философские дискуссии.
      </p>

      <h3 class="font-heading text-xl font-bold text-white mt-8 mb-3 border-l-4 border-red-600 pl-3">1. Повестка, а не «звонок от следователя»</h3>
      <p class="mb-4 text-slate-300">
        По ст. 205 УПК РК вызов осуществляется исключительно официальной повесткой. Никаких «подъезжай на 5 минут». Вы не обязаны бежать по первому щелчку. Время между звонком и повесткой — это ваше драгоценное время для вызова адвоката.
      </p>

      <h3 class="font-heading text-xl font-bold text-white mt-8 mb-3 border-l-4 border-red-600 pl-3">2. Ловушка «Свидетеля с правом на защиту»</h3>
      <p class="mb-4 text-slate-300">
        Вам говорят: «Ты же свидетель, чего бояться?». Но по ст. 65-1 УПК РК этот статус означает одно: вы уже подозреваемый, просто улик на вас пока не хватает. Допрос без адвоката в этом статусе — юридическое самоубийство.
      </p>

      <div class="bg-red-950/40 border border-red-500/50 p-5 my-6 rounded-lg">
        <div class="font-bold text-red-400 mb-1">⚔️ Статья 77 Конституции РК:</div>
        <p class="text-sm text-slate-300 italic">
          «Никто не обязан свидетельствовать против себя, своего супруга и близких родственников...» Молчание до приезда адвоката — это не признание вины, это сохранение свободы.
        </p>
      </div>

      <h3 class="font-heading text-xl font-bold text-white mt-8 mb-3 border-l-4 border-red-600 pl-3">3. Никаких «чистосердечных признаний»</h3>
      <p class="mb-4 text-slate-300">
        Фраза «Напиши явку, мы учтем» переводится как «Облегчи нам работу, сядешь быстрее». Ни один документ не подписывается без согласования с защитником.
      </p>
    `
  },
  {
    id: 'property-division-defense',
    title: 'Раздел имущества',
    category: 'Защита активов',
    categoryId: 'business',
    author: 'Ерсаин Нурлан',
    authorRole: 'Учредитель адвокатской конторы «T&N»',
    authorPhoto: 'assets/media/advocate_1.jpeg',
    date: 'Декабрь 2025',
    readTime: '6 мин чтения',
    image: 'assets/images/article_property_asset.jpg',
    summary: 'Как защитить доли в ТОО, коммерческие объекты и предотвратить создание искусственных долговых расписок недобросовестными оппонентами.',
    content: `
      <p class="lead font-bold text-lg text-amber-400 mb-6">
        «В спорах за активы побеждает тот, кто первым заблокирует рейдерские схемы.»
      </p>
      <p class="mb-4 text-slate-300">
        При попытках отчуждения коммерческой недвижимости или рейдерского размытия долей мы проводим судебно-бухгалтерскую экспертизу, оспариваем мнимые сделки и сохраняем активы доверителя.
      </p>
    `
  },
  {
    id: 'bankruptcy-individuals-rk',
    title: 'Банкротство физических лиц',
    category: 'Банкротство',
    categoryId: 'business',
    author: 'Ерсаин Нурлан',
    authorRole: 'Учредитель адвокатской конторы «T&N»',
    authorPhoto: 'assets/media/advocate_1.jpeg',
    date: 'Ноябрь 2025',
    readTime: '5 мин чтения',
    image: 'assets/images/article_bankruptcy.jpg',
    summary: 'Пошаговый правовой алгоритм признания банкротом в Казахстане. Какие кредиты списываются и как не допустить продажу единственного жилья.',
    content: `
      <p class="lead font-bold text-lg text-red-400 mb-6">
        «Закон о банкротстве в РК защищает добросовестных должников при грамотном юридическом сопровождении.»
      </p>
      <p class="mb-4 text-slate-300">
        Полный анализ кредитного портфеля, защита от коллекторов и судебных исполнителей, признание процедуры банкротства завершенной со списанием всех обязательств.
      </p>
    `
  }
];

// Reliable Article Image Map (Both WebP and JPG support)
const TN_ARTICLES_VERSION = 'v22.0';
const TN_ARTICLE_IMAGES = {
  'interrogation-rules': 'assets/images/article_interrogation.jpg',
  'property-division-defense': 'assets/images/article_property_asset.jpg',
  'bankruptcy-individuals-rk': 'assets/images/article_bankruptcy.jpg'
};

// Helper to fetch live articles with guaranteed fresh image paths & full list
function getActiveArticles() {
  const version = localStorage.getItem('tn_law_articles_version');
  const local = localStorage.getItem('tn_law_articles');
  
  if (version === TN_ARTICLES_VERSION && local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length >= TN_ARTICLES.length) {
        // Sync & heal image paths from verified assets
        const healed = parsed.map(art => {
          if (TN_ARTICLE_IMAGES[art.id]) {
            art.image = TN_ARTICLE_IMAGES[art.id];
          }
          if (!art.image || art.image.includes('placeholder') || art.image.includes('undefined')) {
            art.image = TN_ARTICLE_IMAGES[art.id] || 'assets/images/article_interrogation.jpg';
          }
          return art;
        });
        localStorage.setItem('tn_law_articles', JSON.stringify(healed));
        return healed;
      }
    } catch (e) {}
  }

  // If missing, outdated, or corrupted: store full default articles
  try {
    localStorage.setItem('tn_law_articles', JSON.stringify(TN_ARTICLES));
    localStorage.setItem('tn_law_articles_version', TN_ARTICLES_VERSION);
  } catch (e) {}
  return TN_ARTICLES;
}

// Articles Filter & Render
function renderArticlesList(categoryId = 'all') {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  const allArticles = getActiveArticles();
  const filtered = categoryId === 'all' ? 
    allArticles : 
    allArticles.filter(a => a.categoryId === categoryId);

  container.innerHTML = filtered.map(article => {
    const baseImg = article.image || TN_ARTICLE_IMAGES[article.id] || 'assets/images/article_interrogation.jpg';
    const webpImg = baseImg.replace('.jpg', '.webp');
    return `
    <article class="group bg-[#0e1117] border border-red-500/20 hover:border-red-500 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 flex flex-col">
      <div class="relative h-56 overflow-hidden bg-[#07080a]">
        <picture>
          <source srcset="${webpImg}?v=6.0" type="image/webp">
          <img src="${baseImg}?v=6.0" 
               alt="${article.title}" 
               loading="lazy"
               onerror="if(!this.dataset.fallback){this.dataset.fallback='1'; this.src=this.src.includes('assets/images')?this.src.replace('assets/images','assets/media'):'assets/media/materials_bg.jpeg';}"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 block">
        </picture>
        <div class="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded shadow">
          ${article.category}
        </div>
      </div>
      
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span>📅 ${article.date || 'Недавно'}</span>
            <span>•</span>
            <span>⏱ ${article.readTime || '6 мин'}</span>
          </div>
          <h3 class="font-heading text-lg font-bold text-white group-hover:text-red-400 transition leading-snug line-clamp-2">
            <a href="javascript:void(0)" onclick="openArticleModal('${article.id}')">${article.title}</a>
          </h3>
          <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-2">
            ${article.summary || ''}
          </p>
        </div>

        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">Практика «T&N»</span>
          <button onclick="openArticleModal('${article.id}')" class="text-xs font-extrabold uppercase tracking-wider text-red-400 hover:text-white flex items-center gap-1 transition">
            <span>Читать разбор</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `}).join('');
}

function initArticlesFilter() {
  const filterButtons = document.querySelectorAll('.article-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-red-600', 'text-white', 'border-red-600');
        b.classList.add('bg-black/60', 'text-slate-400', 'border-white/10');
      });
      this.classList.add('active', 'bg-red-600', 'text-white', 'border-red-600');
      this.classList.remove('bg-black/60', 'text-slate-400', 'border-white/10');

      renderArticlesList(this.dataset.category);
    });
  });

  renderArticlesList('all');
}

function openArticleModal(articleId) {
  const allArticles = getActiveArticles();
  const article = allArticles.find(a => a.id === articleId);
  if (!article) return;

  const modal = document.getElementById('article-reader-modal');
  const titleEl = document.getElementById('article-modal-title');
  const categoryEl = document.getElementById('article-modal-category');
  const dateEl = document.getElementById('article-modal-date');
  const readTimeEl = document.getElementById('article-modal-readtime');
  const authorNameEl = document.getElementById('article-modal-author-name');
  const authorRoleEl = document.getElementById('article-modal-author-role');
  const authorPhotoEl = document.getElementById('article-modal-author-photo');
  const contentEl = document.getElementById('article-modal-content');
  const bannerImgEl = document.getElementById('article-modal-banner');
  const ctaServiceInput = document.getElementById('article-cta-service');

  if (titleEl) titleEl.innerText = article.title;
  if (categoryEl) categoryEl.innerText = article.category;
  if (dateEl) dateEl.innerText = article.date || 'Недавно';
  if (readTimeEl) readTimeEl.innerText = article.readTime || '6 мин';
  if (authorNameEl) authorNameEl.innerText = article.author || 'Ерсаин Нурлан';
  if (authorRoleEl) authorRoleEl.innerText = article.authorRole || 'Учредитель адвокатской конторы «T&N»';
  if (authorPhotoEl) authorPhotoEl.src = article.authorPhoto || 'assets/media/advocate_1.jpeg';
  if (bannerImgEl) {
    const bannerSrc = article.image || TN_ARTICLE_IMAGES[article.id] || 'assets/images/article_interrogation.jpg';
    bannerImgEl.onerror = function() { this.onerror = null; this.src = 'assets/images/article_interrogation.jpg'; };
    bannerImgEl.src = bannerSrc;
  }
  if (contentEl) contentEl.innerHTML = article.content || '';
  if (ctaServiceInput) ctaServiceInput.value = `Разбор по статье: ${article.title}`;

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeArticleModal() {
  const modal = document.getElementById('article-reader-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }
}

// Kazakhstan Phone Mask
function initPhoneMasks() {
  const phoneInputs = document.querySelectorAll('input[type="tel"], .phone-mask');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function (e) {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[2]) {
        e.target.value = x[1] ? '+7 (' : '';
      } else {
        e.target.value = '+7 (' + (x[2][0] === '7' ? x[2] : '7' + x[2].slice(0, 2)) +
          (x[3] ? ') ' + x[3] : '') +
          (x[4] ? '-' + x[4] : '') +
          (x[5] ? '-' + x[5] : '');
      }
    });

    input.addEventListener('focus', function (e) {
      if (!e.target.value) {
        e.target.value = '+7 (7';
      }
    });
  });
}

// Toast
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-[#0e1117] border-red-500 text-white shadow-2xl shadow-red-950/80' : 'bg-red-900 border-red-500 text-white';
  const icon = type === 'success' ? 
    `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>` :
    `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

  toast.className = `${bgColor} border-2 rounded-xl p-4 flex items-center gap-3 transform translate-y-[-20px] opacity-0 transition-all duration-300 pointer-events-auto min-w-[300px] max-w-md`;
  toast.innerHTML = `
    <div class="p-1 bg-red-500/20 rounded-full">${icon}</div>
    <div class="text-sm font-bold flex-1">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-[-20px]', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

// Lead Management & WhatsApp / Telegram Dispatch
async function handleNewLead(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('tn_law_leads') || '[]');
    const newLead = {
      id: 'L-' + Date.now(),
      name: leadData.name || 'Доверитель',
      phone: leadData.phone,
      service: leadData.service || 'Экстренная защита адвоката',
      stage: leadData.stage || 'Срочный выезд',
      urgency: leadData.urgency || 'Срочная 24/7',
      notes: leadData.notes || 'Обращение через сайт адвокатской конторы «T&N».',
      status: 'new',
      date: new Date().toLocaleString('ru-RU'),
      source: leadData.source || 'Главный сайт T&N'
    };

    existing.unshift(newLead);
    localStorage.setItem('tn_law_leads', JSON.stringify(existing));

    // 1. WhatsApp Direct Dispatch Formatting
    const siteSettings = JSON.parse(localStorage.getItem('tn_site_settings') || '{}');
    const rawWaPhone = siteSettings.whatsappPhone || '77786775119';
    const cleanWaPhone = rawWaPhone.replace(/\D/g, '') || '77786775119';

    const waMessageText = `⚖️ *СРОЧНЫЙ ВЫЗОВ: АДВОКАТСКАЯ КОНТОРА «T&N»*\n\n` +
      `👤 *Клиент:* ${newLead.name}\n` +
      `📞 *Телефон:* ${newLead.phone}\n` +
      `💼 *Дело / Вопрос:* ${newLead.service}\n` +
      `⏱ *Срочность:* ${newLead.urgency}\n` +
      `📝 *Детали:* ${newLead.notes}\n` +
      `🕒 *Время:* ${newLead.date}\n` +
      `🌐 *Источник:* ${newLead.source}`;

    const waUrl = `https://wa.me/${cleanWaPhone}?text=${encodeURIComponent(waMessageText)}`;

    // Update WhatsApp button in success modal
    const successWaBtn = document.getElementById('success-wa-btn');
    if (successWaBtn) {
      successWaBtn.href = waUrl;
    }

    // Automatically open WhatsApp in new window/app
    try {
      window.open(waUrl, '_blank');
    } catch (popupErr) {
      console.log('Pop-up prevented by browser, accessible via modal button');
    }

    // 2. Telegram Bot API dispatch
    const tgConfig = JSON.parse(localStorage.getItem('tn_tg_config') || '{}');
    if (tgConfig.botToken && tgConfig.chatId) {
      const tgText = `🔥 *СРОЧНЫЙ ВЫЗОВ: АДВОКАТСКАЯ КОНТОРА «T&N»!*\n\n` +
        `👤 *Имя:* ${newLead.name}\n` +
        `📞 *Телефон:* ${newLead.phone}\n` +
        `💼 *Дело:* ${newLead.service}\n` +
        `⏱ *Срочность:* ${newLead.urgency}\n` +
        `📝 *Детали:* ${newLead.notes}\n` +
        `🕒 *Время:* ${newLead.date}\n` +
        `🌐 *Источник:* ${newLead.source}`;

      fetch(`https://api.telegram.org/bot${tgConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgConfig.chatId,
          text: tgText,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.log('Telegram dispatch note:', err));
    }

    return true;
  } catch (e) {
    console.error('Error saving lead:', e);
    return false;
  }
}

// Forms Submission
function initAllForms() {
  // Main Emergency Form
  const mainForm = document.getElementById('devil-main-form');
  if (mainForm) {
    mainForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('input_devil_name')?.value || '';
      const phone = document.getElementById('input_devil_phone')?.value || '';
      const message = document.getElementById('input_devil_message')?.value || '';

      if (phone.length < 16) {
        showToast('Введите корректный номер телефона', 'error');
        return;
      }

      await handleNewLead({
        name: name,
        phone: phone,
        service: 'Запрос на экстренную защиту и слом обвинения',
        notes: message,
        source: 'Главная боевая форма'
      });

      mainForm.reset();
      openSuccessModal();
      showToast('Запрос принят! Адвокат свяжется с вами незамедлительно.');
    });
  }

  // Modal Form
  const modalForm = document.getElementById('modal-consult-form');
  if (modalForm) {
    modalForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const phone = document.getElementById('modal-phone');
      const name = document.getElementById('modal-name');
      const service = document.getElementById('modal-service');
      const msg = document.getElementById('modal-message');

      if (!phone || phone.value.length < 16) {
        showToast('Укажите корректный номер телефона', 'error');
        return;
      }

      await handleNewLead({
        name: name ? name.value : 'Клиент',
        phone: phone.value,
        service: service ? service.value : 'Экстренная защита',
        urgency: 'Срочная 24/7',
        notes: msg ? msg.value : 'Заявка из модального окна',
        source: 'Модальное окно'
      });

      closeConsultModal();
      openSuccessModal();
      showToast('Вызов зафиксирован! Выезжаем / Перезваниваем.');
    });
  }

  // Article CTA Form
  const articleCtaForm = document.getElementById('article-cta-form');
  if (articleCtaForm) {
    articleCtaForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const phone = document.getElementById('article-cta-phone');
      const name = document.getElementById('article-cta-name');
      const service = document.getElementById('article-cta-service')?.value || 'Вопрос по материалу';

      if (!phone || phone.value.length < 16) {
        showToast('Укажите корректный номер телефона', 'error');
        return;
      }

      await handleNewLead({
        name: name ? name.value : 'Читатель материала',
        phone: phone.value,
        service: service,
        urgency: 'Срочная',
        notes: `Запрос из материала: ${service}`,
        source: 'Модальное окно статьи'
      });

      closeArticleModal();
      openSuccessModal();
      showToast('Запрос отправлен адвокату!');
    });
  }
}

// Modal Controllers
function openConsultModal(defaultService = 'Экстренная защита адвоката 24/7') {
  const modal = document.getElementById('consultation-modal');
  const serviceField = document.getElementById('modal-service');
  if (serviceField) serviceField.value = defaultService;
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeConsultModal() {
  const modal = document.getElementById('consultation-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

function openSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

// Video Auto-play & Interaction Controller (Hero, Case, Principles)
function initAllVideosController() {
  const videoIds = ['case-showcase-video', 'principles-video'];
  
  videoIds.forEach(id => {
    const video = document.getElementById(id);
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    
    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log(`Autoplay paused for ${id}:`, err);
        });
      }
    };

    tryPlay();
    window.addEventListener('scroll', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });
    window.addEventListener('click', tryPlay, { once: true });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-header--nav-toggle');
  const mobileNav = document.getElementById('mobile-menu');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      mobileNav.classList.toggle('hidden');
    });
  }
}

// Office Dark 2GIS Map Controller (2GIS JS API 2.0 / DG / Dark Theme)
function initOfficeMap() {
  const container = document.getElementById('office-2gis-map');
  if (!container) return;

  const lat = 43.254842;
  const lng = 76.970608;

  // 1. Try 2GIS Maps JS API 2.0 (DG)
  if (typeof DG !== 'undefined' && DG.then) {
    DG.then(function () {
      // Clear fallback iframe if 2GIS API is ready
      container.innerHTML = '';
      const map = DG.map('office-2gis-map', {
        center: [lat, lng],
        zoom: 18,
        scrollWheelZoom: false,
        fullscreenControl: false
      });

      const customIcon = DG.divIcon({
        className: 'custom-2gis-marker',
        html: '<div style="background:#ff1e27;color:#fff;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 25px rgba(255,30,39,0.9);border:2px solid #fff;cursor:pointer;">⚖️</div>',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = DG.marker([lat, lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family:'Montserrat',sans-serif;padding:6px 2px;background:#0e1117;color:#fff;min-width:200px;">
          <div style="font-weight:900;color:#ff1e27;text-transform:uppercase;font-size:13px;margin-bottom:4px;">⚖️ Адвокатская контора «T&N»</div>
          <div style="font-size:12px;color:#cbd5e1;line-height:1.4;">г. Алматы, ул. Богенбай батыра, 23а<br><span style="color:#22c55e;font-size:11px;font-weight:bold;">★ 5.0 в 2ГИС • 54 отзыва</span></div>
          <div style="margin-top:8px;"><a href="https://2gis.kz/almaty/inside/9430047417451853/firm/70000001082633855?m=76.970608%2C43.254842%2F18.89" target="_blank" style="color:#f59e0b;font-weight:800;font-size:11px;text-decoration:underline;">Маршрут в 2ГИС →</a></div>
        </div>
      `);
    });
    return;
  }
}

// Reviews Smooth Animated Carousel & Touch/Drag Controller
function initReviewsCarousel() {
  const track = document.getElementById('reviews-carousel-track');
  if (!track) return;

  const prevBtn = document.getElementById('reviews-prev-btn');
  const nextBtn = document.getElementById('reviews-next-btn');

  let isPaused = false;
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  const speed = 0.7; // Smooth glidespeed in pixels per frame

  // Continuous loop animation using requestAnimationFrame
  function animate() {
    if (!isPaused && !isDown) {
      track.scrollLeft += speed;
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && track.scrollLeft >= halfWidth) {
        track.scrollLeft -= halfWidth;
      }
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Pause on hover
  track.addEventListener('mouseenter', () => { isPaused = true; });
  track.addEventListener('mouseleave', () => {
    if (!isDown) isPaused = false;
  });

  // Touch & Swipe Support
  track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  track.addEventListener('touchend', () => {
    setTimeout(() => { isPaused = false; }, 2500);
  }, { passive: true });

  // Mouse Drag to Scroll
  track.addEventListener('mousedown', (e) => {
    isDown = true;
    isPaused = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      setTimeout(() => { isPaused = false; }, 1800);
    }
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth > 0) {
      if (track.scrollLeft >= halfWidth) {
        track.scrollLeft -= halfWidth;
      } else if (track.scrollLeft <= 0) {
        track.scrollLeft += halfWidth;
      }
    }
  });

  // Navigation Arrow Buttons
  const getCardStep = () => {
    const card = track.querySelector('.review-card-item');
    return card ? (card.offsetWidth + 20) : 410;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      isPaused = true;
      track.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
      setTimeout(() => { isPaused = false; }, 3500);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      isPaused = true;
      track.scrollBy({ left: getCardStep(), behavior: 'smooth' });
      setTimeout(() => { isPaused = false; }, 3500);
    });
  }
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initVideoSoundController();
  initAllVideosController();
  initOfficeMap();
  initPhoneMasks();
  initReviewsCarousel();
  initArticlesFilter();
  initAllForms();
  initMobileMenu();
});
