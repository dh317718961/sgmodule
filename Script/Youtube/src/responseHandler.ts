/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Browse,
  Next,
  Player,
  Search,
  Shorts,
  Guide,
  Setting
} from '../lib/response'
import { YouTubeMessage } from './youtube'

export class BrowseMessage extends YouTubeMessage {
  constructor (name: string = 'Browse') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Browse.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    this.iterate(this.message, 'n5F1', (obj) => {
      for (let i = obj.n5F1?.length - 1; i >= 0; i--) {
        if (this.isAdvertise(obj.n5F1[i])) {
          obj.n5F1.splice(i, 1)
        }
      }
    })
    return this
  }

  toBinary (): Uint8Array {
    return Browse.toBinary(this.message)
  }
}

export class NextMessage extends BrowseMessage {
  constructor (name: string = 'Next') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Next.fromBinary(binaryBody)
    return this
  }

  toBinary (): Uint8Array {
    return Next.toBinary(this.message)
  }
}

export class PlayerMessage extends YouTubeMessage {
  constructor (name: string = 'Player') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Player.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    if (this.message.p1F7?.length) {
      this.message.p1F7.length = 0
    }
    // 尝试开启PIP
    const option = this.message?.p1F2?.p2F21?.p3F151635310
    if (typeof option === 'object') {
      option.pip = 1
    }
    // 尝试开启后台播放
    const backPlayFake = {
      p2F11: {
        p3F64657230: {
          backPlay: 1
        }
      }
    }
    if (typeof this.message?.p1F2 === 'object') {
      Object.assign(this.message.p1F2, backPlayFake)
    }

