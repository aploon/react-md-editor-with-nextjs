// components/DarkModeToggle.tsx
import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
            {isDarkMode ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </button>
    );
}
