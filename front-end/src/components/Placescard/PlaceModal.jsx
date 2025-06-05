import React from "react";
import "./Places.css";

const PlaceModal = ({ show, onClose, place }) => {
  if (!show || !place) return null;

  const renderDescriptionContent = (detailsString) => {
    if (!detailsString) return null;

    const sections = [];
    let currentSection = { sectionTitle: null, sectionContent: [] };

    const lines = detailsString.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (
        trimmedLine.startsWith("معرفی") ||
        trimmedLine.startsWith("ویژگی‌های")
      ) {
        if (
          currentSection.sectionTitle ||
          currentSection.sectionContent.length > 0
        ) {
          sections.push({
            sectionTitle: currentSection.sectionTitle,
            sectionContent: currentSection.sectionContent.join("\n"),
          });
        }

        currentSection = {
          sectionTitle: trimmedLine,
          sectionContent: [],
        };
      } else if (trimmedLine) {
        currentSection.sectionContent.push(trimmedLine);
      }
    });

    if (
      currentSection.sectionTitle ||
      currentSection.sectionContent.length > 0
    ) {
      sections.push({
        sectionTitle: currentSection.sectionTitle,
        sectionContent: currentSection.sectionContent.join("\n"),
      });
    }

    if (sections.length === 0 && detailsString) {
      sections.push({
        sectionTitle: null,
        sectionContent: detailsString,
      });
    }

    return sections.map((section, index) => (
      <div key={index} className="description-section-block">
        {section.sectionTitle && (
          <h3 className="description-section-heading">
            {section.sectionTitle}
          </h3>
        )}
        <p className="description-section-text">{section.sectionContent}</p>
      </div>
    ));
  };

  return (
    <div className="place-modal-wrapper ">
      <div className="place-modal ">
        <button onClick={onClose} className="place-modal-close ">
          &times;
        </button>

        <div className="modal-top-section mt-3 px-3">
          <div className="modal-image-container ">
            <img
              src={place.modal_image}
              alt={place.title}
              className="h-100"
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="modal-info-container">
            <h2 className="modal-place-main-title">{place.title}</h2>
            <div className="modal-general-info">
              <p>
                <span className="info-label">زمان ایجاد:</span>{" "}
                {place.creationTime || "نامشخص"}
              </p>
              <p>
                <span className="info-label">نام شهر:</span>{" "}
                {place.cityName || "نامشخص"}
              </p>
              <p>
                <span className="info-label">آدرس:</span>{" "}
                {place.address || "نامشخص"}
              </p>
              <p>
                <span className="info-label">ساعت‌های کاری:</span>{" "}
                {place.workingHours || "نامشخص"}
              </p>
              <p>
                <span className="info-label">هزینه ورودی:</span>{" "}
                {place.entranceFee || "نامشخص"}
              </p>
            </div>
          </div>
        </div>

        <div className="modal-description-scrollable">
          {renderDescriptionContent(place.details)}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
