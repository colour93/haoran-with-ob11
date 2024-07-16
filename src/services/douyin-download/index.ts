import { createWriteStream, existsSync, mkdirSync } from "fs";
import { OneBot } from "../../onebot/server";
import { IOneBotEventGroupMessage } from "../../onebot/typings/event/message";
import { DOUYIN_SHARE_REGEX } from "./utils";
import path from "path";
import axios from "axios";
import { IOneBotMessageItemVideo } from "../../onebot/typings/message";
import logger from "../../utils/logger";

const downloadVideo: (shareUrl: string) => Promise<string | null> = async (shareUrl) => {

  const filePath = path.join('data', 'douyin-download', +new Date() + '.mp4');
  const writer = createWriteStream(filePath);

  const response = await axios({
    url: "http://localhost:29300/api/download",
    params: {
      url: shareUrl,
      prefix: false,
      with_watermark: false
    },
    method: 'GET',
    responseType: 'stream',
  })

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', () => { resolve(filePath) });
    writer.on('error', () => { resolve(null) });
  });
}

export default async ({ rawMessage, msg, bot }: { rawMessage: IOneBotEventGroupMessage; msg: string; bot: OneBot }) => {

  const result = DOUYIN_SHARE_REGEX.exec(msg);
  if (!result) return;

  const shareUrl = result[0] as string;

  logger.info('[douyin-download] Got url: ' + shareUrl);

  // if (!existsSync(path.join('data'))) mkdirSync(path.join('data'));
  // if (!existsSync(path.join('data', 'douyin-download'))) mkdirSync(path.join('data', 'douyin-download'));

  // const filePath = await downloadVideo(shareUrl);

  // filePath && console.log(path.resolve(filePath));

  // const message = filePath ? [{
  //   type: "video",
  //   data: {
  //     file: path.resolve(filePath)
  //   }
  // } as IOneBotMessageItemVideo] : "解析失败了"

  // const result1 = await bot.api.sendGroupMsg({
  //   group_id: rawMessage.group_id,
  //   message
  // })

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

  if (resp.status != 'ok') bot.api.sendGroupMsg({
    group_id: rawMessage.group_id,
    message: "解析失败了"
  })

}