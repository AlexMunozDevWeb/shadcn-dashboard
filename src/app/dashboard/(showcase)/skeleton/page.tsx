import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/modules/components//ui/card";
import { Button } from "@/modules/components//ui/button";
import Image from "next/image";
import { uiText } from "@/modules/data/ui-text";

const getData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "123456789".split("");
};

export default async function SkeletonDemo() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
      {data.map((item) => (
        <Card key={item}>
          <CardHeader className="flex flex-row">
            <Image
              src="https://github.com/shadcn.png"
              alt={uiText.demo.skeleton.alt}
              width={40}
              height={40}
              className="rounded-full mr-2 w-10 h-10"
            />
            <div>
              <CardTitle>{uiText.demo.skeleton.title}</CardTitle>
              <CardDescription>
                {uiText.demo.skeleton.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button>{uiText.demo.skeleton.more}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
