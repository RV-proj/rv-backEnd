import supabase from "../config/supabase.js";

// get
async function getAllUser() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) throw new Error(error.message);
  return data;
}

// post
async function postUser({ userName, email }) {
  // Check if user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    throw new Error(checkError.message);
  }

  if (existingUser) {
    return existingUser;
  }

  // Else Create user
  const { data: createdUser, error: insertError } = await supabase
    .from("users")
    .insert({ userName, email })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);

  return createdUser;
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

export default { getAllUser, postUser, deleteUser, getSingleUser };
