import { createIcons, icons } from "lucide";

/**
 * สร้าง HTML สำหรับ Modal คู่มือ Markdown
 */
export function createCheatSheetHTML() {
  return `
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      data-cheatsheet-backdrop
    ></div>
    <!-- Modal Content -->
    <div
      class="relative mx-auto mt-10 mb-10 w-[90vw] max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0"
      >
        <div class="flex items-center gap-2">
          <i data-lucide="book-open" class="w-5 h-5 text-blue-600"></i>
          <h2 class="text-lg font-bold text-slate-900">
            คู่มือการเขียน Markdown
          </h2>
        </div>
        <button
          data-cheatsheet-close
          class="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <i data-lucide="x" class="w-5 h-5 text-slate-500"></i>
        </button>
      </div>
      <!-- Modal Body: 3 Columns -->
      <div
        class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700"
      >
        <!-- Column 1: พื้นฐาน -->
        <div class="space-y-5">
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="type" class="w-4 h-4 text-blue-500"></i> หัวข้อ
              (Headings)
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div># หัวข้อระดับ 1</div>
              <div>## หัวข้อระดับ 2</div>
              <div>### หัวข้อระดับ 3</div>
              <div>#### หัวข้อระดับ 4</div>
              <div>##### หัวข้อระดับ 5</div>
              <div>###### หัวข้อระดับ 6</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="bold" class="w-4 h-4 text-blue-500"></i>
              จัดรูปแบบตัวอักษร
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>**ตัวหนา**</div>
              <div>*ตัวเอียง*</div>
              <div>~~ขีดฆ่า~~</div>
              <div>**_หนาและเอียง_**</div>
              <div>\`โค้ดแบบ inline\`</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="minus" class="w-4 h-4 text-blue-500"></i>
              เส้นคั่น
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>---</div>
              <div>***</div>
              <div>___</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="quote" class="w-4 h-4 text-blue-500"></i>
              Blockquote
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>&gt; ข้อความอ้างอิง</div>
              <div>&gt;&gt; อ้างอิงซ้อน</div>
            </div>
          </div>
        </div>

        <!-- Column 2: รายการและลิงก์ -->
        <div class="space-y-5">
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="list" class="w-4 h-4 text-blue-500"></i> รายการ
              (Lists)
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-2"
            >
              <div class="text-slate-500">
                <!-- รายการแบบไม่เรียงลำดับ -->
              </div>
              <div>- รายการที่ 1</div>
              <div>- รายการที่ 2</div>
              <div>&nbsp;&nbsp;- รายการย่อย</div>
              <div class="mt-2 text-slate-500">
                <!-- รายการแบบเรียงลำดับ -->
              </div>
              <div>1. ข้อแรก</div>
              <div>2. ข้อสอง</div>
              <div>3. ข้อสาม</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="check-square" class="w-4 h-4 text-blue-500"></i>
              Checklist
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>- [x] งานที่เสร็จแล้ว</div>
              <div>- [ ] งานที่ยังไม่เสร็จ</div>
              <div>- [ ] งานที่ต้องทำ</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="link" class="w-4 h-4 text-blue-500"></i>
              ลิงก์และรูปภาพ
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>[ข้อความ](https://url.com)</div>
              <div>![alt text](image-url.jpg)</div>
              <div>[ลิงก์อ้างอิง][1]</div>
              <div class="mt-1">[1]: https://url.com</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="image" class="w-4 h-4 text-blue-500"></i>
              รูปภาพพร้อมขนาด
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>![alt](url.jpg "title")</div>
            </div>
          </div>
        </div>

        <!-- Column 3: ตารางและโค้ด -->
        <div class="space-y-5">
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="table" class="w-4 h-4 text-blue-500"></i> ตาราง
              (Table)
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>| หัวข้อ 1 | หัวข้อ 2 | หัวข้อ 3 |</div>
              <div>| -------- | :------: | -------: |</div>
              <div>| ซ้าย | กลาง | ขวา |</div>
              <div>| ข้อมูล | ข้อมูล | ข้อมูล |</div>
              <div class="mt-2 text-slate-400 text-[10px]">
                :-- ชิดซ้าย | :--: กลาง | --: ชิดขวา
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="code" class="w-4 h-4 text-blue-500"></i> Code
              Block
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>\`\`\`javascript</div>
              <div>const greeting = "Hello";</div>
              <div>console.log(greeting);</div>
              <div>\`\`\`</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="foot-prints" class="w-4 h-4 text-blue-500"></i>
              Footnote
            </h3>
            <div
              class="bg-slate-50 rounded-lg p-3 font-mono text-xs space-y-1"
            >
              <div>ข้อความ[^1]</div>
              <div class="mt-1">[^1]: เชิงอรรถ</div>
            </div>
          </div>
          <div>
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <i data-lucide="zap" class="w-4 h-4 text-blue-500"></i> เคล็ดลับ
            </h3>
            <div class="bg-slate-50 rounded-lg p-3 text-xs space-y-2">
              <div>• ขึ้นบรรทัดใหม่: เว้น 2 เคาะท้ายบรรทัด</div>
              <div>• ย่อหน้าใหม่: เว้นบรรทัดว่าง 1 บรรทัด</div>
              <div>
                • Escape สัญลักษณ์: ใส่ \\ ข้างหน้า<br /><span
                  class="font-mono"
                  >\\* \\# \\[ \\] \\( \\)</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * เปิด/ปิด Modal คู่มือ Markdown
 */
export function initCheatSheet() {
  const modal = document.getElementById("cheatSheetModal");

  // สร้าง HTML สำหรับ Modal
  modal.innerHTML = createCheatSheetHTML();

  // Event: ปิดเมื่อกด backdrop
  modal
    .querySelector("[data-cheatsheet-backdrop]")
    .addEventListener("click", () => {
      toggleCheatSheet();
    });

  // Event: ปิดเมื่อกดปุ่ม X
  modal
    .querySelector("[data-cheatsheet-close]")
    .addEventListener("click", () => {
      toggleCheatSheet();
    });

  // Event: ปิดเมื่อกด Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      toggleCheatSheet();
    }
  });
}

export function toggleCheatSheet() {
  const modal = document.getElementById("cheatSheetModal");
  modal.classList.toggle("hidden");

  // สร้างไอคอนใหม่ทุกครั้งที่เปิด Modal
  if (!modal.classList.contains("hidden")) {
    createIcons({ icons });
  }
}
