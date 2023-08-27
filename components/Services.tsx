import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { FeatureBoxData } from '@/types/typescript.types';

const featureBoxData: FeatureBoxData[] = [
  {
    icon: <ShoppingBagOutlinedIcon className="w-6 h-6" />,
    title: 'Order and Pick',
    description: 'Order your items online and pick them up conveniently.',
  },
  {
    icon: <LocalOfferOutlinedIcon className="w-6 h-6" />,
    title: 'Exciting Offers',
    description: 'Discover a wide range of exciting offers on our products.',
  },
  {
    icon: <WhatshotOutlinedIcon className="w-6 h-6" />,
    title: 'Trending Stuff Available',
    description: 'Explore the latest and trending items available in our store.',
  },
];

const Services = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14">
      <div className="flex flex-wrap justify-center -m-4">
        {featureBoxData.map((data, index) => (
          <div key={index} className="w-full xl:w-1/3 md:w-1/2 p-4">
            <div className="border border-gray-200 p-8 rounded-lg text-center">
              <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-[#bf86da] text-white mb-4 text-center">
                {data.icon}
              </div>
              <h2 className="text-lg text-gray-900 font-medium title-font mb-2 text-center">
                {data.title}
              </h2>
              <p className="text-gray-600">{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
