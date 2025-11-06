import supabase from "../config/supabase.js";

// get
async function getAllReviews() {
  const { data, error } = await supabase.from("reviews").select("*");

  if (error) throw new Error(error.message);
  return data;
}

export default { getAllReviews };
