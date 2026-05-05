import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function DashboardButton() {
  const navigate = useNavigate();

  return (
    <Button
      icon="pi pi-user"
      className="p-button-rounded p-button-text"
      onClick={() => navigate("/dashboard")}
      style={{
        position: "fixed",
        top: 20,
        left: 20,
        zIndex: 1000
      }}
    />
  );
}