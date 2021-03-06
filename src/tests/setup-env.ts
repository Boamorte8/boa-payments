import { afterAll, afterEach, beforeAll } from 'vitest';
import 'whatwg-fetch';

import { server } from './server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
