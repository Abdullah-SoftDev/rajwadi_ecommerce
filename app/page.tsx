import Footer from "@/components/Footer"
import HomeProducts from "@/components/HomeProducts"
import Services from "@/components/Services"
import Slider from "@/components/Slider"

const Home = () => {
  return (
    <>
      <Slider />
      <HomeProducts />
      <Services/>
      <Footer/>
    </>
  )
}
export default Home