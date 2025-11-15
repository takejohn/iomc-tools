import fs from 'node:fs/promises';
import path from 'node:path';
import openapiTs, { astToString, type OpenAPI3 } from 'openapi-typescript';
import { getOpenAPISpec } from 'backend/openapi';

const spec = await getOpenAPISpec();
const ast = await openapiTs(spec as OpenAPI3);
const contents = astToString(ast);
const file = './src/schema.ts';
const dirname = path.dirname(file);

await fs.mkdir(dirname, { recursive: true });
await fs.writeFile(file, contents);
