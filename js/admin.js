/**
 * T&N Law Firm - Unified Admin CRM & CMS Engine
 * Handles:
 * 1. Secure Authentication Gate & Password Management (SHA-256 + Salt)
 * 2. Employee Access Roles (Admin / Editor)
 * 3. Lead Lifecycle & CRM
 * 4. Article Publishing & CMS Engine
 * 5. Site Settings, Verdict Counters & WhatsApp Integration
 * 6. Telegram Bot Webhook Integration
 * 7. Tab Navigation & Data Sync
 */

// Global State
let currentUser = null;
let adminUsersData = [];
let leadsData = [];
let articlesData = [];
let siteSettingsData = {};
let activeStatusFilter = 'all';
let activeSearchQuery = '';
let currentEditingArticleId = null;

// ==========================================================================
// SECURITY & CRYPTO HELPERS (SHA-256 + Salt)
// ==========================================================================
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(len = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let res = '';
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

// Default Seed Users (Used if localStorage is empty)
const DEFAULT_SEED_USERS = [
  {
    login: 'nurlan',
    name: 'Ерсаин Нурлан',
    role: 'admin',
    salt: 'nurlan_salt_2026',
    passwordHash: 'b989d41fad8efa06e33c8d648150faf3575be6929c67be1ad1a5fe83823bb5ce', // pass: nurlan2026law
    createdAt: '10.09.2026',
    lastLogin: null
  },
  {
    login: 'advocate',
    name: 'Адвокат / Редактор',
    role: 'editor',
    salt: 'advocate_salt_2026',
    passwordHash: '03b375b9028b50f7fb0ab8ca651f62337f8b88ee08e509482ea8661057fa187f', // pass: advocate2026
    createdAt: '10.09.2026',
    lastLogin: null
  }
];

function loadAdminUsers() {
  const raw = localStorage.getItem('tn_admin_users');
  if (raw) {
    try {
      adminUsersData = JSON.parse(raw);
    } catch (e) {
      adminUsersData = DEFAULT_SEED_USERS;
    }
  } else {
    adminUsersData = DEFAULT_SEED_USERS;
    localStorage.setItem('tn_admin_users', JSON.stringify(adminUsersData));
  }
}

function saveAdminUsers() {
  localStorage.setItem('tn_admin_users', JSON.stringify(adminUsersData));
  renderAdminUsersTable();
}

// Check session on page load
function checkAuthStatus() {
  loadAdminUsers();

  const sessionRaw = sessionStorage.getItem('tn_admin_auth') || localStorage.getItem('tn_admin_auth');
  if (sessionRaw) {
    try {
      const session = JSON.parse(sessionRaw);
      const user = adminUsersData.find(u => u.login.toLowerCase() === session.login.toLowerCase());
      if (user && session.expiresAt > Date.now()) {
        currentUser = user;
        applyAuthenticatedState();
        return;
      }
    } catch (e) {
      console.log('Session parse error:', e);
    }
  }

  showAuthGate();
}

function showAuthGate() {
  const gate = document.getElementById('admin-auth-gate');
  if (gate) {
    gate.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function hideAuthGate() {
  const gate = document.getElementById('admin-auth-gate');
  if (gate) {
    gate.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerText = '🔒';
  } else {
    input.type = 'password';
    btn.innerText = '👁';
  }
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const loginInput = document.getElementById('auth-login');
  const pwdInput = document.getElementById('auth-password');
  const rememberCheckbox = document.getElementById('auth-remember');
  const errorBox = document.getElementById('auth-error-box');
  const errorMsg = document.getElementById('auth-error-msg');
  const submitBtn = document.getElementById('auth-submit-btn');

  if (!loginInput || !pwdInput) return;

  const login = loginInput.value.trim().toLowerCase();
  const password = pwdInput.value;

  const user = adminUsersData.find(u => u.login.toLowerCase() === login);
  if (!user) {
    if (errorMsg) errorMsg.innerText = 'Пользователь с таким логином не найден';
    if (errorBox) errorBox.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Проверка...</span>';

  const testHash = await sha256(user.salt + password);
  if (testHash !== user.passwordHash) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Войти в личный кабинет →</span>';
    if (errorMsg) errorMsg.innerText = 'Неверный пароль. Попробуйте еще раз.';
    if (errorBox) errorBox.classList.remove('hidden');
    return;
  }

  // Success!
  currentUser = user;
  user.lastLogin = new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  saveAdminUsers();

  const sessionPayload = JSON.stringify({
    login: user.login,
    name: user.name,
    role: user.role,
    expiresAt: Date.now() + (rememberCheckbox && rememberCheckbox.checked ? 30 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000)
  });

  if (rememberCheckbox && rememberCheckbox.checked) {
    localStorage.setItem('tn_admin_auth', sessionPayload);
  } else {
    sessionStorage.setItem('tn_admin_auth', sessionPayload);
    localStorage.removeItem('tn_admin_auth');
  }

  if (errorBox) errorBox.classList.add('hidden');
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<span>Войти в личный кабинет →</span>';

  applyAuthenticatedState();
  showAdminToast(`Добро пожаловать, ${user.name}!`);
}

function logoutAdmin() {
  sessionStorage.removeItem('tn_admin_auth');
  localStorage.removeItem('tn_admin_auth');
  currentUser = null;
  const loginInput = document.getElementById('auth-login');
  const pwdInput = document.getElementById('auth-password');
  if (pwdInput) pwdInput.value = '';
  showAuthGate();
  showAdminToast('Вы вышли из личного кабинета');
}

function applyAuthenticatedState() {
  hideAuthGate();

  // Populate active user badge in header
  const userNameEl = document.getElementById('current-user-name');
  const userRoleBadge = document.getElementById('current-user-role-badge');
  if (userNameEl && currentUser) {
    userNameEl.innerText = currentUser.name || currentUser.login;
  }
  if (userRoleBadge && currentUser) {
    userRoleBadge.innerText = currentUser.role === 'admin' ? 'Администратор' : 'Юрист / Редактор';
    userRoleBadge.className = currentUser.role === 'admin' ? 
      'text-[10px] text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded font-mono uppercase font-bold' :
      'text-[10px] text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded font-mono uppercase font-bold';
  }

  renderAdminUsersTable();
}

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
  whatsappPhone: '+7 (778) 677-51-19',
  email: 'info@tnlaw.kz',
  schedule: 'Круглосуточно 24/7 (выезд на задержание и обыск)',
  rating2gis: '5.0 ★ (54 отзыва)',
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
  checkAuthStatus();
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

// ==========================================================================
// DYNAMIC CATEGORIES & COVER IMAGE & AUTHOR HELPERS
// ==========================================================================
function slugify(text) {
  const ruMap = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i',
    'й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t',
    'у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y',
    'ь':'','э':'e','ю':'yu','я':'ya',' ':'-','&':'-and-'
  };
  return text.toLowerCase().split('').map(c => ruMap[c] || (/[a-z0-9\-]/.test(c) ? c : '')).join('').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'general';
}

function loadCustomCategories() {
  const select = document.getElementById('art-category');
  if (!select) return;

  const raw = localStorage.getItem('tn_custom_categories');
  const customCats = raw ? JSON.parse(raw) : [];

  // Remove previously injected custom options
  Array.from(select.querySelectorAll('.injected-custom-cat')).forEach(el => el.remove());

  // Find insert position before __custom__
  const customOpt = select.querySelector('option[value="__custom__"]');

  customCats.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.name;
    opt.dataset.catid = cat.id;
    opt.innerText = cat.name;
    opt.className = 'injected-custom-cat';
    if (customOpt) {
      select.insertBefore(opt, customOpt);
    } else {
      select.appendChild(opt);
    }
  });
}

