import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/modules/components//ui/command";
import { uiText } from "@/modules/data/ui-text";

export default function CommandDemo() {
  return (
    <Command className="max-w-sm rounded-lg border">
      <CommandInput placeholder={uiText.demo.command.input} />
      <CommandList>
        <CommandEmpty>{uiText.demo.command.empty}</CommandEmpty>
        <CommandGroup heading={uiText.demo.command.suggestions}>
          <CommandItem>
            <Calendar />
            <span>{uiText.demo.command.calendar}</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>{uiText.demo.command.searchEmoji}</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>{uiText.demo.command.calculator}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={uiText.demo.command.settings}>
          <CommandItem>
            <User />
            <span>{uiText.demo.command.profile}</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>{uiText.demo.command.billing}</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>{uiText.demo.command.settings}</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
