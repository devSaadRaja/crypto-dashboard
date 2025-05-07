"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1C1C1C]/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFAB] to-[#00FFAB]/50 rounded-full blur-sm"></div>
              <div className="relative bg-[#2C3E50] rounded-full p-2">
                <span className="text-[#00FFAB] font-bold text-xl font-mono">
                  CD
                </span>
              </div>
            </div>
            <span className="ml-3 text-[#ECECEC] font-bold text-xl">
              CryptoDash
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <NavItem href="#" active>
              Dashboard
            </NavItem>
            <NavItem href="#">Coin Detail</NavItem>
            <NavItem href="#">Compare</NavItem>
            <NavItem href="#">Watchlist</NavItem>
            <NavItem href="#">Leaderboard</NavItem>
            <NavItem href="#">News</NavItem>
            <NavItem href="#">Markets</NavItem>
            <NavItem href="#">Portfolio</NavItem>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#ECECEC] hover:text-[#00FFAB] rounded-full"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#ECECEC] hover:text-[#00FFAB] rounded-full"
            >
              <Moon className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-[#2C3E50] hover:border-[#00FFAB] transition-colors">
              <AvatarFallback className="bg-[#2C3E50] text-[#00FFAB]">
                JD
              </AvatarFallback>
            </Avatar>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#ECECEC] hover:text-[#00FFAB] rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1C1C1C]/95 backdrop-blur-md border-t border-[#2C3E50] py-4 shadow-lg">
          <nav className="flex flex-col space-y-1 px-6">
            <MobileNavItem href="#" active>
              Dashboard
            </MobileNavItem>
            <MobileNavItem href="#">Markets</MobileNavItem>
            <MobileNavItem href="#">Portfolio</MobileNavItem>
            <MobileNavItem href="#">News</MobileNavItem>
          </nav>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2C3E50] px-6">
            <Button variant="ghost" size="sm" className="text-[#ECECEC]">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Button>
            <Button variant="ghost" size="sm" className="text-[#ECECEC]">
              <Moon className="h-5 w-5 mr-2" />
              Dark Mode
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? "text-[#00FFAB] bg-[#2C3E50]"
          : "text-[#ECECEC] hover:text-[#00FFAB] hover:bg-[#2C3E50]/50"
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#00FFAB] rounded-full"></span>
      )}
    </a>
  );
}

function MobileNavItem({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={`relative px-4 py-3 rounded-lg text-base font-medium ${
        active
          ? "text-[#00FFAB] bg-[#2C3E50]"
          : "text-[#ECECEC] hover:text-[#00FFAB] hover:bg-[#2C3E50]/50"
      }`}
    >
      {children}
    </a>
  );
}
