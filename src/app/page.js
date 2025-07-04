import AutomateData from "@/components/addAutomateData";
import BlogData from "@/components/addBlogData";
import AddData from "@/components/addData";
import HeroSection from "@/components/HeroSection/HeroSection";
import ImageInfoSection from "@/components/ImageInfoSection/ImageInfoSection";
import PrimaryTeaserSection from "@/components/PrimaryTeaserSection/PrimaryTeaserSection";
import ProductRecomEngine from "@/components/ProductRecomEngine/ProductRecomEngine";
import RecentTabSection from "@/components/RecentTabSection/RecentTabSection";
import { fetchBlogData } from "@/services/blogPage.service";
import {
  fetchRecommendationOptions,
  recommendedProduct,
} from "@/services/recommendedQuestion.service";
import UpdateExistingEntries from "@/UpdateExistingEntries";

export default async function Home() {
  // const recommendationRes = await fetchRecommendationOptions();
  // // console.log(recommendationRes?.data)
  // const productFilter = await recommendedProduct();

  // const blogdata = await fetchBlogData();

  // console.log(blogdata);

  return (
    <div className="flex items-center gap-4">
      {/* <RecentTabSection />
      <ProductRecomEngine
        recommendationRes={recommendationRes}
        productFilter={productFilter}
      /> */}

      {/* <AddData/> */}
     <AutomateData/>
     <UpdateExistingEntries/>
     <BlogData/>
    
      {/* <UserTable /> */}
      {/* <HeroSection /> */}
      {/* <ImageInfoSection /> */}
      {/* <PrimaryTeaserSection /> */}
    </div>
  );
}
