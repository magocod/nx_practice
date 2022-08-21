import * as supertest from 'supertest';
import { assert } from "chai";

import { data } from "@nx-express/data"

// import { app } from '../src/main';
import { appFactory } from '../src/app.factory';

describe('Todos', () => {
  const httpClient = supertest(appFactory());

  // beforeAll(async () => {
  //   // pass
  // });
  //
  // afterAll(async () => {
  //   // pass
  // });

  it("base url", async function () {
    const response = await httpClient.get("/");
    // console.log(response.body);

    assert.equal(response.status, 200);
  });

  it("responds with json", async function () {
    const response = await httpClient.get("/data");
    // console.log(response.body);

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { message: 'Welcome to my-app! route', data: data() });
  });
});
