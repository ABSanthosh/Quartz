import { createTypedHooks } from "easy-peasy";
import { storeModels } from "@/store/models/model";

const typedHooks = createTypedHooks<typeof storeModels>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
