export type ListingFormValues = {
  brand: string;
  model: string;
  colorway: string;
  sku: string;
  size: string;
  price: string;
  retailPrice: string;
  condition: string;
  imageUrl: string;
};

export type ListingFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ListingFormValues | "imageFile", string>>;
  values: ListingFormValues;
};

export const initialListingFormValues: ListingFormValues = {
  brand: "",
  model: "",
  colorway: "",
  sku: "",
  size: "",
  price: "",
  retailPrice: "",
  condition: "Deadstock",
  imageUrl: "",
};

export const initialListingFormState: ListingFormState = {
  status: "idle",
  values: initialListingFormValues,
};
