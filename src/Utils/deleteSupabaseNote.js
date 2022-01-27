import supabase from "../supabase/supabase-config";

export default async function deleteSupabaseNote(id) {
  await supabase
    .from("notes")
    .delete({ id })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
