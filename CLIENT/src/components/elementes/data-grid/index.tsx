import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Row {
  id: number | string;
  title?: string;
  scores?: number | null;
  name?: string;
  status?: string;
}

type DataGridProps = {
  rows: Row[];
  columns: GridColDef[];
  title: string;
};

const DataGridDownload = ({ rows, columns, title }: DataGridProps) => {
  // Function to export data as Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  // Function to export data as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 20, 10);
    //eslint-disable-next-line
    (doc as any).autoTable({
      head: [columns.map((col) => col.headerName)],
      body: rows.map((row) =>
        columns.map((col) => row[col.field as keyof Row] || "")
      ),
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      <DataGrid
        // sx={{ maxHeight: 400, overflow: "scroll" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 }, // Default page size 25
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default DataGridDownload;
