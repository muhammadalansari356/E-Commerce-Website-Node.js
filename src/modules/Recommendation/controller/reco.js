// // const axios = require('axios');
// // const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios')
// const {FormData,Blob} = require('formdata-node')

// export const reco =  async (req, res) => {
//     const formData = new FormData();
//     const blob = new Blob([req.file.buffer] , {type: req.file.mimetype});
//     formData.append('image',blob, req.file.originalname);

//     const response = await axios.post('https://1853-41-237-71-235.ngrok-free.app/predict', formData, {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     })
//     res.status(200).json(response.data)

// // Replace 'test_image.jpg' with the name of your image file
// // const imagePath = path.join(__dirname, 'photo_2024-06-20_02-28-14.jpg'); // هتغير الصورة دي 

// // Replace with your ngrok URL or server URL
// const serverUrl = 'https://1853-41-237-71-235.ngrok-free.app/predict'; 

// // Function to test the Flask API
// async function testImageRecommendation() {
//     try {
//         // Create a form and append the image
//         const form = new FormData();
//         form.append('image', fs.createReadStream(imagePath));

//         // Send a POST request to the Flask API
//         const response = await axios.post(serverUrl, form, {
//             headers: {
//                 ...form.getHeaders()
//             }
//         });

//         // Log the response from the API
//         console.log('Recommended Images:', response.data.similar_images);

//         // Download and save each image       اول ما ترن الكود .. هتلاقي صور راجعة من السيرفير 
//         const downloadAndSaveImages = async () => {
//             const promises = response.data.similar_images.map(async (imageUrl, index) => {
//                 try {
//                     const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//                     const imageFileName = `recommended_image_${index + 1}.jpg`;
//                     const imagePath = path.join(__dirname, imageFileName);
//                     fs.writeFileSync(imagePath, Buffer.from(imageResponse.data));
//                     console.log(`Image ${imageFileName} saved successfully.`);
//                 } catch (error) {
//                     console.error(`Error downloading or saving image ${imageUrl}:`, error);
//                 }
//             });
//             await Promise.all(promises);
//         };

//         // Call the function to download and save images
//         await downloadAndSaveImages();

//     } catch (error) {
//         console.error('Error testing image recommendation API:', error.response ? error.response.data : error.message);
//     }
// }

// // Run the test
// testImageRecommendation();

// } 


export const reco =  async (req, res,next) => {
}