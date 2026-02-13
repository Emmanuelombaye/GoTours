import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 text-sm text-gray-700 mt-12 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Column 1: Support */}
                <div className="space-y-4">
                    <h5 className="font-bold text-gray-900">Support</h5>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">AirCover</a></li>
                        <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
                        <li><a href="#" className="hover:underline">Disability support</a></li>
                        <li><a href="#" className="hover:underline">Cancellation options</a></li>
                        <li><a href="#" className="hover:underline">Report neighborhood concern</a></li>
                    </ul>
                </div>

                {/* Column 2: Hosting */}
                <div className="space-y-4">
                    <h5 className="font-bold text-gray-900">Hosting</h5>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                        <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                        <li><a href="#" className="hover:underline">Hosting resources</a></li>
                        <li><a href="#" className="hover:underline">Community forum</a></li>
                        <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
                        <li><a href="#" className="hover:underline">Join a free Hosting class</a></li>
                    </ul>
                </div>

                {/* Column 3: Airbnb */}
                <div className="space-y-4">
                    <h5 className="font-bold text-gray-900">Airbnb</h5>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline">Newsroom</a></li>
                        <li><a href="#" className="hover:underline">New features</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Investors</a></li>
                        <li><a href="#" className="hover:underline">Gift cards</a></li>
                        <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
                    </ul>
                </div>

                {/* Column 4: Newsletter / Promo (Optional, kept minimal for exact match) */}
                {/* Often hidden or merged in smaller view, but for 4-col layout we can leave it or add specific Kenyan/Local context */}
                <div className="space-y-4">
                    <h5 className="font-bold text-gray-900">GoTours</h5>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline">About us</a></li>
                        <li><a href="#" className="hover:underline">Partnerships</a></li>
                        <li><a href="#" className="hover:underline">Media assets</a></li>
                        <li><a href="#" className="hover:underline">Advertising</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap items-center gap-2 text-sm justify-center md:justify-start">
                    <span>© 2025 GoTours, Inc.</span>
                    <span className="hidden md:inline">·</span>
                    <a href="#" className="hover:underline">Privacy</a>
                    <span className="hidden md:inline">·</span>
                    <a href="#" className="hover:underline">Terms</a>
                    <span className="hidden md:inline">·</span>
                    <a href="#" className="hover:underline">Sitemap</a>
                </div>

                <div className="flex items-center gap-6 font-semibold">
                    <button className="flex items-center gap-2 hover:underline">
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '16px', width: '16px', fill: 'currentcolor' }}><path d="M8 .25a7.77 7.77 0 0 1 7.75 7.78 7.75 7.75 0 0 1-7.52 7.72h-.25A7.75 7.75 0 0 1 .25 8.24v-.25A7.75 7.75 0 0 1 8 .25zm1.95 8.5h-3.9c.15 2.9 1.17 5.34 1.88 5.5H8c.68 0 1.72-2.37 1.93-5.23zm4.26 0h-2.76c-.09 1.96-.53 3.74-1.18 5.08A6.26 6.26 0 0 0 14.17 9zm-9.67 0H1.8a6.26 6.26 0 0 0 3.94 5.08 12.59 12.59 0 0 1-1.22-4.7zm3.9-1.5h-3.9C6.6 4.32 7.6 2 8 2c.68 0 1.72 2.37 1.93 5.23zm-8.56 0h2.76c.09-1.96.53-3.74 1.18-5.08A6.26 6.26 0 0 1 1.8 7.5zm12.37 0h-2.76c-.09-1.96-.53-3.74-1.18-5.08A6.26 6.26 0 0 0 14.17 7.5z"></path></svg>
                        <span>English (US)</span>
                    </button>
                    <button className="flex items-center gap-2 hover:underline">
                        <span>Ksh</span>
                        <span>KES</span>
                    </button>
                    <div className="flex items-center gap-3 ml-2">
                        {/* Social Icons Placeholder */}
                        <a href="#" className="hover:opacity-75"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ height: '18px', width: '18px', display: 'block', fill: 'currentcolor' }}><path d="m15.9961 11.2305c1.6816 0 2.2285-1.1641 2.3086-1.5977 0 0 .5098-2.6152-2.1445-4.4824-.0352 2.3398-1.543 3.8672-3.834 4.3164v-6.3262c0-.9863-.8223-1.7852-1.834-1.7852-.9863 0-1.7852.7988-1.7852 1.7852v6.4355c-2.3398-.2402-4.0078-1.7344-4.041-4.1445-2.6543 1.8672-2.1445 4.4824-2.1445 4.4824.0801.4336.627 1.5977 2.3086 1.5977h4.0918v5.1328c0 .9863.7988 1.7852 1.7852 1.7852.9863 0 1.7852-.7988 1.7852-1.7852v-5.1289h3.5z"></path></svg></a>
                        <a href="#" className="hover:opacity-75"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ height: '18px', width: '18px', display: 'block', fill: 'currentcolor' }}><path d="m16.9961 8.9258c0 4.1055-3.1113 7.4883-7.1133 7.9746v-5.6309h2.3965l.4434-2.8438h-2.8398v-1.7227c0-.9102.3926-1.5273 1.9316-1.5273h1.4941v-2.3652c-.75-.1211-1.8906-.2324-2.8809-.2324-2.9199 0-4.8516 1.752-4.8516 5.0645v2.7812h-3.2305v2.8438h3.2305v5.6309c-4.2207-.3438-7.5742-3.793-7.5742-7.9746 0-4.4238 3.5781-8.0078 8.0019-8.0078 4.4239 0 8.002 3.584 8.002 8.0078z"></path></svg></a>
                        <a href="#" className="hover:opacity-75"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ height: '18px', width: '18px', display: 'block', fill: 'currentcolor' }}><path d="m15.8203 2.0566c-.6367-.2851-1.3203-.4902-2.0391-.5781.7324-.4414 1.2598-1.1347 1.5215-1.9668-.6875.4082-1.4473.7051-2.2539.8652-.6484-.6933-1.5723-1.127-2.6035-1.127-2.2617 0-3.9512 2.0742-3.4688 4.3164-2.9512-.1484-5.5684-1.5625-7.3203-3.7129-.791 1.3613-.4082 3.123 1.0547 4.1035-.5586-.0176-1.084-.1719-1.543-.4277.0137 1.8926 1.3653 3.6309 3.2617 4.0117-.584.1582-1.2227.1855-1.8516.0645.541 1.625 2.0527 2.7246 3.7969 2.7578-1.4238 1.1152-3.2168 1.6367-5.0137 1.4238 1.8379 1.1777 4.0195 1.8652 6.3633 1.8652 7.7305 0 12.0645-6.5293 11.8262-12.4492.8125-.5899 1.5176-1.3262 2.0703-2.1524z"></path></svg></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
