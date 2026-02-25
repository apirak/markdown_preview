import { createIcons, icons } from "lucide";

/**
 * สร้าง HTML เนื้อหาคู่มือ Markdown สำหรับ Help Panel
 */
export function createHelpContent() {
  return `
    <div class="p-5 text-md text-slate-700 max-w-full mx-auto">

      <!-- Headings -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="type" class="w-4 h-4 text-blue-500"></i> หัวข้อ (Headings)
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono space-y-1">
          <div># หัวข้อระดับ 1</div>
          <div>## หัวข้อระดับ 2</div>
          <div>### หัวข้อระดับ 3</div>
          <div>#### หัวข้อระดับ 4</div>
          <div>##### หัวข้อระดับ 5</div>
          <div>###### หัวข้อระดับ 6</div>
        </div>
      </section>

      <!-- Text Formatting -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="bold" class="w-4 h-4 text-blue-500"></i> จัดรูปแบบตัวอักษร
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono space-y-1">
          <div>**ตัวหนา**</div>
          <div>*ตัวเอียง*</div>
          <div>~~ขีดฆ่า~~</div>
          <div>**_หนาและเอียง_**</div>
          <div>\`โค้ดแบบ inline\`</div>
        </div>
      </section>

      <!-- Horizontal Rule -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="minus" class="w-4 h-4 text-blue-500"></i> เส้นคั่น
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono ">
          <div>---</div>
        </div>
      </section>

      <!-- Blockquote -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="quote" class="w-4 h-4 text-blue-500"></i> Blockquote
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>&gt; ข้อความอ้างอิง</div>
          <div>&gt;&gt; อ้างอิงซ้อน</div>
        </div>
      </section>

      <!-- Lists -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="list" class="w-4 h-4 text-blue-500"></i> รายการ (Lists)
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div class="text-slate-400 text-[10px]">Unordered:</div>
          <div>* รายการที่ 1</div>
          <div>* รายการที่ 2</div>
          <div>&nbsp;&nbsp;* รายการย่อย</div>
          <div class="mt-2 text-slate-400 text-[10px]">Ordered:</div>
          <div>1. ข้อแรก</div>
          <div>2. ข้อสอง</div>
          <div>3. ข้อสาม</div>
        </div>
      </section>

      <!-- Checklist -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="check-square" class="w-4 h-4 text-blue-500"></i> Checklist
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>- [x] งานที่เสร็จแล้ว</div>
          <div>- [ ] งานที่ยังไม่เสร็จ</div>
          <div>- [ ] งานที่ต้องทำ</div>
        </div>
      </section>

      <!-- Links & Images -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="link" class="w-4 h-4 text-blue-500"></i> ลิงก์และรูปภาพ
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>[ข้อความ](https://url.com)</div>
          <div>![alt text](image-url.jpg)</div>
          <div>![alt](url.jpg "title")</div>
          <div>[ลิงก์อ้างอิง][1]</div>
          <div class="mt-1">[1]: https://url.com</div>
        </div>
      </section>

      <!-- Table -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="table" class="w-4 h-4 text-blue-500"></i> ตาราง (Table)
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono text-sm space-y-1">
          <pre>
| หัวข้อ 1 | หัวข้อ 2 | หัวข้อ 3 |
| ------ | :----: | -----: |
| ซ้าย    |  กลาง  |    ขวา |
| ข้อมูล   |  ข้อมูล  |   ข้อมูล |
          </pre>
          <div class="mt-4 text-slate-400 text-[10px]">
            :-- ชิดซ้าย | :--: กลาง | --: ชิดขวา
          </div>

        </div>
      </section>

      <!-- Code Block -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="code" class="w-4 h-4 text-blue-500"></i> Code Block
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>\`\`\`javascript</div>
          <div>const greeting = "Hello";</div>
          <div>console.log(greeting);</div>
          <div>\`\`\`</div>
        </div>
      </section>

      <!-- Footnote -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="footprints" class="w-4 h-4 text-blue-500"></i> Footnote
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>ข้อความ[^1]</div>
          <div class="mt-1">[^1]: เชิงอรรถ</div>
        </div>
      </section>

      <!-- Mermaid -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="git-branch" class="w-4 h-4 text-blue-500"></i> Mermaid Diagram
        </h3>
        <div class="bg-slate-50 rounded-lg p-3 font-mono  space-y-1">
          <div>\`\`\`mermaid</div>
          <div>graph TD;</div>
          <div>&nbsp;&nbsp;A--&gt;B;</div>
          <div>&nbsp;&nbsp;B--&gt;C;</div>
          <div>\`\`\`</div>
        </div>
      </section>

      <!-- Tips -->
      <section>
        <h3 class="font-bold text-slate-900 mb-2 flex items-center gap-2">
          <i data-lucide="zap" class="w-4 h-4 text-blue-500"></i> เคล็ดลับ
        </h3>
        <div class="bg-slate-50 rounded-lg p-3  space-y-2">
          <div>• ขึ้นบรรทัดใหม่: เว้น 2 เคาะท้ายบรรทัด</div>
          <div>• ย่อหน้าใหม่: เว้นบรรทัดว่าง 1 บรรทัด</div>
          <div>• Escape สัญลักษณ์: ใส่ \\ ข้างหน้า<br><span class="font-mono">\\* \\# \\[ \\] \\( \\)</span></div>
        </div>
      </section>

    </div>
  `;
}

/**
 * สร้างเนื้อหาใน Help Panel
 */
export function initHelpPanel() {
  const helpContent = document.getElementById("help-content");
  if (helpContent) {
    helpContent.innerHTML = createHelpContent();
    createIcons({ icons });
  }
}
