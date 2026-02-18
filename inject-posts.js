const fs = require('fs');
const path = require('path');

// Load the new posts
const { newPosts } = require('./app/blog/new-posts.js');

// Read blogData.js as text
const blogDataPath = path.join(__dirname, 'app/blog/blogData.js');
let blogData = fs.readFileSync(blogDataPath, 'utf8');

// Find the last ];\n (the array close)
const lastClosing = blogData.lastIndexOf('\n];');
if (lastClosing === -1) {
  throw new Error('Could not find array closing ];\n in blogData.js');
}

// Generate the new posts as JSON strings
const newPostsJson = newPosts.map(post => {
  return '  ' + JSON.stringify(post, null, 2).replace(/\n/g, '\n  ');
}).join(',\n');

// Insert before the closing ];
const newBlogData = blogData.slice(0, lastClosing) + ',\n' + newPostsJson + '\n];';

// Write back
fs.writeFileSync(blogDataPath, newBlogData, 'utf8');

console.log('Successfully injected', newPosts.length, 'posts into blogData.js');
console.log('Post slugs:', newPosts.map(p => p.slug).join(', '));
