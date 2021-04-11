const withPWA = require('next-pwa')

module.exports = withPWA({
  future: { webpack5: true },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: ['source.unsplash.com', 'res.cloudinary.com'],
  },
  env: {
    siteTitle: 'Nerdogram',
    siteDescription: 'The nerdiest gram.',
    siteKeywords: 'nerd',
    siteUrl: 'https://nerdogram.vercel.app',
    siteImagePreviewUrl: '/images/main.jpeg',
    twitterHandle: '@deepwhitman'
  }  
})
