import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';

const Services = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14">
      <div className="flex flex-wrap justify-center -m-4">
        <div className="w-full xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 text-center ">
              <ShoppingBagOutlinedIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center  ">
              Order and Pick
            </h2>
          </div>
        </div>
        <div className="w-full xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 text-center ">
              <LocalOfferOutlinedIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center  ">
              Exiciting Offers            </h2>
          </div>
        </div>
        <div className="w-full xl:w-1/3 md:w-1/2 p-4">
          <div className="border border-gray-200 p-6 rounded-lg text-center">
            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4 ">
              <WhatshotOutlinedIcon className="w-6 h-6" />
            </div>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
              Trending Stuff Available
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;