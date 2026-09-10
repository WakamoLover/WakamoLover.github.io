import { ContentType, Post } from '../types';

export const MEDIA_ITEMS: Omit<Post, 'id'>[] = [
// Bilibili
  {
    title: 'MODARE',
    description: '',
    coverImage: 'https://i0.hdslb.com/bfs/face/5237b268dd7bae556e5c5642ca32efedf19e7692.jpg@96w_96h.webp',
    type: ContentType.VIDEO,
    category: 'Bilibili',
    channelUrl: 'https://space.bilibili.com/3546765003327922'
  } as any,
  {
    title: 'Matcha',
    description: '',
    coverImage: 'https://i0.hdslb.com/bfs/garb/86ece6d65ee0730b494c6a962afae15c0d27316b.png@96w_96h.webp',
    type: ContentType.VIDEO,
    category: 'Bilibili',
    channelUrl: 'https://space.bilibili.com/653812'
  } as any,
  {
    title: 'IYun',
    description: '',
    coverImage: 'https://i0.hdslb.com/bfs/face/1ee4b0cfccd340cbf070a822032c7310b6ee3b08.jpg@160w_160h_1c_1s.webp',
    type: ContentType.VIDEO,
    category: 'Bilibili',
    channelUrl: 'https://space.bilibili.com/7329814'
  } as any,

// YouTube
  {
    title: 'SINI42',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/TDZL3_bz8U5WhiUZTgzKTf8lHDsENcBWAd82anlzxb4NhZNnfpxJgTIUaYJtWgk7cVBXN1vi=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@sini4222'
  } as any,
  {
    title: 'HxxG',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/Ha7So-t8QYKEsUALn0eIm-uXhYBC6SSTwvqytmgu8g_LyW31FncpuPiLIaZ7q8mvAkysMUwU=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@HxxG'
  } as any,
  {
    title: 'Naoki Saito',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/gZ4ZQwhqle9_SehIS96ALDaeSvxOAN10sfeQPHYdCB1Skk87NYfWKjD1P5xvifFZZXKsC_2vVng=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@saitonaoki2'
  } as any,
  {
    title: 'hide channel',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_lFCgPZEcMaLPjZfeamxUBICw610j3DqpGjgcuPU0Q=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@hidechannel2'
  } as any,
  {
    title: 'Leviathan',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_l21JVYWjsSufP_gRqYh5uv34qWvN_UmNwQ3J3Ur9ZOe7k=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@leviathan0902'
  } as any,
  {
    title: 'Nekojira',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/DsLwmbT5mXKFNNunXLCg65DCsk4TSb7i2NGqU_K3RPDp8gVKsVuVWWCtlkYdK6JkS0TWTfU80Q=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@nekojira425'
  } as any,
  {
    title: 'Nvqsvr',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/lForZKUYppWJpRNh_EU8qr7THknY5M6LLI8IbrHNiovMt5pxMimx34i96__P0PENbe01HM5AJw=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@Nvqsvr'
  } as any,
  {
    title: 'redjuice',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_mNECUBbWZwtbFD7JUvShzJxMvR4mAYQSIvMO45rdzsEWA=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@redjuicegraphics'
  } as any,
  {
    title: 'RITY',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/4AVr2m-gwXLN2_6wgCpOuOHPL8D_NIlZMjLefAysmR2KeBUV31aH8Omt5bYqiNpimILi85fp=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@k_rity'
  } as any,
  {
    title: 'rurudo',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/iPABH9tEiZOZvxOuaaoGFFjAbH8bMtKGJ7JFvzspRjwjC00O4net65HHn-mSCcIsNPBxfuL8kQ=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@rurudot'
  } as any,
  {
    title: 'Toga',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/hrGMB1Q_RiR4H_GQkuM1kSwnHfO7o3EJELGAvevRaYczeMOBHYYV0VSg_Ru3pHNH1XkL4Vke7B4=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@Toganawa_ch'
  } as any,
  {
    title: 'yu-ri',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ItlcsBAn7xzWdaFuzT9jmh7b8-o62OS6-KTSoIt2UQGPDBHnoFkcf6a6Ul-5IX8rDqcMXo3_4A=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@yu-rimizlogschannel3423'
  } as any,
  {
    title: 'kyockcho',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/lyR4YyfIR-xal3o_OIzEIxc3Inl_TBknJc7j4_0Z56lb7EaJxuPplEAejatyKsbo9PI-rpN6FQ=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kyockchoV'
  } as any,
  {
    title: 'Agyou',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/DILMG74p4unZuGg-NC9edmgiUGbALvm97v1WHV-68mYCO4xQ9bkcVuSWAh5oImZwjATEAFZtn6c=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@agyou_movie'
  } as any,
  {
    title: 'Kionaoki',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/05U05L-U5JSicy4zf6vhTNEf6vzvQbHv8vy89XjMt1jqcrylPfturuFNi8HtFQDawU19zWLWR2k=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kionaoki2501'
  } as any,
  {
    title: 'mm',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/Us4UAOn4v0EttcdqJnSPXIk1VSfvVr_5YUpcKMhh5DaA8zBc546q6nXgl5_kP0A8k7Rmfbf7=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@user-cm2co1hw2u'
  } as any,
  {
    title: 'gozenjuziame',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_mn-ChSqxbmeGdCZZVSF7w1MqonFBWZnt3q_uGV9iNKBw=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@%E5%8D%88%E5%89%8D%E5%8D%81%E6%99%82%E9%9B%A8'
  } as any,
  {
    title: 'lack',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_nwPEVygomIpt4e0GTFSmf5cFoKTa9GyrLSwJM73zNe5A=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@lackism'
  } as any,
  {
    title: 'Zumizumi',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/p3gSELnRCRGpqb9dy_La-KsNPj5oQxxdWhuwrj_DHYtedpuLZY204tkL3devcf8wyKAhcNdApQ=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@Zumizumi1254'
  } as any,
  {
    title: 'ki minwoo',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/0o_hmNgE0ZtLyZtZMwHbAjd-CNBRd5qKPmz8HnrygSZCLQCUVqZiKvK5ezBk2o1t_U_1377T=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kiminwoo4933'
  } as any,
  {
    title: 'Rockhe Kim',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_kypDi6xOcffNAukO3wxRV4n3t4-oDartNuBwrPg7QapyE=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@rockhekim'
  } as any,
  {
    title: 'DDUCK KONG',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/tzNSAWVVzQQ8Yinvj_hLIjTs2DIHxaEIkgorwVBcUP_jBnB70iWyei4Ia_C__9QGJvTVGI69fpY=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@dduckkong'
  } as any,
  {
    title: 'D.Ramz',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/FlIetHiE044atfnt8Bw5rgfna0ZRzXiRsOO2II6Pk-f55TvS4XNeWNifhFaWJphWFWbYGOAV=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@dramz89'
  } as any,
  {
    title: 'seorang',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/tUAP_psBReKdm946Rflyjidr1ktoYenJr4c_ZBAxx7evJJeXUC70deCKApXFJlMQ6lvm2GyYtKI=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@seorang_sr'
  } as any,
  {
    title: 'Sjoop',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/cmvzSlAI1cXArLJ4Dj2XvgVrcEWdrFlty3SHZhMaTIoWlKnnbzmxOLPyelVCyKQQqqXFSCSQ4g=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@shycocoa_illust'
  } as any,
  {
    title: 'Toki Murasaki',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/Qgen2AAH2JsO3wdS2SZNkZ0L-X_RMmxXvAqj-d23N13WgpL7oJXexJwuz8dLamTp5QGUz8n2=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@tokimurasaki'
  } as any,
  {
    title: 'Yenkoes',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/c2cDAF3J0JTKe2vO4b1sezp9rF1X76Jrr993TU-xyB4p7cE_b_AYeWh1dy_w6VQtPg693WiXMA=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@yenkoes'
  } as any,
  {
    title: 'kuzuvine',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/7kRSKuBJVkuyX0p7YMgnuj3kuyaLwPFkBIPOykvHxyl7ecqQqJsYo-0v5DLREsYMTn8D8xRYTw=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kuzuvine'
  } as any,
  {
    title: 'Yotsumi Shiro',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/qd1xxEMHaLVR7aOqiOoNAgHWBhpwsJSAqMQh-VJuAABidu367nnJR18z0R8AzRwjOUcV9uwffg=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@YotsumiShiro'
  } as any,
  {
    title: 'kakage',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_kJqgJLG0BdJZtaWtjkRqvfdMBoo_Ux9zpdnHqmJJDF4lo=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kakage_truth'
  } as any,
  {
    title: 'Ixy',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/YGF9URNFhAlrgqqig0eqVXynVMff07um_4r4UTM5JIGB4oWoSzPNcKF_J-OlUwFRlnFSCaGD=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@ixy'
  } as any,
  {
    title: 'Neg',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_lCQSTtMJ-Jue0fRNhdZDjdNZ6kyCORin47ugkkoP3oqQ=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@negillustration7151'
  } as any,
  {
    title: 'SUNGMOOMOO',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/tIhz8OIOHmVQWFQsZs2TeNcKiH0Zt2JMKdDj3vlcfqF4zKFFzeeUDeyCpvTcX4RhVjC8RKmK=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@%EC%84%B1%EB%AC%B4%EB%AC%B4_sungmoomoo'
  } as any,
  {
    title: 'ANIZI',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/1TmGbO8DbY6VwEw60Tobs_uPpyGKasAjmlzGipY5iQEbkQtpQz15ARujg3g5euDz9X0mxs6zmVY=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@anizi000'
  } as any,
  {
    title: 'floomf',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/K8mLFJU2uImbSZp6vXqyyTlpuPcTc7He0zQCHWTnbjEt3zDnGHOJL3kW-g70Po2cWnpRIVVRBA=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@fluumf'
  } as any,
  {
    title: 'seeshin',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/SJZFBOTiiVi0XYEHYf_zBrJpZnEARvGo0o03BzLIxqVZnFWC0uhVuY5A-E4IszTmrhDxigPxlA=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@seeshin_see'
  } as any,
  {
    title: 'Monoco55',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/hASkB8by9B5dc3n44OWxb-tP99XjCaHmaMcvgsCiY-6hGS9rraBJ8tnE7yKj_YnJE_MQ6Y8fmH4=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@monoco55'
  } as any,
  {
    title: 'ye_jji',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/cpgwt51wJ5lt05GWYhmscjlBXlIq82r9jMHVJWuAvpMQa0-k9s6UCVUsWD_-vruRr-SqLFoSQTk=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@y_e_j_j_i_'
  } as any,
  {
    title: 'happyend404',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ElpDN3uoTSCdbwFEKKaDAg9hJSM8_VG7VxHxEyJRIXqgEsu9MCKHSP8tieSZ99T36lXvs6hO3w=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@%E3%82%AB%E3%83%944x2'
  } as any,
  {
    title: 'foritis wang',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_lMX2M9JogJxULuco3GDEHKcfRBLtOGaW6Xs2SmD7vektA=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@foritiswang'
  } as any,
  {
    title: 'Kitazume Kumin',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/IFYLn51brJ2D9UPtx2L3YoGUN7p3HPQajjsyTM68WH6wdCkkVX_Hq5kN-gJ3TuowHcqAe1Le=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@%E5%8C%97%E7%88%AA%E3%81%8F%E3%81%BF%E3%82%93'
  } as any,
  {
    title: 'azit',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/gsIDKFmBfQoaXqkB37XiX5yZP1EfHQmkZ8MmyuPumkKhHIvSIMdrO4qt-Y6rUlTxtaYFh3WW=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@kns661000'
  } as any,
  {
    title: 'Macciatto',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/M822QmGJ541qmFBqYACan49QKBdtIB_VQV5etsOqfpJ3tPScTbz6ukIbZ8-JSiMq_1M5d6bqasc=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@macciatto'
  } as any,
  {
    title: 'FEVERCELL',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/Wv3bsg8dpVoGLxUbff_KE-MkQLxJzIeaLG3wUmEfBz2u_YeE-bHmo8Q-8O1bpZf-VDrLo_w6ZQ=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@FEVERCELL_official'
  } as any,
  {
    title: 'PROPIC',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_l0u9AW8u6R5XmB_Y27Sals_G4wkHZ9Zk-BiEDVjJ5Amw0=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@propic6921'
  } as any,
  {
    title: 'RAUM ACADEMY',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/t4zXZvU2DQj_5ilVUU0E6cnU_DDLbRhTbdl540_Eibpr8TYQRb4KJ3rONlKWh9uvYp2YFbfd=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@RAUMACADEMY'
  } as any,
  {
    title: 'BWs Darakbang',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/qtTXJ4r9thE9B4uFf3U8_MSD8uHmMr_pM-Sdm9ylFTYMcvDVYfc_lwM8eNHUyThV45floHTGiv0=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@bw_darakbang'
  } as any,
  {
    title: 'OSSEM',
    description: '',
    coverImage: 'https://yt3.googleusercontent.com/ytc/AIdro_l0wn24wRpV6eLegC_yMo6JwgNxrvGS2Q_hE540pWv41Q=s160-c-k-c0x00ffffff-no-rj',
    type: ContentType.VIDEO,
    category: 'YouTube',
    channelUrl: 'https://www.youtube.com/@%EC%98%A4%EC%8C%A4%EC%9D%B8%EC%B2%B4%ED%95%B4%EB%B6%80%ED%95%99'
  } as any,
];