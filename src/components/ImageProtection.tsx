'use client';

import { useEffect } from 'react';

export default function ImageProtection() {
    useEffect(() => {
        // Disable right-click on images
        const handleContextMenu = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // Disable dragging images
        const handleDragStart = (e: DragEvent) => {
            if ((e.target as HTMLElement).tagName === 'IMG') {
                e.preventDefault();
            }
        };

        // Optional: Disable common screenshot shortcuts (PrintScreen key detection for warning, though blocking is impossible)
        // We won't block keys as it's intrusive, focusing on mouse actions.

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);

    return null;
}
