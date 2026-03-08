# OpenClaw Gateway on Kubernetes

> **Related Article**: This template accompanies the tutorial "[Deploying OpenClaw in Kubernetes](https://www.kubekanvas.io/blog/deploying-open-claw-in-kubernetes)" published on KubeKanvas.io. The article walks through the full setup, explains the reasoning behind each decision, and includes a real-world example of using OpenClaw to monitor a website and send WhatsApp alerts.

## Quick Deploy

**For impatient readers:**

```bash
kubectl apply -f all.yaml
```

**Prefer a visual overview first?**
Browse and edit every resource before applying it using the [OpenClaw template on KubeKanvas](https://www.kubekanvas.io/templates/openclaw-in-kubernetes).

## What This Template Creates

**Isolation:**

- **Namespace** (`openclaw`) to keep everything separate from other workloads

**Secrets:**

- **Secret** for API keys (Telegram, Anthropic, Discord) — update with your own base64-encoded values

**Storage:**

- **PVC** (10Gi) for OpenClaw config at `/root/.openclaw`
- **PVC** (20Gi) for workspace data at `/root/workspace`
- Both use ReadWriteOnce — standard block storage, no NFS needed

**Application:**

- **Deployment** running a single OpenClaw gateway pod
- Liveness and readiness probes on `/health`
- Resource requests (1 CPU / 1Gi) and limits (2 CPU / 2Gi)

**Networking:**

- **ClusterIP Service** on port 18789
- **Ingress** with NGINX annotations for extended WebSocket timeouts (3600s) and optional TLS via cert-manager

## Files Overview

| File              | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `namespace.yaml`  | Creates the `openclaw` namespace                  |
| `secret.yaml`     | Stores API tokens as a Kubernetes Secret          |
| `pvc.yaml`        | Persistent volume claims for config and workspace |
| `deployment.yaml` | Single-pod gateway deployment with health checks  |
| `service.yaml`    | ClusterIP service exposing port 18789             |
| `ingress.yaml`    | Ingress with WebSocket-friendly timeouts          |
| `all.yaml`        | Everything above in one file                      |

## Prerequisites

- A running Kubernetes cluster (Docker Desktop, Minikube, or any cloud provider)
- `kubectl` configured and pointing at your cluster
- NGINX Ingress Controller installed (for the Ingress resource)
- cert-manager installed (optional, only if you want automatic TLS)

## Before You Deploy

**1. Update the Secret**

Replace the placeholder values in `secret.yaml` (or in `all.yaml`) with your own base64-encoded tokens:

```bash
echo -n 'your-telegram-token' | base64
echo -n 'your-anthropic-key' | base64
echo -n 'your-discord-token' | base64
```

Paste the output into the corresponding fields.

**2. Set your hostname**

In `ingress.yaml`, replace `openclaw.example.com` with the domain you want to use. If you are testing locally, you can add an entry to `/etc/hosts`:

```
127.0.0.1 openclaw.local
```

and change the host to `openclaw.local`.

## Deployment Order

If applying files individually:

```bash
# 1. Namespace first
kubectl apply -f namespace.yaml

# 2. Secret and storage
kubectl apply -f secret.yaml
kubectl apply -f pvc.yaml

# 3. Deploy the gateway
kubectl apply -f deployment.yaml

# 4. Wait for it to be ready
kubectl wait --for=condition=ready pod -l app=openclaw-gateway -n openclaw --timeout=120s

# 5. Expose it
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

## Verify It Works

```bash
# Check the pod is running
kubectl get pods -n openclaw

# Check logs
kubectl logs -n openclaw -l app=openclaw-gateway

# Port-forward for quick local access (skip if using Ingress)
kubectl port-forward -n openclaw svc/openclaw-service 18789:18789
```

Then open `http://localhost:18789` in your browser.

## Why a Single Pod?

OpenClaw stores config on disk and runs cron jobs internally. Multiple replicas would need shared (RWX) storage, cron deduplication logic, and careful state management. A single pod with ReadWriteOnce storage avoids all of that. Kubernetes still restarts it automatically if anything goes wrong, so you get self-healing without the complexity.

## Cleanup

```bash
kubectl delete namespace openclaw
```

This removes everything: the deployment, services, secrets, PVCs, and ingress.
