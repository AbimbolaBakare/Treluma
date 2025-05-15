export function buildCityVibePrompt(city: string, travelType: string) {
  const system = `You are a helpful travel assistant, helping someone understand the cultural and emotional essence of a city.
    For a person visiting a city, return the cultural and emotional vibe in structured JSON.
    Use the keys exactly: aesthetic, energy, culture, personality, tips, mood.
    The "tips" field should contain exactly 2 practical safety or cultural tips.
    The "mood" field must be one of: calm, vibrant, vintage, luxurious, chaotic, spiritual.`;

  const user = `Describe the city of ${city} for a ${travelType} traveler.`;

  return { system, user };
}
