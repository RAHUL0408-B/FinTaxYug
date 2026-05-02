import { useState } from "react";

const sections = [
    {
        id: "government",
        title: "Government Websites",
        icon: "🏛️",
        color: "from-blue-900 to-blue-800",
        accent: "border-blue-500",
        badge: "bg-blue-100 text-blue-800",
        links: [
            { label: "Reserve Bank of India (RBI)", url: "https://www.rbi.org.in/", desc: "Monetary policy, banking regulations & financial stability" },
            { label: "Income Tax Department", url: "https://www.incometax.gov.in/", desc: "ITR filing, TDS, PAN, and tax compliance" },
            { label: "GST Portal", url: "https://www.gst.gov.in/", desc: "GST registration, filing, payments & returns" },
            { label: "Ministry of Corporate Affairs (MCA)", url: "https://www.mca.gov.in/", desc: "Company registration, ROC filings & compliance" },
            { label: "Udyam Registration", url: "https://udyamregistration.gov.in/", desc: "MSME registration for small & medium enterprises" },
            { label: "MSME Ministry", url: "https://msme.gov.in/", desc: "Schemes, policies & support for MSMEs" },
            { label: "Mahagst (Maharashtra GST)", url: "https://mahagst.gov.in/", desc: "Maharashtra state GST portal for local compliance" },
        ],
    },
    {
        id: "banking",
        title: "Financial Institutions",
        icon: "🏦",
        color: "from-emerald-900 to-emerald-800",
        accent: "border-emerald-500",
        badge: "bg-emerald-100 text-emerald-800",
        links: [
            { label: "HDFC Bank", url: "https://www.hdfcbank.com/", desc: "Private sector banking & financial services" },
            { label: "ICICI Bank", url: "https://www.icicibank.com/", desc: "Banking, loans, insurance & investments" },
            { label: "State Bank of India (SBI)", url: "https://www.sbi.co.in/", desc: "India's largest public sector bank" },
            { label: "Punjab National Bank", url: "https://www.pnbindia.in/", desc: "Public sector banking & financial solutions" },
            { label: "Bank of India", url: "https://www.bankofindia.co.in/", desc: "Public banking, loans & corporate services" },
            { label: "Axis Bank", url: "https://www.axisbank.com/", desc: "Private banking, credit cards & wealth management" },
            { label: "Kotak Mahindra Bank", url: "https://www.kotak.com/", desc: "Banking, investments & insurance services" },
        ],
    },
    {
        id: "news",
        title: "Finance News",
        icon: "📰",
        color: "from-amber-900 to-amber-800",
        accent: "border-amber-500",
        badge: "bg-amber-100 text-amber-800",
        links: [
            { label: "The Economic Times", url: "https://economictimes.indiatimes.com/", desc: "India's leading financial & business newspaper" },
            { label: "Moneycontrol", url: "https://www.moneycontrol.com/", desc: "Markets, mutual funds & personal finance news" },
            { label: "Business Standard", url: "https://www.business-standard.com/", desc: "In-depth business, economy & market analysis" },
            { label: "LiveMint", url: "https://www.livemint.com/", desc: "Financial news, opinion & data journalism" },
            { label: "Financial Express", url: "https://www.financialexpress.com/", desc: "Economy, banking, tax & market coverage" },
            { label: "Times of India – Business", url: "https://timesofindia.indiatimes.com/business", desc: "Business & corporate news from TOI" },
        ],
    },
    {
        id: "stocks",
        title: "Stock Market",
        icon: "📈",
        color: "from-violet-900 to-violet-800",
        accent: "border-violet-500",
        badge: "bg-violet-100 text-violet-800",
        links: [
            { label: "BSE India", url: "https://www.bseindia.com/", desc: "Bombay Stock Exchange – India's oldest exchange" },
            { label: "NSE India", url: "https://www.nseindia.com/", desc: "National Stock Exchange – equities, derivatives & more" },
            { label: "SEBI", url: "https://www.sebi.gov.in/", desc: "Securities & Exchange Board – market regulator" },
            { label: "Moneycontrol Markets", url: "https://www.moneycontrol.com/markets/", desc: "Live market data, charts & stock screeners" },
        ],
    },
    {
        id: "ca",
        title: "CA Governance",
        icon: "⚖️",
        color: "from-rose-900 to-rose-800",
        accent: "border-rose-500",
        badge: "bg-rose-100 text-rose-800",
        links: [
            { label: "ICAI – Pune Branch", url: "https://puneicai.org/", desc: "Institute of Chartered Accountants – Pune chapter" },
            { label: "ICAI National", url: "https://www.icai.org/", desc: "Official portal for CA profession in India" },
            { label: "UDIN Portal", url: "https://udin.icai.org/", desc: "Unique Document Identification Number for CAs" },
        ],
    },
    {
        id: "registration",
        title: "Business Registration",
        icon: "📋",
        color: "from-cyan-900 to-cyan-800",
        accent: "border-cyan-500",
        badge: "bg-cyan-100 text-cyan-800",
        links: [
            { label: "MCA Company Registration", url: "https://www.mca.gov.in/content/mca/global/en/mca/company-e-filing.html", desc: "Register your company with Ministry of Corporate Affairs" },
            { label: "Udyam Registration", url: "https://udyamregistration.gov.in/", desc: "Official MSME registration portal for businesses" },
            { label: "Startup India", url: "https://www.startupindia.gov.in/", desc: "Government schemes & support for Indian startups" },
            { label: "GeM Portal", url: "https://gem.gov.in/", desc: "Government e-Marketplace for procurement & selling" },
        ],
    },
];

