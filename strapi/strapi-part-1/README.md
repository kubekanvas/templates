# Strapi Blog Platform - Part 1

This directory contains all the Kubernetes YAML files needed for Part 1 of the Strapi blog platform tutorial.

## Files Overview

- `postgres-pvc.yaml` - PersistentVolumeClaim for PostgreSQL data storage
- `postgres-deployment.yaml` - PostgreSQL database deployment
- `postgres-service.yaml` - PostgreSQL service for internal connectivity
- `strapi-deployment.yaml` - Strapi CMS deployment with database connection
- `strapi-service.yaml` - Strapi service for internal connectivity
- `strapi-ingress.yaml` - Ingress to expose Strapi publicly

## Deployment Order

Apply the files in this order:

```bash
# 1. Create persistent storage for PostgreSQL
kubectl apply -f postgres-pvc.yaml

# 2. Deploy PostgreSQL database
kubectl apply -f postgres-deployment.yaml

# 3. Create PostgreSQL service
kubectl apply -f postgres-service.yaml

# 4. Deploy Strapi CMS
kubectl apply -f strapi-deployment.yaml

# 5. Create Strapi service
kubectl apply -f strapi-service.yaml

# 6. Create Ingress for external access
kubectl apply -f strapi-ingress.yaml
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

- **Strapi Admin**: `http://<ingress-ip>/admin`
- **Port Forward**: `kubectl port-forward service/strapi 1337:1337`

## Prerequisites

- Kubernetes cluster with Ingress controller enabled
- Default storage class configured
- kubectl configured to access your cluster
