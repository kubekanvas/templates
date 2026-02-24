## PostgreSQL StatefulSet: Persistent Storage & Automated SQL Backups

### 🛠 Template Overview

This template deploys a production-grade PostgreSQL 15 database. It is engineered to eliminate common stateful pitfalls like data loss and unstable networking by utilizing stable Pod identities and dedicated storage claims.

**Architecture Components:**

* **PostgreSQL StatefulSet:** A 3-replica cluster using the lightweight Alpine image.
* **Persistent Storage:** 10Gi volumes that automatically reattach to Pods, ensuring data survives rescheduling.
* **Dual-Service Networking:**
* `postgres-headless`: Allows direct DNS resolution for backups and replication (e.g., `postgres-0.postgres-headless`).
* `postgres-service`: A standard ClusterIP for application-level traffic.


* **Automated Backups:** A CronJob that performs a `pg_dump` every night at 2:00 AM, storing results on a separate 5Gi backup volume.

---

### 🚀 Verification & Client Access

To ensure your database is running and the credentials are correct, you can test the connection using a temporary container.

#### Step 1: Launch Temporary Postgres Client

Run this command to start an interactive shell with the `psql` tool:

```bash
kubectl run pg-client --rm -it --image=postgres:15-alpine --restart=Never --env="PGPASSWORD=mypassword" -- sh

```

#### Step 2: Connect & Query

Once inside the shell, connect to the load-balanced service:

```bash
psql -h postgres-service -U admin -d app_database

```

#### Step 3: Verify Persistence

Run the following SQL commands:

* `SELECT 1;` → (Verify connectivity)
* `CREATE TABLE test (id serial PRIMARY KEY, val text);`
* `INSERT INTO test (val) VALUES ('Verified via KubeKanvas');`
* `SELECT * FROM test;`

---

### 📄 Manual YAML Configuration

Apply the complete database stack using the following command:

```bash
kubectl apply -f postgres-stack.yaml

```

**Key Resource Highlights:**

* **Security:** Uses `runAsUser: 1000` and `fsGroup: 1000` to ensure the container doesn't run as root.
* **Health Checks:** Includes `pg_isready` probes to ensure traffic only hits healthy database instances.
* **Backup Retention:** The CronJob automatically purges backups older than 7 days to manage disk space.

---

### 🛡 Security & Design

This blueprint follows a **"Secret-First"** approach. Database credentials and the `POSTGRES_DB` name are decoupled into Secrets and ConfigMaps, allowing you to update configurations without altering the core deployment logic.

---
### Stop Writing YAML, Start Designing

Kubernetes doesn't have to be a wall of text. **KubeKanvas** is a visual IDE for Kubernetes that transforms complex infrastructure into an interactive design board.

* **Drag-and-Drop:** Build your K8s resources visually rather than manually typing every line.
* **One-Click Deploy:** Push your designs directly to EKS, AKS, GKE, or local clusters.

### 🚀 Quick Start with KubeKanvas

1. **Launch the Template:** Click the **[Open in KubeKanvas](https://www.kubekanvas.io/templates/deploy-postgresql-in-kubernetes-with-backup)** button above.
2. **Visualize & Edit:** Use the KubeKanvas interface to tweak replicas, adjust resource limits, or rename services visually. To see the platform in action, check out [how KubeKanvas works](https://www.kubekanvas.io/how-kubekanvas-works).
3. **Deploy:** Connect your cluster and use the integrated CLI to deploy the entire stack in seconds.


