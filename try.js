const response = await fetch("https://api.igdb.com/v4/covers", {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Client-ID': 'il5h3kh8by3050l7utex2m7o538yo9', // Replace with your actual Client ID
    'Authorization': 'Bearer 7e69wv0b5rw2l7md5nsbp41zu5lud7', // Replace with your actual access token
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fields: "alpha_channel,animated,checksum,game,game_localization,height,image_id,url,width",
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
