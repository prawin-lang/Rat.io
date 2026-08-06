// RAMS - Reddit Activity Management System (Full Multi-Module SPA)

const { useState, useEffect, useMemo } = React;

// --- INITIAL SEED DATA ---
const INITIAL_WORKSPACES = [
  { id: 'ws-1', name: 'Sparkle Team', slug: 'sparkle-team', role: 'ADMIN' },
  { id: 'ws-2', name: 'Apex Growth Ops', slug: 'apex-growth', role: 'MANAGER' },
  { id: 'ws-3', name: 'Alpha Brand Squad', slug: 'alpha-brand', role: 'MEMBER' }
];

const INITIAL_ACCOUNTS = [
  {
    id: 'acc-1',
    username: 'TechCurious_Alex',
    group: 'GROUP_A',
    persona: 'SaaS Founder & Tech Enthusiast',
    about: 'Loves discussing cloud infrastructure, AI tools, and developer productivity.',
    mainFocus: 'r/SaaS, r/webdev',
    secondaryFocus: 'r/technology, r/startups',
    email: 'alex.t@sparkleteam.internal',
    accountAge: 420,
    country: 'United States',
    city: 'Austin, TX',
    browserProfile: 'Profile-01 (Chrome)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98471-alex',
    proxyAddress: '192.168.1.105',
    portNumber: '8080',
    notes: 'Primary account for high-authority discussions in B2B SaaS communities.',
    status: 'ACTIVE',
    healthScore: 95,
    riskLevel: 'LOW'
  },
  {
    id: 'acc-2',
    username: 'DevPulse_Elena',
    group: 'GROUP_A',
    persona: 'Senior Full Stack Developer',
    about: 'Focuses on React, Next.js, TypeScript, and open-source tooling.',
    mainFocus: 'r/reactjs, r/nextjs',
    secondaryFocus: 'r/programming, r/node',
    email: 'elena.d@sparkleteam.internal',
    accountAge: 310,
    country: 'Canada',
    city: 'Toronto',
    browserProfile: 'Profile-02 (Firefox)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98472-elena',
    proxyAddress: '192.168.1.106',
    portNumber: '8081',
    notes: 'Consistent contributor in developer communities. High comment karma.',
    status: 'ACTIVE',
    healthScore: 92,
    riskLevel: 'LOW'
  },
  {
    id: 'acc-3',
    username: 'GrowthMinded_Marcus',
    group: 'GROUP_A',
    persona: 'Growth Marketer & SEO Specialist',
    about: 'Shares authentic insights on organic search, content strategies, and email marketing.',
    mainFocus: 'r/marketing, r/SEO',
    secondaryFocus: 'r/digitalmarketing',
    email: 'marcus.g@sparkleteam.internal',
    accountAge: 180,
    country: 'United Kingdom',
    city: 'London',
    browserProfile: 'Profile-03 (Brave)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98473-marcus',
    proxyAddress: '192.168.1.107',
    portNumber: '8082',
    notes: 'Warming up for B2B marketing product mentions.',
    status: 'WARMING',
    healthScore: 84,
    riskLevel: 'LOW'
  },
  {
    id: 'acc-4',
    username: 'StartupJourney_Sam',
    group: 'GROUP_A',
    persona: 'Indie Hacker & Solopreneur',
    about: 'Documents the journey of building bootstrapped software applications.',
    mainFocus: 'r/Entrepreneur, r/smallbusiness',
    secondaryFocus: 'r/sideproject',
    email: 'sam.s@sparkleteam.internal',
    accountAge: 510,
    country: 'United States',
    city: 'Seattle, WA',
    browserProfile: 'Profile-04 (Chrome)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98474-sam',
    proxyAddress: '192.168.1.108',
    portNumber: '8083',
    notes: 'High overall trust score. Frequent AMA participations.',
    status: 'ACTIVE',
    healthScore: 88,
    riskLevel: 'LOW'
  },
  {
    id: 'acc-5',
    username: 'CloudArchitect_Nadia',
    group: 'GROUP_B',
    persona: 'DevOps & Cloud Engineer',
    about: 'Shares tutorials on AWS, Kubernetes, Terraform, and CI/CD pipelines.',
    mainFocus: 'r/devops, r/aws',
    secondaryFocus: 'r/sysadmin',
    email: 'nadia.c@sparkleteam.internal',
    accountAge: 240,
    country: 'Germany',
    city: 'Berlin',
    browserProfile: 'Profile-05 (Chrome)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98475-nadia',
    proxyAddress: '192.168.1.109',
    portNumber: '8084',
    notes: 'Technical niche discussions only. Zero direct sales pitch.',
    status: 'ACTIVE',
    healthScore: 78,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'acc-6',
    username: 'ProductVista_Jordan',
    group: 'GROUP_B',
    persona: 'Product Manager & UX Consultant',
    about: 'Discusses user research, roadmap prioritization, and SaaS UX patterns.',
    mainFocus: 'r/ProductManagement, r/uxdesign',
    secondaryFocus: 'r/design',
    email: 'jordan.p@sparkleteam.internal',
    accountAge: 150,
    country: 'Australia',
    city: 'Sydney',
    browserProfile: 'Profile-06 (Firefox)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98476-jordan',
    proxyAddress: '192.168.1.110',
    portNumber: '8085',
    notes: 'Recently paused for 3 days due to low activity frequency.',
    status: 'PAUSED',
    healthScore: 62,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'acc-7',
    username: 'DataDriven_Ravi',
    group: 'GROUP_B',
    persona: 'Data Scientist & Analytics Engineer',
    about: 'Posts insights on Python, SQL, machine learning, and data visualization.',
    mainFocus: 'r/datascience, r/Python',
    secondaryFocus: 'r/machinelearning',
    email: 'ravi.d@sparkleteam.internal',
    accountAge: 90,
    country: 'India',
    city: 'Bengaluru',
    browserProfile: 'Profile-07 (Chrome)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98477-ravi',
    proxyAddress: '192.168.1.111',
    portNumber: '8086',
    notes: 'New account in warming phase.',
    status: 'WARMING',
    healthScore: 70,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'acc-8',
    username: 'CyberSec_Vanguard',
    group: 'GROUP_B',
    persona: 'Cybersecurity Analyst',
    about: 'Discusses network security, ethical hacking, and compliance standards.',
    mainFocus: 'r/netsec, r/cybersecurity',
    secondaryFocus: 'r/privacy',
    email: 'vanguard.c@sparkleteam.internal',
    accountAge: 65,
    country: 'Netherlands',
    city: 'Amsterdam',
    browserProfile: 'Profile-08 (Brave)',
    gologinUrl: 'https://app.gologin.com/profile/ref-98478-vanguard',
    proxyAddress: '192.168.1.112',
    portNumber: '8087',
    notes: 'Flagged for aggressive posting frequency last week.',
    status: 'BANNED',
    healthScore: 35,
    riskLevel: 'CRITICAL'
  }
];

const INITIAL_COMMUNITIES = [
  { id: 'com-1', accountId: 'acc-1', communityName: 'r/SaaS', commentCount: 24, postCount: 5, joinedDate: '2026-01-10', rulesRead: true, promotionAllowed: true, notes: 'Self-promotion allowed on Sunday feedback threads.' },
  { id: 'com-2', accountId: 'acc-1', communityName: 'r/webdev', commentCount: 18, postCount: 2, joinedDate: '2026-01-12', rulesRead: true, promotionAllowed: false, notes: 'Strict no self-promo. Help posts only.' },
  { id: 'com-3', accountId: 'acc-2', communityName: 'r/reactjs', commentCount: 42, postCount: 8, joinedDate: '2026-02-01', rulesRead: true, promotionAllowed: true, notes: 'Showcase Saturday threads allowed.' },
  { id: 'com-4', accountId: 'acc-3', communityName: 'r/marketing', commentCount: 15, postCount: 3, joinedDate: '2026-02-15', rulesRead: true, promotionAllowed: false, notes: 'Case studies welcome if non-salesy.' },
  { id: 'com-5', accountId: 'acc-4', communityName: 'r/Entrepreneur', commentCount: 31, postCount: 6, joinedDate: '2026-01-05', rulesRead: true, promotionAllowed: true, notes: 'Weekly milestone threads permitted.' },
  { id: 'com-6', accountId: 'acc-5', communityName: 'r/devops', commentCount: 11, postCount: 1, joinedDate: '2026-03-01', rulesRead: true, promotionAllowed: false, notes: 'Pure technical discussion.' }
];

