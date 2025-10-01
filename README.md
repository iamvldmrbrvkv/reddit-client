# reddit-client

[Codecademy](https://www.codecademy.com/learn) full stack engineer path portfolio project.

## 🚀 Major Update: Official Reddit API Integration

This project now uses the **official Reddit API** with OAuth authentication instead of unofficial endpoints. This provides:

- ✅ **Stable & Reliable**: Official API with proper support
- ✅ **Higher Rate Limits**: 100 requests/minute vs heavily throttled anonymous access  
- ✅ **Terms Compliance**: Follows Reddit's developer terms and guidelines
- ✅ **Better Performance**: Authenticated requests with proper caching
- ✅ **Future-Proof**: Access to new features and endpoints

### 📋 Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/reddit-client.git
   cd reddit-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Reddit API credentials**
   - Go to https://www.reddit.com/prefs/apps
   - Create a new "web app" 
   - Add environment variables in Netlify dashboard (for production)
   - Or create `.env` file locally (for development only)

4. **Deploy to Netlify**
   - Push code to GitHub
   - Connect repository to Netlify
   - Add environment variables: `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USER_AGENT`
   - Deploy automatically


5. **Start local development**
   ```bash
   npm start
   # or directly
   netlify dev
   ```


**Architecture:**
- All requests to the Reddit API go through a Netlify Function (`/.netlify/functions/reddit-token`), which securely obtains the access_token and proxies requests.
- Secrets are never exposed to client-side code.

**Possible issues:**
- If you get a 502/500 error when requesting a token, check your environment variables in Netlify and your local `.env` file.


📖 **For detailed migration information, see [REDDIT_API_MIGRATION.md](./REDDIT_API_MIGRATION.md)**


## Project Description
This is a Reddit client built with React and Redux. It uses the official Reddit API via a secure Netlify serverless function for all data access. Users can view, search, and read posts and comments from Reddit. All authentication and API requests are handled server-side for security.


## ✨ Features
- 🔍 **Search Reddit**: Search across all of Reddit or specific subreddits
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices (breakpoints: xs, sm, md, lg, xl)
- 💬 **View Comments**: Read post comments and discussions
- 🚀 **Fast Loading**: Optimized API calls with proper caching
- 🎨 **Modern UI**: Material-UI components with Reddit-inspired design
- 🌓 **Dark/Light Mode**: Automatic theme switching with localStorage persistence
- 🔐 **Secure**: Uses official OAuth authentication (token never exposed to client)
- ♿ **Accessible**: ARIA attributes, semantic HTML, keyboard navigation
- 📊 **Voting Interface**: Upvote/downvote UI similar to Reddit


## 🛠 Technologies Used
- **Frontend**: React 18, Redux Toolkit
- **Routing**: React Router v6
- **UI Framework**: Material-UI (MUI) v5
- **Styling**: Emotion (CSS-in-JS), MUI theming system
- **Icons**: Material Icons
- **API**: Official Reddit OAuth API (via Netlify serverless functions)
- **Testing**: Jest, React Testing Library, Selenium WebDriver
- **Build Tool**: Create React App
- **Deployment**: Netlify with serverless functions

## 🎨 Design System

Modern Reddit-inspired design with clean, responsive interface:

- **Theming**: Material-UI system with light/dark mode support
- **Layout**: Card-based design with 16px rounded corners
- **Colors**: Reddit palette (Orange #FF4500, Blue #0079D3)
- **Voting**: Modern interface positioned in post footers
- **Responsive**: Optimized for all screen sizes

## Project Requirements (for learning):
- Build the application using React and Redux
- Version control your application with Git and host the repository on GitHub
- Use a project management tool (GitHub Projects, Trello, etc.) to plan your work
- Write a README (using Markdown) that documents your project including:
  - Wireframes
  - Technologies used
  - Features
  - Future work
- Write unit tests for your components using Jest and Enzyme
- Write end-to-end tests for your application
- Users can use the application on any device (desktop to mobile)
- Users can use the application on any modern browser
- Users can access your application at a URL
- Users see an initial view of the data when first visiting the app
- Users can search the data using terms
- Users can filter the data based on categories that are predefined
- Users are shown a detailed view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design system
- Users are delighted with animations and transitions
- Users are able to leave an error state
- Get 90+ scores on [Lighthouse](https://web.dev/measure/)
  - We understand you cannot control how media assets like videos and images are sent to the client. It is okay to have a score below 90 for Performance if they are related to the media from Reddit.
- OPTIONAL: [Get a custom domain name and use it for your application](https://www.codecademy.com/courses/make-a-website/lessons/setting-up-your-domain/)
- OPTIONAL: Set up a CI/CD workflow to automatically deploy your application when the master branch in the repository changes
- OPTIONAL: Make your application a progressive web app

## Prerequisites:
- HTML
- CSS
- JavaScript
- React
- Redux
- Jest and Selenium
- Git and GitHub
- Command line and file navigation
- Wireframing


# Getting Started with Create React App (legacy info)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:


### `npm start` (now runs Netlify dev)
Runs the app in the development mode with Netlify Functions. Open [http://localhost:8888](http://localhost:8888) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### `npm run build`
Builds the app for production to the `build` folder. Use Netlify for deployment to get serverless function support and secure API access.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)


### Deployment
Deploy to Netlify for best results. All secrets and API credentials are managed server-side.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
