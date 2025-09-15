export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { q } = req.body;  

      if (!q) {
        return res.status(400).json({ error: "Missing q" });
      }

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(q)}`;
      const response = await fetch(url);
      const data = await response.json();

      const translated = data[0][0][0];
      return res.status(200).json({ translatedText: translated });
    } catch (err) {
      return res.status(500).json({ error: "Server error", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
