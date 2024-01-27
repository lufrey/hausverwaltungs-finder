import { z, type ZodOptional, type ZodObject } from "zod";
import { berlinDistricts } from "~/data/districts";
import { tags } from "~/data/tags";

export const useUrlState = <
  TSchema extends ZodObject<Record<string, ZodOptional<any>>>,
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
    func({
      query: {
        ...currentRoute.value.query,
        ...res.data,
      },
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
  page: z.coerce.number().array().length(1).optional(),
  pageSize: z.coerce.number().array().length(1).optional(),
});

export const usePaginationUrlState = () => {
  return useUrlState(paginationSchema);
};

export const flatFilterUrlSchema = z
  .object({
    tags: z.array(z.string()).optional(),
    propertyManagements: z.array(z.string()).optional(),
    districts: z.array(z.string()).optional(),
    priceMin: z.array(z.coerce.number()).optional(),
    priceMax: z.array(z.coerce.number()).optional(),
    roomsMin: z.array(z.coerce.number()).optional(),
    roomsMax: z.array(z.coerce.number()).optional(),
    areaMin: z.array(z.coerce.number()).optional(),
    areaMax: z.array(z.coerce.number()).optional(),
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
