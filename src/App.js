import React, { useRef, useState, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import './App.css';
import Input from './components/Form/Input';


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('o nome é obrigatório'),
        email: Yup.string()
          .email('digite um email válido')
          .required('o email é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'digite um nome de cidade válido')
            .required('a cidade é obrigatória'),
        })
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: "Lucas",
        email: "lucas@teste.com"
      });
    }, 2000);
  }, [])
  return (
    <div className="App">
      <h1>Unform</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" />

        <Input name="email" type="email" />
        <Input name="password" type="password" />

        <Scope path="address">
          <Input name="state" />
          <Input name="city" />
          <Input name="neighborhood" />
          <Input name="street" />
          <Input name="number" />
        </Scope>

        <button type="submit">Enviar</button>
      </Form>

    </div>
  );
}

export default App;
