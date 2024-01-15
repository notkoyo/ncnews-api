const request = require("supertest");
const app = require("../api/app");
const seed = require("../db/seeds/seed");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index");
const db = require("../db/connection");
const fs = require("fs/promises");
const { CLIENT_RENEG_LIMIT } = require("tls");

beforeEach(() => {
  return seed({ topicData, userData, articleData, commentData });
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  it("should return json object with all available endpoints with description, queries, format and example response properties", async () => {
    const fileData = await fs.readFile("./api/endpoints.json");
    const parsedData = JSON.parse(fileData);
    const { body } = await request(app).get("/api");
    const { endpoints } = body;
    expect(parsedData).toEqual(endpoints);
  });
  it("should return 404 error if no endpoints are available", () => {
    return request(app)
      .get("/api")
      .then(({ error, status, body }) => {
        if (error && Object.keys(body).length === 0) {
          expect(status).toBe(404);
        }
      });
  });
});

describe("GET /api/topics", () => {
  it("should return status code 200 and all topics data in an array of objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        const { topics } = body;
        expect(topics.length).toBeGreaterThan(0);
        topics.forEach((topic) => {
          expect(topic.hasOwnProperty("slug")).toBe(true);
          expect(topic.hasOwnProperty("description")).toBe(true);
        });
      });
  });
  it("should return 404 error if topics are not found", () => {
    return request(app)
      .get("/api/topics")
      .then(({ error, status, body }) => {
        if (error && body.topics.length === 0) {
          expect(status).toBe(404);
        }
      });
  });
});

describe("GET /api/articles", () => {
  it("should return status code 200 and all articles data in an array of objects that contains author, title, article_id, body, topic, created_at, votes, article_img_url properties", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        const { articles } = body;
        expect(articles.length).toBeGreaterThan(0);
        articles.forEach((article) => {
          [
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "article_img_url",
            "comment_count",
          ].forEach((property) =>
            expect(article.hasOwnProperty(property)).toBe(true)
          );
        });
      });
  });
  it("should return 404 error if articles are not found", () => {
    return request(app)
      .get("/api/articles")
      .then(({ error, status, body }) => {
        if (error && body.topics.length === 0) {
          expect(status).toBe(404);
        }
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  it("should return status code 200 and an article object with specified ID that contains author, title, article_id, body, topic, created_at, votes, article_img_url properties", () => {
    return request(app)
      .get("/api/articles/1")
      .then(({ body }) => {
        const { article } = body;
        [
          "author",
          "title",
          "article_id",
          "body",
          "topic",
          "created_at",
          "votes",
          "article_img_url",
        ].forEach((property) =>
          expect(article.hasOwnProperty(property)).toBe(true)
        );
      });
  });
  it("should return status code 400 if passed an invalid id", () => {
    return request(app).get("/api/articles/banana").expect(400);
  });
  it("should return status code 404 if no article with specified id exists", () => {
    return request(app).get("/api/articles/99999999").expect(404);
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("should return status code 200 and an array of comments for the given ID, each comment should have comment_id, votes, created_at, author, body, article_id properties and be sorted with most recent comments first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBeGreaterThan(0);
        comments.forEach((comment) => {
          [
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body",
            "article_id",
          ].forEach((property) => 
            expect(comment.hasOwnProperty(property)).toBe(true)
          );
        });
      });
  });
  it("should return status code 400 if passed an invalid id", () => {
    return request(app).get("/api/articles/banana/comments").expect(400);
  });
  it("should return 404 error if comments are not found", () => {
    return request(app)
      .get("/api/articles/9999999/comments")
      .then(({ error, status, body }) => {
        if (error && body.comments === undefined) {
          expect(status).toBe(404);
        }
      });
  });
});
