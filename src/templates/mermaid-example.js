// Template: Mermaid Example
export const template = {
  id: "mermaid-example",
  icon: "📊",
  category: "example",
  name: "Mermaid Example",
  description: "ตัวอย่างเอกสารที่มี Mermaid diagrams หลากหลายประเภท",
  content: `# 📊 คู่มือสถาปัตยกรรมระบบ

เอกสารนี้อธิบายสถาปัตยกรรมและ flow การทำงานของระบบ E-commerce ของเรา

## 🏗️ สถาปัตยกรรมระบบ

ระบบประกอบด้วย 3 ส่วนหลัก คือ Frontend, Backend และ Database

\`\`\`mermaid
graph TD
    A[ผู้ใช้] --> B[Frontend<br/>React App]
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

## 🔄 วงจรการสั่งซื้อสินค้า

Flow การสั่งซื้อเริ่มจากการเลือกสินค้าจนถึงการชำระเงิน

\`\`\`mermaid
flowchart LR
    A[เลือกสินค้า] --> B[เพิ่มลงตะกร้า]
    B --> C{ตะกร้าว่าง?}
    C -->|ใช่| A
    C -->|ไม่| D[ดูรายการ]
    D --> E[ยืนยันคำสั่งซื้อ]
    E --> F[เข้าสู่ระบบ?]

    F -->|ไม่| G[ล็อกอิน/สมัครสมาชิก]
    G --> E
    F -->|ใช่| H[ชำระเงิน]

    H --> I{ชำระสำเร็จ?}
    I -->|ไม่สำเร็จ| J[แจ้งเตือน]
    I -->|สำเร็จ| K[ยืนยันคำสั่งซื้อ]
    K --> L[ส่งอีเมลยืนยัน]

    style A fill:#e3f2fd
    style K fill:#c8e6c9
    style I fill:#fff9c4
\`\`\`

## 📈 ยอดขายรายเดือน

สถิติยอดขายของปี 2024

\`\`\`mermaid
xychart-beta
    title "ยอดขายรายเดือน (บาท)"
    x-axis ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
    y-axis "ยอดขาย (ล้านบาท)" 0 --> 10
    bar [5.2, 4.8, 6.1, 5.9, 7.2, 6.8, 8.1, 7.9, 6.5, 7.8, 8.5, 9.2]
    line [5.2, 4.8, 6.1, 5.9, 7.2, 6.8, 8.1, 7.9, 6.5, 7.8, 8.5, 9.2]
\`\`\`

## 🎯 โครงสร้างทีม

ทีมพัฒนาประกอบด้วยบทบาทที่แตกต่างกัน

\`\`\`mermaid
mindmap
  root((ทีมพัฒนา))
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

## ⏱️ Timeline การพัฒนา

แผนการพัฒนาในไตรมาสที่ 2 ปี 2025

\`\`\`mermaid
gantt
    title ไทม์ไลน์การพัฒนา Q2/2025
    dateFormat  YYYY-MM-DD
    section ระบบสมาชิก
    ออกแบบ          :done, des1, 2025-04-01, 2025-04-10
    พัฒนา Frontend  :active, dev1, 2025-04-11, 15d
    พัฒนา Backend   :dev2, 2025-04-11, 20d
    ทดสอบ          :test1, 2025-05-01, 10d

    section ระบบชำระเงิน
    ออกแบบ          :des2, 2025-04-15, 10d
    พัฒนา           :dev3, 2025-04-25, 25d
    ทดสอบ          :test2, after dev3, 10d

    section ระบบจัดส่ง
    ออกแบบ          :des3, 2025-05-10, 10d
    พัฒนา           :dev4, 2025-05-20, 20d
\`\`\`

## 🔷 ความสัมพันธ์ระหว่างส่วนประกอบ

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

*เอกสารนี้สร้างด้วย Markdown Preview พร้อมระบบแสดงผล Mermaid Diagrams*`,
};
