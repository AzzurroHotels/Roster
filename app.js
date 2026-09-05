const CONFIG = window.AZZURRO_SUPABASE;
const supabaseClient = window.supabase.createClient(CONFIG.url, CONFIG.anonKey);

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const PROPERTIES = ['all', 'allen', 'olympic', 'central', 'potts', 'flinders'];
const OLYMPIC_ONSITE_NAMES = ['sobit', 'farabi'];
const AUTO_TABS = ['reception', 'housekeeping'];
const DEPARTMENTS = [
  { id: 'reception', label: 'Reception' },
  { id: 'backoffice', label: 'Back office' },
  { id: 'housekeeping', label: 'Housekeeping / Cleaners' }
];

const TEMPLATES = {
  reception: {
    label: 'Reception',
    rows: [
      { id: 'virtual-am', group: '10.5 - Hour Shift', tone: 'green', label: '', time: '3:30 AM - 2 PM', note: '(3 AM - 7 AM All Properties)', property: 'all', period: 'am' },
      { id: 'virtual-pm', group: '10.5 - Hour Shift', tone: 'green', label: '', time: '5 PM - 3:30 AM', note: '(11 PM - 3 AM All Properties)', property: 'all', period: 'pm' },
      { id: 'allen-am', group: 'Allen', tone: 'yellow', label: 'AM', time: '7 AM - 3 PM', property: 'allen', period: 'am' },
      { id: 'allen-pm', group: 'Allen', tone: 'yellow', label: 'PM', time: '3 PM - 11 PM', property: 'allen', period: 'pm' },
      { id: 'central-am', group: 'Central / Pyrmont', tone: 'orange', label: 'AM', time: '7 AM - 3 PM', property: 'central', period: 'am' },
      { id: 'central-pm', group: 'Central / Pyrmont', tone: 'orange', label: 'PM', time: '3 PM - 11 PM', property: 'central', period: 'pm' },
      { id: 'olympic-am-primary', group: 'Olympic', tone: 'sage', label: 'AM', time: '3:30 AM - 2 PM', property: 'olympic', period: 'am' },
      { id: 'olympic-pm', group: 'Olympic', tone: 'sage', label: 'PM', time: '2 PM - 5 PM', note: 'Onsite: Sobit / Farabi only', property: 'olympic', period: 'pm', allowedNames: ['Sobit', 'Farabi'] },
      { id: 'olympic-am-secondary', group: 'Olympic', tone: 'sage', label: 'PM', time: '5 PM - 3:30 AM', property: 'olympic', period: 'pm' },
      { id: 'potts-am', group: 'Potts Point', tone: 'blue', label: 'AM', time: '8 AM - 4 PM', property: 'potts', period: 'am' },
      { id: 'potts-pm', group: 'Potts Point', tone: 'blue', label: 'PM', time: '4 PM - 12 MN', property: 'potts', period: 'pm' }
    ]
  },
  backoffice: {
    label: 'Back office',
    rows: [
      { id: 'ops-am', group: 'Operations & Maintenance', tone: 'yellow', label: '', time: '10 AM - 6 PM', property: 'any', period: 'am' },
      { id: 'ops-pm', group: 'Operations & Maintenance', tone: 'yellow', label: '', time: '9 AM - 9 PM', property: 'any', period: 'pm' },
      { id: 'pricing-am', group: 'Pricing', tone: 'sage', label: '', time: '8 AM - 4 PM', property: 'any', period: 'am' },
      { id: 'pricing-pm', group: 'Pricing', tone: 'sage', label: '', time: '9 AM - 5 PM', property: 'any', period: 'pm' },
      { id: 'marketing', group: 'Marketing', tone: 'blue', label: '', time: '10 AM - 6 PM', property: 'any', period: 'am' }
    ]
  },
  housekeeping: {
    label: 'Housekeeping / Cleaners',
    rows: [
      { id: 'allen-cleaner', group: 'Allen (Cleaner)', tone: 'yellow', label: '', time: '7:30 AM - 12:30 PM', property: 'allen', period: 'am' },
      { id: 'allen-housekeeping-am', group: 'Allen (Housekeeping)', tone: 'yellow', label: '', time: '10 AM - 3 PM', property: 'allen', period: 'am' },
      { id: 'allen-housekeeping-pm', group: 'Allen (Housekeeping)', tone: 'yellow', label: '', time: '2:30 PM - 5:30 PM', property: 'allen', period: 'pm' },
      { id: 'allen-housekeeping-late', group: 'Allen (Housekeeping)', tone: 'yellow', label: '', time: '2:30 PM - 6:30 PM', property: 'allen', period: 'pm' },
      { id: 'central-cleaner-am', group: 'Central', tone: 'orange', label: '', time: '8 AM - 1 PM', property: 'central', period: 'am' },
      { id: 'central-cleaner-pm', group: 'Central', tone: 'orange', label: '', time: '6 PM - 10 PM', property: 'central', period: 'pm' },
      { id: 'pyrmont-cleaner', group: 'Pyrmont', tone: 'orange', label: '', time: '10 AM - 2 PM', property: 'central', period: 'am' },
      { id: 'flinders-cleaner-am', group: 'Flinders', tone: 'blue', label: '', time: '9 AM - 4 PM', property: 'flinders', period: 'am' },
      { id: 'flinders-cleaner-pm', group: 'Flinders', tone: 'blue', label: '', time: '6 PM - 9 PM', property: 'flinders', period: 'pm' },
      { id: 'potts-cleaner-am', group: 'Potts Point', tone: 'blue', label: '', time: '8 AM - 1 PM', property: 'potts', period: 'am' },
      { id: 'potts-cleaner-pm', group: 'Potts Point', tone: 'blue', label: '', time: '6 PM - 9 PM', property: 'potts', period: 'pm' },
      { id: 'olympic-cleaner', group: 'Olympic', tone: 'sage', label: '', time: '10 AM - 2 PM', property: 'olympic', period: 'am' },
      { id: 'graveyard', group: 'Graveyard', tone: 'blue', label: '', time: '10 PM - 6 AM', property: 'any', period: 'pm' },
      { id: 'onsite-maintenance', group: 'Onsite Maintenance', tone: 'coral', label: '', time: '6 AM - 6 PM', property: 'any', period: 'am' }
    ]
  }
};

