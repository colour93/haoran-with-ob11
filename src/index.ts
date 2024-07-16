import { readFileSync } from "fs"
import { OneBot } from "./onebot/server"
import { Config } from "./typings/config";

import douyinDownload from "./services/douyin-download";
import logger from "./utils/logger";
import shortAnswer from "./services/openai/short-answer";

(async () => {

  logger.info("Starting...");

  const config = JSON.parse(readFileSync('config.json').toString()) as Config;

  const bot = new OneBot(config.onebot);

  bot.onConnected = async () => {

    logger.info("Connected!");

    bot.event.on('group-message', async (rawMessage) => {

      const { message: messageChain } = rawMessage;
      const msg = messageChain.filter((message) => message.type === 'text').map((message) => message.data.text).join() ?? '';
      const isAtBot = messageChain.filter((message) => message.type === 'at' && message.data.qq === config.selfUin.toString()).length > 0;

      if (msg === '嘻嘻') {
        await bot.api.sendGroupMsg({
          group_id: rawMessage.group_id,
          message: "嘿嘿"
        });
      }

      if (isAtBot) {
        // 抖音解析
        douyinDownload({
          rawMessage,
          msg,
          bot
        });

        // 大模型短回答
        shortAnswer({
          rawMessage,
          msg,
          bot
        })
      }
    })
  }
})()
