# Nerdogram

Nerdogram is an open source, very original, photo sharing app that is exclusive to folks who have a Github account i.e. you can only sign up if you have one.
You can see a Live Demo [here](https://nerdogram.vercel.app/ "Nerdogram").

## Why?

Why not? Let's make nerds cool again by sharing photos of our favorite Github projects. A picture is worth a thousand lines of code as they say.

<div align="center">
 <img src="https://github.com/btahir/next-tailwind/blob/next-instagram/public/images/main.jpeg">
 <p align="center">
  <a href="https://nerdogram.vercel.app/">Live Demo</a> •
  <a href="https://nextails.com/">See more starters</a> •
  <a href="https://twitter.com/deepwhitman">Follow me on Twitter</a>
 </p>
</div>

## The Tech

* Next.js + Tailwind CSS
* Next-Auth + Github OAuth for authentication
* Heroku Postgres SQL Database to store the data
* Cloudinary to store images
* Prisma to interact with the data
* Vercel to deploy site on
* Font Awesome Icons

## How to use

You will need to setup a Heroku POstgres SQL Instance. I recommend this [guide](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1 "guide").
You will also need to setup a Cloudinary account for images.

### Setup Environment variables

Create a .env file in the root directory. You need to add these variables:

```
DATABASE_URL=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL=http://localhost:3000/api/auth  (change once you deploy)
NEXT_PUBLIC_CLOUDINARY_CLOUDNAME=
NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET=
```

### Installation

Change into the project directory and run the following command:

```
yarn && yarn dev
```

### Update Site Metadata

You can update your site metadata in the next.config.js file. 

```
env: {
  siteTitle: 'Your Company',
  siteDescription: 'Your company description.',
  siteKeywords: 'your company keywords',
  siteUrl: 'https://nerdogram.vercel.app',
  siteImagePreviewUrl: '/images/main.png',
  twitterHandle: '@your_handle'
} 
```

### Update Colors

You can update the color palette in tailwind.config.js file.

```
colors: {
  palette: {
    lighter: '',
    light: '',
    primary: '',
    dark: '',
  },
},
```
### Update Progressive Web App (PWA) data

Update the manifest.json file and the icons under the public/images/icons folder.

You can use free tools online such as https://realfavicongenerator.net/ to quickly generate all the different icon sizes and favicon.ico file.

### License

MIT

### Buy Me Coffee! :coffee:

If you did find this useful and want to show your appreciation you can buy me a [coffee](https://www.buymeacoffee.com/neum "coffee") :smiley:

