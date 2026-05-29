// ============================================================
// PORTFOLIO CONSTANTS — Edit this file to customize your site
// ============================================================

export const PORTFOLIO_CONFIG = {
  // ─── Personal Info ───────────────────────────────────────
  personalInfo: {
    fullName: "Dương Đức Cương",
    nickname: "Shio",
    dob: "22/07/2009",
    age: 16,
    gender: "Nam",
    nationality: "Việt Nam",
    role: "Junior Developer | THPT Chuyên Trần Phú",
    phone: "0941994209",
    email: "duongduccuong943@gmail.com",
  },

  // ─── Social Media ────────────────────────────────────────
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      url: "https://www.facebook.com/uacaiqqjz",
      // Gradient: facebook blue
      gradient: "from-blue-500 to-blue-700",
      icon: "facebook",
      color: "#1877F2",
    },
    {
      id: "tiktok",
      label: "TikTok",
      url: "https://www.tiktok.com/@ditc0nmedoitenkhovl",
      gradient: "from-pink-500 to-black",
      icon: "tiktok",
      color: "#010101",
    },
    {
      id: "discord",
      label: "Discord",
      url: "https://discord.gg/g3VVJag7Hv",
      gradient: "from-indigo-500 to-indigo-700",
      icon: "discord",
      color: "#5865F2",
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/ShioVn",
      gradient: "from-gray-700 to-gray-900",
      icon: "github",
      color: "#333",
    },
  ],

  // ─── Projects ─────────────────────────────────────────────
  projects: [
    {
      id: "stem-club",
      title: "CTP STEM Club",
      descriptionVi: "Website câu lạc bộ STEM của trường THPT chuyên Trần Phú, giúp học sinh tiếp cận khoa học công nghệ qua các sự kiện, bài viết và hoạt động phong trào.",
      descriptionEn: "The STEM Club website for THPT Chuyên Trần Phú, helping students access science and technology through events, articles and activities.",
      repo: "https://github.com/ShioVn/CTP-STEM_CLUB",
      live: "#",
      image: "/images/STEM.png",
      imageClass: "object-cover",
      tech: ["Next.js", "TailwindCSS", "TypeScript"],
      status: "completed",
      year: "2026",
    },
    {
      id: "shoppeet",
      title: "Shoppeet",
      descriptionVi: "Website thương mại điện tử đầu tay của mình! Dự án học tập giúp mình hiểu rõ hơn về full-stack development, từ giao diện người dùng cho đến backend API.",
      descriptionEn: "My very first e-commerce website! A learning project that helped me understand full-stack development, from the UI to backend APIs.",
      repo: "https://github.com/ShioVn/Shoppeet",
      live: "#",
      image: "/images/Shoppet.png",
      imageClass: "object-contain p-6",
      tech: ["html", "css", "javascript"],
      status: "completed",
      year: "2025",
    },
  ],

  // ─── Gaming Hub ─────────────────────────────────────────
  // TODO: Add your in-game name for each game
  games: [
    {
      id: "valorant",
      name: "Valorant",
      inGameName: "Shio#2222",  // TODO: Update with real username
      rank: "Bronze (Mới chơi)", // TODO: Update rank
      icon: "https://img.icons8.com/?size=100&id=aUZxT3Erwill&format=png&color=000000",
      color: "#FF4655",
      gradient: "from-red-500 to-rose-800",
    },
    {
      id: "tft",
      name: "TFT",
      inGameName: "Shio#2222",  // TODO: Update
      rank: "Master",
      icon: "https://img.icons8.com/?size=100&id=SVRT7ZV6TY5h&format=png&color=000000",
      color: "#C08B00",
      gradient: "from-yellow-500 to-amber-700",
    },
    {
      id: "lienquan",
      name: "Liên Quân Mobile",
      inGameName: "Shio",  // TODO: Update
      rank: "Cao Thủ",
      icon: "https://upload.wikimedia.org/wikipedia/vi/9/93/Li%C3%AAn_quan_mobile.png",
      color: "#FFA500",
      gradient: "from-orange-400 to-orange-700",
    },
    {
      id: "roblox",
      name: "Roblox",
      inGameName: "idnoname001",  // TODO: Update
      rank: "Casual player",
      icon: "https://img.icons8.com/?size=100&id=62158&format=png&color=000000",
      color: "#E8192C",
      gradient: "from-red-400 to-red-700",
    },
    {
      id: "minecraft",
      name: "Minecraft",
      inGameName: "Zz_Shio_zZ",  // TODO: Update
      rank: "Survival/PVP enjoyer",
      icon: "https://img.icons8.com/?size=100&id=vcOcDfBIV6vB&format=png&color=000000",
      color: "#5D9B47",
      gradient: "from-green-500 to-green-800",
    },
  ],

  // ─── Skills ────────────────────────────────────────────
  skills: [
    { name: "Next.js",       emoji: "▲", color: "#000000", level: 75 },
    { name: "TypeScript",    emoji: "TS", color: "#3178C6", level: 70 },
    { name: "Tailwind CSS",  emoji: "🎨", color: "#06B6D4", level: 80 },
    { name: "React",         emoji: "⚛", color: "#61DAFB", level: 78 },
    { name: "Three.js",      emoji: "🔮", color: "#000000", level: 55 },
    { name: "Framer Motion", emoji: "🌀", color: "#BB4B96", level: 65 },
    { name: "Node.js",       emoji: "🟢", color: "#339933", level: 60 },
    { name: "MongoDB",       emoji: "🍃", color: "#47A248", level: 55 },
  ],

  // ─── GIFs — All public links, easy to swap ─────────────
  // To change a GIF, replace the URL with any Tenor/Giphy/Imgur public link
  gifs: {
    heroChibi: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3JwcDh1b2Uwd25kZWhoNnk1M2pwdXdoZDY0amljZzA4a2ZoeWtleiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4IKybi5zUz6nRGj19u/giphy.gif",
    heroCat:   "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnpwNXUyM293b2pvc3pjbnFrdXNzNGVvaHRoZnpqeWt4ZWlpcG80biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ldLAB7pnzwgPia1FAR/giphy.gif",
    heroStar:  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpxajAxamJ2M2JmYmxmbnc2bXVlemU5bjU5MmJ2Yjc4dGljdnJ0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dcTWjDFMv5FJsIpfJ7/giphy.gif",
    aboutRead: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGZrMHVybTgycHBlOTBwbHZtMXd6dHcyOTRtZGtpa2xqZndhdmhkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QZJWvscSbqydC7Ufsz/giphy.gif",
    gaming:    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjd0Y2V5ZzZzazIyMzAzNWoyc2Fycmh3cDM0ZWJzcXdkNmh2MTk4MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/b4DDD6yeLuI2vY3h1K/giphy.gif",
    valorant:  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWR6djNheWVxbDNma2p5dGFwczRleG13NHU2N2NwamF5aXIyMjZsaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5BfaceKmgvAL0TGNQ3/giphy.gif",
    hobbies:   "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGxjeDRqbWpwYm1ieGdubHhybDBsdzVhaGllYTkybTdrODhubWc5OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uBTWyINWTrWz6/giphy.gif",
    coding:    "https://media1.tenor.com/m/imCBndLheUIAAAAC/coding-anime.gif",
  },

  // ─── Music ─────────────────────────────────────────────
  music: {
    audioUrl: "/images/BGmusic.mp3",
    title: "Lofi Study Vibes",
  },
};
