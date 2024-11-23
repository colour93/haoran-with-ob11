import { createWriteStream, existsSync, mkdirSync } from "fs";
import { OneBot } from "../../onebot/server";
import { IOneBotEventGroupMessage } from "../../onebot/typings/event/message";
import { DOUYIN_SHARE_REGEX } from "./utils";
import { IOneBotMessageItemVideo } from "../../onebot/typings/message";
import logger from "../../utils/logger";


const douyinDownload: (params: { rawMessage: IOneBotEventGroupMessage; msg: string; bot: OneBot }) => Promise<boolean> = ({ rawMessage, msg, bot }) => new Promise(async (resolve) => {

  const result = DOUYIN_SHARE_REGEX.exec(msg);
  if (!result) {
    resolve(false);
    return;
  };

  const shareUrl = result[0] as string;

  logger.info('[douyin-download] Got url: ' + shareUrl);

  const params: {
    [key: string]: any
  } = {
    url: shareUrl,
    prefix: false,
    with_watermark: false
  }

  const url = new URL("http://localhost:29300/api/download");

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));

  const resp = await bot.api.sendGroupMsg({
    group_id: rawMessage.group_id,
    message: [{
      type: "video",
      data: {
        file: url.toString()
      }
    } as IOneBotMessageItemVideo]
  })

  process.env.RUNNING_MODE === 'DEBUG' && logger.debug('[douyin-download] Resp: ', resp);

  if (resp.status != 'ok') {
    bot.api.sendGroupMsg({
      group_id: rawMessage.group_id,
      message: "解析失败了"
    })
    resolve(false);
  } else {
    resolve(true);
  }

})

export default douyinDownload;