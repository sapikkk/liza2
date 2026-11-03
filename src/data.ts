/* Data pemenang: tambah satu blok per pemenang.
   photo: URL gambar. Format `wix:image://v1/...` dan URL static.wixstatic.com sama-sama didukung.
   name / meta / week bersifat opsional. Kosongkan photo jika belum ada. */
export type Winner = {
  photo?: string
  name?: string
  meta?: string
  week?: string
}

export const WINNERS: Winner[] = [
  {
    photo:
      "https://static.wixstatic.com/media/10776c_0e108c56e8844696937443b1a6259406~mv2.jpeg",
  },
  {
    photo:
      "https://static.wixstatic.com/media/10776c_ecf559f7edf14f118d87fa3c995d7f4e~mv2.jpeg",
  },
  {
    photo:
      "https://static.wixstatic.com/media/10776c_abdcc3b209f0498fa8715d2668bd915d~mv2.jpeg",
  },
]

/* Data video. type: 'youtube' (isi id), 'mp4' (isi url + thumb), 'embed' (isi url embed,
   mis. TikTok/IG). Kosongkan type untuk menampilkan placeholder. */
export type VideoItem = {
  type: "" | "youtube" | "mp4" | "embed"
  id?: string
  url?: string
  thumb?: string
  title: string
  meta: string
}

export const VIDEOS: VideoItem[] = [
  {
    type: "mp4",
    url: "https://video.wixstatic.com/video/10776c_125615e0874b46ba8633bcbebee93908/720p/mp4/file.mp4",
    title: "Vifco",
    meta: "Pemenang Petani Juara",
  },
  {
    type: "mp4",
    url: "https://video.wixstatic.com/video/10776c_1e04d28e4c314494849d09fa34a55cb5/720p/mp4/file.mp4",
    title: "Aris",
    meta: "Pemenang Petani Juara",
  },
  {
    type: "mp4",
    url: "https://video.wixstatic.com/video/10776c_489545e3cac34f48baebddab64652cb6/720p/mp4/file.mp4",
    title: "Sayid",
    meta: "Pemenang Petani Juara",
  },
]

export const HERO_IMAGE =
  "https://static.wixstatic.com/media/90654b_59e4901c3a8d418097ee79113198dcbd~mv2.png"

/** Mengubah wix:image://v1/<id>/<nama>#... menjadi URL static.wixstatic.com. */
export function resolveImageUrl(source?: string): string | undefined {
  if (!source) return undefined
  const wixMatch = source.match(/^wix:image:\/\/v1\/([^/#]+)/)
  if (wixMatch) return `https://static.wixstatic.com/media/${wixMatch[1]}`
  return source
}
