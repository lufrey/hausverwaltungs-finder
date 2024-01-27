import { z, type ZodOptional, type ZodObject, type ZodNullable } from "zod";
import { berlinDistricts } from "~/data/districts";
import { tags } from "~/data/tags";

export const useUrlState = <
  TSchema extends ZodObject<Record<string, ZodNullable<ZodOptional<any>>>>,
>(
  schema: TSchema,
) => {
  const { currentRoute, push, replace } = useRouter();

  const updateQueryState = (
    state: Partial<TSchema["_input"]>,
    useReplace = false,
  ) => {
    const res = schema.safeParse(state);
    if (!res.success) {
      console.error(res.error);
      return;
    }
    const func = useReplace ? replace : push;
    const newQuery = Object.entries(res.data).reduce(
      (acc, [key, value]) => {
        if (value === null || value === undefined) {
          acc[key] = undefined;
        } else {
          acc[key] = value;
        }
        return acc;
      },
      { ...currentRoute.value.query } as Record<string, unknown>,
    );

    func({
      query: newQuery,
    });
  };

  // reset all query params, that are in the schema
  const resetQueryState = () => {
    const keys = Object.keys(schema.shape);
    const query = omit(currentRoute.value.query, keys);
    push({
      query,
    });
  };

  const urlState = computed((): TSchema["_output"] => {
    const query = Object.entries(currentRoute.value.query).reduce(
      (acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value : [value];
        return acc;
      },
      {} as Record<string, unknown[]>,
    );

    const res = schema.safeParse(query);
    if (res.success) {
      return res.data;
    }
    return {};
  });

  return {
    updateQueryState,
    resetQueryState,
    urlState,
  };
};

const paginationSchema = z.object({
  page: z.coerce.number().array().length(1).optional().nullable(),
  pageSize: z.coerce.number().array().length(1).optional().nullable(),
});

export const usePaginationUrlState = () => {
  return useUrlState(paginationSchema);
};

export const flatFilterUrlSchema = z
  .object({
    tags: z.array(z.string()).optional().nullable(),
    propertyManagements: z.array(z.string()).optional().nullable(),
    districts: z.array(z.string()).optional().nullable(),
    priceMin: z.array(z.coerce.number()).optional().nullable(),
    priceMax: z.array(z.coerce.number()).optional().nullable(),
    roomsMin: z.array(z.coerce.number()).optional().nullable(),
    roomsMax: z.array(z.coerce.number()).optional().nullable(),
    areaMin: z.array(z.coerce.number()).optional().nullable(),
    areaMax: z.array(z.coerce.number()).optional().nullable(),
  })
  .merge(paginationSchema);

export const useFlatFilterUrlState = () => {
  const url = useUrlState(flatFilterUrlSchema);

  // TODO: check if computed is necessary
  const validTags = computed(() => {
    return url.urlState.value.tags?.filter((tag) =>
      typedObjectKeys(tags).includes(tag),
    );
  });
  const validDistricts = computed(() => {
    return url.urlState.value.districts?.filter(
      (district) => district in berlinDistricts,
    );
  });

  url.updateQueryState(
    {
      ...url.urlState.value,
      tags: validTags.value,
      districts: validDistricts.value,
    },
    true,
  );

  return url;
};
