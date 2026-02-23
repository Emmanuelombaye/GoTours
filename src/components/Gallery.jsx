import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const OptimizedImage = ({ src, alt, className, loading = 'lazy', priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Generate thumbnail URL
    const thumbnailSrc = src.replace('/villas/', '/villas/thumbnails/').replace(/\.(jpg|png|webp)$/, '_thumb.$1');

    useEffect(() => {
        // Preload priority images
        if (priority && src) {
            const img = new Image();
            img.onload = () => {
                setIsLoaded(true);
                setCurrentSrc(src);
            };
            img.onerror = () => setError(true);
            img.src = src;
        }
    }, [src, priority]);

    if (error) {
        return (
            <div className={`${className} bg-gray-200 flex items-center justify-center`}>
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Thumbnail/placeholder */}
            {!isLoaded && (
                <img
                    src={thumbnailSrc}
                    alt=""
                    className={`${className} absolute inset-0 blur-sm scale-110`}
                    style={{ filter: 'blur(20px)' }}
                />
            )}
            
            {/* Main image */}
            <img
                src={priority ? currentSrc : src}
                alt={alt}
                className={`${className} transition-all duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading={priority ? 'eager' : loading}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className={`${className} absolute inset-0 bg-gray-200 animate-pulse`} />
            )}
        </div>
    );
};

const Gallery = ({ images = [], gallery = {}, onOpenPhotos }) => {
    const [visibleImages, setVisibleImages] = useState(5);
    const [loadingTime, setLoadingTime] = useState(null);

    // Collect all images from the categorized gallery if available
    const galleryImages = Object.values(gallery).flat();

    // Airbnb style grid: 1 large main image on left, 4 smaller ones on right (2x2)
    const mainImage = images[0] || galleryImages[0] || 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200';

    // Use gallery images for sub-images if we have enough, otherwise fallback to placeholders
    const subImages = galleryImages.length >= 5
        ? galleryImages.slice(1, 5)
        : [
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800'
        ];

    // Track loading performance
    useEffect(() => {
        const startTime = performance.now();
        
        const imagePromises = [
            new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve;
                img.src = mainImage;
            }),
            ...subImages.slice(0, 4).map(src => 
                new Promise((resolve) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = resolve;
                    img.src = src;
                })
            )
        ];

        Promise.all(imagePromises).then(() => {
            const endTime = performance.now();
            setLoadingTime(Math.round(endTime - startTime));
        });
    }, [mainImage, subImages]);

    return (
        <div className="w-full px-6 lg:px-20">
            {/* Performance indicator */}
            {loadingTime && (
                <div className="text-xs text-gray-500 mb-2 text-center">
                    Images loaded in {loadingTime}ms
                </div>
            )}
            
            <div className="relative group max-w-[1440px] mx-auto">
                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[460px] rounded-xl overflow-hidden cursor-pointer"
                    onClick={onOpenPhotos}
                >
                    {/* Large Main Image */}
                    <div className="md:col-span-2 h-full relative overflow-hidden">
                        <OptimizedImage
                            src={mainImage}
                            alt="Villa main"
                            className="w-full h-full object-cover relative z-10"
                            priority={true}
                        />
                    </div>

                    {/* Small Images Grid */}
                    <div className="hidden md:grid grid-cols-2 grid-rows-2 col-span-2 gap-2 h-full">
                        {subImages.slice(0, visibleImages - 1).map((src, idx) => (
                            <div key={idx} className="relative h-full overflow-hidden">
                                <OptimizedImage
                                    src={src}
                                    alt={`Villa view ${idx + 1}`}
                                    className="w-full h-full object-cover relative z-10"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Show more photos button (floating bottom right) */}
                <button
                    onClick={onOpenPhotos}
                    className="absolute bottom-6 right-6 bg-white border border-slate-900 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 shadow-md hover:bg-slate-50 transition-colors z-10"
                >
                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor">
                        <path d="M5 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-6 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm6-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 1c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM5 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                    </svg>
                    Show all photos
                </button>
            </div>
        </div>
    );
};

export default Gallery;
