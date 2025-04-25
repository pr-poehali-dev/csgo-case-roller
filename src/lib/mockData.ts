import { Case } from "@/components/CaseCard";

export const casesData: Case[] = [
  {
    id: "premium",
    name: "Премиум Кейс",
    price: 1999,
    image: "https://source.unsplash.com/random/240x240/?csgo,case,1",
    items: [
      { name: "AWP", skin: "Dragon Lore", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,1" },
      { name: "AK-47", skin: "Fire Serpent", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,2" },
      { name: "M4A4", skin: "Howl", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,3" },
      { name: "Desert Eagle", skin: "Blaze", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,4" },
      { name: "Glock-18", skin: "Fade", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,5" },
      { name: "USP-S", skin: "Kill Confirmed", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,6" },
      { name: "P250", skin: "Mehndi", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,7" },
      { name: "P90", skin: "Asiimov", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,8" }
    ]
  },
  {
    id: "knife",
    name: "Кейс с Ножами",
    price: 2999,
    image: "https://source.unsplash.com/random/240x240/?csgo,knife,1",
    items: [
      { name: "Karambit", skin: "Fade", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,knife,1" },
      { name: "M9 Bayonet", skin: "Crimson Web", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,knife,2" },
      { name: "Butterfly Knife", skin: "Doppler", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,knife,3" },
      { name: "Flip Knife", skin: "Marble Fade", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,knife,4" },
      { name: "Gut Knife", skin: "Tiger Tooth", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,knife,5" },
      { name: "Falchion Knife", skin: "Slaughter", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,knife,6" },
      { name: "Shadow Daggers", skin: "Blue Steel", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,knife,7" },
      { name: "Huntsman Knife", skin: "Case Hardened", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,knife,8" }
    ]
  },
  {
    id: "sniper",
    name: "Кейс Снайпера",
    price: 1499,
    image: "https://source.unsplash.com/random/240x240/?csgo,sniper,1",
    items: [
      { name: "AWP", skin: "Medusa", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,1" },
      { name: "AWP", skin: "Asiimov", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,2" },
      { name: "SSG 08", skin: "Blood in the Water", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,3" },
      { name: "AWP", skin: "Hyper Beast", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,4" },
      { name: "G3SG1", skin: "The Executioner", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,5" },
      { name: "SCAR-20", skin: "Bloodsport", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,6" },
      { name: "AWP", skin: "Electric Hive", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,7" },
      { name: "SSG 08", skin: "Dragonfire", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,sniper,8" }
    ]
  },
  {
    id: "pistol",
    name: "Кейс Пистолетов",
    price: 599,
    image: "https://source.unsplash.com/random/240x240/?csgo,pistol,1",
    items: [
      { name: "Desert Eagle", skin: "Golden Koi", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,1" },
      { name: "Five-Seven", skin: "Case Hardened", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,2" },
      { name: "Glock-18", skin: "Water Elemental", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,3" },
      { name: "USP-S", skin: "Neo-Noir", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,4" },
      { name: "P2000", skin: "Ocean Foam", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,5" },
      { name: "Tec-9", skin: "Nuclear Threat", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,6" },
      { name: "CZ75-Auto", skin: "The Fuschia Is Now", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,7" },
      { name: "P250", skin: "Asiimov", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,pistol,8" }
    ]
  },
  {
    id: "rifle",
    name: "Кейс Винтовок",
    price: 899,
    image: "https://source.unsplash.com/random/240x240/?csgo,rifle,1",
    items: [
      { name: "AK-47", skin: "Vulcan", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,1" },
      { name: "M4A4", skin: "Asiimov", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,2" },
      { name: "AUG", skin: "Akihabara Accept", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,3" },
      { name: "FAMAS", skin: "Afterimage", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,4" },
      { name: "M4A1-S", skin: "Hyper Beast", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,5" },
      { name: "Galil AR", skin: "Eco", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,6" },
      { name: "SG 553", skin: "Cyrex", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,7" },
      { name: "AK-47", skin: "Redline", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,rifle,8" }
    ]
  },
  {
    id: "starter",
    name: "Стартовый Кейс",
    price: 249,
    image: "https://source.unsplash.com/random/240x240/?csgo,case,2",
    items: [
      { name: "AK-47", skin: "Elite Build", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,9" },
      { name: "P250", skin: "Supernova", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,10" },
      { name: "Glock-18", skin: "Dragon Tattoo", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,11" },
      { name: "M4A4", skin: "Evil Daimyo", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,12" },
      { name: "MP7", skin: "Skulls", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,13" },
      { name: "P90", skin: "Teardown", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,14" },
      { name: "G3SG1", skin: "Contractor", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,15" },
      { name: "MAC-10", skin: "Candy Apple", rarity: "common", image: "https://source.unsplash.com/random/100x80/?csgo,weapon,16" }
    ]
  },
  {
    id: "gloves",
    name: "Кейс Перчаток",
    price: 4999,
    image: "https://source.unsplash.com/random/240x240/?csgo,gloves",
    items: [
      { name: "Specialist Gloves", skin: "Crimson Kimono", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,1" },
      { name: "Sport Gloves", skin: "Pandora's Box", rarity: "legendary", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,2" },
      { name: "Driver Gloves", skin: "Lunar Weave", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,3" },
      { name: "Hand Wraps", skin: "Slaughter", rarity: "epic", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,4" },
      { name: "Bloodhound Gloves", skin: "Guerrilla", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,5" },
      { name: "Moto Gloves", skin: "Boom!", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,6" },
      { name: "Hydra Gloves", skin: "Case Hardened", rarity: "rare", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,7" },
      { name: "Sport Gloves", skin: "Arid", rarity: "uncommon", image: "https://source.unsplash.com/random/100x80/?csgo,gloves,8" }
    ]
  }
];
