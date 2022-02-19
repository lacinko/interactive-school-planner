import React from "react";
import { Layout } from "../components/Layout";

export const Homework = () => {
  function handleChange() {}
  return (
    <Layout className="addSubject">
      <div className="flex items-center justify-center bg-amber-100 h-screen w-full">
        <div className="bg-white">
          <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">
            Add an Homework
          </h2>
          <div className="flex flex-col px-6 py-2">
            <input
              type="text"
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="name"
              placeholder="Subject name"
              onChange={handleChange}
            />
            <input
              type="text"
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="day"
              placeholder="Day of the week"
              onChange={handleChange}
            />
            <input
              type="text"
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="hour"
              placeholder="Starting hour - HH:MM"
              onChange={handleChange}
            />
            <div className="addSubject__radio-btns py-2">
              <textarea
                name=""
                placeholder="Description of homework"
                id=""
                className="w-full"
                rows="10"
              ></textarea>
            </div>
            <button
              className="rounded-full bg-amber-300 px-6 py-2 my-2 mx-6"
              style={{ fontSize: ".8rem" }}
            >
              ADD HOMEWORK
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
