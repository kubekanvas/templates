# Strapi Blog Platform - Part 1

This directory contains all the Kubernetes YAML files needed for Part 1 of the Strapi blog platform tutorial.

## Files Overview

- `strapi-deployment.yaml` - Strapi CMS deployment with database connection
- `strapi-service.yaml` - Strapi service for internal connectivity

## Deployment Order

Apply the files in this order:

```bash
# 1. Build docker image
docker build -t my-strapi-blog:latest .

# 2. Run the container locally
docker run -p 1337:1337 my-strapi-blog:latest

# 3. Deploy Strapi CMS
kubectl apply -f strapi-deployment.yaml

# 4. Create Strapi service
kubectl apply -f strapi-service.yaml

# 5. Port-forward to access the application from browser
kubectl port-forward service/strapi-service 1337:1337
```

## Quick Deploy

To deploy everything at once:

```bash
kubectl apply -f .
```

## Verification

Check that everything is running:

```bash
# Check all pods are running
kubectl get pods

# Check services
kubectl get services

# Check ingress
kubectl get ingress

# View Strapi logs
kubectl logs -l app=strapi
```

## Access

- **Strapi Admin**: `http://localhost:1337/admin`
- **Port Forward**: `kubectl port-forward service/strapi-service 1337:1337`

## Prerequisites

- Local Kubernetes Cluster
- kubectl configured to access your cluster
