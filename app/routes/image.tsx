import type { DataFunctionArgs } from "@remix-run/node";
import { createCanvas } from "@napi-rs/canvas";

export async function loader({ params }: DataFunctionArgs): Promise<Response> {
  const canvas = createCanvas(300, 300);
  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 10;
  ctx.strokeStyle = "#03a9f4";
  ctx.fillStyle = "#e51717";

  // Wall
  ctx.strokeRect(75, 140, 150, 110);

  // Door
  ctx.fillRect(130, 190, 40, 60);

  // Roof
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();

  return new Response(await canvas.encode("png"), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
    },
  });
}
