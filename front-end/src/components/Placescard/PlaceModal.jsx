import React from "react";
import "./Places.css"; // استایل‌ها را از این فایل می‌گیریم

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
        trimmedLine.startsWith("ویژگی") ||
        trimmedLine.startsWith("قدمت") ||
        trimmedLine.startsWith("مقبره") ||
        trimmedLine.startsWith("نقش") ||
        trimmedLine.startsWith("پلان") ||
        trimmedLine.startsWith("چهره")
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

    // اگر هیچ بخش‌بندی نداشت، همه رو به عنوان یک بخش نشون بده
    if (sections.length === 0 && detailsString) {
      sections.push({
        sectionTitle: null,
        sectionContent: detailsString,
      });
    }

    return sections.map((section, index) => (
      <div key={index} className="description-section-block">
        {section.sectionTitle && (
          <h3 className="description-section-heading">{section.sectionTitle}</h3>
        )}
        <p className="description-section-text">{section.sectionContent}</p>
      </div>
    ));
  };

  return (
    <div className="place-modal-wrapper">
      <div className="place-modal !w-[40%]">
        {/* دکمه بستن */}
        <button onClick={onClose} className="place-modal-close">
          &times;
        </button>

        {/* بخش بالایی مدال */}
        <div className="modal-top-section mt-3 px-3">
          {/* عکس */}
          <div className="modal-image-container">
            {place.image ? (
                  <img
                    src={place.image}
                    alt={place.attraction_name || "تصویر"}
                    className="h-100"
                    style={{ borderRadius: "10px" }}
                  />
                ) : (
                  <div className="no-image-placeholder">بدون تصویر</div>
                )}

          </div>

          {/* اطلاعات کلی */}
          <div className="modal-info-container">
            <h2 className="modal-place-main-title">
              {place.title || place.attraction_name || "بدون عنوان"}
            </h2>
            <div className="modal-general-info">
            <p>
              <span className="info-label">زمان ایجاد:</span>{" "}
              {place.historical_period || "نامشخص"}
            </p>
            <p>
              <span className="info-label">نام شهر:</span>{" "}
              {place.city || "نامشخص"}
            </p>
            <p>
              <span className="info-label">آدرس:</span>{" "}
              {place.location || "نامشخص"}
            </p>
            <p>
              <span className="info-label">ساعت‌های کاری:</span>{" "}
              {place.opening_hours || "نامشخص"}
            </p>
            <p>
              <span className="info-label">هزینه ورودی:</span>{" "}
              {place.entry_fee || "نامشخص"}
            </p>

            </div>
          </div>
        </div>

        {/* بخش توضیحات */}
        <div className="modal-description-scrollable">
          {renderDescriptionContent(place.details || place.description)}
        </div>
      </div>
    </div>
  );
};

export default PlaceModal;
