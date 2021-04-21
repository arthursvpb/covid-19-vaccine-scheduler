/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

describe('Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const response = await request(app).post('/appointments').send({
      name: 'Arthur Vasconcellos',
      birthday: '01/01/1990',
      vaccinationDate: '21/04/2021',
      vaccinationTime: '15:30',
      isConcluded: false,
      conclusion: '',
    });

    expect(response.body.data).toMatchObject({
      name: 'Arthur Vasconcellos',
      birthday: '01/01/1990',
      vaccinationDate: '21/04/2021',
      vaccinationTime: '15:30',
      isConcluded: false,
      conclusion: '',
    });
  });
});
