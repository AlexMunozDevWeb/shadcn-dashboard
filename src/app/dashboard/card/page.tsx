"use client";

import * as React from "react";

import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/modules/components//ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/modules/components//ui/card";
import { Input } from "@/modules/components//ui/input";
import { Label } from "@/modules/components//ui/label";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/modules/components//ui/toggle-group";
import { uiText } from "@/modules/data/ui-text";

const spacingOptions = [
  {
    className: "[--card-spacing:--spacing(4)]",
    label: uiText.demo.spacing[0],
    value: "4",
  },
  {
    className: "[--card-spacing:--spacing(5)]",
    label: uiText.demo.spacing[1],
    value: "5",
  },
  {
    className: "[--card-spacing:--spacing(6)]",
    label: uiText.demo.spacing[2],
    value: "6",
  },
  {
    className: "[--card-spacing:--spacing(8)]",
    label: uiText.demo.spacing[3],
    value: "8",
  },
];

export default function CardSpacing() {
  const featureName = uiText.demo.card.feature;

  const numsCards = "123456";

  const [spacing, setSpacing] = React.useState("4");
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === spacing,
  );

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {numsCards.split("").map((item) => (
          <Card key={item} size="sm" className="mx-auto w-full max-w-xs">
            <CardHeader>
              <CardTitle>{featureName}</CardTitle>
              <CardDescription>{uiText.demo.card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 py-2 text-sm">
                <li className="flex gap-2">
                  <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{uiText.demo.card.schedule}</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{uiText.demo.card.channels}</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex-row gap-3 justify-end">
              <Button size="sm">{uiText.demo.card.info}</Button>
              <Button variant="outline" size="sm">
                {uiText.demo.card.more}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="grid gap-4">
        <ToggleGroup
          value={[spacing]}
          onValueChange={(value) => {
            if (value[0]) {
              setSpacing(value[0]);
            }
          }}
          variant="outline"
          size="sm"
          className="justify-center"
        >
          {spacingOptions.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Card className={selectedSpacing?.className}>
          <CardHeader>
            <CardTitle>{uiText.demo.card.loginTitle}</CardTitle>
            <CardDescription>
              {uiText.demo.card.loginDescription}
            </CardDescription>
            <CardAction>
              <Button variant="link">{uiText.demo.card.signUp}</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email-spacing">
                    {uiText.demo.card.email}
                  </Label>
                  <Input
                    id="email-spacing"
                    type="email"
                    placeholder={uiText.demo.card.emailPlaceholder}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password-spacing">
                      {uiText.demo.card.password}
                    </Label>
                    <a
                      href="/auth/login"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      {uiText.demo.card.forgotPassword}
                    </a>
                  </div>
                  <Input id="password-spacing" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {uiText.demo.card.login}
            </Button>
            <Button variant="outline" className="w-full">
              {uiText.demo.card.loginGoogle}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
