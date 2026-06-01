import * as v from "valibot";
import pseudoThumbnail from "../images/pseudo_thumbnail.jpg";

export default async function (url: string | null) {
  if (!url) return pseudoThumbnail;

  const roxyUrl = new URL("https://roxy.otodb.net/json");
  roxyUrl.searchParams.set("q", url);

  try {
    const roxyRes = await fetch(roxyUrl);
    if (roxyRes.status !== 200) return pseudoThumbnail;
    const roxyData = v.safeParse(
      v.object({
        title: v.string(),
        url: v.string(),
        thumbnail: v.string(),
      }),
      await roxyRes.json(),
    );

    if (!roxyData.success) return pseudoThumbnail;
    return roxyData.output.thumbnail;
  } catch (e) {
    console.error(e);
    return pseudoThumbnail;
  }
}
