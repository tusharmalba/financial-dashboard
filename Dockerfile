# --------- FRONTEND STAGE -------------
FROM node:18-alpine AS frontend

WORKDIR /app/frontend
COPY frontend-new/package*.json ./
RUN npm install
COPY frontend-new/ ./
RUN npm run build

# --------- BACKEND STAGE -------------
FROM node:18-alpine AS backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Copy frontend build into backend
COPY --from=frontend /app/frontend/build ./public

# --------- FINAL STAGE (PRODUCTION IMAGE) -------------
FROM node:18-alpine

WORKDIR /app
COPY --from=backend /app/backend .

EXPOSE 5000
CMD ["npm", "run", "start"]
