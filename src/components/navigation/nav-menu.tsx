import type { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import navbarData from "@/content/sections/navbar.json"
import IconComponent from "@/components/icon";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
  const { quickLinks, settings } = navbarData
  return <NavigationMenu {...props}>
    <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      {
        quickLinks.map((link, index) => <NavigationMenuItem key={`${index}_${link.label}`}>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href={link.url}>{settings.isIconVisible && link.icon && <IconComponent name={link.icon} className="size-4" />}{link.label}</a>
          </NavigationMenuLink>
        </NavigationMenuItem>)
      }
    </NavigationMenuList>
  </NavigationMenu>
};
