import localForage from "localforage";

function storage(dbName: string) {
  const db = localForage.createInstance({
    name: dbName,
  });
  return {
    db,
    getItem: db.getItem,
    setItem: db.setItem,
    removeItem: db.removeItem,
  };
}

export default storage;