let state = {
  session: null,
  userRole: null,
  member: null,
  employees: [],
  publicEmployees: [],
  leaves: [],
  assignments: {},
  publicData: null,
  weekStart: nextMonday(),
  activeTab: 'reception',
  adminPanel: 'roster',
  editingEmployeeId: null,
  leaveOpen: false,
  loading: true
};

const $ = id => document.getElementById(id);
const allRows = () => Object.entries(TEMPLATES).flatMap(([tab, template]) => template.rows.map(row => ({ ...row, tab })));
const rowById = id => allRows().find(row => row.id === id);

function mondayOf(value) {
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
}

function addDays(value, amount) {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

function nextMonday() {
  const today = new Date();
  const offset = today.getDay() === 0 ? 1 : 8 - today.getDay();
  today.setDate(today.getDate() + offset);
  return mondayOf(today.toISOString().slice(0, 10));
}

function dateLabel(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12)).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' });
}

function longDate(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12)).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function weekLabel() { return `Week of ${longDate(state.weekStart)}`; }
function employeeById(id) { return state.employees.find(employee => employee.id === id); }
function slotKey(rowId, day) { return `${rowId}-${day}`; }
function toast(message) { const element = $('toast'); element.textContent = message; element.classList.add('show'); clearTimeout(window.__azToast); window.__azToast = setTimeout(() => element.classList.remove('show'), 3200); }
function showError(message) { const element = $('authError'); if (element) { element.textContent = message; element.hidden = false; } else toast(message); }

