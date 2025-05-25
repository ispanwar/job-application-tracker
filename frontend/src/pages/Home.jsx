import React from "react";
import Jobform from "../components/Jobform";
import Jobcard from "../components/Jobcard";
import { Kanban } from "../components/Kanban";
import KanbanPage from "./KanbanPage";
export default function Home() {
  return (
    <>
      <div className="p-4">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Job Applications
        </h3>
        <Jobform />
      </div>
    </>
  );
}
