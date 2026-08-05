// Rat.io - Reddit Activity Tracker (React 18 + Tailwind SPA)
// Final Persistent LocalStorage Engine: All created, edited, and deleted accounts, Q&A entries, activities, spaces, and settings are saved permanently in browser storage.
// Data will NEVER be lost or deleted on page refresh!

const { useState, useEffect, useMemo } = React;

// --- LOCALSTORAGE PERSISTENCE HELPERS ---
const STORAGE_KEYS = {
  THEME: 'ratio_v5_theme',
  ACCOUNTS: 'ratio_v5_accounts',
  ACTIVITIES: 'ratio_v5_activities',
  TRACKER: 'ratio_v5_tracker',
  COMMUNITIES: 'ratio_v5_communities',
  SPACES: 'ratio_v5_spaces',
  CURRENT_SPACE: 'ratio_v5_current_space',
  NOTIFICATIONS: 'ratio_v5_notifications'
};

function getStorageItem(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null && saved !== undefined && saved !== 'undefined') {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("LocalStorage read error for key " + key, e);
  }
  return defaultValue;
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LocalStorage write error for key " + key, e);
  }
}

// --- INITIAL SEED SPACES & ACCOUNTS ---
const INITIAL_SPACES = [
  { id: 'SPARKLE-9082', name: 'Sparkle Growth Team', spacePassword: 'pass123', creatorEmail: 'admin@sparkle.io', role: 'ADMIN' },
  { id: 'APEX-4019', name: 'Apex Growth Ops', spacePassword: 'apexpass', creatorEmail: 'ops@apex.com', role: 'MANAGER' }
];

const INITIAL_ACCOUNTS = [
  {
    id: 'acc-1',
    username: 'Nolan_098',
    redditUrl: 'https://www.reddit.com/user/Nolan_098',
    group: 'Group A',
    persona: 'Follows startup news, founders, tech',
    about: 'Interested in early stage tech, SaaS tools, and product growth.',
    country: 'France',
    city: 'Paris',
    accountAge: '3 months',
    postKarma: 1450,
    commentKarma: 3200,
    prevPostKarma: 1200,
    prevCommentKarma: 2900,
    postContribution: 14,
    commentContribution: 52,
    prevPostContribution: 10,
    prevCommentContribution: 40,
    activeIn: 'r/startups, r/technology, r/SaaS',
    activeInCount: 24,
    prevActiveInCount: 20,
    weeklyTarget: 25,
    gologinUrl: 'https://app.gologin.com/profile/ref-98471-nolan',
    proxyAddress: '192.168.1.105',
    portNumber: '8080',
    status: 'ACTIVE'
  },
  {
    id: 'acc-2',
    username: 'Andruce_23',
    redditUrl: 'https://www.reddit.com/user/Andruce_23',
    group: 'Group A',
    persona: 'Testing new software and implementing new tools',
    about: 'Focuses on webdev, developer tooling, and productivity software.',
    country: 'Italy',
    city: 'Milan',
    accountAge: '6 months',
    postKarma: 2100,
    commentKarma: 4850,
    prevPostKarma: 2100,
    prevCommentKarma: 4850,
    postContribution: 22,
    commentContribution: 88,
    prevPostContribution: 22,
    prevCommentContribution: 88,
    activeIn: 'r/webdev, r/reactjs, r/nextjs',
    activeInCount: 18,
    prevActiveInCount: 18,
    weeklyTarget: 30,
    gologinUrl: 'https://g.camp/Re%205',
    proxyAddress: '82.23.178.69',
    portNumber: '5320',
    status: 'ACTIVE'
  },
  {
    id: 'acc-3',
    username: 'Garrttt_07',
    redditUrl: 'https://www.reddit.com/user/Garrttt_07',
    group: 'Group A',
    persona: 'Interested in AI, automation, and SaaS',
    about: 'Explores AI agents, workflow automation, and open source models.',
    country: 'Germany',
    city: 'Berlin',
    accountAge: '4 months',
    postKarma: 1820,
    commentKarma: 3940,
    prevPostKarma: 1900,
    prevCommentKarma: 4000,
    postContribution: 18,
    commentContribution: 64,
    prevPostContribution: 20,
    prevCommentContribution: 70,
    activeIn: 'r/ArtificialInteligence, r/LocalLLaMA',
    activeInCount: 12,
    prevActiveInCount: 15,
    weeklyTarget: 20,
    gologinUrl: 'https://app.gologin.com/profile/ref-98473-garrett',
    proxyAddress: '192.168.1.107',
    portNumber: '8082',
    status: 'ACTIVE'
  },
  {
    id: 'acc-4',
    username: 'Interesting_Pie6489',
    redditUrl: 'https://www.reddit.com/user/Interesting_Pie6489',
    group: 'Group B',
    persona: 'I enjoy exploring SaaS products',
    about: 'Reviews marketing automation and growth hacking tools.',
    country: 'Italy',
    city: 'Rome',
    accountAge: '2 months',
    postKarma: 320,
    commentKarma: 850,
    prevPostKarma: 320,
    prevCommentKarma: 850,
    postContribution: 3,
    commentContribution: 12,
    prevPostContribution: 3,
    prevCommentContribution: 12,
    activeIn: 'r/marketing, r/SEO',
    activeInCount: 6,
    prevActiveInCount: 6,
    weeklyTarget: 15,
    gologinUrl: 'https://app.gologin.com/profile/ref-98474-pie',
    proxyAddress: '192.168.1.108',
    portNumber: '8083',
    status: 'WARMING'
  },
  {
    id: 'acc-5',
    username: 'SaaS_Vanguard',
    redditUrl: 'https://www.reddit.com/user/SaaS_Vanguard',
    group: 'Group B',
    persona: 'Old marketing profile',
    about: 'Inactive profile.',
    country: 'United States',
    city: 'New York',
    accountAge: '12 months',
    postKarma: 150,
    commentKarma: 400,
    prevPostKarma: 150,
    prevCommentKarma: 400,
    postContribution: 1,
    commentContribution: 5,
    prevPostContribution: 1,
    prevCommentContribution: 5,
    activeIn: 'r/business',
    activeInCount: 3,
    prevActiveInCount: 3,
    weeklyTarget: 10,
    gologinUrl: '',
    proxyAddress: '',
    portNumber: '',
    status: 'BANNED'
  }
];

const INITIAL_COMMUNITIES = [
  { id: 'com-1', accountId: 'acc-1', communityName: 'r/SaaS', joinedDate: '2026-01-10', rulesRead: true, promotionAllowed: true, notes: 'Sunday self-promo threads allowed.' },
  { id: 'com-2', accountId: 'acc-2', communityName: 'r/webdev', joinedDate: '2026-01-12', rulesRead: true, promotionAllowed: false, notes: 'Helpful tech discussions only.' }
];

