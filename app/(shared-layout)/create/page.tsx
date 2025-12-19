"use client";
import { createBlogAction } from "@/app/actions";
import { createBlogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import z from "zod";

export default function CreatePage() {
  const form = useForm<z.infer<typeof createBlogSchema>>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof createBlogSchema>) {
    await createBlogAction(values);
    form.reset();
  }

  return (
    <section className="container pt-24 pb-10">
      <div className="text-right">
        <h1 className="text-right">ایجاد پست</h1>
        <p className="text-muted-foreground">یک پست جدید ایجاد کنید...</p>
      </div>
      <Card className="max-w-2xl w-full mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">فرم ایجاد یک پست جدید</CardTitle>
          <CardDescription>فیلد های زیر را با دقت کامل کنید</CardDescription>
          <Separator className="my-3" />
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-y-5">
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>عنوان</FieldLabel>
                      <InputGroup className="h-11">
                        <InputGroupInput
                          placeholder="یک عنوان برای پست بنویسید ..."
                          className="h-11 text-base pr-1"
                          {...field}
                          aria-invalid={fieldState.invalid}
                          type="text"
                          tabIndex={1}
                        />
                        <InputGroupAddon className="pr-2 pl-2">
                          <PenIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="p-0 m-0 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="content"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel> توضیحات</FieldLabel>
                      <Textarea
                        className="min-h-26"
                        placeholder="متن و توضیحات کامل پست خود را بنویسید ..."
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="p-0 m-0 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>
                        تصویر <mark>(فرمت های : png , jpeg ,webp ,jpg)</mark>
                      </FieldLabel>
                      <Input
                        type="file"
                        placeholder="تصویر پست خود را انتخاب کنید ..."
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="p-0 m-0 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />
                <div className="mt-6 w-full">
                  {form.formState.isLoading || form.formState.isSubmitting ? (
                    <>
                      <Button
                        size={"lg"}
                        tabIndex={4}
                        type="button"
                        className="w-full"
                        disabled={
                          form.formState.isLoading ||
                          form.formState.isSubmitting
                        }
                      >
                        <Spinner />
                        لطفا کمی صبر کنید
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size={"lg"} tabIndex={4} className="w-full">
                        ایجاد پست
                      </Button>
                    </>
                  )}
                </div>
              </FieldGroup>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </section>
  );
}
