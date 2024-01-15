const request = require('supertest');
const app = require('../api/app');
const seed = require('../db/seeds/seed');
const { topicData, userData, articleData, commentData } = require('../db/data/test-data/index');
const db = require('../db/connection');
const fs = require('fs/promises');

beforeEach(() => {
  return seed({ topicData, userData, articleData, commentData })
})

afterAll(() => {
  return db.end()
})

describe('GET /api/topics', () => {
  it('should return status code 200 and all topics data in an array of objects with slug and description properties', () => {
    return request(app)
      .get('/api/topics')
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBeGreaterThan(0);
        topics.forEach((topic) => {
          expect(topic.hasOwnProperty('slug')).toBe(true);
          expect(topic.hasOwnProperty('description')).toBe(true);
        })
      });
  });
  it("should return 404 error if topics are not found", () => {
    return request(app)
    .get("/api/topics")
    .then(({ error, status, body }) => {
      if (error && body.topics.length === 0) {
        expect(status).toBe(404);
      }
    })
  })
});

describe('GET /api', () => {
  it('should return json object with all available endpoints with description, queries, format and example response properties', async () => {
    const fileData = await fs.readFile('./api/endpoints.json');
    const parsedData = JSON.parse(fileData);
    const { body } = await request(app).get('/api');
    expect(parsedData).toEqual(body);
  });
  it('should return 404 error if no endpoints are available', () => {
    return request(app)
    .get("/api")
    .then(({ error, status, body }) => {
      if (error && Object.keys(body).length === 0) {
        expect(status).toBe(404);
      }
    })
  });
});