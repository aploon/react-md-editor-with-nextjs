// components/MarkdownPreview.tsx
import React from 'react';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import hljs from 'highlight.js';
import 'github-markdown-css';
// import 'github-markdown-css/github-markdown-dark.css';
import 'highlight.js/styles/github.css';
import useDarkMode from '@/hooks/useDarkMode';

interface MarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
    const [html, setHtml] = React.useState<string>('');
    const {isDarkMode} = useDarkMode();

    React.useEffect(() => {
        const processMarkdown = async () => {
            const file = await remark()
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(rehypeRaw)
                .use(rehypeStringify)
                .process(markdown);

            const htmlString = file.toString();

            // Appliquer la coloration syntaxique
            const container = document.createElement('div');
            container.innerHTML = htmlString;
            container.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });

            setHtml(container.innerHTML);
        };

        processMarkdown();
    }, [markdown]);



    return (
        <div
            className={`markdown-body ${isDarkMode ? 'markdown-body-dark' : ''}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default MarkdownPreview;
