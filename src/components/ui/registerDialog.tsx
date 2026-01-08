import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Register from "@/components/authComponents/register";
import Login from "@/components/authComponents/login";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EnterEmail from "@/components/authComponents/sendEmail";

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default function RegisterDialog() {
  const sliderRef = useRef<Slider | null>(null);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex items-center gap-2 py-2.5 px-5 rounded-lg cursor-pointer bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 w-fit mx-auto transition-all duration-300 sm:text-lg">
          Join
        </span>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {/* Slider */}
        <div
        // className="slider-container relative"
        >
          <Slider
            ref={sliderRef}
            {...settings}
            className="xs6 w-[400px] lg:w-[480px] mx-auto overflow-hidden"
          >
            <Register sliderRef={sliderRef} />
            <Login sliderRef={sliderRef} />
            <EnterEmail sliderRef={sliderRef} />
          </Slider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