function setHash(hash) { window.location.hash = hash; }
function currentRoute() { return window.location.hash.replace(/^#/, '').split('?')[0] || '/roster'; }
function queryValue(name) { return new URLSearchParams(window.location.hash.split('?')[1] || '').get(name); }

function shell(content, options = {}) {
  const admin = options.admin;
  return `<div class="app-shell ${admin ? 'az-admin-mode' : ''}">
    ${admin ? `<aside class="sidebar"><div class="brand"><div class="brand-mark">A</div><div><strong>Azzurro</strong><span>Admin operations</span></div></div><div class="sidebar-label">Admin workspace</div><nav><button class="nav-item ${state.adminPanel === 'roster' ? 'active' : ''}" data-admin-panel="roster"><span class="nav-icon">▦</span><span>Roster</span></button><button class="nav-item ${state.adminPanel === 'leaves' ? 'active' : ''}" data-admin-panel="leaves"><span class="nav-icon">◷</span><span>Leave requests</span></button><button class="nav-item ${state.adminPanel === 'team' ? 'active' : ''}" data-admin-panel="team"><span class="nav-icon">◎</span><span>Team & performance</span></button></nav><div class="sidebar-note"><span class="status-dot"></span><div><strong>Admin access</strong><small>${escapeHtml(state.session?.user?.email || '')}</small></div></div></aside>` : ''}
    <main class="main-content ${admin ? '' : 'az-public-main'}">${content}</main>
  </div>`;
}

function renderAuth() {
  $('app').innerHTML = `<div class="az-auth-page"><div class="az-auth-brand"><div class="brand-mark">A</div><h1>Azzurro<br />Roster</h1><p>One place for the published team roster, leave requests, and admin scheduling.</p><small>Secure access powered by Supabase.</small></div><div class="az-auth-panel"><div class="eyebrow">ADMIN / TEAM ACCESS</div><h2>Sign in</h2><p class="az-auth-subtitle">Use your Azzurro account to manage the roster. Leave requests can be filed from the public page.</p><form id="loginForm" class="az-auth-form"><label>Email address<input id="loginEmail" type="email" autocomplete="email" required /></label><label>Password<input id="loginPassword" type="password" autocomplete="current-password" required /></label><div id="authError" class="az-error" role="alert" hidden></div><button class="generate-btn" type="submit">Sign in</button></form><button class="az-link-button" id="publicRosterLink" type="button">View public roster</button></div></div>`;
  $('loginForm').addEventListener('submit', login);
  $('publicRosterLink').addEventListener('click', () => setHash('/roster'));
}

function renderPublic() {
  const tab = state.activeTab;
  const data = state.publicData?.assignments?.[tab] || {};
  const content = `<header class="az-public-header"><div class="az-public-brand"><div class="brand-mark">A</div><div><strong>Azzurro Hotels</strong><span>Team roster</span></div></div><div class="az-public-actions"><span class="az-live-dot"></span><span>Published schedule</span>${state.session ? `<button class="secondary-btn" id="publicSignOut">Sign out</button>` : `<button class="secondary-btn" id="publicLogin">Admin / team login</button>`}</div></header><section class="az-public-heading"><div><div class="eyebrow">PUBLISHED ROSTER</div><h1>Reception roster</h1><p>Read-only team view · ${escapeHtml(weekLabel())}</p></div><div class="az-public-week"><button class="az-week-arrow" data-public-week="prev" aria-label="Previous week">‹</button><strong>${escapeHtml(weekLabel())}</strong><button class="az-week-arrow" data-public-week="next" aria-label="Next week">›</button></div></section><div class="tab-bar panel az-public-tabs">${DEPARTMENTS.map(department => `<button class="tab-btn ${tab === department.id ? 'active' : ''}" data-public-tab="${department.id}">${escapeHtml(department.label)}</button>`).join('')}</div>${publicRosterGrid(tab, data)}<section class="az-leave-panel panel"><div><div class="eyebrow">TIME OFF</div><h2>Need to file leave?</h2><p>Enter your name and requested dates. The request will be sent to admin for approval.</p></div><button class="primary-btn" id="openLeaveForm">File leave request</button></section>${state.leaveOpen ? leaveForm() : ''}`;
  $('app').innerHTML = shell(content);
  bindPublic();
}

function publicRosterGrid(tab, assignments) {
  const template = TEMPLATES[tab];
  let html = `<section class="roster-panel panel"><div class="roster-scroll"><div class="roster-grid az-readonly-grid"><div class="grid-corner"></div><div class="grid-corner"></div>${DAYS.map((day, index) => `<div class="date-head"><strong>${dateLabel(addDays(state.weekStart, index))}</strong></div>`).join('')}<div class="grid-corner"></div><div class="grid-corner"></div>${DAYS.map(day => `<div class="weekday-head">${day}</div>`).join('')}<div class="section-title">${escapeHtml(template.label)}</div>`;
  let previousGroup = '';
  template.rows.forEach(row => {
    if (row.group !== previousGroup) { const count = template.rows.filter(item => item.group === row.group).length; html += `<div class="group-label ${row.tone}" style="grid-row:span ${count}">${escapeHtml(row.group)}</div>`; previousGroup = row.group; }
    html += `<div class="shift-label ${row.tone}"><strong>${escapeHtml(row.label)}</strong><span>${escapeHtml(row.time)}</span>${row.note ? `<small>${escapeHtml(row.note)}</small>` : ''}</div>`;
    DAYS.forEach((_, day) => { html += `<div class="assignment-cell ${assignments[slotKey(row.id, day)] ? 'filled' : 'needs-cover'}"><span class="az-public-name">${escapeHtml(assignments[slotKey(row.id, day)] || 'Needs cover')}</span></div>`; });
  });
  return `${html}<div class="days-off-label">${tab === 'reception' ? 'Reception days off' : 'Days off'}</div>${DAYS.map((_, day) => `<div class="days-off-cell"><span class="az-public-off">${escapeHtml(state.publicData?.daysOff?.[tab]?.[day] || '—')}</span></div>`).join('')}</div></div><div class="roster-foot"><span>Read-only roster · Contact admin if a change is needed.</span><span>${state.publicData ? 'Updated schedule' : 'No published roster yet'}</span></div></section>`;
}

function leaveForm() {
  return `<div class="az-modal-backdrop"><section class="az-modal panel"><div class="az-modal-head"><div><div class="eyebrow">LEAVE REQUEST</div><h2>Submit leave dates</h2></div><button class="close-btn" id="closeLeave" type="button" aria-label="Close">×</button></div><p class="helper">Enter your name and requested dates. Your request will remain pending until an admin approves or disapproves it.</p><form id="leaveForm"><label>Your name<input id="leaveName" list="leaveNames" autocomplete="name" placeholder="Start typing your name" required /><datalist id="leaveNames">${state.publicEmployees.map(employee => `<option value="${escapeHtml(employee.name)}"></option>`).join('')}</datalist></label><div class="form-row"><label>Start date<input id="leaveStart" type="date" required /></label><label>End date<input id="leaveEnd" type="date" required /></label></div><label>Reason (optional)<textarea id="leaveReason" rows="3" placeholder="Add a short note for the admin"></textarea></label><div id="leaveError" class="az-error" role="alert" hidden></div><div class="dialog-actions"><button class="secondary-btn" id="cancelLeave" type="button">Cancel</button><button class="primary-btn" type="submit">Submit request</button></div></form></section></div>`;
}

function renderAdmin() {
  const content = `<header class="topbar"><div><div class="eyebrow">ADMIN WORKSPACE</div><h1>Azzurro roster</h1></div><div class="top-actions"><button class="secondary-btn" id="adminPublicView">Public page</button><button class="primary-btn" id="adminSignOut">Sign out</button></div></header>${state.adminPanel === 'roster' ? adminRosterPanel() : state.adminPanel === 'leaves' ? adminLeavesPanel() : adminTeamPanel()}`;
  $('app').innerHTML = shell(content, { admin: true });
  bindAdmin();
}

function adminRosterPanel() {
  const template = TEMPLATES[state.activeTab];
  return `<section class="control-strip panel"><div class="control-main"><div class="section-kicker">Plan a week</div><label for="adminWeek">Roster week (Monday–Sunday)</label><input id="adminWeek" type="week" value="${weekInputValue(state.weekStart)}" /></div><div class="rule-control"><label for="maxDays">Max days per person</label><input id="maxDays" type="number" min="1" max="7" value="5" /></div><div class="template-note"><span class="template-icon">▤</span><div><strong>Auto-generate</strong><small>Reception + Cleaners</small><small>Back office remains manual</small></div></div><button class="generate-btn" id="generateBtn"><span>✦</span> Auto-generate roster</button></section><section class="tab-bar panel">${DEPARTMENTS.map(department => `<button class="tab-btn ${state.activeTab === department.id ? 'active' : ''}" data-admin-tab="${department.id}">${escapeHtml(department.label)}</button>`).join('')}</section><section class="roster-panel panel"><div class="panel-heading"><div><div class="section-kicker">Generated schedule</div><h2>${escapeHtml(template.label)} · ${escapeHtml(weekLabel())}</h2></div><div class="legend"><span><i class="legend-dot high"></i>High performance</span><span><i class="legend-dot standard"></i>Standard</span><span><i class="legend-dot empty"></i>Needs cover</span></div></div><div class="roster-scroll">${adminRosterGrid(state.activeTab)}</div><div class="roster-foot"><span>Approved leave dates are blocked from auto-generation and manual selection.</span><button class="secondary-btn" id="saveRoster">Save & publish roster</button></div></section>`;
}

function adminRosterGrid(tab) {
  const template = TEMPLATES[tab];
  const rows = template.rows.map(row => ({ ...row, tab }));
  let html = '<div class="roster-grid">';
  html += '<div class="grid-corner"></div><div class="grid-corner"></div>' + DAYS.map((_, index) => `<div class="date-head"><strong>${dateLabel(addDays(state.weekStart, index))}</strong></div>`).join('');
  html += '<div class="grid-corner"></div><div class="grid-corner"></div>' + DAYS.map(day => `<div class="weekday-head">${day}</div>`).join('');
  html += `<div class="section-title">${escapeHtml(template.label)}</div>`;
  let previousGroup = '';
  rows.forEach(row => {
    if (row.group !== previousGroup) { const count = rows.filter(item => item.group === row.group).length; html += `<div class="group-label ${row.tone}" style="grid-row:span ${count}">${escapeHtml(row.group)}</div>`; previousGroup = row.group; }
    html += `<div class="shift-label ${row.tone}"><strong>${escapeHtml(row.label)}</strong><span>${escapeHtml(row.time)}</span>${row.note ? `<small>${escapeHtml(row.note)}</small>` : ''}</div>`;
    DAYS.forEach((_, day) => {
      const key = slotKey(row.id, day);
      const id = state.assignments[key] || '';
      const person = employeeById(id);
      const linked = linkedVirtualRow(row);
      const disabled = linked && state.assignments[slotKey(linked.id, day)] ? ' disabled title="Linked to 10.5-hour shift"' : '';
      html += `<div class="assignment-cell ${id ? 'filled' : 'needs-cover'}"><select data-slot="${key}" aria-label="${escapeHtml(row.group)} ${escapeHtml(row.label)} ${DAYS[day]}"${disabled}>${selectOptions(id, row, day)}</select></div>`;
    });
  });
  const daysOff = DAYS.map((_, day) => state.employees.filter(employee => !workingDays(employee.id).has(day) && employee.department === tab).map(employee => employee.name).join(', ') || '—');
  html += `<div class="days-off-label">${tab === 'reception' ? 'Reception days off' : 'Days off'}</div>${daysOff.map(names => `<div class="days-off-cell"><span class="az-public-off">${escapeHtml(names)}</span></div>`).join('')}</div>`;
  return html;
}

function selectOptions(selected, row, day) {
  const options = state.employees.filter(employee => canAssign(employee, row, day));
  return `<option value="">Needs cover</option>${options.map(employee => `<option value="${escapeHtml(employee.id)}" ${selected === employee.id ? 'selected' : ''}>${escapeHtml(employee.name)} · ${Number(employee.performance_score || 0).toFixed(1)}</option>`).join('')}`;
}

function canAssign(employee, row, day) {
  if (!employee || employee.department !== row.tab) return false;
  if (isOnApprovedLeave(employee.id, addDays(state.weekStart, day))) return false;
  if (row.id === 'olympic-pm') {
    const nameParts = employee.name.trim().toLowerCase().split(/\s+/);
    if (!OLYMPIC_ONSITE_NAMES.some(name => nameParts.includes(name))) return false;
  }
  if (row.allowedNames?.length) {
    const name = employee.name.trim().toLowerCase();
    if (!row.allowedNames.some(allowed => name === allowed.toLowerCase() || name.split(/\s+/).includes(allowed.toLowerCase()))) return false;
  }
  if (row.property === 'any') return true;
  const properties = employee.allowed_properties || ['all'];
  return properties.includes('all') || properties.includes(row.property);
}

function linkedOlympicRow(row) { if (row.id === 'virtual-am') return rowById('olympic-am-primary'); if (row.id === 'virtual-pm') return rowById('olympic-am-secondary'); return null; }
function linkedVirtualRow(row) { if (row.id === 'olympic-am-primary') return rowById('virtual-am'); if (row.id === 'olympic-am-secondary') return rowById('virtual-pm'); return null; }

function isOnApprovedLeave(employeeId, date) { return state.leaves.some(leave => leave.employee_id === employeeId && leave.status === 'approved' && leave.start_date <= date && leave.end_date >= date); }
function workingDays(employeeId) { const days = new Set(); Object.entries(state.assignments).forEach(([key, id]) => { if (id === employeeId) days.add(Number(key.slice(key.lastIndexOf('-') + 1))); }); return days; }
function periodScheduled(employeeId, day, period) { return Object.entries(state.assignments).some(([key, id]) => { if (id !== employeeId) return false; const index = key.lastIndexOf('-'); if (Number(key.slice(index + 1)) !== day) return false; const row = rowById(key.slice(0, index)); return row?.period === period; }); }

function autoGenerate() {
  AUTO_TABS.flatMap(tab => TEMPLATES[tab].rows).forEach(row => DAYS.forEach((_, day) => delete state.assignments[slotKey(row.id, day)]));
  const active = state.employees.filter(employee => employee.active !== false && employee.available_days?.length);
  const offPlan = {};
  active.forEach((employee, index) => { const start = index % 6; offPlan[employee.id] = [start, start + 1]; });
  const maxDays = 5;
  AUTO_TABS.flatMap(tab => TEMPLATES[tab].rows.map(row => ({ ...row, tab }))).forEach(row => DAYS.forEach((_, day) => {
    const linked = linkedVirtualRow(row);
    if (linked && state.assignments[slotKey(linked.id, day)]) { state.assignments[slotKey(row.id, day)] = state.assignments[slotKey(linked.id, day)]; return; }
    const candidates = active.filter(employee => employee.available_days.includes(day) && !offPlan[employee.id].includes(day) && workingDays(employee.id).size < Math.min(maxDays, Number(employee.max_days || maxDays)) && !periodScheduled(employee.id, day, row.period) && canAssign(employee, row, day));
    candidates.sort((a, b) => Number(b.performance_score || 0) - Number(a.performance_score || 0) || workingDays(a.id).size - workingDays(b.id).size);
    if (candidates[0]) { state.assignments[slotKey(row.id, day)] = candidates[0].id; const olympic = linkedOlympicRow(row); if (olympic) state.assignments[slotKey(olympic.id, day)] = candidates[0].id; }
  }));
  renderAdmin();
  saveRoster(true);
  toast('Roster generated. Approved leave dates were excluded.');
}

function adminLeavesPanel() {
  const pending = state.leaves.filter(leave => leave.status === 'pending').length;
  return `<section class="az-page-heading"><div><div class="eyebrow">TIME OFF MANAGEMENT</div><h1>Leave requests</h1><p>Approve or disapprove requests. Approved dates are automatically blocked from the roster.</p></div><div class="az-count-badge">${pending} pending</div></section><section class="panel az-leave-table"><div class="az-table-head"><span>Employee</span><span>Dates</span><span>Reason</span><span>Status</span><span>Action</span></div>${state.leaves.length ? state.leaves.map(leave => { const employee = employeeById(leave.employee_id); return `<div class="az-table-row"><div><strong>${escapeHtml(employee?.name || 'Unknown employee')}</strong><small>${escapeHtml(employee?.email || '')}</small></div><div>${escapeHtml(longDate(leave.start_date))} – ${escapeHtml(longDate(leave.end_date))}</div><div>${escapeHtml(leave.reason || '—')}</div><div><span class="az-status ${escapeHtml(leave.status)}">${escapeHtml(leave.status)}</span></div><div class="az-actions">${leave.status === 'pending' ? `<button class="primary-btn small-btn" data-leave-action="approve" data-leave-id="${leave.id}">Approve</button><button class="secondary-btn small-btn" data-leave-action="disapprove" data-leave-id="${leave.id}">Disapprove</button>` : `<small>${leave.reviewed_at ? `Reviewed ${longDate(leave.reviewed_at.slice(0, 10))}` : ''}</small>`}</div></div>`; }).join('') : '<div class="az-empty-state">No leave requests yet.</div>'}</section>`;
}

function adminTeamPanel() {
  return `<section class="az-page-heading"><div><div class="eyebrow">TEAM INPUTS</div><h1>Team & performance</h1><p>These values control roster eligibility and performance-based allocation.</p></div><button class="primary-btn" id="addEmployee">Add employee</button></section><section class="panel az-team-table"><div class="az-table-head"><span>Employee</span><span>Department</span><span>Performance</span><span>Availability</span><span>Properties</span><span>Actions</span></div>${state.employees.length ? state.employees.map(employee => `<div class="az-table-row"><div><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.email || '')}</small></div><div>${escapeHtml(DEPARTMENTS.find(department => department.id === employee.department)?.label || employee.department)}</div><div><strong>${Number(employee.performance_score || 0).toFixed(1)}</strong> / 5</div><div>${escapeHtml((employee.available_days || []).map(day => DAYS[day]).join(', ') || 'None')}</div><div>${escapeHtml((employee.allowed_properties || []).join(', ') || 'None')}</div><div class="az-actions"><button class="secondary-btn small-btn" data-edit-employee="${employee.id}">Edit</button><button class="secondary-btn small-btn" data-delete-employee="${employee.id}">Archive</button></div></div>`).join('') : '<div class="az-empty-state">Add employees in Supabase first, then manage their roster inputs here.</div>'}</section>${state.editingEmployeeId !== null ? employeeEditor() : ''}`;
}

