import Box from "@mui/material/Box";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { APP_COLORS } from "../../../theme/colors";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { jobInfoStates, updateField } from "../../../redux/slice/job-info";
import { RootState } from "../../../redux/store";

export default function AdditionalInfo() {
  const jobInfo = useSelector((state: RootState) => state.job_info);
  const DISPATCH = useDispatch();
  type key = keyof typeof jobInfoStates;

  const handleUpdate = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: key
  ) => {
    DISPATCH(updateField({ string: event.target.value, key }));
  };

  return (
    // <form onSubmit={handleSubmit}>
    <Box>
      <Box marginBottom={2}>
        <center>
          <Typography variant="button" sx={{ color: APP_COLORS.PRIMARY }}>
            Your Privacy is Our Priority
          </Typography>
        </center>
        <Typography variant="body1" marginTop={2}>
          Your Privacy, Our Commitment We securely store your data only for your
          interview experience. Your information, including your name and
          project details, is used exclusively to generate personalized
          interview questions. Once your session ends, your data is managed
          securely and never shared. Stay focused on your preparation—we've got
          your privacy covered! 🚀
        </Typography>
      </Box>
      <Stack spacing={2}>
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: 4 }}>
          <TextField
            value={jobInfo?.name || ""}
            size="small"
            fullWidth
            label="Name"
            variant="standard"
            onChange={(event) => handleUpdate(event, "name")}
          />
          <TextField
            value={jobInfo?.lastProjectName || ""}
            sx={{ marginTop: { md: 0, xs: 2 } }}
            size="small"
            fullWidth
            label="Last Project Name"
            variant="standard"
            onChange={(event) => handleUpdate(event, "lastProjectName")}
          />
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Required interview type (Technical or HR)</FormLabel>
            <RadioGroup
              row
              value={jobInfo?.interviewType || ""}
              onChange={(event) => handleUpdate(event, "interviewType")}
            >
              <FormControlLabel
                value="Tech"
                control={<Radio />}
                label="Technical"
              />
              <FormControlLabel value="HR" control={<Radio />} label="HR" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <TextField
            value={jobInfo?.jobDescription || ""}
            fullWidth
            label="Past Your Job Description or Resume"
            multiline
            maxRows={100}
            onChange={(event) => handleUpdate(event, "jobDescription")}
          />
        </Box>
      </Stack>
    </Box>
  );
}
