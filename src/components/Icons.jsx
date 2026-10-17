import React from "react";
import { 
  BsStars 
} from "react-icons/bs";
import { 
  FaBirthdayCake, 
  FaWhatsapp, 
  FaStar,
  FaPhoneAlt
} from "react-icons/fa";
import { 
  HiOutlineShoppingBag, 
  HiOutlineMagnifyingGlass, 
  HiOutlineMapPin, 
  HiArrowRight, 
  HiCheck, 
  HiXMark, 
  HiBars3,
  HiMinus,
  HiPlus,
  HiOutlineTrash
} from "react-icons/hi2";

export function SparklesIcon({ className = "w-4 h-4", style }) {
  return <BsStars className={className} style={style} />;
}

export function CakeIcon({ className = "w-5 h-5", style }) {
  return <FaBirthdayCake className={className} style={style} />;
}

export function ShoppingBagIcon({ className = "w-5 h-5", style }) {
  return <HiOutlineShoppingBag className={className} style={style} />;
}

export function SearchIcon({ className = "w-5 h-5", style }) {
  return <HiOutlineMagnifyingGlass className={className} style={style} />;
}

export function PhoneIcon({ className = "w-4 h-4", style }) {
  return <FaPhoneAlt className={className} style={style} />;
}

export function MapPinIcon({ className = "w-4 h-4", style }) {
  return <HiOutlineMapPin className={className} style={style} />;
}

export function StarIcon({ className = "w-3.5 h-3.5", style, fill }) {
  return <FaStar className={className} style={style} fill={fill} />;
}

export function ArrowRightIcon({ className = "w-4 h-4", style }) {
  return <HiArrowRight className={className} style={style} />;
}

export function CheckIcon({ className = "w-4 h-4", style }) {
  return <HiCheck className={className} style={style} />;
}

export function WhatsAppIcon({ className = "w-5 h-5", style }) {
  return <FaWhatsapp className={className} style={style} />;
}

export function CloseIcon({ className = "w-5 h-5", style }) {
  return <HiXMark className={className} style={style} />;
}

export function MenuIcon({ className = "w-6 h-6", style }) {
  return <HiBars3 className={className} style={style} />;
}

export function MinusIcon({ className = "w-4 h-4", style }) {
  return <HiMinus className={className} style={style} />;
}

export function PlusIcon({ className = "w-4 h-4", style }) {
  return <HiPlus className={className} style={style} />;
}

export function TrashIcon({ className = "w-4 h-4", style }) {
  return <HiOutlineTrash className={className} style={style} />;
}
