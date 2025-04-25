import React, { useState, useEffect } from "react";
import {
  fetchReports,
  deleteReport,
  updateReport,
  createReport,
} from "../services/api";
import ReportForm from "./ReportForm";
import "./ReportList.css";

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [editingReport, setEditingReport] = useState<any | null>(null);

  useEffect(() => {
    document.title = "Reports";
    fetchReports().then(setReports);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteReport(id);
    fetchReports().then(setReports);
  };

  const handleEdit = (Report: any) => {
    setEditingReport(Report);
  };

  const handleUpdate = async (id: number, report: any) => {
    if (
      report.reportId === "" ||
      report.reportLocation === "" ||
      report.trafficDensity === "" ||
      report.averageSpeed === "" ||
      report.incidentDetails === ""
    ) {
      alert("Please fill in all fields");
      return;
    } else if (report.reportId < 100) {
      return alert("Report ID must be at least 100!");
    } else if (
      reports.map((report) => report.reportId).includes(report.reportId)
    ) {
      return alert("Report ID already exists!");
    } else if (report.Location === "") {
      return alert("Report Location cannot be empty!");
    } else if (report.trafficDensity === "") {
      return alert("Traffic Density cannot be empty!");
    } else if (report.averageSpeed === "") {
      return alert("Average Speed cannot be empty!");
    } else if (report.incidentDetails === "") {
      return alert("Incident Details cannot be empty!");
    }

    try {
      await updateReport(id, report);
      fetchReports().then(setReports);
      setEditingReport(null);
      alert("Report updated successfully!");
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Error updating report. Please try again.");
    }
  };

  const handleCreate = async (report: any) => {
    if (
      report.reportId === "" ||
      report.reportLocation === "" ||
      report.trafficDensity === "" ||
      report.averageSpeed === "" ||
      report.incidentDetails === ""
    ) {
      alert("Please fill in all fields");
      return;
    } else if (report.reportId < 100) {
      return alert("Report ID must be at least 100!");
    } else if (
      reports.map((report) => report.reportId).includes(report.reportId)
    ) {
      return alert("Report ID already exists!");
    } else if (report.Location === "") {
      return alert("Report Location cannot be empty!");
    } else if (report.trafficDensity === "") {
      return alert("Traffic Density cannot be empty!");
    } else if (report.averageSpeed === "") {
      return alert("Average Speed cannot be empty!");
    } else if (report.incidentDetails === "") {
      return alert("Incident Details cannot be empty!");
    }

    try {
      await createReport(report);
      fetchReports().then(setReports);
      alert("Report updated successfully!");
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Error updating report. Please try again.");
    }
  };

  const handleSearch = async () => {
    const reportId = prompt("Enter Report ID:");

    if (reportId) {
      const result: any = reports.filter(
        (report) => report.reportId === parseInt(reportId)
      );
      result.forEach((report: any) => {
        alert(
          `Report Found! \n=============================\nReport ID: ${report.reportId} \nReport Location: ${report.reportLocation} \nTraffic Density: ${report.trafficDensity} \nAverage Speed: ${report.averageSpeed} \nIncident Details: ${report.incidentDetails}`
        );
      });
    } else {
      fetchReports().then(setReports);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="fader">
        <h2>Report Form</h2>
        <ReportForm
          fetchReports={() => fetchReports().then(setReports)}
          isEditing={!!editingReport}
          editId={editingReport !== null ? editingReport.id : null}
          initialData={
            editingReport || {
              reportId: 0,
              reportLocation: "",
              trafficDensity: 0,
              averageSpeed: 0,
              incidentDetails: "",
            }
          }
          handleUpdate={handleUpdate}
          handleCreate={handleCreate}
        />
        <br />
        <br />
        <h2>Report List</h2>
        <br />
        <p>No Reports found.</p>
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div className="fader">
        <h2>Report Form</h2>
        <ReportForm
          fetchReports={() => fetchReports().then(setReports)}
          isEditing={!!editingReport}
          editId={editingReport !== null ? editingReport.id : null}
          initialData={
            editingReport || {
              reportId: 0,
              reportLocation: "",
              trafficDensity: 0,
              averageSpeed: 0,
              incidentDetails: "",
            }
          }
          handleUpdate={handleUpdate}
          handleCreate={handleCreate}
        />
        <br />
        <br />
        <h2>Report List</h2>
        <br />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <br />
        <br />
        <table className="user-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Location</th>
              <th>Traffic Density</th>
              <th>Average Speed</th>
              <th>Incident Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.reportId}</td>
                <td>{report.reportLocation}</td>
                <td>{report.trafficDensity}</td>
                <td>{report.averageSpeed} KMPH</td>
                <td>{report.incidentDetails}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(report)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(report.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
      </div>
    );
  }
};

export default ReportList;
