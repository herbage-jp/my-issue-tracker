"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { useClientTranslation } from "@/app/i18n/useClientTranslation";

import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <Flex align="center" gap="3">
            <LanguageSwitcher />
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const { t } = useClientTranslation();

  const Links = [
    { href: "/", label: t("navbar.dashboard") },
    { href: "/issues/list", label: t("navbar.issues") },
  ];
  return (
    <ul className="flex space-x-6">
      {Links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-links": true,
              "!text-zinc-900": currentPath === link.href,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useClientTranslation();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <button 
        onClick={() => signIn("google", { callbackUrl: pathname })} 
        className="nav-links bg-transparent border-0 cursor-pointer p-0"
      >
        {t("navbar.signIn")}
      </button>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size="2"
          radius="full"
          className="cursor-pointer"
          referrerPolicy="no-referrer"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size="2"> {session!.user!.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <button 
            onClick={() => signOut({ callbackUrl: pathname })} 
            className="bg-transparent border-0 cursor-pointer p-0 w-full text-left"
          >
            {t("navbar.signOut")}
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
