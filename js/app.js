/**
 * T&N Law Firm - Core Client Script (James Newman Style & Interactive Features)
 */

// Articles Data Store
const TN_ARTICLES = [
  {
    id: 'interrogation-rules',
    title: 'Вызов на допрос в полицию или следственные органы: 7 правил защиты, которые спасут от обвинения',
    category: 'Уголовное право',
    categoryId: 'criminal',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер по уголовным делам конторы «T&N»',
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
        Следователь обязан вызвать вас официальной повесткой, где четко указаны: кто вызывает, в качестве кого (свидетель, свидетель с правом на защиту, подозреваемый), точное время и адрес. Телефонный звонок с требованием «срочно явиться через полчаса» не является законным вызовом. Вы имеете право спокойно связаться со своим адвокатом и согласовать время явки.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">2. Опасность статуса «Свидетель с правом на защиту» (ст. 65-1 УПК РК)</h3>
      <p class="mb-4">
        Этот статус означает, что у следствия уже есть подозрения именно против вас, но прямых улик для предъявления обвинения пока недостаточно. Цель первого допроса — получить от вас признательные показания. Если вам присвоили этот статус — <strong>допрос без участия адвоката категорически запрещен законом!</strong>
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r">
        <div class="font-bold text-[#121d28] mb-1">⚖️ Статья 77 Конституции РК:</div>
        <p class="text-sm text-slate-700 italic">
          «Никто не обязан давать показания против самого себя, своего супруга (супруги) и близких родственников...»
        </p>
      </div>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">3. Никаких «доверительных бесед» до включения протокола</h3>
      <p class="mb-4">
        Фразы вроде <em>«Давай поговорим по-человечески, выключим диктофон, расскажи, как было, и мы тебя отпустим»</em> — классический психологический прием. Все, что вы скажете «в коридоре», будет немедленно зафиксировано рапортом оперативников.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">4. Читайте протокол до последнего слова</h3>
      <p class="mb-4">
        Никогда не подписывайте протокол, не прочитав его полностью. Если следователь перефразировал ваши слова (например, вместо «я передал документы» написал «я распорядился скрыть отчет»), требуйте внесения правок собственноручно в графу «Замечания к протоколу».
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">5. Экстренная связь с адвокатом 24/7</h3>
      <p class="mb-4">
        Если вас задержали или приглашают на допрос, незамедлительно назовите имя вашего адвоката. Контора «T&N» обеспечивает прибытие адвоката в любой отдел полиции г. Алматы в течение 30–50 минут.
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
        Верховный Суд Республики Казахстан (г. Астана) — это высшая судебная инстанция страны. По статистике, более 85% кассационных ходатайств возвращаются без рассмотрения судьями единолично. Причина — шаблонные жалобы с простой переоценкой фактов вместо демонстрации фундаментальных правовых нарушений.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">В чем отличие кассации от апелляции?</h3>
      <p class="mb-4">
        Верховный Суд РК не переслушивает свидетелей и не собирает заново доказательства. Задача кассационного адвоката — доказать, что суды первой и апелляционной инстанции <strong>существенно нарушили нормы материального либо процессуального права</strong>, что привело к неправосудному решению (ст. 438 ГПК РК).
      </p>

      <div class="bg-slate-900 text-white p-6 my-6 rounded-lg border border-amber-500/40">
        <div class="font-cinzel text-amber-400 font-bold text-lg mb-2">🏆 Реальный кейс адвоката Тамары (65 000 000 ₸):</div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Суды Алматы взыскали с нашего доверителя 65 млн ₸ по иску подрядчика на основании одностороннего акта. В Верховном Суде РК нам удалось доказать нарушение ст. 654 ГК РК: подрядчик не уведомил заказчика о готовности к сдаче результата работ надлежащим образом. Верховный Суд полностью отменил взыскание и защитил активы компании.
        </p>
      </div>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Главные основания для отмены в ВС РК:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-slate-700">
        <li><strong>Неправильное применение закона:</strong> применение закона, не подлежащего применению, либо не применение закона, подлежащего применению.</li>
        <li><strong>Нарушение преюдиции:</strong> игнорирование обстоятельств, уже установленных вступившим в законную силу другим решением суда.</li>
        <li><strong>Нарушение принципа состязательности:</strong> необоснованный отказ в назначении судебной строительной или бухгалтерской экспертизы.</li>
      </ul>

      <p class="mt-6">
        Если вы проиграли суд первой и апелляционной инстанций — не опускайте руки. Кассационная коллегия Верховного Суда РК способна восстановить справедливость при безупречной юридической подготовке.
      </p>
    `
  },
  {
    id: 'debt-collection-smes',
    title: 'Взыскание долгов в СМЭС г. Алматы: арест счетов и победа за 2 судебных заседания',
    category: 'Защита бизнеса & СМЭС',
    categoryId: 'business',
    author: 'Адвокат Тамара',
    authorRole: 'Партнер по корпоративным спорам конторы «T&N»',
    authorPhoto: 'assets/images/tamara.jpg',
    date: '15 января 2026',
    readTime: '7 мин чтения',
    image: 'assets/images/pa_business.jpg',
    summary: 'Как вернуть деньги по договорам поставки и подряда: досудебный порядок, обеспечительные меры (арест счетов до решения суда) и взыскание неустойки.',
    content: `
      <p class="lead font-medium text-lg text-slate-700 mb-6">
        Неплатежи со стороны контрагентов — одна из главных угроз бизнесу в Алматы. Должники нередко тянут время, обещая оплату «на следующей неделе», а сами параллельно выводят средства с расчетных счетов и переоформляют технику на третьих лиц.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Шаг 1. Обеспечение иска (ст. 155 ГПК РК) — залог возврата денег</h3>
      <p class="mb-4">
        Главная ошибка — подать иск и ждать 2 месяца до решения. Опытный адвокат вместе с исковым заявлением подает ходатайство о <strong>наложении ареста на банковские счета и имущество ответчика</strong> в пределах суммы иска. Суд рассматривает это ходатайство в день поступления без извещения ответчика.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Шаг 2. Взыскание неустойки и законной компенсации (ст. 353 ГК РК)</h3>
      <p class="mb-4">
        Помимо основного долга, мы рассчитываем:
      </p>
      <ul class="list-disc list-inside space-y-2 mb-4 text-slate-700">
        <li>Договорную пеню / штраф;</li>
        <li>Законную неустойку за пользование чужими деньгами по базовой ставке Нацбанка РК;</li>
        <li><strong>Расходы на оплату помощи представителя (адвоката)</strong> — полностью возлагаются на проигравшего должника;</li>
        <li>Государственную пошлину (3% для юридических лиц).</li>
      </ul>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Шаг 3. Исполнение через Частного судебного исполнителя (ЧСИ)</h3>
      <p class="mb-4">
        Получение решения — это лишь 50% победы. Адвокаты «T&N» берут под личный контроль исполнительное производство: выставляются запреты на выезд учредителей должника за границу, приостанавливаются расходные операции и накладываются аресты на дебиторскую задолженность контрагентов должника.
      </p>
    `
  },
  {
    id: 'property-division-divorce',
    title: 'Раздел дорогостоящей недвижимости и бизнеса при разводе в Казахстане',
    category: 'Имущество & Семья',
    categoryId: 'property',
    author: 'Адвокат Тамара',
    authorRole: 'Управляющий партнер конторы «T&N»',
    authorPhoto: 'assets/images/tamara.jpg',
    date: '9 января 2026',
    readTime: '5 мин чтения',
    image: 'assets/images/team_group.jpg',
    summary: 'Как защитить доли в ТОО, коммерческие объекты и предотвратить создание фиктивных долгов недобросовестным супругом.',
    content: `
      <p class="lead font-medium text-lg text-slate-700 mb-6">
        Семейные споры с разделом крупного капитала, коммерческой недвижимости в Медеуском и Бостандыкском районах Алматы, а также долей в ТОО требуют тонкой юридической стратегии и конфиденциальности.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Как делятся доли в бизнесе (ТОО)?</h3>
      <p class="mb-4">
        Если ТОО создано в период брака за счет общих средств, второй супруг имеет право претендовать на половину стоимости доли либо на долю в уставном капитале (если это не запрещено уставом ТОО). Чтобы избежать рейдерского входа бывшего супруга в совет учредителей, адвокат организует проведение независимой оценки и выплату денежной компенсации без ущерба для операционной деятельности компании.
      </p>

      <div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r">
        <div class="font-bold text-[#121d28] mb-1">🛡 Защита от фиктивных долгов:</div>
        <p class="text-sm text-slate-700">
          Частая уловка недобросовестного супруга — предъявление «липовых расписок» от родственников на десятки миллионов тенге с требованием разделить этот фиктивный долг пополам. Адвокаты конторы «T&N» назначают судебно-техническую экспертизу давности документов и доказывают фиктивность обязательств.
        </p>
      </div>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Добрачное имущество и улучшения</h3>
      <p class="mb-4">
        Квартира, купленная до брака, признается личной собственностью. Однако, если за время брака были произведены капитальные вложения (ремонт, реконструкция здания, изменение целевого назначения земли), второй супруг может потребовать признания объекта общей совместной собственностью. Мы помогаем отстоять права законного владельца.
      </p>
    `
  },
  {
    id: 'bankruptcy-individuals-rk',
    title: 'Банкротство физических лиц в Казахстане: как законно списать долги и сохранить жилье',
    category: 'Банкротство физлиц',
    categoryId: 'property',
    author: 'Адвокат Нурлан',
    authorRole: 'Партнер конторы «T&N»',
    authorPhoto: 'assets/images/nurlan.jpg',
    date: '3 января 2026',
    readTime: '6 мин чтения',
    image: 'assets/images/hero.jpg',
    summary: 'Внесудебное vs судебное банкротство по Закону РК. Кому подходит процедура, какие долги списываются и как защитить единственное жилье от торгов.',
    content: `
      <p class="lead font-medium text-lg text-slate-700 mb-6">
        Закон РК «О восстановлении платежеспособности и банкротстве граждан» дает реальную возможность полностью списать непосильные кредиты перед банками второго уровня, МФО и коллекторскими агентствами.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Два вида процедуры: Внесудебное и Судебное банкротство</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div class="bg-slate-50 p-4 border border-slate-200 rounded">
          <div class="font-bold text-[#121d28] mb-1">1. Внесудебное банкротство:</div>
          <ul class="text-xs text-slate-600 space-y-1 list-disc list-inside">
            <li>Сумма долга: до 1600 МРП;</li>
            <li>Отсутствие платежей: более 12 месяцев;</li>
            <li>Отсутствие зарегистрированного имущества на праве собственности.</li>
          </ul>
        </div>
        <div class="bg-amber-50 p-4 border border-amber-200 rounded">
          <div class="font-bold text-[#121d28] mb-1">2. Судебное банкротство:</div>
          <ul class="text-xs text-slate-700 space-y-1 list-disc list-inside">
            <li>Сумма долга: свыше 1600 МРП;</li>
            <li>Проводится через суд общей юрисдикции;</li>
            <li>Списание всех остатков задолженности после реализации конкурсной массы.</li>
          </ul>
        </div>
      </div>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Можно ли сохранить единственное жилье?</h3>
      <p class="mb-4">
        Да! В соответствии с законодательством РК, если ваше единственное жилье <strong>не находится в ипотечном залоге у банка</strong>, оно защищено законом и не подлежит изъятию в конкурсную массу для погашения беззалоговых потребительских кредитов и микрозаймов.
      </p>

      <h3 class="font-cinzel text-xl font-bold text-[#121d28] mt-8 mb-3">Что дает статус банкрота:</h3>
      <ul class="list-disc list-inside space-y-2 mb-4 text-slate-700">
        <li>С момента начала процедуры прекращается начисление штрафов, пени и вознаграждения;</li>
        <li>Коллекторам и ЧСИ запрещается тревожить вас и ваших близких;</li>
        <li>Снимаются все аресты со счетов и запреты на выезд из Казахстана.</li>
      </ul>
    `
  }
];

// Initialize CRM Data if empty
function initializeCRMSeed() {
  const existingLeads = localStorage.getItem('tn_law_leads');
  if (!existingLeads) {
    const initialLeads = [
      {
        id: 'L-' + (Date.now() - 3600000 * 2),
        name: 'Анель Аскарова',
        phone: '+7 (701) 555-43-21',
        service: 'Уголовная защита (ст. 189 УК РК)',
        stage: 'Верховный Суд РК',
        urgency: 'Срочный выезд',
        status: 'in_progress',
        date: new Date(Date.now() - 3600000 * 3).toLocaleString('ru-RU'),
        notes: 'Довели дело до ВС РК и выиграли. Пересмотр судебного акта.',
        source: 'Сайт Newman Style'
      },
      {
        id: 'L-' + (Date.now() - 3600000 * 8),
        name: 'Даулет Касымов (ТОО "АлмаТрейд")',
        phone: '+7 (777) 812-90-11',
        service: 'Арбитраж и защита бизнеса',
        stage: 'СМЭС г. Алматы',
        urgency: 'В течение 24 часов',
        status: 'consultation',
        date: new Date(Date.now() - 3600000 * 8).toLocaleString('ru-RU'),
        notes: 'Взыскание задолженности по договору поставки на сумму 48 500 000 ₸.',
        source: 'Форма первого экрана'
      },
      {
        id: 'L-' + (Date.now() - 3600000 * 24),
        name: 'Мадина Смагулова',
        phone: '+7 (707) 345-67-89',
        service: 'Семейные и имущественные споры',
        stage: 'Исковое заявление',
        urgency: 'Плановая',
        status: 'contract',
        date: new Date(Date.now() - 3600000 * 24).toLocaleString('ru-RU'),
        notes: 'Раздел коммерческой недвижимости на сумму 85 000 000 ₸. Договор подписан.',
        source: 'Форма футера'
      }
    ];
    localStorage.setItem('tn_law_leads', JSON.stringify(initialLeads));
  }
}

// Kazakhstan Phone Mask (+7 (7XX) XXX-XX-XX)
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

// Toast Notifications
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-[#121d28] border-amber-500/50 text-white' : 'bg-red-900 border-red-500 text-white';
  const icon = type === 'success' ? 
    `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>` :
    `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;

  toast.className = `${bgColor} border shadow-2xl rounded-xl p-4 flex items-center gap-3 transform translate-y-[-20px] opacity-0 transition-all duration-300 pointer-events-auto min-w-[300px] max-w-md`;
  toast.innerHTML = `
    <div class="p-1 bg-white/10 rounded-full">${icon}</div>
    <div class="text-sm font-medium flex-1">${message}</div>
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
      name: leadData.name || 'Клиент с сайта',
      phone: leadData.phone,
      service: leadData.service || 'Консультация адвоката',
      stage: leadData.stage || 'Не указано',
      urgency: leadData.urgency || 'Обычная',
      notes: leadData.notes || 'Заявка оставлена через сайт T&N Law.',
      status: 'new',
      date: new Date().toLocaleString('ru-RU'),
      source: leadData.source || 'Landing Page (Newman Style)'
    };

    existing.unshift(newLead);
    localStorage.setItem('tn_law_leads', JSON.stringify(existing));

    // Telegram Bot API dispatch
    const tgConfig = JSON.parse(localStorage.getItem('tn_tg_config') || '{}');
    if (tgConfig.botToken && tgConfig.chatId) {
      const text = `⚖️ *Новая заявка с сайта T&N Law!*\n\n` +
        `👤 *Имя:* ${newLead.name}\n` +
        `📞 *Телефон:* ${newLead.phone}\n` +
        `💼 *Направление:* ${newLead.service}\n` +
        `⏱ *Срочность:* ${newLead.urgency}\n` +
        `📝 *Детали:* ${newLead.notes}\n` +
        `📍 *Источник:* ${newLead.source}\n` +
        `🕒 *Время:* ${newLead.date}`;

      fetch(`https://api.telegram.org/bot${tgConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgConfig.chatId,
          text: text,
          parse_mode: 'Markdown'
        })
      }).catch(err => console.log('Telegram dispatch silent note:', err));
    }

    return true;
  } catch (e) {
    console.error('Error saving lead:', e);
    return false;
  }
}

