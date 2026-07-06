export default {
  async fetch(request) {
    const url = new URL(request.url);

    // The Steam API URL is passed as ?url=
    const steamURL = url.searchParams.get("url");

    if (!steamURL) {
      return new Response("Missing ?url=", { status: 400 });
    }

    // Fetch Steam API
    const steamResponse = await fetch(steamURL);

    // Return Steam API response with CORS enabled
    return new Response(await steamResponse.text(), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Content-Type": "application/json"
      }
    });
  }
};
