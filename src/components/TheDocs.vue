<!-- 
	TheDocs.vue
	-----------

	File to show the documentation from a markdown file.
-->
<template>
	<section class="markdown-body" v-html="renderedMarkdown"></section>
</template>
<script>

// vue
import { defineComponent, ref, computed } from 'vue'

// mark down librar
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import '@/assets/markdown.css'

// the actual markdown file we wanna render
import rawMd from '../docs.md?raw'

/**
 * Build the compontent
 */
export default defineComponent({

	// Component name
	name: 'TheDocs',

	// set up the component
	setup() {
		const renderedMarkdown = ref('')

		const initMarkdown = async () => {
			const emoji = await import('markdown-it-emoji').then(m => m.default || m)
			const container = await import('markdown-it-container').then(m => m.default || m)
			const anchor = await import('markdown-it-anchor').then(m => m.default || m)

			const md = new MarkdownIt({
				html: true,
				linkify: true,
				typographer: true,
				highlight: (str, lang) => {
					let clean = str.replace(/^\s*\n/, '').replace(/\s+$/, '') // Remove leading blank lines + trailing whitespace
					clean = clean.trimStart();
					if (lang && hljs.getLanguage(lang)) {
						try {
							return `<pre class="hljs"><code>${hljs.highlight(clean, { language: lang }).value}</code></pre>`
						} catch (_) { }
					}
					return `<pre class="hljs"><code>${md.utils.escapeHtml(clean)}</code></pre>`
				}
			})
				.use(container, 'tip')
				.use(anchor);

			renderedMarkdown.value = md.render(rawMd)
		}

		initMarkdown()

		return { renderedMarkdown }
	},
});
</script>
