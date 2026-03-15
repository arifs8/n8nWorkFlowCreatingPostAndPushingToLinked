# Project Constitution (gemini.md)

## Data Schemas
```json
{
  "PostPayload": {
    "topic": "String - 'Software Testing in 2026' related focus area",
    "idea": "String - The generated content idea",
    "content": "String - The final text for the LinkedIn post",
    "image_url": "String - URL or local path of the generated image",
    "status": "String - 'pending' | 'published' | 'failed'",
    "timestamp": "String - ISO8601 Timestamp of generation/posting"
  }
}
```

## Behavioral Rules
- **Cron Job**: System must run autonomously every day at 09:00 AM.
- **Tone/Style**: Professional yet engaging, suitable for LinkedIn.
- **Fail-Safe**: If image generation or API calls fail, do not publish incomplete data. Log errors for the dashboard.
- **Model Usage**: 
  - Idea & Content Generation: Use specified LLM (`gpt-120b` or Groq).
  - Image Generation: Use specified Gemini model (`gemini 3 nano banana` / Imagen).

## Architectural Invariants
- 3-Layer Architecture (SOPs, Navigation, Tools)
- Deterministic behavior in Tools layer
