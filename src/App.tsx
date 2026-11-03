import { useState } from "react"
import { HERO_IMAGE, VIDEOS, WINNERS, resolveImageUrl } from "./data"
import type { VideoItem } from "./data"

const COPY_CONFIRMATION_DURATION_MS = 1600

const articleSections = [
  ["Cara mengikuti", "#cara-mengikuti"],
  ["Cara menjadi pemenang", "#cara-menang"],
  ["Galeri pemenang", "#galeri"],
  ["Syarat dan ketentuan", "#syarat"],
  ["Pertanyaan umum", "#faq"],
]

const frequentlyAskedQuestions = [
  {
    question: "Apakah program ini berbayar?",
    answer: "Tidak. Pendaftaran dan partisipasi sepenuhnya gratis.",
  },
  {
    question: "Siapa saja yang bisa ikut?",
    answer:
      "Pengguna aktif PetaniPRO yang berdomisili atau memiliki kebun di wilayah Sumatera.",
  },
  {
    question: "Apakah harus punya banyak followers?",
    answer:
      "Tidak. Interaksi menjadi salah satu penilaian, tetapi kualitas pengalaman dan penyelesaian challenge juga dipertimbangkan.",
  },
  {
    question: "Bagaimana mendapat panduan challenge tiap minggu?",
    answer:
      "Setelah mendaftar, Kawan Sawit mendapat informasi challenge dan panduan lengkap dari tim SawitPRO, termasuk cara membuat video.",
  },
  {
    question: "Bisa ikut setiap minggu?",
    answer:
      "Bisa. Challenge baru hadir setiap minggu selama program berlangsung.",
  },
  {
    question: "Kapan dan di mana pemenang diumumkan?",
    answer:
      "Setiap hari Rabu melalui kanal resmi SawitPRO. Ikuti @sawitpro.id di Facebook, Instagram, dan TikTok agar tidak ketinggalan.",
  },
]

function Icon({
  name,
  size = 20,
}: {
  name: "chevronRight" | "calendar" | "clock" | "link" | "check"
  size?: number
}) {
  const iconPaths = {
    chevronRight: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <path d="M8 2v4M16 2v4M3 10h18" />
        <rect x="3" y="4" width="18" height="18" rx="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1" />
        <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {iconPaths[name]}
    </svg>
  )
}

function SiteLink({
  children,
  className = "",
  href,
  external = false,
}: {
  children: React.ReactNode
  className?: string
  href: string
  external?: boolean
}) {
  return (
    <a
      className={className}
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  )
}

function CallToActionLink({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode
  className?: string
  href: string
}) {
  return (
    <SiteLink className={`button ${className}`} external href={href}>
      {children}
    </SiteLink>
  )
}

