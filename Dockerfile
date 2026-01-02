# syntax=docker/dockerfile:1

FROM oven/bun:1.1.0

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app


# Copy dependency files first (for caching)
 Copy package.json bun.lockb ./ 

 #install dependencies
 RUN bun install --frozen-lockfile

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 1000

# Run the application.
CMD ["bun", "run", "dev"]
