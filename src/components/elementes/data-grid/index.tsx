import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Job {
  id: number;
  title: string;
  candidates?: number;
  scores?: number;
}

type JobsDataGridProps = {
  jobs: Job[];
  columns: GridColDef[];
};

const JobsDataGrid = ({ jobs, columns }: JobsDataGridProps) => {
  // Function to export data as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jobs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
    XLSX.writeFile(workbook, "JobsData.xlsx");
  };

  // Function to export data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Jobs Data", 20, 10);
    //eslint-disable-next-line
    (doc as any).autoTable({
      head: [columns.map((col) => col.headerName)],
      body: jobs.map((job) =>
        columns.map((col) => job[col.field as keyof Job] || "")
      ),
    });
    doc.save("JobsData.pdf");
  };

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <Box display="flex" justifyContent="end" gap={1} mb={1}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          startIcon={<Download size={18} />}
        >
          Excel
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={exportToPDF}
          startIcon={<Download size={18} />}
        >
          PDF
        </Button>
      </Box>
      <DataGrid rows={jobs} columns={columns} />
    </Box>
  );
};

export default JobsDataGrid;
