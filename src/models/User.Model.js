import supabase from "../config/supabase.js";

// get
async function getAllUser() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export default { getAllUser };
