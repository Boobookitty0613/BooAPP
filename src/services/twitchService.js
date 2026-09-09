```js
import { logger } from '../utils/logger.js';

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_API_URL = 'https://api.twitch.tv/helix/streams';

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
    const clientId = process.env.TWITCH_CLIENT_ID?.trim();
    const clientSecret = process.env.TWITCH_CLIENT_SECRET?.trim();

    logger.info(
        'Twitch configuration: ' +
        `Client ID ${clientId ? 'FOUND' : 'MISSING'} | ` +
        `Client Secret ${clientSecret ? 'FOUND' : 'MISSING'} | ` +
        `Channel ${process.env.TWITCH_CHANNEL ? 'FOUND' : 'MISSING'}`
    );

    if (!clientId || !clientSecret) {
        throw new Error(
            'Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET'
        );
    }

    if (accessToken && Date.now() < tokenExpiresAt) {
        return accessToken;
    }

    const response = await fetch(
        `${TWITCH_TOKEN_URL}?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=client_credentials`,
        {
            method: 'POST',
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Twitch token request failed: ${response.status} ${errorText}`
        );
    }

    const data = await response.json();

    accessToken = data.access_token;
    tokenExpiresAt =
        Date.now() + ((data.expires_in - 60) * 1000);

    return accessToken;
}

export async function getTwitchStream() {
    const rawChannel = process.env.TWITCH_CHANNEL;

    if (!rawChannel || !rawChannel.trim()) {
        throw new Error('Missing TWITCH_CHANNEL');
    }

    const channel = rawChannel.trim();
    const token = await getAccessToken();

    const response = await fetch(
        `${TWITCH_API_URL}?user_login=${encodeURIComponent(channel)}`,
        {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID.trim(),
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Twitch API request failed: ${response.status} ${errorText}`
        );
    }

    const data = await response.json();

    return data.data?.[0] ?? null;
}

export async function isTwitchLive() {
    try {
        const stream = await getTwitchStream();

        return Boolean(stream);
    } catch (error) {
        logger.error(
            'Twitch status check error:',
            error
        );

        return false;
    }
}
```
