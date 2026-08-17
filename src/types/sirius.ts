export type ProductCategory =
  | 'sousplat'
  | 'prato_principal'
  | 'prato_sobremesa'
  | 'guardanapo'
  | 'talher_garfo'
  | 'talher_faca'
  | 'talher_colher'
  | 'taca';

export type ExperienceTheme =
  | 'minimalista'
  | 'casamento'
  | 'contemporaneo'
  | 'natal'
  | 'restaurante';

export interface Product {
  id: string;
  images?: string[];
  name: string;
  category: ProductCategory;
  collection: string;
  description: string;
  material: string;
  color: string;
  pricePerDay: number;
  dimensions: string;
  totalStock: number;
  imageUrl: string;
  model3dUrl?: string;
  badge?: string;
  recommendedWith?: string[];
  hexColor: string;
}

export interface TableComposition {
  sousplat?: Product;
  pratoPrincipal?: Product;
  pratoSobremesa?: Product;
  guardanapo?: Product;
  talherGarfo?: Product;
  talherFaca?: Product;
  talherColher?: Product;
  taca?: Product;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface ConfirmedReservation {
  id: string;
  clientName: string;
  clientPhone: string;
  startDate: string;
  endDate: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  status: 'confirmed';
}

export interface AvailabilityCheckResult {
  productId: string;
  totalStock: number;
  bookedQuantity: number;
  availableQuantity: number;
  isAvailable: boolean;
}

export interface QuoteRequestData {
  clientName: string;
  clientPhone: string;
  eventDateStart: string;
  eventDateEnd: string;
  guestCount: number;
  eventLocation: string;
  notes?: string;
  composition: TableComposition;
  additionalItems?: {
    product: Product;
    quantity: number;
  }[];
}

export interface CuratedItem {
  product: Product;
  quantity: number;
}
