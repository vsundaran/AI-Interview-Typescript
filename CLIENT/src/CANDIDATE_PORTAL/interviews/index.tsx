import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import JobsDataGrid from "../../components/elementes/data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { Trash2, ExternalLink } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as React from "react";
import { useEffect } from "react";
import { getjobRoles } from "../../services/API/routes/common";
import { CandidateInterview } from "../../services/API/types";
import { useAuth } from "../../context/AuthContext";
import { setCandidateInterviews } from "../../redux/slice/candidate-interviews";

export default function CandidatesInterviews() {
  const candidateInterviews = useSelector(
    (state: RootState) => state.candidateInterviews
  );
  const { user } = useAuth();
  const dispatch = useDispatch();
  // const handleDeleteJob = (id: number) => {
  //   setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  // };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "title", headerName: "Job Title", flex: 1 },
    { field: "scores", headerName: "Scores", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<CandidateInterview>) => (
        <Chip
          key={params.row.id}
          label={params.row.status}
          color={params.row.status === "Pending" ? "info" : "success"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: GridRenderCellParams<CandidateInterview>) => (
        <React.Fragment>
          <Box display={"flex"} gap={1} alignItems={"center"} mt={1}>
            <Tooltip title="Attend Interview">
              <IconButton
                key={params.row.id}
                color="info"
                // onClick={() => handleDeleteJob(params.row.id)}
              >
                <ExternalLink size={18} />
              </IconButton>
            </Tooltip>
            <IconButton
              key={params.row.id}
              color="error"
              // onClick={() => handleDeleteJob(params.row.id)}
            >
              <Trash2 size={18} />
            </IconButton>
          </Box>
        </React.Fragment>
      ),
    },
  ];

  const fetchJobRoles = async () => {
    if (!user) return;
    const response = await getjobRoles(user._id, "candidate");
    if (response.success) {
      dispatch(
        setCandidateInterviews({ candidateInterviews: response.jobRoles })
      );
    }
  };

  useEffect(() => {
    if (!candidateInterviews || !candidateInterviews.length) {
      //we are using get job role API get show the interviews data in UI. Because the interview is happening under the job roles
      fetchJobRoles();
    }
    //eslint-disable-next-line
  }, [user]);

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
        <JobsDataGrid
          title="Job Data"
          rows={candidateInterviews}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
