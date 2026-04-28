const data = [
  // ===== MOBILE (Android / iOS) =====

  // Arceus X NEO
  {id:1,name:'Arceus X NEO',rating:4.5,avatar:'https://files.catbox.moe/6l8y21.webp',version:'2.717.985',versionVng:'2.716.875',status:'online',statusVng:'offline',platforms:['android'],downloadUrl:'https://android.spdmteam.com/',downloadVngUrl:'https://vng.spdmteam.com/'},
  {id:2,name:'Arceus X NEO',rating:4.5,avatar:'https://files.catbox.moe/6l8y21.webp',version:'2.668.658',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:'https://ios.spdmteam.com/',downloadVngUrl:null},

  // Codex
  {id:3,name:'Codex',rating:4.8,avatar:'https://files.catbox.moe/t43q3r.webp',version:'2.716.875',versionVng:'2.716.875',status:'offline',statusVng:'offline',platforms:['android'],downloadUrl:'https://www.mediafire.com/file/4cadggxj7k5vktx/Codex+v2.716.apk/file',downloadVngUrl:'https://www.mediafire.com/file/rckpim3rs9boo20/Code+X+VNG+V2.716+Font+Ch%E1%BB%AF+Th%C6%B0%E1%BB%9Dng.apk/file'},
  {id:4,name:'Codex',rating:4.8,avatar:'https://files.catbox.moe/t43q3r.webp',version:'2.674.782',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:'https://www.mediafire.com/file/7afzer5xxo1110n/Codex_2.674.782.ipa/file',downloadVngUrl:null},

  // Cryptic
  {id:5,name:'Cryptic',rating:4.6,avatar:'https://img.upanh.moe/ychnyqVn/e8578fff456f.png',version:'2.710.707',versionVng:'2.710.706',status:'offline',statusVng:'offline',platforms:['android'],downloadUrl:'https://www.mediafire.com/file/p2bnbixk4pxpl25/Cryptic_APK_2.710.707.apk/file',downloadVngUrl:'https://www.mediafire.com/file/s4r9rluhwy9j8cs/Cryptic_VNG_APK_2.710.706.apk/file'},
  {id:6,name:'Cryptic',rating:4.6,avatar:'https://img.upanh.moe/ychnyqVn/e8578fff456f.png',version:'2.668.660',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:null,downloadVngUrl:null},

  // Delta
  {id:7,name:'Delta',rating:4.9,avatar:'https://deltaexploits.gg/assets/favicon.ico',version:'2.718.1110',versionVng:'2.717.985',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://gloopup.net/Delta/android/',downloadVngUrl:'https://gloopup.net/Delta/android_vn/'},
  {id:8,name:'Delta',rating:4.9,avatar:'https://deltaexploits.gg/assets/favicon.ico',version:'2.717.982',versionVng:'2.717.982',status:'online',statusVng:'online',platforms:['ios'],downloadUrl:'https://gloopup.net/Delta/ios/',downloadVngUrl:'https://tinyurl.com/3jyc6a6w'},

  // Trigon
  {id:9,name:'Trigon',rating:4.5,avatar:'https://img.upanh.moe/ynRPDwBx/81e69e89eab4.webp',version:'2.717.985',versionVng:'2.708.880',status:'online',statusVng:'offline',platforms:['android'],downloadUrl:'https://bom.so/dohSwV',downloadVngUrl:'https://www.mediafire.com/file/cyd1thmejxujgdp/Trigon+VNG+V2.708.apk/file'},

  // Vega X
  {id:10,name:'Vega X',rating:4.4,avatar:'https://vegax.gg/assets/img/V_logo_white.png',version:'2.717.985',versionVng:null,status:'online',statusVng:null,platforms:['android'],downloadUrl:'https://github.com/1f0yt/community/releases',downloadVngUrl:null},
  
  // Ronix
  {id:11,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'2.710.707',versionVng:'2.710.706',status:'offline',statusVng:'offline',platforms:['android'],downloadUrl:'https://wrdcdn.net/r/154522/1772697006689/Ronix_64Bits-2.710.707.apk',downloadVngUrl:'https://wrdcdn.net/r/154522/1772783652438/Ronix_VNG_64Bits-2.710.706.apk'},
  {id:12,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'2.710.706',versionVng:'2.709.869',status:'offline',statusVng:'offline',platforms:['ios'],downloadUrl:'https://wrdcdn.net/r/154522/1773010059973/Ronix_2.710.706-3.ipa',downloadVngUrl:'https://wrdcdn.net/r/154522/1772929519604/Ronix%20VN_2.709.869.ipa'},
  
  // ===== PC (Windows) =====

  {id:13,name:'Bunni.lol',rating:4.6,avatar:'https://files.catbox.moe/hd9264.webp',version:'db4634f0e27d4d36',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://bunni.fun/',downloadVngUrl:null},
  {id:14,name:'Velocity',rating:4.4,avatar:'https://files.catbox.moe/tj6brv.png',version:'2e6461290a3541f5',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://gofile.io/d/SeOzyy',downloadVngUrl:null},
  {id:15,name:'Swift',rating:4.8,avatar:'https://files.catbox.moe/5krpqt.webp',version:'89b6c70d8f7f42ac',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://getswift.vip/',downloadVngUrl:null},
  {id:16,name:'Trigon',rating:4.2,avatar:'https://img.upanh.moe/ynRPDwBx/81e69e89eab4.webp',version:'d599f7fc52a8404c',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://trigonevo.com/download?os=windows&fs=mediafire',downloadVngUrl:null},
  {id:17,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'df7528517c6849f7',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://wrdcdn.net/r/154522/1769203129478/RonixInstaller_NEW.exe',downloadVngUrl:null},
  {id:18,name:'Madium',rating:4.6,avatar:'https://files.catbox.moe/c6crdn.webp',version:'390ba09e7e944154',versionVng:null,status:'online',statusVng:null,platforms:['windows'],downloadUrl:'https://gofile.io/d/MYmIqW',downloadVngUrl:null},
];
