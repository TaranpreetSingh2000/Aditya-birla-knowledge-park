'use client';

import { useEffect, useState } from 'react';
import { uploadUserImage, getTabularData, tabularData, strapiDataWithImage } from '@/services/tabularData.service';

const UserTable = () => {
  const [tabApiData, setTabApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inpData, setInpData] = useState({
    userName: '',
    mailId: '',
    profileImage: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTabularData();
        setTabApiData(data);
      } catch (error) {
        console.error('Failed to fetch table data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!inpData.userName || !inpData.mailId) return;

    const newEntry = await tabularData(inpData.userName, inpData.mailId);
    setTabApiData((prev) => [...prev, newEntry]);

    setInpData({ userName: '', mailId: '', profileImage: '' });
  };

  const handleFileUpload = async (e, documentId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      let imageId = await uploadUserImage(file);
      // console.log(imageId, userId)

      await strapiDataWithImage(documentId, imageId);

      const updatedData = await getTabularData();
      setTabApiData(updatedData);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl max-w-md mx-auto"
      >
        <label className="w-full">Name</label>
        <input
          onChange={handleOnChange}
          className="w-full border-2 px-3 py-1 rounded-md"
          type="text"
          name="userName"
          value={inpData.userName}
        />

        <label className="w-full">Email</label>
        <input
          onChange={handleOnChange}
          className="w-full border-2 px-3 py-1 rounded-md"
          type="email"
          name="mailId"
          value={inpData.mailId}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Login
        </button>
      </form>

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              {/* <th className="border px-4 py-2">User Profile Image</th> */}
              <th className="border px-4 py-2">User Image Update</th>
              <th className="border px-4 py-2">DocumentID</th>
            </tr>
          </thead>
          <tbody>
            {tabApiData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.userName}</td>
                <td className="border px-4 py-2">{item.mailId}</td>
                <td className="border px-4 py-2">
                  {item.userImage && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.userImage.url}`}
                      alt="User Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <input
                    onChange={e => handleFileUpload(e, item.documentId)}
                    type="file"
                    className="text-red-600 "
                  />
                </td>
                <td className="border px-4 py-2">{item.documentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// export default UserTable;

export default UserTable;






// import {
//   tabularData,
//   tableApiData,
//   uploadImageToStrapi,
//   updateEntryWithImage,
// } from '@/services/tabularData.service';


// const UserTable = () => {
//   const [tabApiData, setTabApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [inpData, setInpData] = useState({
//     username: '',
//     mailId: '',
//   });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await tableApiData();
//         setTabApiData(data);
//       } catch (error) {
//         console.error('Failed to fetch table data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInpData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     if (!inpData.username || !inpData.mailId) return;

//     const newEntry = await tabularData(inpData.username, inpData.mailId);
//     setTabApiData((prev) => [...prev, newEntry]);
//     setInpData({ username: '', mailId: '' });
//   };

//   const handleFileUpload = async (e, userId) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const uploadedImage = await uploadImageToStrapi(file);
//       const updatedEntry = await updateEntryWithImage(userId, uploadedImage.id);

//       setTabApiData((prev) =>
//         prev.map((item) => (item.id === userId ? updatedEntry : item))
//       );
//     } catch (err) {
//       console.error('File upload failed:', err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <form
//         onSubmit={handleOnSubmit}
//         className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl max-w-md mx-auto"
//       >
//         <label className="w-full">Name</label>
//         <input
//           onChange={handleOnChange}
//           className="w-full border-2 px-3 py-1 rounded-md"
//           type="text"
//           name="username"
//           value={inpData.username}
//         />

//         <label className="w-full">Email</label>
//         <input
//           onChange={handleOnChange}
//           className="w-full border-2 px-3 py-1 rounded-md"
//           type="email"
//           name="mailId"
//           value={inpData.mailId}
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl"
//         >
//           Submit
//         </button>
//       </form>

//       <div className="mt-10 overflow-x-auto">
//         <table className="min-w-full text-sm text-left border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2">Username</th>
//               <th className="border px-4 py-2">Email</th>
//               <th className="border px-4 py-2">Profile Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tabApiData.map((item) => (
//               <tr key={item.id} className="hover:bg-gray-50">
//                 <td className="border px-4 py-2">{item.userName}</td>
//                 <td className="border px-4 py-2">{item.mailId}</td>
//                 <td className="border px-4 py-2">
//                   {item ? (
//                     <img
//                       src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.userImage.url}`}
//                       alt="Profile"
//                       className="w-12 h-12 object-cover rounded-full mb-2"
//                     />
//                   ) : (
//                     <p className="mb-2">No Image</p>
//                   )}
//                   <input
//                     type="file"
//                     onChange={(e) => handleFileUpload(e, item.id)}
//                     className="text-sm"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserTable;


