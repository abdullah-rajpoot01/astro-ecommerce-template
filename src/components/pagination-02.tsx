// src/components/products/pagination.tsx
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  pagination: {
    currentPage: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextUrl: string | undefined;
    prevUrl: string | undefined;
  };
  baseUrl: string; // Adds flexibility for different routing scopes
}

export default function PaginationWithPrimaryButton({ pagination, baseUrl }: PaginationProps) {
  const { currentPage, lastPage, hasPrev, hasNext, prevUrl, nextUrl } = pagination;

  // 1. Dynamic Window Calculation logic (Max 4 visible item links)
  const maxVisible = 4;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  // Adjust bounds if we are close to the last index limit
  if (endPage > lastPage) {
    endPage = lastPage;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  // Generate the window slice range array
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 }, 
    (_, i) => startPage + i
  );

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            href={hasPrev ? prevUrl : undefined} 
            className={!hasPrev ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* First Page Quick Link + Ellipsis */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={`${baseUrl}/1`}>1</PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <span className="px-2 text-muted-foreground select-none">...</span>
              </PaginationItem>
            )}
          </>
        )}

        {/* Dynamic Slid Window Range List */}
        {visiblePages.map((pageNumber) => {
          const isCurrent = pageNumber === currentPage;
          const pageUrl = `${baseUrl}/${pageNumber}`;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={pageUrl}
                isActive={isCurrent}
                className={cn(
                  isCurrent &&
                    "shadow-none! hover:text-primary-foreground! dark:bg-primary dark:hover:bg-primary/90",
                  isCurrent &&
                    buttonVariants({
                      variant: "default",
                      size: "icon",
                    })
                )}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Last Page Quick Link + Ellipsis */}
        {endPage < lastPage && (
          <>
            {endPage < lastPage - 1 && (
              <PaginationItem>
                <span className="px-2 text-muted-foreground select-none">...</span>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={`${baseUrl}/${lastPage}`}>{lastPage}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            href={hasNext ? nextUrl : undefined} 
            className={!hasNext ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
