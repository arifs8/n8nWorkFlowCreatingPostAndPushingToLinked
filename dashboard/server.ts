import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go up one level from dashboard/server to the root project folder
const rootEnvPath = path.join(__dirname, '../.env');

app.post('/api/save-keys', (req, res) => {
    const {
        groq,
        openai,
        gemini,
        linkedinClientId,
        linkedinClientSecret,
        linkedinAccessToken,
        linkedinPersonUrn
    } = req.body;

    const envContent = `
GROQ_API_KEY="${groq || ''}"
# Or OPENAI_API_KEY if you are using gpt-120b
OPENAI_API_KEY="${openai || ''}"

# Gemini API Key for image generation
GEMINI_API_KEY="${gemini || ''}"

# LinkedIn API Credentials
LINKEDIN_CLIENT_ID="${linkedinClientId || ''}"
LINKEDIN_CLIENT_SECRET="${linkedinClientSecret || ''}"
LINKEDIN_ACCESS_TOKEN="${linkedinAccessToken || ''}"
LINKEDIN_PERSON_URN="${linkedinPersonUrn || ''}"
`;

    try {
        fs.writeFileSync(rootEnvPath, envContent.trim());
        console.log('Successfully saved .env file to the root directory.');
        res.json({ success: true, message: 'Keys saved successfully to .env' });
    } catch (error) {
        console.error('Failed to write .env file:', error);
        res.status(500).json({ success: false, message: 'Failed to write keys' });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Key Manager Backend running on http://localhost:${PORT}`);
});
