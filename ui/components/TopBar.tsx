'use client';

import { Settings, User } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';
import { ModelSelector } from './ModelSelector';
import SettingsDialog from './SettingsDialog';
import { useState } from 'react';

const TopBar = () => {
  const { isCollapsed } = useSidebar();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={cn(
      "fixed top-0 right-0 h-14 flex items-center justify-between border-b bg-white dark:bg-dark-primary border-light-100 dark:border-dark-200 z-40",
      isCollapsed ? "left-[60px]" : "left-[240px]"
    )}>
      <div className="flex items-center gap-2 px-4">
        <ModelSelector />
      </div>
      
      <div className="flex items-center gap-2 px-4">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 hover:bg-light-100 dark:hover:bg-dark-200 rounded-lg transition-colors"
        >
          <Settings size={20} />
        </button>
        <button className="p-2 hover:bg-light-100 dark:hover:bg-dark-200 rounded-lg transition-colors">
          <User size={20} />
        </button>
      </div>

      <SettingsDialog isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
    </div>
  );
};

export default TopBar;
