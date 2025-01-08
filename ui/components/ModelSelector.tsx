"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import Image from "next/image"

const models = [
  { name: "Reactor Mk. I", icon: "https://storage.googleapis.com/reactor_users/reactor_assets/reactor2.svg" },
  
]

export function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState(models[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-0 bg-gray-50 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-full dark:bg-dark-200 dark:text-gray-200 dark:hover:bg-dark-100"
        >
          <Image
            src={selectedModel.icon}
            alt={`${selectedModel.name} Icon`}
            width={16}
            height={16}
            className="h-4 w-4"
          />
          {selectedModel.name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {models.map((model) => (
          <DropdownMenuItem key={model.name} onSelect={() => setSelectedModel(model)}>
            <Image
              src={model.icon}
              alt={`${model.name} Icon`}
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
