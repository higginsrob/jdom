# Google Analytics Setup for JDOM.js

## Getting Your Google Analytics Tracking ID

### Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" (gear icon)

### Step 2: Set Up a Property

1. Click "Create Property"
2. Fill in the property details:
    - **Property name**: JDOM.js
    - **Reporting time zone**: Your timezone
    - **Currency**: Your currency
3. Click "Next"

### Step 3: Configure Data Stream

1. Select **Web** as your platform
2. Enter your website details:
    - **Website URL**: https://higginsrob.github.io/jdom
    - **Stream name**: JDOM Landing Page
3. Click "Create stream"

### Step 4: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### Step 5: Update the Template

Replace `G-XXXXXXXXXX` in `test/template.html` with your actual Measurement ID:

```html
<!-- Google Analytics -->
<script
    async
    src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"
></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-YOUR-ACTUAL-ID');
</script>
```

### Step 6: Update in Two Places

Make sure to replace `G-XXXXXXXXXX` in **both** locations in the template:

1. The `src` attribute in the script tag
2. The `gtag('config', ...)` function call

## Verifying Installation

### Method 1: Real-time Reports

1. Open your website: https://higginsrob.github.io/jdom
2. Go to Google Analytics > Reports > Realtime
3. You should see your visit appear within a few seconds

### Method 2: Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "gtag" or "analytics"
4. Reload the page
5. You should see requests to `google-analytics.com`

### Method 3: Google Tag Assistant

1. Install [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Click the extension icon
4. Click "Enable" and reload the page
5. You should see Google Analytics detected

## What Data Will Be Tracked?

With the basic GA4 setup, you'll automatically track:

### Default Events:

-   **page_view**: Every time someone visits the page
-   **session_start**: When a user starts a new session
-   **first_visit**: First time a user visits
-   **user_engagement**: How long users engage with content

### Automatic Metrics:

-   **Users**: Unique visitors
-   **Sessions**: Visit sessions
-   **Page views**: Total page views
-   **Bounce rate**: Single-page sessions
-   **Average session duration**: Time spent on site
-   **Device type**: Desktop, mobile, tablet
-   **Location**: Country, city
-   **Browser & OS**: Chrome, Safari, etc.
-   **Traffic source**: Where users come from (direct, referral, social, etc.)

## Custom Event Tracking (Optional Enhancement)

You can enhance tracking by adding custom events for user interactions:

```javascript
// Track demo button clicks
function createBasicElements() {
    gtag('event', 'button_click', {
        event_category: 'Demo',
        event_label: 'Basic Elements',
        value: 1,
    });

    // ... existing demo code
}

// Track NPM install copy
function copyInstallCommand() {
    gtag('event', 'install_command_copy', {
        event_category: 'Engagement',
        event_label: 'NPM Install',
        value: 1,
    });
}

// Track GitHub link clicks
document
    .querySelector('a[href*="github"]')
    .addEventListener('click', function() {
        gtag('event', 'outbound_link', {
            event_category: 'Outbound Links',
            event_label: 'GitHub Repository',
            value: 1,
        });
    });
```

## Privacy Considerations

### GDPR Compliance (EU Users)

If you have EU visitors, consider adding:

```javascript
gtag('config', 'G-YOUR-ACTUAL-ID', {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
});
```

### Cookie Consent Banner

For full compliance, you may want to add a cookie consent banner:

```html
<!-- Simple consent banner -->
<div
    id="cookie-consent"
    style="position: fixed; bottom: 0; width: 100%; background: #333; color: white; padding: 20px; text-align: center; z-index: 9999;"
>
    <p>
        This site uses cookies to improve your experience.
        <a
            href="#"
            onclick="acceptCookies(); return false;"
            style="color: #667eea; text-decoration: underline;"
            >Accept</a
        >
    </p>
</div>

<script>
    function acceptCookies() {
        document.getElementById('cookie-consent').style.display = 'none';
        localStorage.setItem('cookieConsent', 'accepted');
        // Initialize GA here if consent is required
    }

    // Check if consent was previously given
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        document.getElementById('cookie-consent').style.display = 'none';
    }
</script>
```

## Useful Google Analytics Views

### Custom Reports to Set Up:

1. **Top Pages**: See which sections get the most views
2. **User Flow**: Understand how users navigate
3. **Events**: Track demo interactions and button clicks
4. **Conversions**: Set goals for GitHub stars, NPM downloads links
5. **Audience**: Demographics and interests

## Support

-   [Google Analytics Help Center](https://support.google.com/analytics)
-   [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
-   [GA4 Events Documentation](https://support.google.com/analytics/answer/9322688)

## Note

Remember to:

1. ✅ Replace `G-XXXXXXXXXX` with your actual Measurement ID
2. ✅ Deploy the changes to GitHub Pages
3. ✅ Verify tracking is working in Real-time reports
4. ✅ Consider privacy implications and add consent if needed
