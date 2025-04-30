"use client";

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

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
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const Links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
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

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated") {
    return (
      <Link href="/api/auth/signin" className="nav-links">
        Sign in
      </Link>
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
          <Link href="/api/auth/signout">Sign out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
