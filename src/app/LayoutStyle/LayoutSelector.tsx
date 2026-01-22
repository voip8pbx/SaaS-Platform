import React from 'react';
import { layoutStyles } from './definitions';

interface LayoutSelectorProps {
    currentLayout: string;
    onChange: (layoutId: string) => void;
    dashboardTheme?: 'dark' | 'light';
}

export function LayoutSelector({ currentLayout, onChange, dashboardTheme = 'dark' }: LayoutSelectorProps) {
    return (
        <div className="grid grid-cols-4 gap-2">
            {layoutStyles.map((item) => {
                const isActive = currentLayout === item.id;
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onChange(item.id)}
                        className={`
                            group relative flex flex-col items-center justify-center p-3 rounded-lg border transition-all aspect-square
                            ${isActive
                                ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                : dashboardTheme === 'dark'
                                    ? 'bg-[#1a1a24] border-white/5 hover:bg-white/5 hover:border-white/10'
                                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}
                        `}
                    >
                        {/* Active Indicator */}
                        {isActive && (
                            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        )}

                        <div className={`
                            p-2 rounded-lg mb-1.5 transition-colors
                            ${isActive
                                ? 'bg-purple-500 text-white'
                                : dashboardTheme === 'dark'
                                    ? 'bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-slate-300'
                                    : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'}
                        `}>
                            <Icon className="w-4 h-4" />
                        </div>

                        <span className={`text-xs font-semibold text-center leading-tight ${isActive
                                ? 'text-white'
                                : dashboardTheme === 'dark'
                                    ? 'text-slate-300'
                                    : 'text-gray-900'
                            }`}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
