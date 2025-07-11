export interface CarType {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  transmission: string;
  fuelType: string;
  bodyType: string;
  features: string;
  desciption: string;
  images: Image[];
  featured: boolean;
}

interface Image {
  url: string;
  publicId: string;
  _id: string;
}