// ==========================================================================
// INTERACTIVE PRACTICE AREAS SWITCHER (James Newman Style)
// ==========================================================================
function initPracticeAreasSwitcher() {
  const buttons = document.querySelectorAll('.pa-btn');
  const bgImages = document.querySelectorAll('.pa-bg');
  const contents = document.querySelectorAll('.pa-content');

  if (!buttons.length) return;

  function setActiveElement(elementId) {
    buttons.forEach(btn => {
      if (btn.dataset.element === elementId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    bgImages.forEach(img => {
      if (img.dataset.element === elementId) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    contents.forEach(cnt => {
      if (cnt.dataset.element === elementId) {
        cnt.classList.remove('hide-content');
        cnt.classList.add('active');
      } else {
        cnt.classList.add('hide-content');
        cnt.classList.remove('active');
      }
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      setActiveElement(this.dataset.element);
    });

    btn.addEventListener('mouseenter', function () {
      setActiveElement(this.dataset.element);
    });
  });

  // Activate first item initially
  setActiveElement('1');
}

// Helper to fetch live articles (from Admin CMS or default seed)
function getActiveArticles() {
  const local = localStorage.getItem('tn_law_articles');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {}
  }
  return TN_ARTICLES;
}

// Sync Live Site Settings from Admin Panel
function syncLiveSiteSettings() {
  const local = localStorage.getItem('tn_site_settings');
  if (!local) return;
  try {
    const s = JSON.parse(local);
    // Update verdicts / stats bar
    const resItems = document.querySelectorAll('.results-list .result-item');
    if (resItems && resItems.length >= 4) {
      if (s.stat1_val && resItems[0].querySelector('.result-amount')) resItems[0].querySelector('.result-amount').innerText = s.stat1_val;
      if (s.stat1_desc && resItems[0].querySelector('.result-description')) resItems[0].querySelector('.result-description').innerText = s.stat1_desc;
      if (s.stat2_val && resItems[1].querySelector('.result-amount')) resItems[1].querySelector('.result-amount').innerText = s.stat2_val;
      if (s.stat2_desc && resItems[1].querySelector('.result-description')) resItems[1].querySelector('.result-description').innerText = s.stat2_desc;
      if (s.stat3_val && resItems[2].querySelector('.result-amount')) resItems[2].querySelector('.result-amount').innerText = s.stat3_val;
      if (s.stat3_desc && resItems[2].querySelector('.result-description')) resItems[2].querySelector('.result-description').innerText = s.stat3_desc;
      if (s.stat4_val && resItems[3].querySelector('.result-amount')) resItems[3].querySelector('.result-amount').innerText = s.stat4_val;
      if (s.stat4_desc && resItems[3].querySelector('.result-description')) resItems[3].querySelector('.result-description').innerText = s.stat4_desc;
    }
  } catch (e) {}
}

// ==========================================================================
// ARTICLES ENGINE (Rendering, Category Filter & Full Reader Modal)
// ==========================================================================
function renderArticlesList(categoryId = 'all') {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  const allArticles = getActiveArticles();
  const filtered = categoryId === 'all' ? 
    allArticles : 
    allArticles.filter(a => a.categoryId === categoryId);

  container.innerHTML = filtered.map(article => `
    <article class="article-card group bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      <div class="relative h-52 overflow-hidden bg-slate-100">
        <img src="${article.image || 'assets/images/pa_court.jpg'}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        <div class="absolute top-3 left-3 bg-[#121d28]/90 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-1 rounded">
          ${article.category}
        </div>
      </div>
      
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span>📅 ${article.date || 'Недавно'}</span>
            <span>•</span>
            <span>⏱ ${article.readTime || '5 мин'}</span>
          </div>
          <h3 class="font-cinzel text-lg font-bold text-[#121d28] group-hover:text-[#c49a45] transition mb-3 leading-snug line-clamp-2">
            <a href="javascript:void(0)" onclick="openArticleModal('${article.id}')">${article.title}</a>
          </h3>
          <p class="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            ${article.summary || ''}
          </p>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="${article.authorPhoto || 'assets/images/tamara.jpg'}" alt="${article.author}" class="w-7 h-7 rounded-full object-cover border border-amber-500/50">
            <span class="text-xs font-semibold text-slate-700">${article.author || 'Адвокат'}</span>
          </div>
          <button onclick="openArticleModal('${article.id}')" class="text-xs font-bold uppercase tracking-wider text-[#c49a45] hover:text-[#121d28] flex items-center gap-1 transition">
            <span>Читать</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initArticlesFilter() {
  const filterButtons = document.querySelectorAll('.article-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#121d28]', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      this.classList.add('active', 'bg-[#121d28]', 'text-white');
      this.classList.remove('bg-white', 'text-slate-700');

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
  if (readTimeEl) readTimeEl.innerText = article.readTime || '5 мин';
  if (authorNameEl) authorNameEl.innerText = article.author || 'Адвокат';
  if (authorRoleEl) authorRoleEl.innerText = article.authorRole || 'Партнер конторы «T&N»';
  if (authorPhotoEl) authorPhotoEl.src = article.authorPhoto || 'assets/images/tamara.jpg';
  if (bannerImgEl) bannerImgEl.src = article.image || 'assets/images/pa_court.jpg';
  if (contentEl) contentEl.innerHTML = article.content || '';
  if (ctaServiceInput) ctaServiceInput.value = `Вопрос по статье: ${article.title}`;

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

// ==========================================================================
// TESTIMONIALS SLIDER
// ==========================================================================
let currentTestimonialIndex = 0;
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.glide__slide');
  if (!slides.length) return;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentTestimonialIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentTestimonialIndex) {
        slide.style.display = 'block';
        slide.style.opacity = '1';
      } else {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      }
    });
  }

  showSlide(0);

  // Auto rotate every 6 seconds
  setInterval(() => {
    showSlide(currentTestimonialIndex + 1);
  }, 6000);
}

// ==========================================================================
// FORMS SUBMISSION
// ==========================================================================
function initAllForms() {
  // Footer / Main Contact Form
  const footerForm = document.getElementById('footer-contact-form');
  if (footerForm) {
    footerForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const firstName = document.getElementById('input_first_name')?.value || '';
      const lastName = document.getElementById('input_last_name')?.value || '';
      const phone = document.getElementById('input_phone')?.value || '';
      const email = document.getElementById('input_email')?.value || '';
      const message = document.getElementById('input_message')?.value || '';

      if (phone.length < 16) {
        showToast('Пожалуйста, введите корректный номер телефона', 'error');
        return;
      }

      const submitBtn = footerForm.querySelector('input[type="submit"], button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      await handleNewLead({
        name: `${firstName} ${lastName}`.trim() || 'Доверитель',
        phone: phone,
        service: 'Обращение через контактную форму',
        notes: `Email: ${email}. Сообщение: ${message}`,
        source: 'Контактная форма футера'
      });

      footerForm.reset();
      if (submitBtn) submitBtn.disabled = false;
      openSuccessModal();
      showToast('Ваше сообщение отправлено! Адвокат свяжется с вами.');
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
        service: service ? service.value : 'Срочная консультация',
        urgency: 'Срочная',
        notes: msg ? msg.value : 'Заявка из модального окна',
        source: 'Модальное окно'
      });

      closeConsultModal();
      openSuccessModal();
      showToast('Заявка принята! Мы перезвоним вам в течение 10 минут.');
    });
  }

  // Article CTA Form
  const articleCtaForm = document.getElementById('article-cta-form');
  if (articleCtaForm) {
    articleCtaForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const phone = document.getElementById('article-cta-phone');
      const name = document.getElementById('article-cta-name');
      const service = document.getElementById('article-cta-service')?.value || 'Вопрос по статье';

      if (!phone || phone.value.length < 16) {
        showToast('Укажите корректный номер телефона', 'error');
        return;
      }

      await handleNewLead({
        name: name ? name.value : 'Читатель статьи',
        phone: phone.value,
        service: service,
        urgency: 'Плановая',
        notes: `Запрос на консультацию из статьи: ${service}`,
        source: 'Модальное окно статьи'
      });

      closeArticleModal();
      openSuccessModal();
      showToast('Запрос отправлен! Адвокат ответит на ваши вопросы.');
    });
  }
}

// Modal Controllers
function openConsultModal(defaultService = 'Консультация адвоката') {
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
  initializeCRMSeed();
  syncLiveSiteSettings();
  initPhoneMasks();
  initPracticeAreasSwitcher();
  initArticlesFilter();
  initTestimonialsSlider();
  initAllForms();
  initMobileMenu();
});
