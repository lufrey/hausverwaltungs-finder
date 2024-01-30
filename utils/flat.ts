export function getFlatImageUrl(flat: { id: string; hasImage: boolean }) {
  const origin = useRequestURL().origin;

  return flat.hasImage
    ? `${origin}/flat-images/${flat.id}.png`
    : `${origin}/apartment_example_image.png`;
}
