import Image from "next/image";

const stickers = [
  { src: "/images/hobbies/toadally_awesome.png", position: "-left-44 top-16 -rotate-12", tilt: "-rotate-6" },
  { src: "/images/hobbies/stargazer_magician.png", position: "-right-44 top-4 rotate-12", tilt: "rotate-6" },
  { src: "/images/hobbies/king_of_skull_servants.png", position: "-left-44 top-[27rem] rotate-6", tilt: "rotate-3" },
  { src: "/images/hobbies/penguin_brave.png", position: "-right-44 top-[28rem] -rotate-6", tilt: "-rotate-6" },
];

export default function HobbyStickers() {
  return (
    <div aria-hidden="true">
      {stickers.map((sticker) => <div key={sticker.src} className={`pointer-events-none absolute hidden w-36 xl:block ${sticker.position}`}><Image src={sticker.src} alt="" width={180} height={220} sizes="144px" className="h-auto w-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,.5)]" /></div>)}
      <div className="mt-8 grid grid-cols-4 items-center gap-3 xl:hidden">
        {stickers.map((sticker) => <Image key={sticker.src} src={sticker.src} alt="" width={180} height={220} sizes="(min-width: 640px) 144px, 22vw" className={`mx-auto h-24 w-full max-w-36 object-contain drop-shadow-lg sm:h-32 ${sticker.tilt}`} />)}
      </div>
    </div>
  );
}
