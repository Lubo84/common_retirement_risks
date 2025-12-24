import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// NOTE: This is a minimal proxy example.
// - Add auth before putting this on the internet.
// - Add rate limiting and logging.
// - Keep strict guardrails in your system prompt.

app.post('/chat', async (req, res) => {
  try{
    const { messages } = req.body || {}
    if (!Array.isArray(messages)) return res.status(400).json({ error:'messages must be an array' })

    const key = process.env.OPENAI_API_KEY
    if (!key) return res.status(500).json({ error:'Missing OPENAI_API_KEY' })

    // Use the Responses API (recommended). This call is intentionally left as a template.
    // You’ll need to fill it in based on your preferred provider/model.
    return res.status(501).json({
      error: "Template only. Wire your preferred LLM provider here. Keep guardrails in the system prompt."
    })
  }catch(err){
    return res.status(500).json({ error: String(err?.message || err) })
  }
})

const port = process.env.PORT || 8787
app.listen(port, () => console.log(`Proxy listening on http://localhost:${port}`))
