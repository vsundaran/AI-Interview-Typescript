import { Box, IconButton, Typography } from "@mui/material";
import JobsDataGrid from "../../components/elementes/data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Job = {
  id: number;
  title: string;
  scores: number;
};

export default function CandidatesInterviews() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", scores: 10 },
    { id: 2, title: "Backend Developer", scores: 8 },
    { id: 3, title: "Full Stack Developer", scores: 15 },
  ]);

  const handleDeleteJob = (id: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Job Title", flex: 1 },
    { field: "scores", headerName: "Scores", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<Job>) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteJob(params.row.id)}
        >
          <Trash2 size={18} />
        </IconButton>
      ),
    },
  ];
  return (
    <Box width={"100%"}>
      <Typography variant="h6" color="primary">
        Your AI Interview Summary
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        Review your interview performance and manage your interviews.
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        Want to improve your score? Try again!
      </Typography>
      <Box marginTop={2}>
        <JobsDataGrid title="Job Data" rows={jobs} columns={columns} />
      </Box>
    </Box>
  );
}