const INITIAL_ACTIVITIES = [
  { id: 'act-1', accountId: 'acc-1', date: '2026-08-04', loginCompleted: true, sessionTime: 45, upvotes: 18, downvotes: 1, savedPosts: 3, comments: 6, replies: 4, posts: 1, pollVotes: 2, notificationsChecked: true, postKarma: 1250, commentKarma: 3840, totalKarma: 5090, karmaDiff: 45, contribPostCount: 2, contribCommentCount: 5, notes: 'Shared opinion on Next.js 15 App Router caching.' },
  { id: 'act-2', accountId: 'acc-2', date: '2026-08-04', loginCompleted: true, sessionTime: 30, upvotes: 12, downvotes: 0, savedPosts: 2, comments: 8, replies: 5, posts: 0, pollVotes: 1, notificationsChecked: true, postKarma: 920, commentKarma: 4120, totalKarma: 5040, karmaDiff: 32, contribPostCount: 1, contribCommentCount: 7, notes: 'Answered React server actions state question.' },
  { id: 'act-3', accountId: 'acc-3', date: '2026-08-04', loginCompleted: true, sessionTime: 25, upvotes: 10, downvotes: 2, savedPosts: 1, comments: 4, replies: 3, posts: 1, pollVotes: 0, notificationsChecked: true, postKarma: 640, commentKarma: 1820, totalKarma: 2460, karmaDiff: 18, contribPostCount: 3, contribCommentCount: 4, notes: 'Posted SEO audit checklist breakdown.' },
  { id: 'act-4', accountId: 'acc-4', date: '2026-08-03', loginCompleted: true, sessionTime: 50, upvotes: 22, downvotes: 0, savedPosts: 4, comments: 10, replies: 6, posts: 2, pollVotes: 3, notificationsChecked: true, postKarma: 3400, commentKarma: 6200, totalKarma: 9600, karmaDiff: 85, contribPostCount: 2, contribCommentCount: 8, notes: 'Engaged in solopreneur revenue milestone discussion.' }
];

const INITIAL_GOALS = [
  { id: 'goal-1', title: 'Group A Weekly Karma Increase', goalType: 'KARMA', target: 500, achieved: 420, remaining: 80, completionPct: 84, status: 'GREEN', startDate: '2026-08-01', endDate: '2026-08-07' },
  { id: 'goal-2', title: 'Target Comment Output across SaaS Subs', goalType: 'COMMENT', target: 100, achieved: 95, remaining: 5, completionPct: 95, status: 'BLUE', startDate: '2026-08-01', endDate: '2026-08-07' },
  { id: 'goal-3', title: 'Group B Post Contributions', goalType: 'POST', target: 15, achieved: 6, remaining: 9, completionPct: 40, status: 'RED', startDate: '2026-08-01', endDate: '2026-08-07' },
  { id: 'goal-4', title: 'New Tech Community Registrations', goalType: 'COMMUNITY', target: 10, achieved: 7, remaining: 3, completionPct: 70, status: 'GREEN', startDate: '2026-08-01', endDate: '2026-08-07' }
];

const INITIAL_PROMOTIONS = [
  { id: 'promo-1', accountId: 'acc-1', date: '2026-08-04', community: 'r/SaaS', brandMention: 'Sparkle Analytics', externalLink: 'https://sparkleanalytics.io/demo', views: 1420, upvotes: 42, comments: 14, replies: 8, shares: 5, notes: 'Shared in tool recommendation thread.' },
  { id: 'promo-2', accountId: 'acc-3', date: '2026-08-04', community: 'r/marketing', brandMention: 'Sparkle Analytics', externalLink: 'https://sparkleanalytics.io/blog/seo', views: 890, upvotes: 28, comments: 9, replies: 4, shares: 2, notes: 'Referenced case study in response.' },
  { id: 'promo-3', accountId: 'acc-4', date: '2026-08-03', community: 'r/Entrepreneur', brandMention: 'Sparkle Analytics', externalLink: 'https://sparkleanalytics.io', views: 2300, upvotes: 94, comments: 26, replies: 15, shares: 12, notes: 'Top comment in weekly growth showcase.' }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', title: 'Weekly Goal Pending', message: 'Group B Post Contributions goal is currently 60% behind schedule.', type: 'warning', read: false, createdAt: '2026-08-04 09:30' },
  { id: 'notif-2', title: 'Low Health Score Alert', message: 'Account CyberSec_Vanguard health dropped to 35 (CRITICAL).', type: 'error', read: false, createdAt: '2026-08-04 11:15' },
  { id: 'notif-3', title: 'Activity Logged Today', message: '4 out of 8 Active accounts logged activity today.', type: 'info', read: true, createdAt: '2026-08-04 14:00' }
];

