import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Header,
  HeaderContent,
  Provider,
  Select,
  Background,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo_sistema.svg';

interface SignUpFormData {
  provider: string;
  nome: string;
  data: Date;
  hora: string;
}

const CreateAppointment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          provider: Yup.string().required('Nome Profissional'),
          nome: Yup.string().required('Nome é obrigatório'),
          data: Yup.string().required('obrigatoio'),
          hora: Yup.string().required('obrigatoio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('appointments', data);

        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="DonBarzini" />
          <h1>Agendamento</h1>
          <Provider>
            <Form
              ref={formRef}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Select>
                <select placeholder="Profissional">
                  <option>Barbeiro 1</option>
                  <option>Barbeiro 2</option>
                  <option>Barbeiro 3</option>
                </select>
              </Select>
              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Cliente"
              />

              <Input
                name="data"
                icon={FiCalendar}
                type="date"
                placeholder="Data"
              />
              <Select>
                <select placeholder="Hora">
                  <option placeholder="8h">8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </Select>

              <Button type="submit">Agendar</Button>
            </Form>
          </Provider>
        </HeaderContent>
      </Header>
      <Background />
    </Container>
  );
};

export default CreateAppointment;
