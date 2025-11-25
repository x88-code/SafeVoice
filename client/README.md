# SafeVoice - Client

Minimal Vite + React + Tailwind frontend for SafeVoice.

Setup

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Proxy

During development, you can proxy API requests to the backend by adding the following to `vite.config.js` (optional):

```js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
}
```
