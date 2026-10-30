import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/modules/components//ui/menubar";
import { uiText } from "@/modules/data/ui-text";

export default function MenubarDemo() {
  return (
    <Menubar className="w-72">
      <MenubarMenu>
        <MenubarTrigger>{uiText.demo.menubar.file}</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              {uiText.demo.menubar.newTab} <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              {uiText.demo.menubar.newWindow}{" "}
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>{uiText.demo.menubar.incognito}</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>{uiText.demo.menubar.share}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>{uiText.demo.menubar.emailLink}</MenubarItem>
                  <MenubarItem>{uiText.demo.menubar.messages}</MenubarItem>
                  <MenubarItem>{uiText.demo.menubar.notes}</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
              {uiText.demo.menubar.print} <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{uiText.demo.menubar.edit}</MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              {uiText.demo.menubar.undo} <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              {uiText.demo.menubar.redo} <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>{uiText.demo.menubar.find}</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>{uiText.demo.menubar.searchWeb}</MenubarItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem>{uiText.demo.menubar.findItem}</MenubarItem>
                  <MenubarItem>{uiText.demo.menubar.findNext}</MenubarItem>
                  <MenubarItem>{uiText.demo.menubar.findPrevious}</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>{uiText.demo.menubar.cut}</MenubarItem>
            <MenubarItem>{uiText.demo.menubar.copy}</MenubarItem>
            <MenubarItem>{uiText.demo.menubar.paste}</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{uiText.demo.menubar.view}</MenubarTrigger>
        <MenubarContent className="w-44">
          <MenubarGroup>
            <MenubarCheckboxItem>
              {uiText.demo.menubar.bookmarks}
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              {uiText.demo.menubar.urls}
            </MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>
              {uiText.demo.menubar.reload} <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              {uiText.demo.menubar.forceReload}{" "}
              <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>{uiText.demo.menubar.fullscreen}</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>{uiText.demo.menubar.hideSidebar}</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{uiText.demo.menubar.profiles}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">
              {uiText.demo.menubar.andy}
            </MenubarRadioItem>
            <MenubarRadioItem value="benoit">
              {uiText.demo.menubar.benoit}
            </MenubarRadioItem>
            <MenubarRadioItem value="Luis">
              {uiText.demo.menubar.luis}
            </MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>{uiText.demo.menubar.editProfile}</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>{uiText.demo.menubar.addProfile}</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
