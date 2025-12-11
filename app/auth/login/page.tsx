"use client";

import { loginSchema } from "@/app/schemas/auth";
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
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { InboxIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function LoginPage() {
  const router = useRouter();

  // form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    await authClient.signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("با موفیقت وارد شدید", {
            duration: 3000,
            position: "top-center",
            richColors: true,
            icon: "🥳",
          });
          form.reset();
          router.replace("/", {
            scroll: false,
          });
        },
        onError: () => {
          toast.error("خطا در ورود", {
            duration: 3000,
            position: "top-center",
            richColors: true,
            icon: "😢",
          });
        },
      },
    });
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader className="relative">
        <CardTitle className="font-bold text-xl">خوش آمدید </CardTitle>
        <CardDescription>برای شروع وارد حساب کاربری خود شوید</CardDescription>
        <Link
          href={"/auth/sign-up"}
          className={`${buttonVariants({
            variant: "ghost",
          })} absolute left-3 top-2 text-lg no-underline`}
        >
          ثبت نام
        </Link>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-5">
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
            {form.formState.isLoading || form.formState.isSubmitting ? (
              <>
                <Button
                  size={"lg"}
                  tabIndex={4}
                  type="button"
                  disabled={
                    form.formState.isLoading || form.formState.isSubmitting
                  }
                >
                  <Spinner />
                  لطفا کمی صبر کنید
                </Button>
              </>
            ) : (
              <>
                <Button size={"lg"} tabIndex={4}>
                  ورود به حساب
                </Button>
              </>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
