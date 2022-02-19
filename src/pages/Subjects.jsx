import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { SubjectsList } from "../components/SubjectsList";

export const Subjects = () => {
  const msg = useSelector((state) => state.subjects.message);

  return (
    <Layout>
      <div className="flex justify-center items-center bg-amber-100 w-screen h-screen">
        <div className=" bg-white">
          <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">
            Subjects
          </h2>
          <SubjectsList />
          {msg && <h3>{msg}</h3>}
        </div>
      </div>
    </Layout>
  );
};
