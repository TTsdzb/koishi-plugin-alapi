# koishi-plugin-alapi

[![npm](https://img.shields.io/npm/v/koishi-plugin-alapi?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-alapi)

提供请求 [Alapi](https://alapi.cn)（一个半免费 API 平台）的服务。

该服务管理整个程序的所有 Alapi 请求，避免请求超过账户限制而出错。

提交的请求将会以设定好的 QPS 排队执行。

这个插件只负责向 Alapi 请求数据，它本身并没有提供任何命令。如果你想通过 bot 使用 API 中的功能，你需要其他的一些插件。

## 如何调用

```typescript
let result = await ctx.alapi.request("ip", { ip: "1.1.1.1" });
```

其中第一个参数为 API 名称，即接口地址 `https://v2.alapi.cn/api/ip` 中 `api/` 之后的部分。第二个参数为一个对象，它保存了请求这个接口所需要的参数（除了 `token`）。

`result` 即为 API 返回的内容对象，其具体内容可以查询接口文档得到：

```javascript
{
  code: 200,
  msg: 'success',
  data: {
    beginip: '1.1.1.1',
    endip: '1.1.1.1',
    pos: '澳大利亚',
    isp: '',
    location: { lat: -35.2667, lng: 149.1333 },
    rectangle: [],
    ad_info: {
      nation: '澳大利亚',
      province: '',
      city: '',
      district: '',
      adcode: -1,
      nation_code: 36
    },
    ip: '1.1.1.1'
  },
  time: 1679366859,
  usage: 0,
  log_id: '496634363940286464'
}
```
