"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setAppProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setAppProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/chat_gpt.png"
          alt="ChatGPT Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">ChatGPT Blog</p>
      </Link>
      {/* Desktop Nav*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex  gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  {console.log("Id is here ", provider.id)}
                  <button
                    type="button"
                    // onClick={() => signIn(provider.id)}
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    key={provider.name}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </>
              ))}
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {/* <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button onClick={signOut} className="outline_btn">
              Sign out
            </button> */}
            <Image
              src={session?.user?.image}
              width={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
              height={37}
              className="rounded-full"
              alt="profile"
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  className="w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;
