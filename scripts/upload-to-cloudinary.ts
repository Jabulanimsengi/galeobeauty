import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_URL?.match(/\/\/(.*?):/)?.[1],
    api_secret: process.env.CLOUDINARY_URL?.match(/:(.*?)@/)?.[1]
});

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');
const CLOUDINARY_FOLDER = 'galeobeauty';

async function uploadFile(filePath: string, subfolder: string) {
    const relativePath = path.join(subfolder, path.parse(filePath).name).replace(/\\/g, '/');
    const publicId = `${CLOUDINARY_FOLDER}/${relativePath}`;

    try {
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: publicId,
            overwrite: true,
            folder: '',
            resource_type: 'image'
        });
        console.log(`✅ Uploaded: ${result.secure_url}`);
        return result;
    } catch (error) {
        console.error(`❌ Failed to upload ${filePath}:`, error);
        throw error;
    }
}

async function processDirectory(directory: string, subfolder: string = '') {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        // Ignore hidden files like .DS_Store
        if (entry.name.startsWith('.')) continue;

        if (entry.isDirectory()) {
            await processDirectory(fullPath, path.join(subfolder, entry.name));
        } else if (entry.isFile()) {
            // Only process image files
            if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(entry.name)) {
                await uploadFile(fullPath, subfolder);
            }
        }
    }
}

async function main() {
    console.log('Starting Cloudinary bulk upload...');
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
        console.error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local');
        process.exit(1);
    }

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`Directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }

    try {
        await processDirectory(IMAGES_DIR);
        console.log('✨ All images uploaded successfully!');
    } catch (error) {
        console.error('Upload process failed:', error);
        process.exit(1);
    }
}

main();
