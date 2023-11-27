"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Fragment } from "react";

const AuthStatus = () => {
  const { data: session } = useSession();

  return session ? (
    <Fragment>
      <Image
        src={session?.user?.image}
        width={150}
        height={150}
        className="w-8 h-8 rounded-full"
        alt={session?.user?.name}
      />
      <button type="button" onClick={() => signOut()}>
        <span className="hidden sm:inline text-white">Sign Out</span>
      </button>
    </Fragment>
  ) : (
    <button type="button" onClick={() => signIn("google")}>
      <span className="hidden sm:inline text-white">Sign In</span>
    </button>
  );
};

export default AuthStatus;