function employeeEditor() {
  const employee = state.editingEmployeeId ? employeeById(state.editingEmployeeId) : { name: '', email: '', department: 'reception', performance_score: 4, max_days: 5, available_days: [0, 1, 2, 3, 4], allowed_properties: ['all'] };
  return `<div class="az-modal-backdrop"><section class="az-modal panel"><div class="az-modal-head"><div><div class="eyebrow">TEAM INPUTS</div><h2>${state.editingEmployeeId ? 'Edit employee' : 'Add employee'}</h2></div><button class="close-btn" id="closeEmployeeEditor" type="button" aria-label="Close">×</button></div><p class="helper">Email is optional. Employees do not need an account to be rostered or to file leave.</p><form id="employeeForm"><div class="form-row"><label>Name<input id="employeeName" value="${escapeHtml(employee.name)}" required /></label><label>Email (optional)<input id="employeeEmail" type="email" value="${escapeHtml(employee.email || '')}" placeholder="Only needed for optional team login" /></label></div><div class="form-row"><label>Department<select id="employeeDepartment">${DEPARTMENTS.map(department => `<option value="${department.id}" ${employee.department === department.id ? 'selected' : ''}>${escapeHtml(department.label)}</option>`).join('')}</select></label><label>Performance score<input id="employeeScore" type="number" min="1" max="5" step="0.1" value="${Number(employee.performance_score || 4)}" required /></label></div><div class="form-row"><label>Maximum days<input id="employeeMaxDays" type="number" min="1" max="7" value="${Number(employee.max_days || 5)}" required /></label><label>Allowed properties<input id="employeeProperties" value="${escapeHtml((employee.allowed_properties || ['all']).join(', '))}" placeholder="all, allen, olympic" /></label></div><label>Available days</label><div class="az-day-picker">${DAYS.map((day, index) => `<label><input type="checkbox" name="employeeDay" value="${index}" ${(employee.available_days || []).includes(index) ? 'checked' : ''} />${day}</label>`).join('')}</div><div id="employeeError" class="az-error" role="alert" hidden></div><div class="dialog-actions"><button class="secondary-btn" id="closeEmployeeEditor2" type="button">Cancel</button><button class="primary-btn" type="submit">Save employee</button></div></form></section></div>`;
}

