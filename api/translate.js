export default {
  async fetch(request) {
    let { searchParams } = new URL(request.url);

    let q = searchParams.get("q") || "";
    let target = searchParams.get("target") || "zh-CN";

    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(q)}`;

    let resp = await fetch(url);
    let data = await resp.json();

    let translated = data[0][0][0];

    return new Response(JSON.stringify({ translatedText: translated }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
