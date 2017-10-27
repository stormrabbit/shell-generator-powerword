# spell-book-powerword 律令

##### 有关名字的由来

> “拉兹—瑟拉克—西诺拉蓝—克来那威”，雷斯林喃喃念着，接着他对着岸边用右手画了一道对等的弧形。坦尼斯回头望向岸边，地精们一个接一个地放下弓倒了下去，仿佛是雷斯林亲手碰触了他们似的。

最新做迭代的时候发现之前很多代码都可以复用，除去可以抽提剥离的一部分之外，还有一部分需要手动生成（其实是抽提的不充分，或者重构起来工作量略大）。每天在 ctrl cv 之间浪费很多时间，而且一不留神还容易粘错地方。于是闲暇之余希望可以用命令行工具生成或者添加一些代码，敲几个字符就能生成大量代码。

有上面念头的时候，突然想起奇幻世界的法师法术中有一种名为“律令”（powerword）的法术（e.g 律令死亡 powerword：kill），说出一个简单词，产生强力的效果。

起这么个名字，也是满足一个平凡麻瓜的法师梦吧。

中二病没救了。

- 现有律令

- `spell [-h]` 列出所有命令
- `spell ss || scribe [cmdName] [-a]` 在 bin/spell 中添加新的 command 代码，在 command/ 目录下生成对应的 js 文件。 ~~抄写卷轴~~
> 不写 cmdName 会提示输入；使用 -a 表示自己定制 command 的描述、缩写以及 action 文件名

#### Change Log: ####

- 1.0.0

1. 结构初始化
2. init 方法可以成功调用（然并卵，没东西）

- 1.0.1
1. 更改 init 方法为 scribe。 // scribe scroll
2. spell ss 可以添加新的 command 命令进 bin/spell 文件，同时在 command 目录下生成基础的 command 文件。
3. 增加 utils/fsPromise.js，使用 promise 对象简单的封装了 fs 模块，方便用 co 方法读取和写入文件。
4. 增加 template 文件夹堆放对应的模版，用于输出格式化。
5. 修改 readme，增加说明以及描述。 // 中二之魂又爆发了

- 1.0.2
1. 把 fsPormise 发布到 npm 上，更名为 spell-fs。

- 1.0.3
1. 将 fsPromise 以及其他一些公共组件整合到一起，命名为 eschew-materials ，发布至 npm。
2. 为 scribe 命令增加 argument 与 options 项，可以更灵活的生成不同类型的 command 命令。
3. 增加容错处理，防止 spell ss scribe 覆盖原有代码；增加生成提示。

#### 关键词：
`-cli`
`co`
`fs`
`promise`


###### ps

>虽然说出来这些话多少有点不好意思，但是我一直坚信奇幻世界里的法师就是现实世界里的程序员。
>首先两者都需要时间，在法师需要时间施法，在程序员是需要时间研发；
>其次如果有适合的器材可以事半功倍。比如法师有根好法杖，或者程序员有 mac 本；
>最后，当一切准备停当之后，法师念出拗口的咒语，释放奥术的能量；程序员敲下最后一行代码，程序编译运行。

*Miracle happened here。And we make mirales everyday，^^Y*
