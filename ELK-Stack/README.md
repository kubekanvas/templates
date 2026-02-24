
## ELK Stack on Kubernetes: Collect, Store, and Visualize Nginx Logs

### 🛠 Template Overview

This template provides a production-ready blueprint for a centralized logging system. It automates the deployment of the Elastic stack, ensuring your logs are centralized and searchable from day one.

**Architecture Components:**

* **Elasticsearch:** A StatefulSet for reliable, persistent data storage.
* **Logstash:** Processes incoming logs via a pre-configured pipeline to ensure they are structured correctly.
* **Kibana:** The visualization layer for querying your data and building dashboards.
* **Filebeat:** A DaemonSet that ships logs from every node in your cluster to Logstash.
* **Nginx App:** A sample application included as the primary log source for testing.
* **Ingress:** Pre-configured routing for external access to both Kibana and the sample app.

---

### Stop Writing YAML, Start Designing

Kubernetes doesn't have to be a wall of text. **KubeKanvas** is a visual IDE for Kubernetes that transforms complex infrastructure into an interactive design board.

* **Drag-and-Drop:** Build your K8s resources visually rather than manually typing every line.
* **One-Click Deploy:** Push your designs directly to EKS, AKS, GKE, or local clusters.

### 🚀 Quick Start with KubeKanvas

1. **Launch the Template:** Click the **[Open in KubeKanvas](https://www.kubekanvas.io/templates/elk-stack-on-kubernetes-collect-store-and-visualize-nginx-logs)** button above.
2. **Visualize & Edit:** Use the KubeKanvas interface to tweak replicas, adjust resource limits, or rename services visually. To see the platform in action, check out [how KubeKanvas works](https://www.kubekanvas.io/how-kubekanvas-works).
3. **Deploy:** Connect your cluster and use the integrated CLI to deploy the entire stack in seconds.

---

### 📄 Manual YAML Configuration

If you prefer the command line, you can apply the manifests directly using the following command:

```bash
kubectl apply -f template.yaml

```

**Prerequisite: NGINX Ingress Controller**
The Ingress rules in this template require a controller to function. If your cluster doesn't have one, you can install the official [Install NGINX](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml).

**Resource Breakdown:**
This stack includes the **elk-demo1** Namespace for logical isolation. Within it, you'll find an Elasticsearch **StatefulSet** for storage, a Filebeat **DaemonSet** for harvesting, Logstash and Kibana **Deployments** for processing and UI, and an **Ingress** controller to route traffic to `elk.local/kibana`.

