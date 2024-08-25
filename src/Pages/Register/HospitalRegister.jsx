import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const HospitalRegister = ({type}) => {
    return (
        <div>
             {type === 'hospital'?(
             <Form.Item name="hospitalName" label="Hospital Name" className="mb-2"
             rules={[
              {
                required: true,
                message:"Hospital Name is required"
              },
            ]}>
             <Input />
           </Form.Item>):
           (
            <Form.Item name="organisationName" label="Organisation Name" className="mb-2"
            rules={[
              {
                required: true,
                message:"Organisation Name is required"
              },
            ]}>
            <Input />
          </Form.Item>)}
          <Form.Item name="ownerName" label="Owner" className="mb-2"
           rules={[
            {
              required: true,
              message:"Owner Name is required"
            },
          ]}>
             <Input />
           </Form.Item>
 
           <Form.Item name="email" label="Email" className="mb-2"
            rules={[
              {
                required: true,
                message:"Email is required"
              },
            ]}>
             <Input />
           </Form.Item>
 
           <Form.Item  name="password" label="Password" className="mb-2"
            rules={[
              {
                required: true,
                message:"Password is required"
              },
            ]}>
             <Input type='password' />
           </Form.Item>
         
           <Form.Item name="phone" label="Phone" className="mb-1"
            rules={[
              {
                required: true,
                message:"Contact number is required"
              },
            ]}>
             <Input />
           </Form.Item>
           <Form.Item name="website" label="Website" className="mb-1"
            rules={[
              {
                required: true,
                message:"Fill the website field"
              },
            ]}>
             <Input />
           </Form.Item>
           <Form.Item name="address" label="Address" className="mb-1"
            rules={[
              {
                required: true,
                message:"Fill the Address Field"
              },
            ]}>
             <TextArea />
           </Form.Item>
        </div>
    );
};

export default HospitalRegister;