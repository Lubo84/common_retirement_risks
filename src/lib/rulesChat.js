  // A deliberately curated, rule-based "assistant" so the default experience stays on-topic.
  // If you later wire in an LLM, keep the same rails.
  import { RISK_LIBRARY } from '../riskLibrary.js'

  function pickRisk(text){
    const t = (text || '').toLowerCase()
    const hit = Object.keys(RISK_LIBRARY).find(k => t.includes(k))
    return hit ? RISK_LIBRARY[hit] : null
  }

  export function replyTo(message, context){
    const text = (message || '').trim()
    if (!text) return "Ask me anything about your retirement risks—no dumb questions. 🙂"

    // Guardrails: keep it on risks + actions
    const offTopic = /(politics|conspiracy|crypto|dating|medical diagnosis|tax evasion|illegal)/i.test(text)
    if (offTopic){
      return "I can’t help with that here. I *can* help you make sense of your retirement risks and what to do next. Want to pick one risk (longevity, sequencing, inflation, Age Pension, etc.)?"
    }

    const risk = pickRisk(text) || (context?.topRisks?.[0] ? RISK_LIBRARY[context.topRisks[0].key] : null)

    if (/what should i do|next step|what now|help me choose/i.test(text)){
      if (context?.topRisks?.length){
        return `Here are 3 sensible next steps based on your top risks (${context.topRisks.map(r=>r.title).join(', ')}):

1) Do a quick “income needs” check (Modest vs Comfortable vs your own number).
2) Run a simple on‑track projection (even a rough one).
3) Set one protective habit: review your plan once a year, or after any major life change.

Want me to go deeper on one of those?`
      }
      return "A good next step is to (1) estimate your income need, (2) check if you’re on track, and (3) pick one risk to actively manage. Which one do you want first: *income need*, *on track*, or *risks*?"
    }

    if (/explain|what is|tell me about|how does/i.test(text) && risk){
      return `${risk.title}

${risk.plainEnglish}

Try this: ${risk.tryThis}

If you want, tell me your age band and whether you’re drawing an income yet, and I’ll tailor the explanation.`
    }

    if (risk){
      return `If you’re thinking about **${risk.title.toLowerCase()}**, here’s a quick way to act:

• ${risk.tryThis}

Ask me to “go deeper” if you want more detail.`
    }

    return "I can help with retirement risks (longevity, sequencing, inflation, market volatility, Age Pension, health shocks, cognitive decline/elder abuse). Which one are you thinking about?"
  }
