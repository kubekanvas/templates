## Redis StatefulSet: High-Availability Storage & Automated Backups

### 🛠 Template Overview

This template deploys a robust Redis cluster designed for data persistence and reliable access. It includes a self-healing StatefulSet and an automated backup mechanism to ensure your data is never lost.

**Architecture Components:**

* **Redis StatefulSet:** A 3-replica set (`redis-0`, `redis-1`, `redis-2`) ensuring stable identities and persistent storage.
* **Dual-Service Access:** * `redis-headless`: For internal pod-to-pod communication.
* `redis-client-service`: A load-balanced ClusterIP for your applications.


* **ConfigMap & Secrets:** Decouples configuration (`redis.conf`) and sensitive credentials from the deployment logic.
* **CronJob Backup:** A scheduled task that captures RDB snapshots and stores them on a dedicated 5Gi volume.

---

### 🚀 Verification Guide

Once deployed, verify your Redis cluster is reachable and performing correctly using a temporary client pod.

#### Step 1: Launch Temporary Client Pod

Run this command to spin up an interactive shell within your cluster:

```bash
kubectl run redis-client-test --rm -it --image=redis:7-alpine --restart=Never --namespace project-redis-dev -- sh

```

#### Step 2: Connect via Client Service

Inside the pod shell, use the `redis-cli` to connect to the load-balanced service:

```bash
# Password from secret: mypassword
redis-cli -h redis-client-service -p 6379 -a mypassword

```

#### Step 3: Test Commands

Execute these commands to confirm read/write capabilities:

* `PING` → (Expected: `PONG`)
* `SET testkey "Hello via KubeKanvas"` → (Expected: `OK`)
* `GET testkey` → (Expected: `"Hello via KubeKanvas"`)

---

### 📄 Manual YAML Configuration

Apply the complete stack with a single command:

```bash
kubectl apply -f redis-stack.yaml

```

**Key Resource Highlights:**

* **Namespace:** `project-redis-dev`
* **Storage:** 5Gi per Redis node + 5Gi for the backup repository.
* **Security:** Pods run under non-root user (UID 1000) for enhanced security.
* **Backup Schedule:** Set to trigger every day at 3:00 AM (`0 3 * * *`).



### Stop Writing YAML, Start Designing

Kubernetes doesn't have to be a wall of text. **KubeKanvas** is a visual IDE for Kubernetes that transforms complex infrastructure into an interactive design board.

* **Drag-and-Drop:** Build your K8s resources visually rather than manually typing every line.
* **One-Click Deploy:** Push your designs directly to EKS, AKS, GKE, or local clusters.

### 🚀 Quick Start with KubeKanvas

1. **Launch the Template:** Click the **[Open in KubeKanvas](https://www.kubekanvas.io/templates/kubernetes-redis-deployment-client-service-access-and-verification)** button above.
2. **Visualize & Edit:** Use the KubeKanvas interface to tweak replicas, adjust resource limits, or rename services visually. To see the platform in action, check out [how KubeKanvas works](https://www.kubekanvas.io/how-kubekanvas-works).
3. **Deploy:** Connect your cluster and use the integrated CLI to deploy the entire stack in seconds.

