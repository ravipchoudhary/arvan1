export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutGrid" },
  { label: "Markets", href: "/markets", icon: "TrendingUp" },
  { label: "Option Chain", href: "/option-chain", icon: "CandlestickChart" },
  { label: "Strategy Analysis", href: "/strategies", icon: "Target" },
  { label: "Paper Trading", href: "/paper-trading", icon: "BookOpenCheck" },
  { label: "Orders", href: "/orders", icon: "ReceiptText" },
  { label: "Trade Journal", href: "/trade-journal", icon: "NotebookPen" },
  { label: "Risk Center", href: "/risk", icon: "ShieldCheck" },
  { label: "Wallet & Credits", href: "/wallet", icon: "WalletCards" },
  { label: "Automation", href: "/automation", icon: "Bot" },
  { label: "Learning Center", href: "/learning", icon: "GraduationCap" },
  { label: "Reports", href: "/reports", icon: "ChartColumnBig" },
  { label: "Settings", href: "/settings", icon: "Settings2" },
  { label: "Audit Logs", href: "/audit", icon: "ScrollText" },
];

export const watchlist = [
  { symbol: "NIFTY 50", last: 24832.45, change: 0.82, signal: "Bullish" },
  { symbol: "BANKNIFTY", last: 52840.1, change: -0.31, signal: "Neutral" },
  { symbol: "FINNIFTY", last: 24514.2, change: 0.54, signal: "Breakout" },
  { symbol: "INDIA VIX", last: 14.86, change: -2.24, signal: "Cooling" },
];

export const strategyCards = [
  { name: "Support & Resistance Rejection", winRate: 64, avgRMultiple: 1.8, status: "Active" },
  { name: "Breakout + Retest", winRate: 71, avgRMultiple: 2.3, status: "Monitoring" },
  { name: "VWAP Pullback", winRate: 58, avgRMultiple: 1.6, status: "Watchlist" },
];

export const riskMetrics = [
  { label: "Gross Exposure", value: "23.4%", tone: "safe" },
  { label: "Max Daily Loss", value: "₹2.1L", tone: "warn" },
  { label: "Concentration", value: "12.7%", tone: "safe" },
  { label: "Margin Buffer", value: "64%", tone: "safe" },
];

export const walletMetrics = [
  { label: "Cash", value: "₹12.4L" },
  { label: "Open P&L", value: "+₹86,420" },
  { label: "Used Margin", value: "₹4.2L" },
  { label: "Available", value: "₹8.2L" },
];

export const auditEvents = [
  { time: "09:18:22", event: "Breakout + Retest scan triggered", actor: "AI Engine" },
  { time: "09:16:10", event: "Risk alert acknowledged", actor: "Operations" },
  { time: "09:11:41", event: "Paper trade session created", actor: "System" },
];

export const marketData = [
  { strike: 24000, ce: { oi: 522000, ltp: 210.45, change: 2.8 }, pe: { oi: 389000, ltp: 196.2, change: -1.1 } },
  { strike: 24200, ce: { oi: 612000, ltp: 184.1, change: 1.7 }, pe: { oi: 420000, ltp: 214.5, change: 1.4 } },
  { strike: 24500, ce: { oi: 731000, ltp: 156.3, change: 3.4 }, pe: { oi: 486000, ltp: 242.8, change: -2.2 } },
  { strike: 24800, ce: { oi: 694000, ltp: 127.2, change: 4.2 }, pe: { oi: 534000, ltp: 281.4, change: 0.8 } },
  { strike: 25000, ce: { oi: 882000, ltp: 106.5, change: 5.1 }, pe: { oi: 612000, ltp: 338.6, change: 1.9 } },
];

export const orderRows = [
  { time: "09:20", symbol: "NIFTY 25000 CE", side: "Buy", status: "Open", qty: 25, price: 108.3 },
  { time: "09:18", symbol: "BANKNIFTY 52800 CE", side: "Sell", status: "Filled", qty: 10, price: 128.7 },
  { time: "09:14", symbol: "FINNIFTY 24500 PE", side: "Buy", status: "Pending", qty: 40, price: 73.2 },
];

export const journalEntries = [
  { id: "JT-1284", setup: "Breakout + Retest", pnl: "+₹15,200", confidence: "78%" },
  { id: "JT-1281", setup: "Support Rejection", pnl: "-₹4,300", confidence: "63%" },
  { id: "JT-1279", setup: "Trend Continuation", pnl: "+₹9,840", confidence: "82%" },
];
