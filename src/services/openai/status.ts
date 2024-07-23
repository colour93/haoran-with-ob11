import { openai, model } from ".";
import { OneBot } from "../../onebot/server";
import { IOneBotEventGroupMessage } from "../../onebot/typings/event/message";

const llmStatus: (params: { rawMessage: IOneBotEventGroupMessage; msg: string; bot: OneBot }) => Promise<boolean> = ({ rawMessage, msg, bot }) => new Promise(async (resolve) => {
  if (msg.trim() !== '语言模型状态') {
    resolve(false);
    return;
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "你好"
        }
      ],
      model,
    });

    bot.api.sendGroupMsg({
      group_id: rawMessage.group_id,
      message: `当前使用模型：${chatCompletion.model}`
    })

    resolve(true);
  } catch (error) {
    bot.api.sendGroupMsg({
      group_id: rawMessage.group_id,
      message: "出错力。"
    })
    resolve(false);
  }

})

export default llmStatus;