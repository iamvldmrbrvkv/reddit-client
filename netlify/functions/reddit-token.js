// Netlify serverless function: /netlify/functions/reddit-token.js
// Place this file in your project's root under /netlify/functions/
// It will be deployed automatically by Netlify

const fetch = require('node-fetch')

exports.handler = async function(event, context) {
  const clientId = process.env.REDDIT_CLIENT_ID
  const clientSecret = process.env.REDDIT_CLIENT_SECRET
  const userAgent = process.env.REDDIT_USER_AGENT || 'YourApp/1.0 by YourUsername'

  // Debug: log env values (do not log secrets in production!)
  if (!clientId || !clientSecret || !userAgent) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing environment variables',
        clientId: !!clientId,
        clientSecret: !!clientSecret,
        userAgent: !!userAgent
      })
    }
  }

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
