import type { Template } from '../types.js';

// Template: LaTeX Examples
export const template: Template = {
  id: "latex-example",
  icon: "🧮",
  category: "example",
  name: "LaTeX Examples",
  description: "ตัวอย่างสูตรคณิตศาสตร์ LaTeX ที่รองรับด้วย KaTeX",
  content: `# 🧮 LaTeX Math Examples

เอกสารนี้รวบรวมตัวอย่างสูตรคณิตศาสตร์ที่เขียนด้วย LaTeX

---

## 🔤 ตัวอักษรกรีก

### ตัวอักษรพื้นฐาน
- อัลฟา: $\\alpha, \\beta, \\gamma, \\delta$
- เอปไซลอน: $\\epsilon, \\zeta, \\eta, \\theta, \\iota, \\kappa, \\lambda, \\mu$
- อื่นๆ: $\\pi, \\rho, \\sigma, \\tau, \\phi, \\psi, \\omega$

### ตัวอักษรตัวพิมพ์ใหญ่
- $\\Gamma, \\Delta, \\Theta, \\Lambda$
- $\\Phi, \\Psi, \\Omega$

### ตัวดำเนินการ
- บวก ลบ คูณ หาร: $+, -, \\times, \\div$
- ยกกำลัง: $x^2, x^3, x^{10}$
- รากที่สอง: $\\sqrt{x}, \\sqrt[3]{x}$
- ไม่เท่ากับ: $\\neq$
- มากกว่า น้อยกว่า: $>, <, \\geq, \\leq$
- ประมาณบางส่วน: $\\approx$
- อยู่ใน: $\\in$
- ไม่อยู่ใน: $\\notin$

---

## 📐 พีชคณิต

### สมการพื้นฐาน

กฎของ distributive: $a(b + c) = ab + ac$

สูตรการคูณ: $(a + b)^2 = a^2 + 2ab + b^2$

**Difference of Squares:**

$$a^2 - b^2 = (a - b)(a + b)$$

**Perfect Cube:**

$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$

---

## 📈 Calculus

### Limits

Limit ของ sin(x)/x เมื่อ x แนวนอน 0:

$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$

### Derivatives

กฎลูกโซ่ (Chain Rule):

$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$

สูตรผลคูณ (Product Rule):

$$\\frac{d}{dx}[uv] = u'v + uv'$$

### Integrals

Integral ของ $e^x$:

$$\\int e^x dx = e^x + C$$

Integral แบบ definite:

$$\\int_{0}^{1} x^2 dx = \\left[ \\frac{x^3}{3} \\right]_0^1 = \\frac{1}{3}$$

---

## 🔢 อนุกรมและผลรวม

### ผลรวมอนุกรมจำกัด

ผลรวมของจำนวนเต็ม 1 ถึง n:

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

ผลรวมของจำนวนเต็มยกกำลังสอง:

$$\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}$$

### อนุกรมเรขุค

อนุกรมเรขุค: $1 + r + r^2 + r^3 + \\cdots = \\sum_{k=0}^{\\infty} r^k$

ผลรวม (เมื่อ $|r| < 1$):

$$\\sum_{k=0}^{\\infty} r^k = \\frac{1}{1-r}$$

---

## 📊 เมทริกซ์

### เมทริกซ์พื้นฐาน

$$
\\begin{pmatrix}
1 & 2 \\\\
3 & 4
\\end{pmatrix}
$$

### การคูณเมทริกซ์

$$
\\begin{pmatrix}
a & b \\\\
c & d
\\end{pmatrix}
\\begin{pmatrix}
x \\\\
y
\\end{pmatrix}
=
\\begin{pmatrix}
ax + by \\\\
cx + dy
\\end{pmatrix}
$$

---

## 🔬 สถิติและความน่าจะเป็น

### ค่าเฉลี่ย
ค่าเฉลี่ยเลขคณิต: $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$

### ส่วนเบี่ยงเบี่ยม
Variance: $\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\mu)^2$

### การแจกแจงแบบปกติ (Normal Distribution)

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$

---

## 🔷 ตรรกศาสตร์

### ตรีโกณมิติพื้นฐาน

สูตรของออยเลอร์ (Euler's Formula):

$$e^{i\\pi} + 1 = 0$$

อัตลักษณ์ของโคไซน์:

$$\\cos^2 x + \\sin^2 x = 1$$

---

## 📐 เรขาคณิต

### พื้นที่

สี่เหลี่ยมผืนผ้า: $A = w \\times h$

วงกลม: $A = \\pi r^2$

สามเหลี่ยม: $A = \\frac{\\sqrt{3}}{4}s^2$

### ปริมาตร

ทรงกระบอก: $V = \\pi r^2 h$

ทรงกลม: $V = \\frac{4}{3}\\pi r^3$

---

## การใช้งาน

### Inline Math
ใช้เครื่องหมายดอลลาร์เดียว: $x^2 + y^2 = r^2$

### Display Math
ใช้เครื่องหมายดอลลาร์สองอัน:

$$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

---

## 💡 Tips

- ใช้ backslash สำหรับขึ้นบรรทัดใหม่ในสมการ
- ใช้ {} สำหรับกลุ่มตัวอักษร
- สามารถใช้ \\( ... \\) แทน $ สำหรับ inline math
- สามารถใช้ \\[ ... \\] แทน $$ สำหรับ display math

สนุกกับการเขียนสูตรคณิตศาสตร์! 🧮
`,
};
