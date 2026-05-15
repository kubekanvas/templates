You are writing a template page for KubeKanvas (kubekanvas.io), a platform that provides
ready-to-use Kubernetes deployment templates. The page serves two purposes:
(1) help developers understand and deploy the template quickly, and
(2) rank in search engines for queries like "how to deploy [technology] on Kubernetes",
"[technology] Kubernetes template", "[technology] Kubernetes deployment".
The total output must be under 5000 characters including all headings and text.
Do not use em dashes (—) anywhere in the output.

---

[TEMPLATE INPUT]
Template Name: <e.g. Strapi + Next.js Kubernetes Template>
Technologies: <e.g. Strapi CMS, Next.js, NGINX Ingress>
Components:

- <Component name> | <Type: Deployment/Service/Ingress/ConfigMap/etc.> | <Port if any> | <Role>
- (repeat for each component)
  Primary SEO keywords: <e.g. deploy Strapi on Kubernetes, Strapi Kubernetes, headless CMS Kubernetes>
  Target audience: <e.g. developers building headless CMS setups, teams needing scalable blog infrastructure>
  Cluster requirements: <e.g. Docker Desktop, Minikube, any Kubernetes cluster + NGINX Ingress Controller>
  Blog article URL: <full URL of the related KubeKanvas blog article, or "none">
  Special notes: <any gotchas, env vars needed, image sources, etc.>

---

Using the above input, generate the following sections in order. Do not invent components or
steps that are not listed in the input. Do not add padding or filler text.
**1. Page Title (H1)**
Write a single keyword-rich, action-oriented title. Format: "Deploy [Tech A] + [Tech B] on
Kubernetes: [short qualifier]". Max 70 characters.
**2. Introduction (2-3 sentences)**
State the problem this template solves, what it deploys, and who it is for.
Naturally include the primary SEO keywords. Do not start with "This template".
**3. What's Included**
A markdown table with columns: Component | Type | Port | Role.
List every component from the input exactly as provided.
**4. Architecture Overview (1 paragraph, max 80 words)**
Describe how the components connect and interact. Mention the ingress/routing strategy
if present. Use concrete technical language, not marketing language.
**5. Prerequisites**
A short bulleted list (max 5 items) of what the user needs before deploying.
Do NOT include kubectl as a standalone prerequisite.
Always include the following as the last bullet point:
"KubeKanvas CLI installed and running on your computer (Optional, if you want to use KubeKanvas one-click deployment)"
**6. How to Deploy (numbered steps)**
Write 4-6 clear, numbered steps a developer would follow to deploy this template on
KubeKanvas. Steps should be concise and imperative (start with a verb).
The second-to-last step must always read:
"Deploy the template to your cluster via the KubeKanvas Play button in the top right bar. If you want to deploy manually, download the YAML and use kubectl to apply the template."
The last step must always read:
"Wait for all pods to reach Running status. You can view the deployment progress in the Release Monitor screen."
**7. Use Cases**
3-5 bullet points describing concrete scenarios where this template is a good fit.
Format each bullet as "**Label:** Description." Be specific — avoid generic statements
like "teams that want scalability".
**8. Summary (2 sentences)**
Wrap up with the core value proposition. Naturally include 1-2 primary SEO keywords.
If a blog article URL was provided in the input, end with:
"For a detailed deployment guide, read our article [Article Title](article-url)."
If no blog article URL was provided, end with a soft call to action pointing to KubeKanvas.

---

Output only the sections above, formatted in clean markdown.
Do not add extra sections, introductory remarks, or closing notes.
