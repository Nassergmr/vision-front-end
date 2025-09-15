"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  handleFetchPopularUserImages: () => void;
  handleFetchUserImages: () => void;
}

const options = [
  {
    value: "Recency",
    label: "Recency",
  },
  {
    value: "Popularity",
    label: "Popularity",
  },
];

export function UserGalleryCombobox({
  handleFetchPopularUserImages,
  handleFetchUserImages,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0].value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild defaultValue={options[0].value}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[130px] justify-between py-3  rounded-lg"
        >
          {options.find((option) => option.value === value)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] py-3 px-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  disabled={option.value === value}
                  className="cursor-pointer text-base"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (option.value === "Popularity") {
                      handleFetchPopularUserImages();
                    } else {
                      handleFetchUserImages();
                    }
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
