# koishi-plugin-alapi

[![npm](https://img.shields.io/npm/v/koishi-plugin-alapi?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-alapi)

提供请求 [Alapi](https://alapi.cn)（一个半免费 API 平台）的服务。

用于管理整个程序的所有 Alapi 请求，避免请求超过账户限制而出错。

提交的请求将会以设定好的 QPS 排队执行。

这个插件只负责向 Alapi 请求数据，它本身并没有提供任何命令。如果你想通过 bot 使用 API 中的功能，你需要其他的一些插件。
