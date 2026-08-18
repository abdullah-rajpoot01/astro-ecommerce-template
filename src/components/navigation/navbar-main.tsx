import { NavMenu } from "./nav-menu";
import { MobileNavDialog } from "./mobile-nav";
import { getStoreConfig } from "@/utils/store-config";
import CartIconWithBadge from "../cart/icon-badge";
import navbarData from "@/content/sections/navbar.json"
import {  buttonVariants } from "../ui/button";

const Navbar = () => {
  const { title, subtitle, image, button, cartButton, settings } = navbarData;

  if (!settings.enabled) {
    return null;
  }

  const { store } = getStoreConfig();

  return (
    <nav className="fixed top-0 z-50 left-1/2 -translate-x-1/2  w-full max-w-7xl  border-b border-border/85  bg-background shadow-xs/3">
      <div className="flex h-full items-center justify-between px-4 py-2 ">
        <a href={`/`} className="flex items-center gap-3">

          <div className="relative w-10 h-10 flex justify-center items-center aspect-square  shadow-lg border rounded  border-foreground/80 overflow-hidden">
            <img alt="site-logo" src={image || store.logo} className="w-full h-full" />
          </div>


          <span className="min-w-0 leading-none">
            <span className="block text-base font-black uppercase tracking-wide text-foreground">
              {title || store.name}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
              {subtitle || "Online Store"}
            </span>
          </span>

        </a>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {button.enabled && <div className="hidden lg:block"><a href={button.link} className={buttonVariants({ variant: "default", size: "default" })} >
            {button.text}
          </a>
          </div>
          }

          {cartButton.enabled && <a href={"/cart"}><CartIconWithBadge showCount={cartButton.showCount} /></a>}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNavDialog />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
