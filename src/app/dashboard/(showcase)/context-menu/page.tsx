import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/modules/components//ui/context-menu";
import { uiText } from "@/modules/data/ui-text";

export default function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm">
        <span className="hidden pointer-fine:inline-block">
          {uiText.demo.contextMenu.rightClick}
        </span>
        <span className="hidden pointer-coarse:inline-block">
          {uiText.demo.contextMenu.longPress}
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          <ContextMenuItem>
            {uiText.demo.contextMenu.back}
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            {uiText.demo.contextMenu.forward}
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            {uiText.demo.contextMenu.reload}
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              {uiText.demo.contextMenu.moreTools}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuGroup>
                <ContextMenuItem>
                  {uiText.demo.contextMenu.savePage}
                </ContextMenuItem>
                <ContextMenuItem>
                  {uiText.demo.contextMenu.shortcut}
                </ContextMenuItem>
                <ContextMenuItem>
                  {uiText.demo.contextMenu.nameWindow}
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>
                  {uiText.demo.contextMenu.developerTools}
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  {uiText.demo.contextMenu.delete}
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked>
            {uiText.demo.contextMenu.showBookmarks}
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>
            {uiText.demo.contextMenu.showUrls}
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel>
              {uiText.demo.contextMenu.people}
            </ContextMenuLabel>
            <ContextMenuRadioItem value="pedro">
              {uiText.demo.contextMenu.pedro}
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              {uiText.demo.contextMenu.colm}
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
