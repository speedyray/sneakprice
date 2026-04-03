"use client";

import { useState } from "react";

type AddToCartButtonProps = {
  item: {
    id: string;
    title: string;
    price: number;
    imageUrl: string | null;
    brand: string | null;
    model: string | null;
    size: string | null;
  };
  className?: string;
};

type CartItem = AddToCartButtonProps["item"] & {
  quantity: number;
  addedAt: string;
};

const CART_STORAGE_KEY = "sneakprice-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function AddToCartButton({
  item,
  className,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => {
          const cart = readCart();
          const existingItem = cart.find((entry) => entry.id === item.id);

          if (existingItem) {
            const updatedCart = cart.map((entry) =>
              entry.id === item.id
                ? {
                    ...entry,
                    quantity: entry.quantity + 1,
                  }
                : entry
            );

            writeCart(updatedCart);
            setIsAdded(true);
            setFeedback("Quantity updated in cart.");
            return;
          }

          writeCart([
            ...cart,
            {
              ...item,
              quantity: 1,
              addedAt: new Date().toISOString(),
            },
          ]);
          setIsAdded(true);
          setFeedback("Saved to cart in this browser.");
        }}
        className={
          className ??
          "inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-amber-200"
        }
      >
        {isAdded ? "Added to cart" : "Add to cart"}
      </button>

      {feedback ? (
        <p className="text-center text-xs text-neutral-500">{feedback}</p>
      ) : (
        <p className="text-center text-xs text-neutral-500">
          Cart is stored locally for now.
        </p>
      )}
    </div>
  );
}
