// import React from "react";
// import "./Places.css";

// const PlaceModal = ({ show, onClose, place }) => {
//   if (!show || !place) return null;

//   // Function to render description details from a single 'details' string
//   const renderDescriptionContent = (detailsString) => {
//     if (!detailsString) return null;

//     // Split the details string by specific keywords to identify sections, similar to the image
//     // This is a heuristic approach, if your actual data structure in 'details' varies,
//     // this might need more robust parsing (e.g., Markdown parsing or a structured array).
//     const sections = [];
//     let currentSection = { sectionTitle: null, sectionContent: [] };

//     const lines = detailsString.split('\n');

//     lines.forEach(line => {
//       const trimmedLine = line.trim();
//       if (trimmedLine.startsWith('معرفی') || trimmedLine.startsWith('ویژگی‌های')) {
//         // If we have content in the previous section, push it
//         if (currentSection.sectionTitle || currentSection.sectionContent.length > 0) {
//           sections.push({
//             sectionTitle: currentSection.sectionTitle,
//             sectionContent: currentSection.sectionContent.join('\n')
//           });
//         }
//         // Start a new section
//         currentSection = {
//           sectionTitle: trimmedLine, // This will be the bold title
//           sectionContent: []
//         };
//       } else if (trimmedLine) { // If line is not empty
//         currentSection.sectionContent.push(trimmedLine);
//       }
//     });

//     // Push the last section
//     if (currentSection.sectionTitle || currentSection.sectionContent.length > 0) {
//       sections.push({
//         sectionTitle: currentSection.sectionTitle,
//         sectionContent: currentSection.sectionContent.join('\n')
//       });
//     }

//     // Fallback if no specific sections were identified
//     if (sections.length === 0 && detailsString) {
//       sections.push({
//         sectionTitle: null, // No specific title found
//         sectionContent: detailsString
//       });
//     }

//     return sections.map((section, index) => (
//       <div key={index} className="description-section-block">
//         {section.sectionTitle && <h3 className="description-section-heading">{section.sectionTitle}</h3>}
//         <p className="description-section-text">{section.sectionContent}</p>
//       </div>
//     ));
//   };


//   return (
//     <div className="place-modal-wrapper " >
//       <div className="place-modal " >
//         {/* Close button position fixed to top-left corner */}
//         <button onClick={onClose} className="place-modal-close ">
//           &times;
//         </button>

//         {/* This container will hold the image and the main text details */}
//         <div className="modal-top-section mt-3 px-3">
//           {/* This div is for the image, resembling the orange part */}
//           <div className="modal-image-container ">
//             <img src={place.modal_image} alt={place.title} className="h-100" style={{borderRadius:"10px"}} />
//           </div>

//           {/* This div is for the title and general information, resembling the yellow part */}
//           <div className="modal-info-container">
//             <h2 className="modal-place-main-title">
//               {place.title}
//             </h2>
//             <div className="modal-general-info">
//               {/* These fields are assumed to be part of the 'place' object directly for simplicity,
//                   as per your existing PlacesPage.jsx data which only has 'details'.
//                   To truly match the image, you would need to parse them from 'details' or extend your data.
//                   For now, placeholders or simple parsing are used if not directly available. */}
//               <p><span className="info-label">زمان ایجاد:</span> {place.creationTime || "نامشخص"}</p>
//               <p><span className="info-label">نام شهر:</span> {place.cityName || "نامشخص"}</p>
//               <p><span className="info-label">آدرس:</span> {place.address || "نامشخص"}</p>
//               <p><span className="info-label">ساعت‌های کاری:</span> {place.workingHours || "نامشخص"}</p>
//               <p><span className="info-label">هزینه ورودی:</span> {place.entranceFee || "نامشخص"}</p>
//             </div>
//           </div>
//         </div>

//         {/* This div is for the scrollable description content */}
//         <div className="modal-description-scrollable">
//           {renderDescriptionContent(place.details)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceModal;