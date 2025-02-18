//MUI
import Box from "@mui/material/Box";
import { Stack, TextField, Tooltip } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { jobInfoStates, updateField } from "../../../redux/slice/job-info";
import { RootState } from "../../../redux/store";

export default function JobInfo() {
  const jobInfo = useSelector((state: RootState) => state.job_info);
  const DISPATCH = useDispatch();

  type key = keyof typeof jobInfoStates;

  const handleUpdate = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    key: key
  ) => {
    DISPATCH(updateField({ string: event.target.value, key }));
  };

  return (
    <Stack spacing={2}>
      <Box sx={{ display: { xs: "block", md: "flex" }, gap: 4 }}>
        <TextField
          value={jobInfo?.jobRole || ""}
          size="small"
          fullWidth
          label="Job role"
          variant="standard"
          required
          onChange={(event) => handleUpdate(event, "jobRole")}
        />
      </Box>
      <Box sx={{ marginTop: "2rem !important" }}>
        <FormControl>
          <FormLabel>Experienced *</FormLabel>
          <RadioGroup
            row
            value={jobInfo?.experienced || ""}
            onChange={(event) => handleUpdate(event, "experienced")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
          margin: 0,
        }}
      >
        <TextField
          sx={{ display: jobInfo?.experienced === "yes" ? "block" : "none" }}
          value={jobInfo?.yearsOfExperience || ""}
          size="small"
          fullWidth
          label="Years of experience"
          variant="standard"
          required={jobInfo?.experienced === "yes"}
          onChange={(event) => handleUpdate(event, "yearsOfExperience")}
        />
        <Tooltip title="Separate the technology list using commas (e.g., HTML, CSS, JS, etc.)">
          <TextField
            value={jobInfo?.Technology || ""}
            sx={{ marginTop: { md: 0, xs: 2 } }}
            size="small"
            fullWidth
            label="Technology (optional)"
            variant="standard"
            onChange={(event) => handleUpdate(event, "Technology")}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
          margin: 0,
        }}
      >
        <Tooltip title="Separate the skills list using commas (e.g., HTML, CSS, JS, etc.)">
          <TextField
            value={jobInfo?.skills || ""}
            // sx={{ marginTop: { md: 0, xs: 2 } }}
            size="small"
            fullWidth
            label="Skills (optional)"
            variant="standard"
            onChange={(event) => handleUpdate(event, "skills")}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
          margin: 0,
        }}
      >
        <Tooltip title="Separate the company list using commas (e.g., HTML, CSS, JS, etc.)">
          <TextField
            value={jobInfo?.companyName || ""}
            // sx={{ marginTop: { md: 0, xs: 2 } }}
            size="small"
            fullWidth
            label="Company Name (Target company)"
            variant="standard"
            required
            onChange={(event) => handleUpdate(event, "companyName")}
          />
        </Tooltip>
        <Tooltip title="Enter your annual salary expectations (e.g., 10 LPA).">
          <TextField
            value={jobInfo?.salaryLevel || ""}
            sx={{ marginTop: { md: 0, xs: 2 } }}
            size="small"
            fullWidth
            label="Salary Level"
            variant="standard"
            required
            onChange={(event) => handleUpdate(event, "salaryLevel")}
          />
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          gap: 4,
          margin: 0,
        }}
      >
        <TextField
          value={jobInfo?.degree || ""}
          // sx={{ marginTop: { md: 0, xs: 2 } }}
          size="small"
          fullWidth
          label="Degree"
          variant="standard"
          onChange={(event) => handleUpdate(event, "degree")}
        />
        <TextField
          value={jobInfo?.education || ""}
          sx={{ marginTop: { md: 0, xs: 2 } }}
          size="small"
          fullWidth
          label="Education"
          variant="standard"
          onChange={(event) => handleUpdate(event, "education")}
        />
      </Box>
    </Stack>
  );
}
