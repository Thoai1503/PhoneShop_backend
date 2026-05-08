import 'dotenv/config';
import express from 'express';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';

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

  const nodeModule = require('node:module') as { Module: { _initPaths: () => void } };
  nodeModule.Module._initPaths();
}

function getCreateNestApp() {
  if (!createNestAppFn) {
    configureNodePath();
    const appFactory: typeof import('../src/app.factory') = require('../src/app.factory');
    createNestAppFn = appFactory.createNestApp;
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
