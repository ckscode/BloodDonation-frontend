import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import HospitalRegister from "./HospitalRegister";
const Register = () => {
  const [type, setType] = useState("donor");

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <Form layout="vertical w-full flex justify-center"
      onFinish={onFinish}>
        <div className="bg-white shadow-md rounded-md p-5 w-1/4">
          <h1 className="text-4xl text-primary mb-0 heading">{type}</h1>
          <h2 className="text-gray-900 mb-2">Register</h2>
          <Radio.Group
            className="mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <Radio value="donor">Donor</Radio>
            <Radio value="hospital">Hospital</Radio>
            <Radio value="organisation">Organisation</Radio>
          </Radio.Group>
          {type === "donor" && (
            <>
              <Form.Item name="name" label="Name" className="mb-2"
                rules={[
                    {
                      required: true,
                      message:"Name is required"
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

              <Form.Item name="password" label="Password" className="mb-2"
               rules={[
                {
                  required: true,
                  message:"Give a Password"
                },
              ]}>
                <Input type="password" />
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
            </>
          )}
          {type !== "donor" && <HospitalRegister type={type} />}
          <div className="w-full text-center">
            <Button htmlType='submit' className="bg-primary w-1/2 text-white mt-4 mb-1">
              Register
            </Button>
          </div>
          <p className="text-center mt-1">
            Already have an Account?
            <Link className="text-blue-600" to="/login">
            &nbsp;Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
