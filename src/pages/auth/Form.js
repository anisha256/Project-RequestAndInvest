import React, { useState } from 'react';
import styled from 'styled-components';
// import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';

const FormContainer = styled.section`
  margin: 40px;
  border: 1 px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 20px;
`;
const Button = styled.button`
  padding: 5px 10px;
  background-color: blue;
  border: none;
  border-radius: 5px;
  height: 30px;
  width: 80px;
  color: white;
  cursor: pointer;
`;
const InputC = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
`;
const Input = styled.input`
  height: 30px;
  width: 400px;
`;
const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    phone: '',
    // content: '',
  });
  const [data, setData] = useState('');
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCkeditorState = async (e, editor) => {
    // const data = editor.getData();
    // formData.content = data;
    // console.log('formdata:', formData);
    setData(editor.getData());
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    console.log(formData);
    try {
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      await axios.post(
        'http://localhost:5000/api/form/create',
        formData,
        config
      );
      console.log(formData);
      setFormData({
        title: '',
        email: '',
        phone: '',
        // content: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>CONTACT FORM</h1>
        <ContactForm onSubmit={handleSubmit}>
          <InputC>
            <label>Title</label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={formData.title}
            />
          </InputC>
          <InputC>
            <label>Email</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={formData.email}
            />
          </InputC>
          <InputC>
            <label>PhoneNumber</label>
            <Input
              id="phone"
              type="string"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              value={formData.phone}
            />
          </InputC>
          {/* <InputC>
          <label>Content</label>

          <CKEditor
            config={{
              ckfinder: {
                uploadUrl: 'http://localhost:5000/api/file/upload',
              },
            }}
            editor={Editor}
            onReady={() => {
              console.log('Editor is ready to use!');
            }}
            onChange={handleCkeditorState}
          />
        </InputC>
         */}
          <InputC>
            <Button type="submit">Submit</Button>
          </InputC>
        </ContactForm>
      </FormContainer>
      <section>
        {/* <CKEditor
          config={{
            ckfinder: {
              uploadUrl: 'http://localhost:5000/api/file/upload',
            },
          }}
          editor={Editor}
          onReady={() => {
            console.log('Editor is ready to use!');
          }}
          onChange={handleCkeditorState}
        /> */}
      </section>
    </>
  );
};

export default Form;
