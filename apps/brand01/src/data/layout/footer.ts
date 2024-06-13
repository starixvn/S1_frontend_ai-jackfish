import { paths } from "JF-constants";

interface IFooterNavProps {
  displayKey: string;
  pathname: string;
  iconPath: string;
}

export const FOOTER_NAV_LEFT_DATA = [
  {
    displayKey: "Label_General_Profile",
    pathname: paths.profile.root,
    iconPath: "h5-icon-profile.svg",
  },
  {
    displayKey: "Label_General_Deposit",
    pathname: paths.deposit.root,
    iconPath: "h5-icon-deposit.svg",
  },
  {
    displayKey: "Label_General_Promotion",
    pathname: paths.promotion.root,
    iconPath: "h5-icon-gift.svg",
  },
] as const satisfies Array<IFooterNavProps>;

export const FOOTER_NAV_RIGHT_DATA = [
  {
    displayKey: "Label_General_Affiliate",
    pathname: paths.affiliate.root,
    iconPath: "h5-icon-affiliate.svg",
  },
  {
    displayKey: "Label_General_Contact",
    pathname: "https://line.me/R/ti/p/@743gnvdf?oat_content=url&ts=05031614",
    iconPath: "h5-icon-contact.svg",
  },
] as const satisfies Array<IFooterNavProps>;
