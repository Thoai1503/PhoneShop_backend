import 'dotenv/config';
import express from 'express';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import module from 'node:module';

type RequestHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => void | Promise<void>;

let cachedHandler: RequestHandler | null = null;
let createNestAppFn: typeof import('../src/app.factory').createNestApp | null =
  null;

function configureNodePath() {
  const rootPath = process.cwd();
  process.env.NODE_PATH = [process.env.NODE_PATH, rootPath]
    .filter(Boolean)
    .join(path.delimiter);

  (
    module as typeof module & { Module: { _initPaths: () => void } }
  ).Module._initPaths();
}

function getCreateNestApp() {
  if (!createNestAppFn) {
    configureNodePath();
    const { createNestApp } = require('../src/app.factory') as typeof import('../src/app.factory');
    createNestAppFn = createNestApp;
  }

  return createNestAppFn!;
}

async function getHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  const expressApp = express();
  const createNestApp = getCreateNestApp();
  const app = await createNestApp(expressApp);
  await app.init();

  cachedHandler = expressApp;
  return cachedHandler;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const app = await getHandler();
  return app(req, res);
}
