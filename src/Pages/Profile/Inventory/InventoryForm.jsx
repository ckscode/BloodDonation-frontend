import { Form, Input, message, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../Redux/loaderSlice';
import { addInventory } from './inventoryApi';

const InventoryForm = ({open,setOpen,reloadData}) => {
    const [inventoryType,setInventoryType] = useState('in');
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const onFinish = async(values) =>{
      try{
         dispatch(setLoading(true))
         const response= await addInventory({...values,inventoryType});
         dispatch(setLoading(false))
         if(response.status){
            message.success('Inventory Added Successfully')
           setOpen(false)
         }else{
            dispatch(setLoading(false))
             throw new Error(response.message)
         }
        
      }catch(error){
            message.error(error);
            dispatch(setLoading(false))
      }
    } 
    return (
        <Modal
        title="Add Inventory" 
        open={open} 
        onCancel={()=>setOpen(false)}
        onOk={()=>{
            form.submit();
        }}
        centered>
            <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}>
                <Form.Item
                label='Inventory Type'>
                   <Radio.Group 
                   value={inventoryType} 
                   onChange={(e)=>setInventoryType(e.target.value)}>
                        <Radio value='in'>In</Radio>
                        <Radio value='out'>Out</Radio>
                   </Radio.Group>
                </Form.Item>
                <Form.Item
                label='Blood Group'
                name='bloodgroup'
                rules={[
                    {
                      required: true,
                      message:"Select Blood Group"
                    },
                  ]}>
                         <select name='bloodgroup'>
                              <option defaultValue={null} > </option>
                              <option value='A+'>A+</option>
                              <option value='A-'>A-</option>
                              <option value='AB+'>AB+</option>
                              <option value='AB-'>AB-</option>
                              <option value='B+'>B+</option>
                              <option value='B-'>B-</option>
                              <option value='O+'>O+</option>
                              <option value='O-'>O-</option>
                         </select>
                </Form.Item>
                <Form.Item
                label={inventoryType === 'out'?'Hospital Email':'Donor Email'}
                name='email'
                rules={[
                    {
                      required: true,
                      message:"Email is Required"
                    },
                  ]}>
                       <Input type='email'/>
                </Form.Item>
                <Form.Item
                label="Quantity in ML"
                name="quantity"
                rules={[
                    {
                      required: true,
                      message:"Quantity is Required"
                    },
                  ]}>
                   <Input type='number'/>
                </Form.Item>
            </Form>
       </Modal>
    );
};

export default InventoryForm;