import type { Template } from "../types.js";

// Template: LaTeX Examples
export const template: Template = {
  id: "latex-example",
  icon: "🧮",
  category: "example",
  name: "LaTeX Examples",
  description: "LaTeX math formula examples powered by KaTeX",
  content: `# 🧮 LaTeX Math Examples

A collection of math formula examples written in LaTeX.

---

## 🔤 Greek Letters

### Basic Letters
- Alpha group: $\\alpha, \\beta, \\gamma, \\delta$
- Epsilon group: $\\epsilon, \\zeta, \\eta, \\theta, \\iota, \\kappa, \\lambda, \\mu$
- Others: $\\pi, \\rho, \\sigma, \\tau, \\phi, \\psi, \\omega$

### Uppercase Letters
- $\\Gamma, \\Delta, \\Theta, \\Lambda$
- $\\Phi, \\Psi, \\Omega$

### Operators
- Add, subtract, multiply, divide: $+, -, \\times, \\div$
- Exponents: $x^2, x^3, x^{10}$
- Square root: $\\sqrt{x}, \\sqrt[3]{x}$
- Not equal: $\\neq$
- Greater/less than: $>, <, \\geq, \\leq$
- Approximately: $\\approx$
- Element of: $\\in$
- Not element of: $\\notin$

---

## 📐 Algebra

### Basic Equations

Distributive law: $a(b + c) = ab + ac$

Binomial expansion: $(a + b)^2 = a^2 + 2ab + b^2$

**Difference of Squares:**

$$a^2 - b^2 = (a - b)(a + b)$$

**Perfect Cube:**

$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$

---

## 📈 Calculus

### Limits

Limit of sin(x)/x as x approaches 0:

$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$

### Derivatives

Chain Rule:

$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$

Product Rule:

$$\\frac{d}{dx}[uv] = u'v + uv'$$

### Integrals

Integral of $e^x$:

$$\\int e^x dx = e^x + C$$

Definite integral:

$$\\int_{0}^{1} x^2 dx = \\left[ \\frac{x^3}{3} \\right]_0^1 = \\frac{1}{3}$$

---

## 🔢 Series and Summation

### Finite Series

Sum of integers from 1 to n:

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

Sum of squared integers:

$$\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}$$

### Geometric Series

Geometric series: $1 + r + r^2 + r^3 + \\cdots = \\sum_{k=0}^{\\infty} r^k$

Sum (when $|r| < 1$):

$$\\sum_{k=0}^{\\infty} r^k = \\frac{1}{1-r}$$

---

## 📊 Matrices

### Basic Matrix

$$
\\begin{pmatrix}
1 & 2 \\\\
3 & 4
\\end{pmatrix}
$$

### Matrix Multiplication

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

## 🔬 Statistics and Probability

### Mean
Arithmetic mean: $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$

### Variance
Variance: $\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\mu)^2$

### Normal Distribution

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}$$

---

## 🔷 Trigonometry

### Fundamental Identities

Euler's Formula:

$$e^{i\\pi} + 1 = 0$$

Pythagorean Identity:

$$\\cos^2 x + \\sin^2 x = 1$$

---

## 📐 Geometry

### Area

Rectangle: $A = w \\times h$

Circle: $A = \\pi r^2$

Equilateral triangle: $A = \\frac{\\sqrt{3}}{4}s^2$

### Volume

Cylinder: $V = \\pi r^2 h$

Sphere: $V = \\frac{4}{3}\\pi r^3$

---

## Usage

### Inline Math
Use single dollar signs: $x^2 + y^2 = r^2$

### Display Math
Use double dollar signs:

$$\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

---

## 💡 Tips

- Use backslash for special commands in equations
- Use {} for grouping characters
- You can use \\( ... \\) instead of $ for inline math
- You can use \\[ ... \\] instead of $$ for display math

Have fun writing math formulas! 🧮
`,
};
