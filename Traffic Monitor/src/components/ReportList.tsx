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
    alert("Report deleted successfully!");
  };

  const handleEdit = (Report: any) => {
    setEditingReport(Report);
  };

  const handleUpdate = async (id: number, report: any) => {
    if (report.reportId === id) {
      alert("Edit: Report ID cannot be the same as before!");
    } else if (report.reportId < 100) {
      alert("Edit: Report ID must be at least 100!");
    } else if (
      reports.map((report) => report.reportId).includes(report.reportId)
    ) {
      alert("Edit: Report ID already exists!");
    } else if (report.Location === "" || report.Location === null) {
      alert("Edit: Report Location cannot be empty!");
    } else if (report.trafficDensity === "" || report.trafficDensity === null) {
      alert("Traffic Density cannot be empty!");
    } else if (report.averageSpeed === "" || report.averageSpeed === null) {
      alert("Edit: Average Speed cannot be empty!");
    } else if (
      report.incidentDetails === "" ||
      report.incidentDetails === null
    ) {
      alert("Edit: Incident Details cannot be empty!");
    } else {
      try {
        await updateReport(id, report);
        fetchReports().then(setReports);
        setEditingReport(null);
        alert("Report updated successfully!");
      } catch (error) {
        console.error("Error updating report:", error);
        alert("Error updating report. Please try again.");
      }
    }
  };

  const handleCreate = async (report: any) => {
    if (report.reportId === null) {
      alert("Report ID cannot be empty!");
    } else if (report.reportId < 100) {
      alert("Report ID must be at least 100!");
    } else if (
      reports.map((report) => report.reportId).includes(report.reportId)
    ) {
      alert("Report ID already exists!");
    } else if (report.Location === "" || report.Location === null) {
      alert("Report Location cannot be empty!");
    } else if (report.trafficDensity === "" || report.trafficDensity === null) {
      return alert("Traffic Density cannot be empty!");
    } else if (report.averageSpeed === "" || report.averageSpeed === null) {
      alert("Average Speed cannot be empty!");
    } else if (
      report.incidentDetails === "" ||
      report.incidentDetails === null
    ) {
      alert("Incident Details cannot be empty!");
    } else {
      try {
        await createReport(report);
        fetchReports().then(setReports);
        alert("Report created successfully!");
      } catch (error) {
        console.error("Error creating report:", error);
        alert("Error updating report. Please try again.");
      }
    }
  };

  const handleSearch = async () => {
    const reportId = prompt("Enter Report ID:");

    if (reportId) {
      const result: any = reports.filter(
        (report) => report.reportId === parseInt(reportId)
      );
      if (result.length > 0) {
        result.forEach((report: any) => {
          alert(
            `Report Found! \n=============================\nReport ID: ${report.reportId} \nReport Location: ${report.reportLocation} \nTraffic Density: ${report.trafficDensity} \nAverage Speed: ${report.averageSpeed} \nIncident Details: ${report.incidentDetails}`
          );
        });
      } else {
        alert("No report found with the provided Report ID.");
      }
    } else {
      alert("Search: Cancelled!");
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
