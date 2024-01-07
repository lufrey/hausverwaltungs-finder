import type { Tags } from "~/data/tags";

export const useApartment = ({
  imageSrc,
}: {
  tags: Tags;
  firstSeen: Date;
  imageSrc: string | null;
}) => {
  const origin = useRequestURL().origin;

  const img = computed(() => {
    return imageSrc ? origin + imageSrc : "/apartment_example_image.png";
  });
  return { img };
};
