import { Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const HospitalRegister = ({type}) => {
    return (
        <div>
             {type === 'hospital'?(
             <Form.Item name="hospital" label="Hospital Name" className="mb-2">
             <Input />
           </Form.Item>):
           (
            <Form.Item name="oraganisation" label="Organisation Name" className="mb-2">
            <Input />
          </Form.Item>)}
          <Form.Item name="ownername" label="Owner" className="mb-2">
             <Input />
           </Form.Item>
 
           <Form.Item name="email" label="Email" className="mb-2">
             <Input />
           </Form.Item>
 
           <Form.Item  name="password" label="Password" className="mb-2">
             <Input type='password' />
           </Form.Item>
         
           <Form.Item name="phone" label="Phone" className="mb-1">
             <Input />
           </Form.Item>
           <Form.Item name="website" label="Website" className="mb-1">
             <Input />
           </Form.Item>
           <Form.Item name="address" label="Address" className="mb-1">
             <TextArea />
           </Form.Item>
        </div>
    );
};

export default HospitalRegister;