export const fetchAllCategories = async () => {
    debugger
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?pagination[limit]=100`);
  const json = await res.json();
  const categoryMap = {};

  json.data.forEach((cat) => {
    categoryMap[cat.name] = cat.documentId;
  });

  return categoryMap;
};
