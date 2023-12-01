"use client";

import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Link from "next/link";
import Navbar from "../components/Navbar";
import RemoveBtn from "../components/RemoveBtn";

const getTopics = async () => {
    try {
        const res = await fetch("/api/topics", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Mavzular yuklanmadi");
        }

        return res.json();
    } catch (error) {
        console.log("Mavzular yuklanishda xatolik: ", error);
        return { mavzula: [] };
    }
};

const Filter = () => {
    const [topics, setTopiclar] = useState([]);
    const [filteredMavzula, setFilteredMavzula] = useState([]);
    const [filterValue, setFilterValue] = useState({
        newIsm: "",
        newSinfi: "",
        school: "",
    });
    const [hide, setHide] = useState(false);

    const handleHide = () => {
        setHide(!hide);
    };

    useEffect(() => {
        const fetchData = async () => {
            const a = await getTopics();
            const topics = a?.topics;

            setTopiclar(topics);
            setFilteredMavzula(topics);
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
        const filteredArray = topiclar.filter(
            (t) =>
                t.newIsm.toLowerCase().includes(filterValue.newIsm.toLowerCase()) &&
                t.newSinfi.toLowerCase().includes(filterValue.newSinfi.toLowerCase()) &&
                t.school.toLowerCase().includes(filterValue.school.toLowerCase()) &&
                t.MFY === "2-sektor"
        );
        setFilteredMavzula(filteredArray);
    };

    const getRowBackgroundColor = (index) => {
        if (index % 2 === 0) {
            return "blur2";
        } else if (index % 2 === 1) {
            return "blur2";
        }
    };

    const changeStatus = async (id) => {
        const confirmed = confirm("Bu o`quvchini dars qoldirish sababi o`rganildimi?");

        if (confirmed) {
            const res = await fetch(`/api/topics?id=${id}`, {
                method: "PUT",
            });

            if (res.ok) {
            }
        }
    };

    return (
        <div className="min-h-screen w-full">
            <div className="">
                <div className="mb-4">
                    <div>
                        <table className="main_table w-full shadow-xl">
                            <thead className="green text-white font-bold poppins-2">
                                <tr>
                                    <th className="admin_panel_th text-2xl font-light uppercase admin_panel-tih py-5 px-2 poppins-2">
                                        №
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase">
                                        Ism Familiya
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase">
                                        Qaysi sanaga
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase">
                                        Qancha vaqtga
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase">
                                        Soat nechada boshlanadi
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase">
                                        Buyurtma berilgan vaqti
                                    </th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase"></th>
                                    <th className="admin_panel_th text-2xl font-light py-4 px-2 poppins-2 uppercase"></th>
                                </tr>
                            </thead>
                            {topics.map((t, index) => (
                                <tbody key={t.id} className="text-center w-full text-white text-xl">
                                    <tr className={`${getRowBackgroundColor(index)} w-full`}>
                                        <td className="px-2 py-4 admin_panel_td admin_panel-tih admin_panel_index ">{index + 1}</td>
                                        <td className="px-2 py-4 admin_panel_td">{t.title}</td>
                                        <td className="admin_panel_td">{t.description}</td>
                                        <td className="px-2 py-4 admin_panel_td">{t.time}</td>
                                        <td className="px-2 py-4 admin_panel_td">{t.date}</td>
                                        <td>{new Date(t.createdAt).toLocaleString()}</td>
                                        <td><RemoveBtn id={t._id} /></td>
                                        <td>
                                            <button onClick={() => changeStatus(t._id)} className={`py-2 ml-2 ${t.isChecked
                                                ? "text-white green rounded-md cursor-pointer"
                                                : "text-white bg-red-700 rounded-md cursor-pointer"
                                                }`}>
                                                {t.isChecked ? "To`lov qilindi" : "To`lov qilinmadi"}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;