function showNewCategoryBox() {
  const box = document.getElementById('art-custom-category-box');
  const input = document.getElementById('art-custom-category-name');
  if (box) {
    box.classList.remove('hidden');
    if (input) {
      input.focus();
    }
  }
}

function handleCategorySelectChange(value) {
  const box = document.getElementById('art-custom-category-box');
  const hiddenId = document.getElementById('art-category-id');
  const select = document.getElementById('art-category');

  if (value === '__custom__') {
    if (box) box.classList.remove('hidden');
    document.getElementById('art-custom-category-name')?.focus();
  } else {
    if (box) box.classList.add('hidden');
    const selectedOpt = select.options[select.selectedIndex];
    if (hiddenId && selectedOpt) {
      hiddenId.value = selectedOpt.dataset.catid || slugify(value);
    }
  }
}

function applyCustomCategory() {
  const input = document.getElementById('art-custom-category-name');
  const select = document.getElementById('art-category');
  const hiddenId = document.getElementById('art-category-id');
  const box = document.getElementById('art-custom-category-box');

  const catName = input ? input.value.trim() : '';
  if (!catName) {
    showAdminToast('Введите название новой категории', 'error');
    return;
  }

  const catId = slugify(catName);

  // Save to localStorage
  const raw = localStorage.getItem('tn_custom_categories');
  const customCats = raw ? JSON.parse(raw) : [];
  if (!customCats.some(c => c.name.toLowerCase() === catName.toLowerCase())) {
    customCats.push({ name: catName, id: catId });
    localStorage.setItem('tn_custom_categories', JSON.stringify(customCats));
  }

  loadCustomCategories();

  // Select the newly added category
  if (select) {
    select.value = catName;
    if (select.value !== catName) {
      // Fallback
      const newOpt = document.createElement('option');
      newOpt.value = catName;
      newOpt.dataset.catid = catId;
      newOpt.innerText = catName;
      select.prepend(newOpt);
      select.value = catName;
    }
  }

  if (hiddenId) hiddenId.value = catId;
  if (box) box.classList.add('hidden');
  if (input) input.value = '';

  showAdminToast(`Категория "${catName}" добавлена!`);
}

