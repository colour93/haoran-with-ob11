import { readFileSync } from 'fs';
import OpenAI from 'openai';
import { Config } from '../../typings/config';

const config = JSON.parse(readFileSync('config.json').toString()) as Config;

export const model = config.openai.model;

export const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  baseURL: config.openai.baseURL
})