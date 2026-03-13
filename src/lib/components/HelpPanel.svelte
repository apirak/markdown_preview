<script lang="ts">
	import { panels, togglePanel } from '../stores/panels';
	import type { PanelName } from '../types';
	import { BookOpen } from 'lucide-svelte';
	import PanelCloseButton from './buttons/PanelCloseButton.svelte';

	const iconAttrs = { strokeWidth: 2, class: 'w-4 h-4' };

	function handlePanelToggle(name: PanelName) {
		panels.set(togglePanel(name, $panels));
	}
</script>

<style>
	.help-section {
		flex: 1 1 200px;
	}
	.help-section-xl {
		flex: 1 1 416px;
	}
</style>

{#if $panels.help}
	<section
		class="flex flex-col min-h-0 overflow-hidden border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-gray-800 panel flex-1"
	>
		<!-- Panel Header -->
		<div
			class="bg-slate-50 dark:bg-slate-900/50 px-4 h-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 shrink-0"
		>
			<div class="flex items-center gap-2">
				<BookOpen {...iconAttrs} />
				คู่มือ Markdown
			</div>
			<PanelCloseButton onclick={() => handlePanelToggle('help')} />
		</div>

		<!-- Panel Content -->
		<div
			class="flex-1 min-h-0 overflow-y-auto p-4 text-sm text-slate-700 dark:text-slate-400"
			style="overscroll-behavior-y: none"
		>
			<div class="flex flex-wrap gap-4">
			<!-- Text Formatting -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><path d="M4 21h16"/></svg>
					จัดรูปแบบตัวอักษร
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>**ตัวหนา**</div>
					<div>*ตัวเอียง*</div>
					<div>~~ขีดฆ่า~~</div>
					<div>**_หนาและเอียง_**</div>
					<div>`โค้ดแบบ inline`</div>
				</div>
			</section>

			<!-- Headings -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
					หัวข้อ (Headings)
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div># หัวข้อระดับ 1</div>
					<div>## หัวข้อระดับ 2</div>
					<div>### หัวข้อระดับ 3</div>
					<div>#### หัวข้อระดับ 4</div>
					<div>##### หัวข้อระดับ 5</div>
					<div>###### หัวข้อระดับ 6</div>
				</div>
			</section>

			<!-- Horizontal Rule -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M5 12h14"/></svg>
					เส้นคั่น
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs">
					<div>---</div>
				</div>
			</section>

			<!-- Blockquote -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>
					Blockquote
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>&gt; ข้อความอ้างอิง</div>
					<div>&gt;&gt; อ้างอิงซ้อน</div>
				</div>
			</section>

			<!-- Lists -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
					รายการ (Lists)
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div class="text-slate-400 text-[10px]">Unordered:</div>
					<div>* รายการที่ 1</div>
					<div>* รายการที่ 2</div>
					<div class="pl-2">* รายการย่อย</div>
					<div class="mt-2 text-slate-400 text-[10px]">Ordered:</div>
					<div>1. ข้อแรก</div>
					<div>2. ข้อสอง</div>
					<div>3. ข้อสาม</div>
				</div>
			</section>

			<!-- Checklist -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
					Checklist
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>- [x] งานที่เสร็จแล้ว</div>
					<div>- [ ] งานที่ยังไม่เสร็จ</div>
					<div>- [ ] งานที่ต้องทำ</div>
				</div>
			</section>

			<!-- Table -->
			<section class="help-section-xl">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
					ตาราง (Table)
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<pre class="whitespace-pre-wrap">| หัวข้อ 1 | หัวข้อ 2 | หัวข้อ 3 |
| ------ | :----: | -----: |
| ซ้าย    |  กลาง  |    ขวา |
| ข้อมูล   |  ข้อมูล  |   ข้อมูล |</pre>
					<div class="mt-4 text-slate-400 text-[10px]">
						:-- ชิดซ้าย | :--: กลาง | --: ชิดขวา
					</div>
				</div>
			</section>

			<!-- Links & Images -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
					ลิงก์และรูปภาพ
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>[ข้อความ](https://url.com)</div>
					<div>![alt text](image-url.jpg)</div>
					<div>![alt](url.jpg "title")</div>
					<div>[ลิงก์อ้างอิง][1]</div>
					<div class="mt-1">[1]: https://url.com</div>
				</div>
			</section>

			<!-- Code Block -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
					Code Block
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>```javascript</div>
					<div>const greeting = "Hello";</div>
					<div>console.log(greeting);</div>
					<div>```</div>
				</div>
			</section>

			<!-- Footnote -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><path d="M4 16v-2.38C4 11.5 9.97 6.31 12 4c2.03 2.31 8 7.5 8 9.62V16a6 6 0 0 1-12 0z"/><path d="M9 19a3 3 0 0 0 3-3"/></svg>
					Footnote
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>ข้อความ[^1]</div>
					<div class="mt-1">[^1]: เชิงอรรถ</div>
				</div>
			</section>

			<!-- Mermaid -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a5 5 0 0 0-5-5"/><path d="M8.6 13a4 4 0 0 0 0 6.3"/></svg>
					Mermaid Diagram
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
					<div>```mermaid</div>
					<div>graph TD;</div>
					<div class="pl-2">A-->B;</div>
					<div class="pl-2">B-->C;</div>
					<div>```</div>
				</div>
			</section>

			<!-- Tips -->
			<section class="help-section">
				<h3 class="font-bold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-blue-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
					เคล็ดลับ
				</h3>
				<div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 space-y-2 text-xs">
					<div>• ขึ้นบรรทัดใหม่: เว้น 2 เคาะท้ายบรรทัด</div>
					<div>• ย่อหน้าใหม่: เว้นบรรทัดว่าง 1 บรรทัด</div>
					<div>• Escape สัญลักษณ์: ใส่ \ ข้างหน้า<br><span class="font-mono">\* \# \[ \] \( \)</span></div>
				</div>
			</section>
			</div>
		</div>
	</section>
{/if}
