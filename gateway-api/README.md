## Gateway API Application Stack
### 🛠 Template Overview

This template deploys a modern, scalable application architecture using the **Kubernetes Gateway API**. It moves beyond the limitations of standard Ingress by providing a modular framework that separates infrastructure management from application routing.

**Architecture Components:**

* **Gateway API Infrastructure:**
* `GatewayClass`: Sets the organizational standard (e.g., Envoy or Istio).
* `Gateway`: The entry point for external traffic, managing public IPs and Port 443 (HTTPS).
* `HTTPRoute`: Sophisticated L7 routing that maps hostnames to internal services.


* **Automated Security:** Integrates **Cert-Manager** with Let's Encrypt to automatically provision and renew SSL/TLS certificates.
* **Elastic Scaling:** A **Horizontal Pod Autoscaler (HPA)** that monitors CPU usage and scales your backend from 2 to 10 replicas automatically.
* **Decoupled Config:** Environment variables and secrets are managed via ConfigMaps and Opaque Secrets, keeping your container images generic and secure.

---

###  How to Verify the Gateway Flow

Since the Gateway API involves multiple layers, follow these steps to ensure traffic is flowing correctly from the internet to your Pods.

#### Step 1: Check Gateway Status

Ensure your Gateway has been assigned a public IP address by your infrastructure provider:

```bash
kubectl get gateway prod-gateway -n my-org-app

```

*Wait until the `READY` status is `True` and an `ADDRESS` is visible.*

#### Step 2: Verify TLS Certificate

Check that Cert-Manager has successfully validated your domain and issued the certificate:

```bash
kubectl get certificate -n my-org-app

```

#### Step 3: Test Scaling

You can simulate load to watch the HPA in action:

```bash
# In a separate terminal
kubectl get hpa app-scaler -n my-org-app --watch

```

---

### 📄 Manual YAML Configuration

Apply the complete modern networking stack with this command:

```bash
kubectl apply -f gateway-stack.yaml

```

**Resource Breakdown:**
This manifest creates the `my-org-app` Namespace. It includes an Nginx-based **Deployment**, a **ClusterIP Service**, and the full **Gateway API** suite. It also sets up a `ClusterIssuer` for production-grade SSL.

---

### 🛡 Security & Design

This template implements a **Role-Oriented** design. The `GatewayClass` and `Gateway` are typically managed by Infrastructure teams, while Application developers only need to manage the `HTTPRoute` to point traffic to their services.

---
### Stop Writing YAML, Start Designing

Kubernetes doesn't have to be a wall of text. **KubeKanvas** is a visual IDE for Kubernetes that transforms complex infrastructure into an interactive design board.

* **Drag-and-Drop:** Build your K8s resources visually rather than manually typing every line.
* **One-Click Deploy:** Push your designs directly to EKS, AKS, GKE, or local clusters.

### 🚀 Quick Start with KubeKanvas

1. **Launch the Template:** Click the **[Open in KubeKanvas](https://www.kubekanvas.io/templates/gateway-api-application-stack-with-kubernetes)** button above.
2. **Visualize & Edit:** Use the KubeKanvas interface to tweak replicas, adjust resource limits, or rename services visually. To see the platform in action, check out [how KubeKanvas works](https://www.kubekanvas.io/how-kubekanvas-works).
3. **Deploy:** Connect your cluster and use the integrated CLI to deploy the entire stack in seconds.



