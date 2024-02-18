import axios from "axios";

export async function uploadImage(profiledata) {
  const pic = encodeImageFileAsURL(profiledata);
  let imageData = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDNERY_CLOUDNAME
    }/upload`,
    pic
  );
  return imageData.data.url;
}

function encodeImageFileAsURL(element) {
  var data = new FormData();
  data.append("file", element);
  data.append("upload_preset", import.meta.env.VITE_CLOUDNERY_PRESET);
}
