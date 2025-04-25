import React from "react";
import { useState, useEffect } from "react";
import "./ReportForm.css";

interface ReportFormProps {
  fetchReports: () => void;
  isEditing: boolean;
  editId: number | null;
  initialData: {
    reportId: number | "";
    reportLocation: string;
    trafficDensity: string;
    averageSpeed: number | "";
    incidentDetails: string;
  };
  handleUpdate: (id: number, empData: any) => Promise<void>;
  handleCreate: (empData: any) => Promise<void>;
}

const ReportForm: React.FC<ReportFormProps> = ({
  fetchReports,
  isEditing,
  editId,
  initialData = {
    reportId: "",
    reportLocation: "",
    trafficDensity: "",
    averageSpeed: "",
    incidentDetails: "",
  },
  handleUpdate,
  handleCreate,
}) => {
  const [reportId, setReportId] = useState(initialData.reportId);
  const [reportLocation, setReportLocation] = useState(
    initialData.reportLocation
  );
  const [trafficDensity, setTrafficDensity] = useState(
    initialData.trafficDensity
  );
  const [averageSpeed, setAverageSpeed] = useState(initialData.averageSpeed);
  const [incidentDetails, setIncidentDetails] = useState(
    initialData.incidentDetails
  );

  useEffect(() => {
    setReportId(initialData.reportId || "");
    setReportLocation(initialData.reportLocation);
    setTrafficDensity(initialData.trafficDensity);
    setAverageSpeed(initialData.averageSpeed || "");
    setIncidentDetails(initialData.incidentDetails);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editId !== null) {
      await handleUpdate(editId, {
        reportId,
        reportLocation,
        trafficDensity,
        averageSpeed,
        incidentDetails,
      });
    } else {
      await handleCreate({
        reportId,
        reportLocation,
        trafficDensity,
        averageSpeed,
        incidentDetails,
      });
    }
    fetchReports();

    setReportId("");
    setReportLocation("");
    setTrafficDensity("");
    setAverageSpeed("");
    setIncidentDetails("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <table>
            <tbody>
              <tr>
                <td className="label">
                  <label htmlFor="reportId">Report ID (in 100s):</label>
                </td>
                <td>
                  <input
                    type="number"
                    id="reportId"
                    min={100}
                    value={reportId}
                    onChange={(e) => setReportId(parseInt(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">
                  <label htmlFor="reportLocation">Report Location:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="reportLocation"
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="label">
                  <label htmlFor="trafficDensity">Traffic Density:</label>
                </td>
                <td>
                  <select
                    id="trafficDensity"
                    value={trafficDensity}
                    onChange={(e) => setTrafficDensity(e.target.value)}
                  >
                    <option value="">Select Traffic Density</option>
                    <option value="Light">Light</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Heavy">Heavy</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="label">
                  <label htmlFor="averageSpeed">Average Speed (in KMPH):</label>
                </td>
                <td>
                  <input
                    type="number"
                    id="averageSpeed"
                    min={0}
                    value={averageSpeed}
                    onChange={(e) =>
                      setAverageSpeed(parseFloat(e.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className="label">
                  <label htmlFor="incidentDetails">Incident Details:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id="incidentDetails"
                    value={incidentDetails}
                    onChange={(e) => setIncidentDetails(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <button className="submit-button" type="submit">
                    {isEditing ? "Update" : "Create"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