function bindPublic() {
  document.querySelectorAll('[data-public-tab]').forEach(button => button.addEventListener('click', () => { state.activeTab = button.dataset.publicTab; renderPublic(); }));
  document.querySelectorAll('[data-public-week]').forEach(button => button.addEventListener('click', async () => { state.weekStart = addDays(state.weekStart, button.dataset.publicWeek === 'next' ? 7 : -7); await loadPublicRoster(); renderPublic(); }));
  $('publicLogin')?.addEventListener('click', () => setHash('/login'));
  $('publicSignOut')?.addEventListener('click', signOut);
  $('openLeaveForm')?.addEventListener('click', () => { state.leaveOpen = true; renderPublic(); });
  $('closeLeave')?.addEventListener('click', () => { state.leaveOpen = false; renderPublic(); });
  $('cancelLeave')?.addEventListener('click', () => { state.leaveOpen = false; renderPublic(); });
  $('leaveForm')?.addEventListener('submit', submitLeave);
}

function bindAdmin() {
  document.querySelectorAll('[data-admin-panel]').forEach(button => button.addEventListener('click', async () => { state.adminPanel = button.dataset.adminPanel; if (state.adminPanel === 'leaves') await loadLeaves(); if (state.adminPanel === 'team') await loadEmployees(); renderAdmin(); }));
  document.querySelectorAll('[data-admin-tab]').forEach(button => button.addEventListener('click', async () => { state.activeTab = button.dataset.adminTab; await loadAdminRoster(); renderAdmin(); }));
  $('adminPublicView')?.addEventListener('click', () => setHash('/roster'));
  $('adminSignOut')?.addEventListener('click', signOut);
  $('generateBtn')?.addEventListener('click', autoGenerate);
  $('saveRoster')?.addEventListener('click', () => saveRoster(false));
  $('adminWeek')?.addEventListener('change', async event => { state.weekStart = mondayFromWeek(event.target.value); await loadAdminRoster(); renderAdmin(); });
  document.querySelectorAll('[data-leave-action]').forEach(button => button.addEventListener('click', () => reviewLeave(button.dataset.leaveId, button.dataset.leaveAction === 'approve')));
  $('addEmployee')?.addEventListener('click', () => { state.editingEmployeeId = ''; renderAdmin(); });
  document.querySelectorAll('[data-edit-employee]').forEach(button => button.addEventListener('click', () => { state.editingEmployeeId = button.dataset.editEmployee; renderAdmin(); }));
  document.querySelectorAll('[data-delete-employee]').forEach(button => button.addEventListener('click', () => archiveEmployee(button.dataset.deleteEmployee)));
  $('closeEmployeeEditor')?.addEventListener('click', () => { state.editingEmployeeId = null; renderAdmin(); });
  $('closeEmployeeEditor2')?.addEventListener('click', () => { state.editingEmployeeId = null; renderAdmin(); });
  $('employeeForm')?.addEventListener('submit', saveEmployee);
  document.querySelectorAll('select[data-slot]').forEach(select => select.addEventListener('change', async event => { const key = event.target.dataset.slot; state.assignments[key] = event.target.value; const row = rowById(key.slice(0, key.lastIndexOf('-'))); const day = Number(key.slice(key.lastIndexOf('-') + 1)); const linked = linkedOlympicRow(row); if (linked) state.assignments[slotKey(linked.id, day)] = event.target.value; renderAdmin(); await saveRoster(false); }));
}