function LinkCard({ label, url, desc }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group flex items-start gap-3 py-3 px-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all duration-200 rounded-sm"
        >
            <span
                className="mt-1 flex-shrink-0 text-slate-400 group-hover:text-blue-600 transition-colors duration-200"
                style={{ fontSize: "13px" }}
            >
                {hovered ? "➜" : "›"}
            </span>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200 leading-snug">
                    {label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
            </div>
            <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 text-xs mt-1">
                ↗
            </span>
        </a>
    );
}

function SectionCard({ section }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Section Header */}
            <div className={`bg-gradient-to-r ${section.color} px-5 py-4 flex items-center gap-3`}>
                <span className="text-2xl">{section.icon}</span>
                <div>
                    <h2 className="text-white font-bold text-base leading-tight">{section.title}</h2>
                    <p className="text-white/60 text-xs mt-0.5">{section.links.length} resources</p>
                </div>
            </div>

            {/* Links */}
            <div className="divide-y divide-slate-50">
                {section.links.map((link) => (
                    <LinkCard key={link.url} {...link} />
                ))}
            </div>
        </div>
    );
}

export default function Links() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-1.5 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                        <span className="text-blue-300 text-xs font-medium tracking-widest uppercase">
                            FinTaxVers Resource Hub
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        Useful Financial &amp;{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Government Links
                        </span>
                    </h1>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Quick access to trusted government, finance, taxation, compliance, banking,
                        stock market, and CA resources — all in one place.
                    </p>

                    {/* Stats bar */}
                    <div className="flex justify-center gap-8 mt-10 flex-wrap">
                        {[
                            { num: sections.length, label: "Categories" },
                            { num: sections.reduce((a, s) => a + s.links.length, 0), label: "Resources" },
                            { num: "100%", label: "Verified Links" },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-bold text-white">{stat.num}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Jump Nav */}
                <div className="flex flex-wrap gap-2 mb-10 justify-center">
                    {sections.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150 shadow-sm"
                        >
                            <span>{s.icon}</span>
                            {s.title}
                        </a>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sections.map((section) => (
                        <div key={section.id} id={section.id}>
                            <SectionCard section={section} />
                        </div>
                    ))}
                </div>

                {/* Footer note */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400">
                        All links open in a new tab. Resources are curated for informational purposes only.
                        <br />
                        <span className="text-slate-500 font-medium">FinTaxVers</span> does not guarantee the accuracy of third-party content.
                    </p>
                </div>
            </div>
        </div>
    );
}
