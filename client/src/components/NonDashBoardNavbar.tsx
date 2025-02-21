"use client";

import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { motion } from "framer-motion";
import { Bell, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const NonDashboardNavbar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType as "student" | "teacher";

  console.log(
    " user?.publicMetadata?.userType",
    user?.publicMetadata?.userType
  );

  return (
    <motion.nav
      className="nondashboard-navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nondashboard-navbar__container">
        <div className="nondashboard-navbar__search">
          <Link href="/" className="nondashboard-navbar__brand ">
            &lt;Dev House /&gt;
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Link
                href="/search"
                className="nondashboard-navbar__search-input"
              >
                <span className="hidden md:inline">Pesquisar por Cursos</span>
                <span className="sm:hidden ">Pesquisar</span>
              </Link>
              <Search className="nondashboard-navbar__search-icon" size-={18} />
            </div>
          </div>
        </div>
        <div className="nondashboard-navbar__actions">
          <button className="nondashboard-navbar__notification-button">
            <span className="nondashboard-navbar__notification-indicator"></span>
            <Bell className="nondashboard-navbar__notification-icon" />
          </button>

          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: dark,
                elements: {
                  userButtonOuterIdentifier:
                    "text-customgreys-dirtyGrey text-sm hidden md:inline",
                  userButtonBox: "scale-90 sm:scale-110",
                  userButtonPopoverFooter: "hidden",
                  userButtonAvatarBox: "w-10 h-10",
                  userButtonAvatarImage: "w-10 h-10",
                },
              }}
              showName={true}
              userProfileMode="navigation"
              userProfileUrl={
                userRole === "teacher" ? "/teacher/profile " : "/user/profile"
              }
            />
          </SignedIn>

          <SignedOut>
            <Link
              href="/signin"
              className="nondashboard-navbar__auth-button--login"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="nondashboard-navbar__auth-button--signup"
            >
              Signup
            </Link>
          </SignedOut>
        </div>
      </div>
    </motion.nav>
  );
};

export default NonDashboardNavbar;
