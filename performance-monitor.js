// Performance monitoring for villa image loading
// Add this to your main application to track image performance

class ImagePerformanceMonitor {
    constructor() {
        this.metrics = {
            totalImages: 0,
            loadedImages: 0,
            failedImages: 0,
            totalLoadTime: 0,
            averageLoadTime: 0,
            largestImage: null,
            smallestImage: null,
            imageSizes: []
        };
        this.imageLoadTimes = [];
        this.observers = [];
    }

    // Start monitoring an image
    startImageLoad(src, element) {
        const startTime = performance.now();
        const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Store start time
        element.dataset.imageId = imageId;
        element.dataset.startTime = startTime;
        
        // Track image size if available
        if (src && !src.startsWith('data:')) {
            this.getImageSize(src).then(size => {
                if (size) {
                    this.metrics.imageSizes.push({ src, size, imageId });
                }
            });
        }
        
        this.metrics.totalImages++;
        return imageId;
    }

    // End monitoring an image
    endImageLoad(element, success = true) {
        const startTime = parseFloat(element.dataset.startTime);
        const imageId = element.dataset.imageId;
        
        if (startTime) {
            const loadTime = performance.now() - startTime;
            this.imageLoadTimes.push(loadTime);
            this.metrics.totalLoadTime += loadTime;
            
            if (success) {
                this.metrics.loadedImages++;
            } else {
                this.metrics.failedImages++;
            }
            
            // Update largest/smallest
            this.updateSizeMetrics(imageId);
            this.calculateAverageLoadTime();
        }
    }

    // Get image size (if possible)
    async getImageSize(src) {
        try {
            const response = await fetch(src, { method: 'HEAD' });
            const contentLength = response.headers.get('content-length');
            return contentLength ? parseInt(contentLength) : null;
        } catch (error) {
            return null;
        }
    }

    // Update size metrics
    updateSizeMetrics(imageId) {
        const imageData = this.metrics.imageSizes.find(img => img.imageId === imageId);
        if (imageData) {
            if (!this.metrics.largestImage || imageData.size > this.metrics.largestImage.size) {
                this.metrics.largestImage = imageData;
            }
            if (!this.metrics.smallestImage || imageData.size < this.metrics.smallestImage.size) {
                this.metrics.smallestImage = imageData;
            }
        }
    }

    // Calculate average load time
    calculateAverageLoadTime() {
        if (this.imageLoadTimes.length > 0) {
            this.metrics.averageLoadTime = this.imageLoadTimes.reduce((a, b) => a + b, 0) / this.imageLoadTimes.length;
        }
    }

    // Get performance report
    getReport() {
        const successRate = this.metrics.totalImages > 0 ? 
            (this.metrics.loadedImages / this.metrics.totalImages * 100).toFixed(1) : 0;
        
        return {
            ...this.metrics,
            successRate: `${successRate}%`,
            totalSize: this.metrics.imageSizes.reduce((sum, img) => sum + img.size, 0),
            averageImageSize: this.metrics.imageSizes.length > 0 ? 
                Math.round(this.metrics.imageSizes.reduce((sum, img) => sum + img.size, 0) / this.metrics.imageSizes.length / 1024) : 0
        };
    }

    // Log performance report
    logReport() {
        const report = this.getReport();
        
        console.group('🖼️ Image Performance Report');
        console.log('📊 Statistics:');
        console.log(`  Total images: ${report.totalImages}`);
        console.log(`  Loaded: ${report.loadedImages}`);
        console.log(`  Failed: ${report.failedImages}`);
        console.log(`  Success rate: ${report.successRate}`);
        console.log(`  Average load time: ${Math.round(report.averageLoadTime)}ms`);
        console.log(`  Total load time: ${Math.round(report.totalLoadTime)}ms`);
        
        if (report.averageImageSize > 0) {
            console.log(`  Average image size: ${report.averageImageSize}KB`);
        }
        
        if (report.largestImage) {
            console.log(`  Largest image: ${Math.round(report.largestImage.size / 1024)}KB (${report.largestImage.src.split('/').pop()})`);
        }
        
        if (report.smallestImage) {
            console.log(`  Smallest image: ${Math.round(report.smallestImage.size / 1024)}KB (${report.smallestImage.src.split('/').pop()})`);
        }
        
        console.groupEnd();
    }

    // Setup automatic monitoring
    setupAutoMonitoring() {
        // Monitor all images on the page
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'IMG') {
                        this.monitorImage(node);
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('img').forEach(img => this.monitorImage(img));
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        this.observers.push(observer);

        // Monitor existing images
        document.querySelectorAll('img').forEach(img => this.monitorImage(img));
    }

    // Monitor a single image
    monitorImage(img) {
        if (img.dataset.monitored) return;
        
        img.dataset.monitored = 'true';
        const imageId = this.startImageLoad(img.src, img);
        
        const onLoad = () => {
            this.endImageLoad(img, true);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
        
        const onError = () => {
            this.endImageLoad(img, false);
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
        };
        
        img.addEventListener('load', onLoad);
        img.addEventListener('error', onError);
    }

    // Reset metrics
    reset() {
        this.metrics = {
            totalImages: 0,
            loadedImages: 0,
            failedImages: 0,
            totalLoadTime: 0,
            averageLoadTime: 0,
            largestImage: null,
            smallestImage: null,
            imageSizes: []
        };
        this.imageLoadTimes = [];
    }

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Export for use in components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImagePerformanceMonitor;
} else if (typeof window !== 'undefined') {
    window.ImagePerformanceMonitor = ImagePerformanceMonitor;
}

// Usage example:
// const monitor = new ImagePerformanceMonitor();
// monitor.setupAutoMonitoring();
// 
// // Log report every 10 seconds
// setInterval(() => monitor.logReport(), 10000);
// 
// // Log report when page is fully loaded
// window.addEventListener('load', () => {
//     setTimeout(() => monitor.logReport(), 2000);
// });
