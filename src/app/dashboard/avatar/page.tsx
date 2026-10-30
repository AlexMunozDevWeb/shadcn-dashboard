import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/modules/components//ui/avatar";
import { uiText } from "@/modules/data/ui-text";

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt={uiText.demo.avatar.shadcn}
          className="grayscale"
        />
        <AvatarFallback>{uiText.demo.avatar.cn}</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt={uiText.demo.avatar.evilrabbit}
        />
        <AvatarFallback>{uiText.demo.avatar.er}</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <AvatarGroup className="grayscale">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={uiText.demo.avatar.shadcn}
          />
          <AvatarFallback>{uiText.demo.avatar.cn}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/maxleiter.png"
            alt={uiText.demo.avatar.maxleiter}
          />
          <AvatarFallback>{uiText.demo.avatar.lr}</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt={uiText.demo.avatar.evilrabbit}
          />
          <AvatarFallback>{uiText.demo.avatar.er}</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
