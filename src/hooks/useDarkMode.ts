// hooks/useDarkMode.ts
import { useContext } from 'react';
import { DarkModeContext } from '@/context/DarkModeContext';

export default function useDarkMode() {
    return useContext(DarkModeContext);
}
