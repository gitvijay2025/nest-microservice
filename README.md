# NestJS Microservices

This repository contains a small NestJS microservices setup with an API gateway and four services.

## Services

| Service | Type | Default Port |
| --- | --- | --- |
| `api-gateway` | HTTP API gateway | `3000` |
| `auth-service` | TCP microservice | `4002` |
| `user-service` | TCP microservice | `3001` |
| `product-service` | HTTP service | `3002` |
| `order-service` | HTTP service | `3003` |

Configuration is centralized through `.env` files using `@nestjs/config`. Each service can read its own `.env`, and it can also read the root `.env` file from `../.env`.

## Prerequisites

- Node.js 20 or newer
- npm
- Docker and Docker Compose, if you want to run the services in containers

## Environment Setup

Create a root environment file from the example:

```bash
cp .env.example .env
```

For local development, the default values are enough. For Docker or Kubernetes, inject the same variables as environment variables or mount them from a ConfigMap/Secret.

Important variables:

```env
API_GATEWAY_PORT=3000
JWT_SECRET=MY_SECRET_KEY
API_GATEWAY_JWT_EXPIRES_IN=1h
AUTH_JWT_EXPIRES_IN=1d
THROTTLE_TTL=60000
THROTTLE_LIMIT=10
AUTH_SERVICE_HOST=127.0.0.1
AUTH_SERVICE_PORT=4002
USER_SERVICE_HOST=127.0.0.1
USER_SERVICE_PORT=3001
PRODUCT_SERVICE_PORT=3002
ORDER_SERVICE_PORT=3003
```

Do not commit real `.env` files. Commit only `.env.example` files.

## Install Dependencies

Install dependencies inside each service:

```bash
cd api-gateway && npm install
cd ../auth-service && npm install
cd ../user-service && npm install
cd ../product-service && npm install
cd ../order-service && npm install
cd ..
```

## Run Locally

Open separate terminals and start the services.

Start the auth TCP microservice:

```bash
cd auth-service
npm run start:dev
```

Start the user TCP microservice:

```bash
cd user-service
npm run start:dev
```

Start the product HTTP service:

```bash
cd product-service
npm run start:dev
```

Start the order HTTP service:

```bash
cd order-service
npm run start:dev
```

Start the API gateway:

```bash
cd api-gateway
npm run start:dev
```

The API gateway will run at:

```text
http://localhost:3000
```

## Docker/Kubernetes Notes

When running in containers, use service DNS names instead of localhost. Example:

```env
AUTH_SERVICE_HOST=auth-service
USER_SERVICE_HOST=user-service
```

Use Kubernetes Secrets for sensitive values like `JWT_SECRET`. Use ConfigMaps for non-sensitive values such as service hosts, ports, and throttle settings.

For TCP microservices, make sure the container exposes the service port and the Kubernetes Service routes to that port.

## Run With Docker Compose

Build and start all services:

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up --build -d
```

Stop the containers:

```bash
docker compose down
```

Docker Compose starts the services with container-friendly host values:

```env
AUTH_SERVICE_HOST=auth-service
USER_SERVICE_HOST=user-service
```

The API gateway is available at:

```text
http://localhost:3000
```

The product and order HTTP services are also exposed locally:

```text
http://localhost:3002
http://localhost:3003
```

## Build Docker Images Manually

Build individual service images:

```bash
docker build -t api-gateway ./api-gateway
docker build -t auth-service ./auth-service
docker build -t user-service ./user-service
docker build -t product-service ./product-service
docker build -t order-service ./order-service
```

## GitHub Actions

The repository includes a CI workflow at `.github/workflows/ci.yml`.

On pushes and pull requests to `main` or `master`, it will:

- install dependencies for each service
- build each service
- run each service test suite
- verify each Docker image can be built

## Kubernetes Deployment

Kubernetes manifests are available in the `k8s` folder:

- `namespace.yaml`
- `configmap.yaml`
- `secret.example.yaml`
- `services.yaml`
- `deployments.yaml`
- `kustomization.yaml`

Before deploying, update the image names in `k8s/deployments.yaml`:

```yaml
image: ghcr.io/YOUR_GITHUB_USERNAME/nestjs-api-gateway:latest
```

Replace `YOUR_GITHUB_USERNAME` and image names with your real registry path.

Also update the JWT secret before deploying:

```yaml
stringData:
  JWT_SECRET: "change-this-secret-before-deploy"
```

Apply all manifests:

```bash
kubectl apply -k k8s
```

Check pods and services:

```bash
kubectl get pods -n nestjs
kubectl get svc -n nestjs
```

Delete the deployment:

```bash
kubectl delete -k k8s
```

## Build

Build each service:

```bash
cd api-gateway && npm run build
cd ../auth-service && npm run build
cd ../user-service && npm run build
cd ../product-service && npm run build
cd ../order-service && npm run build
cd ..
```

## Test

Run unit tests for each service:

```bash
cd api-gateway && npm test
cd ../auth-service && npm test
cd ../user-service && npm test
cd ../product-service && npm test
cd ../order-service && npm test
cd ..
```

## Production Start

After building a service, run:

```bash
npm run start:prod
```

Run this command from the service directory you want to start.

## Suggested Git Commands

```bash
git status
git add .
git commit -m "Centralize service config with env support"
git push
```

If this folder is not already a Git repository, initialize it first:

```bash
git init
git add .
git commit -m "Initial NestJS microservices setup"
```
