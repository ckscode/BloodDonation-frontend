import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import InventoryForm from "./InventoryForm";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/loaderSlice";
import { getInventory } from "./inventoryApi";
import { getDateFormat } from "../../../utils/Utils";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();


  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      key: "inventoryType",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodgroup",
      key: "bloodgroup",
      
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render:(text)=>text + 'ML'
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
     render:(text,record)=>{
        if(record.inventoryType === "in"){
            return record.donor.name
        }else{
            return record.hospital.hospitalName
        }
     }
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render:(text)=>getDateFormat(text)
    },
  ];

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getInventory();
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

  useEffect(()=>{
        getData()
  },[])
  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>
      <div>
        <Table style={{marginTop:'1%'}} dataSource={data.map((item)=>({...item,key:item._id}))} columns={columns} />;
      </div>
      <InventoryForm open={open} setOpen={setOpen} reloadData={getData} />
    </div>
  );
};

export default Inventory;
