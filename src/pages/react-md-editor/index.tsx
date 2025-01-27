// pages/editor.tsx
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { readFileSync } from 'fs';
import path, { join } from 'path';
import MarkdownPreview from '@/components/MarkdownPreview';
import useDarkMode from '@/hooks/useDarkMode';
import { GetServerSideProps } from 'next';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export const getServerSideProps: GetServerSideProps = async () => {
    const filePath = path.join(process.cwd(), 'README.md');
    const readmeContent = readFileSync(filePath, 'utf-8');

    return {
        props: {
            readmeContent,
        },
    };
};

export default function EditorPage({ readmeContent }: { readmeContent: string }) {
    const { isDarkMode } = useDarkMode();
    const [markdown, setMarkdown] = useState<string>(readmeContent);

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
