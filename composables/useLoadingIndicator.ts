import type { WatchStopHandle } from "vue";

const isLoading = ref(false);
export function useLoadingIndicator() {
  const startLoading = () => (isLoading.value = true);
  const stopLoading = () => (isLoading.value = false);

  const watchers = new Map<
    Ref,
    {
      watcher: WatchStopHandle;
      func: (ref: Ref) => boolean;
    }
  >();

  const shouldShow = () => {
    // go through all watchers, run their functions and combine with OR
    return Array.from(watchers.entries()).some(([ref, { func }]) => func(ref));
  };

  const registerLoadingRef = <TRefType>(
    ref: Ref<TRefType>,
    func: (ref: Ref<TRefType>) => boolean,
  ) => {
    watchers.set(ref, {
      watcher: watch(ref, () => {
        shouldShow() ? startLoading() : stopLoading();
      }),
      func,
    });
  };

  const unregisterLoadingRef = (ref: Ref) => {
    console.log("unregister", ref);
    watchers.get(ref)?.watcher();
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    registerLoadingRef,
    unregisterLoadingRef,
  };
}
