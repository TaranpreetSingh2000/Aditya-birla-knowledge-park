export async function fetchBlogData() {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/tests?populate[blogSection][populate]=*"
    );
    if (!response) {
      throw new Error("Error fetching the details");
    }
    const blogdata = await response.json();
    return blogdata;
  } catch (error) {
    console.log("Error calling the blog API", error);
  }
}
