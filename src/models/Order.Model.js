import supabase from "../config/supabase.js";

// get
async function getAllOrder() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export default { getAllOrder };
