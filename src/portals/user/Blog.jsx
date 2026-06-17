import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import SEOHead from '../../components/common/SEOHead';
import { blogPosts, blogCategories } from '../../data/blogData';

const categoryColors = {
    'GST Updates': '#16A34A',
    'Tax Saving Tips': '#0B1F3A',
    'Business Registration Guide': '#7C3AED',
    'Loan Documentation Guide': '#D97706',
    'Financial Planning Tips': '#0284C7',
};

const API_KEY = 'b26983256a7643a7be726cf5552527dc';

const SAMPLE_ARTICLES = [
  {
    title: "Federal Reserve Signals Two Rate Cuts Possible in 2025 as Inflation Cools",
    description: "Fed Chair Jerome Powell hinted at a possible shift in monetary policy following encouraging CPI data showing inflation dropped to 2.4%, its lowest level in three years. Markets rallied sharply on the news.",
    url: "#", source: "Reuters", publishedAt: new Date(Date.now()-1*60*60*1000).toISOString(),
    category: "economy", featured: true
  },
  {
    title: "S&P 500 Hits Record High Amid Tech Surge",
    description: "The benchmark index crossed 5,800 points for the first time as mega-cap technology stocks led a broad market rally. Nvidia surged 4.2% after announcing new AI chip orders.",
    url: "#", source: "Bloomberg", publishedAt: new Date(Date.now()-2*60*60*1000).toISOString(),
    category: "markets"
  },
  {
    title: "Apple Reports Blowout Q3 Earnings, Revenue Beats Estimates by 8%",
    description: "Apple posted quarterly revenue of $94.9 billion, exceeding analyst expectations. Services division grew 14% year-over-year, driven by App Store and iCloud subscriptions.",
    url: "#", source: "CNBC", publishedAt: new Date(Date.now()-3*60*60*1000).toISOString(),
    category: "earnings"
  },
  {
    title: "Bitcoin Surpasses $75,000 as ETF Inflows Reach Monthly Record",
    description: "BTC crossed a key psychological level as institutional investors poured $2.4 billion into spot Bitcoin ETFs this week alone. Analysts now eye $80K as the next resistance zone.",
    url: "#", source: "CoinDesk", publishedAt: new Date(Date.now()-4*60*60*1000).toISOString(),
    category: "crypto"
  },
  {
    title: "India's GDP Growth Forecast Raised to 7.2% by IMF",
    description: "The International Monetary Fund upgraded India's growth outlook, citing strong domestic consumption and robust services exports. The revision makes India the fastest-growing major economy globally.",
    url: "#", source: "Economic Times", publishedAt: new Date(Date.now()-5*60*60*1000).toISOString(),
    category: "economy"
  },
  {
    title: "Microsoft Azure Revenue Grows 29%, Shares Jump 5% After Hours",
    description: "Microsoft's cloud division delivered another strong quarter, with AI services now contributing meaningfully to Azure growth. CEO Satya Nadella highlighted Copilot adoption across enterprise clients.",
    url: "#", source: "Wall Street Journal", publishedAt: new Date(Date.now()-6*60*60*1000).toISOString(),
    category: "earnings"
  },
  {
    title: "Gold Prices Climb to $2,600 as Dollar Weakens on Jobs Data",
    description: "Spot gold advanced 1.3% as a weaker-than-expected non-farm payrolls report weighed on the US dollar. Safe-haven demand also rose amid ongoing geopolitical tensions.",
    url: "#", source: "Kitco", publishedAt: new Date(Date.now()-7*60*60*1000).toISOString(),
    category: "markets"
  },
  {
    title: "Ethereum ETF Sees $500M Inflows in First Week of Trading",
    description: "The newly approved Ethereum spot ETF attracted massive interest on debut, exceeding expectations. Ethereum price rose 8% in the same period to trade above $3,500.",
    url: "#", source: "The Block", publishedAt: new Date(Date.now()-8*60*60*1000).toISOString(),
    category: "crypto"
  },
];

