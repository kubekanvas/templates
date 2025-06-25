# Strapi Blog Platform - Part 2

This directory contains all the Kubernetes YAML files and Docker configuration needed for Part 2 of the Strapi blog platform tutorial.

## Files Overview

- `blog-frontend-deployment.yaml` - Next.js frontend deployment
- `blog-frontend-service.yaml` - Frontend service for internal connectivity
- `blog-ingress.yaml` - Updated ingress to route traffic to both Strapi and frontend
- `blog-frontend` - Minimal frontend application setup and Dockerfile.

## Prerequisites

Before deploying Part 2, ensure you have completed Part 1:
- Strapi CMS deployed and accessible
- All Part 1 services working correctly

## Building the Frontend Docker Image

1. Check the blog=frontend included in this project. 
2. Use the provided Dockerfile to build the image and push to dockerhub or simply use locally.
3. Build and push to your registry:

```bash
# Build the image
docker build -t yourdockerhub/nextjs-blog:latest .

# Push to registry
docker push yourdockerhub/nextjs-blog:latest
```


## Deployment Order

To deploy everything at once use all.yaml. I would highly recommend to deploy everything one by one to get a good understanding of what you are doing. Remember to change the image name in the yaml files.

```bash
kubectl apply -f all.yaml
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
curl http://$INGRESS_IP/

# Test Strapi admin
curl  http://$INGRESS_IP/admin

```

## Port Forwarding (for local testing)

```bash
# Test Next.js frontend
kubectl port-forward service/frontend-service 3000:3000
# Visit http://localhost:3000

# Test Strapi (in another terminal)
kubectl port-forward service/strapi-service 1337:1337
# Visit http://localhost:1337/admin
```
