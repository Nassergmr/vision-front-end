"use client";

import * as React from "react";
import { useEffect } from "react";
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
  handleFetchPublishedImages: () => void;
  handleFetchDraftImages: () => void;
  handleFetchImages: () => void;
}

const options = [
  {
    value: "All Photos",
    label: "All Photos",
  },
  {
    value: "Published Photos",
    label: "Published Photos",
  },
  {
    value: "Draft Photos",
    label: "Draft Photos",
  },
];

export function AdminGalleryCombobox({
  handleFetchPublishedImages,
  handleFetchDraftImages,
  handleFetchImages,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0].value);

  useEffect(() => {
    handleFetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild defaultValue={options[0].value}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="sm:w-[200px] w-[180px] justify-between py-3 rounded-lg"
        >
          {options.find((option) => option.value === value)?.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[200px] w-[180px] py-3 px-0">
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
                    if (option.value === "Published Photos") {
                      handleFetchPublishedImages();
                    } else if (option.value === "Draft Photos") {
                      handleFetchDraftImages();
                    } else handleFetchImages();
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
