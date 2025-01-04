# RSS.Beauty Deployment Guide: Docker & Node.js Integration

> Author: @mofanx

## Deployment Guide

This guide covers two primary deployment methods: Docker and Node.js. Each approach has its advantages - choose the one that best fits your needs.

### Option 1: Docker Deployment (Quick & Easy)

Docker deployment is the simplest method, requiring just two commands:

```bash
# Pull the image
docker pull ghcr.io/ccbikai/rss.beauty:main

# Run the container
docker run -d --name rss-beauty -p 4321:4321 ghcr.io/ccbikai/rss.beauty:main
```

Once deployed, access the site at `http://localhost:4321`.

### Option 2: Node.js Deployment (Flexible & Customizable)

The Node.js deployment offers a lightweight alternative with enhanced customization and debugging capabilities. Here's the step-by-step process:

#### 1. Prerequisites

Ensure your system has the following software installed:

```bash
# Verify Node.js version (18.0.0 or higher required)
node --version

# Verify pnpm version (9.15.2 or higher required)
pnpm --version
```

If not installed:

- Node.js: Download from [Node.js website](https://nodejs.org/)
- pnpm: Install via `npm install -g pnpm`

#### 2. Code Acquisition

```bash
# Clone the repository
git clone https://github.com/ccbikai/RSS.Beauty.git

# Navigate to project directory
cd RSS.Beauty
```

#### 3. Dependencies Installation

```bash
# Install project dependencies
pnpm install
```

#### 4. Deployment Configuration

The project's `astro.config.mjs` includes Node.js adapter configuration by default. For reference:

```javascript
// Existing configuration - no modifications needed
const providers = {
  // ... other adapters
  node: node({
    mode: 'standalone',
  }),
}

export default defineConfig({
  adapter: providers[adapterProvider] || providers.node, // Default to node adapter
  // ...
})
```

#### 5. Build Process

```bash
# Build the project
pnpm build
```

#### 6. Service Launch

```bash
# Run the built project with Node.js
node ./dist/server/entry.mjs
```

Access your site at `http://localhost:4321`!

#### 7. Production Deployment

For production environments, PM2 is recommended for Node.js process management:

```bash
# Install PM2
npm install -g pm2

# Launch service with PM2
pm2 start ./dist/server/entry.mjs --name "rss-beauty"

# Enable startup service
pm2 startup
pm2 save
```

## Deployment Recommendations

1. **Choosing Your Approach**

   - Choose Docker for quick deployment or if you're unfamiliar with Node.js
   - Choose Node.js for greater customization or lightweight deployment

2. **Performance Optimization**

   - Configure Nginx as a reverse proxy
   - Enable HTTPS
   - Consider CDN for static assets

3. **Key Considerations**
   - Ensure proper firewall port configuration
   - Regularly update dependencies for security
   - Implement logging and monitoring

## Usage Guide

After deployment, RSS.Beauty offers three methods to beautify any RSS feed:

### 1. Online Usage

Visit your deployed service (e.g., `http://your-domain.com` or `http://localhost:4321`), enter any RSS feed URL on the homepage for instant preview.

### 2. Adding Styles to Your RSS Feed

For RSS feed publishers, follow these steps to add RSS.Beauty styles:

1. Download Style Files

   - RSS 2.0: Download from `http://your-domain.com/rss.xsl`
   - Atom: Download from `http://your-domain.com/atom.xsl`

2. Place style files in your static assets directory (must be same domain as RSS feed)

3. Add to your RSS file header (after `<?xml ... ?>`):

   ```xml
   <!-- For RSS 2.0 -->
   <?xml-stylesheet type="text/xsl" href="/path/to/rss.xsl"?>

   <!-- For Atom -->
   <?xml-stylesheet type="text/xsl" href="/path/to/atom.xsl"?>
   ```

### 3. Base64 Encoding Method

If you can't host style files, use Base64 encoding:

1. Select "Base64" tab on the website
2. Copy the style reference code for your format (RSS or Atom)
3. Insert after the `<?xml ...?>` declaration:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<?xml-stylesheet type="text/xsl" href="data:text/xsl;base64,PD94bWw..."?>
<rss version="2.0">...</rss>
```

This method embeds styles directly in the RSS file without hosting requirements.

### 4. Online Transformation

For immediate RSS feed beautification:

1. Use: `http://your-domain.com/rss?url=YOUR_RSS_URL`
   Example: `http://your-domain.com/rss?url=https://example.com/feed.xml`

2. The system automatically fetches and beautifies the RSS content

Ideal for:

- Unmodifiable RSS sources
- Quick preview purposes
- Sharing beautified RSS feeds

### Usage Examples

1. Beautify GitHub Release feeds:

   ```txt
   http://your-domain.com/rss?url=https://github.com/username/project/releases.atom
   ```

2. Beautify blog RSS feeds:

   ```txt
   http://your-domain.com/rss?url=https://your-blog.com/feed.xml
   ```

### Important Notes

1. Cross-Origin Restrictions

   - XSL files must share the RSS feed's domain when using file method
   - No restrictions for Base64 or online methods

2. Performance Considerations

   - Base64 method increases server load; implement caching
   - Host style files on CDN for high-traffic sites

3. Compatibility
   - Supports major RSS readers
   - Mobile browser compatible
   - Supports RSS 2.0 and Atom 1.0

### Style Customization

To customize styles:

1. Modify templates in `src/xsl/partials`
2. Update styles in `src/app.css`
3. Rebuild: `pnpm build`

## Node.js Deployment Details

### 1. Minimal Deployment Files

Copy these essential files to your server:

```bash
dist/                 # Built files
package.json         # Dependencies info
pnpm-lock.yaml      # Version lock
```

### 2. Dependencies Setup

```bash
# Install pnpm if needed
npm install -g pnpm

# Install production dependencies
pnpm install --prod --ignore-scripts
```

### 3. Network Configuration

Two configuration methods:

#### Method A: Environment Variables (Recommended)

```bash
# Listen on all interfaces
HOST=0.0.0.0 node ./dist/server/entry.mjs

# Specify port
HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs
```

#### Method B: PM2 Management (Production Recommended)

1. Install PM2:

```bash
npm install -g pm2
```

2. Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'rss-beauty',
    script: './dist/server/entry.mjs',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 4321
    }
  }]
}
```

3. Launch:

```bash
pm2 start ecosystem.config.js
```

4. Enable startup (optional):

```bash
pm2 startup
pm2 save
```

### 4. Service Access

- Local: `http://localhost:4321`
- LAN: `http://your-lan-ip:4321`
  - Example: `http://192.168.1.100:4321`

### Notes

1. **Security**

   - Configure firewall properly
   - Use localhost if LAN access isn't needed
   - Use reverse proxy (e.g., Nginx) in production

2. **Performance**

   - Utilize PM2 cluster mode for multi-core CPUs
   - Implement caching strategies

3. **Troubleshooting**

   - Check firewall settings if inaccessible
   - Verify port 4321 availability
   - Validate environment variables

4. **Nginx Configuration Example**

For Nginx reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
