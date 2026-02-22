import { Layout, Monitor, MousePointerClick, Zap } from 'lucide-react';

export interface LayoutStyleDefinition {
    id: string;
    label: string;
    description: string;
    icon: any;
    previewClass: string;
}

export const layoutStyles: LayoutStyleDefinition[] = [
    {
        id: 'classic',
        label: 'Classic',
        description: 'Timeless standard layout with centered content.',
        icon: Layout,
        previewClass: 'border-white/10'
    },
    {
        id: 'modern',
        label: 'Modern',
        description: 'Clean, left-aligned, high contrast.',
        icon: Monitor,
        previewClass: 'border-blue-500/50'
    },
    {
        id: 'minimal',
        label: 'Minimal',
        description: 'Focus on imagery, less text.',
        icon: MousePointerClick,
        previewClass: 'border-emerald-500/50'
    },
    {
        id: 'showcase',
        label: 'Showcase',
        description: 'Right-aligned, bold typography.',
        icon: Zap,
        previewClass: 'border-purple-500/50'
    }
];