// ---------------- Author Handlers ----------------
function toggleNoAuthor(isNoAuthor) {
  const grid = document.getElementById('art-author-inputs-grid');
  if (grid) {
    if (isNoAuthor) {
      grid.classList.add('opacity-40', 'pointer-events-none');
    } else {
      grid.classList.remove('opacity-40', 'pointer-events-none');
    }
  }
}

function handleAuthorSelectChange(val) {
  const customInput = document.getElementById('art-custom-author-name');
  const roleInput = document.getElementById('art-author-role');
  const select = document.getElementById('art-author');

  if (val === '__custom__') {
    if (customInput) {
      customInput.classList.remove('hidden');
      customInput.focus();
    }
    if (roleInput) roleInput.value = 'Адвокат / Юрист';
  } else {
    if (customInput) customInput.classList.add('hidden');
    const selectedOpt = select.options[select.selectedIndex];
    if (roleInput && selectedOpt && selectedOpt.dataset.role) {
      roleInput.value = selectedOpt.dataset.role;
    }
  }
}

// ---------------- Cover Image Upload Handlers ----------------
function handleArticleImageUpload(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showAdminToast('Пожалуйста, выберите изображение (PNG, JPG, WEBP)', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const dataUrl = e.target.result;
    const hiddenImage = document.getElementById('art-image');
    const preview = document.getElementById('art-image-preview');
    const dropzone = document.getElementById('art-image-dropzone');

    if (hiddenImage) hiddenImage.value = dataUrl;
    if (preview) preview.src = dataUrl;

    if (dropzone) {
      dropzone.classList.remove('border-amber-500/40', 'bg-amber-50/30');
      dropzone.classList.add('border-emerald-500', 'bg-emerald-50/40');
      dropzone.querySelector('.text-xs').innerHTML = `
        <span class="text-emerald-700 font-bold">✓ Фото "${escapeHTML(file.name)}" успешно загружено с компьютера</span>
      `;
    }

    showAdminToast(`Изображение "${file.name}" загружено!`);
  };
  reader.readAsDataURL(file);
}

function selectArticleImagePreset(url) {
  if (!url) return;
  const hiddenImage = document.getElementById('art-image');
  const preview = document.getElementById('art-image-preview');
  const dropzone = document.getElementById('art-image-dropzone');

  if (hiddenImage) hiddenImage.value = url;
  if (preview) preview.src = url;

  if (dropzone) {
    dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/40');
    dropzone.classList.add('border-amber-500/40', 'bg-amber-50/30');
    dropzone.querySelector('.text-xs').innerHTML = `
      <span class="text-amber-700 underline">Загрузить фото с компьютера</span> или перетащите файл сюда
    `;
  }
}

