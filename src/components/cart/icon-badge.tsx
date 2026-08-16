import { ShoppingBag } from "lucide-react";
import {  buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CartIconWithBadge = ({ showCount }: { showCount: boolean }) => (
  <div  className="flex items-center gap-2">
    <div className="relative">
      <div className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
        <ShoppingBag /> 
      </div>
      {showCount && <span className="absolute top-0 right-0 flex min-w-4 origin-center translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-destructive px-1 text-white text-xs">
        2
      </span>}
    </div>
  </div>
);

export default CartIconWithBadge;
