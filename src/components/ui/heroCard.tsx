import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface cardItemsProps {
  isLoggedIn: boolean;
  imageSrc: string;
  title: string;
  paragraph: string;
  href: string;
  button: string;
}
const HeroCard: React.FC<cardItemsProps> = ({
  imageSrc,
  title,
  paragraph,
  href,
  button,
}) => {
  return (
    <Link
      href={href}
      id="product_card"
      className="relative overflow-hidden lg:h-[300px] rounded-2xl  lg:w-[300px]  group bg-black/20 "
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
  );
};
export default HeroCard;
