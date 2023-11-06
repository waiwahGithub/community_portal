import React, { useState } from "react";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    // Read the selected file and convert it to a Base64 string
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result;
        setBase64Image(base64);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const [image, setImage] = useState<any>(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + apiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {base64Image && (
        <div>
          <img src={base64Image} alt="Preview" width="200" />
          <p>Base64 Image:</p>
          <textarea value={base64Image} readOnly />
        </div>
      )}

      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={uploadImage}>Upload Image</button>
      </div>
    </div>
  );
}

export default ImageUpload;

// import React, { useState } from "react";

// function ImageUpload() {
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//   const [imageBlob, setImageBlob] = useState<any>(null);

//   const handleFileChange = (e: any) => {
//     const file = e.target.files[0];

//     // Read the selected file and create a Blob object
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         const blob = new Blob([e.target.result], { type: file.type });
//         setImageBlob(blob);
//       };
//       reader.readAsArrayBuffer(file);
//       setSelectedFile(file);
//     }
//   };

//   const downloadBlob = () => {
//     if (imageBlob) {
//       const url = window.URL.createObjectURL(imageBlob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = selectedFile.name;
//       a.style.display = "none";
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     }
//   };

//   console.log("imageBlob", imageBlob);

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {imageBlob && (
//         <div>
//           <p>Blob Image:</p>
//           <button onClick={downloadBlob}>Download Blob</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;
