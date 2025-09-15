export default {
  async fetch(request, env) {
    try {
      if (request.method === "POST") {
        let { q } = await request.json();

        if (!q) {
          return new Response(
            JSON.stringify({ error: "Missing q" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(q)}`;
        let resp = await fetch(url);
        let data = await resp.json();

        let translated = data[0][0][0];

        return new Response(JSON.stringify({ translatedText: translated }), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Only POST supported" }),
          { status: 405, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
