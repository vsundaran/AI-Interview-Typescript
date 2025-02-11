import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";

interface Job {
  id: number;
  title: string;
  candidates: number;
}

const JobsDataGrid: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", candidates: 10 },
    { id: 2, title: "Backend Developer", candidates: 8 },
    { id: 3, title: "Full Stack Developer", candidates: 15 },
  ]);

  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Job Title", width: 200 },
    { field: "candidates", headerName: "Candidates Count", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Job>) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteJob(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={jobs} columns={columns} pageSize={5} />
    </div>
  );
};

export default JobsDataGrid;
