/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import {
  FiPower,
  FiClock,
  FiDelete,
  FiAlertCircle,
  FiCloudOff,
  FiCrop,
  FiTrash,
} from 'react-icons/fi';

import 'react-day-picker/lib/style.css';

import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Schedule,
  Agendamentos,
  Section,
  Appointment,
  ButtonApointment,
  Body,
  BodyContent,
} from './styles';

import userDefaultAvatar from '../../assets/user-circle1.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
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
interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface UserAppointmentReturnDTO {
  id: string;
  date: string;
  hourFormatted: string;
  dataFormatted: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    user_type: string;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
  provider: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    user_type: string;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
}

const Dashboard: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<UserAppointmentReturnDTO[]>(
    [],
  );

  const { signOut, user } = useAuth();

  const history = useHistory();

  const handleNav = useCallback(() => {
    history.push('/appointment');
  }, [history]);

  const handleRemoveAppointment = useCallback(
    async (id: string, date: string) => {
      try {
        const body = {
          provider_id: id,
          date,
        };

        const teste = await api.post('/appointments/delete', body);
      } catch (error) {}
    },
    [],
  );

  useEffect(() => {
    api
      .get<UserAppointmentReturnDTO[]>('/appointments/user/me', {
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
            dataFormatted: format(parseISO(appointment.date), 'dd/MM/yyyy'),
          };
        });

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate, appointments]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBr });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBr });
  }, [selectedDate]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

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
      <Body>
        <BodyContent>
          <Schedule>
            <h1>Horários agendados</h1>

            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>
            <ButtonApointment>
              <Button type="button" onClick={handleNav}>
                Novo Agendamento
              </Button>
            </ButtonApointment>

            <Agendamentos>
              <strong>Meus agendamentos</strong>
              {appointments.map((appointment) => (
                <div>
                  <strong>{appointment.provider.name}</strong>
                  <strong>{appointment.dataFormatted}</strong>
                  <strong>
                    {appointment.hourFormatted}
                    <FiClock />
                  </strong>
                  <button
                    type="button"
                    onClick={
                      () =>
                        handleRemoveAppointment(
                          appointment.id,
                          appointment.date,
                        )
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  >
                    <FiTrash />
                  </button>
                </div>
              ))}
            </Agendamentos>
          </Schedule>
        </BodyContent>
      </Body>
    </Container>
  );
};

export default Dashboard;
