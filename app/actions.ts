'use server'

export async function checkServiceability(pincode: string) {
    try {
        const response = await fetch('http://localhost:3000/api/pincodes');
        const pinjson = await response.json();
        return pinjson.includes(pincode);
    } catch (error) {
        console.error(error);
        return false;
    }
}

// export const handleSubmitImage = async (data: Product) => {
//     const storageRef = ref(storage, `images/${Timestamp.now().seconds}/`);
//     const downloadURLs: string[] = [];
//     for (const item of data?.productImages) {
//         if (!(typeof item === 'string')) {
//             const file = item as File;
//             const filePath = `${storageRef.fullPath}/${file.name}`;

//             await uploadBytes(ref(storage, filePath), item);

//             const fileRef = ref(storage, filePath);
//             const downloadURL = await getDownloadURL(fileRef);

//             downloadURLs.push(downloadURL);
//         }
//     }
//     console.log(downloadURLs)
//     return downloadURLs;
// };
