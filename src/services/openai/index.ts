import { readFileSync } from 'fs';
import OpenAI from 'openai';
import { Config } from '../../typings/config';

const rawConfig = JSON.parse(readFileSync('config.json').toString()) as Config;

const config = rawConfig.openai.configs[rawConfig.openai.currentConfig];

export const model = config.model;

export const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.baseURL
})