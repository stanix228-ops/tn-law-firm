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
    title: 'Вызов на допрос в полицию: 7 правил, которые спасут вас от обвинения и тюрьмы',
    category: 'Уголовная защита',
    categoryId: 'criminal',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер по уголовным делам конторы «T&N»',
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
    id: 'supreme-court-cassation',
    title: 'Отмена решений судов в Верховном Суде РК: алгоритм слома обвинения на 65 000 000 ₸',
    category: 'Верховный Суд РК',
    categoryId: 'supreme',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер судебной практики конторы «T&N»',
    authorPhoto: 'assets/media/advocate_1.jpeg',
    date: 'Январь 2026',
    readTime: '8 мин чтения',
    image: 'assets/images/article_supreme_court.jpg',
    summary: 'Реальный разгром оппонентов на 65 000 000 ₸. Как найти критические ошибки судей нижестоящих инстанций и добиться победы в кассации ВС РК.',
    content: `
      <p class="lead font-bold text-lg text-amber-400 mb-6">
        «В суде побеждает не вежливость, а безупречная доказательственная позиция и готовность идти до конца.»
      </p>

      <p class="mb-4 text-slate-300">
        90% юристов бросают дело после проигрыша в апелляции, разводя руками: «Ну, таковы суды». Это слабость. Кассационная коллегия Верховного Суда РК — это высшая лига, где мы ломаем ангажированные решения районных судей Алматы.
      </p>

      <div class="bg-slate-900 border-2 border-red-500/40 p-6 my-6 rounded-lg text-white">
        <div class="font-heading text-red-400 font-bold text-lg mb-2">🏆 Реальный кейс: Отмена взыскания 65 000 000 ₸</div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Суды Алматы двух инстанций присудили нашему клиенту чудовищный фиктивный долг. Мы выявили прямое нарушение норм материального права (ст. 654 ГК РК) и фальсификацию экспертизы. Верховный Суд РК в Астане полностью отменил решения нижестоящих судов и восстановил справедливость.
        </p>
      </div>
    `
  },
  {
    id: 'business-raiding-defense',
    title: 'Взыскание долгов в СМЭС г. Алматы: арест счетов и победа за 2 заседания',
    category: 'Защита бизнеса',
    categoryId: 'business',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер по защите бизнеса конторы «T&N»',
    authorPhoto: 'assets/media/advocate_1.jpeg',
    date: 'Январь 2026',
    readTime: '7 мин чтения',
    image: 'assets/images/article_business_debt.jpg',
    summary: 'Как действовать при невозврате средств: наложение обеспечительных мер в день подачи иска, блокировка активов должника и 100% возврат.',
    content: `
      <p class="lead font-bold text-lg text-red-400 mb-6">
        «Если должник выведет активы — исполнительный лист превратится в бесполезную бумажку. Действовать нужно мгновенно.»
      </p>
      <p class="mb-4 text-slate-300">
        Мы подаем ходатайство об аресте всех банковских счетов и имущества ответчика одновременно с исковым заявлением. СМЭС г. Алматы выносит определение за 24 часа. Должник лишается возможности скрыть деньги и вынужден вернуть долг.
      </p>
    `
  },
  {
    id: 'property-division-defense',
    title: 'Раздел дорогостоящего бизнеса и недвижимости в Алматы: защита от фиктивных долгов',
    category: 'Защита активов',
    categoryId: 'business',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер судебной практики конторы «T&N»',
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
    title: 'Банкротство физических лиц в РК: как законно списать долги и спасти единственное жилье',
    category: 'Банкротство',
    categoryId: 'business',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер конторы «T&N»',
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
const TN_ARTICLE_IMAGES = {
  'interrogation-rules': 'assets/images/article_interrogation.jpg',
  'supreme-court-cassation': 'assets/images/article_supreme_court.jpg',
  'business-raiding-defense': 'assets/images/article_business_debt.jpg',
  'property-division-defense': 'assets/images/article_property_asset.jpg',
  'bankruptcy-individuals-rk': 'assets/images/article_bankruptcy.jpg'
};

// Helper to fetch live articles with guaranteed fresh image paths
function getActiveArticles() {
  const local = localStorage.getItem('tn_law_articles');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
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
          <div class="flex items-center gap-2">
            <img src="${article.authorPhoto || 'assets/media/advocate_1.jpeg'}" alt="${article.author}" class="w-7 h-7 rounded-full object-cover border border-red-500">
            <span class="text-xs font-bold text-slate-300">${article.author || 'Адвокат'}</span>
          </div>
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
  if (authorNameEl) authorNameEl.innerText = article.author || 'Адвокат';
  if (authorRoleEl) authorRoleEl.innerText = article.authorRole || 'Партнер конторы «T&N»';
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

// Lead Management & Telegram Dispatch
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
      notes: leadData.notes || 'Обращение через боевой сайт «Адвокат Дьявола».',
      status: 'new',
      date: new Date().toLocaleString('ru-RU'),
      source: leadData.source || 'Devil Advocate Landing'
    };

    existing.unshift(newLead);
    localStorage.setItem('tn_law_leads', JSON.stringify(existing));

    // Telegram Bot API dispatch
    const tgConfig = JSON.parse(localStorage.getItem('tn_tg_config') || '{}');
    if (tgConfig.botToken && tgConfig.chatId) {
      const text = `🔥 *СРОЧНЫЙ ВЫЗОВ: АДВОКАТ ДЬЯВОЛА!*\n\n` +
        `👤 *Имя:* ${newLead.name}\n` +
        `📞 *Телефон:* ${newLead.phone}\n` +
        `💼 *Дело:* ${newLead.service}\n` +
        `⏱ *Срочность:* ${newLead.urgency}\n` +
        `📝 *Детали:* ${newLead.notes}\n` +
        `🕒 *Время:* ${newLead.date}`;

      fetch(`https://api.telegram.org/bot${tgConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgConfig.chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.log('Telegram note:', err));
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

// Case Video Auto-play & Interaction Controller
function initCaseVideoController() {
  const caseVideo = document.getElementById('case-showcase-video');
  if (!caseVideo) return;

  caseVideo.muted = true;
  caseVideo.playsInline = true;
  
  const tryPlay = () => {
    const playPromise = caseVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.log('Case video autoplay prevented, awaiting user click:', err);
      });
    }
  };

  tryPlay();
  window.addEventListener('scroll', tryPlay, { once: true });
  window.addEventListener('touchstart', tryPlay, { once: true });
  window.addEventListener('click', tryPlay, { once: true });
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

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initVideoSoundController();
  initCaseVideoController();
  initPhoneMasks();
  initArticlesFilter();
  initAllForms();
  initMobileMenu();
});
