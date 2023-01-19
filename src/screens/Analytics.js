import React from "react";

export default function Analytics() {
  return (
    <div>
      <h1
        style={{
          color: "white",
          marginTop: "80px",
          textAlign: "center",
          fontSize: "80px",
        }}
      >
        Analytics
      </h1>
      <iframe
        title="Response PBI"
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=511afc4a-e88c-4b35-baf6-9b95adfe5427&autoAuth=true&ctid=349ea61b-7b66-4215-97b7-1a259123c7a5"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
}
