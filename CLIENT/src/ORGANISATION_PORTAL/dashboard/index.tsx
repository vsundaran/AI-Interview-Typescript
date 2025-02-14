import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import JobsDataGrid from "../../components/elementes/data-grid";

// Sample Data
const jobs = [
  {
    id: "17887654776",
    title: "Frontend Developer",
    candidates: [
      { id: "101", name: "Alice Johnson", status: "Interview Scheduled" },
      { id: "102", name: "Bob Smith", status: "Pending Review" },
      { id: "101", name: "Alice Johnson", status: "Interview Scheduled" },
      { id: "102", name: "Bob Smith", status: "Pending Review" },
      { id: "101", name: "Alice Johnson", status: "Interview Scheduled" },
    ],
  },
  {
    id: "27887654776",
    title: "Backend Developer",
    candidates: [
      { id: "103", name: "Charlie Brown", status: "Selected" },
      { id: "104", name: "David Lee", status: "Rejected" },
    ],
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "status", headerName: "Status", width: 200 },
];

const Dashboard = () => {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Box mb={2}>
          <Typography color="primary" variant="h6" sx={{ fontSize: "24px" }}>
            Employer Job Dashboard
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            View and manage job postings along with candidate applications in
            one place.
          </Typography>
        </Box>
        {jobs.map((job) => (
          <Card key={job.id} sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {job.title} - Job ID: {job.id}
              </Typography>
              <Box sx={{ width: "100%" }}>
                <JobsDataGrid
                  title="Candidates Data"
                  rows={job.candidates}
                  columns={columns}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Dashboard;
