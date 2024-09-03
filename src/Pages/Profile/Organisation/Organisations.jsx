import React, { useEffect, useState } from "react";
import {
  getAllDonorOfOrg,
  getAllOrgForDonor,
  getAllOrgForHos,
} from "../../../ApiCalls/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Redux/loaderSlice";
import { message, Modal, Table } from "antd";
import { getDateFormat } from "../../../utils/utils";
import InventoryTable from "../../../Components/InventoryTable";

const Organisations = ({ userType }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "organisationName",
      key: "organisationName",
      render: (text) => text,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => text,
    },
    {
      title: "created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <span
          className="cursor-pointer"
          onClick={() => {setSelectedOrganisation(record);setShowHistoryModal(true)}}
        >
          History
        </span>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response =
        userType === "hospital"
          ? await getAllOrgForHos()
          : await getAllOrgForDonor();
      dispatch(setLoading(false));
      if (response.status) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoading(false));
    }
  };

 

  return (
    <div >
      <Table
        style={{ marginTop: "1%" }}
        dataSource={data.map((item) => ({ ...item, key: item._id }))}
        columns={columns}
      />
      ;
      {showHistoryModal===true&&
      <Modal
      title={
        userType === "donor" ? "Donations History in " + selectedOrganisation.organisationName : "Consumptions History from " + selectedOrganisation.organisationName 
      }
      className="w-vw"
      open={showHistoryModal}
      onCancel={()=>setShowHistoryModal(false)}
      width={1100}
      centered
    >
      <InventoryTable
        filters={{
          organisation: selectedOrganisation._id,
          [userType]: currentUser._id,
        }}
       
      />
    </Modal>}
      
    </div>
  );
};

export default Organisations;
