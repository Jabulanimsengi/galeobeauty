import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import https from 'https';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_URL ? process.env.CLOUDINARY_URL.split('://')[1].split(':')[0] : undefined,
    api_secret: process.env.CLOUDINARY_URL ? process.env.CLOUDINARY_URL.split(':')[2].split('@')[0] : undefined
});

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');

function downloadImage(url: string, dest: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
}

async function main() {
    console.log('Fetching image list from Cloudinary (galeobeauty/)...');
    try {
        // Fetch all resources in the galeobeauty/ prefix
        let nextCursor = null;
        let allResources: any[] = [];
        do {
            const result: any = await cloudinary.api.resources({
                type: 'upload',
                prefix: 'galeobeauty/',
                max_results: 500,
                next_cursor: nextCursor
            });
            allResources = allResources.concat(result.resources);
            nextCursor = result.next_cursor;
        } while (nextCursor);

        console.log(`Found ${allResources.length} images.`);

        if (!fs.existsSync(IMAGES_DIR)) {
            fs.mkdirSync(IMAGES_DIR, { recursive: true });
        }

        for (const resource of allResources) {
            // public_id looks like: galeobeauty/Category/filename or galeobeauty/filename
            const relativePath = resource.public_id.replace('galeobeauty/', '');
            const parts = relativePath.split('/');

            // Reconstruct the folder
            let folderPath = '';
            let filename = parts.pop() + '.' + resource.format; // Reconstruct filename

            if (parts.length > 0) {
                folderPath = parts.join('/');
            }

            const targetDir = path.join(IMAGES_DIR, folderPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }

            const destPath = path.join(targetDir, filename);
            console.log(`Downloading ${resource.url} to ${destPath}`);
            await downloadImage(resource.secure_url, destPath);
        }

        console.log('✨ Restoration complete!');
    } catch (error) {
        console.error('Failed to restore images:', error);
    }
}

main();
