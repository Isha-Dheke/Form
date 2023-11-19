import React from "react";

const Lower = ({ formData, handleAddressChange, AddressType }) => {
  const Address = [
    {
      name: "province",
      type: "text",
      placeH: "Province",
    },
    {
      name: "district",
      type: "text",
      placeH: "District",
    },
    {
      name: "municipality",
      type: "text",
      placeH: "Municipality",
    },
    {
      name: "ward",
      type: "text",
      placeH: "Ward",
    },
    {
      name: "tole",
      type: "number",
      placeH: "Tole",
    },
  ];

  return (
    <>
      <h2 className="m-2">{AddressType}</h2>
      <div className='grid grid-cols-2 gap-2 m-6 '>
      {Address.map((addressField, index) => (
        <div key={index}>
          <label className="border-2 border-black rounded p-1">
            <input
              className="focus:outline-none w-[15rem] text-center m-2"
              type={addressField.type}
              name={addressField.name}
              placeholder={addressField.placeH}
              value={formData?.[addressField.name] || ""}
              onChange={(e) => handleAddressChange(e, AddressType)}
            />
          </label>
        </div>
        
      ))}
      </div>
    </>
  );
};

export default Lower;