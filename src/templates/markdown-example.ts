import type { Template } from "../types.js";

// Template: Markdown Example
export const template: Template = {
  id: "markdown-example",
  icon: "📝",
  category: "example",
  name: "Markdown Example",
  description: "A real-world document showcasing everyday Markdown usage",
  content: `# 📝 System User Guide

Welcome to the system user guide. This document will help you get started quickly.

## 🚀 Getting Started

Our system is designed to be easy and efficient. You can get started by:

1. Sign up with your email
2. Verify your identity via OTP
3. Start using the system right away

### Key Features You Should Know

| Feature | Status | Price |
|---------|--------|-------|
| Member Management | ✅ Available | Free |
| Notification System | ✅ Available | Free |
| Data Analytics | 🔒 Subscription required | $5/month |
| AI Assistant | 🔒 Subscription required | $15/month |

## 💡 Usage Tips

### Task Management
Manage your tasks efficiently:

- [ ] Set daily goals
- [x] Create a new project
- [x] Add team members
- [ ] Check progress

### Keyboard Shortcuts

> **Tip:** Use shortcuts to boost your productivity
> - \`Ctrl + K\` - Search
> - \`Ctrl + N\` - Create new
> - \`Ctrl + S\` - Save

### Text Formatting

You can use **bold** or *italic* to emphasize important text, or use ~~strikethrough~~ to show cancelled items.

\`\`\`javascript
// Code example
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## 📞 Contact Us

If you have questions or need help:

1. 📧 Email: support@example.com
2. 💬 Chat: via Live Chat
3. 📱 Call: +1-XXX-XXX-XXXX

---

*Last updated: March 2025*`,
};