// --- MAIN APPLICATION COMPONENT ---
function RAMSApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  
  const [workspaces, setWorkspaces] = useState(INITIAL_WORKSPACES);
  const [activeWorkspace, setActiveWorkspace] = useState(INITIAL_WORKSPACES[0]);
  const [userRole, setUserRole] = useState('ADMIN');
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [promotions, setPromotions] = useState(INITIAL_PROMOTIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const groupAAccounts = useMemo(() => accounts.filter(a => a.group === 'GROUP_A'), [accounts]);
  const groupBAccounts = useMemo(() => accounts.filter(a => a.group === 'GROUP_B'), [accounts]);

  const groupASummary = useMemo(() => {
    const groupAIds = new Set(groupAAccounts.map(a => a.id));
    const groupAct = activities.filter(act => groupAIds.has(act.accountId));
    const totalPosts = groupAct.reduce((sum, a) => sum + (a.posts || 0) + (a.contribPostCount || 0), 0);
    const totalComments = groupAct.reduce((sum, a) => sum + (a.comments || 0) + (a.contribCommentCount || 0), 0);

    return {
      totalPosts,
      totalComments,
      count: groupAAccounts.length
    };
  }, [groupAAccounts, activities]);

  const groupBSummary = useMemo(() => {
    const groupBIds = new Set(groupBAccounts.map(a => a.id));
    const groupAct = activities.filter(act => groupBIds.has(act.accountId));
    const totalPosts = groupAct.reduce((sum, a) => sum + (a.posts || 0) + (a.contribPostCount || 0), 0);
    const totalComments = groupAct.reduce((sum, a) => sum + (a.comments || 0) + (a.contribCommentCount || 0), 0);

    return {
      totalPosts,
      totalComments,
      count: groupBAccounts.length
    };
  }, [groupBAccounts, activities]);

  const kpiData = useMemo(() => {
    const activeAccs = accounts.filter(a => a.status === 'ACTIVE').length;
    const totalPosts = activities.reduce((sum, a) => sum + (a.posts || 0), 0) + 320;
    const totalComments = activities.reduce((sum, a) => sum + (a.comments || 0), 0) + 1240;
    const contribPosts = activities.reduce((sum, a) => sum + (a.contribPostCount || 0), 0);
    const contribComments = activities.reduce((sum, a) => sum + (a.contribCommentCount || 0), 0);
    const totalKarmaGrowth = activities.reduce((sum, a) => sum + (a.karmaDiff || 0), 0);
    const pendingGoals = goals.filter(g => g.completionPct < 100).length;

    return {
      totalAccounts: accounts.length,
      activeAccounts: activeAccs,
      groupACount: groupAAccounts.length,
      groupBCount: groupBAccounts.length,
      communitiesJoined: communities.length,
      totalPosts,
      totalComments,
      contribPosts,
      contribComments,
      totalKarmaGrowth,
      pendingGoals
    };
  }, [accounts, activities, communities, goals, groupAAccounts, groupBAccounts]);

  const triggerNotification = (title, message, type = 'info') => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 data-[theme=light]:bg-slate-50 data-[theme=light]:text-slate-900 transition-colors">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col border-r border-slate-800 bg-slate-900/60 sticky top-0 h-screen transition-all duration-300 z-30`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
              <i data-lucide="shield" className="w-5 h-5"></i>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-extrabold tracking-tight text-lg text-white leading-tight">
                  RAMS <span className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 font-semibold border border-orange-500/30">v1.6</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Activity Management System</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Sidebar"
          >
            <i data-lucide={sidebarCollapsed ? "chevron-right" : "chevron-left"} className="w-4 h-4"></i>
          </button>
        </div>

        <div className="p-3 border-b border-slate-800">
          {!sidebarCollapsed ? (
            <div className="relative">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Active Workspace</label>
              <select 
                value={activeWorkspace.id}
                onChange={(e) => setActiveWorkspace(workspaces.find(w => w.id === e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-200 focus:outline-none focus:border-orange-500"
              >
                {workspaces.map(w => (
                  <option key={w.id} value={w.id}>{w.name} ({w.role})</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex justify-center" title={`Workspace: ${activeWorkspace.name}`}>
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-orange-400 flex items-center justify-center font-bold text-xs">
                {activeWorkspace.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* FULL 10 NAVIGATION MODULES */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Reddit Marketing KPI Dashboard', icon: 'layout-dashboard' },
            { id: 'accounts', label: 'Accounts Management', icon: 'users', count: accounts.length },
            { id: 'communities', label: 'Community Tracker', icon: 'message-square' },
            { id: 'activity', label: 'Daily Activity Tracker', icon: 'activity' },
            { id: 'goals', label: 'Weekly Goals', icon: 'target', badge: kpiData.pendingGoals },
            { id: 'calendar', label: 'Calendar View', icon: 'calendar' },
            { id: 'health', label: 'Account Health', icon: 'heart-pulse' },
            { id: 'promotions', label: 'Promotion Tracker', icon: 'trending-up' },
            { id: 'reports', label: 'Reports & Export', icon: 'file-text' },
            { id: 'import', label: 'CSV Import Wizard', icon: 'upload-cloud' }
          ].map(item => {
            const isActive = activeTab === item.id || (activeTab === 'kpi-dashboard' && item.id === 'dashboard');
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-sm font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <i data-lucide={item.icon} className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`}></i>
                {!sidebarCollapsed && <span className="flex-1 text-left">{item.label}</span>}
                {!sidebarCollapsed && item.badge !== undefined && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                    {item.badge}
                  </span>
                )}
                {!sidebarCollapsed && item.count !== undefined && (
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded-full font-mono">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs"
              title="Toggle Theme"
            >
              <i data-lucide={theme === 'dark' ? 'sun' : 'moon'} className="w-4 h-4 text-amber-400"></i>
              {!sidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>
            
            {!sidebarCollapsed && (
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Workspace Settings"
              >
                <i data-lucide="settings" className="w-4 h-4"></i>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP HEADER */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button 
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full flex items-center gap-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-400 transition-all text-left shadow-inner"
            >
              <i data-lucide="search" className="w-4 h-4 text-slate-500"></i>
              <span className="flex-1">Search accounts, activities, promotions...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">Ctrl+K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Role:</span>
              <select 
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-transparent font-bold text-orange-400 focus:outline-none cursor-pointer"
              >
                <option value="ADMIN" className="bg-slate-900 text-white">Admin</option>
                <option value="MANAGER" className="bg-slate-900 text-white">Manager</option>
                <option value="MEMBER" className="bg-slate-900 text-white">Member</option>
              </select>
            </div>

            <button 
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Notification Center"
            >
              <i data-lucide="bell" className="w-5 h-5"></i>
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                P
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">Prawin Lead</p>
                <p className="text-[10px] text-slate-400">{userRole}</p>
              </div>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-6 overflow-y-auto">
          {(activeTab === 'dashboard' || activeTab === 'kpi-dashboard') && (
            <DashboardView 
              kpi={kpiData}
              groupA={groupASummary}
              groupB={groupBSummary}
              accounts={accounts}
              activities={activities}
              goals={goals}
              communities={communities}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'accounts' && (
            <AccountManagementView 
              accounts={accounts}
              setAccounts={setAccounts}
              userRole={userRole}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'communities' && (
            <CommunityTrackerView 
              communities={communities}
              setCommunities={setCommunities}
              accounts={accounts}
              activities={activities}
              promotions={promotions}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'activity' && (
            <DailyActivityTrackerView 
              activities={activities}
              setActivities={setActivities}
              accounts={accounts}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'goals' && (
            <WeeklyGoalTrackerView 
              goals={goals}
              setGoals={setGoals}
              userRole={userRole}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView 
              activities={activities}
              setActivities={setActivities}
              communities={communities}
              setCommunities={setCommunities}
              goals={goals}
              accounts={accounts}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'health' && (
            <AccountHealthView 
              accounts={accounts}
              activities={activities}
              setAccounts={setAccounts}
            />
          )}

          {activeTab === 'promotions' && (
            <PromotionTrackerView 
              promotions={promotions}
              setPromotions={setPromotions}
              accounts={accounts}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsExportView 
              accounts={accounts}
              activities={activities}
              communities={communities}
              promotions={promotions}
              goals={goals}
              activeWorkspace={activeWorkspace}
            />
          )}

          {activeTab === 'import' && (
            <CSVImportWizardView 
              accounts={accounts}
              setAccounts={setAccounts}
              triggerNotification={triggerNotification}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsWorkspaceView 
              activeWorkspace={activeWorkspace}
              workspaces={workspaces}
              userRole={userRole}
            />
          )}

          {activeTab === 'profile' && (
            <UserProfileView 
              userRole={userRole}
              setUserRole={setUserRole}
            />
          )}
        </main>
      </div>

      {commandPaletteOpen && (
        <CommandPaletteModal 
          isOpen={commandPaletteOpen} 
          onClose={() => setCommandPaletteOpen(false)}
          accounts={accounts}
          onNavigate={(tab) => { setActiveTab(tab); setCommandPaletteOpen(false); }}
        />
      )}

      {notifDrawerOpen && (
        <NotificationDrawer 
          notifications={notifications}
          setNotifications={setNotifications}
          onClose={() => setNotifDrawerOpen(false)}
        />
      )}
    </div>
  );
}

// --- HEALTH SCORE CALCULATION (Karma Growth + Activity Volume ONLY) ---
function calculateAccountHealthScore(account, activities = []) {
  const accActivities = activities
    .filter(a => a.accountId === account.id)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (accActivities.length === 0) return 50;

  // 1. Karma Growth component (max 50 pts)
  let totalKarmaGain = 0;
  accActivities.forEach(act => {
    if (act.karmaDiff && act.karmaDiff > 0) {
      totalKarmaGain += act.karmaDiff;
    }
  });

  let karmaGrowthPts = 10;
  if (totalKarmaGain >= 100) karmaGrowthPts = 50;
  else if (totalKarmaGain >= 50) karmaGrowthPts = 40;
  else if (totalKarmaGain >= 20) karmaGrowthPts = 30;
  else if (totalKarmaGain > 0) karmaGrowthPts = 20;

  // 2. Activity Completed component (max 50 pts)
  const totalPosts = accActivities.reduce((sum, a) => sum + (a.posts || 0) + (a.contribPostCount || 0), 0);
  const totalComments = accActivities.reduce((sum, a) => sum + (a.comments || 0) + (a.contribCommentCount || 0), 0);
  const totalActs = totalPosts + totalComments;

  let activityPts = 10;
  if (totalActs >= 20) activityPts = 50;
  else if (totalActs >= 10) activityPts = 40;
  else if (totalActs >= 5) activityPts = 30;
  else if (totalActs >= 1) activityPts = 20;

  return Math.min(100, Math.max(0, karmaGrowthPts + activityPts));
}

// --- MODULE 1: REDDIT MARKETING KPI DASHBOARD VIEW ---
function DashboardView({ kpi, groupA, groupB, accounts, activities, goals, communities = [], onNavigate }) {
  useEffect(() => { lucide.createIcons(); }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">Team Dashboard</span>
            <span className="text-slate-400 text-xs font-medium">Sparkle Team Workspace</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Reddit Marketing KPI Dashboard</h2>
          <p className="text-xs text-slate-400 max-w-xl">
            Real-time overview of team accounts, daily karma growth, community memberships, and weekly goal progress.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
          <button 
            onClick={() => onNavigate('activity')}
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2"
          >
            <i data-lucide="plus-circle" className="w-4 h-4"></i>
            Log Daily Activity
          </button>
          <button 
            onClick={() => onNavigate('reports')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
          >
            <i data-lucide="file-text" className="w-4 h-4"></i>
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI METRICS GRID - (Contribution Comment removed as requested) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Accounts', value: kpi.totalAccounts, icon: 'users', color: 'text-blue-400', sub: `${kpi.activeAccounts} Active` },
          { label: 'Communities Joined', value: kpi.communitiesJoined, icon: 'message-square', color: 'text-cyan-400', sub: 'Subreddits' },
          { label: 'Daily Karma Growth', value: `+${kpi.totalKarmaGrowth || 0}`, icon: 'trending-up', color: 'text-amber-400', sub: 'Net diff' },
          { label: 'Contrib Posts', value: kpi.contribPosts || 0, icon: 'file-text', color: 'text-orange-400', sub: 'Count' },
          { label: 'Group A / B Split', value: `${kpi.groupACount} / ${kpi.groupBCount}`, icon: 'folder-git-2', color: 'text-purple-400', sub: 'Accounts' },
          { label: 'Total Output', value: `${kpi.totalPosts}P / ${kpi.totalComments}C`, icon: 'activity', color: 'text-indigo-400', sub: 'Posts & Comments' },
          { label: 'Pending Goals', value: kpi.pendingGoals, icon: 'target', color: 'text-rose-400', sub: 'Active' }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">{item.label}</span>
              <i data-lucide={item.icon} className={`w-4 h-4 ${item.color}`}></i>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white tracking-tight font-mono">{item.value}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* GROUP A & GROUP B SUMMARY CARDS (Shows ONLY Total Posts and Total Comments) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-lg">A</div>
              <div>
                <h3 className="font-bold text-base text-white">Group A Summary</h3>
                <p className="text-xs text-slate-400">{groupA.count} Registered Accounts</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Posts Done</span>
              <p className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{(groupA.totalPosts || 0).toLocaleString()}</p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Comments Done</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{(groupA.totalComments || 0).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-lg">B</div>
              <div>
                <h3 className="font-bold text-base text-white">Group B Summary</h3>
                <p className="text-xs text-slate-400">{groupB.count} Registered Accounts</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Posts Done</span>
              <p className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{(groupB.totalPosts || 0).toLocaleString()}</p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Comments Done</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{(groupB.totalComments || 0).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ACCOUNT PERFORMANCE TABLE (Google Sheets Style - Health score & Weekly goal completion) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-base">Account Performance & Weekly Goal Tracking</h3>
            <p className="text-xs text-slate-400">Health scores calculated strictly from daily karma growth & completed posts/comments activity.</p>
          </div>
          <button onClick={() => onNavigate('accounts')} className="text-xs text-orange-400 hover:underline font-semibold">Manage Accounts</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4 border-r border-slate-800/80">Account Username</th>
                <th className="py-3 px-4 border-r border-slate-800/80">Group</th>
                <th className="py-3 px-4 border-r border-slate-800/80 text-center">Health Score</th>
                <th className="py-3 px-4 border-r border-slate-800/80 text-center">Weekly Performance Status</th>
                <th className="py-3 px-4 text-center">Weekly Goal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {accounts.map(acc => {
                const healthScore = calculateAccountHealthScore(acc, activities);
                const isPerformingWell = healthScore >= 60;

                // Find goal status for account
                const accGoal = goals.find(g => g.title.toLowerCase().includes(acc.username.toLowerCase()) || (g.status === 'GREEN' && isPerformingWell));
                const goalCompleted = accGoal ? accGoal.completionPct >= 80 : isPerformingWell;

                return (
                  <tr key={acc.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white border-r border-slate-800/60 font-mono">
                      u/{acc.username}
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-800/60 font-medium">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${acc.group === 'GROUP_A' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
                        {acc.group}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-800/60 font-mono font-extrabold text-center text-sm">
                      <span className={healthScore >= 70 ? 'text-emerald-400' : healthScore >= 50 ? 'text-amber-400' : 'text-rose-400'}>
                        {healthScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-4 border-r border-slate-800/60 text-center">
                      {isPerformingWell ? (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          🟢 Performing Well
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          🔴 Underperforming
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {goalCompleted ? (
                        <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          ✓ Goal Completed
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          ✗ Goal Incomplete
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* WEEKLY GOALS, JOINED SUBREDDITS & ACCOUNT DIRECTORY SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Weekly Goal Status</h3>
            <button onClick={() => onNavigate('goals')} className="text-xs text-orange-400 hover:underline">View All</button>
          </div>
          <div className="space-y-3 text-xs">
            {goals.map(g => (
              <div key={g.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate">{g.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${g.status === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : g.status === 'BLUE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
                    {g.status}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className={`h-full ${g.status === 'GREEN' ? 'bg-emerald-500' : g.status === 'BLUE' ? 'bg-blue-500' : 'bg-rose-500'}`} style={{ width: `${g.completionPct}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Progress: {g.completionPct}%</span>
                  <span>{g.achieved}/{g.target}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-400">Joined Subreddits by User</h4>
              <button onClick={() => onNavigate('communities')} className="text-[11px] text-cyan-400 hover:underline font-semibold">Total: {communities.length}</button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {accounts.map(acc => {
                const joinedCount = communities.filter(c => c.accountId === acc.id).length;
                return (
                  <div key={acc.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="font-bold text-white text-xs">u/{acc.username}</span>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-mono font-bold border border-cyan-500/20 text-[10px]">
                      {joinedCount} Subreddits
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">Active Accounts Directory</h3>
            <button onClick={() => onNavigate('accounts')} className="text-xs text-orange-400 hover:underline">Manage Directory</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-3">Username</th>
                  <th className="py-3 px-3">Group</th>
                  <th className="py-3 px-3">Country</th>
                  <th className="py-3 px-3">Health Score</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {accounts.slice(0, 5).map(a => (
                  <tr key={a.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-slate-100">u/{a.username}</td>
                    <td className="py-3 px-3">{a.group}</td>
                    <td className="py-3 px-3">{a.country}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">{a.healthScore}/100</td>
                    <td className="py-3 px-3">{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 2: ACCOUNTS MANAGEMENT WITH FULL CRUD ---
function AccountManagementView({ accounts, setAccounts, userRole, triggerNotification }) {
  const [search, setSearch] = useState('');
  const [groupFilter, setGroupFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAcc, setEditingAcc] = useState(null);

  const [formAcc, setFormAcc] = useState({
    username: '', group: 'GROUP_A', persona: '', about: '', mainFocus: '', secondaryFocus: '',
    email: '', accountAge: 180, country: 'United States', city: '', browserProfile: 'Profile-09',
    gologinUrl: '', proxyAddress: '', portNumber: '', notes: '', status: 'ACTIVE'
  });

  useEffect(() => { lucide.createIcons(); }, [accounts, editingAcc, isAddModalOpen]);

  const filteredAccounts = accounts.filter(acc => {
    const matchesSearch = acc.username.toLowerCase().includes(search.toLowerCase()) || acc.persona.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = groupFilter === 'ALL' || acc.group === groupFilter;
    const matchesStatus = statusFilter === 'ALL' || acc.status === statusFilter;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!formAcc.username.trim()) return;

    if (editingAcc) {
      setAccounts(accounts.map(a => a.id === editingAcc.id ? { ...a, ...formAcc } : a));
      triggerNotification('Account Updated', `Account u/${formAcc.username} profile updated.`, 'success');
      setEditingAcc(null);
    } else {
      const created = { ...formAcc, id: 'acc-' + Date.now(), healthScore: 88, riskLevel: 'LOW' };
      setAccounts([created, ...accounts]);
      triggerNotification('Account Added', `Account u/${created.username} added.`, 'success');
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteAccount = (accId, username) => {
    if (window.confirm(`Delete account u/${username}?`)) {
      setAccounts(accounts.filter(a => a.id !== accId));
      triggerNotification('Account Deleted', `Account u/${username} removed.`, 'warning');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Account Management Directory</h2>
          <p className="text-xs text-slate-400">Full CRUD: Add, Edit, Update, and Delete Reddit account profiles.</p>
        </div>
        {userRole !== 'MEMBER' && (
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs shadow-lg flex items-center gap-2">
            <i data-lucide="user-plus" className="w-4 h-4"></i> Add New Account
          </button>
        )}
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
            <tr>
              <th className="py-3.5 px-4">Username & Persona</th>
              <th className="py-3.5 px-4">Group</th>
              <th className="py-3.5 px-4">Country</th>
              <th className="py-3.5 px-4">GoLogin Ref</th>
              <th className="py-3.5 px-4">Health Score</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredAccounts.map(acc => (
              <tr key={acc.id} className="hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-bold text-slate-100">u/{acc.username}</td>
                <td className="py-3.5 px-4">{acc.group}</td>
                <td className="py-3.5 px-4">{acc.country}</td>
                <td className="py-3.5 px-4 text-orange-400">
                  {acc.gologinUrl ? <a href={acc.gologinUrl} target="_blank" className="underline">Link</a> : '-'}
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{acc.healthScore}/100</td>
                <td className="py-3.5 px-4">{acc.status}</td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button onClick={() => { setEditingAcc(acc); setFormAcc({...acc}); }} className="text-blue-400 font-semibold hover:underline">Edit</button>
                  {userRole !== 'MEMBER' && <button onClick={() => handleDeleteAccount(acc.id, acc.username)} className="text-rose-400 font-semibold hover:underline">Delete</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAddModalOpen || editingAcc) && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <form onSubmit={handleSaveAccount} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white">{editingAcc ? "Edit Account" : "Create Account"}</h3>
              <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingAcc(null); }} className="text-slate-400 hover:text-white"><i data-lucide="x" className="w-5 h-5"></i></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Username</label>
                <input type="text" required value={formAcc.username} onChange={(e) => setFormAcc({...formAcc, username: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Group</label>
                <select value={formAcc.group} onChange={(e) => setFormAcc({...formAcc, group: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white">
                  <option value="GROUP_A">Group A</option>
                  <option value="GROUP_B">Group B</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button type="button" onClick={() => { setIsAddModalOpen(false); setEditingAcc(null); }} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold">Save Account</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// --- MODULE 3: COMMUNITY TRACKER WITH DUPLICATE VALIDATION & AUTOMATED STATUS ---
function CommunityTrackerView({ communities, setCommunities, accounts, activities = [], promotions = [], triggerNotification }) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');
  const [communityName, setCommunityName] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [joinedDate, setJoinedDate] = useState(new Date().toISOString().split('T')[0]);
  const [duplicateError, setDuplicateError] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => { lucide.createIcons(); }, [communities, isAddModalOpen, duplicateError, filterDate, searchTerm]);

  const handleAddCommunity = (e) => {
    e.preventDefault();
    setDuplicateError('');
    if (!communityName.trim()) return;

    let cleanName = communityName.trim();
    const formatted = cleanName.startsWith('r/') ? cleanName : `r/${cleanName}`;
    const selectedAcc = accounts.find(a => a.id === selectedAccountId);
    const username = selectedAcc ? selectedAcc.username : 'Unknown';

    // Duplicate check for SAME user + SAME subreddit
    const existingSameUser = communities.find(
      c => c.accountId === selectedAccountId && c.communityName.toLowerCase() === formatted.toLowerCase()
    );

    if (existingSameUser) {
      const errMsg = `Already joined: u/${username} is already registered in ${formatted}. Duplicate entry prevented.`;
      setDuplicateError(errMsg);
      triggerNotification("Already Joined", errMsg, "warning");
      return;
    }

    // Add new community record
    const created = {
      id: 'com-' + Date.now(),
      accountId: selectedAccountId,
      communityName: formatted,
      commentCount: Number(commentCount) || 0,
      postCount: Number(postCount) || 0,
      joinedDate: joinedDate || new Date().toISOString().split('T')[0],
      rulesRead: true,
      promotionAllowed: true
    };

    setCommunities([created, ...communities]);
    setCommunityName('');
    setCommentCount(0);
    setPostCount(0);
    setDuplicateError('');
    setIsAddModalOpen(false);
    triggerNotification("Community Joined", `u/${username} successfully registered in ${formatted}.`, "success");
  };

  // Helper function to calculate automated status (shows "Already joined by u/user1" if shared)
  const getAutomatedStatus = (communityRecord) => {
    const matchingCommunities = communities.filter(
      c => c.communityName.toLowerCase() === communityRecord.communityName.toLowerCase()
    );
    
    if (matchingCommunities.length > 1) {
      const otherAccounts = matchingCommunities
        .filter(c => c.accountId !== communityRecord.accountId)
        .map(c => {
          const acc = accounts.find(a => a.id === c.accountId);
          return acc ? `u/${acc.username}` : 'Another User';
        });
      
      return {
        label: `Already joined by ${otherAccounts.join(', ')}`,
        type: 'shared'
      };
    }
    
    return {
      label: 'Joined',
      type: 'single'
    };
  };

  const filteredCommunities = communities.filter(c => {
    const acc = accounts.find(a => a.id === c.accountId) || { username: '' };
    const matchesSearch = c.communityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          acc.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || c.joinedDate === filterDate;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Community Membership Tracker</h2>
          <p className="text-xs text-slate-400">Track joined subreddits, automated shared status, comment/post activity counts, and join dates.</p>
        </div>

        {/* ADD SYMBOL / BUTTON */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
        >
          <i data-lucide="plus-circle" className="w-4 h-4"></i>
          + Add Community
        </button>
      </div>

      {duplicateError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <i data-lucide="alert-triangle" className="w-4 h-4 text-rose-400"></i>
            <span>{duplicateError}</span>
          </div>
          <button onClick={() => setDuplicateError('')} className="text-slate-400 hover:text-white">
            <i data-lucide="x" className="w-4 h-4"></i>
          </button>
        </div>
      )}

      {/* FULL-WIDTH COMMUNITY DIRECTORY TABLE */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-white text-base">Joined Subreddits Directory</h3>
            <p className="text-xs text-slate-400">Showing {filteredCommunities.length} of {communities.length} registered subreddits</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* DATE FILTER */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-semibold">Filter Date:</label>
              <input 
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-orange-500"
              />
              {filterDate && (
                <button 
                  onClick={() => setFilterDate('')}
                  className="text-xs text-orange-400 hover:underline font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <input 
              type="text" 
              placeholder="Search subreddit or username..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-orange-500 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Username</th>
                <th className="py-3.5 px-4">Subreddit Joined</th>
                <th className="py-3.5 px-4">Status (Automated)</th>
                <th className="py-3.5 px-4 text-center">Comment Count</th>
                <th className="py-3.5 px-4 text-center">Post Count</th>
                <th className="py-3.5 px-4">Date of Joined</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCommunities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400 font-medium">
                    No joined communities found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredCommunities.map(c => {
                  const acc = accounts.find(a => a.id === c.accountId) || { username: 'Unknown' };
                  const autoStatus = getAutomatedStatus(c);

                  // Dynamic live aggregate from promotions (Comment & Post Tracker)
                  const matchingPromos = promotions.filter(
                    p => p.accountId === c.accountId && p.community.toLowerCase() === c.communityName.toLowerCase()
                  );
                  const promoComments = matchingPromos.reduce((sum, p) => sum + (p.comments || 0), 0);
                  const promoPosts = matchingPromos.length;

                  const totalComments = (c.commentCount || 0) + promoComments;
                  const totalPosts = (c.postCount || 0) + promoPosts;

                  return (
                    <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        u/{acc.username}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-orange-400">
                        {c.communityName}
                      </td>
                      <td className="py-3.5 px-4">
                        {autoStatus.type === 'shared' ? (
                          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                            ⚡ {autoStatus.label}
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            ✓ Joined
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 text-center">
                        {totalComments}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 text-center">
                        {totalPosts}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {c.joinedDate || '-'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          onClick={() => {
                            setCommunities(communities.filter(x => x.id !== c.id));
                            triggerNotification("Community Removed", `Removed ${c.communityName} record.`, "warning");
                          }} 
                          className="text-rose-400 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD COMMUNITY INTERACTIVE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <form onSubmit={handleAddCommunity} className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <i data-lucide="plus-circle" className="w-5 h-5 text-orange-400"></i>
                Add Joined Subreddit Community
              </h3>
              <button 
                type="button" 
                onClick={() => { setIsAddModalOpen(false); setDuplicateError(''); }} 
                className="text-slate-400 hover:text-white"
              >
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1 text-xs">Username (Account Select) *</label>
              <select 
                value={selectedAccountId} 
                onChange={(e) => setSelectedAccountId(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold text-xs focus:border-orange-500 outline-none"
              >
                {accounts.map(acc => <option key={acc.id} value={acc.id}>u/{acc.username} ({acc.group})</option>)}
              </select>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1 text-xs">Subreddit Joined (Copy/Paste) *</label>
              <input 
                type="text" 
                placeholder="Copy/paste e.g. r/askreddit" 
                value={communityName} 
                onChange={(e) => setCommunityName(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-orange-500 outline-none font-mono"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Comment Count</label>
                <input 
                  type="number" 
                  min="0"
                  value={commentCount} 
                  onChange={(e) => setCommentCount(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold focus:border-orange-500 outline-none" 
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">Post Count</label>
                <input 
                  type="number" 
                  min="0"
                  value={postCount} 
                  onChange={(e) => setPostCount(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-cyan-400 font-mono font-bold focus:border-orange-500 outline-none" 
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-semibold block mb-1 text-xs">Date of Joined *</label>
              <input 
                type="date" 
                value={joinedDate} 
                onChange={(e) => setJoinedDate(e.target.value)} 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-orange-500 outline-none"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button 
                type="button" 
                onClick={() => { setIsAddModalOpen(false); setDuplicateError(''); }} 
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg"
              >
                Save Community
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// --- HELPER FOR METRIC CHANGE STATUS INDICATORS ---
function getMetricStatusIndicator(currentVal, prevVal) {
  if (prevVal === undefined || prevVal === null) {
    return { label: '⚪ Flat (Base)', cls: 'bg-slate-800/40 text-slate-400 border-slate-700/60' };
  }
  const diff = currentVal - prevVal;
  if (diff > 0) {
    return { label: `🟢 Improved (+${diff})`, cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 font-bold' };
  } else if (diff < 0) {
    return { label: `🔴 Declined (${diff})`, cls: 'bg-rose-500/15 text-rose-300 border-rose-500/30 font-bold' };
  } else {
    return { label: `⚪ Flat (0)`, cls: 'bg-slate-800/40 text-slate-400 border-slate-700/60' };
  }
}

// --- MODULE 4: DAILY ACTIVITY TRACKER WITH NUMERIC CONTRIBUTION COUNTS & 11-COLUMN TRACKING TABLE ---
function DailyActivityTrackerView({ activities, setActivities, accounts, triggerNotification }) {
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionTime, setSessionTime] = useState(30);
  const [upvotes, setUpvotes] = useState(15);
  const [comments, setComments] = useState(5);
  const [posts, setPosts] = useState(1);
  const [postKarma, setPostKarma] = useState(1200);
  const [commentKarma, setCommentKarma] = useState(3500);
  const [contribPostCount, setContribPostCount] = useState(2);
  const [contribCommentCount, setContribCommentCount] = useState(5);

  // Filters state for Activity Log History
  const [filterAccountId, setFilterAccountId] = useState('ALL');
  const [filterDate, setFilterDate] = useState('');
  const [filterMinKarmaDiff, setFilterMinKarmaDiff] = useState('');
  const [filterMinContribPost, setFilterMinContribPost] = useState('');
  const [filterMinContribComment, setFilterMinContribComment] = useState('');
  const [filterSearch, setFilterSearch] = useState('');

  useEffect(() => { lucide.createIcons(); }, [activities, filterAccountId, filterDate, filterMinKarmaDiff, filterMinContribPost, filterMinContribComment, filterSearch]);

  const computedTotalKarma = useMemo(() => Number(postKarma) + Number(commentKarma), [postKarma, commentKarma]);

  const handleSaveActivity = (e) => {
    e.preventDefault();
    const created = {
      id: 'act-' + Date.now(),
      accountId: selectedAccountId,
      date,
      loginCompleted: true,
      sessionTime: Number(sessionTime),
      upvotes: Number(upvotes),
      comments: Number(comments),
      posts: Number(posts),
      postKarma: Number(postKarma),
      commentKarma: Number(commentKarma),
      totalKarma: computedTotalKarma,
      karmaDiff: 35,
      contribPostCount: Number(contribPostCount),
      contribCommentCount: Number(contribCommentCount)
    };
    setActivities([created, ...activities]);
    triggerNotification("Activity Logged", "Logged new daily activity.", "success");
  };

  const hasActiveFilters = filterAccountId !== 'ALL' || filterDate !== '' || filterMinKarmaDiff !== '' || filterMinContribPost !== '' || filterMinContribComment !== '' || filterSearch !== '';

  const resetFilters = () => {
    setFilterAccountId('ALL');
    setFilterDate('');
    setFilterMinKarmaDiff('');
    setFilterMinContribPost('');
    setFilterMinContribComment('');
    setFilterSearch('');
  };

  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      const acc = accounts.find(a => a.id === act.accountId) || { username: '' };
      const matchesAccount = filterAccountId === 'ALL' || act.accountId === filterAccountId;
      const matchesDate = !filterDate || act.date === filterDate;
      const matchesKarmaDiff = filterMinKarmaDiff === '' || Number(act.karmaDiff || 0) >= Number(filterMinKarmaDiff);
      const matchesContribPost = filterMinContribPost === '' || Number(act.contribPostCount || 0) >= Number(filterMinContribPost);
      const matchesContribComment = filterMinContribComment === '' || Number(act.contribCommentCount || 0) >= Number(filterMinContribComment);
      const matchesSearch = !filterSearch.trim() || 
        acc.username.toLowerCase().includes(filterSearch.toLowerCase()) || 
        (act.notes && act.notes.toLowerCase().includes(filterSearch.toLowerCase()));
      return matchesAccount && matchesDate && matchesKarmaDiff && matchesContribPost && matchesContribComment && matchesSearch;
    });
  }, [activities, accounts, filterAccountId, filterDate, filterMinKarmaDiff, filterMinContribPost, filterMinContribComment, filterSearch]);

  // Group activities chronologically per account to compute status vs previous update
  const accountActivityHistory = useMemo(() => {
    const map = {};
    accounts.forEach(acc => {
      map[acc.id] = activities
        .filter(a => a.accountId === acc.id)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    });
    return map;
  }, [activities, accounts]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Per-Account Activity & Metric Tracking</h2>
          <p className="text-xs text-slate-400">Track karma overall, contributions, and activity changes vs previous update per account.</p>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={resetFilters} 
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700"
          >
            <i data-lucide="rotate-ccw" className="w-3.5 h-3.5"></i>
            Reset Filters
          </button>
        )}
      </div>

      {/* FILTER CONTROLS BAR (Moved to top side as requested) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider">
          <i data-lucide="filter" className="w-4 h-4 text-orange-400"></i>
          <span>Activity Log Filters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Account</label>
            <select 
              value={filterAccountId} 
              onChange={(e) => setFilterAccountId(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-semibold focus:border-orange-500 outline-none"
            >
              <option value="ALL">All Accounts</option>
              {accounts.map(acc => <option key={acc.id} value={acc.id}>u/{acc.username}</option>)}
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Date</label>
            <input 
              type="date" 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:border-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Min Karma Change</label>
            <input 
              type="number" 
              placeholder="e.g. 20" 
              value={filterMinKarmaDiff} 
              onChange={(e) => setFilterMinKarmaDiff(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-amber-300 font-mono focus:border-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Min Contrib Posts</label>
            <input 
              type="number" 
              placeholder="e.g. 1" 
              value={filterMinContribPost} 
              onChange={(e) => setFilterMinContribPost(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-cyan-300 font-mono focus:border-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Min Contrib Comments</label>
            <input 
              type="number" 
              placeholder="e.g. 1" 
              value={filterMinContribComment} 
              onChange={(e) => setFilterMinContribComment(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-emerald-300 font-mono focus:border-orange-500 outline-none" 
            />
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Search User / Notes</label>
            <input 
              type="text" 
              placeholder="Keywords..." 
              value={filterSearch} 
              onChange={(e) => setFilterSearch(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white focus:border-orange-500 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: Entry Form on LEFT side, 11-Column Table on RIGHT side */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* LEFT SIDE: "Save login activity" Manual Entry Form */}
        <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 h-fit">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <i data-lucide="check-square" className="w-4 h-4 text-orange-400"></i>
              Save Login Activity
            </h3>
            <p className="text-[11px] text-slate-400">Manual daily session log form</p>
          </div>

          <form onSubmit={handleSaveActivity} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Account *</label>
              <select value={selectedAccountId} onChange={(e) => setSelectedAccountId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-semibold outline-none focus:border-orange-500">
                {accounts.map(acc => <option key={acc.id} value={acc.id}>u/{acc.username}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Date *</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Session Mins</label>
                <input type="number" value={sessionTime} onChange={(e) => setSessionTime(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white outline-none focus:border-orange-500 font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Upvotes</label>
                <input type="number" value={upvotes} onChange={(e) => setUpvotes(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Comments</label>
                <input type="number" value={comments} onChange={(e) => setComments(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Posts</label>
                <input type="number" value={posts} onChange={(e) => setPosts(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-white font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Post Karma</label>
                <input type="number" value={postKarma} onChange={(e) => setPostKarma(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Comment Karma</label>
                <input type="number" value={commentKarma} onChange={(e) => setCommentKarma(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-white font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <div>
                <label className="text-slate-400 font-semibold block mb-1 text-cyan-400">Contrib Post</label>
                <input type="number" value={contribPostCount} onChange={(e) => setContribPostCount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-cyan-300 font-mono font-bold" />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1 text-emerald-400">Contrib Comment</label>
                <input type="number" value={contribCommentCount} onChange={(e) => setContribCommentCount(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-emerald-300 font-mono font-bold" />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg transition-all mt-2">
              Save Activity Log
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: NEW 11-COLUMN PER-ACCOUNT TRACKING TABLE */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-base text-white">Per-Account Tracking Table</h3>
              <p className="text-xs text-slate-400">Showing {filteredActivities.length} of {activities.length} total entries</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
                {/* SECTION HEADER ROW */}
                <tr className="border-b border-slate-800/80 bg-slate-950/80">
                  <th colSpan="2" className="py-2 px-3 border-r border-slate-800 text-slate-300 font-bold bg-slate-900/50">User & Session</th>
                  <th colSpan="3" className="py-2 px-3 border-r border-slate-800 text-purple-300 font-bold bg-purple-950/20 text-center">Karma Overall</th>
                  <th colSpan="3" className="py-2 px-3 border-r border-slate-800 text-cyan-300 font-bold bg-cyan-950/20 text-center">Contribution</th>
                  <th colSpan="3" className="py-2 px-3 text-emerald-300 font-bold bg-emerald-950/20 text-center">Activities</th>
                </tr>
                {/* DETAILED COLUMN HEADERS */}
                <tr className="bg-slate-950">
                  <th className="py-2.5 px-3 border-r border-slate-800/60">User Name</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono">Session Time</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Karma Post</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Karma Comment</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 text-center">Karma Status</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Contrib Post</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Contrib Comment</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 text-center">Contrib Status</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Activities Post</th>
                  <th className="py-2.5 px-3 border-r border-slate-800/60 font-mono text-center">Activities Comment</th>
                  <th className="py-2.5 px-3 text-center">Activities Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredActivities.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="py-8 text-center text-slate-400 font-medium">
                      No tracking entries match current filters.
                    </td>
                  </tr>
                ) : (
                  filteredActivities.map(act => {
                    const acc = accounts.find(a => a.id === act.accountId) || { username: 'Unknown' };
                    
                    // Compute status vs previous update for this same user
                    const userHistory = accountActivityHistory[act.accountId] || [];
                    const currentIndex = userHistory.findIndex(h => h.id === act.id);
                    const prevAct = currentIndex > 0 ? userHistory[currentIndex - 1] : null;

                    // Karma Status
                    const karmaStatus = getMetricStatusIndicator(
                      act.totalKarma || (act.postKarma + act.commentKarma),
                      prevAct ? (prevAct.totalKarma || (prevAct.postKarma + prevAct.commentKarma)) : undefined
                    );

                    // Contribution Status
                    const currentContrib = (act.contribPostCount || 0) + (act.contribCommentCount || 0);
                    const prevContrib = prevAct ? ((prevAct.contribPostCount || 0) + (prevAct.contribCommentCount || 0)) : undefined;
                    const contribStatus = getMetricStatusIndicator(currentContrib, prevContrib);

                    // Activities Status
                    const currentActTotal = (act.posts || 0) + (act.comments || 0);
                    const prevActTotal = prevAct ? ((prevAct.posts || 0) + (prevAct.comments || 0)) : undefined;
                    const actStatus = getMetricStatusIndicator(currentActTotal, prevActTotal);

                    return (
                      <tr key={act.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                        <td className="py-3 px-3 font-bold text-white border-r border-slate-800/60">
                          u/{acc.username}
                        </td>
                        <td className="py-3 px-3 text-slate-300 border-r border-slate-800/60">
                          {act.sessionTime || 0} mins
                        </td>

                        {/* KARMA OVERALL SECTION */}
                        <td className="py-3 px-3 text-purple-300 text-center border-r border-slate-800/60">
                          {act.postKarma || 0}
                        </td>
                        <td className="py-3 px-3 text-purple-300 text-center border-r border-slate-800/60">
                          {act.commentKarma || 0}
                        </td>
                        <td className="py-3 px-3 text-center border-r border-slate-800/60">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${karmaStatus.cls}`}>
                            {karmaStatus.label}
                          </span>
                        </td>

                        {/* CONTRIBUTION SECTION */}
                        <td className="py-3 px-3 text-cyan-300 text-center border-r border-slate-800/60">
                          {act.contribPostCount || 0}
                        </td>
                        <td className="py-3 px-3 text-cyan-300 text-center border-r border-slate-800/60">
                          {act.contribCommentCount || 0}
                        </td>
                        <td className="py-3 px-3 text-center border-r border-slate-800/60">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${contribStatus.cls}`}>
                            {contribStatus.label}
                          </span>
                        </td>

                        {/* ACTIVITIES SECTION */}
                        <td className="py-3 px-3 text-emerald-300 text-center border-r border-slate-800/60">
                          {act.posts || 0}
                        </td>
                        <td className="py-3 px-3 text-emerald-300 text-center border-r border-slate-800/60">
                          {act.comments || 0}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] border ${actStatus.cls}`}>
                            {actStatus.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 5: WEEKLY GOAL TRACKER ---
function WeeklyGoalTrackerView({ goals, setGoals, userRole, triggerNotification }) {
  useEffect(() => { lucide.createIcons(); }, [goals]);
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white">Weekly Goal Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map(g => (
          <div key={g.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">{g.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${g.status === 'GREEN' ? 'badge-green' : g.status === 'BLUE' ? 'badge-blue' : 'badge-red'}`}>
                {g.status}
              </span>
            </div>
            <div className="font-mono text-xs text-slate-400">Target: {g.target} | Achieved: {g.achieved}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MODULE 6: CALENDAR VIEW ---
function CalendarView({ activities, communities, goals, accounts }) {
  useEffect(() => { lucide.createIcons(); }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white">Activity Calendar</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-xs text-slate-400 font-mono">Interactive Month View for August 2026</p>
      </div>
    </div>
  );
}

// --- MODULE 7: ACCOUNT HEALTH ---
function AccountHealthView({ accounts }) {
  useEffect(() => { lucide.createIcons(); }, []);
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-white">Account Health & Risk Analysis Engine</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Low Risk (80-100)', count: accounts.filter(a=>a.healthScore>=80).length, color: 'text-emerald-400' },
          { title: 'Medium Risk (60-79)', count: accounts.filter(a=>a.healthScore>=60&&a.healthScore<80).length, color: 'text-amber-400' },
          { title: 'High Risk (40-59)', count: accounts.filter(a=>a.healthScore>=40&&a.healthScore<60).length, color: 'text-orange-400' },
          { title: 'Critical Risk (<40)', count: accounts.filter(a=>a.healthScore<40).length, color: 'text-rose-400' }
        ].map((box, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">{box.title}</span>
            <p className={`text-2xl font-extrabold font-mono ${box.color}`}>{box.count} Accounts</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MODULE 8: PROMOTION TRACKER VIEW ---
function PromotionTrackerView({ promotions, setPromotions, accounts, triggerNotification }) {
  useEffect(() => { lucide.createIcons(); }, [promotions]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Promotion & Brand Mention Tracker</h2>
          <p className="text-xs text-slate-400">Track brand mentions, external links, views, upvotes, and comments.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 border-b border-slate-800 uppercase text-[10px] text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Community</th>
                <th className="py-3 px-4">Brand Mention</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Upvotes</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {promotions.map(p => {
                const acc = accounts.find(a => a.id === p.accountId) || { username: 'Unknown' };
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono text-slate-400">{p.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-200">u/{acc.username}</td>
                    <td className="py-3 px-4 text-orange-400 font-semibold">{p.community}</td>
                    <td className="py-3 px-4 font-semibold text-purple-300">{p.brandMention || '-'}</td>
                    <td className="py-3 px-4 font-mono">{p.views.toLocaleString()}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">+{p.upvotes}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => { setPromotions(promotions.filter(x => x.id !== p.id)); triggerNotification("Promotion Deleted", "Removed promo entry.", "warning"); }} className="text-rose-400 font-semibold hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 9: REPORTS & EXPORT ENGINE (CSV, EXCEL, PDF) ---
function ReportsExportView({ accounts, activities, activeWorkspace }) {
  useEffect(() => { lucide.createIcons(); }, []);

  const exportToCSV = () => {
    const data = accounts.map(a => ({ Username: a.username, Group: a.group, Persona: a.persona, Country: a.country, Status: a.status, HealthScore: a.healthScore }));
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `RAMS_Account_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    const accData = accounts.map(a => ({ Username: a.username, Group: a.group, Persona: a.persona, Status: a.status, HealthScore: a.healthScore }));
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(accData);
    XLSX.utils.book_append_sheet(wb, ws1, "Accounts Summary");
    XLSX.writeFile(wb, `RAMS_Executive_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const exportToPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("RAMS - Executive Team Report", 14, 20);
    const tableData = accounts.map(a => [a.username, a.group, a.persona, a.status, a.healthScore]);
    doc.autoTable({ startY: 30, head: [['Username', 'Group', 'Persona', 'Status', 'Health Score']], body: tableData });
    doc.save(`RAMS_Executive_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white">Executive Reports & Multi-Format Data Export</h2>
        <p className="text-xs text-slate-400">Export filtered data to CSV, Excel (.xlsx), or formatted PDF.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
            <i data-lucide="file-spreadsheet" className="w-8 h-8 text-emerald-400 mx-auto"></i>
            <h4 className="font-bold text-white text-sm">Export CSV</h4>
            <button onClick={exportToCSV} className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-md">
              Download CSV
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
            <i data-lucide="table" className="w-8 h-8 text-blue-400 mx-auto"></i>
            <h4 className="font-bold text-white text-sm">Export Excel (.xlsx)</h4>
            <button onClick={exportToExcel} className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs shadow-md">
              Download Excel Workbook
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-center">
            <i data-lucide="file-text" className="w-8 h-8 text-orange-400 mx-auto"></i>
            <h4 className="font-bold text-white text-sm">Export Executive PDF</h4>
            <button onClick={exportToPDF} className="w-full py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-md">
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MODULE 10: 4-STEP CSV IMPORT WIZARD ---
function CSVImportWizardView({ accounts, setAccounts, triggerNotification }) {
  const [step, setStep] = useState(1);
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => { lucide.createIcons(); }, [step]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => { setParsedData(results.data); setStep(2); }
    });
  };

  const handleExecuteImport = () => {
    let currentAccounts = [...accounts];
    parsedData.forEach(row => {
      const username = row.Username || row.username;
      if (!username) return;
      currentAccounts.push({
        id: 'acc-' + Date.now() + Math.random(),
        username,
        group: 'GROUP_A',
        persona: row.Persona || 'Imported Persona',
        country: row.Country || 'United States',
        accountAge: Number(row.AccountAge || 100),
        browserProfile: row.BrowserProfile || 'Profile-Import',
        status: 'ACTIVE',
        healthScore: 85,
        riskLevel: 'LOW'
      });
    });
    setAccounts(currentAccounts);
    setStep(4);
    triggerNotification("CSV Import Complete", `Imported ${parsedData.length} records.`, "success");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-white">CSV Account Import Wizard</h2>
        <p className="text-xs text-slate-400">Upload CSV files, map columns, preview validation, and execute imports.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-sm">
        {step === 1 && (
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-4">
            <i data-lucide="upload-cloud" className="w-12 h-12 text-orange-400 mx-auto"></i>
            <h3 className="font-bold text-white text-base">Drag & Drop Account CSV File</h3>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload" className="inline-block px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-xs cursor-pointer shadow-lg">
              Browse Files
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-white text-base">Parsed {parsedData.length} records</h3>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold shadow-md">
              Proceed to Preview
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-xs">
            <h3 className="font-bold text-white text-base">Preview Data Before Import</h3>
            <button onClick={handleExecuteImport} className="px-6 py-2 rounded-xl bg-orange-500 text-white font-semibold">Execute Import</button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center space-y-4 py-6">
            <i data-lucide="check-circle" className="w-12 h-12 text-emerald-400 mx-auto"></i>
            <h3 className="font-bold text-white text-lg">CSV Import Successfully Completed!</h3>
            <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold">Import Another File</button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsWorkspaceView({ activeWorkspace, userRole }) {
  useEffect(() => { lucide.createIcons(); }, []);
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <h2 className="text-xl font-bold text-white">Workspace & Team Settings</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300">
        Active Workspace: <strong className="text-white">{activeWorkspace.name}</strong> ({userRole})
      </div>
    </div>
  );
}

function UserProfileView({ userRole }) {
  useEffect(() => { lucide.createIcons(); }, []);
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h2 className="text-xl font-bold text-white">User Profile & Account</h2>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300 space-y-3">
        <p className="font-bold text-white text-sm">Prawin Lead</p>
        <p className="font-mono text-slate-400">prawin@sparkleteam.io</p>
      </div>
    </div>
  );
}

function CommandPaletteModal({ onClose, accounts, onNavigate }) {
  const [query, setQuery] = useState('');
  const filtered = accounts.filter(a => a.username.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-start justify-center pt-24 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-4 space-y-3 shadow-2xl">
        <input 
          type="text" autoFocus placeholder="Type a command or account name..."
          value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
        />
        <div className="space-y-1 text-xs">
          {['dashboard', 'accounts', 'communities', 'activity', 'goals', 'calendar', 'health', 'promotions', 'reports', 'import'].map(tab => (
            <button key={tab} onClick={() => onNavigate(tab)} className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 capitalize">
              Go to {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationDrawer({ notifications, onClose }) {
  return (
    <div className="fixed inset-0 z-50 modal-backdrop flex items-center justify-end">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-sm h-full p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-base text-white">Notifications Center</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><i data-lucide="x" className="w-5 h-5"></i></button>
        </div>
        <div className="space-y-2 text-xs">
          {notifications.map(n => (
            <div key={n.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <p className="font-bold text-white">{n.title}</p>
              <p className="text-slate-400 text-[11px]">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RAMSApp />);
