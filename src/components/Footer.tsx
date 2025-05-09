import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#2C3E50] py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col">
            <h3 className="mb-3 font-jetbrains text-lg font-bold text-[#00FFAB]">
              CryptoDash
            </h3>
            <p className="text-sm text-[#ECECEC]">
              Real-time cryptocurrency tracking and analysis dashboard.
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-3 font-jetbrains text-sm font-medium text-[#00FFAB]">
              Resources
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Dashboard
              </Link>
              <Link
                href="/watchlist"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Watchlist
              </Link>
              <Link
                href="/leaderboard"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Leaderboard
              </Link>
              <Link
                href="/news"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                News
              </Link>
              <Link
                href="/markets"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Markets
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Portfolio
              </Link>
            </nav>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-3 font-jetbrains text-sm font-medium text-[#00FFAB]">
              Company
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Terms of Service
              </Link>
            </nav>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-3 font-jetbrains text-sm font-medium text-[#00FFAB]">
              Connect
            </h4>
            <div className="flex space-x-4">
              <Link
                href="https://github.com"
                className="text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <div className="mt-4">
              <p className="text-xs text-[#ECECEC]">
                Subscribe to our newsletter
              </p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-l bg-[#2C3E50] px-3 py-2 text-sm text-[#ECECEC] placeholder:text-[#ECECEC]/50 focus:outline-none"
                />
                <button className="rounded-r bg-[#00FFAB] px-3 py-2 text-xs font-medium text-[#1C1C1C] transition-colors hover:bg-[#00FFAB]/90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#2C3E50] pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-xs text-[#ECECEC]">
              © {new Date().getFullYear()} CryptoDash. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-xs text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-[#ECECEC] transition-colors hover:text-[#00FFAB]"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
