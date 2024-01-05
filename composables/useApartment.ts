import type { Tags } from "~/data/tags";

export const useApartment = ({
  tags,
  firstSeen,
  imageSrc,
}: {
  tags: Tags;
  firstSeen: Date;
  imageSrc: string | null;
}) => {
  const origin = useRequestURL().origin;

  const renderedTags = computed(() => {
    tags = [...tags];
    if (countsAsNew(firstSeen)) {
      tags.push("new");
    }
    return tags;
  });

  const img = computed(() => {
    return imageSrc ? origin + imageSrc : "/apartment_example_image.png";
  });
  return { renderedTags, img };
};
