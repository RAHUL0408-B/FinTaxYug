import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ title, description, keywords, canonical, ogImage = 'https://fintaxvers.com/image_c26745.png', schema = null, articleSchema = null }) => {
    const fullTitle = title ? `${title} | FinTaxVers Consultancy – Nagpur` : 'Trusted Financial Consultancy Services in Nagpur | FinTaxVers – Yugant Rahele';
    const metaDesc = description || 'FinTaxVers Consultancy Services – Best financial consultant in Nagpur. Expert GST registration, income tax filing, business loan project reports & CMA reports. Founded by Yugant Rahele. Call +91-8928895195.';
    const canonicalUrl = canonical || 'https://fintaxvers.com/';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content={articleSchema ? 'article' : 'website'} />
            <meta property="og:site_name" content="FinTaxVers Consultancy Services" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDesc} />
            <meta name="twitter:image" content={ogImage} />
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
            {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
        </Helmet>
    );
};

export default SEOHead;
