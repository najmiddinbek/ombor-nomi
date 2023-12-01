"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import 'aos/dist/aos.css';
import AOS from 'aos';
import { toast } from "react-toastify";
import Image from "next/image";
import CreditCard from "../../public/CreditCard image.jpg"

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState("9860123456781234");

  const [timeValue, setTimeValue] = useState(0);
  const [nightTimeValue, setnightTimeValue] = useState(0);


  useEffect(() => {
    AOS.init()
  },
    [])

  useEffect(() => {
    if (time === '1-soat') {
      setTimeValue(60000);
    } else if (time === '2-soat') {
      setTimeValue(120000);
    }
    else if (time === '3-soat') {
      setTimeValue(180000);
    } else if (time === '4-soat') {
      setTimeValue(240000);
    } else { setTimeValue(0); }
  }, [time]);


  const handleCopyClick = async (e) => {
    e.preventDefault(); // Prevent the default button click behavior

    const copiedText = `${generatedNumber}`;
    try {
      await navigator.clipboard.writeText(copiedText);
      toast.success('Karta raqami qurilma xotirasiga saqlandi', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error('Failed to copy text: ', error);
      toast.error('Copy failed. Please try again.');
    }
  };


  useEffect(() => {
    AOS.init()
  }, [])

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !time || !date) {
      toast.error('Barcha maydonlarni to`ldiring!!!', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const existingTopic = await checkExistingTopic({ title, description, time, date, });

    if (existingTopic) {
      alert("A topic with the same values already exists.");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, time, date, }),
      });

      if (res.ok) {
        toast.success('So`rovingiz yuborildi,band qilinganligini ushbu qismda ko`rishingiz mumkin', {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        router.push("/band")

      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkExistingTopic = async ({ description, time, date }) => {
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();

      const existingTopic = data.topics.find(
        (topic) =>
          topic.description === description &&
          topic.time === time &&
          topic.date === date
      );

      return existingTopic;
    } catch (error) {
      toast.error('Sizda internet bilan bog`liq muammo bor!', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error checking existing topic:", error);
      return null;
    }
  };

  const [price, setPrice] = useState("Bir soatga 150.000 so`m");

  useEffect(() => {
    if (timeValue > 0) {
      setPrice(`Bir soatga ${timeValue} som`);
    } else {
      setPrice("Tanlang");
    }
  }, [timeValue]);


  const [price1, setPrice1] = useState(" Bir soatga 150.000 so`m")

  return (
    <div className="min-h-[140vh] md:min-h-[70vh] lg:min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label data-aos-duration="1000" data-aos="fade-up" className="text-white text-[18px] md:text-2xl">Ism familiyangiz</label>
        <input data-aos-duration="1000" data-aos="fade-up" onChange={(e) => setTitle(e.target.value)} value={title} className="bg-[#1111] text-white border-2 border-white px-8 py-2" type="text" placeholder="Ism kiritish uchun joy..." />


        <label data-aos-duration="1000" data-aos="fade-up" className="text-white text-[18px] md:text-2xl mt-3">Qaysi sanaga band qilmoqchisiz?</label>

        <input data-aos-duration="1000" data-aos="fade-up" onChange={(e) => setDescription(e.target.value)} value={description} className="bg-[#1111] text-white border-2 border-white px-8 py-2" type="date" placeholder="Topic Description" />

        <label data-aos-duration="1000" data-aos="fade-up" className="text-white text-[18px] md:text-2xl mt-3">Qaysi vaqtga band qilmoqchisiz?</label>
        {/* 
        <input data-aos-duration="1000" data-aos="fade-up" onChange={(e) => setDate(e.target.value)} value={date} className="bg-[#1111] text-white border-2 border-white px-8 py-2" type="time" placeholder="Topic Description" /> */}

        <select data-aos-duration="1000" data-aos="fade-up" className="text-white bg-[#1111] border-2 border-white px-8 py-2" onChange={(e) => setDate(e.target.value)} value={date}>
          <option>Tanlang</option>
          <option>8:00</option>
          <option>9:00</option>
          <option>10:00</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>13:00</option>
          <option>14:00</option>
          <option>15:00</option>
          <option>16:00</option>
          <option>17:00</option>
          <option>18:00 {price1}</option>
          <option>19:00 {price1} </option>
          <option>20:00 {price1} </option>
          <option>21:00 {price1} </option>
          <option>22:00 {price1}</option>
          <option>23:00 {price1}</option>
          <option>24:00 {price1}</option>
        </select>

        <label data-aos-duration="1000" data-aos="fade-up" className="text-white text-[18px] md:text-2xl mt-3">Qancha vaqtga band qilmoqchisiz?</label>

        <select data-aos-duration="1000" data-aos="fade-up" className="border-2 border-slate-500 px-8 py-2 bg-[#1111] text-white rounded-md" onChange={(e) => setTime(e.target.value)} value={time}>
          <option>Tanlang</option>
          <option>1-soat</option>
          <option>2-soat</option>
        </select>

        {/* <input onChange={(e) => setTime(e.target.value)} value={time} className="border-2 border-white px-8 py-2" type="text" placeholder="Topic Description" /> */}
        <div data-aos-duration="1000" data-aos="zoom-in-out" className="block md:flex w-full flex-wrap gap-4">
          <div className="md:w-[48%] w-full">
            <Image src={CreditCard} alt="Credit Card" />
          </div>
          <div className="w-[48%] text-white">
            {date.includes(price1) ? (
              <>
                <h1 className="text-2xl md:text-3xl lg:text-4xl">{price1}</h1>
              </>
            ) : (
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl">Bir soatga  {timeValue}so`m</h1>
            )}
            <h1 className="text-4xl mt-2 mb-3 lg:text-6xl font-bold ">{generatedNumber}</h1>
            <button className="green button" onClick={handleCopyClick}>
              Nusxa olish
            </button>
          </div>
        </div>

        <div data-aos-duration="1000" data-aos="fade-up" className="flex justify-end">
          <button
            type="submit"
            className="green"
          >
            Buyurtma berish
          </button>
        </div>
      </form>

    </div>
  );
}


