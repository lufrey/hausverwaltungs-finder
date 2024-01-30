export function getFlatImageUrl(flat: { id: string; hasImage: boolean }) {
  const origin = useRequestURL().origin;

  return flat.hasImage
    ? `${origin}/api/image/${flat.id}`
    : `${origin}/apartment_example_image.png`;
}
