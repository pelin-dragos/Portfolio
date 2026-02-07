# Dockerfile pentru Playwright Tests cu Headless Browser
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Install Node.js dependencies first (for better caching)
COPY package*.json ./
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps chromium

# Copy project files
COPY . .

# Create directories for results
RUN mkdir -p test-results playwright-report screenshots logs

# Set environment variables
ENV NODE_ENV=production
ENV CI=true
ENV DOCKER=true
ENV HEADLESS=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Default command
CMD ["npm", "run", "test:docker"]
