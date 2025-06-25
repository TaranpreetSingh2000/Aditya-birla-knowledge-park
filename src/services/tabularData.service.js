export async function getTabularData() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/basic-tables?populate=*');
  const jsonData = await response.json();
  return jsonData.data
}

export async function tabularData(name, mail) {

  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/basic-tables', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        userName: name,
        mailId: mail,
      },
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const jsonData = await response.json()
  return jsonData.data
}

export async function uploadUserImage(file) {
  const formData = new FormData();
  formData.append('files', file);
  // formData.append('refId', userId);
  // formData.append('ref', 'api::basic-table.basic-table');
  // formData.append('field', 'userImage');

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  console.log(result)
  return result[0].id;
}


export async function strapiDataWithImage(entryId, imageId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/basic-tables/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        userImage: imageId,
      },
    }),
  });

  const updatedData = await res.json();
  return updatedData.data;
}


// export async function updateEntryWithImage(entryId, imageId) {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/basic-tables/${entryId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       data: {
//         userImage: imageId,
//       },
//     }),
//   });

//   const data = await res.json();
//   return data.data;
// }


// export async function tabularData(name, mail) {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/basic-tables`, {
//     method: 'POST',
//     body: JSON.stringify({
//       data: {
//         userName: name,
//         mailId: mail,
//       },
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const jsonData = await response.json();
//   return jsonData.data;
// }

// export async function tableApiData() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/basic-tables?populate=userImage`);
//   const jsonData = await response.json();
//   return jsonData.data;
// }

// export async function uploadImageToStrapi(file) {
//   const formData = new FormData();
//   formData.append('files', file);

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`, {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await res.json();
//   return data[0]; // Uploaded file object
// }


