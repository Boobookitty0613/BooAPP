import { logger } from '../utils/logger.js';

const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';
const TWITCH_API_URL = 'https://api.twitch.tv/helix/streams';

const DEFAULT_TWITCH_CHANNEL = 'boobookitty0613';

let accessToken = null;
let tokenExpiresAt = 0;

function getTwitchConfig() {
    const clientId = process.env.TWITCH_CLIENT_ID?.trim() || '';
    const clientSecret = process.env.TWITCH_CLIENT_SECRET?.trim() || '';
    const channel =
        process.env.TWITCH_CHANNEL?.trim() ||
        DEFAULT_TWITCH_CHANNEL;

    return {
        clientId,
        clientSecret,
        channel,
    };
}

export function getTwitchChannel() {
    return getTwitchConfig().channel;
}

function validateTwitchConfig() {
    const {
        clientId,
        clientSecret,
    } = getTwitchConfig();

    logger.info(
        `Twitch configuration: ` +
        `CLIENT_ID=${clientId ? 'FOUND' : 'MISSING'} | ` +
        `CLIENT_SECRET=${clientSecret ? 'FOUND' : 'MISSING'}`
    );

    if (!clientId) {
        throw new Error(
            'TWITCH_CLIENT_ID is missing from the running environment.'
        );
    }

    if (!clientSecret) {
        throw new Error(
            'TWITCH_CLIENT_SECRET is missing from the running environment.'
        );
    }

    return {
        clientId,
        clientSecret,
    };
}

async function getAccessToken() {
    const {
        clientId,
        clientSecret,
    } = validateTwitchConfig();

    if (
        accessToken &&
        Date.now() < tokenExpiresAt
    ) {
        return accessToken;
    }

    logger.info(
        'Requesting Twitch API access token...'
    );

    const response = await fetch(
        `${TWITCH_TOKEN_URL}?` +
        `client_id=${encodeURIComponent(clientId)}` +
        `&client_secret=${encodeURIComponent(clientSecret)}` +
        `&grant_type=client_credentials`,
        {
            method: 'POST',
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Twitch token request failed: ` +
            `${response.status} ${errorText}`
        );
    }

    const data = await response.json();

    if (!data.access_token) {
        throw new Error(
            'Twitch token response did not contain an access token.'
        );
    }

    accessToken = data.access_token;

    tokenExpiresAt =
        Date.now() +
        Math.max(
            (Number(data.expires_in || 3600) - 60) * 1000,
            60000
        );

    logger.info(
        '✅ Twitch API access token acquired.'
    );

    return accessToken;
}

export async function getTwitchStream() {
    const {
        clientId,
        channel,
    } = {
        ...getTwitchConfig(),
        ...validateTwitchConfig(),
    };

    if (process.env.TWITCH_CHANNEL?.trim()) {
        logger.info(
            `Twitch channel: ${channel}`
        );
    } else {
        logger.warn(
            `TWITCH_CHANNEL is not available. ` +
            `Using default channel: ${DEFAULT_TWITCH_CHANNEL}`
        );
    }

    const token = await getAccessToken();

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
            `Twitch API request failed: ` +
            `${response.status} ${errorText}`
        );
    }

    const data = await response.json();

    const stream = data.data?.[0] ?? null;

    if (stream) {
        logger.info(
            `🔴 Twitch stream detected: ${stream.title || 'Live'}`
        );
    }

    return stream;
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
