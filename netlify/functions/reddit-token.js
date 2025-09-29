
/**
 * Netlify serverless function for securely obtaining a Reddit OAuth access token.
 * Place this file in your project's root under /netlify/functions/.
 * It will be deployed automatically by Netlify.
 *
 * Environment variables required:
 *   - REDDIT_CLIENT_ID: Your Reddit app's client ID
 *   - REDDIT_CLIENT_SECRET: Your Reddit app's client secret
 *   - REDDIT_USER_AGENT: User-Agent string for Reddit API requests
 *
 * @module netlify/functions/reddit-token
 */

/**
 * Dynamically imports node-fetch for ESM compatibility.
 * @param {...any} args - Arguments to pass to fetch.
 * @returns {Promise<Response>} The fetch response promise.
 */
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

/**
 * Netlify handler for Reddit OAuth token requests.
 * @param {Object} event - The event object from Netlify.
 * @param {Object} context - The context object from Netlify.
 * @returns {Promise<Object>} The response object with statusCode and body.
 */
exports.handler = async function(event, context) {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  const userAgent = process.env.REDDIT_USER_AGENT || 'YourApp/1.0 by YourUsername'

  if (!clientId || !clientSecret || !userAgent) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing environment variables'
      })
    }
  }

  /**
   * Reddit API requires HTTP Basic Auth with clientId:clientSecret base64 encoded.
   * @type {string}
   */
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  try {
    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': userAgent
      },
      body: 'grant_type=client_credentials'
    })

    if (!response.ok) {
      const text = await response.text()
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Reddit token error', status: response.status, details: text })
      }
    }

    /**
     * The response data from Reddit containing the access token and expiry info.
     * @type {Object}
     */
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, stack: error.stack })
    }
  }
}
