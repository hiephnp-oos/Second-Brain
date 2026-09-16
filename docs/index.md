# Second-Brain Knowledge Portal

Second-Brain is a provider-independent AI working-context layer. The repository remains the source of truth; this site is only a presentation and navigation layer.

## System

- [AI Memory](../AI_MEMORY.md)
- [Workflow](../WORKFLOW.md)
- [Repository Contract](../REPOSITORY_CONTRACT.md)
- [Repository README](../README.md)

## Navigation

The authoritative topic registry lives in `AI_MEMORY.md`. Topic content remains under `TOPICS/`.

## Visual architecture

```mermaid
flowchart TD
    A[Conversation / User Request] --> B[AI_MEMORY]
    B --> C[Topic README]
    C --> D[Workstream / Artifact]
    D --> E[Work]
    E --> F[Target State]
    F --> G[Change]
    G --> H[Reconcile]
    H --> I[Validate]
    I --> J[Verify]
    J --> K[Repository Source of Truth]
    K --> L[GitHub Pages]
    L --> M[Human Navigation / Visual Portal]
```

GitHub Pages does not create a second source of truth. Changes must be made in the repository and then reflected here through the normal publishing flow.
