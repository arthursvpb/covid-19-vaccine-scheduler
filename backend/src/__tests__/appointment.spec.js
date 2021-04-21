/* eslint-disable import/order */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const {
  generateRandomDate,
  generateRandomTime,
} = require('../functions/generateRandom.function');

const request = require('supertest');
const app = require('../server');

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
});
