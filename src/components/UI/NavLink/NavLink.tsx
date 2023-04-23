import Link from "next/link";
import type { INavLinkProps } from "./types";
import { useRouter } from "next/router";

const NavLink = ({ href, target, onClick, children }: INavLinkProps) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`block h-full w-full rounded-md px-4 py-2 transition-colors hover:bg-stone-900 ${
        pathname === href ? "bg-stone-900" : "bg-transparent"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;