async function saveEmployee(event) {
  event.preventDefault();
  const available = [...document.querySelectorAll('input[name="employeeDay"]:checked')].map(input => Number(input.value));
  const properties = $('employeeProperties').value.split(',').map(value => value.trim().toLowerCase()).filter(Boolean);
  if (!available.length || !properties.length) { $('employeeError').textContent = 'Select at least one available day and one allowed property.'; $('employeeError').hidden = false; return; }
  const current = state.editingEmployeeId ? employeeById(state.editingEmployeeId) : null;
  const employee = { ...(current || {}), name: $('employeeName').value.trim(), email: $('employeeEmail').value.trim() || null, department: $('employeeDepartment').value, performance_score: Number($('employeeScore').value), max_days: Number($('employeeMaxDays').value), available_days: available, allowed_properties: properties, active: true };
  if (!employee.name) { $('employeeError').textContent = 'Enter the employee name.'; $('employeeError').hidden = false; return; }
  const request = current
    ? supabaseClient.from('team_members').update(employee).eq('id', current.id)
    : supabaseClient.from('team_members').insert(employee);
  const { error } = await request;
  if (error) {
    const message = error.code === '42501'
      ? 'Supabase blocked this action. Confirm that your logged-in user has an admin row in public.user_roles.'
      : error.code === '23505'
        ? 'An employee with this email already exists. Leave email blank if this employee does not need team login.'
        : error.message;
    $('employeeError').textContent = message; $('employeeError').hidden = false; return;
  }
  state.editingEmployeeId = null; await loadEmployees(); renderAdmin(); toast('Employee details saved.');
}

