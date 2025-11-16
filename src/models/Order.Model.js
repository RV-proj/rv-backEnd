import supabase from "../config/supabase.js";

// get
async function getAllOrder() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) throw new Error(error.message);
  return data;
}

// post
async function createOrder(
  email,
  name,
  phone,
  size,
  quality,
  deliveryAddress,
  productName,
  price,
  status
) {
  const { data, error } = await supabase
    .from("orders")
    .insert(
      email,
      name,
      phone,
      size,
      quality,
      deliveryAddress,
      price,
      status,
      productName
    )
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// delete
async function deleteOrder(id) {
  const { data, error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

// update
async function updatedOrder(id, updatedData) {
  const { data, error } = await supabase
    .from("orders")
    .update(updatedData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// get order by email
async function filterOrder(email) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", email);

  if (error) throw new Error(error.message);
  return data;
}

export default {
  getAllOrder,
  createOrder,
  deleteOrder,
  updatedOrder,
  filterOrder,
};
