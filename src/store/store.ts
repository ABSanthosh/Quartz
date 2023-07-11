import storage from "@/utils/storageEngine";
import { createStore, persist } from "easy-peasy";
import { storeModels } from "./models/model";

export const Store = createStore(
  persist(storeModels, {
    deny: [],
    storage: storage("quartz"),
  })
);
