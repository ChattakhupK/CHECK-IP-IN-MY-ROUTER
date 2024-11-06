import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Ipdash = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("nodeStatus", ({ id, status, ip, label }) => {
      setData((prevData) => ({
        ...prevData,
        [id]: { id, label, status, ip },
      }));
    });
  }, []);

  console.log(data);

  if (data === null || data === undefined) {
    return <h1>Loading...</h1>;
  }

  const tableRows = Object.values(data).map((node, index) => (
    <tr className="" key={index}>
      <td className="p-4 border border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {node.id}
          </p>
        </div>
      </td>
      <td className="p-4 border border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {node.label}
          </p>
        </div>
      </td>
      <td className="p-4 border border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {node.ip}
          </p>
        </div>
      </td>
      <td className="p-4 border border-blue-gray-50">
        <div>
          {node.status === "UP" ? (
            <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
              <span className="">online</span>
            </div>
          ) : (
            <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-red-900 uppercase rounded-md select-none whitespace-nowrap bg-red-500/20">
              <span className="">offline</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="">
      <div className="p-6 px-0 py-32">
        <h1 className="mb-6 text-center font-bold text-2xl">CHECK IP IN MY ROUTER</h1>
        <table className="mx-auto shadow-md w-6/12 text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  ID
                </p>
              </th>
              <th className="p-4 border border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Label
                </p>
              </th>
              <th className="p-4 border border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Status
                </p>
              </th>
              <th className="p-4 border border-blue-gray-100 bg-blue-gray-50/50">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  IP
                </p>
              </th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Ipdash;
