# Optional local server (LLM proxy)

GitHub Pages is static and cannot keep API keys secret.
If you want to power the curated chat with an LLM, use a server-side proxy.

This folder includes a minimal Node/Express proxy example you can run locally for demos.
For production, use a serverless platform (e.g., Cloudflare Workers, Netlify Functions, AWS Lambda).

## Local run
```bash
cd server
npm install
cp .env.example .env
# put your key in .env
npm run dev
```

Then update the front-end to call your proxy endpoint.
