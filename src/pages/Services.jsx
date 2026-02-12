import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const servicesData = [
    {
        id: "hospitality",
        title: "Hospitality & Luxury Travel",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        description: "Premium on-site services to make your stay unforgettable.",
        items: [
            "Private Chef & Fine Dining",
            "Luxury Airport Transfers",
            "Guided Safari Adventures",
            "Spa & Wellness Retreats",
            "Deep Sea Fishing Trips",
            "Personal Concierge Services",
            "Event Planning & Coordination",
            "Nanny & Childcare Services",
            "Grocery Shopping & Pre-stocking",
            "Private Security & Bodyguards"
        ]
    },
    {
        id: "chefs",
        title: "Executive Chef Services",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6v-7.13z" />
                <line x1="6" y1="17" x2="18" y2="17" />
            </svg>
        ),
        description: "World-class culinary experiences in the privacy of your villa.",
        items: [
            "Private In-Villa Chef",
            "Gourmet Meal Planning",
            "Swahili Fusion Cuisine",
            "Beachfront BBQ Arrangements",
            "Personalized Dietary Menus",
            "Waiters & Hospitality Staff"
        ]
    },
    {
        id: "training",
        title: "Technical & Skills Training",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
        ),
        description: "Empowering your stay with knowledge and digital skills.",
        items: [
            "Coding Training (React, Python, Web Dev)",
            "Business Tech Training",
            "AI Tools Training",
            "Staff Digital Skills Training",
            "1-on-1 Tech Mentorship",
            "System Documentation & Tutorials"
        ]
    },
    {
        id: "massage",
        title: "Massage & Wellness",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
            </svg>
        ),
        description: "Professional on-site therapeutic sessions for complete relaxation.",
        items: [
            "Full Body Aromatherapy",
            "Deep Tissue Massage",
            "Swahili Traditional Spa",
            "Reflexology & Foot Care",
            "Yoga & Meditation Classes",
            "Organic Skincare Treatments"
        ]
    },
    {
        id: "web",
        title: "Web Design & Development",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        description: "High-performance digital experiences tailored for growth.",
        items: [
            "Website Design (Business, Portfolio, Corporate)",
            "Website Development (Custom / WordPress)",
            "Landing Page Design (Sales Funnels)",
            "E-commerce Store Setup (Shopify / WooCommerce)",
            "Website Redesign & Optimization",
            "Speed Optimization & Performance Tuning",
            "SEO Optimization (On-page & Technical)",
            "Website Maintenance & Support",
            "Web App Development (React / Laravel / Node)",
            "Admin Dashboards & Management Panels"
        ]
    },
    {
        id: "mobile",
        title: "Mobile App Development",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        description: "Seamless mobile experiences for iOS and Android.",
        items: [
            "Android App Development",
            "iOS App Development",
            "Cross-Platform Apps (Flutter / React Native)",
            "App UI/UX Design (Figma)",
            "App Prototyping & Demo Builds",
            "App Publishing (Play Store / App Store)",
            "App Maintenance & Updates"
        ]
    },
    {
        id: "design",
        title: "UI/UX & Product Design",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.5 1.5" />
                <path d="M7 11l-5-5" />
                <path d="M5 9l4 4" />
            </svg>
        ),
        description: "User-centric designs that convert and delight.",
        items: [
            "UI/UX Design (Web & Mobile)",
            "Figma Prototypes & Interactive Mockups",
            "SaaS Dashboard Design",
            "System Design (School / POS / CRM / Real Estate)",
            "Product Redesign & UX Optimization",
            "User Flow & Wireframe Creation"
        ]
    },
    {
        id: "ai",
        title: "AI & Automation",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        description: "Leveraging intelligence to scale your business operations.",
        items: [
            "AI Chatbots (Customer Support / Sales)",
            "Workflow Automation (n8n / Zapier)",
            "Lead Generation Automation",
            "AI Content Generation Systems",
            "Business Process Automation",
            "AI-Powered Customer Service Bots",
            "Data Scraping & Automated Research",
            "Smart Recommendation Systems"
        ]
    },
    {
        id: "software",
        title: "Custom Software",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="2" x2="10" y2="22" />
            </svg>
        ),
        description: "Bespoke systems built for your specific business needs.",
        items: [
            "Custom Business Software",
            "POS Systems",
            "Incident Reporting Systems",
            "School Management Systems",
            "Hospital Management Systems",
            "Rental & Property Management Systems",
            "Booking & Scheduling Systems",
            "HR & Payroll Systems",
            "Inventory Management Systems"
        ]
    },
    {
        id: "enterprise",
        title: "Business & Enterprise",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        description: "Robust solutions for large-scale digital transformation.",
        items: [
            "CRM Setup (Client Management)",
            "ERP Systems",
            "Digital Transformation Consulting",
            "Workflow Optimization",
            "SaaS Platform Development",
            "Subscription Platforms",
            "Payment Integration (Stripe, PayPal, M-Pesa)",
            "Multi-User Role-Based Systems"
        ]
    },
    {
        id: "marketing",
        title: "Digital Growth",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
        ),
        description: "Data-driven strategies to amplify your brand reach.",
        items: [
            "Social Media Automation",
            "Ad Campaign Tech Setup (Facebook / Google)",
            "Funnel Building & Optimization",
            "Email Marketing Systems",
            "Lead Capture Systems",
            "Marketing Analytics Dashboards",
            "Conversion Rate Optimization"
        ]
    },
    {
        id: "creative",
        title: "Branding & Creative",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
        description: "Visual identities that tell your unique story.",
        items: [
            "Logo Design & Brand Identity",
            "Graphic Design (Social Media, Ads)",
            "Video Editing & Motion Graphics",
            "Promo Video Creation",
            "AI Video Creation",
            "YouTube Branding & Thumbnails",
            "Presentation & Pitch Deck Design"
        ]
    },
    {
        id: "security",
        title: "Security & IT",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        description: "Hardening your infrastructure against modern threats.",
        items: [
            "Website Security Hardening",
            "Server Setup & Management",
            "Backup & Disaster Recovery",
            "Malware Removal",
            "IT Support & Troubleshooting",
            "Network Setup & Optimization",
            "Hosting & Domain Management"
        ]
    },
    {
        id: "data",
        title: "Data & Analytics",
        icon: (color) => (
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        description: "Turning raw data into actionable business intelligence.",
        items: [
            "Data Analysis & Visualization",
            "Business Intelligence Dashboards",
            "Market Research Automation",
            "Web Scraping & Lead Lists",
            "Performance Tracking Systems"
        ]
    },
]

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
            delayChildren: 0.1
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0, filter: "blur(8px)", rotate: -12 },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        rotate: 0,
        transition: { type: "spring", stiffness: 260, damping: 20 }
    }
}

