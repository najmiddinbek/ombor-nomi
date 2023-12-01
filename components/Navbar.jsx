'use client'
import Link from "next/link";
import Logo from "../public/Futbolchi rasmi.png";
import Image from "next/image";
import { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Navbar() {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <>
      <div className="blur2">
        <div data-aos-duration="1000" data-aos="zoom-out-up" className="navbar border-b border-[#4f4f4f] justify-between text-center items-center  px-3 md:px-20 lg:px-56 py-3">
          <Link className="flex justify-center" href={"/"}>
            <Image src={Logo} width={130} height={100} />
          </Link>
          <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 text-white justify-between items-center  px-8 py-3">
            <Link className="bg-transparent hover:bg-[#019879] text-white green-border font-semibold hover:text-white py-2 border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/"}>Bosh sahifa</Link>
            <Link className="bg-transparent hover:bg-[#019879] text-white green-border font-semibold hover:text-white py-2 border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/qulayliklar"}>Qulayliklar</Link>
            <Link className="bg-transparent hover:bg-[#019879] text-white green-border font-semibold hover:text-white py-2 border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/band"}>Band stadionlarni ko`rish</Link>
            <Link className="bg-transparent hover:bg-[#019879] text-white green-border font-semibold hover:text-white py-2 border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/addTopic"}>Stadion band qilish</Link>
            <Link className="bg-transparent hover:bg-[#019879] text-white green-border font-semibold hover:text-white py-2 border  hover:border-transparent rounded text-xl md:text-[22px]" href={"/login"}>Admin</Link>
          </nav>
        </div>
      </div>
    </>
  );
}

