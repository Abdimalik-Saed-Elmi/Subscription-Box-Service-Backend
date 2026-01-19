# syntax=docker/dockerfile:1

FROM oven/bun:1.1.0

WORKDIR /usr/src/app

# Copy dependency files first (for caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the source files into the image
COPY . .

EXPOSE 1000

# Dev command (kept simple for the assignment). In later commits we can add a production start.
CMD ["bun", "run", "dev"]
