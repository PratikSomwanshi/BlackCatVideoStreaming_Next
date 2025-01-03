"use client";

import { Search } from "lucide-react";
import * as React from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Ensure this library is installed
import { DialogTitle } from "@/components/ui/dialog";

export default function NavbarSearchIcon() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <div>
                <Search color="black" onClick={() => setOpen(true)} />
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <VisuallyHidden>
                    <DialogTitle>Search Dialog</DialogTitle>{" "}
                </VisuallyHidden>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
