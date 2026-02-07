# Makefile pentru Docker operations
.PHONY: build run stop clean test logs shell install

# Build Docker image
build:
	docker-compose build

# Run tests in Docker
run:
	docker-compose up --abort-on-container-exit

# Run tests and remove container after
test:
	docker-compose up --abort-on-container-exit --remove-orphans

# Run smoke tests
test-smoke:
	docker-compose run --rm playwright-tests npm run test:smoke

# Run regression tests
test-regression:
	docker-compose run --rm playwright-tests npm run test:regression

# Run with custom command
test-custom:
	docker-compose run --rm playwright-tests npx playwright test $(ARGS)

# Stop containers
stop:
	docker-compose down

# Clean up (stop + remove volumes)
clean:
	docker-compose down -v
	docker rmi project-23-headless-docker-playwright-tests || true

# View logs
logs:
	docker-compose logs -f playwright-tests

# Shell into container
shell:
	docker-compose run --rm playwright-tests /bin/bash

# Build without cache
rebuild:
	docker-compose build --no-cache

# Install browsers locally
install:
	npm install
	npx playwright install --with-deps chromium
