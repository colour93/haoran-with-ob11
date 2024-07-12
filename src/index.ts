import { readFileSync } from "fs"
import { OneBot } from "./onebot/server"
import { Config } from "./typings/config";

(async () => {

  const config = JSON.parse(readFileSync('config.json').toString()) as Config;

  const bot = new OneBot(config.onebot)

  bot.onConnected = async () => {
    bot.event.on('group-message', async (rawMessage) => {
      const { message: messageChain } = rawMessage;
      const msg = messageChain.filter((message) => message.type === 'text').map((message) => message.data.text).join() ?? '';
      if (msg === '嘻嘻') {
        await bot.api.sendGroupMsg({
          group_id: rawMessage.group_id,
          message: "嘿嘿"
        });
      }
    })
  }
})()
