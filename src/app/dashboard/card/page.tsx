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

const spacingOptions = [
  {
    className: "[--card-spacing:--spacing(4)]",
    label: "16px",
    value: "4",
  },
  {
    className: "[--card-spacing:--spacing(5)]",
    label: "20px",
    value: "5",
  },
  {
    className: "[--card-spacing:--spacing(6)]",
    label: "24px",
    value: "6",
  },
  {
    className: "[--card-spacing:--spacing(8)]",
    label: "32px",
    value: "8",
  },
];

export default function CardSpacing() {
  const featureName = "Scheduled reports";

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
              <CardDescription>
                Weekly snapshots. No more manual exports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 py-2 text-sm">
                <li className="flex gap-2">
                  <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>Choose a schedule (daily, or weekly).</span>
                </li>
                <li className="flex gap-2">
                  <ChevronRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>Send to channels or specific teammates.</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex-row gap-3 justify-end">
              <Button size="sm">Info</Button>
              <Button variant="outline" size="sm">
                More
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
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email-spacing">Email</Label>
                  <Input
                    id="email-spacing"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password-spacing">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password-spacing" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
