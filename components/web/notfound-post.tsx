import { SearchIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import Link from "next/link";

export function NotFoundPost() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - بلاگ مورد نظر یافت نشد</EmptyTitle>
        <EmptyDescription>
          صفحه ای که به دنبال آن هستید وجود ندارد!
          <br />
          آنچه دنبالش هستید را در بخش جستجوی زیر جستجو کنید.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="سعی کنید چیزی را بیابید ..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          <Link href={"/blog"}>بازگشت به وبلاگ ها</Link>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
