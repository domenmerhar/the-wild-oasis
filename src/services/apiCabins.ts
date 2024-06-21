import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be fetched");
  }

  return data;
}

interface Cabin {
  name: string;
  description: string;
  price: number;
  image: {
    name: string;
  };
  id?: string;
}

export async function createEditCabin(newCabin: Cabin, id: string) {
  const hasImagePath = newCabin.image?.name?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${
    newCabin.image.name ? newCabin.image.name : ""
  }`.replace(/\//g, "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create/edit cabin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  //2. Upload image

  if (hasImagePath) return data;

  const file = new File([], newCabin.image.name);
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  //3. Ddelete the cabin if the image upload fails
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    throw new Error("Image could not be uploaded");
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
