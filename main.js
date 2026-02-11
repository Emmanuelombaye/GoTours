document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS for scroll animations
    if (window.AOS) {
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: false, offset: 120 });
    }

    const header = document.querySelector('header');

    // Header shadow / color on scroll
    function onScrollHeader() {
        if (!header) return;
        if (window.scrollY > 24) header.classList.add('shadow-lg', 'backdrop-blur-sm');
        else header.classList.remove('shadow-lg', 'backdrop-blur-sm');
    }
    onScrollHeader();
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    // Mobile nav
    const mobileToggle = document.querySelector('.mobile-toggle');
    mobileToggle && mobileToggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('nav-open');
        mobileToggle.setAttribute('aria-expanded', String(open));
    });

    // Smooth scrolling for anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Favorite toggles
    document.querySelectorAll('.card-favorite').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        btn.classList.toggle('liked');
        const icon = btn.querySelector('i');
        if (icon) icon.classList.toggle('ph-heart-fill');
    }));

    // Quick view modal (delegated)
    const quickModal = document.getElementById('quick-view-modal');
    document.addEventListener('click', (e) => {
        const q = e.target.closest('.btn-quick');
        if (q && quickModal) {
            quickModal.style.display = 'block'; quickModal.setAttribute('aria-hidden','false');
        }
    });
    document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => { m.style.display='none'; m.setAttribute('aria-hidden','true'); });
    }));

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    document.addEventListener('click', (e) => {
        const img = e.target.closest('[data-light]');
        if (img && lightbox) {
            const src = img.dataset.light || img.src;
            const lb = lightbox.querySelector('img'); lb.src = src;
            lightbox.style.display = 'block'; lightbox.setAttribute('aria-hidden','false');
        }
    });
    document.querySelectorAll('.lb-close').forEach(b => b.addEventListener('click', () => { if (lightbox) { lightbox.style.display='none'; lightbox.setAttribute('aria-hidden','true'); } }));

    // Escape closes
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.querySelectorAll('.modal, #lightbox').forEach(m => { m.style.display='none'; m.setAttribute('aria-hidden','true'); }); });
});

// --- Client-side listings + filters + focus-trap ---
(function () {
    // Simple focus trap utility
    function trapFocus(modal) {
        const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return () => {};
        let first = focusable[0];
        let last = focusable[focusable.length - 1];
        const keyHandler = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', keyHandler);
        // focus first element
        setTimeout(() => first.focus(), 10);
        return () => document.removeEventListener('keydown', keyHandler);
    }

    // Open/close helpers with focus trapping
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'block'; modal.setAttribute('aria-hidden','false');
        modal.dataset._focusRestore = document.activeElement ? document.activeElement.tagName : '';
        const release = trapFocus(modal);
        modal.dataset._release = 'true';
        modal._releaseFn = release;
    }
    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none'; modal.setAttribute('aria-hidden','true');
        if (modal._releaseFn) modal._releaseFn();
        try { document.body.querySelector('.open-booking')?.focus(); } catch (e) {}
    }

    // Apply to quick view, booking, lightbox
    ['quick-view-modal','booking-modal','lightbox'].forEach(id => {
        const m = document.getElementById(id);
        if (!m) return;
        m.addEventListener('click', (e) => { if (e.target === m) closeModal(m); });
    });

    document.querySelectorAll('.btn-quick').forEach(b => b.addEventListener('click', (e) => {
        const m = document.getElementById('quick-view-modal'); openModal(m);
    }));
    document.querySelectorAll('.open-booking').forEach(b => b.addEventListener('click', (e) => {
        const m = document.getElementById('booking-modal'); openModal(m);
    }));
    document.querySelectorAll('.modal-close').forEach(b => b.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal') || e.target.closest('.modal-content'); if (modal) closeModal(modal.closest('.modal') || modal);
    }));

    // Listings rendering and filters
    const listingsGrid = document.getElementById('listings-grid');
    const priceRange = document.getElementById('price-range');
    const priceVal = document.getElementById('price-val');
    const bedroomsSelect = document.getElementById('bedrooms-select');
    const amenityBtns = document.querySelectorAll('.amenity-btn');
    const resetBtn = document.getElementById('reset-filters');

    let villas = [];

    function renderListings(items) {
        if (!listingsGrid) return;
        listingsGrid.innerHTML = '';
        items.forEach((v, i) => {
            const art = document.createElement('article');
            art.className = 'bg-white rounded-lg overflow-hidden card-hover';
            art.setAttribute('data-aos','fade-up');
            art.setAttribute('data-aos-delay', String(80 + (i*40)));
            art.innerHTML = `
                <a href="villa.html" class="block relative">
                    <img loading="lazy" src="${v.image}" alt="${v.title}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://via.placeholder.com/800x600?text=GoToursBooking'">
                    <div class="absolute inset-0 flex items-end justify-center pb-3"><button class="btn-quick bg-ocean-600 text-white px-3 py-2 rounded" data-id="${v.id}">Quick View</button></div>
                </a>
                <div class="p-4 flex items-start justify-between">
                    <div>
                        <h3 class="font-semibold">${v.title}</h3>
                        <div class="text-sm text-gray-500">${v.location} · ${v.guests} guests</div>
                    </div>
                    <div class="text-right"><div class="font-bold">Ksh ${v.price.toLocaleString()}</div><div class="text-sm text-gray-500">/ night</div></div>
                </div>
            `;
            listingsGrid.appendChild(art);
        });
        if (window.AOS) AOS.refresh();
    }

    function applyFilters() {
        if (!villas.length) return;
        const maxPrice = priceRange ? Number(priceRange.value) : Infinity;
        if (priceVal) priceVal.textContent = Intl.NumberFormat().format(maxPrice);
        const minBeds = bedroomsSelect ? Number(bedroomsSelect.value) : 0;
        const activeAmenities = Array.from(amenityBtns).filter(b=>b.classList.contains('active')).map(b=>b.dataset.amenity);

        const filtered = villas.filter(v => v.price <= maxPrice && v.bedrooms >= minBeds && activeAmenities.every(a => v.amenities.includes(a)));
        renderListings(filtered);
    }

    // Amenity button toggles
    amenityBtns.forEach(b => b.addEventListener('click', () => { b.classList.toggle('active'); applyFilters(); }));
    priceRange && priceRange.addEventListener('input', applyFilters);
    bedroomsSelect && bedroomsSelect.addEventListener('change', applyFilters);
    resetBtn && resetBtn.addEventListener('click', () => {
        if (priceRange) { priceRange.value = priceRange.max; }
        if (bedroomsSelect) { bedroomsSelect.value = '0'; }
        amenityBtns.forEach(b=>b.classList.remove('active'));
        applyFilters();
    });

    // Load demo data
    fetch('./data/villas.json').then(r => r.json()).then(data => { villas = data; renderListings(villas); }).catch(err => { console.warn('Failed to load villas.json', err); });
})();
