// pages/editor.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import MarkdownPreview from '@/components/MarkdownPreview';
import useDarkMode from '@/hooks/useDarkMode';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function EditorPage() {
    const { isDarkMode } = useDarkMode();
    const [markdown, setMarkdown] = useState<string>(`
# Titre principal

Voici un paragraphe avec du **texte en gras** et *italique*.

\`\`\`javascript
// Exemple de code
const sayHello = () => {
    console.log('Hello, world!');
};
\`\`\`
`);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Éditeur Markdown</h1>
            <div data-color-mode={isDarkMode ? 'dark' : 'light'}>
                <MDEditor 
                    value={markdown} 
                    onChange={(value) => setMarkdown(value || '')}
                    height={400}
                />
            </div>

            <h2 className="text-xl font-semibold mt-8">Aperçu :</h2>
            <div className="markdown-body dark:bg-gray-950 dark:text-gray-200 p-10">
                <MarkdownPreview markdown={markdown} />
            </div>

        </div>
    );
}
