type UrlAmbiguity<T> = {
  [K in keyof T]: T[K] extends string | string[] ? string | string[] : never;
};

export const useUrlState = <
  QueryState extends Record<string, string | string[]>,
>() => {
  const { currentRoute, push } = useRouter();

  const updateQueryState = (state: Partial<QueryState>) => {
    push({
      query: {
        ...currentRoute.value.query,
        ...state,
      },
    });
  };

  const resetQueryState = () => {
    push({
      query: {},
    });
  };

  const urlState = computed(
    () => currentRoute.value.query as UrlAmbiguity<QueryState>,
  );

  const urlStateWithArrayValues = computed(() => {
    return Object.fromEntries(
      Object.entries(currentRoute.value.query).map(([key, value]) => {
        return [key, Array.isArray(value) ? value : [value]];
      }),
    ) as { [K in keyof Partial<QueryState>]: string[] };
  });

  return {
    updateQueryState,
    resetQueryState,
    urlState,
    urlStateWithArrayValues,
  };
};