const MARKET_DATA = [
  { name: "S&P 500", value: "5,812.34", change: "+0.87%", up: true },
  { name: "NASDAQ", value: "18,204.55", change: "+1.22%", up: true },
  { name: "DOW JONES", value: "42,156.10", change: "+0.41%", up: true },
  { name: "NIFTY 50", value: "24,613.00", change: "-0.19%", up: false },
  { name: "SENSEX", value: "80,542.11", change: "-0.23%", up: false },
  { name: "GOLD", value: "$2,608.40", change: "+1.31%", up: true },
  { name: "BTC/USD", value: "$75,218", change: "+3.60%", up: true },
  { name: "USD/INR", value: "83.42", change: "-0.08%", up: false },
];

function Blog() {
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'guides'
    const [activeCategory, setActiveCategory] = useState('');
    const [liveNews, setLiveNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [activeNewsFilter, setActiveNewsFilter] = useState('all');
    const [liveTime, setLiveTime] = useState('');

    const navigate = useNavigate();
    const filtered = activeCategory ? blogPosts.filter(p => p.category === activeCategory) : blogPosts;

    // Live clock
    useEffect(() => {
        const updateClock = () => {
            setLiveTime(new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // News API fetching
    const loadNews = async () => {
        setIsLoading(true);
        setErrorMsg(null);

        if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
            setLiveNews(SAMPLE_ARTICLES);
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=20&apiKey=${API_KEY}`
            );
            const data = await res.json();
            if (data.status !== 'ok') throw new Error(data.message || 'Failed to fetch');

            const classifyArticle = (title, description, index) => {
                const text = `${title} ${description || ''}`.toLowerCase();
                if (text.includes('crypto') || text.includes('bitcoin') || text.includes('btc') || text.includes('ethereum')) return 'crypto';
                if (text.includes('fed') || text.includes('powell') || text.includes('inflation') || text.includes('interest rate') || text.includes('cpi')) return 'fed';
                if (text.includes('earning') || text.includes('revenue') || text.includes('profit') || text.includes('q3') || text.includes('q4') || text.includes('results')) return 'earnings';
                if (text.includes('gdp') || text.includes('imf') || text.includes('growth') || text.includes('economy')) return 'economy';
                const defaultCategories = ['markets', 'economy', 'earnings'];
                return defaultCategories[index % defaultCategories.length];
            };

            const mapped = data.articles.map((a, i) => ({
                title: a.title,
                description: a.description,
                url: a.url,
                source: a.source?.name || 'News Source',
                publishedAt: a.publishedAt,
                category: classifyArticle(a.title, a.description, i),
                featured: i === 0,
            }));

            setLiveNews(mapped);
        } catch (err) {
            console.error(err);
            setErrorMsg(err.message);
            setLiveNews(SAMPLE_ARTICLES); // Fallback
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'news' && liveNews.length === 0) {
            loadNews();
        }
    }, [activeTab]);

    // Helpers
    const timeAgo = (isoString) => {
        const diff = (Date.now() - new Date(isoString)) / 1000;
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
        return `${Math.floor(diff/86400)}d ago`;
    };

    const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'FinTaxVers Financial Insights Blog',
        description: 'Expert articles on GST, income tax, business loans, MSME registration, and financial planning from Nagpur.',
        url: 'https://fintaxvers.com/blog',
        publisher: { '@type': 'Organization', name: 'FinTaxVers Consultancy Services', url: 'https://fintaxvers.com' }
    };

    // Filter live news
    const filteredNews = activeNewsFilter === 'all' 
        ? liveNews 
        : liveNews.filter(n => n.category === activeNewsFilter);
        
    const featuredStory = filteredNews.find(n => n.featured);
    const normalStories = filteredNews.filter(n => !n.featured || !featuredStory);

    return (
        <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>
            <SEOHead
                title="Financial Insights & Live Market News | FinTaxVers"
                description="Real-time business news, live market indicators, and expert insights on GST, income tax, business loans, and financial planning."
                keywords="Live financial news, GST updates, income tax Nagpur, business loan guides, live market indices, Nifty 50, Sensex"
                canonical="https://fintaxvers.com/blog"
                schema={blogSchema}
            />
            <Navbar />

            {/* Hero */}
            <section style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #16325C 100%)', padding: '125px 0 60px', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <span style={{ background: 'rgba(22,163,74,0.2)', color: '#4ade80', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Financial Board
                    </span>
                    <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', margin: '16px 0 12px', color: 'white' }}>
                        {activeTab === 'news' ? 'Live Financial News Terminal' : 'Expert Financial Guides & Tips'}
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
                        {activeTab === 'news' 
                            ? 'Real-time financial headlines, market indicators, and policy updates.'
                            : 'GST updates, tax saving strategies, loan documentation guides, and insights from Nagpur experts.'
                        }
                    </p>

                    {/* Blog Navigation Tabs */}
                    <div className="blog-tabs-container">
                        <button 
                            className={`blog-tab-btn ${activeTab === 'news' ? 'active' : ''}`}
                            onClick={() => setActiveTab('news')}
                        >
                            📊 Live Market News
                        </button>
                        <button 
                            className={`blog-tab-btn ${activeTab === 'guides' ? 'active' : ''}`}
                            onClick={() => setActiveTab('guides')}
                        >
                            📚 Expert Guides & Tips
                        </button>
                    </div>
                </div>
            </section>

            {/* LIVE NEWS TERMINAL TAB */}
            {activeTab === 'news' && (
                <div className="container" style={{ marginTop: '2.5rem' }}>
                    <div className="news-terminal-container">
                        
                        {/* TICKER */}
                        <div className="terminal-ticker-wrap">
                            <div className="terminal-ticker-label">MARKETS LIVE</div>
                            <div style={{ overflow: 'hidden', flex: 1 }}>
                                <div className="terminal-ticker-track">
                                    {MARKET_DATA.concat(MARKET_DATA).map((m, idx) => (
                                        <span key={idx} className="terminal-ticker-item">
                                            <span className="sym">{m.name}</span>
                                            <span className={m.up ? 'up' : 'dn'}>
                                                {m.value} {m.change}
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#ffffff', opacity: 0.9, paddingRight: '15px', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                <span className="live-dot"></span>
                                {liveTime}
                            </div>
                        </div>

                        {/* MARKET STRIP */}
                        <div className="terminal-market-strip">
                            {MARKET_DATA.map((m, idx) => (
                                <div key={idx} className="terminal-market-card">
                                    <div className="market-name">{m.name}</div>
                                    <div className="market-val">{m.value}</div>
                                    <div className={`market-chg ${m.up ? 'up' : 'dn'}`}>{m.change}</div>
                                </div>
                            ))}
                        </div>

                        {/* SECTION HEADER FOR TERMINAL */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
                            <h2 style={{ fontSize: '1.4rem', color: '#0B1F3A', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                                <span style={{ width: '4px', height: '24px', background: '#16a34a', borderRadius: '2px' }}></span>
                                Real-time Financial Feeds
                            </h2>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {['all', 'markets', 'earnings', 'crypto', 'economy', 'fed'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveNewsFilter(cat)}
                                            className={`terminal-filter-btn ${activeNewsFilter === cat ? 'active' : ''}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <button className="terminal-refresh-btn" onClick={loadNews} disabled={isLoading}>
                                    {isLoading ? 'Loading...' : '↻ Refresh'}
                                </button>
                            </div>
                        </div>

                        {/* NEWS GRID OR LOADER */}
                        {isLoading ? (
                            <div className="terminal-loading">
                                <div className="terminal-spinner"></div>
                                Loading latest financial news…
                            </div>
                        ) : errorMsg && liveNews.length === 0 ? (
                            <div className="terminal-loading" style={{ flexDirection: 'column', gap: '8px' }}>
                                <div style={{ color: '#ef4444' }}>⚠ Could not load live news: {errorMsg}</div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Check network connection or API limit.</div>
                            </div>
                        ) : (
                            <div className="terminal-news-grid">
                                {/* Featured story */}
                                {featuredStory && activeNewsFilter === 'all' && (
                                    <a className="terminal-news-card featured" href={featuredStory.url} target="_blank" rel="noopener noreferrer">
                                        <div className="featured-text">
                                            <div><span className="featured-badge">★ Top Story</span></div>
                                            <div className="card-title">{featuredStory.title}</div>
                                            <p className="card-summary">{featuredStory.description}</p>
                                            <div className="card-footer">
                                                <div className="card-source">
                                                    <div className="source-dot"></div>
                                                    {featuredStory.source} · {timeAgo(featuredStory.publishedAt)}
                                                </div>
                                                <div className="card-link">Read full story →</div>
                                            </div>
                                        </div>
                                    </a>
                                )}

                                {/* Normal stories */}
                                {normalStories.map((a, idx) => (
                                    <a key={idx} className="terminal-news-card" href={a.url} target="_blank" rel="noopener noreferrer">
                                        <div className="card-top">
                                            <span className={`tag ${a.category || 'markets'}`}>{a.category}</span>
                                            <span className="card-time">{timeAgo(a.publishedAt)}</span>
                                        </div>
                                        <div className="card-title">{a.title}</div>
                                        <p className="card-summary">{a.description}</p>
                                        <div className="card-footer">
                                            <div className="card-source">
                                                <div className="source-dot"></div>
                                                {a.source}
                                            </div>
                                            <div className="card-link">Read →</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* EXPERT GUIDES & TIPS TAB */}
            {activeTab === 'guides' && (
                <section className="section">
                    <div className="container">
                        {/* Filters */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setActiveCategory('')}
                                    style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #cbd5e1', background: !activeCategory ? '#0B1F3A' : 'white', color: !activeCategory ? 'white' : '#0B1F3A', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                                >All</button>
                                {blogCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #cbd5e1', background: activeCategory === cat ? '#0B1F3A' : 'white', color: activeCategory === cat ? 'white' : '#0B1F3A', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
                                    >{cat}</button>
                                ))}
                            </div>
                        </div>

                        {/* Blog Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '28px' }}>
                            {filtered.map(post => (
                                <article
                                    key={post.slug}
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                    style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(11,31,58,0.06)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(11,31,58,0.12)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(11,31,58,0.06)'; }}
                                >
                                    <div style={{ padding: '28px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                            <span style={{ background: `${categoryColors[post.category]}15`, color: categoryColors[post.category], padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>{post.category}</span>
                                            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{post.readTime}</span>
                                        </div>
                                        <h2 style={{ fontSize: '1.1rem', color: '#0B1F3A', marginBottom: '12px', lineHeight: 1.4, fontWeight: 700 }}>{post.title}</h2>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>{post.excerpt}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0B1F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>YR</div>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0B1F3A' }}>{post.author}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                                </div>
                                            </div>
                                            <span style={{ color: '#16A34A', fontWeight: 600, fontSize: '0.85rem' }}>Read More →</span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <div className="container" style={{ paddingBottom: '60px' }}>
                <div style={{ textAlign: 'center', padding: '50px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px' }}>
                    <h2 style={{ color: '#0B1F3A', marginBottom: '12px' }}>Need Expert Financial Advice in Nagpur?</h2>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>Consult with Yugant Rahele – Trusted Financial Consultant in Nagpur</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:+918928895195" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 8928895195</a>
                        <a href="tel:+919011424236" className="btn btn-primary" style={{ background: '#16A34A', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>📞 Call: 9011424236</a>
                        <a href="https://wa.me/918928895195" target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: 'white', padding: '12px 28px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>WhatsApp Us</a>
                    </div>
                </div>
            </div>

            <footer style={{ background: '#0B1F3A', color: 'rgba(255,255,255,0.6)', padding: '30px 0', textAlign: 'center', fontSize: '0.9rem' }}>
                <div className="container">
                    <p>© 2026 FinTaxVers Consultancy Services, Nagpur, Maharashtra, India. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Blog;
