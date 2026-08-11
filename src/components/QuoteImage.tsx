import { useState } from "react";
import { ImageDown } from "lucide-react";

export type QuoteLine = { name: string; qty: number; price: number };

const fmt = (n: number) => new Intl.NumberFormat("pl-PL").format(n);

const COL = {
  bg: "#12140f",
  panel: "#1a1d16",
  line: "#2c3122",
  text: "#e6e8df",
  muted: "#8d9481",
  accent: "#a3b53f",
  hazard: "#c9a227",
};

function drawQuote(lines: QuoteLine[]): HTMLCanvasElement {
  const W = 1000;
  const rowH = 46;
  const headH = 210;
  const footH = 230;
  const H = headH + lines.length * rowH + footH;

  const canvas = document.createElement("canvas");
  const dpr = 2;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);

  // tło
  ctx.fillStyle = COL.bg;
  ctx.fillRect(0, 0, W, H);

  // pas ostrzegawczy
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, W, 10);
  ctx.clip();
  for (let x = -20; x < W + 40; x += 28) {
    ctx.fillStyle = COL.hazard;
    ctx.beginPath();
    ctx.moveTo(x, 10);
    ctx.lineTo(x + 14, 10);
    ctx.lineTo(x + 24, 0);
    ctx.lineTo(x + 10, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // nagłówek
  ctx.fillStyle = COL.accent;
  ctx.font = "bold 46px Oswald, Impact, sans-serif";
  ctx.fillText("SCUM · PUNKT SKUPU", 48, 88);
  ctx.fillStyle = COL.muted;
  ctx.font = "18px 'Share Tech Mono', monospace";
  ctx.fillText("WYCENA SKUPU", 48, 118);
  const stamp = new Date().toLocaleString("pl-PL");
  const stampW = ctx.measureText(stamp).width;
  ctx.fillText(stamp, W - 48 - stampW, 118);

  // nagłówek tabeli
  ctx.fillStyle = COL.panel;
  ctx.fillRect(40, 150, W - 80, 40);
  ctx.fillStyle = COL.muted;
  ctx.font = "16px 'Share Tech Mono', monospace";
  ctx.fillText("PRZEDMIOT", 60, 176);
  ctx.textAlign = "right";
  ctx.fillText("CENA", W - 400, 176);
  ctx.fillText("ILOŚĆ", W - 260, 176);
  ctx.fillText("SUMA", W - 60, 176);
  ctx.textAlign = "left";

  // wiersze
  let y = headH;
  let total = 0;
  let units = 0;
  lines.forEach((l, idx) => {
    const sum = l.price * l.qty;
    total += sum;
    units += l.qty;
    if (idx % 2 === 0) {
      ctx.fillStyle = "#171a13";
      ctx.fillRect(40, y - 30, W - 80, rowH);
    }
    ctx.fillStyle = COL.text;
    ctx.font = "20px Barlow, Arial, sans-serif";
    let name = l.name;
    while (ctx.measureText(name).width > W - 480 && name.length > 4) {
      name = name.slice(0, -2);
    }
    if (name !== l.name) name += "…";
    ctx.fillText(name, 60, y);
    ctx.textAlign = "right";
    ctx.font = "20px 'Share Tech Mono', monospace";
    ctx.fillStyle = COL.muted;
    ctx.fillText(fmt(l.price), W - 400, y);
    ctx.fillText(`×${l.qty}`, W - 260, y);
    ctx.fillStyle = COL.accent;
    ctx.fillText(fmt(sum), W - 60, y);
    ctx.textAlign = "left";
    y += rowH;
  });

  // podsumowanie
  const boxY = y + 4;
  ctx.strokeStyle = COL.line;
  ctx.lineWidth = 2;
  ctx.strokeRect(40, boxY, W - 80, 130);
  ctx.fillStyle = COL.muted;
  ctx.font = "18px 'Share Tech Mono', monospace";
  ctx.fillText(`SZTUK ŁĄCZNIE: ${units}`, 60, boxY + 42);
  ctx.fillText("KOSZT SKUPU", 60, boxY + 100);
  ctx.textAlign = "right";
  ctx.fillStyle = COL.accent;
  ctx.font = "bold 58px Oswald, Impact, sans-serif";
  ctx.fillText(fmt(total), W - 60, boxY + 106);
  ctx.textAlign = "left";

  ctx.fillStyle = COL.muted;
  ctx.font = "15px 'Share Tech Mono', monospace";
  ctx.fillText("Wycena orientacyjna — ceny wg cennika skupu.", 48, H - 30);

  return canvas;
}

export function QuoteImage({ lines }: { lines: QuoteLine[] }) {
  const [busy, setBusy] = useState(false);

  const generate = () => {
    if (lines.length === 0) return;
    setBusy(true);
    try {
      const canvas = drawQuote(lines);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `wycena-skup-${new Date().toISOString().slice(0, 10)}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }, "image/png");
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={generate}
      disabled={lines.length === 0 || busy}
      className="stencil mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-3 py-2 text-xs text-primary transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
    >
      <ImageDown className="h-4 w-4" /> Wycena jako obraz
    </button>
  );
}
