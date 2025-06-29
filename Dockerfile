# === Build frontend ===
FROM node:18-alpine AS frontend

WORKDIR /app/frontend
COPY frontend-new/package*.json ./
RUN npm install
COPY frontend-new/ ./
RUN npm run build

# === Build backend ===
FROM node:18-alpine AS backend

WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend build into backend public folder
COPY --from=frontend /app/frontend/build ./backend/public
COPY backend ./backend

# === Final production image ===
FROM node:18-alpine

WORKDIR /app
COPY --from=backend /app/backend ./

# Expose the port your backend uses
EXPOSE 5000

CMD [ "npm", "run", "start" ]
