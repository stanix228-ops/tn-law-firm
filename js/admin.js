/**
 * T&N Law Firm - Unified Admin CRM & CMS Engine
 * Handles:
 * 1. Lead Lifecycle & CRM
 * 2. Article Publishing & CMS Engine
 * 3. Site Settings & Verdict Counters Editor
 * 4. Telegram Bot Webhook Integration
 * 5. Tab Navigation & Data Sync
 */

// Global State
let leadsData = [];
let articlesData = [];
let siteSettingsData = {};
let activeStatusFilter = 'all';
let activeSearchQuery = '';
let currentEditingArticleId = null;

// Status Metadata
const STATUS_CONFIG = {
  new: { label: 'Новая', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  consultation: { label: 'Консультация', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  contract: { label: 'Договор заключен', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  rejected: { label: 'Отказ / Спам', color: 'bg-slate-100 text-slate-700 border-slate-300' }
};

// Default Site Settings
const DEFAULT_SITE_SETTINGS = {
  firmName: 'Адвокатская контора «T&N»',
  address: 'г. Алматы, Медеуский район, ул. Богенбай батыра, 23а',
  phone1: '+7 (778) 677-51-19',
  phone2: '+7 (707) 197-15-20',
  email: 'info@tnlaw.kz',
  schedule: 'Круглосуточно 24/7 (выезд на задержание и обыск)',
  rating2gis: '5.0 ★ (53 отзыва)',
  stat1_val: '500+ Дел',
  stat1_desc: 'Выиграно в судах Казахстана',
  stat2_val: '65 Млн ₸',
  stat2_desc: 'Отменено взыскание в Верховном Суде РК',
  stat3_val: '48.5 Млн ₸',
  stat3_desc: 'Взыскано по арбитражному спору (СМЭС)',
  stat4_val: '94%',
  stat4_desc: 'Успешных исходов процессов'
};

// Default Seed Articles
const DEFAULT_SEED_ARTICLES = [
  {
    id: 'interrogation-rules',
    title: 'Вызов на допрос в полицию или следственные органы: 7 правил защиты, которые спасут от обвинения',
    category: 'Уголовное право',
    categoryId: 'criminal',
    author: 'Ерсаин Нурлан',
    authorRole: 'Учредитель адвокатской конторы «T&N»',
    authorPhoto: 'assets/images/nurlan.jpg',
    date: '12 февраля 2026',
    readTime: '6 мин чтения',
    image: 'assets/images/pa_court.jpg',
    summary: 'Пошаговая инструкция адвоката: как реагировать на звонок следователя, почему опасен статус «свидетеля с правом на защиту» и как не навредить себе до встречи с адвокатом.',
    content: `
      <p class="lead font-medium text-lg text-slate-700 mb-6">
        Каждый месяц к нам обращаются граждане, которые пошли на допрос «всего лишь на 5 минут в качестве свидетеля», а вышли из кабинета следователя уже в наручниках или со статусом подозреваемого. В уголовном процессе Республики Казахстан любая неосторожная фраза может стать основой обвинения.
      </p>
      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">1. Повестка, а не звонок на мобильный (ст. 205 УПК РК)</h3>
      <p class="mb-4">
        Следователь обязан вызвать вас официальной повесткой, где четко указаны: кто вызывает, в качестве кого (свидетель, свидетель с правом на защиту, подозреваемый), точное время и адрес.
      </p>
    `
  },
  {
    id: 'supreme-court-cassation',
    title: 'Как добиться отмены решения суда в Верховном Суде РК: алгоритм кассационного производства',
    category: 'Верховный Суд РК',
    categoryId: 'supreme',
    author: 'Адвокат Тамара',
    authorRole: 'Управляющий партнер, судебный адвокат ВС РК',
    authorPhoto: 'assets/images/tamara.jpg',
    date: '28 января 2026',
    readTime: '8 мин чтения',
    image: 'assets/images/pa_business.jpg',
    summary: 'Реальный кейс отмены судебного акта на 65 000 000 ₸. Как выявить существенные нарушения норм материального и процессуального права и составить жалобу в ВС РК.',
    content: `
      <p class="lead font-medium text-lg text-slate-700 mb-6">
        Верховный Суд Республики Казахстан (г. Астана) — это высшая судебная инстанция страны. По статистике, более 85% кассационных ходатайств возвращаются без рассмотрения судьями единолично.
      </p>
    `
  }
];

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  loadAllData();
  initSearchAndFilters();
  initForms();
  checkTelegramStatus();
});

function loadAllData() {
  loadLeads();
  loadArticles();
  loadSiteSettings();
}

// ==========================================================================
// TABS CONTROLLER
// ==========================================================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetTab = this.dataset.tab;

      tabButtons.forEach(b => {
        b.classList.remove('active', 'bg-amber-600', 'text-white');
        b.classList.add('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');
      });

      this.classList.add('active', 'bg-amber-600', 'text-white');
      this.classList.remove('text-slate-400', 'hover:bg-slate-800', 'hover:text-white');

      tabContents.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

function switchTab(tabName) {
  const btn = document.querySelector(`.nav-tab-btn[data-tab="${tabName}"]`);
  if (btn) btn.click();
}

// ==========================================================================
// LEADS & CRM MANAGEMENT
// ==========================================================================
function loadLeads() {
  const raw = localStorage.getItem('tn_law_leads');
  leadsData = raw ? JSON.parse(raw) : [];
  renderKPIs();
  renderLeadsTable();
}

function saveLeads() {
  localStorage.setItem('tn_law_leads', JSON.stringify(leadsData));
  renderKPIs();
  renderLeadsTable();
}

function renderKPIs() {
  const totalCount = leadsData.length;
  const newCount = leadsData.filter(l => l.status === 'new').length;
  const inProgressCount = leadsData.filter(l => l.status === 'in_progress' || l.status === 'consultation').length;
  const contractCount = leadsData.filter(l => l.status === 'contract').length;
  const conversionRate = totalCount > 0 ? Math.round((contractCount / totalCount) * 100) : 0;

  const kpiTotal = document.getElementById('kpi-total');
  const kpiNew = document.getElementById('kpi-new');
  const kpiProgress = document.getElementById('kpi-progress');
  const kpiContract = document.getElementById('kpi-contract');
  const kpiConversion = document.getElementById('kpi-conversion');

  if (kpiTotal) kpiTotal.innerText = totalCount;
  if (kpiNew) kpiNew.innerText = newCount;
  if (kpiProgress) kpiProgress.innerText = inProgressCount;
  if (kpiContract) kpiContract.innerText = contractCount;
  if (kpiConversion) kpiConversion.innerText = conversionRate + '%';

  const badgeNew = document.getElementById('new-leads-badge');
  if (badgeNew) {
    badgeNew.innerText = newCount;
    badgeNew.style.display = newCount > 0 ? 'inline-flex' : 'none';
  }
}

function renderLeadsTable() {
  const tbody = document.getElementById('leads-table-body');
  const emptyState = document.getElementById('leads-empty-state');
  if (!tbody) return;

  tbody.innerHTML = '';

  const filtered = leadsData.filter(lead => {
    const matchesStatus = activeStatusFilter === 'all' || lead.status === activeStatusFilter;
    const query = activeSearchQuery.toLowerCase();
    const matchesSearch = !query || 
      (lead.name && lead.name.toLowerCase().includes(query)) ||
      (lead.phone && lead.phone.includes(query)) ||
      (lead.service && lead.service.toLowerCase().includes(query)) ||
      (lead.notes && lead.notes.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  filtered.forEach(lead => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition border-b border-slate-100 text-sm';

    const statusObj = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
    const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '';

    tr.innerHTML = `
      <td class="py-4 px-4 font-mono text-xs text-slate-500">
        <div class="font-bold text-slate-800">${lead.id}</div>
        <div class="text-[11px] text-slate-400 mt-0.5">${lead.date || 'Недавно'}</div>
      </td>
      <td class="py-4 px-4">
        <div class="font-bold text-slate-900">${escapeHTML(lead.name || 'Доверитель')}</div>
        <div class="text-xs text-slate-500 font-mono mt-0.5">${escapeHTML(lead.phone)}</div>
        <span class="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
          ${escapeHTML(lead.source || 'Сайт')}
        </span>
      </td>
      <td class="py-4 px-4">
        <div class="font-semibold text-slate-800 text-xs sm:text-sm">${escapeHTML(lead.service)}</div>
        ${lead.urgency ? `<div class="text-[11px] text-amber-700 font-medium mt-0.5">Срочность: ${escapeHTML(lead.urgency)}</div>` : ''}
      </td>
      <td class="py-4 px-4">
        <select onchange="updateLeadStatus('${lead.id}', this.value)" class="text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer ${statusObj.color}">
          <option value="new" ${lead.status === 'new' ? 'selected' : ''}>🟢 Новая</option>
          <option value="in_progress" ${lead.status === 'in_progress' ? 'selected' : ''}>🔵 В работе</option>
          <option value="consultation" ${lead.status === 'consultation' ? 'selected' : ''}>🟡 Консультация</option>
          <option value="contract" ${lead.status === 'contract' ? 'selected' : ''}>🟣 Договор заключен</option>
          <option value="rejected" ${lead.status === 'rejected' ? 'selected' : ''}>⚪ Отказ</option>
        </select>
      </td>
      <td class="py-4 px-4 max-w-xs">
        <div class="text-xs text-slate-600 truncate max-w-[200px]" title="${escapeHTML(lead.notes || 'Нет заметок')}">
          ${escapeHTML(lead.notes || '—')}
        </div>
        <button onclick="openNoteModal('${lead.id}')" class="text-[11px] text-amber-700 hover:text-amber-800 font-semibold mt-1 flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          Заметка
        </button>
      </td>
      <td class="py-4 px-4 text-right">
        <div class="flex items-center justify-end gap-2">
          ${cleanPhone ? `
            <a href="https://wa.me/${cleanPhone}" target="_blank" class="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition" title="Написать в WhatsApp">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
            </a>
            <a href="tel:${cleanPhone}" class="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition" title="Позвонить">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </a>
          ` : ''}
          <button onclick="deleteLead('${lead.id}')" class="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition" title="Удалить заявку">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateLeadStatus(id, newStatus) {
  const lead = leadsData.find(l => l.id === id);
  if (lead) {
    lead.status = newStatus;
    saveLeads();
    showAdminToast(`Статус заявки #${id} обновлен на "${STATUS_CONFIG[newStatus]?.label}"`);
  }
}

function deleteLead(id) {
  if (confirm('Вы действительно хотите удалить эту заявку?')) {
    leadsData = leadsData.filter(l => l.id !== id);
    saveLeads();
    showAdminToast('Заявка удалена', 'error');
  }
}

function simulateTestLead() {
  const names = ['Айдар Сарсенов', 'Гульнара Исмаилова', 'Ержан Кудайбергенов', 'Марат Омаров'];
  const services = ['Уголовная защита (ст. 190 УК РК)', 'СМЭС г. Алматы (Взыскание долга)', 'Кассация в ВС РК', 'Раздел имущества'];
  const phone = '+7 (70' + Math.floor(1 + Math.random() * 8) + ') ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(10 + Math.random() * 90) + '-' + Math.floor(10 + Math.random() * 90);
  
  const newLead = {
    id: 'L-' + Date.now(),
    name: names[Math.floor(Math.random() * names.length)],
    phone: phone,
    service: services[Math.floor(Math.random() * services.length)],
    urgency: 'Срочный выезд',
    status: 'new',
    date: new Date().toLocaleString('ru-RU'),
    notes: 'Срочное обращение через сайт. Требуется анализ документов.',
    source: 'Тест CRM'
  };

  leadsData.unshift(newLead);
  saveLeads();
  showAdminToast(`Добавлен тестовый лид: ${newLead.name}`);
}

function exportLeadsCSV() {
  if (leadsData.length === 0) {
    showAdminToast('Нет заявок для экспорта', 'error');
    return;
  }

  let csv = '\uFEFFID,Дата,Имя,Телефон,Услуга,Срочность,Статус,Заметки,Источник\n';
  leadsData.forEach(l => {
    csv += `"${l.id}","${l.date || ''}","${l.name || ''}","${l.phone || ''}","${l.service || ''}","${l.urgency || ''}","${STATUS_CONFIG[l.status]?.label || l.status}","${(l.notes || '').replace(/"/g, '""')}","${l.source || ''}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Leads_TN_Law_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showAdminToast('Файл Excel (CSV) успешно выгружен');
}

// ==========================================================================
// ARTICLES CMS MANAGEMENT
// ==========================================================================
function loadArticles() {
  const raw = localStorage.getItem('tn_law_articles');
  if (raw) {
    articlesData = JSON.parse(raw);
  } else {
    articlesData = DEFAULT_SEED_ARTICLES;
    localStorage.setItem('tn_law_articles', JSON.stringify(articlesData));
  }
  renderArticlesTable();
}

function saveArticles() {
  localStorage.setItem('tn_law_articles', JSON.stringify(articlesData));
  renderArticlesTable();
}

function renderArticlesTable() {
  const tbody = document.getElementById('articles-table-body');
  const countEl = document.getElementById('articles-total-count');
  if (!tbody) return;

  tbody.innerHTML = '';
  if (countEl) countEl.innerText = articlesData.length;

  if (articlesData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="py-12 text-center text-slate-400">
          Статей пока нет. Нажмите «+ Написать статью», чтобы опубликовать первый материал.
        </td>
      </tr>
    `;
    return;
  }

  articlesData.forEach(article => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50/80 transition border-b border-slate-100 text-sm';

    tr.innerHTML = `
      <td class="py-4 px-4">
        <div class="flex items-center gap-3">
          <img src="${article.image || 'assets/images/pa_court.jpg'}" class="w-12 h-10 rounded object-cover border border-slate-200 shadow-sm shrink-0">
          <div>
            <div class="font-bold text-slate-900 leading-snug line-clamp-1">${escapeHTML(article.title)}</div>
            <div class="text-[11px] text-slate-400 mt-0.5">⏱ ${escapeHTML(article.readTime || '5 мин')} • 📅 ${escapeHTML(article.date || 'Сегодня')}</div>
          </div>
        </div>
      </td>
      <td class="py-4 px-4">
        <span class="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          ${escapeHTML(article.category || 'Практика')}
        </span>
      </td>
      <td class="py-4 px-4">
        <div class="text-xs font-semibold text-slate-800">${escapeHTML(article.author || 'Адвокат')}</div>
        <div class="text-[11px] text-slate-400">${escapeHTML(article.authorRole || 'Партнер')}</div>
      </td>
      <td class="py-4 px-4 max-w-xs text-xs text-slate-500 line-clamp-2">
        ${escapeHTML(article.summary || '')}
      </td>
      <td class="py-4 px-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="editArticle('${article.id}')" class="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition" title="Редактировать статью">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
          </button>
          <button onclick="deleteArticle('${article.id}')" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Удалить статью">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openArticleEditor(article = null) {
  currentEditingArticleId = article ? article.id : null;
  const modal = document.getElementById('article-editor-modal');
  const modalTitle = document.getElementById('article-editor-modal-title');
  const form = document.getElementById('article-editor-form');

  if (modalTitle) modalTitle.innerText = article ? 'Редактирование статьи' : 'Новая правовая статья';

  if (form) {
    form.reset();
    if (article) {
      document.getElementById('art-title').value = article.title || '';
      document.getElementById('art-category').value = article.category || 'Уголовное право';
      document.getElementById('art-category-id').value = article.categoryId || 'criminal';
      document.getElementById('art-author').value = article.author || 'Адвокат Тамара';
      document.getElementById('art-author-role').value = article.authorRole || '';
      document.getElementById('art-readtime').value = article.readTime || '5 мин чтения';
      document.getElementById('art-image').value = article.image || 'assets/images/pa_court.jpg';
      document.getElementById('art-summary').value = article.summary || '';
      document.getElementById('art-content').value = article.content || '';
    } else {
      document.getElementById('art-readtime').value = '5 мин чтения';
      document.getElementById('art-image').value = 'assets/images/pa_court.jpg';
      document.getElementById('art-author-role').value = 'Учредитель адвокатской конторы «T&N»';
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeArticleEditor() {
  const modal = document.getElementById('article-editor-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

function editArticle(articleId) {
  const article = articlesData.find(a => a.id === articleId);
  if (article) {
    openArticleEditor(article);
  }
}

function deleteArticle(articleId) {
  if (confirm('Вы точно хотите удалить эту статью? Она перестанет отображаться на сайте.')) {
    articlesData = articlesData.filter(a => a.id !== articleId);
    saveArticles();
    showAdminToast('Статья удалена', 'error');
  }
}

function insertArticleHelperTag(tagType) {
  const textarea = document.getElementById('art-content');
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);

  let snippet = '';
  switch (tagType) {
    case 'h3':
      snippet = `\n<h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">${selected || 'Подзаголовок статьи'}</h3>\n`;
      break;
    case 'quote':
      snippet = `\n<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r">\n  <div class="font-bold text-[#121d28] mb-1">⚖️ Закон РК:</div>\n  <p class="text-sm text-slate-700 italic">${selected || 'Текст цитаты или статьи закона...'}</p>\n</div>\n`;
      break;
    case 'case':
      snippet = `\n<div class="bg-slate-900 text-white p-6 my-6 rounded-lg border border-amber-500/40">\n  <div class="font-cinzel text-amber-400 font-bold text-lg mb-2">🏆 Реальный кейс адвоката:</div>\n  <p class="text-sm text-slate-300 leading-relaxed">${selected || 'Описание победы в суде и результата для доверителя...'}</p>\n</div>\n`;
      break;
    case 'list':
      snippet = `\n<ul class="list-disc list-inside space-y-2 mb-4 text-slate-700">\n  <li>${selected || 'Пункт 1'}</li>\n  <li>Пункт 2</li>\n</ul>\n`;
      break;
  }

  textarea.setRangeText(snippet, start, end, 'end');
  textarea.focus();
}

// ==========================================================================
// SITE SETTINGS MANAGEMENT
// ==========================================================================
function loadSiteSettings() {
  const raw = localStorage.getItem('tn_site_settings');
  siteSettingsData = raw ? JSON.parse(raw) : DEFAULT_SITE_SETTINGS;

  // Populate settings form
  const keys = Object.keys(siteSettingsData);
  keys.forEach(k => {
    const el = document.getElementById(`setting-${k}`);
    if (el) el.value = siteSettingsData[k];
  });
}

function saveSiteSettingsForm() {
  const newSettings = {
    firmName: document.getElementById('setting-firmName')?.value || DEFAULT_SITE_SETTINGS.firmName,
    address: document.getElementById('setting-address')?.value || DEFAULT_SITE_SETTINGS.address,
    phone1: document.getElementById('setting-phone1')?.value || DEFAULT_SITE_SETTINGS.phone1,
    phone2: document.getElementById('setting-phone2')?.value || DEFAULT_SITE_SETTINGS.phone2,
    email: document.getElementById('setting-email')?.value || DEFAULT_SITE_SETTINGS.email,
    schedule: document.getElementById('setting-schedule')?.value || DEFAULT_SITE_SETTINGS.schedule,
    rating2gis: document.getElementById('setting-rating2gis')?.value || DEFAULT_SITE_SETTINGS.rating2gis,
    stat1_val: document.getElementById('setting-stat1_val')?.value || DEFAULT_SITE_SETTINGS.stat1_val,
    stat1_desc: document.getElementById('setting-stat1_desc')?.value || DEFAULT_SITE_SETTINGS.stat1_desc,
    stat2_val: document.getElementById('setting-stat2_val')?.value || DEFAULT_SITE_SETTINGS.stat2_val,
    stat2_desc: document.getElementById('setting-stat2_desc')?.value || DEFAULT_SITE_SETTINGS.stat2_desc,
    stat3_val: document.getElementById('setting-stat3_val')?.value || DEFAULT_SITE_SETTINGS.stat3_val,
    stat3_desc: document.getElementById('setting-stat3_desc')?.value || DEFAULT_SITE_SETTINGS.stat3_desc,
    stat4_val: document.getElementById('setting-stat4_val')?.value || DEFAULT_SITE_SETTINGS.stat4_val,
    stat4_desc: document.getElementById('setting-stat4_desc')?.value || DEFAULT_SITE_SETTINGS.stat4_desc
  };

  localStorage.setItem('tn_site_settings', JSON.stringify(newSettings));
  siteSettingsData = newSettings;
  showAdminToast('Настройки сайта и счетчики успешно сохранены!');
}

// ==========================================================================
// TELEGRAM BOT CONFIG
// ==========================================================================
function checkTelegramStatus() {
  const config = JSON.parse(localStorage.getItem('tn_tg_config') || '{}');
  const badge = document.getElementById('tg-status-badge');
  const tokenInput = document.getElementById('tg-bot-token');
  const chatInput = document.getElementById('tg-chat-id');

  if (tokenInput && config.botToken) tokenInput.value = config.botToken;
  if (chatInput && config.chatId) chatInput.value = config.chatId;

  if (badge) {
    if (config.botToken && config.chatId) {
      badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold';
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Подключен к Telegram';
    } else {
      badge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold';
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-slate-400"></span> Telegram не настроен';
    }
  }
}

function saveTelegramConfig() {
  const botToken = document.getElementById('tg-bot-token')?.value.trim();
  const chatId = document.getElementById('tg-chat-id')?.value.trim();

  if (!botToken || !chatId) {
    showAdminToast('Заполните Bot Token и Chat ID', 'error');
    return;
  }

  localStorage.setItem('tn_tg_config', JSON.stringify({ botToken, chatId }));
  checkTelegramStatus();
  showAdminToast('Настройки Telegram успешно сохранены!');
}

async function testTelegramNotification() {
  const config = JSON.parse(localStorage.getItem('tn_tg_config') || '{}');
  if (!config.botToken || !config.chatId) {
    showAdminToast('Сначала сохраните Bot Token и Chat ID', 'error');
    return;
  }

  const text = `🔔 *Тестовое уведомление из CRM «T&N Law»*\n\n` +
    `✅ Бот успешно подключен к сайту адвокатской конторы в Алматы.\n` +
    `🕒 Время проверки: ${new Date().toLocaleString('ru-RU')}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: text,
        parse_mode: 'Markdown'
      })
    });

    const data = await res.json();
    if (data.ok) {
      showAdminToast('Тестовое сообщение успешно отправлено в Telegram!');
    } else {
      showAdminToast(`Ошибка Telegram API: ${data.description}`, 'error');
    }
  } catch (err) {
    showAdminToast('Не удалось отправить сообщение. Проверьте интернет и токен.', 'error');
  }
}

// ==========================================================================
// SEARCH & FILTERS
// ==========================================================================
function initSearchAndFilters() {
  const searchInput = document.getElementById('leads-search');
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      activeSearchQuery = e.target.value.trim();
      renderLeadsTable();
    });
  }

  const filterButtons = document.querySelectorAll('.status-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-slate-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
      });
      this.classList.add('active', 'bg-slate-900', 'text-white');
      this.classList.remove('bg-white', 'text-slate-600');

      activeStatusFilter = this.dataset.status;
      renderLeadsTable();
    });
  });
}

// ==========================================================================
// FORMS & MODALS
// ==========================================================================
function initForms() {
  // Article Editor Form Submission
  const articleForm = document.getElementById('article-editor-form');
  if (articleForm) {
    articleForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('art-title').value.trim();
      const category = document.getElementById('art-category').value;
      const categoryId = document.getElementById('art-category-id').value;
      const author = document.getElementById('art-author').value;
      const authorRole = document.getElementById('art-author-role').value.trim();
      const readTime = document.getElementById('art-readtime').value.trim();
      const image = document.getElementById('art-image').value.trim();
      const summary = document.getElementById('art-summary').value.trim();
      const content = document.getElementById('art-content').value.trim();

      const authorPhoto = author.includes('Тамара') ? 'assets/images/tamara.jpg' : 'assets/images/nurlan.jpg';

      if (currentEditingArticleId) {
        // Update existing article
        const index = articlesData.findIndex(a => a.id === currentEditingArticleId);
        if (index !== -1) {
          articlesData[index] = {
            ...articlesData[index],
            title, category, categoryId, author, authorRole, authorPhoto, readTime, image, summary, content
          };
          showAdminToast('Статья успешно обновлена!');
        }
      } else {
        // Create new article
        const newArticle = {
          id: 'art-' + Date.now(),
          title,
          category,
          categoryId,
          author,
          authorRole,
          authorPhoto,
          date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
          readTime: readTime || '5 мин чтения',
          image: image || 'assets/images/pa_court.jpg',
          summary,
          content
        };
        articlesData.unshift(newArticle);
        showAdminToast('Новая статья успешно опубликована на сайте!');
      }

      saveArticles();
      closeArticleEditor();
    });
  }

  // Site Settings Form Submission
  const settingsForm = document.getElementById('site-settings-form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      saveSiteSettingsForm();
    });
  }

  // Note Modal Form Submission
  const noteForm = document.getElementById('lead-note-form');
  if (noteForm) {
    noteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const leadId = document.getElementById('note-lead-id').value;
      const noteText = document.getElementById('note-textarea').value.trim();

      const lead = leadsData.find(l => l.id === leadId);
      if (lead) {
        lead.notes = noteText;
        saveLeads();
        closeNoteModal();
        showAdminToast('Заметка сохранена');
      }
    });
  }
}

// Note Modal
function openNoteModal(leadId) {
  const lead = leadsData.find(l => l.id === leadId);
  if (!lead) return;

  document.getElementById('note-lead-id').value = lead.id;
  document.getElementById('note-lead-title').innerText = `Заметка по заявке: ${lead.name} (${lead.phone})`;
  document.getElementById('note-textarea').value = lead.notes || '';

  const modal = document.getElementById('note-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeNoteModal() {
  const modal = document.getElementById('note-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

// Toast
function showAdminToast(message, type = 'success') {
  let container = document.getElementById('admin-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'admin-toast-container';
    container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-[#121d28] border-amber-500 text-white' : 'bg-red-900 border-red-500 text-white';
  toast.className = `${bg} border shadow-2xl rounded-lg px-4 py-3 text-xs font-semibold flex items-center gap-2 pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
