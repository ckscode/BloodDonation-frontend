import React, { useEffect, useState } from 'react';
import { getAllDonorOfOrg } from '../../../ApiCalls/ApiCalls';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Redux/loaderSlice';
import { message, Table } from 'antd';
import { getDateFormat } from '../../../utils/Utils';

const Donors = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
      getData()
},[])

    const getData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getAllDonorOfOrg();
       
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
  


    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render:(text)=>text
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
          render:(text)=>text
        },
        {
          title: "Phone",
          dataIndex: "phone",
          key: "phone",
          render:(text)=>text
        },
        {
          title: "Date",
          dataIndex: "createdAt",
          key: "date",
          render:(text)=>getDateFormat(text)
        },
      ];

 
    return (
        <div>
                  <Table style={{marginTop:'1%'}} dataSource={data.map((item)=>({...item,key:item._id}))} columns={columns} />;

        </div>
    );
};

export default Donors;