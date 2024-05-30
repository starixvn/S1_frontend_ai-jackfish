import { paths } from "@constants";

export interface INavMenuProps {
  displayKey: string;
  pathname: string;
  active: string;
}

export const MENU_NAV_DATA: INavMenuProps[] = [
  {
    displayKey: "Label_General_Home",
    pathname: paths.home.root,
    active: "home",
  },
  {
    displayKey: "Label_General_Promotion",
    pathname: paths.promotion.root,
    active: "promotion",
  },
  {
    displayKey: "Contact",
    pathname: "https://line.me/R/ti/p/@743gnvdf?oat_content=url&ts=05031614",
    active: "contact",
  },
];
