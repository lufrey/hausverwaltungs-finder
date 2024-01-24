import { z, type ZodSchema } from "zod";
import { berlinDistricts } from "~/data/districts";
import { tags } from "~/data/tags";

export const useUrlState = <TSchema extends ZodSchema>(schema: TSchema) => {
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
    // @ts-ignore
    const keys = Object.keys(schema.shape);
    const query = omit(currentRoute.value.query, keys);
    push({
      query,
    });
  };

  const urlState = computed((): TSchema["_output"] => {
    // @ts-ignore
    const query = Object.entries(currentRoute.value.query).reduce(
      // @ts-ignore
      (acc, [key, value]) => ({
        ...acc,
        [key]: Array.isArray(value) ? value : [value],
      }),
      {},
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

export const useFlatFilterUrlState = () => {
  const url = useUrlState(
    z
      .object({
        tags: z.array(z.string()).optional(),
        propertyManagements: z.array(z.string()).optional(),
        districts: z.array(z.string()).optional(),
      })
      .merge(paginationSchema),
  );

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

  if (
    validTags.value?.length !== url.urlState.value.tags?.length ||
    validDistricts.value?.length !== url.urlState.value.districts?.length
  ) {
    url.updateQueryState(
      { tags: validTags.value, districts: validDistricts.value },
      true,
    );
  }
  return url;
};
