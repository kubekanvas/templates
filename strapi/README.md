# Strapi Blog Platform on Kubernetes

This repository contains all the Kubernetes YAML files and configurations needed to deploy a complete blog platform using Strapi CMS, Next.js frontend, and PostgreSQL database on Kubernetes.

## 📖 Tutorial Series

This repository accompanies a 3-part tutorial series:

1. **Part 1**: [Deploying Strapi CMS in Kubernetes and expose it using service. View the deployed instance using port-forwarding](https://www.kubekanvas.io/blog/building-a-modern-blog-with-strapi-and-kubernetes-your-first-cms-in-the-cloud)
2. **Part 2**: [Adding Next.js Frontend with Ingress Routing to provide a beautiful read only blog view to the customers]](https://www.kubekanvas.io/blog/building-and-deploying-a-modern-blog-platform-with-next-js-strapi-and-kubernetes-part-2-adding-the-frontend).
3. **Part 3**: Adding Postgresql to persist data in strapi and use of AWS S3 to save the media files.

## 🚀 Quick Start

### Prerequisites

- Kubernetes cluster (local or cloud)
- kubectl configured
- Ingress controller installed in the local cluster. Instructions for installation are present in the Part 2.
- For Part 3: Cert-manager installed, installation instructions are present in Part 3.

### Deployment Options

#### Option 1: Follow Step by Step
1. Start with `strapi-part-1/` - Deploy the basic CMS
2. Continue with `strapi-part-2/` - Add the frontend
3. Finish with `strapi-part-3/` - Production hardening

#### Option 2: Deploy Complete Stack
```bash
# Clone this repository
git clone <your-repo-url>
cd strapi

# Deploy everything (requires updating configurations)
kubectl apply -f strapi-part-1/
kubectl apply -f strapi-part-2/
kubectl apply -f strapi-part-3/
```

## 🛠️ What You'll Build

### Architecture Overview
```
Internet → Ingress → Next.js Frontend
                  → Strapi CMS → PostgreSQL
```

### Components
- **Strapi CMS**: Headless content management system
- **Next.js Frontend**: React-based blog frontend  
- **PostgreSQL**: Database for content storage
- **Ingress**: HTTP/HTTPS routing and load balancing
- **AWS S3 Bucket**: AWS S3 bucket for media storage.

### Production Features (Part 3)
- ✅ Postgresql for persistence.
- ✅ Persistent storage for uploads
- ✅ Resource limits and health checks
- ✅ ConfigMaps and Secrets for configuration

## 📋 Configuration Required

Before deployment, update these values:

### Part 1
- Update Docker image names in deployment files
- Build and push your Strapi application image

### Part 2
- Update Docker image names in deployment files
- Build and push your Next.js application image

### Part 3  
- Update AWS Bucket name and other required variables. 

## 🔍 Verification

After deployment, verify everything is working:

```bash
# Check all pods are running
kubectl get pods

# Check services
kubectl get services  

# Check ingress
kubectl get ingress

```


## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the Kubernetes and JAMstack communities**
   ```env
   STRAPI_API_URL=https://your-strapi-instance.com
   STRAPI_TOKEN=your-api-token
   ```


## Contributing

1. Create new branch:
   ```bash
   git checkout -b feature/article-slug
   ```
2. Add content following [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
3. Open Merge Request with:
   - Required labels (tech, editorial, SEO)
   - Associated milestone
4. Monitor CI/CD pipeline status

**Built with ❤️ for the Kubernetes and JAMstack communities**
