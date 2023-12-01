"use client";

import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import RemoveBtn from "./RemoveBtn";

const Filter = () => {
    const [topics, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({
        date: "",
    });
    const [hide, setHide] = useState(false);

    const handleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/topics", {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Mavzular yuklanmadi");
                }

                const data = await res.json();
                const topics = data?.topics;

                setTopiclar(topics);
                setFilteredMavzula(topics);
            } catch (error) {
                console.log("Mavzular yuklanishda xatolik: ", error);
            }
        };

        fetchData();
    }, []);

    const [usersAddedByDate, setUsersAddedByDate] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const usersGroupedByDate = filteredMavzula.reduce((acc, t) => {
                const dateKey = new Date(t.createdAt).toLocaleDateString();
                acc[dateKey] = acc[dateKey] || [];
                acc[dateKey].push(t);
                return acc;
            }, {});

            setUsersAddedByDate(usersGroupedByDate);
        };

        fetchData();
    }, [filteredMavzula]);

    const handleFilter = () => {
        const filteredArray = topics.filter(
            (t) =>
                t.date.toLowerCase().includes(filterValue.date.toLowerCase())
        );

        setFilteredMavzula(filteredArray);
    };



    const [filterStatus, setFilterStatus] = useState(null);

    const changeStatus = async (id) => {
        const confirmed = confirm("Stadion hozir bo`sh holatdami");

        if (confirmed) {
            const res = await fetch(`/api/topics?id=${id}`, {
                method: "PUT",
            });

            if (res.ok) {
            }
        }
    };

    return (
        <div className=" min-h-screen">
            <div className="container">
                <div className="">
                    <div className="">
                        <div data-aos-duration="2000" data-aos="fade-right" className="flex items-center gap-1 mb-3">
                            <input className="border py-2 px-2 w-full rounded-md" placeholder="Band qilingan sanani yozing (kun,oy,yil)" type="text" value={filterValue.date} onChange={(e) => setFilterValue({ ...filterValue, date: e.target.value })} />
                            <button className="green" onClick={handleFilter} >
                                Izlash
                            </button>
                        </div>
                    </div>
                </div>
                {Object.keys(usersAddedByDate)
                    .reverse()
                    .map((date) => (
                        <>
                            <div className="flex gap-2 items-center mt-10 justify-between mb-5">
                                <h3 className="text-2xl text-white font-bold poppins">
                                    {date} sanasidagi band qilgan mijozlar:
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2 md:gap-3 lg:gap-4" key={date}>
                                {usersAddedByDate[date]
                                    .filter((t) =>
                                        filterStatus === null ? true : t.isChecked === filterStatus
                                    )
                                    .map((t, index) => (
                                        <div>
                                            <div className="blur2 border py-3 px-4 rounded-md text-white" key={t.id}>
                                                <h1 className="text-4xl">Ismi: {t.title}</h1>
                                                <p className="text-xl">Qaysi sanaga: {t.description}</p>
                                                <p>Qancha vaqtga: {t.time}</p>
                                                <p>Qaysi vaqtga: {t.date}</p>
                                                <button className={`py-2 px-2 mt-3 ${t.isChecked
                                                    ? "text-white green rounded-md cursor-pointer"
                                                    : "text-white bg-red-700 rounded-md cursor-pointer"
                                                    }`}>
                                                    {t.isChecked ? "To`lov qilingan" : "To`lov qilinmagan"}
                                                </button>
                                                {/* <RemoveBtn id={t._id} /> */}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ))}
            </div>
        </div>
    );
};

export default Filter;
