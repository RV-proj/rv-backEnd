import supabase from "../config/supabase.js";

// get
async function getAllTires() {
  const { data, err } = await supabase.from("tiers").select("*");
  if (err) throw new Error(err.message);
  return data;
}

export default { getAllTires };
