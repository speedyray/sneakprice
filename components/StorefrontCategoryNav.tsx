"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
  {
    label: "All",
    href: "/marketplace",
  },
  {
    label: "Brands",
    href: "/marketplace/brands",
    dropdown: [
      { label: "Nike", href: "/marketplace/brands/nike" },
      { label: "Jordan", href: "/marketplace/brands/jordan" },
      { label: "Adidas", href: "/marketplace/brands/adidas" },
      { label: "Yeezy", href: "/marketplace/brands/yeezy" },
      { label: "New Balance", href: "/marketplace/brands/new-balance" },
      { label: "ASICS", href: "/marketplace/brands/asics" },
    ],
  },
  {
    label: "Trending",
    href: "/marketplace/trending",
  },
  {
    label: "New",
    href: "/marketplace/new",
  },
  {
    label: "Deals",
    href: "/marketplace/deals",
  },
  {
    label: "Men",
    href: "/marketplace/men",
  },
  {
    label: "Women",
    href: "/marketplace/women",
  },
  {
    label: "Kids",
    href: "/marketplace/kids",
  },
  {
    label: "Sneakers",
    href: "/marketplace/sneakers",
    dropdown: [
      { label: "Lifestyle", href: "/marketplace/sneakers/lifestyle" },
      { label: "Basketball", href: "/marketplace/sneakers/basketball" },
      { label: "Running", href: "/marketplace/sneakers/running" },
      { label: "Training", href: "/marketplace/sneakers/training" },
      { label: "Skate", href: "/marketplace/sneakers/skate" },
      { label: "Retro", href: "/marketplace/sneakers/retro" },
    ],
  },
  {
    label: "Shoes",
    href: "/marketplace/shoes",
  },
  {
    label: "Apparel",
    href: "/marketplace/apparel",
    dropdown: [
      { label: "Hoodies", href: "/marketplace/apparel/hoodies" },
      { label: "Jackets", href: "/marketplace/apparel/jackets" },
      { label: "Tees", href: "/marketplace/apparel/tees" },
      { label: "Pants", href: "/marketplace/apparel/pants" },
      { label: "Shorts", href: "/marketplace/apparel/shorts" },
    ],
  },
  {
    label: "Accessories",
    href: "/marketplace/accessories",
  },
  {
    label: "Collectibles",
    href: "/marketplace/collectibles",
  },
  {
    label: "3D Printed",
    href: "/marketplace/trading-cards",
  },
  {
    label: "More",
    href: "/marketplace/more",
    dropdown: [
      { label: "Watches", href: "/marketplace/watches" },
      { label: "Bags", href: "/marketplace/bags" },
      { label: "Luxury", href: "/marketplace/luxury" },
      { label: "Electronics", href: "/marketplace/electronics" },
    ],
  },
];

export default function StorefrontCategoryNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const activeItem = navItems.find((item) => item.label === activeMenu);

  return (
    <div className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">
        <div className="relative">
        <div className="flex items-center gap-7 overflow-x-auto py-4 text-[18px] font-semibold text-black">
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap hover:opacity-70"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Menu className="h-4 w-4" />
              <span>All</span>
            </button>

            {navItems.slice(1).map((item) => (
              <div
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() =>
                  item.dropdown ? setActiveMenu(item.label) : setActiveMenu(null)
                }
              >
                <Link
                  href={item.href}
                  className="whitespace-nowrap hover:text-red-500"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {activeItem?.dropdown ? (
            <div
              className="absolute left-0 top-full z-50 w-full border-t border-black/5 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="grid grid-cols-2 gap-3 px-6 py-5 md:grid-cols-3 lg:grid-cols-4">
                {activeItem.dropdown.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="rounded-xl border border-black/10 px-4 py-3 text-sm hover:bg-black/5"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}