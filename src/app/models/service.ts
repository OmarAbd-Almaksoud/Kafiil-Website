export interface Service {
  userid?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  mainImg?: string;
  imgs?: string[];
  deliveryDuration?: string;
  buyerinstructions?: string;
  addons?: Addon[];
  isfeatured?: boolean;
  isaproved?: boolean;
  rating?: number;
  orderscount?: number;
  state?: string;
}

export interface Addon {
  addonTitle?: string;
  addonPrice?: number;
  addonDeliveryDuration?: string;
}
