import "../../../../components/Download/Download.scss";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import downloadPNG from "../../../../components/Download/downloadPNG";
import downloadJPG from "../../../../components/Download/downloadJPG";
import downloadExcel from "../../../../components/Download/downloadExcel.59f4f845";
import downloadPDF from "../../../../components/Download/downloadPDF.04f846ee";
import Dots from "../../../../components/Download/Svgs/Dots";
import Excel from "../../../../components/Download/Svgs/Excel";
import PDF from "../../../../components/Download/Svgs/PDF";
import JPG from "../../../../components/Download/Svgs/JPG";
import PNG from "../../../../components/Download/Svgs/PNG";

const HeatmapDownload = ({ data, filename }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language } = useParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".svg-container")) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = open ? "selected" : "";

  return (
    <div className="download-container">
      <div
        className={`svg-container ${selected}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}>
        <Dots />
      </div>
      {open && (
        <div className="dropdown-content" ref={dropdownRef}>
          <div className="upper">
            <div
              className="wrapper"
              onClick={async () => {
                await downloadExcel(data, filename, language);
                setOpen(false);
              }}>
              <Excel />
              <p>Excel</p>
            </div>
            <div
              className="wrapper"
              onClick={() => {
                downloadPDF(data, filename, language);
                setOpen(false);
              }}>
              <PDF />
              <p>PDF</p>
            </div>
          </div>
          <div className="divider" />
          <div className="lower">
            <div
              className="wrapper"
              onClick={(e) => {
                downloadJPG(e);
                setOpen(false);
              }}>
              <JPG />
              <p>JPG</p>
            </div>
            <div
              className="wrapper"
              onClick={(e) => {
                downloadPNG(e);
                setOpen(false);
              }}>
              <PNG />
              <p>PNG</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapDownload;