async function archiveEmployee(id) {
  const employee = employeeById(id);
  if (!employee || !window.confirm(`Archive ${employee.name}? They will no longer be available for new rosters.`)) return;
  const { error } = await supabaseClient.from('team_members').update({ active: false }).eq('id', id);
  if (error) { toast(error.message); return; }
  await loadEmployees(); renderAdmin(); toast(`${employee.name} archived.`);
}

async function login(event) {
  event.preventDefault();
  const email = $('loginEmail').value.trim();
  const password = $('loginPassword').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) { showError(error.message); return; }
  await loadIdentity();
  if (!state.userRole) { await signOut(); showError('This account has not been given admin or team access yet.'); return; }
  setHash(state.userRole === 'admin' ? '/admin' : (queryValue('next') === 'leave' ? '/roster?leave=1' : '/roster'));
}

async function signOut() { await supabaseClient.auth.signOut(); state.session = null; state.userRole = null; state.member = null; setHash('/roster'); }

async function loadIdentity() {
  if (!state.session) { state.userRole = null; state.member = null; return; }
  const { data: role } = await supabaseClient.from('user_roles').select('role').eq('user_id', state.session.user.id).maybeSingle();
  state.userRole = role?.role || null;
  const { data: member } = await supabaseClient.from('team_members').select('*').eq('auth_user_id', state.session.user.id).maybeSingle();
  state.member = member || null;
}

async function loadEmployees() {
  const { data, error } = await supabaseClient.from('team_members').select('*').eq('active', true).order('name');
  if (error) { toast(error.message); return; }
  state.employees = data || [];
}

async function loadLeaves() {
  const { data, error } = await supabaseClient.from('leave_requests').select('*').order('created_at', { ascending: false });
  if (error) { toast(error.message); return; }
  state.leaves = data || [];
}

async function loadPublicRoster() {
  const { data, error } = await supabaseClient.from('published_rosters').select('week_start,data').eq('week_start', state.weekStart).eq('published', true).maybeSingle();
  if (error) { state.publicData = null; if (!error.message.includes('relation')) toast(error.message); return; }
  state.publicData = data?.data || null;
}

async function loadPublicDirectory() {
  const { data, error } = await supabaseClient.from('public_team_members').select('id,name').order('name');
  if (error) { state.publicEmployees = []; if (!error.message.includes('relation')) toast(error.message); return; }
  state.publicEmployees = data || [];
}

async function loadAdminRoster() {
  const { data, error } = await supabaseClient.from('admin_rosters').select('assignments').eq('week_start', state.weekStart).maybeSingle();
  if (error) { toast(error.message); return; }
  state.assignments = data?.assignments || {};
}

