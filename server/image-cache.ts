import sharp from "sharp";
import { type QueryObject } from "ufo";
import { z } from "zod";
import { typedObjectKeys } from "~/utils/typeHelper";

const formatSchema = z.enum(["png", "webp", "avif"]);
const sizeSchema = z.object({
  w: z.coerce.number().int().positive(),
  h: z.coerce.number().int().positive(),
});

export type CacheContent = {
  png: Buffer;
  webp: Buffer;
  avif: Buffer;
};

export const simpleImageCache = (
  bufferGetter: () => Promise<Buffer>,
  maxCachedSizes = 4,
) => {
  const cache: {
    version: string;
    sizes: Record<`${number}x${number}`, CacheContent>;
    content: CacheContent | null;
  } = {
    version: "0",
    sizes: {},
    content: null,
  };

  return async (query: QueryObject) => {
    const parsedSize = sizeSchema.safeParse(query);
    const parsedFormat = formatSchema.safeParse(query.f);
    const format = parsedFormat.success ? parsedFormat.data : "png";

    // check version match
    if (typeof query.v === "string" && query.v !== cache?.version) {
      cache.content = null;
      cache.sizes = {};
      cache.version = query.v;
    }

    if (parsedSize.success) {
      const { w, h } = parsedSize.data;
      const sizeKey = `${w}x${h}` as const;
      if (!cache?.sizes[sizeKey]) {
        const file = await bufferGetter();

        // check if the cache is too big
        const keys = typedObjectKeys(cache.sizes);
        if (keys.length >= maxCachedSizes) {
          delete cache.sizes[keys[0]];
        }

        cache.sizes[sizeKey] = {
          png: await sharp(file).resize(w, h).png().toBuffer(),
          webp: await sharp(file).resize(w, h).webp().toBuffer(),
          avif: await sharp(file).resize(w, h).avif().toBuffer(),
        };
      }
      return {
        format,
        size: { w, h },
        content: cache.sizes[sizeKey][format],
      };
    }

    if (!cache.content) {
      const file = await bufferGetter();

      cache.content = {
        png: await sharp(file).png().toBuffer(),
        webp: await sharp(file).webp().toBuffer(),
        avif: await sharp(file).avif().toBuffer(),
      };
    }

    return {
      format,
      content: cache.content,
    };
  };
};
