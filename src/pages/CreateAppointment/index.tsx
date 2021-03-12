/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { FormHandles } from '@unform/core';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiPower, FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import DayPicker, { DayModifiers } from 'react-day-picker';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import {
  Container,
  Header,
  HeaderContent,
  Provider,
  Select,
  Calendar,
  Schedule,
  Section,
  Title,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Profile,
  Body,
  BodyContent,
  Content,
  Teste1,
  Teste2,
  BtnContent,
} from './styles';
import userDefaultAvatar from '../../assets/user-circle1.png';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

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

  useEffect(() => {
    if (selectedProvider) {
      api
        .get<AvailabilityItem[]>(
          `providers/${selectedProvider}/day-availability`,
          {
            params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
            },
          },
        )
        .then(({ data }) => {
          setAvailability(data);
        });
    } else {
      setAvailability([]);
    }
  }, [selectedDate, selectedProvider]);

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

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleSelectProvider = useCallback((event: any) => {
    setSelectedProvider(event.target.value);
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

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

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      const retorno = await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });

      addToast({
        type: 'success',
        title: 'Agendamento realizado!',
        description: format(
          date,
          "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
          { locale: ptBr },
        ),
      });

    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao criar agendamento',
        description:
          'Ocorreu um erro ao tentar criar um agendamento, tente novamente',
      });
    }
  }, [addToast, selectedDate, selectedHour, selectedProvider]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBr });
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          {/* <img src={logoImg} alt="Go Barber" /> */}
          <h1>Dom Barzini </h1>
          <Profile>
            <img
              src={user.avatar_url ? user.avatar_url : userDefaultAvatar}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Provider>
        <Form
          ref={formRef}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Content>
            <Teste1>
              <Schedule>
                <h1>Escolha o Profissional</h1>
                <p>
                  {isToday(selectedDate) && <span>Hoje</span>}
                  <span>{selectedDateAsText}</span>
                  <span>{selectedWeekDay}</span>
                </p>
                <Section>
                  <Select>
                    <select
                      placeholder="Profissional"
                      value={selectedProvider}
                      onChange={handleSelectProvider}
                    >
                      <option value="" key="">
                        Selecione o Prestador de servico
                      </option>
                      {providers.map((provider) => (
                        <option value={provider.id} key={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </select>
                  </Select>
                </Section>
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
            </Teste1>
            <Teste2>
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
            </Teste2>
          </Content>
          <BtnContent>
            <Button type="submit" onClick={handleCreateAppointment}>
              Agendar
            </Button>
          </BtnContent>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>
        </Form>
      </Provider>
    </Container>
  );
};

export default CreateAppointment;
