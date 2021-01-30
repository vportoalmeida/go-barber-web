import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiCalendar, FiUser, FiClock, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
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
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo_sistema.svg';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface ProviderItem {
  name: string;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

interface SignUpFormData {
  provider: string;
  nome: string;
  data: Date;
  hora: string;
}

const CreateAppointment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);
  const [providers, setProvider] = useState<ProviderItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProvider(response.data);
      console.log(response.data);
    });
  }, [providers]);

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

  const providersList = useMemo(() => {
    return providers.filter((provider) => {
      return provider.name;
    });
  }, [providers]);

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
                  {providersList.map((provider) => (
                    <option>{provider.name}</option>
                  ))}
                </select>
              </Select>

              <Input
                name="data"
                icon={FiCalendar}
                type="date"
                placeholder="Data"
              />
              <Input
                name="Hora"
                icon={FiClock}
                type="time"
                placeholder="Hora"
              />
              {/* <Select>
                <select placeholder="Hora">
                  <option placeholder="8h">8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </Select> */}
              <Input
                name="name"
                icon={FiUser}
                type="text"
                placeholder="Cliente"
              />
              <Button type="submit">Agendar</Button>
              <Link to="/dashboard">
                <FiArrowLeft />
                Voltar
              </Link>
            </Form>
          </Provider>
        </HeaderContent>
      </Header>
      <Background />
    </Container>
  );
};

export default CreateAppointment;