    this.iterate(this.message, 'captionTracks', (obj, stack) => {
      // obj 就是 playerCaptionsTracklistRenderer
      const captionTracks = obj.captionTracks
      if (Array.isArray(captionTracks)) {
        // 有基础字幕
        for (const captionTrack of captionTracks) {
          captionTrack.isTranslatable = true
        }
      }
      obj.translationLanguages = [
        {
          "languageCode": "sq",
          "languageName": {
            "runs": [
              {
                "text": "Shqip - 阿尔巴尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "ak",
          "languageName": {
            "runs": [
              {
                "text": "Ákán - 阿肯语"
              }
            ]
          }
        },
        {
          "languageCode": "ar",
          "languageName": {
            "runs": [
              {
                "text": "العربية - 阿拉伯语"
              }
            ]
          }
        },
        {
          "languageCode": "am",
          "languageName": {
            "runs": [
              {
                "text": "አማርኛ - 阿姆哈拉语"
              }
            ]
          }
        },
        {
          "languageCode": "as",
          "languageName": {
            "runs": [
              {
                "text": "অসমীয়া - 阿萨姆语"
              }
            ]
          }
        },
        {
          "languageCode": "az",
          "languageName": {
            "runs": [
              {
                "text": "Azərbaycanca - 阿塞拜疆语"
              }
            ]
          }
        },
        {
          "languageCode": "ee",
          "languageName": {
            "runs": [
              {
                "text": "Eʋegbe - 埃维语"
              }
            ]
          }
        },
        {
          "languageCode": "ay",
          "languageName": {
            "runs": [
              {
                "text": "Aymar - 艾马拉语"
              }
            ]
          }
        },
        {
          "languageCode": "ga",
          "languageName": {
            "runs": [
              {
                "text": "Gaeilge - 爱尔兰语"
              }
            ]
          }
        },
        {
          "languageCode": "et",
          "languageName": {
            "runs": [
              {
                "text": "Eesti - 爱沙尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "or",
          "languageName": {
            "runs": [
              {
                "text": "ଓଡ଼ିଆ - 奥里亚语"
              }
            ]
          }
        },
        {
          "languageCode": "om",
          "languageName": {
            "runs": [
              {
                "text": "Oromoo - 奥罗莫语"
              }
            ]
          }
        },
        {
          "languageCode": "eu",
          "languageName": {
            "runs": [
              {
                "text": "Euskara - 巴斯克语"
              }
            ]
          }
        },
        {
          "languageCode": "be",
          "languageName": {
            "runs": [
              {
                "text": "Беларуская - 白俄罗斯语"
              }
            ]
          }
        },
        {
          "languageCode": "bg",
          "languageName": {
            "runs": [
              {
                "text": "Български - 保加利亚语"
              }
            ]
          }
        },
        {
          "languageCode": "nso",
          "languageName": {
            "runs": [
              {
                "text": "Sesotho sa Leboa - 北索托语"
              }
            ]
          }
        },
        {
          "languageCode": "is",
          "languageName": {
            "runs": [
              {
                "text": "Íslenska - 冰岛语"
              }
            ]
          }
        },
        {
          "languageCode": "pl",
          "languageName": {
            "runs": [
              {
                "text": "Polski - 波兰语"
              }
            ]
          }
        },
        {
          "languageCode": "bs",
          "languageName": {
            "runs": [
              {
                "text": "Bosanski - 波斯尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "fa",
          "languageName": {
            "runs": [
              {
                "text": "فارسی - 波斯语"
              }
            ]
          }
        },
        {
          "languageCode": "bho",
          "languageName": {
            "runs": [
              {
                "text": "भोजपुरी - 博杰普尔语"
              }
            ]
          }
        },
        {
          "languageCode": "ts",
          "languageName": {
            "runs": [
              {
                "text": "Xitsonga - 聪加语"
              }
            ]
          }
        },
        {
          "languageCode": "tt",
          "languageName": {
            "runs": [
              {
                "text": "Татарча - 鞑靼语"
              }
            ]
          }
        },
        {
          "languageCode": "da",
          "languageName": {
            "runs": [
              {
                "text": "Dansk - 丹麦语"
              }
            ]
          }
        },
        {
          "languageCode": "de",
          "languageName": {
            "runs": [
              {
                "text": "Deutsch - 德语"
              }
            ]
          }
        },
        {
          "languageCode": "dv",
          "languageName": {
            "runs": [
              {
                "text": "ދިވެހިބަސް - 迪维希语"
              }
            ]
          }
        },
        {
          "languageCode": "ru",
          "languageName": {
            "runs": [
              {
                "text": "Русский - 俄语"
              }
            ]
          }
        },
        {
          "languageCode": "fr",
          "languageName": {
            "runs": [
              {
                "text": "Français - 法语"
              }
            ]
          }
        },
        {
          "languageCode": "sa",
          "languageName": {
            "runs": [
              {
                "text": "संस्कृतम् - 梵语"
              }
            ]
          }
        },
        {
          "languageCode": "fil",
          "languageName": {
            "runs": [
              {
                "text": "Filipino - 菲律宾语"
              }
            ]
          }
        },
        {
          "languageCode": "fi",
          "languageName": {
            "runs": [
              {
                "text": "Suomi - 芬兰语"
              }
            ]
          }
        },
        {
          "languageCode": "km",
          "languageName": {
            "runs": [
              {
                "text": "ភាសាខ្មែរ - 高棉语"
              }
            ]
          }
        },
        {
          "languageCode": "ka",
          "languageName": {
            "runs": [
              {
                "text": "ქართული - 格鲁吉亚语"
              }
            ]
          }
        },
        {
          "languageCode": "gu",
          "languageName": {
            "runs": [
              {
                "text": "ગુજરાતી - 古吉拉特语"
              }
            ]
          }
        },
        {
          "languageCode": "gn",
          "languageName": {
            "runs": [
              {
                "text": "Avañe'ẽ - 瓜拉尼语"
              }
            ]
          }
        },
        {
          "languageCode": "kk",
          "languageName": {
            "runs": [
              {
                "text": "Қазақ тілі - 哈萨克语"
              }
            ]
          }
        },
        {
          "languageCode": "ht",
          "languageName": {
            "runs": [
              {
                "text": "海地克里奥尔语"
              }
            ]
          }
        },
        {
          "languageCode": "ko",
          "languageName": {
            "runs": [
              {
                "text": "한국말 - 韩语"
              }
            ]
          }
        },
        {
          "languageCode": "ha",
          "languageName": {
            "runs": [
              {
                "text": "هَوُسَ - 豪萨语"
              }
            ]
          }
        },
        {
          "languageCode": "nl",
          "languageName": {
            "runs": [
              {
                "text": "Nederlands - 荷兰语"
              }
            ]
          }
        },
        {
          "languageCode": "gl",
          "languageName": {
            "runs": [
              {
                "text": "Galego - 加利西亚语"
              }
            ]
          }
        },
        {
          "languageCode": "ca",
          "languageName": {
            "runs": [
              {
                "text": "Català - 加泰罗尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "cs",
          "languageName": {
            "runs": [
              {
                "text": "Čeština - 捷克语"
              }
            ]
          }
        },
        {
          "languageCode": "kn",
          "languageName": {
            "runs": [
              {
                "text": "ಕನ್ನಡ - 卡纳达语"
              }
            ]
          }
        },
        {
          "languageCode": "ky",
          "languageName": {
            "runs": [
              {
                "text": "Кыргызча - 吉尔吉斯语"
              }
            ]
          }
        },
        {
          "languageCode": "xh",
          "languageName": {
            "runs": [
              {
                "text": "isiXhosa - 科萨语"
              }
            ]
          }
        },
        {
          "languageCode": "co",
          "languageName": {
            "runs": [
              {
                "text": "Corsu - 科西嘉语"
              }
            ]
          }
        },
        {
          "languageCode": "hr",
          "languageName": {
            "runs": [
              {
                "text": "Hrvatski - 克罗地亚语"
              }
            ]
          }
        },
        {
          "languageCode": "qu",
          "languageName": {
            "runs": [
              {
                "text": "Runa Simi - 克丘亚语"
              }
            ]
          }
        },
        {
          "languageCode": "ku",
          "languageName": {
            "runs": [
              {
                "text": "Kurdî - 库尔德语"
              }
            ]
          }
        },
        {
          "languageCode": "la",
          "languageName": {
            "runs": [
              {
                "text": "lingua latīna - 拉丁语"
              }
            ]
          }
        },
        {
          "languageCode": "lv",
          "languageName": {
            "runs": [
              {
                "text": "Latviešu - 拉脱维亚语"
              }
            ]
          }
        },
        {
          "languageCode": "lo",
          "languageName": {
            "runs": [
              {
                "text": "ລາວ - 老挝语"
              }
            ]
          }
        },
        {
          "languageCode": "lt",
          "languageName": {
            "runs": [
              {
                "text": "Lietuvių - 立陶宛语"
              }
            ]
          }
        },
        {
          "languageCode": "ln",
          "languageName": {
            "runs": [
              {
                "text": "Lingála - 林加拉语"
              }
            ]
          }
        },
        {
          "languageCode": "lg",
          "languageName": {
            "runs": [
              {
                "text": "Luganda - 卢干达语"
              }
            ]
          }
        },
        {
          "languageCode": "lb",
          "languageName": {
            "runs": [
              {
                "text": "Lëtzebuergesch - 卢森堡语"
              }
            ]
          }
        },
        {
          "languageCode": "rw",
          "languageName": {
            "runs": [
              {
                "text": "Kinyarwanda - 卢旺达语"
              }
            ]
          }
        },
        {
          "languageCode": "ro",
          "languageName": {
            "runs": [
              {
                "text": "Română - 罗马尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "mt",
          "languageName": {
            "runs": [
              {
                "text": "Malti - 马耳他语"
              }
            ]
          }
        },
        {
          "languageCode": "mr",
          "languageName": {
            "runs": [
              {
                "text": "मराठी - 马拉地语"
              }
            ]
          }
        },
        {
          "languageCode": "mg",
          "languageName": {
            "runs": [
              {
                "text": "Malagasy - 马拉加斯语"
              }
            ]
          }
        },
        {
          "languageCode": "ml",
          "languageName": {
            "runs": [
              {
                "text": "മലയാളം - 马拉雅拉姆语"
              }
            ]
          }
        },
        {
          "languageCode": "ms",
          "languageName": {
            "runs": [
              {
                "text": "Bahasa Melayu - 马来语"
              }
            ]
          }
        },
        {
          "languageCode": "mk",
          "languageName": {
            "runs": [
              {
                "text": "македонски - 马其顿语"
              }
            ]
          }
        },
        {
          "languageCode": "mi",
          "languageName": {
            "runs": [
              {
                "text": "Māori - 毛利语"
              }
            ]
          }
        },
        {
          "languageCode": "mn",
          "languageName": {
            "runs": [
              {
                "text": "Монгол - 蒙古语"
              }
            ]
          }
        },
        {
          "languageCode": "bn",
          "languageName": {
            "runs": [
              {
                "text": "বাংলা - 孟加拉语"
              }
            ]
          }
        },
        {
          "languageCode": "my",
          "languageName": {
            "runs": [
              {
                "text": "ဗမာစာ - 缅甸语"
              }
            ]
          }
        },
        {
          "languageCode": "hmn",
          "languageName": {
            "runs": [
              {
                "text": "Hmoob - 苗语"
              }
            ]
          }
        },
        {
          "languageCode": "af",
          "languageName": {
            "runs": [
              {
                "text": "Afrikaans - 南非荷兰语"
              }
            ]
          }
        },
        {
          "languageCode": "st",
          "languageName": {
            "runs": [
              {
                "text": "Sesotho - 南索托语"
              }
            ]
          }
        },
        {
          "languageCode": "ne",
          "languageName": {
            "runs": [
              {
                "text": "नेपाली - 尼泊尔语"
              }
            ]
          }
        },
        {
          "languageCode": "no",
          "languageName": {
            "runs": [
              {
                "text": "Norsk - 挪威语"
              }
            ]
          }
        },
        {
          "languageCode": "pa",
          "languageName": {
            "runs": [
              {
                "text": "ਪੰਜਾਬੀ - 旁遮普语"
              }
            ]
          }
        },
        {
          "languageCode": "pt",
          "languageName": {
            "runs": [
              {
                "text": "Português - 葡萄牙语"
              }
            ]
          }
        },
        {
          "languageCode": "ps",
          "languageName": {
            "runs": [
              {
                "text": "پښتو - 普什图语"
              }
            ]
          }
        },
        {
          "languageCode": "ny",
          "languageName": {
            "runs": [
              {
                "text": "chiCheŵa - 齐切瓦语"
              }
            ]
          }
        },
        {
          "languageCode": "ja",
          "languageName": {
            "runs": [
              {
                "text": "日本語 - 日语"
              }
            ]
          }
        },
        {
          "languageCode": "sv",
          "languageName": {
            "runs": [
              {
                "text": "Svenska - 瑞典语"
              }
            ]
          }
        },
        {
          "languageCode": "sm",
          "languageName": {
            "runs": [
              {
                "text": "Gagana Samoa - 萨摩亚语"
              }
            ]
          }
        },
        {
          "languageCode": "sr",
          "languageName": {
            "runs": [
              {
                "text": "Српски језик - 塞尔维亚语"
              }
            ]
          }
        },
        {
          "languageCode": "si",
          "languageName": {
            "runs": [
              {
                "text": "සිංහල - 僧伽罗语"
              }
            ]
          }
        },
        {
          "languageCode": "sn",
          "languageName": {
            "runs": [
              {
                "text": "ChiShona - 绍纳语"
              }
            ]
          }
        },
        {
          "languageCode": "eo",
          "languageName": {
            "runs": [
              {
                "text": "Esperanto - 世界语"
              }
            ]
          }
        },
        {
          "languageCode": "sk",
          "languageName": {
            "runs": [
              {
                "text": "Slovenčina - 斯洛伐克语"
              }
            ]
          }
        },
        {
          "languageCode": "sl",
          "languageName": {
            "runs": [
              {
                "text": "Slovenščina - 斯洛文尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "sw",
          "languageName": {
            "runs": [
              {
                "text": "Kiswahili - 斯瓦希里语"
              }
            ]
          }
        },
        {
          "languageCode": "gd",
          "languageName": {
            "runs": [
              {
                "text": "Gàidhlig - 苏格兰盖尔语"
              }
            ]
          }
        },
        {
          "languageCode": "ceb",
          "languageName": {
            "runs": [
              {
                "text": "Cebuano - 宿务语"
              }
            ]
          }
        },
        {
          "languageCode": "so",
          "languageName": {
            "runs": [
              {
                "text": "Soomaaliga - 索马里语"
              }
            ]
          }
        },
        {
          "languageCode": "tg",
          "languageName": {
            "runs": [
              {
                "text": "тоҷикӣ - 塔吉克语"
              }
            ]
          }
        },
        {
          "languageCode": "te",
          "languageName": {
            "runs": [
              {
                "text": "తెలుగు - 泰卢固语"
              }
            ]
          }
        },
        {
          "languageCode": "ta",
          "languageName": {
            "runs": [
              {
                "text": "தமிழ் - 泰米尔语"
              }
            ]
          }
        },
        {
          "languageCode": "th",
          "languageName": {
            "runs": [
              {
                "text": "ไทย - 泰语"
              }
            ]
          }
        },
        {
          "languageCode": "ti",
          "languageName": {
            "runs": [
              {
                "text": "ትግርኛ - 提格利尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "tr",
          "languageName": {
            "runs": [
              {
                "text": "Türkçe - 土耳其语"
              }
            ]
          }
        },
        {
          "languageCode": "tk",
          "languageName": {
            "runs": [
              {
                "text": "Türkmen - 土库曼语"
              }
            ]
          }
        },
        {
          "languageCode": "cy",
          "languageName": {
            "runs": [
              {
                "text": "Cymraeg - 威尔士语"
              }
            ]
          }
        },
        {
          "languageCode": "ug",
          "languageName": {
            "runs": [
              {
                "text": "ئۇيغۇرچە - 维吾尔语"
              }
            ]
          }
        },
        {
          "languageCode": "und",
          "languageName": {
            "runs": [
              {
                "text": "Unknown - 未知语言"
              }
            ]
          }
        },
        {
          "languageCode": "ur",
          "languageName": {
            "runs": [
              {
                "text": "اردو - 乌尔都语"
              }
            ]
          }
        },
        {
          "languageCode": "uk",
          "languageName": {
            "runs": [
              {
                "text": "Українська - 乌克兰语"
              }
            ]
          }
        },
        {
          "languageCode": "uz",
          "languageName": {
            "runs": [
              {
                "text": "O‘zbek - 乌兹别克语"
              }
            ]
          }
        },
        {
          "languageCode": "es",
          "languageName": {
            "runs": [
              {
                "text": "Español - 西班牙语"
              }
            ]
          }
        },
        {
          "languageCode": "fy",
          "languageName": {
            "runs": [
              {
                "text": "Frysk - 西弗里西亚语"
              }
            ]
          }
        },
        {
          "languageCode": "iw",
          "languageName": {
            "runs": [
              {
                "text": "עברית - 希伯来语"
              }
            ]
          }
        },
        {
          "languageCode": "el",
          "languageName": {
            "runs": [
              {
                "text": "Ελληνικά - 希腊语"
              }
            ]
          }
        },
        {
          "languageCode": "haw",
          "languageName": {
            "runs": [
              {
                "text": "ʻŌlelo Hawaiʻi - 夏威夷语"
              }
            ]
          }
        },
        {
          "languageCode": "sd",
          "languageName": {
            "runs": [
              {
                "text": "سنڌي - 信德语"
              }
            ]
          }
        },
        {
          "languageCode": "hu",
          "languageName": {
            "runs": [
              {
                "text": "Magyar - 匈牙利语"
              }
            ]
          }
        },
        {
          "languageCode": "su",
          "languageName": {
            "runs": [
              {
                "text": "Basa Sunda - 巽他语"
              }
            ]
          }
        },
        {
          "languageCode": "hy",
          "languageName": {
            "runs": [
              {
                "text": "Հայերեն - 亚美尼亚语"
              }
            ]
          }
        },
        {
          "languageCode": "ig",
          "languageName": {
            "runs": [
              {
                "text": "Igbo - 伊博语"
              }
            ]
          }
        },
        {
          "languageCode": "it",
          "languageName": {
            "runs": [
              {
                "text": "Italiano - 意大利语"
              }
            ]
          }
        },
        {
          "languageCode": "yi",
          "languageName": {
            "runs": [
              {
                "text": "ייִדיש - 意第绪语"
              }
            ]
          }
        },
        {
          "languageCode": "hi",
          "languageName": {
            "runs": [
              {
                "text": "हिन्दी - 印地语"
              }
            ]
          }
        },
        {
          "languageCode": "id",
          "languageName": {
            "runs": [
              {
                "text": "Bahasa Indonesia - 印度尼西亚语"
              }
            ]
          }
        },
        {
          "languageCode": "en",
          "languageName": {
            "runs": [
              {
                "text": "English - 英语"
              }
            ]
          }
        },
        {
          "languageCode": "yo",
          "languageName": {
            "runs": [
              {
                "text": "Yorùbá - 约鲁巴语"
              }
            ]
          }
        },
        {
          "languageCode": "vi",
          "languageName": {
            "runs": [
              {
                "text": "Tiếng Việt - 越南语"
              }
            ]
          }
        },
        {
          "languageCode": "jv",
          "languageName": {
            "runs": [
              {
                "text": "Basa Jawa - 爪哇语"
              }
            ]
          }
        },
        {
          "languageCode": "zh-Hant",
          "languageName": {
            "runs": [
              {
                "text": "中文（繁體） - 中文（繁体）"
              }
            ]
          }
        },
        {
          "languageCode": "zh-Hans",
          "languageName": {
            "runs": [
              {
                "text": "中文（简体）"
              }
            ]
          }
        },
        {
          "languageCode": "zu",
          "languageName": {
            "runs": [
              {
                "text": "isiZulu - 祖鲁语"
              }
            ]
          }
        },
        {
          "languageCode": "kri",
          "languageName": {
            "runs": [
              {
                "text": "Krìì - 克里语"
              }
            ]
          }
        }
      ]

      if (!obj?.defaultCaptionTrackIndex) obj.defaultCaptionTrackIndex = 0
      stack.length = 0
    })

    this.iterate(this.message, 'audioTracks', (obj, stack) => {
      // obj 就是 playerCaptionsTracklistRenderer
      const audioTracks = obj.audioTracks
      if (Array.isArray(audioTracks)) {
        // 有基础音轨
        for (const audioTrack of audioTracks) {
          audioTrack.visibility = 2 //"ON";
					audioTrack.hasDefaultTrack = true;
					audioTrack.captionsInitialState = 3 //"CAPTIONS_INITIAL_STATE_ON_RECOMMENDED";
        }
      }
      stack.length = 0
    })

    this.needProcess = true
    return this
  }

  toBinary (): Uint8Array {
    return Player.toBinary(this.message)
  }
}

export class SearchMessage extends BrowseMessage {
  constructor (name: string = 'Search') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Search.fromBinary(binaryBody)
    return this
  }

  toBinary (): Uint8Array {
    return Search.toBinary(this.message)
  }
}

export class ShortsMessage extends YouTubeMessage {
  constructor (name: string = 'Shorts') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Shorts.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    const shortsRawLength = this.message.t1F2?.length
    if (shortsRawLength) {
      for (let i = shortsRawLength - 1; i >= 0; i--) {
        if (!this.message.t1F2[i].n2F1?.n3F139608561?.n4F8) {
          this.message.t1F2.splice(i, 1)
          this.needProcess = true
        }
      }
    }
    return this
  }

  toBinary (): Uint8Array {
    return Shorts.toBinary(this.message)
  }
}

export class GuideMessage extends YouTubeMessage {
  constructor (name: string = 'Guide') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Guide.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    this.iterate(this.message, 'g3F1', (obj) => {
      for (let i = obj.g3F1.length - 1; i >= 0; i--) {
        if (this.isUpload(obj.g3F1[i])) {
          obj.g3F1.splice(i, 1)
        }
      }
    })
    return this
  }

  toBinary (): Uint8Array {
    return Guide.toBinary(this.message)
  }
}

// export class LogMessage extends YouTubeMessage {
//   constructor (name: string = 'Log') {
//     super( name)
//   }
//
//   fromBinary (binaryBody): void {
//     this.message = Log.fromBinary(binaryBody)
//   }
//
//   pure (): void {
//     this.iterate(this.message, 'pip', (obj) => {
//       if (!obj.pip) {
//         obj.pip = 1
//         this.needProcess = true
//       }
//     })
//   }
//
//   toBinary (): void {
//     this.body = Log.toBinary(this.message)
//   }
// }

export class SettingMessage extends YouTubeMessage {
  constructor (name: string = 'Setting') {
    super(name)
  }

  fromBinary (binaryBody): this {
    this.message = Setting.fromBinary(binaryBody)
    return this
  }

  pure (): this {
    // 增加 PIP
    this.iterate(this.message, 'num', (obj) => {
      if (obj.num === 10005) {
        const st3F5 = {
          f1: 135,
          f2: 20434,
          f3: 2,
          st2F4: this.message.st1F10.st2F4
        }
        const fakePIP = {
          st4F61331416: {
            f15: 0,
            st5F5: {
              st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 1
                }
              }
            },
            st5F6: {
              st3F5,
              st6F81212182: {
                st7F1: {
                  st8F1: { f1: 151 },
                  f3: 0
                }
              }
            },
            st3F5
          }
        }
        obj.st3F3.push(fakePIP)
      }
    })
    // 增加后台播放
    const fakeF88478200 = {
      st2F88478200: {
        // st3F1: { st4F1: { title: 'Background & downloads' } },
        f2: 1,
        f3: 1,
        st3F5: {
          f1: 2,
          f2: 20020,
          f3: 8,
          st2F4: this.message.st1F10.st2F4
        },
        f6: 0,
        f7: 1,
        f8: 1,
        f9: 1,
        f10: 1,
        f12: 1
      }
    }
    // deep copy
    this.message.st1F6.push(JSON.parse(JSON.stringify(fakeF88478200)))
    fakeF88478200.st2F88478200.st3F5.f1 = 1
    fakeF88478200.st2F88478200.st3F5.f3 = 9
    this.message.st1F7 = fakeF88478200
    this.needProcess = true
    return this
  }

  toBinary (): Uint8Array {
    return Setting.toBinary(this.message)
  }
}
