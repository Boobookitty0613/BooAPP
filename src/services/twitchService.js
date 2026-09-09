import { logger } from '../utils/logger.js';

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_API_URL = 'https://api.twitch.tv/helix/streams';

// Your public Twitch channel name.
// This is used automatically if Railway does not provide TWITCH_CHANNEL.
const DEFAULT_TWITCH_CHANNEL = 'boobookitty0613';

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
    const clientId = process.env.TWITCH_CLIENT_ID?.trim();
    const clientSecret = process.env.TWITCH_CLIENT_SECRET?.trim();

    // SAFE diagnostic.
    // This only reports YES/NO and NEVER prints your credentials.
    logger.info(
        'Railway Twitch variables: ' +
        `CLIENT_ID=${clientId ? 'YES' : 'NO'} | ` +
        `CLIENT_SECRET=${clientSecret ? 'YES' : 'NO'} | ` +
        `CHANNEL=${process.env.TWITCH_CHANNEL ? 'YES' : 'NO'}`
    );

    if (!clientId || !clientSecret) {
        throw new Error(
            'Missing TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET'
        );
    }

    // Reuse the token until it is close to expiring.
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
    // Use Railway's TWITCH_CHANNEL when available.
    // Fall back to your public Twitch username if Railway
    // does not provide the variable.
    const channel =
        process.env.TWITCH_CHANNEL?.trim() ||
        DEFAULT_TWITCH_CHANNEL;

    if (process.env.TWITCH_CHANNEL?.trim()) {
        logger.info(
            'Twitch channel configuration: Railway variable FOUND.'
        );
    } else {
        logger.warn(
            'Twitch channel configuration: Railway variable MISSING. Using default boobookitty0613.'
        );
    }

    const token = await getAccessToken();

    const clientId =
        process.env.TWITCH_CLIENT_ID?.trim();

    const response = await fetch(
        `${TWITCH_API_URL}?user_login=${encodeURIComponent(channel)}`,
        {
            method: 'GET',
            headers: {
                'Client-ID': clientId,
                'Authorization': `Bearer ${token}`,
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
