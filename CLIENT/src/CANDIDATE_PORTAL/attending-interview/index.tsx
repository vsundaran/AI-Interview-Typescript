import { Box } from "@mui/material";
import AIInterview from "../../components/elementes/AI-Interview";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobRoleByID } from "../../services/API/routes/common";
import { Loading } from "../../components/elementes/suspense-loading";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../context/AuthContext";
import { JobRoleData } from "../../services/API/types";

export default function AttendingAIInterview() {
  const { job_id } = useParams();
  const [jobInfo, setJobInfo] = useState<null | JobRoleData>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchJobRoleInfo = async function () {
    try {
      if (job_id) {
        setLoading(true);
        if (user) {
          const response = await getJobRoleByID(job_id, user?._id, "candidate");
          if (response.success) {
            setJobInfo(response.jobRole);
          }
        }
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar((err as Error).message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (job_id) {
        fetchJobRoleInfo();
      } else {
        // if job id is not available  the route is considered as 404 so, it directed to the home
        console.log("no job id");
      }
    }
    //eslint-disable-next-line
  }, [job_id, navigate, user]);

  if (loading) return <Loading />;

  return (
    <Box>
      <AIInterview jobInfo={jobInfo} />
    </Box>
  );
}