async function submitLeave(event) {
  event.preventDefault();
  const employeeName = $('leaveName').value.trim().toLowerCase();
  const employee = state.publicEmployees.find(item => item.name.trim().toLowerCase() === employeeName);
  const start = $('leaveStart').value;
  const end = $('leaveEnd').value;
  const errorElement = $('leaveError');
  if (!employee) { errorElement.textContent = 'Please select a team member name from the list.'; errorElement.hidden = false; return; }
  if (end < start) { errorElement.textContent = 'End date must be on or after the start date.'; errorElement.hidden = false; return; }
  const { error } = await supabaseClient.from('leave_requests').insert({ employee_id: employee.id, submitted_by: null, start_date: start, end_date: end, reason: $('leaveReason').value.trim(), status: 'pending' });
  if (error) { errorElement.textContent = error.message; errorElement.hidden = false; return; }
  state.leaveOpen = false; toast('Leave request submitted for admin review.'); renderPublic();
}

async function reviewLeave(id, approve) {
  const leave = state.leaves.find(item => item.id === id);
  if (!leave) return;
  const status = approve ? 'approved' : 'disapproved';
  const { error } = await supabaseClient.from('leave_requests').update({ status, reviewed_by: state.session.user.id, reviewed_at: new Date().toISOString() }).eq('id', id);
  if (error) { toast(error.message); return; }
  leave.status = status; leave.reviewed_by = state.session.user.id; leave.reviewed_at = new Date().toISOString();
  if (approve) await clearLeaveFromCurrentRoster(leave);
  renderAdmin(); toast(approve ? 'Leave approved. The employee is blocked from those dates.' : 'Leave disapproved.');
}

async function clearLeaveFromCurrentRoster(leave) {
  const weekEnd = addDays(state.weekStart, 6);
  if (leave.end_date < state.weekStart || leave.start_date > weekEnd) return;
  Object.entries(state.assignments).forEach(([key, employeeId]) => { if (employeeId !== leave.employee_id) return; const day = Number(key.slice(key.lastIndexOf('-') + 1)); const date = addDays(state.weekStart, day); if (date >= leave.start_date && date <= leave.end_date) delete state.assignments[key]; });
  await saveRoster(false);
}

function buildPublicData() {
  const assignments = {};
  Object.keys(TEMPLATES).forEach(tab => { assignments[tab] = {}; TEMPLATES[tab].rows.forEach(row => DAYS.forEach((_, day) => { const person = employeeById(state.assignments[slotKey(row.id, day)]); assignments[tab][slotKey(row.id, day)] = person?.name || ''; })); });
  const daysOff = {};
  Object.keys(TEMPLATES).forEach(tab => { daysOff[tab] = DAYS.map((_, day) => state.employees.filter(employee => employee.department === tab && !workingDays(employee.id).has(day)).map(employee => employee.name).join(', ')); });
  return { assignments, daysOff, publishedAt: new Date().toISOString() };
}

async function saveRoster(silent) {
  if (!state.session || state.userRole !== 'admin') return;
  const { error: adminError } = await supabaseClient.from('admin_rosters').upsert({ week_start: state.weekStart, assignments: state.assignments, published: true, updated_by: state.session.user.id }, { onConflict: 'week_start' });
  if (adminError) { toast(adminError.message); return; }
  const { error: publicError } = await supabaseClient.from('published_rosters').upsert({ week_start: state.weekStart, data: buildPublicData(), published: true, updated_by: state.session.user.id }, { onConflict: 'week_start' });
  if (publicError) { toast(publicError.message); return; }
  if (!silent) toast('Roster saved and published.');
}

function mondayFromWeek(value) {
  const match = /^(\d{4})-W(\d{2})$/.exec(value || '');
  if (!match) return state.weekStart;
  const year = Number(match[1]); const week = Number(match[2]); const jan4 = new Date(Date.UTC(year, 0, 4));
  const monday = new Date(jan4); monday.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7) + (week - 1) * 7); return monday.toISOString().slice(0, 10);
}

function weekInputValue(mondayIso) {
  const date = new Date(`${mondayIso}T12:00:00Z`); const thursday = new Date(date); thursday.setUTCDate(thursday.getUTCDate() + 3); const jan4 = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4)); const week = 1 + Math.round(((thursday - jan4) / 86400000 - 3 + ((jan4.getUTCDay() + 6) % 7)) / 7); return `${thursday.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

async function render() {
  state.loading = false;
  const route = currentRoute();
  if (route === '/login') { renderAuth(); return; }
  if (route === '/admin') { if (!state.session || state.userRole !== 'admin') { setHash('/login'); return; } await loadEmployees(); await loadLeaves(); await loadAdminRoster(); renderAdmin(); return; }
  await loadPublicDirectory();
  if (state.session && state.userRole === 'team' && queryValue('leave') === '1') state.leaveOpen = true;
  await loadPublicRoster(); renderPublic();
}

window.addEventListener('hashchange', () => render());

(async function init() {
  const { data } = await supabaseClient.auth.getSession(); state.session = data.session;
  await loadIdentity();
  supabaseClient.auth.onAuthStateChange(async (_event, session) => { state.session = session; await loadIdentity(); if (!session) { state.userRole = null; } });
  await render();
})();
