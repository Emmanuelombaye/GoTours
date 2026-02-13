import React from 'react'

export default function SkeletonCard() {
    return (
        <div className="flex flex-col gap-2 animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-square w-full bg-gray-200 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" style={{ backgroundSize: '1000px 100%' }}></div>
            </div>

            {/* Text Content Skeleton */}
            <div className="flex flex-col gap-1 mt-1">
                {/* Title & Rating line */}
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>

                {/* Subtitle / Location */}
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                {/* Date / Availability */}
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>

                {/* Price */}
                <div className="h-4 bg-gray-200 rounded w-24 mt-1"></div>
            </div>
        </div>
    )
}
