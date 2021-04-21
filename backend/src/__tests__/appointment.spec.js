/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

const {
  generateRandomDate,
  generateRandomTime,
} = require('../functions/generateRandom.function');

const {
  MAX_DAILY_APPOINTMENT_DISPONIBILITY,
  MAX_APPOINTMENT_DISPONIBILITY_PER_TIME,
} = process.env;

describe('Appointment', () => {
  it('should be able to list all apppointments', async () => {
    const response = await request(app).get('/appointments');

    expect(response.status).toBe(200);
  });

  it('should be able to create a new appointment', async () => {
    const response = await request(app).post('/appointments').send({
      name: 'Aged person',
      birthday: generateRandomDate(),
      vaccinationDate: generateRandomDate(),
      vaccinationTime: generateRandomTime(),
      isConcluded: false,
      conclusion: '',
    });

    expect(response.body.data).toMatchObject({
      name: 'Aged person',
      birthday: response.body.data.birthday,
      vaccinationDate: response.body.data.vaccinationDate,
      vaccinationTime: response.body.data.vaccinationTime,
      isConcluded: false,
      conclusion: '',
    });
  });

  it('should be able to update an existing appointment', async () => {
    const createdAppointment = await request(app).post('/appointments').send({
      name: 'Aged person',
      birthday: generateRandomDate(),
      vaccinationDate: generateRandomDate(),
      vaccinationTime: generateRandomTime(),
      isConcluded: false,
      conclusion: '',
    });

    const id = createdAppointment.body.data._id;

    const response = await request(app).put(`/appointments/${id}`).send({
      name: 'Updated aged person',
      birthday: generateRandomDate(),
      vaccinationDate: generateRandomDate(),
      vaccinationTime: generateRandomTime(),
      isConcluded: false,
      conclusion: 'Concluded',
    });

    expect(response.body.message).toEqual(
      '✅ Agendamento atualizado com sucesso!',
    );
  });

  it('should be able to prioritize aged person', async () => {
    /**
     * Young person attributes
     */
    const birthday = '01-01-1990';
    const randomVaccinationDate = generateRandomDate();
    const randomVaccinationTime = generateRandomTime();

    /**
     * Generate appointments within MAX_APPOINTMENT_DISPONIBILITY_PER_TIME limit
     */
    for (let i = 0; i < MAX_APPOINTMENT_DISPONIBILITY_PER_TIME; i++) {
      await request(app).post('/appointments').send({
        name: 'Young person',
        birthday,
        vaccinationDate: randomVaccinationDate,
        vaccinationTime: randomVaccinationTime,
        isConcluded: false,
        conclusion: '',
      });
    }

    /**
     * Tries to create and appointment with the same date and time, but as an aged person
     */
    const response = await request(app).post('/appointments').send({
      name: 'Aged person',
      birthday: '01-01-1920',
      vaccinationDate: randomVaccinationDate,
      vaccinationTime: randomVaccinationTime,
      isConcluded: false,
      conclusion: '',
    });

    expect(response.body.message).toEqual(
      '✅ Você tem prioridade! Agendamento criado com sucesso.',
    );
  });

  it('should not be able to create appointment if MAX_DAILY_APPOINTMENT_DISPONIBILITY has exceeded', async () => {});

  it('should not be able to create appointment if MAX_APPOINTMENT_DISPONIBILITY_PER_TIME has exceeded', async () => {});
});
