import supabase from "../config/supabase.js";

// get
async function getAllReviews() {
  const { data, error } = await supabase.from("reviews").select("*");

  if (error) throw new Error(error.message);
  return data;
}

// post
async function createReview(review, userName) {
  const { data, error } = await supabase
    .from("reviews")
    .insert(review, userName)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// delete
async function deleteReview(id) {
  const { data, error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export default { getAllReviews, createReview, deleteReview };
