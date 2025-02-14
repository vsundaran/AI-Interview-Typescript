import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import DataGridDownload from "../../components/elementes/data-grid";

// Sample data for candidates and their applied jobs
const candidates = [
  {
    id: 1989898,
    name: "John Doe",
    appliedJobs: [
      { id: 101, title: "Software Engineer", scores: 90 },
      { id: 102, title: "Frontend Developer", scores: 90 },
    ],
  },
  {
    id: 287867,
    name: "Alice Smith",
    appliedJobs: [
      { id: 103, title: "Backend Developer", scores: 90 },
      { id: 104, title: "DevOps Engineer", scores: 90 },
    ],
  },
  {
    id: 3676767,
    name: "Robert Brown",
    appliedJobs: [{ id: 105, title: "Full Stack Developer", scores: 90 }],
  },
  {
    id: 4867676,
    name: "Emily Johnson",
    appliedJobs: [
      { id: 106, title: "Product Manager", scores: 90 },
      { id: 107, title: "UI/UX Designer", scores: 90 },
    ],
  },
];

// Column definitions for the DataGrid
const columns: GridColDef[] = [
  { field: "id", headerName: "Job ID", width: 100 },
  { field: "title", headerName: "Job Title", flex: 1 },
  { field: "scores", headerName: "scores", width: 100 },
];

const CandidatesDashboard: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Box mb={2}>
          <Typography color="primary" variant="h6" sx={{ fontSize: "24px" }}>
            Candidate Applications
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            View all candidates who have applied for jobs posted by you.
          </Typography>
        </Box>
        {candidates.map((candidate) => (
          <Card key={candidate.id} sx={{ marginBottom: 3, p: 2 }}>
            <CardContent>
              <Box display={"flex"} alignItems={"end"} gap={1} mb={1}>
                <Avatar sx={{ width: 30, height: 30 }} src="" />
                <Typography variant="subtitle1" gutterBottom mb={0}>
                  {candidate.name}
                </Typography>
              </Box>
              <Box sx={{ width: "100%" }}>
                <DataGridDownload
                  title="AppliedJobs"
                  rows={candidate.appliedJobs}
                  columns={columns}
                />
                {/* <DataGrid
                  rows={candidate.appliedJobs}
                  columns={columns}
                  pageSizeOptions={[5]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                /> */}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default CandidatesDashboard;
