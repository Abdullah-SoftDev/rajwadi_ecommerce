import HomeProducts from "@/components/HomeProducts"
import Services from "@/components/Services"
import Slider from "@/components/Slider"
import { getBannerImages } from "@/repositories/productRepository/serversideFunctions";

const Home = async () => {
  const bannerImageList = await getBannerImages();
  return (
    <>
      <Slider bannerImageList={bannerImageList}/>
      <HomeProducts />
      <Services/>
    </>
  )
}

export default Home