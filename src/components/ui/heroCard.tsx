import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Slider from "react-slick";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Login from "../authComponents/login";
import Register from "../authComponents/register";
import EnterEmail from "../authComponents/sendEmail";

interface cardItemsProps {
  isLoggedIn: boolean;
  imageSrc: string;
  title: string;
  paragraph: string;
  href: string;
  button: string;
}
const HeroCard: React.FC<cardItemsProps> = ({
  isLoggedIn,
  imageSrc,
  title,
  paragraph,
  href,
  button,
}) => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const sliderRef = useRef<Slider | null>(null);

  return isLoggedIn ? (
    <Link
      href={href}
      id="product_card"
      className="relative overflow-hidden lg:h-[300px] rounded-2xl  lg:w-[300px]  group bg-black/20 "
      //   sm:h-[70vh] h-[60vh] lg:h-[90vh]
    >
      <Image
        src={imageSrc}
        fill
        alt=""
        className="object-cover lg:group-hover:scale-110 transition-transform duration-500 ease-in-out "
      />
      <div id="overlay" className="absolute inset-0  bg-black/20">
        <div
          id="content"
          className="absolute bottom-3 flex text-white flex-col gap-1 left-3"
        >
          <h2 className="md:text-2xl sm:text-4xl text-2xl font-bold">
            {title}
          </h2>
          <p>{paragraph}</p>

          <button className="flex items-center gap-1 cursor-pointer">
            <span className="font-semibold">{button}</span>
            <FiArrowRight color="white" />
          </button>
        </div>
      </div>
    </Link>
  ) : (
    <Dialog>
      <DialogTrigger>
        <div
          id="product_card"
          className="relative overflow-hidden lg:h-[300px] rounded-2xl cursor-pointer lg:w-[300px]  group bg-black/20 "
          //   sm:h-[70vh] h-[60vh] lg:h-[90vh]
        >
          <Image
            src={imageSrc}
            fill
            alt=""
            className="object-cover lg:group-hover:scale-110 transition-transform duration-500 ease-in-out "
          />
          <div id="overlay" className="absolute inset-0  bg-black/20">
            <div
              id="content"
              className="absolute bottom-3 flex text-white flex-col gap-1 left-3"
            >
              <h2 className="md:text-2xl sm:text-4xl text-2xl font-bold text-left">
                {title}
              </h2>
              <p>{paragraph}</p>

              <div className="flex items-center gap-1 cursor-pointer">
                <span className="font-semibold">{button}</span>
                <FiArrowRight color="white" />
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Slider */}
        <div className="slider-container relative">
          <Slider
            ref={sliderRef}
            {...settings}
            className=" w-[500px] lg:w-[480px]"
          >
            <Register sliderRef={sliderRef} />
            <Login sliderRef={sliderRef} />
            <EnterEmail sliderRef={sliderRef} />
          </Slider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default HeroCard;
