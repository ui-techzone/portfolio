# Portfolio (Utkarsh Patil)

This is a simple static portfolio site with a floating AI chat widget and GitHub integration.

Contents
- `index.html` — single-file site (Tailwind, GSAP animations, GitHub repo fetch, chat UI)
- `netlify/functions/chat.js` — optional Netlify serverless function to proxy OpenAI

Deploy options

1) Netlify (recommended for serverless chat)

- Create a new site on Netlify and link this repository.
- In the Netlify UI, under Site settings -> Build & deploy -> Environment, add a variable `OPENAI_API_KEY` with your OpenAI API key.
- Netlify will auto-detect the site as static. Set build command to none and publish directory to the repository root (where `index.html` lives) or use `dist` if you build.
- The Netlify Functions folder is `netlify/functions`, Netlify will expose the function at `/.netlify/functions/chat`.
- Update `CHAT_API_URL` in `index.html` to the function URL, e.g. `/.netlify/functions/chat` for same-site calls.

2) GitHub Pages (static only, no serverless functions)

- GitHub Pages can host `index.html` from the `main` branch or `gh-pages` branch.
- Pages cannot host serverless functions. To enable chat, deploy the Netlify function separately and set `CHAT_API_URL` to the public function URL.

Local preview

- Open `index.html` directly in a browser for a basic preview.
- For better local testing (CORS and functions), use Netlify CLI:

```bash
# install netlify CLI if you don't have it
npm i -g netlify-cli
# run dev with functions enabled
netlify dev
```

Security

- Never commit your OpenAI API key. Use environment variables in your hosting provider.

Notes

- The chat widget falls back to canned responses when `CHAT_API_URL` is not set.
- GitHub repo fetch is unauthenticated and subject to public rate limits. For higher limits, use an authenticated request.
# portfolio
Portfolio
