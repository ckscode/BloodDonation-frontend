import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getInventoryWithFilters } from '../Pages/Profile/Inventory/inventoryApi';
import { Button, message, Table } from "antd";
import { setLoading } from '../Redux/loaderSlice';
import { getDateFormat } from '../utils/Utils';

const InventoryTable = ({filters}) => {
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
     render:(text,record)=>record.organisation.organisationName
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
      const response = await getInventoryWithFilters({filters});
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
             <Table style={{marginTop:'1%'}} dataSource={data.map((item)=>({...item,key:item._id}))} columns={columns} />;
        </div>
    );
};

export default InventoryTable;