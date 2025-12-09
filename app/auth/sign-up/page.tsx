"use client";

import { signUpSchema } from "@/app/schemas/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { InboxIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function SignUpPage() {
  // form
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    await authClient.signUp.email({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    form.reset();
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="relative">
        <CardTitle className="font-bold text-xl">ثبت نام کنید</CardTitle>
        <CardDescription>برای شروع ثبت نام کنید</CardDescription>
        <Link
          href={"/auth/login"}
          className={`${buttonVariants({
            variant: "ghost",
          })} absolute left-3 top-2 text-lg no-underline`}
        >
          ورود
        </Link>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>نام و نام خانوادگی</FieldLabel>
                  <InputGroup className="h-11">
                    <InputGroupInput
                      placeholder="بین 3 تا 20 کارکتر"
                      className="h-11 text-base pr-1"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      type="text"
                      tabIndex={1}
                    />
                    <InputGroupAddon className="pr-2 pl-2">
                      <UserIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>آدرس ایمیل</FieldLabel>
                  <InputGroup className="h-11">
                    <InputGroupInput
                      placeholder="example@email.com"
                      className="h-11 text-base pr-1"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      tabIndex={2}
                      dir="ltr"
                      {...field}
                    />
                    <InputGroupAddon className="pr-2 pl-2">
                      <InboxIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>کلمه عبور</FieldLabel>
                  <InputGroup className="h-11">
                    <InputGroupInput
                      placeholder="شامل 8 کارکتر"
                      className="h-11 text-base pr-1"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      tabIndex={3}
                    />
                    <InputGroupAddon className="pr-2 pl-2">
                      <InboxIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button size={"lg"} tabIndex={4}>
              {" "}
              ایحاد حساب
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
