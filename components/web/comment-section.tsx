"use client";
import { commentSchema } from "@/app/schemas/comment";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { convertDateToShamsi } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery,
} from "convex/react";
import { MessageCircleOff, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

const CommnetSection = (props: {
  preloadedComments: Preloaded<typeof api.comments.getCommentsByPostId>;
}) => {
  const params = useParams<{ id: Id<"posts"> }>();
  const data = usePreloadedQuery(props.preloadedComments);
  const createComment = useMutation(api.comments.createComment);
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      body: "",
      postId: params.id,
    },
  });
  async function onSubmit(data: z.infer<typeof commentSchema>) {
    console.log(data);
    try {
      await createComment({
        body: data.body,
        postId: data.postId,
      });
      form.reset();
      // form.resetField("body")
      toast.success("دیدگاه با موفقیت ایجاد شد", {
        duration: 3000,
        position: "top-center",
        richColors: true,
        icon: "✅",
      });
    } catch (error) {
      console.log(error);
      toast.error("خطایی در ایجاد دیدگاه رخ داد", {
        duration: 3000,
        position: "top-center",
        richColors: true,
        icon: "⚠️",
      });
    }
  }

  if (data === undefined) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-28">
        <Spinner className="size-10 text-primary" />
        <h4 className="text-muted-foreground">
          در حال بارگزاری دیدگاه ها ...{" "}
        </h4>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center w-full border-b">
        <MessageSquare className="size-4" />
        <h2> {data?.length || 0} دیدگاه </h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel> متن دیدگاه</FieldLabel>
                <Textarea
                  className="min-h-26"
                  placeholder="دیدگاه خود را بنویسید ..."
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
                ایجاد دیدگاه
              </Button>
            </>
          )}
        </form>
        <Separator className="my-8" />
        <section className="space-y-6">
          <h3>دیدگاه کاربران</h3>

          {data?.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-10 text-center border rounded-lg bg-muted/30">
              <MessageCircleOff className="w-10 h-10 text-muted-foreground" />

              <p className="text-sm font-medium text-foreground">
                هنوز دیدگاهی ثبت نشده
              </p>

              <p className="text-xs text-muted-foreground">
                اولین نفری باشید که نظر خود را درباره این پست می‌نویسد
              </p>
            </div>
          ) : (
            <ItemGroup className="gap-4">
              {data?.map((comment) => (
                <Item key={comment._id} variant="muted" role="listitem">
                  <ItemMedia variant="image">
                    <Image
                      src={`https://avatar.vercel.sh/${comment.authorEmail}?rounded=60`}
                      alt={comment.body}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </ItemMedia>

                  <ItemContent>
                    <ItemTitle className="border-b pb-2 w-full flex justify-between">
                      {comment.authorName}
                      <span className="text-muted-foreground text-xs">
                        {convertDateToShamsi(comment._creationTime)}
                      </span>
                    </ItemTitle>

                    <ItemDescription className="p-0 m-2 text-foreground/80">
                      {comment.body}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default CommnetSection;
