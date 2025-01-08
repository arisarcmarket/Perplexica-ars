'use client';

import { User } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';
import { ModelSelector } from './ModelSelector';

const TopBar = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn(
      "fixed top-0 right-0 h-14 flex items-center justify-between border-b bg-white dark:bg-dark-primary border-light-100 dark:border-dark-200 z-40",
      isCollapsed ? "left-[60px]" : "left-[240px]"
    )}>
      <div className="flex items-center gap-2 px-4">
        <ModelSelector />
      </div>
      
      <div className="flex items-center gap-2 px-4">
        <button className="p-2 hover:bg-light-100 dark:hover:bg-dark-200 rounded-lg transition-colors">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
