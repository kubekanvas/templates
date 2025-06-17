# Strapi Blog Platform - Part 2

This directory contains all the Kubernetes YAML files and Docker configuration needed for Part 2 of the Strapi blog platform tutorial.

## Files Overview

- `blog-frontend-deployment.yaml` - Next.js frontend deployment
- `blog-frontend-service.yaml` - Frontend service for internal connectivity
- `blog-ingress.yaml` - Updated ingress to route traffic to both Strapi and frontend
- `Dockerfile` - Docker configuration for building Next.js application

## Prerequisites

Before deploying Part 2, ensure you have completed Part 1:
- PostgreSQL database running
- Strapi CMS deployed and accessible
- All Part 1 services working correctly

## Building the Frontend Docker Image

1. Create your Next.js application
2. Use the provided Dockerfile
3. Build and push to your registry:

```bash
# Build the image
docker build -t yourdockerhub/nextjs-blog:latest .

# Push to registry
docker push yourdockerhub/nextjs-blog:latest
```

**Important**: Update the image name in `blog-frontend-deployment.yaml` to match your registry.

## Deployment Order

Apply the files in this order:

```bash
# 1. Deploy Next.js frontend
kubectl apply -f blog-frontend-deployment.yaml

# 2. Create frontend service
kubectl apply -f blog-frontend-service.yaml

# 3. Update ingress for routing
kubectl apply -f blog-ingress.yaml
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

# Check updated ingress
kubectl get ingress

# View frontend logs
kubectl logs -l app=blog-frontend
```

## Testing

Test different endpoints:

```bash
# Get ingress IP
export INGRESS_IP=$(kubectl get ingress blog-ingress -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

# Test frontend
curl -H "Host: yourdomain.com" http://$INGRESS_IP/

# Test Strapi admin
curl -H "Host: yourdomain.com" http://$INGRESS_IP/admin

# Test Strapi API
curl -H "Host: yourdomain.com" http://$INGRESS_IP/api/articles
```

## Port Forwarding (for local testing)

```bash
# Test Next.js frontend
kubectl port-forward service/blog-frontend 3000:3000
# Visit http://localhost:3000

# Test Strapi (in another terminal)
kubectl port-forward service/strapi 1337:1337
# Visit http://localhost:1337/admin
```

## Access

After deployment:
- **Blog Frontend**: `http://<ingress-ip>/`
- **Strapi Admin**: `http://<ingress-ip>/admin`
- **Strapi API**: `http://<ingress-ip>/api`

## Sample Next.js Integration

The frontend should connect to Strapi using the `STRAPI_URL` environment variable:

```javascript
// lib/strapi.js
export async function fetchAPI(path) {
  const requestUrl = `${process.env.STRAPI_URL}${path}`;
  const response = await fetch(requestUrl);
  return response.json();
}
```

## Scaling

Scale the frontend for higher traffic:

```bash
kubectl scale deployment blog-frontend --replicas=3
```
