"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Field, FieldLabel } from "@/modules/components//ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/modules/components//ui/input-otp";
import { uiText } from "@/modules/data/ui-text";

export default function InputOTPPattern() {
  return (
    <div className="flex flex-col gap-4">
      <Field className="w-fit">
        <FieldLabel htmlFor="digits-only">
          {uiText.demo.inputOtp.digitsOnly}
        </FieldLabel>
        <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </div>
  );
}
