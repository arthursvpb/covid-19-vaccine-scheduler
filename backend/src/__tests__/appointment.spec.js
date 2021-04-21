/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
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
      birthday: '01/01/1930',
      vaccinationDate: '21/04/2021',
      vaccinationTime: '16:00',
      isConcluded: false,
      conclusion: '',
    });

    expect(response.body.data).toMatchObject({
      name: 'Aged person',
      birthday: '01/01/1930',
      vaccinationDate: '21/04/2021',
      vaccinationTime: '16:00',
      isConcluded: false,
      conclusion: '',
    });
  });

  it('should be able to update an existing appointment', async () => {
    const createdAppointment = await request(app).post('/appointments').send({
      name: 'Aged person',
      birthday: '01/01/1940',
      vaccinationDate: '13/04/2021',
      vaccinationTime: '10:00',
      isConcluded: false,
      conclusion: '',
    });

    const id = createdAppointment.body.data._id;

    const response = await request(app).put(`/appointments/${id}`).send({
      name: 'Updated Aged person',
      birthday: '01/01/1940',
      vaccinationDate: '20/04/2021',
      vaccinationTime: '11:00',
      isConcluded: true,
      conclusion: 'Concluded',
    });

    expect(response.body.message).toEqual(
      '✅ Agendamento atualizado com sucesso!',
    );
  });
});
