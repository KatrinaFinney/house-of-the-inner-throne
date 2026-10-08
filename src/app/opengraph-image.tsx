import { ImageResponse } from "next/og";

export const alt = "Shrine of the Inner Throne — Protection, Power, Prosperity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#f5ead4",
          background: "radial-gradient(circle at top, #342716 0%, #11100d 42%, #050505 100%)",
          border: "2px solid #6f5a32",
          textAlign: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 10, color: "#caa96b", textTransform: "uppercase" }}>
          Protection · Power · Prosperity
        </div>
        <div style={{ marginTop: 42, fontSize: 76, lineHeight: 1.08 }}>
          Shrine of the Inner Throne
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#c8bcaa" }}>
          The work begins within.
        </div>
      </div>
    ),
    size,
  );
}