const INITIAL_ACTIVITIES = [
  { 
    id: 'act-1', accountId: 'acc-1', date: '2026-08-04', sessionTime: 45, 
    upvotes: 18, comments: 6, posts: 1, 
    postKarma: 1450, commentKarma: 3200, totalKarma: 4650, 
    postContribution: 1, commentContribution: 4,
    notes: 'Engaged in startup funding discussion thread.' 
  },
  { 
    id: 'act-2', accountId: 'acc-2', date: '2026-08-04', sessionTime: 60, 
    upvotes: 25, comments: 10, posts: 2, 
    postKarma: 2100, commentKarma: 4850, totalKarma: 6950, 
    postContribution: 2, commentContribution: 8,
    notes: 'Answered Next.js App Router optimization questions.' 
  }
];

const INITIAL_TRACKER_ENTRIES = [
  { 
    id: 'trk-1', 
    accountId: 'acc-1', 
    date: '2026-08-04', 
    subreddit: 'r/SaaS', 
    contentType: 'General Comment', 
    postTitle: 'Best practices for Next.js 15 Server Components',
    qaContent: 'Q: How do you handle caching in Next.js 15?\nA: Use fetch cache options explicitly.', 
    brandMention: 'Sparkle Tools', 
    externalLink: 'https://sparkle.dev', 
    views: 850, upvotes: 24, comments: 7, 
    approvalStatus: 'Approved', 
    managerRemark: 'Great technical answer!',
    updatedAt: '2026-08-04 14:20'
  },
  { 
    id: 'trk-2', 
    accountId: 'acc-1', 
    date: '2026-08-04', 
    subreddit: 'r/startups', 
    contentType: 'Brand Post', 
    postTitle: 'Scaling B2B Analytics',
    qaContent: 'Case study post detailing architectural decisions.', 
    brandMention: 'Sparkle Analytics', 
    externalLink: 'https://sparkleanalytics.io', 
    views: 1420, upvotes: 45, comments: 18, 
    approvalStatus: 'Approval Needed', 
    managerRemark: 'Pending manager review.',
    updatedAt: '2026-08-04 16:45'
  },
  { 
    id: 'trk-3', 
    accountId: 'acc-2', 
    date: '2026-08-04', 
    subreddit: 'r/webdev', 
    contentType: 'General Post', 
    postTitle: 'React 19 Hooks Tutorial',
    qaContent: 'Breakdown of useActionState and useOptimistic hooks.', 
    brandMention: '', 
    externalLink: '', 
    views: 920, upvotes: 35, comments: 12, 
    approvalStatus: 'Approved', 
    managerRemark: 'Solid tutorial post.',
    updatedAt: '2026-08-04 17:10'
  },
  { 
    id: 'trk-4', 
    accountId: 'acc-3', 
    date: '2026-08-04', 
    subreddit: 'r/ArtificialInteligence', 
    contentType: 'Brand Comment', 
    postTitle: 'LLM Agents Frameworks',
    qaContent: 'Recommended Sparkle AI workflows for automated pipelines.', 
    brandMention: 'Sparkle AI', 
    externalLink: 'https://sparkle.dev/ai', 
    views: 640, upvotes: 18, comments: 4, 
    approvalStatus: 'Approved', 
    managerRemark: 'Approved',
    updatedAt: '2026-08-04 18:00'
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', title: 'Approval Needed', message: 'u/Nolan_098 submitted a Brand Post requiring manager approval.', type: 'warning', read: false, createdAt: '2026-08-04 16:45' }
];

// --- DYNAMIC HEALTH SCORE ENGINE ---
function calculateHealthScore(account, activities, trackerEntries) {
  const accountActs = activities.filter(a => a.accountId === account.id);
  const accountTrks = trackerEntries.filter(t => t.accountId === account.id);

  const totalWorkEntries = accountActs.length + accountTrks.length;
  
  if (totalWorkEntries === 0 || account.status === 'BANNED') {
    return {
      score: account.status === 'BANNED' ? 10 : 35,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    };
  }

  const sortedDates = [
    ...accountActs.map(a => a.date),
    ...accountTrks.map(t => t.date)
  ].sort((a,b) => new Date(b) - new Date(a));

  const latestDateStr = sortedDates[0] || '2026-08-04';
  const latestDate = new Date(latestDateStr);
  const now = new Date();
  const diffDays = Math.floor((now - latestDate) / (1000 * 60 * 60 * 24));

  let score = 0;
  score += Math.min(40, totalWorkEntries * 10);

  if (diffDays <= 1) score += 30;
  else if (diffDays <= 3) score += 20;
  else if (diffDays <= 7) score += 10;

  const totalKarma = (account.postKarma || 0) + (account.commentKarma || 0);
  const totalContrib = (account.postContribution || 0) + (account.commentContribution || 0);

  if (totalKarma >= 3000) score += 15;
  else if (totalKarma >= 1000) score += 10;

  if (totalContrib >= 50) score += 15;
  else if (totalContrib >= 10) score += 10;

  score = Math.min(100, Math.max(10, score));

  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  if (score < 50) badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
  else if (score < 80) badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';

  return { score, badgeColor };
}

// --- MINIMAL TREND BADGE (↑ +550 Green, ↓ -20 Red, - Blue Stable) ---
function renderTrendBadge(currentVal, prevVal) {
  const diff = currentVal - prevVal;
  
  if (diff > 0) {
    return (
      <span className="text-xs font-bold text-emerald-400 font-mono flex items-center justify-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
        <i data-lucide="arrow-up" className="w-3.5 h-3.5 text-emerald-400 inline"></i>
        <span>+{diff}</span>
      </span>
    );
  }
  
  if (diff < 0) {
    return (
      <span className="text-xs font-bold text-rose-400 font-mono flex items-center justify-center gap-0.5 bg-rose-500/10 px-1.5 py-0.5 rounded-full border border-rose-500/20 shrink-0">
        <i data-lucide="arrow-down" className="w-3.5 h-3.5 text-rose-400 inline"></i>
        <span>{diff}</span>
      </span>
    );
  }

  return (
    <span className="text-xs font-bold text-blue-400 font-mono flex items-center justify-center bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 shrink-0">
      <span>-</span>
    </span>
  );
}

// --- MAIN RAT.IO APPLICATION CONTAINER ---
function RAMSApp() {
  const [activeTab, setActiveTab] = useState('daily-activity');
  const [theme, setTheme] = useState(() => getStorageItem(STORAGE_KEYS.THEME, 'dark'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // PERSISTENT STATE LOADED FROM LOCALSTORAGE
  const [spaces, setSpacesState] = useState(() => getStorageItem(STORAGE_KEYS.SPACES, INITIAL_SPACES));
  const [currentSpace, setCurrentSpaceState] = useState(() => getStorageItem(STORAGE_KEYS.CURRENT_SPACE, INITIAL_SPACES[0]));
  const [spaceModalOpen, setSpaceModalOpen] = useState(false);
  const [spaceModalTab, setSpaceModalTab] = useState('CREATE');

  const [createSpaceForm, setCreateSpaceForm] = useState({ spaceName: '', spaceId: '', spacePassword: '', creatorEmail: '' });
  const [joinSpaceForm, setJoinSpaceForm] = useState({ userEmail: '', spaceId: '', spacePassword: '' });

  const [userRole, setUserRole] = useState('ADMIN');
  
  const [accounts, setAccountsState] = useState(() => getStorageItem(STORAGE_KEYS.ACCOUNTS, INITIAL_ACCOUNTS));
  const [communities, setCommunitiesState] = useState(() => getStorageItem(STORAGE_KEYS.COMMUNITIES, INITIAL_COMMUNITIES));
  const [activities, setActivitiesState] = useState(() => getStorageItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES));
  const [trackerEntries, setTrackerEntriesState] = useState(() => getStorageItem(STORAGE_KEYS.TRACKER, INITIAL_TRACKER_ENTRIES));
  const [notifications, setNotificationsState] = useState(() => getStorageItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS));

  // SYNCHRONOUS UPDATER HELPERS TO GUARANTEE 100% RELIABLE LOCALSTORAGE WRITES
  const updateAccounts = (newAccounts) => {
    setAccountsState(newAccounts);
    setStorageItem(STORAGE_KEYS.ACCOUNTS, newAccounts);
  };

  const updateActivities = (newActivities) => {
    setActivitiesState(newActivities);
    setStorageItem(STORAGE_KEYS.ACTIVITIES, newActivities);
  };

  const updateTrackerEntries = (newTrackerEntries) => {
    setTrackerEntriesState(newTrackerEntries);
    setStorageItem(STORAGE_KEYS.TRACKER, newTrackerEntries);
  };

  const updateCommunities = (newCommunities) => {
    setCommunitiesState(newCommunities);
    setStorageItem(STORAGE_KEYS.COMMUNITIES, newCommunities);
  };

  const updateSpaces = (newSpaces) => {
    setSpacesState(newSpaces);
    setStorageItem(STORAGE_KEYS.SPACES, newSpaces);
  };

  const updateCurrentSpace = (newSpace) => {
    setCurrentSpaceState(newSpace);
    setStorageItem(STORAGE_KEYS.CURRENT_SPACE, newSpace);
  };

  const updateNotifications = (newNotifs) => {
    setNotificationsState(newNotifs);
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, newNotifs);
  };

  useEffect(() => { 
    setStorageItem(STORAGE_KEYS.THEME, theme); 
    document.documentElement.setAttribute('data-theme', theme); 
  }, [theme]);

  useEffect(() => {
    lucide.createIcons();
  }, [activeTab, sidebarCollapsed, notifications, accounts, trackerEntries, activities, theme, spaceModalOpen]);

  const triggerNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    updateNotifications([newNotif, ...notifications]);
    setToastMessage({ title, message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data back to original demo defaults?")) {
      localStorage.clear();
      updateAccounts(INITIAL_ACCOUNTS);
      updateActivities(INITIAL_ACTIVITIES);
      updateTrackerEntries(INITIAL_TRACKER_ENTRIES);
      updateCommunities(INITIAL_COMMUNITIES);
      updateSpaces(INITIAL_SPACES);
      updateCurrentSpace(INITIAL_SPACES[0]);
      updateNotifications(INITIAL_NOTIFICATIONS);
      triggerNotification("Data Reset", "App state reset to demo defaults.", "warning");
    }
  };

  const handleCreateSpace = (e) => {
    e.preventDefault();
    if (!createSpaceForm.spaceName || !createSpaceForm.spaceId || !createSpaceForm.spacePassword) return;

    const newSpace = {
      id: createSpaceForm.spaceId.toUpperCase().trim(),
      name: createSpaceForm.spaceName.trim(),
      spacePassword: createSpaceForm.spacePassword,
      creatorEmail: createSpaceForm.creatorEmail || 'admin@rat.io',
      role: 'ADMIN'
    };

    const updated = [...spaces, newSpace];
    updateSpaces(updated);
    updateCurrentSpace(newSpace);
    setSpaceModalOpen(false);
    triggerNotification("Space Created!", `New space '${newSpace.name}' (ID: ${newSpace.id}) created and saved.`, "success");
  };

  const handleJoinSpace = (e) => {
    e.preventDefault();
    const targetSpace = spaces.find(s => s.id === joinSpaceForm.spaceId.toUpperCase().trim());

    if (!targetSpace) {
      alert("Invalid Space ID. Please check and try again.");
      return;
    }

    if (targetSpace.spacePassword !== joinSpaceForm.spacePassword) {
      alert("Incorrect Space Password!");
      return;
    }

    updateCurrentSpace(targetSpace);
    setSpaceModalOpen(false);
    triggerNotification("Space Joined!", `Successfully joined space '${targetSpace.name}' as ${joinSpaceForm.userEmail}`, "success");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 transition-colors font-sans">
      
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce bg-slate-900 border border-orange-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            toastMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
            toastMessage.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-orange-500/20 text-orange-400'
          }`}>
            <i data-lucide="bell" className="w-4 h-4"></i>
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">{toastMessage.title}</h4>
            <p className="text-[11px] text-slate-300">{toastMessage.message}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-auto">
            <i data-lucide="x" className="w-4 h-4"></i>
          </button>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col border-r border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 h-screen transition-all duration-300 z-30`}>
        
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 flex items-center justify-center font-extrabold text-white shadow-lg shadow-orange-500/30 shrink-0">
              <i data-lucide="zap" className="w-5 h-5"></i>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-black tracking-tight text-xl text-white leading-tight flex items-center gap-1">
                  Rat.io <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">PRO</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Reddit Activity Tracker</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <i data-lucide={sidebarCollapsed ? "chevron-right" : "chevron-left"} className="w-4 h-4"></i>
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="p-3 mx-3 mt-3 rounded-2xl bg-slate-950/80 border border-orange-500/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Active Space</div>
              <div className="text-xs font-bold text-white truncate max-w-[130px]">{currentSpace.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">ID: {currentSpace.id}</div>
            </div>
            <button 
              onClick={() => setSpaceModalOpen(true)}
              className="p-2 rounded-xl bg-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-white transition-all text-xs"
              title="Create or Join Space"
            >
              <i data-lucide="folder-plus" className="w-4 h-4"></i>
            </button>
          </div>
        )}

        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Executive Dashboard', icon: 'layout-dashboard' },
            { id: 'daily-activity', label: 'Daily Activity & Accounts', icon: 'activity', count: accounts.length },
            { id: 'comment-tracker', label: 'Comment & Post Tracker', icon: 'message-square-plus', count: trackerEntries.length },
            { id: 'communities', label: 'Community Tracker', icon: 'users' },
            { id: 'calendar', label: 'Google Calendar View', icon: 'calendar' },
            { id: 'reports', label: 'Reports & Export', icon: 'file-text' }
          ].map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/40 shadow-md font-bold' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <i data-lucide={item.icon} className={`w-4.5 h-4.5 ${isActive ? 'text-orange-400' : 'text-slate-400'}`}></i>
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left flex items-center justify-between">
                    {item.label}
                    {item.count !== undefined && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {item.count}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-800 bg-slate-950/60 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Role: <strong className="text-orange-400">{userRole}</strong></span>
              <button 
                onClick={() => setUserRole(userRole === 'ADMIN' ? 'MANAGER' : 'ADMIN')} 
                className="text-slate-400 hover:text-white underline text-[10px]"
              >
                Switch Role
              </button>
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'dark' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <i data-lucide="moon" className="w-3.5 h-3.5"></i> Dark
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  theme === 'light' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <i data-lucide="sun" className="w-3.5 h-3.5"></i> Light
              </button>
            </div>

            <button 
              onClick={handleResetData}
              className="w-full py-1 text-[10px] text-slate-500 hover:text-rose-400 transition-colors text-center"
            >
              Reset Data to Defaults
            </button>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER BAR */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold text-white tracking-tight">
              {activeTab === 'dashboard' && 'Executive Dashboard (KPI Metric Summary & Line Tables)'}
              {activeTab === 'daily-activity' && 'Daily Activity & Master Accounts Table'}
              {activeTab === 'comment-tracker' && 'Comment & Post Tracker (Subreddit & Content Type Dropdown)'}
              {activeTab === 'communities' && 'Community Tracker'}
              {activeTab === 'calendar' && 'Google Calendar Style Schedule & Reminders'}
              {activeTab === 'reports' && 'Filtered Reports & Data Export'}
            </h2>

            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-Save Active
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setNotifDrawerOpen(!notifDrawerOpen)}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors relative"
              >
                <i data-lucide="bell" className="w-4 h-4"></i>
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {notifDrawerOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-xs text-white">Notifications</h3>
                    <button 
                      onClick={() => updateNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-[10px] text-orange-400 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 py-4 text-center">No notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`p-2.5 rounded-xl border text-xs ${n.read ? 'bg-slate-950/50 border-slate-800/60 text-slate-400' : 'bg-slate-800/60 border-orange-500/30 text-white font-medium'}`}>
                          <div className="font-bold text-slate-200">{n.title}</div>
                          <div className="text-[11px] mt-0.5">{n.message}</div>
                          <div className="text-[9px] text-slate-500 mt-1">{n.createdAt}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={() => setSpaceModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-lg shadow-orange-500/20 transition-all"
            >
              <i data-lucide="layers" className="w-3.5 h-3.5"></i>
              <span>{currentSpace.name}</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <FullDashboardOverview 
              accounts={accounts} 
              activities={activities} 
              trackerEntries={trackerEntries}
            />
          )}

          {activeTab === 'daily-activity' && (
            <MasterDailyActivityAndAccountView 
              accounts={accounts}
              updateAccounts={updateAccounts}
              activities={activities}
              updateActivities={updateActivities}
              trackerEntries={trackerEntries}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'comment-tracker' && (
            <CommentAndPostTrackerView 
              accounts={accounts}
              trackerEntries={trackerEntries}
              updateTrackerEntries={updateTrackerEntries}
              userRole={userRole}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'communities' && (
            <CommunityTrackerView 
              accounts={accounts}
              communities={communities}
              updateCommunities={updateCommunities}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'calendar' && (
            <GoogleCalendarStyleView 
              accounts={accounts}
              activities={activities}
              trackerEntries={trackerEntries}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsAndExportView 
              accounts={accounts}
              activities={activities}
              trackerEntries={trackerEntries}
            />
          )}
        </main>
      </div>

      {spaceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <i data-lucide="layers" className="w-5 h-5 text-orange-400"></i> Rat.io Space Access
              </h3>
              <button onClick={() => setSpaceModalOpen(false)} className="text-slate-400 hover:text-white">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              <button 
                onClick={() => setSpaceModalTab('CREATE')}
                className={`flex-1 py-2 font-bold rounded-xl transition-all ${
                  spaceModalTab === 'CREATE' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Create New Space
              </button>
              <button 
                onClick={() => setSpaceModalTab('JOIN')}
                className={`flex-1 py-2 font-bold rounded-xl transition-all ${
                  spaceModalTab === 'JOIN' ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Join Existing Space
              </button>
            </div>

            {spaceModalTab === 'CREATE' ? (
              <form onSubmit={handleCreateSpace} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Space Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={createSpaceForm.spaceName} 
                    onChange={(e) => setCreateSpaceForm({ ...createSpaceForm, spaceName: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white" 
                    placeholder="e.g. Apex Marketing Team"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Set Space ID *</label>
                  <input 
                    type="text" 
                    required 
                    value={createSpaceForm.spaceId} 
                    onChange={(e) => setCreateSpaceForm({ ...createSpaceForm, spaceId: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono font-bold" 
                    placeholder="e.g. APEX-2026"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Set Space Password *</label>
                  <input 
                    type="password" 
                    required 
                    value={createSpaceForm.spacePassword} 
                    onChange={(e) => setCreateSpaceForm({ ...createSpaceForm, spacePassword: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono" 
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Creator Email</label>
                  <input 
                    type="email" 
                    value={createSpaceForm.creatorEmail} 
                    onChange={(e) => setCreateSpaceForm({ ...createSpaceForm, creatorEmail: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white" 
                    placeholder="admin@company.com"
                  />
                </div>

                <button type="submit" className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold rounded-xl shadow-lg">
                  Create Space & Launch
                </button>
              </form>
            ) : (
              <form onSubmit={handleJoinSpace} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Your Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={joinSpaceForm.userEmail} 
                    onChange={(e) => setJoinSpaceForm({ ...joinSpaceForm, userEmail: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white" 
                    placeholder="team.member@company.com"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Space ID *</label>
                  <input 
                    type="text" 
                    required 
                    value={joinSpaceForm.spaceId} 
                    onChange={(e) => setJoinSpaceForm({ ...joinSpaceForm, spaceId: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono font-bold" 
                    placeholder="e.g. SPARKLE-9082"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Space Password *</label>
                  <input 
                    type="password" 
                    required 
                    value={joinSpaceForm.spacePassword} 
                    onChange={(e) => setJoinSpaceForm({ ...joinSpaceForm, spacePassword: e.target.value })} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono" 
                    placeholder="••••••••"
                  />
                </div>

                <button type="submit" className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold rounded-xl shadow-lg">
                  Join Team Space
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 1. FULL DASHBOARD OVERVIEW (KPI BOXES TOP + GROUP A/B LINE TABLES BELOW)
// ==========================================
function FullDashboardOverview({ accounts, activities, trackerEntries }) {
  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(a => a.status === 'ACTIVE').length;
  const bannedAccounts = accounts.filter(a => a.status === 'BANNED').length;

  const pendingApprovals = trackerEntries.filter(t => t.approvalStatus === 'Approval Needed').length;
  
  const brandPosts = trackerEntries.filter(t => t.contentType === 'Brand Post').length;
  const brandComments = trackerEntries.filter(t => t.contentType === 'Brand Comment').length;

  const generalPosts = trackerEntries.filter(t => t.contentType === 'General Post').length;
  const generalComments = trackerEntries.filter(t => t.contentType === 'General Comment').length;

  const groupA = useMemo(() => accounts.filter(a => a.group === 'Group A'), [accounts]);
  const groupB = useMemo(() => accounts.filter(a => a.group === 'Group B'), [accounts]);

  const renderTableRows = (accList) => {
    return accList.map(acc => {
      const health = calculateHealthScore(acc, activities, trackerEntries);
      const userTrk = trackerEntries.filter(t => t.accountId === acc.id);
      const postCount = userTrk.filter(t => t.contentType.includes('Post')).length;
      const commentCount = userTrk.filter(t => t.contentType.includes('Comment')).length;

      const currTotalKarma = (acc.postKarma || 0) + (acc.commentKarma || 0);
      const prevTotalKarma = (acc.prevPostKarma || 0) + (acc.prevCommentKarma || 0);

      const currTotalContrib = (acc.postContribution || 0) + (acc.commentContribution || 0);
      const prevTotalContrib = (acc.prevPostContribution || 0) + (acc.prevCommentContribution || 0);

      return (
        <tr key={acc.id} className="hover:bg-slate-800/60 transition-colors">
          <td className="py-3 px-3 border-r border-slate-800">
            <a 
              href={acc.redditUrl || `https://www.reddit.com/user/${acc.username}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-orange-400 hover:underline font-mono text-xs flex items-center gap-1"
            >
              u/{acc.username}
              <i data-lucide="external-link" className="w-3 h-3 inline"></i>
            </a>
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center font-mono">
            <div className="text-slate-200">{acc.postKarma || 0} / {acc.commentKarma || 0}</div>
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center">
            {renderTrendBadge(currTotalKarma, prevTotalKarma)}
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center font-mono">
            <span className="text-cyan-400 font-bold">{acc.postContribution || 0}</span> / <span className="text-emerald-400 font-bold">{acc.commentContribution || 0}</span>
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center">
            {renderTrendBadge(currTotalContrib, prevTotalContrib)}
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center font-mono text-[10px]">
            <span className="text-cyan-300 font-bold">{postCount} post</span>, <span className="text-emerald-300 font-bold">{commentCount} comment</span>
          </td>
          <td className="py-3 px-2 border-r border-slate-800 text-center">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border inline-block ${health.badgeColor}`}>
              {health.score}/100
            </span>
          </td>
          <td className="py-3 px-2 text-center">
            {acc.status === 'BANNED' ? (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                BANNED
              </span>
            ) : acc.status === 'WARMING' ? (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                WARMING
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ACTIVE
              </span>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Dashboard Overview</h2>
          <p className="text-xs text-slate-400">KPI Summary boxes top | Line-by-line Group A (Left) & Group B (Right) account status tables below.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Overall Accounts</p>
            <h3 className="text-2xl font-extrabold text-white mt-1 font-mono">{totalAccounts}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <i data-lucide="users" className="w-5 h-5"></i>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Active vs Banned</p>
            <div className="flex items-center gap-2 mt-1 font-mono font-extrabold text-lg">
              <span className="text-emerald-400">{activeAccounts} Active</span>
              <span className="text-slate-600">/</span>
              <span className="text-rose-400">{bannedAccounts} Banned</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <i data-lucide="shield-check" className="w-5 h-5"></i>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-amber-400">Approval Needed</p>
            <h3 className="text-2xl font-extrabold text-amber-300 mt-1 font-mono">{pendingApprovals}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <i data-lucide="clock" className="w-5 h-5"></i>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-cyan-400">Brand Mentions</p>
            <div className="text-xs font-mono font-bold mt-1 text-slate-200">
              <span className="text-cyan-300">{brandPosts} Posts</span>, <span className="text-emerald-300">{brandComments} Comments</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <i data-lucide="target" className="w-5 h-5"></i>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">General Engagement</p>
            <div className="text-xs font-mono font-bold mt-1 text-slate-200">
              <span className="text-white">{generalPosts} Posts</span>, <span className="text-slate-300">{generalComments} Comments</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <i data-lucide="message-square" className="w-5 h-5"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-purple-500 shadow-md shadow-purple-500/50"></div>
              <h3 className="font-extrabold text-base text-white">Group A Accounts (Left Side)</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
              {groupA.length} Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-800">Username</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Karma (Post/Com)</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Karma Trend</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Contrib (P/C)</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Contrib Trend</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Auto Q/A</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Health</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {renderTableRows(groupA)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-md shadow-amber-500/50"></div>
              <h3 className="font-extrabold text-base text-white">Group B Accounts (Right Side)</h3>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {groupB.length} Accounts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 border-b border-slate-800 text-[10px] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-800">Username</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Karma (Post/Com)</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Karma Trend</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Contrib (P/C)</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Contrib Trend</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Auto Q/A</th>
                  <th className="py-2.5 px-2 border-r border-slate-800 text-center">Health</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {renderTableRows(groupB)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. MASTER DAILY ACTIVITY & ACCOUNTS TABLE
// ==========================================
function MasterDailyActivityAndAccountView({ accounts, updateAccounts, activities, updateActivities, trackerEntries, triggerNotification }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState('ALL');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    redditUrl: '',
    group: 'Group A',
    persona: '',
    country: '',
    city: '',
    accountAge: '3 months',
    postKarma: 0,
    commentKarma: 0,
    prevPostKarma: 0,
    prevCommentKarma: 0,
    postContribution: 0,
    commentContribution: 0,
    prevPostContribution: 0,
    prevCommentContribution: 0,
    activeIn: '',
    activeInCount: 10,
    prevActiveInCount: 10,
    weeklyTarget: 25,
    status: 'ACTIVE'
  });

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc => {
      const matchSearch = acc.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (acc.persona && acc.persona.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (acc.country && acc.country.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchGroup = groupFilter === 'ALL' || acc.group === groupFilter;
      return matchSearch && matchGroup;
    });
  }, [accounts, searchTerm, groupFilter]);

  const openAddModal = () => {
    setEditingAccount(null);
    setFormData({
      username: '',
      redditUrl: 'https://www.reddit.com/user/',
      group: 'Group A',
      persona: '',
      country: 'France',
      city: 'Paris',
      accountAge: '3 months',
      postKarma: 0,
      commentKarma: 0,
      prevPostKarma: 0,
      prevCommentKarma: 0,
      postContribution: 0,
      commentContribution: 0,
      prevPostContribution: 0,
      prevCommentContribution: 0,
      activeIn: '',
      activeInCount: 10,
      prevActiveInCount: 10,
      weeklyTarget: 25,
      status: 'ACTIVE'
    });
    setModalOpen(true);
  };

  const openEditModal = (acc) => {
    setEditingAccount(acc);
    setFormData({
      username: acc.username,
      redditUrl: acc.redditUrl || `https://www.reddit.com/user/${acc.username}`,
      group: acc.group || 'Group A',
      persona: acc.persona || '',
      country: acc.country || '',
      city: acc.city || '',
      accountAge: acc.accountAge || '3 months',
      postKarma: acc.postKarma || 0,
      commentKarma: acc.commentKarma || 0,
      prevPostKarma: acc.prevPostKarma || 0,
      prevCommentKarma: acc.prevCommentKarma || 0,
      postContribution: acc.postContribution || 0,
      commentContribution: acc.commentContribution || 0,
      prevPostContribution: acc.prevPostContribution || 0,
      prevCommentContribution: acc.prevCommentContribution || 0,
      activeIn: acc.activeIn || '',
      activeInCount: acc.activeInCount || 10,
      prevActiveInCount: acc.prevActiveInCount || 10,
      weeklyTarget: acc.weeklyTarget || 25,
      status: acc.status || 'ACTIVE'
    });
    setModalOpen(true);
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!formData.username) return;

    const cleanRedditUrl = formData.redditUrl.trim() || `https://www.reddit.com/user/${formData.username.trim()}`;

    if (editingAccount) {
      const updated = accounts.map(a => a.id === editingAccount.id ? {
        ...a,
        ...formData,
        redditUrl: cleanRedditUrl,
        postKarma: Number(formData.postKarma),
        commentKarma: Number(formData.commentKarma),
        prevPostKarma: Number(formData.prevPostKarma),
        prevCommentKarma: Number(formData.prevCommentKarma),
        postContribution: Number(formData.postContribution),
        commentContribution: Number(formData.commentContribution),
        prevPostContribution: Number(formData.prevPostContribution),
        prevCommentContribution: Number(formData.prevCommentContribution),
        activeInCount: Number(formData.activeInCount),
        prevActiveInCount: Number(formData.prevActiveInCount),
        weeklyTarget: Number(formData.weeklyTarget)
      } : a);
      updateAccounts(updated);
      triggerNotification("Account Updated", `Successfully updated u/${formData.username}`, "success");
    } else {
      const newAcc = {
        id: 'acc-' + Date.now(),
        ...formData,
        redditUrl: cleanRedditUrl,
        postKarma: Number(formData.postKarma),
        commentKarma: Number(formData.commentKarma),
        prevPostKarma: Number(formData.prevPostKarma),
        prevCommentKarma: Number(formData.prevCommentKarma),
        postContribution: Number(formData.postContribution),
        commentContribution: Number(formData.commentContribution),
        prevPostContribution: Number(formData.prevPostContribution),
        prevCommentContribution: Number(formData.prevCommentContribution),
        activeInCount: Number(formData.activeInCount),
        prevActiveInCount: Number(formData.prevActiveInCount),
        weeklyTarget: Number(formData.weeklyTarget)
      };
      updateAccounts([...accounts, newAcc]);
      triggerNotification("Account Created", `Successfully created u/${formData.username}`, "success");
    }
    setModalOpen(false);
  };

  const handleDeleteAccount = (accId) => {
    const acc = accounts.find(a => a.id === accId);
    if (window.confirm(`Are you sure you want to delete account u/${acc ? acc.username : ''}?`)) {
      updateAccounts(accounts.filter(a => a.id !== accId));
      triggerNotification("Account Removed", "Account removed successfully.", "warning");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Daily Activity & Master Accounts Table</h2>
          <p className="text-xs text-slate-400">Full detailed master spreadsheet table with minimal trend badges and working Edit | Delete actions.</p>
        </div>

        <button 
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all"
        >
          <i data-lucide="user-plus" className="w-4 h-4"></i> Add New Account
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
        <div className="relative flex-1 w-full">
          <i data-lucide="search" className="w-4 h-4 absolute left-3.5 top-3 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search username, persona, country..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        <select 
          value={groupFilter} 
          onChange={(e) => setGroupFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-orange-500"
        >
          <option value="ALL">All Groups</option>
          <option value="Group A">Group A</option>
          <option value="Group B">Group B</option>
        </select>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
          <table className="w-full text-left text-xs border-collapse min-w-[1300px]">
            <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-bold text-slate-300 uppercase">
              <tr className="bg-amber-500/10 text-amber-300 border-b border-amber-500/30">
                <th className="py-3 px-4 border-r border-slate-800 min-w-[200px]">Username & Persona</th>
                <th className="py-3 px-3 border-r border-slate-800 min-w-[100px]">Group</th>
                <th className="py-3 px-3 border-r border-slate-800 min-w-[140px]">Country & City</th>
                <th className="py-3 px-3 border-r border-slate-800 min-w-[120px]">Reddit URL</th>
                <th className="py-3 px-3 border-r border-slate-800 min-w-[100px]">Account Age</th>
                
                <th colSpan="3" className="py-3 px-3 border-r border-slate-800 bg-amber-500/20 text-amber-200 text-center font-extrabold">Karma Overall</th>
                <th colSpan="3" className="py-3 px-3 border-r border-slate-800 bg-cyan-500/20 text-cyan-200 text-center font-extrabold">Contribution Overall</th>
                <th colSpan="2" className="py-3 px-3 border-r border-slate-800 bg-purple-500/20 text-purple-200 text-center font-extrabold">Active In</th>
                
                <th className="py-3 px-3 border-r border-slate-800 min-w-[110px]">Health Score</th>
                <th className="py-3 px-3 border-r border-slate-800 text-center bg-emerald-500/20 text-emerald-300 font-extrabold min-w-[130px]">Tracker Q/A</th>
                <th className="py-3 px-4 text-center min-w-[130px]">Actions</th>
              </tr>

              <tr className="bg-slate-950 text-[10px] text-slate-400 border-b border-slate-800">
                <th className="py-2.5 px-4 border-r border-slate-800">User Title</th>
                <th className="py-2.5 px-3 border-r border-slate-800">Group A/B</th>
                <th className="py-2.5 px-3 border-r border-slate-800">Location</th>
                <th className="py-2.5 px-3 border-r border-slate-800">Link</th>
                <th className="py-2.5 px-3 border-r border-slate-800">Age</th>

                <th className="py-2.5 px-2 border-r border-slate-800 text-center bg-slate-900 text-slate-200">Post</th>
                <th className="py-2.5 px-2 border-r border-slate-800 text-center bg-slate-900 text-slate-200">Comment</th>
                <th className="py-2.5 px-3 border-r border-slate-800 text-center bg-amber-500/10 text-amber-300">Status</th>

                <th className="py-2.5 px-2 border-r border-slate-800 text-center bg-slate-900 text-cyan-300">Post</th>
                <th className="py-2.5 px-2 border-r border-slate-800 text-center bg-slate-900 text-emerald-300">Comment</th>
                <th className="py-2.5 px-3 border-r border-slate-800 text-center bg-cyan-500/10 text-cyan-300">Status</th>

                <th className="py-2.5 px-2 border-r border-slate-800 text-center bg-slate-900 text-slate-200">Count</th>
                <th className="py-2.5 px-3 border-r border-slate-800 text-center bg-purple-500/10 text-purple-300">Status</th>

                <th className="py-2.5 px-3 border-r border-slate-800">Calculated</th>
                <th className="py-2.5 px-3 border-r border-slate-800 text-center">Auto-Fetched</th>
                <th className="py-2.5 px-4 text-center">Edit / Delete</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {filteredAccounts.map(acc => {
                const health = calculateHealthScore(acc, activities, trackerEntries);

                const userTrk = trackerEntries.filter(t => t.accountId === acc.id);
                const postCount = userTrk.filter(t => t.contentType.includes('Post')).length;
                const commentCount = userTrk.filter(t => t.contentType.includes('Comment')).length;

                const currTotalKarma = (acc.postKarma || 0) + (acc.commentKarma || 0);
                const prevTotalKarma = (acc.prevPostKarma || 0) + (acc.prevCommentKarma || 0);

                const currTotalContrib = (acc.postContribution || 0) + (acc.commentContribution || 0);
                const prevTotalContrib = (acc.prevPostContribution || 0) + (acc.prevCommentContribution || 0);

                return (
                  <tr key={acc.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 border-r border-slate-800">
                      <div className="flex items-center gap-2">
                        <a 
                          href={acc.redditUrl || `https://www.reddit.com/user/${acc.username}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-orange-400 hover:underline font-mono text-xs flex items-center gap-1"
                        >
                          u/{acc.username}
                          <i data-lucide="external-link" className="w-3 h-3 inline"></i>
                        </a>

                        {acc.status === 'BANNED' ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            BANNED
                          </span>
                        ) : acc.status === 'WARMING' ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            WARMING
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{acc.persona}</div>
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800 font-semibold">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] border ${
                        acc.group === 'Group A' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {acc.group}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800 text-[11px]">
                      <div className="font-semibold text-slate-200">Country: {acc.country || 'N/A'}</div>
                      <div className="text-[10px] text-slate-400">City: {acc.city || 'N/A'}</div>
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800">
                      <a href={acc.redditUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-mono text-[11px] truncate block max-w-[110px]">
                        Profile Link
                      </a>
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800 font-mono text-slate-300">
                      {acc.accountAge}
                    </td>

                    <td className="py-3.5 px-2 border-r border-slate-800 text-center font-mono font-bold text-slate-200">
                      {acc.postKarma || 0}
                    </td>
                    <td className="py-3.5 px-2 border-r border-slate-800 text-center font-mono font-bold text-slate-300">
                      {acc.commentKarma || 0}
                    </td>
                    <td className="py-3.5 px-3 border-r border-slate-800 text-center">
                      {renderTrendBadge(currTotalKarma, prevTotalKarma)}
                    </td>

                    <td className="py-3.5 px-2 border-r border-slate-800 text-center font-mono font-bold text-cyan-400">
                      {acc.postContribution || 0}
                    </td>
                    <td className="py-3.5 px-2 border-r border-slate-800 text-center font-mono font-bold text-emerald-400">
                      {acc.commentContribution || 0}
                    </td>
                    <td className="py-3.5 px-3 border-r border-slate-800 text-center">
                      {renderTrendBadge(currTotalContrib, prevTotalContrib)}
                    </td>

                    <td className="py-3.5 px-2 border-r border-slate-800 text-center font-mono font-bold text-purple-400">
                      {acc.activeInCount || 10}
                    </td>
                    <td className="py-3.5 px-3 border-r border-slate-800 text-center">
                      {renderTrendBadge(acc.activeInCount || 10, acc.prevActiveInCount || 10)}
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold border block text-center ${health.badgeColor}`}>
                        {health.score}/100
                      </span>
                    </td>

                    <td className="py-3.5 px-3 border-r border-slate-800 text-center font-mono text-[11px]">
                      <div className="text-cyan-300 font-bold">{postCount} post</div>
                      <div className="text-emerald-300 font-bold">{commentCount} comment</div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => openEditModal(acc)} 
                          className="text-blue-400 hover:text-blue-300 hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <span className="text-slate-700">|</span>
                        <button 
                          onClick={() => handleDeleteAccount(acc.id)} 
                          className="text-rose-400 hover:text-rose-300 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingAccount ? `Edit Account u/${formData.username}` : 'Add New Account'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <form onSubmit={handleSaveAccount} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Reddit Username *</label>
                  <input type="text" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold" placeholder="Username" />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Reddit Profile URL</label>
                  <input type="text" value={formData.redditUrl} onChange={(e) => setFormData({ ...formData, redditUrl: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono" placeholder="https://www.reddit.com/user/..." />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="WARMING">WARMING</option>
                    <option value="BANNED">BANNED</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Group</label>
                  <select value={formData.group} onChange={(e) => setFormData({ ...formData, group: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold">
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Account Age</label>
                  <input type="text" value={formData.accountAge} onChange={(e) => setFormData({ ...formData, accountAge: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono" placeholder="3 months" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Country</label>
                  <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" placeholder="France" />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">City</label>
                  <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" placeholder="Paris" />
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-2xl space-y-2">
                <div className="font-bold text-amber-400 uppercase text-[10px] tracking-wider">Karma Overall (Current & Previous)</div>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Post Karma</label>
                    <input type="number" value={formData.postKarma} onChange={(e) => setFormData({ ...formData, postKarma: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Comment Karma</label>
                    <input type="number" value={formData.commentKarma} onChange={(e) => setFormData({ ...formData, commentKarma: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Prev Post Karma</label>
                    <input type="number" value={formData.prevPostKarma} onChange={(e) => setFormData({ ...formData, prevPostKarma: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Prev Com Karma</label>
                    <input type="number" value={formData.prevCommentKarma} onChange={(e) => setFormData({ ...formData, prevCommentKarma: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-2xl space-y-2">
                <div className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider">Contribution Overall (Current & Previous)</div>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Post Contrib</label>
                    <input type="number" value={formData.postContribution} onChange={(e) => setFormData({ ...formData, postContribution: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-cyan-300 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Comment Contrib</label>
                    <input type="number" value={formData.commentContribution} onChange={(e) => setFormData({ ...formData, commentContribution: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-emerald-300 font-bold" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Prev Post Contrib</label>
                    <input type="number" value={formData.prevPostContribution} onChange={(e) => setFormData({ ...formData, prevPostContribution: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400" />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-0.5 text-[10px]">Prev Com Contrib</label>
                    <input type="number" value={formData.prevCommentContribution} onChange={(e) => setFormData({ ...formData, prevCommentContribution: e.target.value })} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Persona Details</label>
                <textarea rows="2" value={formData.persona} onChange={(e) => setFormData({ ...formData, persona: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" placeholder="Persona description..."></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-orange-500 text-white font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. COMMENT & POST TRACKER VIEW
// ==========================================
function CommentAndPostTrackerView({ accounts, trackerEntries, updateTrackerEntries, userRole, triggerNotification }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [form, setForm] = useState({
    accountId: accounts[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    subreddit: 'r/SaaS',
    contentType: 'Brand Post',
    postTitle: '',
    qaContent: '',
    brandMention: '',
    externalLink: '',
    approvalStatus: 'Approval Needed',
    managerRemark: ''
  });

  const openAddModal = () => {
    setEditingEntry(null);
    setForm({
      accountId: accounts[0]?.id || '',
      date: new Date().toISOString().split('T')[0],
      subreddit: 'r/SaaS',
      contentType: 'Brand Post',
      postTitle: '',
      qaContent: '',
      brandMention: '',
      externalLink: '',
      approvalStatus: 'Approval Needed',
      managerRemark: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingEntry(entry);
    setForm({
      accountId: entry.accountId,
      date: entry.date,
      subreddit: entry.subreddit || 'r/SaaS',
      contentType: entry.contentType || 'Brand Post',
      postTitle: entry.postTitle || '',
      qaContent: entry.qaContent || '',
      brandMention: entry.brandMention || '',
      externalLink: entry.externalLink || '',
      approvalStatus: entry.approvalStatus || 'Approval Needed',
      managerRemark: entry.managerRemark || ''
    });
    setModalOpen(true);
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    const selectedAcc = accounts.find(a => a.id === form.accountId) || { username: 'Unknown' };

    if (editingEntry) {
      const prevStatus = editingEntry.approvalStatus;
      const updated = trackerEntries.map(t => t.id === editingEntry.id ? {
        ...t,
        ...form,
        updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      } : t);
      updateTrackerEntries(updated);

      if (prevStatus !== form.approvalStatus) {
        triggerNotification(`Status Changed to ${form.approvalStatus}`, `Task for u/${selectedAcc.username} status was updated.`, "success");
      }
    } else {
      const newEntry = {
        id: 'trk-' + Date.now(),
        ...form,
        views: 0,
        upvotes: 1,
        comments: 0,
        updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
      };
      updateTrackerEntries([newEntry, ...trackerEntries]);
      triggerNotification("Approval Needed Notification", `u/${selectedAcc.username} submitted new ${form.contentType}.`, "warning");
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Comment & Post Tracker</h2>
          <p className="text-xs text-slate-400">Separated Subreddit and Content Type dropdowns (Brand Post, Brand Comment, General Post, General Comment).</p>
        </div>

        <button onClick={openAddModal} className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center gap-2">
          <i data-lucide="plus-circle" className="w-4 h-4"></i> Submit Comment / Post Task
        </button>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
            <tr>
              <th className="py-3.5 px-4">Account & Date</th>
              <th className="py-3.5 px-3">Subreddit</th>
              <th className="py-3.5 px-3">Content Type</th>
              <th className="py-3.5 px-4">Post Title / Q&A Content</th>
              <th className="py-3.5 px-3">Brand & Link</th>
              <th className="py-3.5 px-3">Approval Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {trackerEntries.map(entry => {
              const acc = accounts.find(a => a.id === entry.accountId) || { username: 'Unknown' };
              return (
                <tr key={entry.id} className="hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-orange-400">u/{acc.username} ({entry.date})</td>
                  <td className="py-4 px-3 font-bold text-white">{entry.subreddit}</td>
                  <td className="py-4 px-3">
                    <span className="text-[10px] px-2 py-1 rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                      {entry.contentType}
                    </span>
                  </td>
                  <td className="py-4 px-4 max-w-xs line-clamp-2">{entry.qaContent}</td>
                  <td className="py-4 px-3 text-cyan-400 font-semibold">{entry.brandMention || '-'}</td>
                  <td className="py-4 px-3 font-bold text-emerald-400">{entry.approvalStatus}</td>
                  <td className="py-4 px-4 text-right">
                    <button onClick={() => openEditModal(entry)} className="text-blue-400 font-semibold hover:underline">Review / Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Review / Submit Q&A Entry</h3>
            <form onSubmit={handleSaveEntry} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Account</label>
                  <select value={form.accountId} onChange={(e) => setForm({ ...form, accountId: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold">
                    {accounts.map(a => <option key={a.id} value={a.id}>u/{a.username}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Content Type (Dropdown) *</label>
                  <select value={form.contentType} onChange={(e) => setForm({ ...form, contentType: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-300 font-bold">
                    <option value="Brand Post">Brand Post</option>
                    <option value="Brand Comment">Brand Comment</option>
                    <option value="General Post">General Post</option>
                    <option value="General Comment">General Comment</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Subreddit *</label>
                  <input type="text" required value={form.subreddit} onChange={(e) => setForm({ ...form, subreddit: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" placeholder="r/SaaS" />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Q&A / Comment Text *</label>
                <textarea rows="3" required value={form.qaContent} onChange={(e) => setForm({ ...form, qaContent: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Approval Status</label>
                  <select value={form.approvalStatus} onChange={(e) => setForm({ ...form, approvalStatus: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold">
                    <option value="Approval Needed">Approval Needed</option>
                    <option value="Approved">Approved</option>
                    <option value="Changes Needed">Changes Needed</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Manager Remark</label>
                  <input type="text" value={form.managerRemark} onChange={(e) => setForm({ ...form, managerRemark: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-3 py-2 bg-slate-800 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-bold rounded-xl">Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. COMMUNITY TRACKER VIEW
// ==========================================
function CommunityTrackerView({ accounts, communities, updateCommunities, triggerNotification }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white">Community Tracker</h2>
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden p-4">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
            <tr>
              <th className="py-3 px-4">Account</th>
              <th className="py-3 px-4">Subreddit</th>
              <th className="py-3 px-3">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {communities.map(c => {
              const acc = accounts.find(a => a.id === c.accountId) || { username: 'Unknown' };
              return (
                <tr key={c.id}>
                  <td className="py-3.5 px-4 font-bold text-white">u/{acc.username}</td>
                  <td className="py-3.5 px-4 font-bold text-orange-400">{c.communityName}</td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">{c.joinedDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 5. GOOGLE CALENDAR STYLE VIEW & REMINDERS
// ==========================================
function GoogleCalendarStyleView({ accounts, activities, trackerEntries }) {
  const [selectedDate, setSelectedDate] = useState('2026-08-04');

  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, '0');
    return `2026-08-${day}`;
  });

  const dailyTasks = useMemo(() => {
    return trackerEntries.filter(t => t.date === selectedDate);
  }, [trackerEntries, selectedDate]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Google Calendar Style View & Reminders</h2>
          <p className="text-xs text-slate-400">Interactive calendar view for scheduled daily tasks, post/comment entries, and day-before reminders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <i data-lucide="calendar-days" className="w-5 h-5 text-orange-400"></i>
              August 2026 Schedule
            </h3>
            <span className="text-xs text-slate-400">Click any date to inspect scheduled daily activities</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="font-bold text-slate-500 py-1 uppercase text-[10px]">{d}</div>
            ))}
            {calendarDays.map(dateStr => {
              const dayTasks = trackerEntries.filter(t => t.date === dateStr);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`p-2 rounded-2xl border text-left flex flex-col justify-between h-20 transition-all ${
                    isSelected ? 'bg-orange-500/20 border-orange-500 text-white font-bold shadow-lg' : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xs font-mono">{dateStr.split('-')[2]}</span>
                  <div className="space-y-0.5">
                    {dayTasks.map((t, idx) => (
                      <span key={idx} className="block text-[8px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold truncate">
                        {t.contentType}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white">Daily Action Set for {selectedDate}</h3>
            <p className="text-xs text-slate-400">Scheduled activities & reminder notifications</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <i data-lucide="bell-ring" className="w-4 h-4 text-amber-400 shrink-0"></i>
              <span>Reminder: Submit day-before brand posts for manager approval.</span>
            </div>

            {dailyTasks.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No tasks scheduled for this date.</p>
            ) : (
              dailyTasks.map(t => {
                const acc = accounts.find(a => a.id === t.accountId) || { username: 'Unknown' };
                return (
                  <div key={t.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>u/{acc.username}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {t.contentType}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300">Subreddit: <strong>{t.subreddit}</strong></div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 italic">{t.qaContent}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. REPORTS & DATA EXPORT VIEW
// ==========================================
function ReportsAndExportView({ accounts, activities, trackerEntries }) {
  const exportCSV = () => {
    const csvStr = Papa.unparse(accounts);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rat.io_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Reports & Export Center</h2>
        <button onClick={exportCSV} className="px-4 py-2 bg-orange-500 text-white font-bold text-xs rounded-xl">Export CSV</button>
      </div>
    </div>
  );
}

// RENDER APP
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RAMSApp />);
