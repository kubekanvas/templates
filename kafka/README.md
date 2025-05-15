# Building an Event-Driven System Using Kafka on Kubernetes (Manually)

## Introduction

In this article, we'll walk through the manual setup of an event-driven architecture on Kubernetes using Apache Kafka. We will also highlight the time, complexity, and error-prone nature of doing it manually, followed by how **KubeKanvas** can simplify the process significantly.

## Scenario Overview

We want to build a simple system that includes a Kafka cluster, a producer service that generates events, a consumer service that processes events, Kubernetes manifests for deploying all components, and Ingress and network policies to ensure secure communication between services.

---

## Why Manual YAML Takes Time

Writing Kubernetes YAML manifests manually is time-consuming due to several factors. First, Kubernetes manifests are verbose, meaning even the simplest deployments require defining multiple resources such as Deployments, Services, ConfigMaps, and Secrets. This verbosity leads to significant repetition across files, increasing the risk of copy-paste errors. YAML is also notoriously whitespace-sensitive, and a minor indentation mistake can break the entire configuration. Adding security elements like Ingress and NetworkPolicies introduces another layer of complexity. These resources require specific domain knowledge to configure correctly and securely. Furthermore, Kubernetes has a low feedback loop when it comes to manifest validation. Errors are often discovered only after applying the configurations to the cluster, which slows down iteration and increases the likelihood of runtime failures.

---

## Manual Setup: Step-by-Step

### Step 1: Deploy Kafka using Bitnami Helm Chart

```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install kafka bitnami/kafka --set replicaCount=1
```

Estimated Time: 10–15 minutes

### Step 2: Create Namespace and Secret

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: kafka-demo
---
apiVersion: v1
kind: Secret
metadata:
  name: kafka-credentials
  namespace: kafka-demo
  labels:
    app: kafka-demo
stringData:
  username: user
  password: pass
```

Estimated Time: 5 minutes

### Step 3: Create the Kafka Producer Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka-producer
  namespace: kafka-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka-producer
  template:
    metadata:
      labels:
        app: kafka-producer
    spec:
      containers:
        - name: producer
          image: myorg/kafka-producer:latest
          env:
            - name: KAFKA_BROKER
              value: kafka.kafka.svc.cluster.local:9092
            - name: TOPIC
              value: events
```

Estimated Time: 15–20 minutes

### Step 4: Create the Kafka Consumer Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka-consumer
  namespace: kafka-demo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka-consumer
  template:
    metadata:
      labels:
        app: kafka-consumer
    spec:
      containers:
        - name: consumer
          image: myorg/kafka-consumer:latest
          env:
            - name: KAFKA_BROKER
              value: kafka.kafka.svc.cluster.local:9092
            - name: TOPIC
              value: events
```

Estimated Time: 15–20 minutes

### Step 5: Define Services for Communication

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kafka-producer
  namespace: kafka-demo
spec:
  selector:
    app: kafka-producer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: kafka-consumer
  namespace: kafka-demo
spec:
  selector:
    app: kafka-consumer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

Estimated Time: 10 minutes

### Step 6: Configure Ingress for External Access

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: kafka-ingress
  namespace: kafka-demo
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: kafka.example.com
      http:
        paths:
          - path: /producer
            pathType: Prefix
            backend:
              service:
                name: kafka-producer
                port:
                  number: 80
          - path: /consumer
            pathType: Prefix
            backend:
              service:
                name: kafka-consumer
                port:
                  number: 80
```

Estimated Time: 10–15 minutes

### Step 7: Define Network Policies for Security

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-producer-to-kafka
  namespace: kafka-demo
spec:
  podSelector:
    matchLabels:
      app: kafka
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: kafka-producer
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-kafka-to-consumer
  namespace: kafka-demo
spec:
  podSelector:
    matchLabels:
      app: kafka-consumer
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: kafka
```

Estimated Time: 15–20 minutes

---

## Total Time Estimate (Manual Setup)

| Task                          | Time Estimate |
| ----------------------------- | ------------- |
| Kafka Helm Install            | 15 min        |
| Namespace & Secret            | 5 min         |
| Producer Deployment & Service | 20 min        |
| Consumer Deployment & Service | 20 min        |
| Ingress Configuration         | 15 min        |
| Network Policies              | 20 min        |
| **Total**                     | **\~95 min**  |

---

## KubeKanvas Comparison

With **KubeKanvas**, this entire system can be visually designed and auto-generated in approximately 10 to 15 minutes, including real-time validation of the entire setup. All configurations are automatically schema-validated, reducing the possibility of syntax errors. YAML manifests, Helm charts, and GitOps-ready folder structures are exported instantly. Ingress rules, service endpoints, and network policies are handled visually and with consistency, eliminating the need for manually managing and cross-referencing interdependent resource definitions.

KubeKanvas significantly reduces setup time, in some cases offering up to 80% time savings. It eliminates syntax-related issues through auto-validation and introduces built-in security by abstracting the configuration of network policies and Ingress into intuitive visual workflows. Teams benefit from improved collaboration as visual modeling removes ambiguity and promotes shared understanding of system architecture.

---

## Conclusion

Manually setting up an event-driven architecture on Kubernetes is a detailed, error-prone process that can consume over 1.5 hours even for experienced engineers. Each step, from creating deployments and services to configuring secure communication with Ingress and network policies, involves intricacies that are difficult to automate without specialized tooling. With **KubeKanvas**, teams accelerate development, reduce configuration errors, and ensure consistent security—all from an intuitive, visual interface.

Embrace KubeKanvas to modernize your Kubernetes workflows and ship faster with confidence.
