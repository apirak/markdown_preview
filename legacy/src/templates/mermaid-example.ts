import type { Template } from "../types.js";

// Template: Mermaid Example
export const template: Template = {
  id: "mermaid-example",
  icon: "📊",
  category: "example",
  name: "Mermaid Example",
  description: "Example document with various Mermaid diagram types",
  content: `# 📊 System Architecture Guide

This document describes the architecture and workflow of our E-commerce system.

## 🏗️ System Architecture

The system consists of 3 main parts: Frontend, Backend, and Database.

\`\`\`mermaid
graph TD
    A[User] --> B[Frontend<br/>React App]
    B --> C[API Gateway]
    C --> D[Auth Service]
    C --> E[Product Service]
    C --> F[Order Service]

    D --> G[(User DB)]
    E --> H[(Product DB)]
    F --> I[(Order DB)]

    F --> J[Payment Service]
    J --> K[Bank API]

    style A fill:#e1f5fe
    style B fill:#fff3e0
    style C fill:#f3e5f5
    style G fill:#e8f5e9
    style H fill:#e8f5e9
    style I fill:#e8f5e9
\`\`\`

## 🔄 Order Flow

The order flow starts from selecting products to making payment.

\`\`\`mermaid
flowchart LR
    A[Select Product] --> B[Add to Cart]
    B --> C{Cart Empty?}
    C -->|Yes| A
    C -->|No| D[View Items]
    D --> E[Confirm Order]
    E --> F[Logged In?]

    F -->|No| G[Login/Register]
    G --> E
    F -->|Yes| H[Make Payment]

    H --> I{Payment Success?}
    I -->|Failed| J[Show Alert]
    I -->|Success| K[Confirm Order]
    K --> L[Send Confirmation Email]

    style A fill:#e3f2fd
    style K fill:#c8e6c9
    style I fill:#fff9c4
\`\`\`

## 📈 Monthly Sales

Sales statistics for 2024

\`\`\`mermaid
xychart-beta
    title "Monthly Sales (USD)"
    x-axis ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    y-axis "Sales (x1000 USD)" 0 --> 10
    bar [5.2, 4.8, 6.1, 5.9, 7.2, 6.8, 8.1, 7.9, 6.5, 7.8, 8.5, 9.2]
    line [5.2, 4.8, 6.1, 5.9, 7.2, 6.8, 8.1, 7.9, 6.5, 7.8, 8.5, 9.2]
\`\`\`

## 🎯 Team Structure

The development team consists of different roles.

\`\`\`mermaid
mindmap
  root((Dev Team))
    Frontend
      React Dev
      UI/UX Designer
      QA Tester
    Backend
      Node.js Dev
      Database Admin
      API Developer
    DevOps
      Cloud Engineer
      CI/CD Specialist
      Security Expert
\`\`\`

## ⏱️ Development Timeline

Development plan for Q2 2025

\`\`\`mermaid
gantt
    title Development Timeline Q2/2025
    dateFormat  YYYY-MM-DD
    section Membership System
    Design           :done, des1, 2025-04-01, 2025-04-10
    Frontend Dev     :active, dev1, 2025-04-11, 15d
    Backend Dev      :dev2, 2025-04-11, 20d
    Testing          :test1, 2025-05-01, 10d

    section Payment System
    Design           :des2, 2025-04-15, 10d
    Development      :dev3, 2025-04-25, 25d
    Testing          :test2, after dev3, 10d

    section Shipping System
    Design           :des3, 2025-05-10, 10d
    Development      :dev4, 2025-05-20, 20d
\`\`\`

## 🔷 Entity Relationships

\`\`\`mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string id PK
        string name
        string email
        string phone
    }
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER ||--|| PAYMENT : has
    ORDER {
        string id PK
        date created_at
        string status
        float total
    }
    ORDER_ITEM }|--|| PRODUCT : references
    ORDER_ITEM {
        string id PK
        int quantity
        float price
    }
    PRODUCT {
        string id PK
        string name
        float price
        int stock
    }
    PAYMENT {
        string id PK
        float amount
        string method
        string status
    }
\`\`\`

---

*This document was created with Markdown Preview with Mermaid Diagrams rendering*`,
};
