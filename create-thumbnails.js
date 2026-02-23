// Node.js script to create thumbnails for all villa images
// Run with: node create-thumbnails.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
    sourceDir: 'public/images/villas',
    thumbnailDir: 'public/images/villas/thumbnails',
    thumbnailSize: { width: 400, height: 300 },
    quality: 85,
    formats: ['jpg', 'jpeg', 'png', 'webp']
};

async function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
}

async function createThumbnail(sourcePath, thumbnailPath) {
    try {
        await sharp(sourcePath)
            .resize(config.thumbnailSize.width, config.thumbnailSize.height, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: config.quality })
            .toFile(thumbnailPath);
        
        return true;
    } catch (error) {
        console.error(`❌ Error creating thumbnail for ${sourcePath}:`, error.message);
        return false;
    }
}

async function processVillaFolder(villaFolder) {
    const villaPath = path.join(config.sourceDir, villaFolder);
    const stats = { processed: 0, skipped: 0, errors: 0 };
    
    console.log(`🏠 Processing ${villaFolder}...`);
    
    // Get all image files in the villa folder
    const files = fs.readdirSync(villaPath);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase().substring(1);
        return config.formats.includes(ext);
    });
    
    for (const file of imageFiles) {
        const sourcePath = path.join(villaPath, file);
        const thumbnailName = `${villaFolder}_${file}`;
        const thumbnailPath = path.join(config.thumbnailDir, thumbnailName);
        
        // Skip if thumbnail already exists
        if (fs.existsSync(thumbnailPath)) {
            stats.skipped++;
            continue;
        }
        
        // Create thumbnail
        const success = await createThumbnail(sourcePath, thumbnailPath);
        if (success) {
            stats.processed++;
            console.log(`  ✅ Created thumbnail: ${thumbnailName}`);
        } else {
            stats.errors++;
        }
    }
    
    return stats;
}

async function main() {
    console.log('🚀 Creating thumbnails for villa images...\n');
    
    // Check if sharp is installed
    try {
        require('sharp');
    } catch (error) {
        console.error('❌ Sharp not found. Please install it first:');
        console.error('📦 npm install sharp\n');
        process.exit(1);
    }
    
    // Ensure thumbnail directory exists
    await ensureDirectory(config.thumbnailDir);
    
    // Get all villa folders
    const folders = fs.readdirSync(config.sourceDir)
        .filter(item => {
            const itemPath = path.join(config.sourceDir, item);
            return fs.statSync(itemPath).isDirectory() && item.startsWith('villa-');
        })
        .sort((a, b) => {
            const aNum = parseInt(a.replace('villa-', ''));
            const bNum = parseInt(b.replace('villa-', ''));
            return aNum - bNum;
        });
    
    if (folders.length === 0) {
        console.log('❌ No villa folders found in', config.sourceDir);
        return;
    }
    
    console.log(`📁 Found ${folders.length} villa folders\n`);
    
    // Process all folders
    const totalStats = { processed: 0, skipped: 0, errors: 0 };
    
    for (const folder of folders) {
        const stats = await processVillaFolder(folder);
        totalStats.processed += stats.processed;
        totalStats.skipped += stats.skipped;
        totalStats.errors += stats.errors;
    }
    
    // Print summary
    console.log('\n🎉 Thumbnail creation complete!\n');
    console.log('📊 Summary:');
    console.log(`  ✅ Thumbnails created: ${totalStats.processed}`);
    console.log(`  ⏭️  Skipped (already exist): ${totalStats.skipped}`);
    console.log(`  ❌ Errors: ${totalStats.errors}`);
    console.log(`  📁 Thumbnail directory: ${config.thumbnailDir}`);
    
    if (totalStats.processed > 0) {
        console.log('\n💡 Tips:');
        console.log('  • Thumbnails are now ready for lazy loading');
        console.log('  • Each thumbnail is ~400x300 pixels');
        console.log('  • Run this script whenever you add new images');
    }
}

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught error:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Run the script
main().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
});