// Drag and drop listeners on dropzone
document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('art-image-dropzone');
  if (dropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('border-amber-600', 'bg-amber-100/60');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-amber-600', 'bg-amber-100/60');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        const fileInput = document.getElementById('art-file-input');
        if (fileInput) {
          fileInput.files = files;
          handleArticleImageUpload(fileInput);
        }
      }
    }, false);
  }
});

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
        ${article.author && article.author !== 'none' ? `
          <div class="text-xs font-semibold text-slate-800">${escapeHTML(article.author)}</div>
          <div class="text-[11px] text-slate-400">${escapeHTML(article.authorRole || '')}</div>
        ` : `
          <span class="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-500">Без автора</span>
        `}
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
  loadCustomCategories();
  currentEditingArticleId = article ? article.id : null;
  const modal = document.getElementById('article-editor-modal');
  const modalTitle = document.getElementById('article-editor-modal-title');
  const form = document.getElementById('article-editor-form');

  if (modalTitle) modalTitle.innerText = article ? 'Редактирование статьи' : 'Новая правовая статья';

  const customCatBox = document.getElementById('art-custom-category-box');
  if (customCatBox) customCatBox.classList.add('hidden');

  const customAuthorInput = document.getElementById('art-custom-author-name');
  if (customAuthorInput) customAuthorInput.classList.add('hidden');

  const dropzone = document.getElementById('art-image-dropzone');
  if (dropzone) {
    dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/40');
    dropzone.classList.add('border-amber-500/40', 'bg-amber-50/30');
    dropzone.querySelector('.text-xs').innerHTML = `
      <span class="text-amber-700 underline">Загрузить фото с компьютера</span> или перетащите файл сюда
    `;
  }

  if (form) {
    form.reset();
    if (article) {
      document.getElementById('art-title').value = article.title || '';

      // Category
      const catSelect = document.getElementById('art-category');
      if (catSelect) {
        let exists = Array.from(catSelect.options).some(o => o.value === article.category);
        if (!exists && article.category) {
          const opt = document.createElement('option');
          opt.value = article.category;
          opt.dataset.catid = article.categoryId || slugify(article.category);
          opt.innerText = article.category;
          catSelect.prepend(opt);
        }
        catSelect.value = article.category || 'Уголовное право';
      }
      document.getElementById('art-category-id').value = article.categoryId || 'criminal';

      // Author
      const noAuthorCb = document.getElementById('art-no-author');
      const isNoAuthor = !article.author || article.author === 'none' || article.author === 'Без автора';
      if (noAuthorCb) noAuthorCb.checked = isNoAuthor;
      toggleNoAuthor(isNoAuthor);

      if (!isNoAuthor) {
        const authorSelect = document.getElementById('art-author');
        let authorExists = Array.from(authorSelect.options).some(o => o.value === article.author);
        if (!authorExists && article.author) {
          const aOpt = document.createElement('option');
          aOpt.value = article.author;
          aOpt.innerText = article.author;
          authorSelect.prepend(aOpt);
        }
        if (authorSelect) authorSelect.value = article.author;
        document.getElementById('art-author-role').value = article.authorRole || '';
      }

      document.getElementById('art-readtime').value = article.readTime || '5 мин чтения';

      // Image
      const imgPath = article.image || 'assets/images/pa_court.jpg';
      document.getElementById('art-image').value = imgPath;
      const preview = document.getElementById('art-image-preview');
      if (preview) preview.src = imgPath;

      document.getElementById('art-summary').value = article.summary || '';
      document.getElementById('art-content').value = article.content || '';
    } else {
      // Default New Article
      document.getElementById('art-readtime').value = '5 мин чтения';
      document.getElementById('art-image').value = 'assets/images/pa_court.jpg';
      const preview = document.getElementById('art-image-preview');
      if (preview) preview.src = 'assets/images/pa_court.jpg';

      const noAuthorCb = document.getElementById('art-no-author');
      if (noAuthorCb) noAuthorCb.checked = false;
      toggleNoAuthor(false);

      const authorSelect = document.getElementById('art-author');
      if (authorSelect) authorSelect.value = 'Ерсаин Нурлан';
      document.getElementById('art-author-role').value = 'Учредитель адвокатской конторы «T&N»';
      document.getElementById('art-category-id').value = 'criminal';
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
    whatsappPhone: document.getElementById('setting-whatsappPhone')?.value || DEFAULT_SITE_SETTINGS.whatsappPhone,
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
  showAdminToast('Настройки сайта, WhatsApp и счетчики сохранены!');
}

// ==========================================================================
// USER & SECURITY MANAGEMENT (Settings Subsystem)
// ==========================================================================
async function handleChangeMyPassword() {
  if (!currentUser) return;
  const currentPwdInput = document.getElementById('pwd-change-current');
  const newPwdInput = document.getElementById('pwd-change-new');
  const confirmPwdInput = document.getElementById('pwd-change-confirm');

  const curPwd = currentPwdInput ? currentPwdInput.value : '';
  const newPwd = newPwdInput ? newPwdInput.value : '';
  const confirmPwd = confirmPwdInput ? confirmPwdInput.value : '';

  if (!curPwd) {
    showAdminToast('Введите текущий пароль', 'error');
    return;
  }

  const testHash = await sha256(currentUser.salt + curPwd);
  if (testHash !== currentUser.passwordHash) {
    showAdminToast('Текущий пароль указан неверно', 'error');
    return;
  }

  if (newPwd.length < 6) {
    showAdminToast('Новый пароль должен содержать не менее 6 символов', 'error');
    return;
  }

  if (newPwd !== confirmPwd) {
    showAdminToast('Новые пароли не совпадают', 'error');
    return;
  }

  // Update password with fresh salt
  const newSalt = generateSalt(16);
  currentUser.salt = newSalt;
  currentUser.passwordHash = await sha256(newSalt + newPwd);
  saveAdminUsers();

  if (currentPwdInput) currentPwdInput.value = '';
  if (newPwdInput) newPwdInput.value = '';
  if (confirmPwdInput) confirmPwdInput.value = '';

  showAdminToast('Ваш пароль успешно обновлен!');
}

function renderAdminUsersTable() {
  const tbody = document.getElementById('admin-users-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  adminUsersData.forEach(user => {
    const isCurrent = currentUser && currentUser.login.toLowerCase() === user.login.toLowerCase();
    const roleBadge = user.role === 'admin' ? 
      '<span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">Администратор</span>' :
      '<span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">Юрист / Редактор</span>';

    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition';
    tr.innerHTML = `
      <td class="p-3">
        <div class="font-bold text-slate-800">${escapeHTML(user.name)}</div>
        <div class="text-[11px] text-slate-400 font-mono">@${escapeHTML(user.login)} ${isCurrent ? '<span class="text-emerald-600 font-bold font-sans">(Вы)</span>' : ''}</div>
      </td>
      <td class="p-3">
        ${roleBadge}
      </td>
      <td class="p-3 text-slate-500 text-[11px]">
        ${user.lastLogin || 'Никогда'}
      </td>
      <td class="p-3 text-right space-x-2">
        <button onclick="openEditUserModal('${escapeHTML(user.login)}')" class="text-blue-600 hover:text-blue-800 font-bold text-xs" title="Сменить пароль или данные">
          Изменить
        </button>
        ${!isCurrent ? `
          <button onclick="deleteAdminUser('${escapeHTML(user.login)}')" class="text-red-500 hover:text-red-700 font-bold text-xs ml-2" title="Удалить сотрудника">
            Удалить
          </button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function openCreateUserModal() {
  document.getElementById('user-modal-title').innerText = 'Новый сотрудник';
  document.getElementById('user-edit-original-login').value = '';
  document.getElementById('user-edit-name').value = '';
  document.getElementById('user-edit-login').value = '';
  document.getElementById('user-edit-login').readOnly = false;
  document.getElementById('user-edit-role').value = 'editor';
  document.getElementById('user-edit-password').value = '';
  document.getElementById('user-edit-password').required = true;
  document.getElementById('user-pwd-label').innerText = 'Пароль *';
  document.getElementById('user-pwd-hint').classList.add('hidden');

  const modal = document.getElementById('user-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function openEditUserModal(login) {
  const user = adminUsersData.find(u => u.login.toLowerCase() === login.toLowerCase());
  if (!user) return;

  document.getElementById('user-modal-title').innerText = `Сотрудник: ${user.name}`;
  document.getElementById('user-edit-original-login').value = user.login;
  document.getElementById('user-edit-name').value = user.name;
  document.getElementById('user-edit-login').value = user.login;
  document.getElementById('user-edit-login').readOnly = true;
  document.getElementById('user-edit-role').value = user.role;
  document.getElementById('user-edit-password').value = '';
  document.getElementById('user-edit-password').required = false;
  document.getElementById('user-pwd-label').innerText = 'Новый пароль (опционально)';
  document.getElementById('user-pwd-hint').classList.remove('hidden');

  const modal = document.getElementById('user-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.querySelector('.modal-overlay')?.classList.remove('opacity-0');
      modal.querySelector('.modal-content')?.classList.remove('scale-95', 'opacity-0');
    }, 10);
  }
}

function closeUserModal() {
  const modal = document.getElementById('user-modal');
  if (modal) {
    modal.querySelector('.modal-overlay')?.classList.add('opacity-0');
    modal.querySelector('.modal-content')?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

async function handleSaveUser(e) {
  e.preventDefault();
  const origLogin = document.getElementById('user-edit-original-login').value.trim();
  const name = document.getElementById('user-edit-name').value.trim();
  const login = document.getElementById('user-edit-login').value.trim().toLowerCase();
  const role = document.getElementById('user-edit-role').value;
  const password = document.getElementById('user-edit-password').value;

  if (!name || !login) {
    showAdminToast('Заполните все обязательные поля', 'error');
    return;
  }

  if (origLogin) {
    // Edit existing user
    const user = adminUsersData.find(u => u.login.toLowerCase() === origLogin.toLowerCase());
    if (user) {
      user.name = name;
      user.role = role;
      if (password) {
        if (password.length < 6) {
          showAdminToast('Пароль должен содержать минимум 6 символов', 'error');
          return;
        }
        const newSalt = generateSalt(16);
        user.salt = newSalt;
        user.passwordHash = await sha256(newSalt + password);
      }
      saveAdminUsers();
      closeUserModal();
      showAdminToast(`Данные сотрудника ${user.name} обновлены!`);
      if (currentUser && currentUser.login.toLowerCase() === user.login.toLowerCase()) {
        currentUser = user;
        applyAuthenticatedState();
      }
    }
  } else {
    // Create new user
    const exists = adminUsersData.some(u => u.login.toLowerCase() === login.toLowerCase());
    if (exists) {
      showAdminToast('Пользователь с таким логином уже существует', 'error');
      return;
    }

    if (!password || password.length < 6) {
      showAdminToast('Пароль обязателен и должен содержать минимум 6 символов', 'error');
      return;
    }

    const salt = generateSalt(16);
    const passwordHash = await sha256(salt + password);

    const newUser = {
      login,
      name,
      role,
      salt,
      passwordHash,
      createdAt: new Date().toLocaleDateString('ru-RU'),
      lastLogin: null
    };

    adminUsersData.push(newUser);
    saveAdminUsers();
    closeUserModal();
    showAdminToast(`Новый сотрудник ${name} успешно добавлен!`);
  }
}

function deleteAdminUser(login) {
  if (currentUser && currentUser.login.toLowerCase() === login.toLowerCase()) {
    showAdminToast('Нельзя удалить свою собственную учетную запись', 'error');
    return;
  }

  const user = adminUsersData.find(u => u.login.toLowerCase() === login.toLowerCase());
  if (!user) return;

  if (confirm(`Вы уверены, что хотите удалить доступ для сотрудника "${user.name}" (@${user.login})?`)) {
    adminUsersData = adminUsersData.filter(u => u.login.toLowerCase() !== login.toLowerCase());
    saveAdminUsers();
    showAdminToast(`Сотрудник ${user.name} удален`);
  }
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

      // Category
      let category = document.getElementById('art-category').value;
      if (category === '__custom__') {
        category = document.getElementById('art-custom-category-name')?.value.trim() || 'Практика';
      }
      let categoryId = document.getElementById('art-category-id').value;
      if (!categoryId || categoryId === 'criminal') {
        const catSelect = document.getElementById('art-category');
        const selectedOpt = catSelect.options[catSelect.selectedIndex];
        categoryId = (selectedOpt && selectedOpt.dataset.catid) || slugify(category);
      }

      // Author & Role
      const isNoAuthor = document.getElementById('art-no-author')?.checked;
      let author = '';
      let authorRole = '';
      let authorPhoto = '';

      if (!isNoAuthor) {
        author = document.getElementById('art-author').value;
        if (author === '__custom__') {
          author = document.getElementById('art-custom-author-name')?.value.trim() || 'Адвокат';
        }
        authorRole = document.getElementById('art-author-role').value.trim();
        authorPhoto = author.includes('Тамара') ? 'assets/images/tamara.jpg' : 'assets/media/advocate_1.jpeg';
      }

      const readTime = document.getElementById('art-readtime').value.trim() || '5 мин чтения';
      const image = document.getElementById('art-image').value.trim() || 'assets/images/pa_court.jpg';
      const summary = document.getElementById('art-summary').value.trim();
      const content = document.getElementById('art-content').value.trim();

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
          readTime,
          image,
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
