'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Compass, FolderOpen, MessageSquare, Search, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import Image from 'next/image';
import { useSidebar } from '@/context/SidebarContext';
import { formatTimeDifference } from '@/lib/utils';

interface Chat {
  id: string;
  title: string;
  createdAt: string;
  focusMode: string;
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setChats(data.chats);
    };

    fetchChats();
  }, []);

  const navLinks = [
    {
      icon: MessageSquare,
      href: '/',
      active: segments.includes('chats'),
      label: 'Chats',
      subItems: chats.map(chat => ({
        label: chat.title,
        href: `/c/${chat.id}`
      }))
    },
    {
      icon: Search,
      href: '/discover',
      active: segments.includes('discover'),
      label: 'Discover',
      subItems: []
    },
    {
      icon: ImageIcon,
      href: '/images',
      active: segments.includes('image'),
      label: 'Image',
      subItems: []
    },
    
  ];

  return (
    <div className="flex h-full">
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 border-r border-light-100 dark:border-dark-200 bg-light-secondary dark:bg-dark-secondary",
          isCollapsed ? "w-[60px]" : "w-[240px]"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-3 py-4">
          {/* Logo and collapse button */}
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-2", isCollapsed && "justify-center w-full")}>
              <Image 
                src="https://storage.googleapis.com/reactor_users/reactor_assets/reactor2.svg"
                alt="Logo" 
                width={24} 
                height={24}
              />
              {!isCollapsed && <span className="font-semibold">Reactor</span>}
            </div>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "p-1 hover:bg-light-100 dark:hover:bg-dark-100 rounded-lg transition-colors",
                isCollapsed && "hidden"
              )}
            >
              <ChevronLeft size={16} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-y-4">
            {navLinks.map((link, i) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-light-100 dark:hover:bg-dark-100',
                    link.active && 'bg-light-100 dark:bg-light-100'
                  )}
                >
                  <link.icon size={20} />
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
                {!isCollapsed && link.subItems.length > 0 && (
                  <div className="ml-8 mt-2 flex flex-col gap-y-2">
                    {link.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Today Section */}
          {!isCollapsed && (
            <div className="mt-4">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Today</h3>
              <div className="mt-2 flex flex-col gap-y-2">
                <div className="flex items-center gap-x-3 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm">Strength Training</span>
                </div>
                <div className="flex items-center gap-x-3 px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Who am I</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Uncollapse button - only shows when sidebar is collapsed */}
      {isCollapsed && (
        <button 
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-[60px] z-50 p-1 bg-light-secondary dark:bg-dark-secondary hover:bg-light-100 dark:hover:bg-dark-100 rounded-lg transition-colors shadow-md"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Main content */}
      <div
        className={cn(
          "flex-1 min-h-screen",
          isCollapsed ? "pl-[60px]" : "pl-[240px]"
        )}
      >
        <Layout>{children}</Layout>
      </div>
    </div>
  );
};

export default Sidebar;
