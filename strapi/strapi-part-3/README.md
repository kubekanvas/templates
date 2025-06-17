# Strapi Blog Platform - Part 3

This directory contains all the Kubernetes YAML files needed for Part 3 of the Strapi blog platform tutorial - Production Readiness, Security, and Scaling.

## Files Overview

### Configuration & Secrets
- `strapi-configmap.yaml` - Configuration values for Strapi
- `strapi-secret.yaml` - Sensitive data (database credentials)

### HTTPS & TLS
- `letsencrypt-clusterissuer.yaml` - Let's Encrypt certificate issuer
- `blog-ingress-tls.yaml` - HTTPS-enabled ingress configuration

### Persistent Storage
- `strapi-uploads-pvc.yaml` - Storage for Strapi media uploads
- `postgres-backup-pvc.yaml` - Storage for database backups

### Production Deployments
- `strapi-deployment-production.yaml` - Production-ready Strapi deployment
- `blog-frontend-deployment-production.yaml` - Production-ready frontend deployment

### Auto-scaling
- `strapi-hpa.yaml` - Horizontal Pod Autoscaler for Strapi
- `blog-frontend-hpa.yaml` - Horizontal Pod Autoscaler for frontend

### Backup & Recovery
- `postgres-backup-cronjob.yaml` - Automated database backups

### Security
- `network-policies.yaml` - Network security policies

## Prerequisites

Before deploying Part 3:
1. Complete Part 1 and Part 2
2. Install cert-manager:
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
   ```
3. Have a domain name configured to point to your ingress
4. Update `your-domain.com` and `your-email@example.com` in the YAML files

## Pre-deployment Configuration

**Important**: Update these values before applying:

1. In `letsencrypt-clusterissuer.yaml`:
   - Replace `your-email@example.com` with your email

2. In `blog-ingress-tls.yaml`:
   - Replace `your-domain.com` with your actual domain

3. In production deployment files:
   - Update Docker image references to your registry

## Deployment Order

Apply configurations in this order:

```bash
# 1. Configuration and secrets
kubectl apply -f strapi-configmap.yaml
kubectl apply -f strapi-secret.yaml

# 2. Storage for uploads and backups
kubectl apply -f strapi-uploads-pvc.yaml
kubectl apply -f postgres-backup-pvc.yaml

# 3. Production deployments (replace existing ones)
kubectl apply -f strapi-deployment-production.yaml
kubectl apply -f blog-frontend-deployment-production.yaml

# 4. Certificate management
kubectl apply -f letsencrypt-clusterissuer.yaml

# 5. HTTPS ingress (replace existing ingress)
kubectl apply -f blog-ingress-tls.yaml

# 6. Auto-scaling
kubectl apply -f strapi-hpa.yaml
kubectl apply -f blog-frontend-hpa.yaml

# 7. Backup automation
kubectl apply -f postgres-backup-cronjob.yaml

# 8. Network security
kubectl apply -f network-policies.yaml
```

## Quick Deploy (Production Upgrade)

To upgrade to production configuration:

```bash
kubectl apply -f .
```

## Verification

Check that everything is working:

```bash
# Check all pods are running
kubectl get pods

# Check autoscalers
kubectl get hpa

# Check certificates
kubectl get certificate

# Check ingress with TLS
kubectl get ingress

# Check backup cronjob
kubectl get cronjob

# Check network policies
kubectl get networkpolicy
```

## Certificate Verification

Check that Let's Encrypt certificates are working:

```bash
# Check certificate status
kubectl describe certificate blog-tls

# Check certificate issuer
kubectl describe clusterissuer letsencrypt-http

# Test HTTPS access
curl -I https://your-domain.com
```

## Backup Testing

Test the backup system:

```bash
# Manually trigger a backup job
kubectl create job --from=cronjob/postgres-backup manual-backup-test

# Check backup job status
kubectl get job manual-backup-test

# View backup logs
kubectl logs job/manual-backup-test
```

## Monitoring

Monitor your production deployment:

```bash
# Check resource usage
kubectl top pods

# View autoscaling events
kubectl get hpa -w

# Check ingress traffic
kubectl logs -n ingress-nginx deployment/ingress-nginx-controller

# View application logs
kubectl logs -l app=strapi
kubectl logs -l app=blog-frontend
```

## Scaling

Manual scaling (autoscaler will override):

```bash
# Scale Strapi
kubectl scale deployment strapi --replicas=3

# Scale frontend
kubectl scale deployment blog-frontend --replicas=5
```

## Access

After successful deployment:
- **Blog Frontend (HTTPS)**: `https://your-domain.com/`
- **Strapi Admin (HTTPS)**: `https://your-domain.com/admin`
- **Strapi API (HTTPS)**: `https://your-domain.com/api`

## Security Features

This deployment includes:
- **HTTPS/TLS**: Encrypted communication with auto-renewing certificates
- **Network Policies**: Restricted pod-to-pod communication
- **Secrets Management**: Sensitive data properly stored
- **Resource Limits**: Prevents resource exhaustion
- **Health Checks**: Automatic restart of unhealthy pods

## Performance Features

- **Horizontal Pod Autoscaling**: Automatic scaling based on CPU/memory
- **Persistent Storage**: Durable file storage
- **Load Balancing**: Traffic distributed across multiple pods
- **Automated Backups**: Regular database backups with retention

## Troubleshooting

Common issues and solutions:

1. **Certificate not issued**: Check domain DNS and cert-manager logs
2. **Pods not scaling**: Check HPA conditions and metrics-server
3. **Network policies blocking**: Review policy rules and pod labels
4. **Backup failing**: Check storage permissions and database connectivity
