import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

import hljs from 'highlight.js';
import 'github-markdown-css';
import useDarkMode from '@/hooks/useDarkMode';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const { isDarkMode } = useDarkMode();

    useEffect(() => {
        const styleLinks: HTMLLinkElement[] = [];

        // Création des liens pour le markdown CSS
        const markdownLink = document.createElement('link');
        markdownLink.rel = 'stylesheet';
        markdownLink.href = isDarkMode
            ? '/markdown/github-markdown-css/github-markdown-dark.css'
            : '/markdown/github-markdown-css/github-markdown-light.css';
        
        // Création des liens pour highlight.js CSS
        const highlightLink = document.createElement('link');
        highlightLink.rel = 'stylesheet';
        highlightLink.href = isDarkMode
            ? '/markdown/highlight.js/styles/github-dark.css'
            : '/markdown/highlight.js/styles/github.css';

        // Ajout des liens au head
        document.head.appendChild(markdownLink);
        document.head.appendChild(highlightLink);
        styleLinks.push(markdownLink, highlightLink);

        // Nettoyage lors du démontage ou changement de thème
        return () => {
            styleLinks.forEach(link => document.head.removeChild(link));
        };
    }, [isDarkMode]);

    useEffect(() => {
        const processMarkdown = async () => {
            const file = await unified()
                .use(remarkParse) // Convert Markdown to Markdown AST
                .use(remarkRehype, { allowDangerousHtml: true }) // Transform Markdown AST to HTML AST
                .use(rehypeRaw) // Preserve raw HTML in Markdown
                .use(rehypeSanitize) // Sanitize the HTML
                .use(rehypeStringify) // Serialize HTML AST to string
                .process(markdown);

            const htmlString = file.toString();

            // Appliquer la coloration syntaxique
            const container = document.createElement('div');
            container.innerHTML = htmlString;
            container.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });

            setHtmlContent(container.innerHTML); // Update the state with the rendered HTML
        };

        processMarkdown();
    }, [markdown]); // Re-run when the markdown content changes

    return (
        <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};

export default MarkdownPreview;
