# React + TypeScript + Vite + Tailwind + Firebase + PNPM

This is my personal boilerplate in order to start fast projects. My main goal here is to speed up installation process of all my projects using this boilerplate.

Once inside project folder follow the differents steps.

If not already installed, install pnpm :

`npm install -g pnpm`

Verify installation with : 

`pnpm --version`

Output should be : 
`9.9.0` or higher version (>9.X)

DON'T FORGET TO USE `pnpm install your-package-name` when you want to install a new package inside your project.

## Project Setup
### Starting Project
Once in project folder, run this command: 

`pnpm install`

now you can start your project with : 

`pnpm run dev`

Your server should now be running at : [http://localhost:XXXX](http://localhost:XXXX/)

### Tailwind Config 

This boilerplate already has Tailwind CSS installed.

If you want to import your own font : 

Example with Google Fonts, go to [https://fonts.google.com/](https://fonts.google.com/)

For example : 
[https://fonts.google.com/specimen/Smooch+Sans](https://fonts.google.com/specimen/Smooch+Sans)

Paste your embed code from Google Fonts inside `index.html` : 
```sh

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap" rel="stylesheet">
```
Inside the file you import Tailwind, customize your font : 

```sh 
@import "tailwindcss";

@theme {
    --font-smooch-sans: "Smooch Sans"
};
```
Use case : 

```sh 
    <div className='flex w-full h-full items-center justify-center'>
      <h1 className='font-smooch-sans text-4xl text-gray-400'>Font</h1>
    </div>
```
Any questions check Tailwind CSS documentation :  [https://tailwindcss.com/docs/theme#customizing-your-theme](https://tailwindcss.com/docs/theme#customizing-your-theme)

### Firebase Setup

After creating your Firebase Project you can now import your informations in order to connect your app to firebase.

Create a `.env` file in root folder, every key should start with "VITE_[YOUR_KEY_NAME]" 

```sh
VITE_FIREBASE_API_KEY = AIzaSyA8b7Xy24_pN3Q6Lm8YvLzU4QRvN0tCdKj
VITE_FIREBASE_AUTH_DOMAIN = your-domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = 123457891011
VITE_FIREBASE_STORAGE_BUCKET = your-domain.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 255419181467
VITE_FIREBASE_APP_ID = 1:255419181466:web:c06918597d7dc42872f224
```

Now make sure all theses environnements variables are imported in `firebaseConfig.ts` inside `src/Firebase`.

Make sure you activated every services from Firebase you want to use such as (authentication, storage, database, etc...), If you are not using every services used inside `firebaseConfig.ts` feel free to delete or modify a few imports.



# Extra Informations

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
