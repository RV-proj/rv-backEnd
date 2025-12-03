import supabase from "../config/supabase.js";

// get
async function getAllOrder() {
  const { data, error } = await supabase.from("orders").select("*");

  if (error) throw new Error(error.message);
  return data;
}

// post
async function createOrder(orderData) {
  const { data, error } = await supabase
    .from("orders")
    .insert(orderData)
    .select();

  const createdOrder = orderData;

  await sendEmail("orderCreate", {
    to: createdOrder.email,
    subject: `Order #${createdOrder.id}`,
    data: createdOrder,
  });

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

// update status
async function updateStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export default {
  getAllOrder,
  createOrder,
  deleteOrder,
  updatedOrder,
  filterOrder,
  updateStatus,
};
