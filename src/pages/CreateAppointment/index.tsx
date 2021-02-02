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
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
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

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
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

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  // const [providers, setProvider] = useState<ProviderItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { params } = useRouteMatch<RouteParams>();

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { signOut, user } = useAuth();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(params.providerId);

  useEffect(() => {
    api.get<Provider[]>('providers').then(({ data }) => {
      setProviders(data);
    });
  }, []);

  const selectedProviders = useMemo(() => {
    return providers.find((provider) => {
      return provider.id;
    });
  }, [providers]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleDateChanged = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

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

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
        console.log(response.data);
      });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const date = new Date(year, month, monthDay.day);

        return date;
      });

    return dates;
  }, [currentMonth, monthAvailability]);

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
                    <option onSelect={() => handleSelectProvider(provider.id)}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </Select>

              <Calendar>
                <Title>Escolha a data</Title>
                <DayPicker
                  weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                  fromMonth={new Date()}
                  disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                  modifiers={{
                    available: { daysOfWeek: [1, 2, 3, 4, 5] },
                  }}
                  onMonthChange={handleMonthChange}
                  selectedDays={selectedDate}
                  onDayClick={handleDateChange}
                  months={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                  ]}
                />
              </Calendar>

              <Schedule>
                <Title>Escolha o horário</Title>

                <Section>
                  <SectionTitle>Manhã</SectionTitle>

                  <SectionContent>
                    {morningAvailability.map(
                      ({ hourFormatted, available, hour }) => (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onClick={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ),
                    )}
                  </SectionContent>
                </Section>
                <Section>
                  <SectionTitle>Tarde</SectionTitle>

                  <SectionContent>
                    {afternoonAvailability.map(
                      ({ hourFormatted, available, hour }) => (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onClick={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      ),
                    )}
                  </SectionContent>
                </Section>
              </Schedule>
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
