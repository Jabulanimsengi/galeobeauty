const fs = require('fs');

const extractIds = (content) => {
    const ids = [];
    const regex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        ids.push(match[1]);
    }
    return ids;
};

const oldContent = fs.readFileSync('old_services2.ts', 'utf8');
const oldIds = extractIds(oldContent);

const currentContent = fs.readFileSync('src/lib/services-content.ts', 'utf8');
const currentIds = extractIds(currentContent);

const missingInCurrent = [...new Set(oldIds.filter(id => !currentIds.includes(id)))];
console.log('Old slugs from 8c5e907 missing from current:');
console.log(JSON.stringify(missingInCurrent, null, 2));
