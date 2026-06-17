const fs = require('fs');
const path = require('path');

const filePath = 'C:\\Users\\windows 10\\.gemini\\antigravity-ide\\brain\\6634a4b9-fd25-4f0f-a451-86d19f825f17\\.system_generated\\steps\\29\\content.md';
const content = fs.readFileSync(filePath, 'utf-8');

// The JSON starts after the metadata and "---\n\n"
const parts = content.split('---\n\n');
const jsonStr = parts[parts.length - 1].trim();

try {
  const games = JSON.parse(jsonStr);
  console.log('Total games:', games.length);
  
  const categories = {};
  games.forEach(g => {
    categories[g.category] = (categories[g.category] || 0) + 1;
  });
  
  console.log('Categories:', JSON.stringify(categories, null, 2));
} catch (err) {
  console.error('Error parsing JSON:', err.message);
}
