const data = [
  // ===== MOBILE (Android / iOS) =====

  // Arceus X NEO
  {id:1,name:'Arceus X NEO',rating:4.5,avatar:'https://files.catbox.moe/6l8y21.webp',version:'2.708.880',versionVng:'2.707.735',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://android.spdmteam.com/',downloadVngUrl:'https://vng.spdmteam.com/'},
  {id:2,name:'Arceus X NEO',rating:4.5,avatar:'https://files.catbox.moe/6l8y21.webp',version:'2.668.658',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:'https://ios.spdmteam.com/',downloadVngUrl:null},

  // Codex
  {id:3,name:'Codex',rating:4.8,avatar:'https://files.catbox.moe/t43q3r.webp',version:'2.708.880',versionVng:'2.708.880',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://www.mediafire.com/file/r4amuil7pd7bebv/Codex+V2.708.880.apk/file',downloadVngUrl:'https://www.mediafire.com/file/borppm2mko3skas/CodeX+VNG+V2.708.apk/file'},
  {id:4,name:'Codex',rating:4.8,avatar:'https://files.catbox.moe/t43q3r.webp',version:'2.674.782',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:'https://www.mediafire.com/file/7afzer5xxo1110n/Codex_2.674.782.ipa/file',downloadVngUrl:null},

  // Cryptic
  {id:5,name:'Cryptic',rating:4.6,avatar:'https://img.upanh.moe/ychnyqVn/e8578fff456f.png',version:'2.708.880',versionVng:'2.707.735',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://www.mediafire.com/file/nyvuz8nr8r98lj6/Cryptic_APK_2.708.880.apk/file',downloadVngUrl:'https://www.mediafire.com/file/0heoyredl4suuqs/Cryptic_VNG_APK_2.707.735.apk/file'},
  {id:6,name:'Cryptic',rating:4.6,avatar:'https://img.upanh.moe/ychnyqVn/e8578fff456f.png',version:'2.668.660',versionVng:null,status:'offline',statusVng:null,platforms:['ios'],downloadUrl:null,downloadVngUrl:null},

  // Delta
  {id:7,name:'Delta',rating:4.9,avatar:'https://deltaexploits.gg/assets/favicon.ico',version:'2.708.880',versionVng:'2.707.735',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://gloopup.net/Delta/android/',downloadVngUrl:'https://www.mediafire.com/file/gxgr56i2sxk1yeh/Delta+X+VNG+V2.707.apk/file'},
  {id:8,name:'Delta',rating:4.9,avatar:'https://deltaexploits.gg/assets/favicon.ico',version:'2.708.880',versionVng:'2.709.980',status:'online',statusVng:'online',platforms:['ios'],downloadUrl:'https://gloopup.net/Delta/ios/',downloadVngUrl:'https://www.mediafire.com/file/v178w18tr937pgf/DeltaVN+V53+HuyMythic+New+Fix+Update.ipa/file'},

  // Trigon
  {id:9,name:'Trigon',rating:4.5,avatar:'https://img.upanh.moe/ynRPDwBx/81e69e89eab4.webp',version:'2.708.880',versionVng:'2.708.880',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://trigonevo.com/download?os=android&fs=Mediafire',downloadVngUrl:'https://www.mediafire.com/file/cyd1thmejxujgdp/Trigon+VNG+V2.708.apk/file'},

  // Vega X
  {id:10,name:'Vega X',rating:4.4,avatar:'https://vegax.gg/assets/img/V_logo_white.png',version:'2.708.880',versionVng:null,status:'online',statusVng:null,platforms:['android'],downloadUrl:'https://github.com/1f0yt/community/releases',downloadVngUrl:null},
  
  // Ronix
  {id:11,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'2.708.880',versionVng:'2.707.735',status:'online',statusVng:'online',platforms:['android'],downloadUrl:'https://wrdcdn.net/r/154522/1771863618680/Ronix_64Bits-2.708.880_NEW.apk',downloadVngUrl:'https://wrdcdn.net/r/154522/1771267795196/Ronix_VNG_64Bits-2.707.735.apk'},
  {id:12,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'2.709.873',versionVng:'2.709.873',status:'online',statusVng:'online',platforms:['ios'],downloadUrl:'https://wrdcdn.net/r/154522/1771864141368/Ronix_2.709.869-rel.ipa',downloadVngUrl:'https://wrdcdn.net/r/154522/1771864203342/RonixVN_NEW.ipa'},
  
  // ===== PC (Windows) =====

  {id:13,name:'Bunni.lol',rating:4.6,avatar:'https://files.catbox.moe/hd9264.webp',version:'db4634f0e27d4d36',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://bunni.fun/',downloadVngUrl:null},
  {id:14,name:'Velocity',rating:4.4,avatar:'https://files.catbox.moe/tj6brv.png',version:'df7528517c6849f7',versionVng:null,status:'online',statusVng:null,platforms:['windows'],downloadUrl:'https://gofile.io/d/v12Uk8',downloadVngUrl:null},
  {id:15,name:'Swift',rating:4.8,avatar:'https://files.catbox.moe/5krpqt.webp',version:'89b6c70d8f7f42ac',versionVng:null,status:'offline',statusVng:null,platforms:['windows'],downloadUrl:'https://getswift.vip/',downloadVngUrl:null},
  {id:16,name:'Trigon',rating:4.2,avatar:'https://img.upanh.moe/ynRPDwBx/81e69e89eab4.webp',version:'df7528517c6849f7',versionVng:null,status:'online',statusVng:null,platforms:['windows'],downloadUrl:'https://trigonevo.com/download?os=windows&fs=mediafire',downloadVngUrl:null},
  {id:17,name:'Ronix',rating:4.5,avatar:'https://obj.wearedevs.net/images/software/ronix/ronix-020426.webp',version:'df7528517c6849f7',versionVng:null,status:'online',statusVng:null,platforms:['windows'],downloadUrl:'https://wrdcdn.net/r/154522/1769203129478/RonixInstaller_NEW.exe',downloadVngUrl:null},
];