function SemanticHeading({
  as = "h2",
  children,
  className = "",
  id,
}: {
  as?: "h1" | "h2" | "h3"
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const Tag = as
  return (
    <Tag className={className} id={id}>
      {children}
    </Tag>
  )
}

function WinnerPhoto({ photo, label }: { photo?: string; label: string }) {
  const [hasFailed, setHasFailed] = useState(false)
  const source = resolveImageUrl(photo)
  if (!source || hasFailed) {
    return <div className="photo-placeholder">Foto belum tersedia</div>
  }
  return (
    <img
      alt={label}
      loading="lazy"
      onError={() => setHasFailed(true)}
      src={source}
    />
  )
}

function VideoFrame({ video }: { video: VideoItem }) {
  if (video.type === "youtube" && video.id) {
    return (
      <iframe
        allowFullScreen
        loading="lazy"
        src={`https://www.youtube-nocookie.com/embed/${video.id}`}
        title={video.title}
      />
    )
  }
  if (video.type === "embed" && video.url) {
    return <iframe allowFullScreen loading="lazy" src={video.url} title={video.title} />
  }
  if (video.type === "mp4" && video.url) {
    return <video controls poster={resolveImageUrl(video.thumb)} preload="metadata" src={`${video.url}#t=0.1`} />
  }
  return <div className="photo-placeholder">Video segera hadir</div>
}

function ArticleStepCard({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="step-card">
      <div className="step-number">{number}</div>
      <div>
        <SemanticHeading as="h3">{title}</SemanticHeading>
        {children}
      </div>
    </article>
  )
}

export default function App() {
  const [isArticleLinkCopied, setIsArticleLinkCopied] = useState(false)

  async function handleCopyArticleLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsArticleLinkCopied(true)
      window.setTimeout(
        () => setIsArticleLinkCopied(false),
        COPY_CONFIRMATION_DURATION_MS,
      )
    } catch {
      setIsArticleLinkCopied(false)
    }
  }

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Program SawitPRO · Juni – Desember 2026</div>
              <SemanticHeading as="h1">
                Dapatkan <span>Rp1 Juta</span> Setiap Minggu Lewat Petani Juara!
              </SemanticHeading>
              <p className="hero-lead">
                Challenge mingguan berhadiah Rp1.000.000 untuk Kawan Sawit yang
                mencoba fitur PetaniPRO dan berbagi pengalaman. Terbuka untuk
                pengguna PetaniPRO di wilayah Sumatera.
              </p>
              <div className="hero-actions">
                <CallToActionLink href="https://wa.me/6282188188052">
                  Daftar Gratis Sekarang!
                </CallToActionLink>
                <a className="button button-outline" href="#cara-mengikuti">
                  Lihat Cara Ikut
                </a>
              </div>
              <ul className="trust-list">
                {["100% Gratis", "Data Aman", "Terpercaya"].map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual">
              <img
                alt="Ilustrasi aplikasi PetaniPRO"
                onError={(event) => {
                  event.currentTarget.onerror = null
                  event.currentTarget.src = "/assets/petani-juara-hero.png"
                }}
                src={HERO_IMAGE}
              />
            </div>
          </div>
        </section>

        <div className="stats-band">
          <div className="container stats-grid">
            {[
              ["Rp1 Juta", "hadiah setiap minggu"],
              ["3 Misi", "cukup di aplikasi PetaniPRO"],
              ["Setiap Rabu", "pengumuman pemenang"],
            ].map(([value, label]) => (
              <div key={value}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container article-layout">
          <aside className="article-aside">
            <div className="toc-card">
              <span className="toc-label">Di artikel ini</span>
              <nav aria-label="Daftar isi">
                {articleSections.map(([label, href], index) => (
                  <SiteLink href={href} key={label}>
                    <span>0{index + 1}</span>
                    {label}
                  </SiteLink>
                ))}
              </nav>
            </div>
            <div className="share-row">
              <span>Bagikan</span>
              <button
                className="icon-button"
                data-copied={isArticleLinkCopied}
                onClick={handleCopyArticleLink}
                type="button"
              >
                <Icon name={isArticleLinkCopied ? "check" : "link"} />
                <span aria-live="polite">
                  {isArticleLinkCopied ? "Tautan tersalin" : "Salin tautan"}
                </span>
              </button>
            </div>
          </aside>

          <article className="article-content">
            <section className="intro">
              <p className="lead-paragraph">
                Teknologi membantu petani mencatat dan memeriksa kebutuhan kebun
                dengan lebih praktis.
              </p>
              <p>
                Lewat aplikasi PetaniPRO, SawitPRO menghadirkan Petani Juara,
                challenge mingguan berhadiah Rp1.000.000 untuk Kawan Sawit yang
                mencoba fitur PetaniPRO dan berbagi pengalaman. Program
                berlangsung Juni sampai Desember 2026 dan terbuka bagi pengguna
                PetaniPRO di wilayah Sumatera.
              </p>
            </section>

            <section className="content-section" id="cara-mengikuti">
              <div className="section-heading">
                <span>Mulai dari sini</span>
                <SemanticHeading>Cara mengikuti Petani Juara</SemanticHeading>
                <p>Ikuti tiga langkah ini sebelum hari Minggu.</p>
              </div>

              <div className="steps">
                <ArticleStepCard number="01" title="Unduh aplikasi PetaniPRO">
                  <p>
                    Unduh aplikasinya, lalu siapkan akun PetaniPRO untuk memulai
                    challenge.
                  </p>
                  <SiteLink
                    className="play-store"
                    external
                    href="https://onelink.to/sq2nv6"
                  >
                    <img
                      alt="Tersedia di Google Play"
                      src="/assets/google-play.jpg"
                    />
                  </SiteLink>
                </ArticleStepCard>

                <ArticleStepCard number="02" title="Selesaikan challenge">
                  <p>
                    Buka aplikasi PetaniPRO dan selesaikan tiga misi berikut:
                  </p>
                  <ul className="mission-list">
                    <li>
                      <Icon name="check" size={18} /> Cek Hama Penyakit
                    </li>
                    <li>
                      <Icon name="check" size={18} /> Cek Harga TBS
                    </li>
                    <li>
                      <Icon name="check" size={18} /> Coba Kalkulator Pupuk
                    </li>
                  </ul>
                </ArticleStepCard>

                <ArticleStepCard number="03" title="Ceritakan pengalamanmu">
                  <p>
                    Buat video singkat tentang pengalaman menggunakan PetaniPRO,
                    lalu unggah ke Facebook, Instagram, dan TikTok.
                  </p>
                  <div className="tag-box">
                    <span>Tag @sawitpro.id</span>
                    <span>#PetaniJuara</span>
                    <span>#PetaniPRO</span>
                    <span>#SawitPRO</span>
                    <span>#TerusTumbuh</span>
                  </div>
                </ArticleStepCard>
              </div>

              <div className="note">
                <strong>Batas waktu hari Minggu</strong>
                <p>
                  Jika belum selesai, progress direset hari Senin dan Kawan
                  Sawit bisa ikut challenge minggu berikutnya.
                </p>
              </div>
            </section>

            <section className="content-section" id="cara-menang">
              <div className="section-heading">
                <span>Penilaian mingguan</span>
                <SemanticHeading>
                  Bagaimana cara menjadi pemenang?
                </SemanticHeading>
                <p>
                  Setiap minggu, SawitPRO memilih peserta terbaik berdasarkan
                  empat aspek penilaian.
                </p>
              </div>

              <div className="winner-card">
                <div className="winner-prize">
                  <span>Hadiah untuk pemenang</span>
                  <strong>Rp1.000.000</strong>
                  <small>Top up e-money</small>
                </div>
                <ul>
                  <li>
                    <span>01</span> Penyelesaian challenge
                  </li>
                  <li>
                    <span>02</span> Kreativitas konten
                  </li>
                  <li>
                    <span>03</span> Pengalaman yang dibagikan
                  </li>
                  <li>
                    <span>04</span> Interaksi unggahan
                  </li>
                </ul>
              </div>
              <p>
                Pemenang diumumkan setiap hari Rabu melalui kanal resmi
                SawitPRO. Hadiah dikirim lewat top up e-money setiap akhir bulan
                kepada pemenang yang telah memenuhi seluruh ketentuan.
              </p>
            </section>

            <section className="content-section" id="galeri">
              <div className="section-heading">
                <span>Galeri pemenang</span>
                <SemanticHeading>Kenalan dengan Petani Juara</SemanticHeading>
                <p>Kawan Sawit yang sudah menang challenge mingguan.</p>
              </div>
              <div className="winner-gallery">
                {WINNERS.map((winner, index) => (
                  <figure className="winner-photo" key={index}>
                    <div className="winner-photo-frame">
                      <WinnerPhoto
                        label={winner.name ?? `Pemenang Petani Juara ${index + 1}`}
                        photo={winner.photo}
                      />
                      <span className="winner-week">
                        {winner.week ?? `Pemenang ${index + 1}`}
                      </span>
                    </div>
                    {(winner.name || winner.meta) && (
                      <figcaption>
                        {winner.name && <strong>{winner.name}</strong>}
                        {winner.meta && <span>{winner.meta}</span>}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
              <div className="video-gallery">
                {VIDEOS.map((video, index) => (
                  <figure className="video-card" key={index}>
                    <div className="video-frame">
                      <VideoFrame video={video} />
                    </div>
                    <figcaption>
                      <strong>{video.title}</strong>
                      <span>{video.meta}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            <section className="content-section" id="syarat">
              <div className="section-heading">
                <span>Sebelum mendaftar</span>
                <SemanticHeading>Syarat dan ketentuan</SemanticHeading>
              </div>
              <ul className="terms-list">
                {[
                  "Program berlangsung Juni sampai Desember 2026, gratis tanpa biaya pendaftaran.",
                  "Terbuka bagi pengguna PetaniPRO di wilayah Sumatera.",
                  "Peserta wajib menyelesaikan challenge dan mengunggah video pengalaman.",
                  "Video wajib mencantumkan tag @sawitpro.id dan hashtag resmi program.",
                  "Keputusan tim SawitPRO bersifat final.",
                  "Pajak ditanggung pemenang.",
                ].map((term) => (
                  <li key={term}>
                    <Icon name="check" size={18} />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cta-panel">
              <div>
                <span>Challenge minggu ini sudah dibuka</span>
                <SemanticHeading>Siap jadi Petani Juara?</SemanticHeading>
                <p>
                  Daftarkan diri sekarang dan mulai challenge pertamamu di
                  PetaniPRO.
                </p>
              </div>
              <CallToActionLink href="https://wa.me/6282188188052">
                Daftar gratis sekarang
                <Icon name="chevronRight" />
              </CallToActionLink>
            </section>

            <section className="content-section faq-section" id="faq">
              <div className="section-heading">
                <span>Informasi program</span>
                <SemanticHeading>
                  Pertanyaan yang sering ditanyakan
                </SemanticHeading>
              </div>
              <div className="faq-list">
                {frequentlyAskedQuestions.map((faq, index) => (
                  <details key={faq.question} open={index === 0}>
                    <summary>
                      {faq.question}
                      <span>+</span>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  )
}
