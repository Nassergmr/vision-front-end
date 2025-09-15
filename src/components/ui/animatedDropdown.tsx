import Link from "next/link";
import { FiUser, FiImage, FiBookmark } from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

interface Props {
  openDropdown: boolean;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
}

const StaggeredDropDown = ({ openDropdown, setOpenDropdown }: Props) => {
  const handleLogOut = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <motion.div
        animate={openDropdown ? "open" : "closed"}
        className="relative"
      >
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-1 p-2 rounded-lg bg-white shadow-sm absolute top-3 left-[50%] w-48 overflow-hidden z-50"
        >
          <Option
            setOpen={setOpenDropdown}
            Icon={FiUser}
            text="Your Profile"
            link="/my-profile"
          />
          <Option
            setOpen={setOpenDropdown}
            Icon={FiImage}
            text="Your Gallery"
            link="/my-profile/gallery"
          />
          <Option
            setOpen={setOpenDropdown}
            Icon={FiBookmark}
            text="Your Collections"
            link="/my-profile/collections"
          />
          <hr />
          <div onClick={handleLogOut}>
            <Option text="Logout" />
          </div>
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  link,
}: {
  text: string;
  Icon?: IconType;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  link?: string;
}) => {
  return (
    <Link href={link ? link : ""}>
      <motion.li
        variants={itemVariants}
        onClick={() => setOpen && setOpen(false)}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#F7F7F7] transition-colors cursor-pointer"
      >
        {Icon && (
          <motion.span variants={actionIconVariants}>
            <Icon size={20} className="text-gray-500" />
          </motion.span>
        )}
        <span className="text-base text-gray-500">{text}</span>
      </motion.li>
    </Link>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
