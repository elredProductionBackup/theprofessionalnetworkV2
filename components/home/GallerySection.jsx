import HorizontalGallery from "@/components/gallery/HorizontalGallery";
import { GALLERY, GALLERY_CATEGORIES } from "@/data/gallery";

export default function GallerySection() {
  return <HorizontalGallery images={GALLERY} categories={GALLERY_CATEGORIES} />;
}
