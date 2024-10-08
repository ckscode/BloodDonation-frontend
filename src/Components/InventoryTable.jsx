import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getInventoryWithFilters } from '../Pages/Profile/Inventory/inventoryApi';
import { Button, message, Table } from "antd";
import { setLoading } from '../Redux/loaderSlice';
import { getDateFormat } from '../Helpers/Helpers';

const InventoryTable = ({filters,limit,pagination}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=> state.users)

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
      if(currentUser.userType !== 'organisation'){
        return record.organisation.organisationName}
      else{
        if(record.inventoryType==='out'){
          return record.hospital.hospitalName
        }else{
          return record.donor.name
        }
      }
      }
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render:(text)=>getDateFormat(text)
    },
  ];

  if(currentUser.userType!=='organisation'){
        columns.splice(0,1)
        columns[2].title='Organisation Name'
         columns[3].title=currentUser.userType ==='hospital'?'Taken On':'Donated At'
  }

  const getData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getInventoryWithFilters({filters,limit});
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
},[currentUser])
    return (
        <div>
             <Table style={{marginTop:'1%'}} dataSource={data.map((item)=>({...item,key:item._id}))} columns={columns} pagination={pagination?true:false}/>;
        </div>
    );
};

export default InventoryTable;