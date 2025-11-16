import supabase from "../config/supabase.js";

// get
async function getAllUser() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
}

// post
async function postUser(userName, email) {
  const { data, error } = await supabase
    .from("users")
    .insert(userName, email)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// delete
async function deleteUser(id) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// get single user
async function getSingleUser(id) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// if user already exist
export async function findByEmailOrUserName(email, userName) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`email.eq.${email},userName.eq.${userName}`)
    .limit(1);

  if (error) throw new Error(error.message);

  return data.length > 0 ? data[0] : null;
}

export default {
  getAllUser,
  postUser,
  deleteUser,
  getSingleUser,
  findByEmailOrUserName,
};
