"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Fragment } from "react";
import Link from "next/link";

import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Monitor from "@/assets/icon/Monitor";

const AuthStatus = () => {
  const { data: session } = useSession();
  const role = session && session?.token?.role;

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={session?.user?.image}
              width={150}
              height={150}
              className="w-8 h-8 rounded-full cursor-pointer"
              alt={session?.user?.name}
              priority
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mr-20">
            <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {role === "ADMIN" ||
                (role === "SUPER ADMIN" && (
                  <DropdownMenuItem>
                    <Monitor className="mr-2 h-4 w-4" />
                    <Link href={"/dashboard"}>Dashboard</Link>
                    <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/login"}>
          <span className="text-black">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default AuthStatus;
{
  /* <Link href={"/login"}>
<span className="text-black">Sign In</span>
</Link> */
}
{
  /* <Fragment>
<Image
  src={session?.user?.image}
  width={150}
  height={150}
  className="w-8 h-8 rounded-full"
  alt={session?.user?.name}
/>
<button type="button" onClick={() => signOut()}>
  <span className="text-black">Sign Out</span>
</button>
</Fragment> */
}
