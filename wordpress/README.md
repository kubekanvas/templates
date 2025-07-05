# High-Available WordPress Deployment

> **Related Article**: This code accompanies the tutorial "[High Available WordPress Deployment in Kubernetes](https://www.kubekanvas.io/blog/high-available-word-press-deployment-in-kubernetes)" published on KubeKanvas.io. The article provides a comprehensive guide to deploying a production-ready WordPress site on Kubernetes with MySQL database, persistent storage, automated backups, and ingress routing for high availability and scalability.


## Quick Deploy

**For Impatient Readers:**
```bash
kubectl apply -f all.yaml
```

**For quick testing in local cluster:**
To deploy quickly in your local cluster without pressing keys on your keyboard, start with our template slightly modified for Docker Desktop cluster using this link: [High Availability WordPress Template for Deployment on Kubernetes](https://www.kubekanvas.io/templates/high-availability-wordpress-template-for-deployment-on-kubernetes)


This directory contains all the Kubernetes YAML files needed for deploying a high-available WordPress platform with MySQL backend.

## What This Template Creates

**Database Infrastructure:**
- **MySQL 8.0 StatefulSet** with persistent storage (20Gi)
- **MySQL ConfigMap** for database configuration
- **MySQL Secret** for secure credential management
- **Headless and ClusterIP Services** for database connectivity

**WordPress Application:**
- **WordPress Deployment** with PHP 8.1 and Apache
- **WordPress ConfigMap** for application configuration
- **WordPress Secret** for secure credential management
- **Persistent Volume Claim** (10Gi) for WordPress files
- **ClusterIP Service** with session affinity

**External Access:**
- **Ingress Controller** with NGINX annotations
- Support for both `wordpress.local` hostname and direct IP access
- Optimized for large file uploads (50MB limit)

**Backup System:**
- **MySQL Backup CronJob** (daily at 2 AM) with compression and retention
- **WordPress Files Backup CronJob** (daily at 3 AM) with exclusions
- **Backup PVC** (50Gi) for storing backup files

## Files Overview

### Core Components
- `mysql-config.yaml` - MySQL database configuration
- `mysql-secret.yaml` - MySQL credentials (update passwords!)
- `mysql-statefulset.yaml` - MySQL database deployment
- `mysql-headless-service.yaml` - StatefulSet headless service
- `mysql-service.yaml` - MySQL ClusterIP service

### WordPress Components
- `wordpress-config.yaml` - WordPress application configuration
- `wordpress-secret.yaml` - WordPress credentials and keys
- `wordpress-pvc.yaml` - Persistent storage for WordPress files
- `wordpress-deployment.yaml` - WordPress application deployment
- `wordpress-service.yaml` - WordPress ClusterIP service
- `wordpress-ingress.yaml` - External access configuration

### Backup Components
- `backup-pvc.yaml` - Persistent storage for backups
- `mysql-backup-cronjob.yaml` - Automated MySQL backups
- `wordpress-backup-cronjob.yaml` - Automated WordPress file backups

Feel free to not create these components if you are testing in your local.

## Prerequisites

- Kubernetes cluster (Docker Desktop/Minikube/Cloud)
- NGINX Ingress Controller installed
- kubectl configured to access your cluster
- At least 4GB RAM and 80Gi storage available

## Security Note

⚠️ **Important**: Before deploying, update the following files with secure passwords:
- `mysql-secret.yaml` - Update `MYSQL_ROOT_PASSWORD` and `MYSQL_PASSWORD`
- `wordpress-secret.yaml` - Update all authentication keys and database password

## Deployment Order

Deploy in this sequence for proper dependency management:

```bash
# 1. Deploy MySQL infrastructure
kubectl apply -f mysql-config.yaml
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-statefulset.yaml
kubectl apply -f mysql-headless-service.yaml
kubectl apply -f mysql-service.yaml

# 2. Wait for MySQL to be ready
kubectl wait --for=condition=ready pod -l app=mysql --timeout=300s

# 3. Deploy WordPress
kubectl apply -f wordpress-config.yaml
kubectl apply -f wordpress-secret.yaml
kubectl apply -f wordpress-pvc.yaml
kubectl apply -f wordpress-deployment.yaml
kubectl apply -f wordpress-service.yaml
kubectl apply -f wordpress-ingress.yaml

# 4. Deploy backup system
kubectl apply -f backup-pvc.yaml
kubectl apply -f mysql-backup-cronjob.yaml
kubectl apply -f wordpress-backup-cronjob.yaml
```


**Deploy All Individual Files:**
```bash
kubectl apply -f .
```

## Access

- **WordPress Site**: `http://wordpress.local` (add to `/etc/hosts`)
- **Direct Access**: Use ingress IP address
- **Port Forward**: `kubectl port-forward service/wordpress 8080:80`

## Verification

```bash
# Check all resources
kubectl get all

# Check persistent volumes
kubectl get pv,pvc

# Check WordPress logs
kubectl logs -l app=wordpress

# Check MySQL logs
kubectl logs -l app=mysql
```

## Features

✅ **High Availability**: StatefulSet for database, deployment strategies for zero-downtime updates  
✅ **Persistent Storage**: Separate storage for database and WordPress files  
✅ **Automated Backups**: Daily scheduled backups with retention policy  
✅ **Production Ready**: Resource limits, health checks, and security contexts  
✅ **Scalable**: Easy horizontal scaling for WordPress instances  
✅ **Optimized**: Configured for performance with memory limits and connection pooling  

This template provides a complete, production-ready WordPress platform suitable for blogs, corporate websites, and content management systems.
