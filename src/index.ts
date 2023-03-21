import { Context, Schema, Service } from "koishi";
import axios from "axios";

class Alapi extends Service {
  _queue: (() => void)[];
  _timer: NodeJS.Timer | undefined;

  constructor(ctx: Context) {
    super(ctx, "alapi", true);
    this._queue = [];
    this._timer = undefined;
  }

  /**
   * 向 Alapi 发送一个请求，
   * 并保证总 QPS 为设定的值。
   * 注意该函数为异步函数。
   * @param api 要请求的 API 名称（全小写）
   * @param params API 参数
   * @returns 请求结果对象
   */
  request(api: string, params: Record<string, any>) {
    params["token"] = this.ctx.config.token;

    // 生成一个新的 Promise，
    // 它向队列中推入一个函数，
    // 而这个函数执行之后它才可能被 resolve 或 reject。
    const promise = new Promise<any>((resolve, reject) => {
      this._queue.push(() => {
        const url = `https://v2.alapi.cn/api/${api}`;
        axios
          .get(url, {
            params: params,
          })
          .then((value) => {
            if (value.data.code !== 200) reject(new Error(value.data.msg));
            resolve(value.data);
          })
          .catch((reason) => reject(reason));
      });
    });

    // 如果没有定时器，将其设定
    if (this._timer === undefined) {
      this._timer = setInterval(() => {
        const func = this._queue.shift();
        if (func !== undefined) func();
        // 如果没东西了，清除定时器
        if (this._queue.length === 0) {
          clearInterval(this._timer);
          this._timer = undefined;
        }
      }, 1000 / this.ctx.config.qps);
    }

    return promise;
  }
}

namespace Alapi {
  export interface Config {
    token: string;
    qps: number;
  }

  export const Config: Schema<Config> = Schema.object({
    token: Schema.string().description("账户的API Token").required(),
    qps: Schema.number().description("每秒请求数，用于限制请求速度").default(0.5),
  });
}

export default Alapi;
