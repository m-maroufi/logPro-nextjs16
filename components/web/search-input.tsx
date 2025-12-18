"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ExternalLinkIcon, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import { Spinner } from "../ui/spinner";

function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.posts.searchPosts,
    term.length >= 2 ? { limit: 5, trem: term } : "skip"
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    setOpen(true);
  }
  return (
    <div className="relative max-w-xs lg:min-w-sm w-full z-20 ">
      <div className="relative">
        <Search className="absolute top-2.5 right-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          className="w-full ps-10 bg-background"
          placeholder="جستوجو کنید ..."
          value={term}
          onChange={handleInputChange}
        />
      </div>
      {open && term.length >= 2 && (
        <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 w-full p-4">
          {results === undefined ? (
            <div className="text-muted-foreground flex items-center gap-4">
              <Spinner className="size-6" />
              در حال جستوجو
            </div>
          ) : results.length === 0 ? (
            <div className="text-muted-foreground">
              <h4>نتیجه ای یافت نشد!</h4>
            </div>
          ) : (
            <div className="py-1 space-y-3 flex flex-col gap-y-3">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  className="block hover:bg-accent hover:text-accent-foreground overflow-hidden"
                  onClick={() => {
                    setOpen(false);
                    setTerm("");
                  }}
                >
                  <Item variant="outline" asChild>
                    <div>
                      <ItemContent>
                        <ItemTitle>{post.title}</ItemTitle>
                        <ItemDescription className="p-0 m-0 mt-1">
                          {post.body.substring(0, 40)}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <ExternalLinkIcon className="size-4" />
                      </ItemActions>
                    </div>
                  </Item>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