const sidebarItem = {
    active: { x: 4, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 15 } },
    inactive: { x: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 15 } }
}

const iconVariant = {
    hidden: { rotate: -45, scale: 0.5, opacity: 0 },
    visible: {
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.2 }
    },
    hover: {
        rotate: 15,
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
}

export default function Services() {
    const [activeCategory, setActiveCategory] = React.useState(servicesData[0].id)
    const activeData = servicesData.find(s => s.id === activeCategory)

    // SEO Optimization: Dynamic Metadata & Title
    React.useEffect(() => {
        const categoryName = activeData?.title || 'Our Services'
        document.title = `${categoryName} | PwaniStays - Premium Villa & Tech Services`

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]')
        if (!metaDescription) {
            metaDescription = document.createElement('meta')
            metaDescription.name = "description"
            document.head.appendChild(metaDescription)
        }
        metaDescription.content = `Discover our premium ${categoryName.toLowerCase()} services at PwaniStays. From luxury villa hospitality to high-end tech execution.`
    }, [activeCategory, activeData])

    // SEO Optimization: Structured Data (JSON-LD)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": activeData?.title,
        "description": activeData?.description,
        "provider": {
            "@type": "LocalBusiness",
            "name": "PwaniStays",
            "url": window.location.origin
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": activeData?.title,
            "itemListElement": activeData?.items.map((item, index) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": item
                },
                "position": index + 1
            }))
        }
    }

    return (
        <div className="bg-[#fbfcff] min-h-screen pt-32 pb-24 font-['Outfit'] selection:bg-ocean-100 selection:text-ocean-900">
            {/* SEO: Visually Hidden H1 */}
            <h1 className="sr-only">PwaniStays Services: {activeData?.title}</h1>

            {/* SEO: JSON-LD Script Tag */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>

            {/* Background Orbs - Refined for subtle depth */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0">
                <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-ocean-200/40 to-transparent rounded-full blur-[160px] opacity-30 animate-pulse" />
                <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[45%] bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-[140px] opacity-25" />
                <div className="absolute top-[30%] right-[30%] w-[30%] h-[30%] bg-indigo-100/20 rounded-full blur-[120px] opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Sidebar Navigation - "Linear" Dashboard Style */}
                    <aside className="lg:col-span-3 sticky top-32 z-30 group/sidebar">
                        <div className="bg-white/50 backdrop-blur-3xl border border-white p-3 rounded-[36px] shadow-[0_20px_50px_rgba(30,41,59,0.06)] ring-1 ring-slate-200/40">
                            <div className="space-y-1.5 scrollbar-hide max-h-[70vh] overflow-y-auto pr-1">
                                {servicesData.map((cat) => (
                                    <motion.button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        variants={sidebarItem}
                                        animate={activeCategory === cat.id ? "active" : "inactive"}
                                        whileHover={{ x: 6 }}
                                        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[22px] transition-all duration-300 relative overflow-hidden ${activeCategory === cat.id
                                            ? 'bg-ocean-600 text-white shadow-2xl shadow-ocean-600/20'
                                            : 'text-slate-500 hover:text-slate-950 hover:bg-white/80'
                                            }`}
                                    >
                                        <motion.div
                                            variants={iconVariant}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                            className={`flex-shrink-0 p-2 rounded-xl transition-all duration-500 ${activeCategory === cat.id ? 'bg-white/15 text-white scale-110' : 'bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-ocean-600'
                                                }`}
                                        >
                                            {cat.icon("currentColor")}
                                        </motion.div>
                                        <span className="text-[13px] font-extrabold text-left leading-tight tracking-tight flex-1">{cat.title}</span>
                                        {activeCategory === cat.id && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="w-1.5 h-1.5 rounded-full bg-ocean-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                                                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                        </div>
                    </aside>

                    {/* Right Content Area - High Contrast Content */}
                    <main className="lg:col-span-9">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {/* Service Items Grid - Clean Minimal Cards (Definitive Figma Standard) */}
                                <div className="relative z-10">
                                    <motion.div
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
                                    >
                                        {activeData.items.map((srv, idx) => (
                                            <motion.div
                                                key={idx}
                                                variants={item}
                                                whileHover="hover"
                                                className="group/card relative bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-slate-200/50 hover:border-sky-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-5px_rgba(14,165,233,0.1),0_0_0_1px_rgba(14,165,233,0.05)] transition-all duration-500 overflow-hidden cursor-default select-none"
                                            >
                                                {/* Brand Accent Bar - Pure Figma UX */}
                                                <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b from-ocean-500 to-sky-400 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                                                {/* Glint Sheen Effect */}
                                                <motion.div
                                                    initial={{ x: "-150%", skewX: -20 }}
                                                    whileHover={{ x: "150%", transition: { duration: 0.8, ease: "easeInOut" } }}
                                                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-20"
                                                />

                                                <div className="flex items-center gap-7 relative z-10">
                                                    {/* Checkmark Orb - Premium Accent */}
                                                    <motion.div
                                                        variants={iconVariant}
                                                        className="flex-shrink-0 w-14 h-14 rounded-[22px] bg-gradient-to-br from-slate-50 to-white border border-slate-100/60 flex items-center justify-center text-slate-300 group-hover/card:text-ocean-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover/card:shadow-[inset_0_0_10px_rgba(56,189,248,0.1),0_8px_16px_rgba(14,165,233,0.08)] transition-all duration-700"
                                                    >
                                                        <svg className="w-7 h-7 transition-all duration-500 group-hover/card:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <polyline points="20 6 9 17 4 12" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </motion.div>
                                                    <div className="flex-1">
                                                        <h3 className="text-[21px] font-black text-slate-900 mb-1.5 group-hover/card:text-ocean-600 transition-all duration-500 tracking-[-0.03em] leading-none">
                                                            {srv}
                                                        </h3>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-1 bg-gradient-to-r from-ocean-500 to-sky-300 rounded-full scale-x-0 group-hover/card:scale-x-100 origin-left transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)" />
                                                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 opacity-0 group-hover/card:opacity-100 transition-all duration-700 translate-x-[-15px] group-hover/card:translate-x-0">Verified Excellence</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    )
}
