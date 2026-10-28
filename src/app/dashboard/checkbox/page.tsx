"use client";
import { Badge } from "@/modules/components//ui/badge";
import { Checkbox } from "@/modules/components//ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/modules/components//ui/field";
import { useState } from "react";

export default function CheckboxGroup() {
  const [terms, setTermns] = useState(true);
  return (
    <FieldSet>
      <FieldLegend variant="label">
        Show these items on the desktop:
      </FieldLegend>
      <FieldDescription>
        Select the items you want to show on the desktop.
      </FieldDescription>
      <FieldGroup className="gap-3">
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-hard-disks-ljj-checkbox"
            name="finder-pref-9k2-hard-disks-ljj-checkbox"
            onCheckedChange={(value: boolean) => setTermns(value)}
            defaultChecked
          />
          <FieldLabel
            htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
            className="font-normal"
          >
            Hard disks
          </FieldLabel>
        </Field>
        {terms ? (
          <Badge>Great!</Badge>
        ) : (
          <Badge variant="destructive">Warning!</Badge>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
