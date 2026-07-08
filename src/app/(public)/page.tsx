import React from 'react'
import Link from 'next/link'
import { getProducts } from '@/actions/products'
import { getCafeInfo } from '@/actions/cafe'
import { Coffee, Sofa, ConciergeBell, MapPin, Phone, Mail, ArrowUpLeft, ArrowLeft } from 'lucide-react'
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from '@/components/public/MotionWrapper'

// Force dynamic data fetching so homepage loads fresh content
export const revalidate = 0

export default async function HomePage() {
  const [cafeInfo, products] = await Promise.all([
    getCafeInfo(),
    getProducts(),
  ])

  const cafeName = cafeInfo?.name || 'VO'
  const cafeDesc = cafeInfo?.description || 'تجربة استثنائية في عالم القهوة المختصة، حيث نعتني بأدق التفاصيل لنقدم لك كوباً يعكس شغفنا بالكمال في أجواء تمنحك السكينة المطلقة.'
  const cafeAddress = cafeInfo?.address || 'طريق الملك فهد، حي الياسمين، الرياض'
  const cafePhone = cafeInfo?.phone || '+966 50 000 0000'
  const logoUrl = cafeInfo?.logo_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIpiT8iG8DsMvTlHg0LNhn3cZ8JzA5LUmDbhgXlZgZNIJ4Dybo1HhG_Uh8jqjdi7dRh_qdRF5l8FKqxEA5s3R4faX2awFu2nRaqJMz48z9cdanpzBVZaWDWNnIwrgi8V7HxbLnpKzGaguNLrBvGafs-tDuQRIbHBG4yhrX3iE8d43u7vOSxQvFFBxMoab_t5MjIHIoPl4ZiXq0GBo-VeoZY7oXi5hxdwKEbrGMWsS9hzzbmYHwISEYW8pfw6Cv7MOAe_A'
  const cafeCover = cafeInfo?.cover_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuACneMvNCRI5nN0Y6eIThoPLeHqRCLQosNxSrbf_5m2IY0S6Z8YhbJpSzD-MOGpVzD5yTz3bweG2hrYQVPSHKmVsh7_8esP_SQw00HLTCxXzVAkVCEEJUMEtDL4CFW6oiAJSKXLgwocV_I0nLfajYRxYJIFs1TnzFDg0dBtrH0mmAhOphKbTN1BARa7SPfHyuJgAqvfgrBdXViAPvDaqSMwDLeLmqbHlTNHBoxxmmHfdYtuXZQU-ZAqKA'

  const galleryImages = [
    { src: 'https://instagram.fcai21-2.fna.fbcdn.net/v/t51.82787-15/623168387_18087398378516428_788343157882047647_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzUyOTk4NTA2NDk1NTg3MzgyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=W4NnmcITp6cQ7kNvwHICq9d&_nc_oc=Adr8jYkZeMc4__Wn4elxDpGkxs6YL2WZ94DCtIibIi8K8HhAAQHDS1xqhLxXrb0IVqI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcai21-2.fna&_nc_gid=N-vi_Gm9dQW3UN0zL2eDHg&_nc_ss=7a22e&oh=00_AQBZQI08ShThYrhWyajvkwkR8RmbUaWPV31UL0VP3YrsBw&oe=6A543F0C', alt: 'تصميم داخلي راقي' },
    { src: 'https://instagram.fcai21-4.fna.fbcdn.net/v/t51.82787-15/625043164_18100878703852605_5120658057110468909_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzU0NTIxNTc2NDExMzkyOTY1MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=-66lIdp-wjgQ7kNvwEScD57&_nc_oc=AdpRRb-3l8-2pHz4tWcTD-9ASw5TWMsJwJ8PcqXHFghvOB1tkZepwapg-rzoTJC1v04&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcai21-4.fna&_nc_gid=N-vi_Gm9dQW3UN0zL2eDHg&_nc_ss=7a22e&oh=00_AQCo1vzwfyFrRNm3aAj4xNior2_OT3ViVF-S4NnNqjGQiA&oe=6A541A7E', alt: 'فن الحليب على القهوة' },
    { src: 'https://instagram.fcai21-2.fna.fbcdn.net/v/t51.82787-15/551247489_17889071274358060_109209286227026394_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzcyNTE4NzY2MDA3NjU2MzQzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=_hcxJ-scr9IQ7kNvwHjkhnM&_nc_oc=AdpSG3FrY5SXGG_WNiZtDHXMW-kB1k7WO2p15uK393a8nOrQa-hyeeSk-6KTBeBwr6I&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcai21-2.fna&_nc_gid=o98afQRdCBgcVfibhED0yQ&_nc_ss=7a22e&oh=00_AQAf2wdw_vBHt8BsqcYfM8Zb6-xCZiaZHX_UPFvFCFVorw&oe=6A5425B1', alt: 'مخبوزات وحلويات فاخرة' },
    { src: 'https://instagram.fcai21-2.fna.fbcdn.net/v/t51.75761-15/484345382_17864681391358060_683467009506171923_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzU8Nzc4MDEyMjkxNjE4NzUwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=TDuCNHKKZRQQ7kNvwGwONKI&_nc_oc=AdpXhlLWu4tyZra0QrYKAkpNm5toh_vp-75hvVMogKdFjYDMvyRagbPyyC8VjSM9D8w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcai21-2.fna&_nc_gid=N-vi_Gm9dQW3UN0zL2eDHg&_nc_ss=7a22e&oh=00_AQCJgP4j5ZyuI-HRX1Zx5Px_mYGLyECAqPUEkPJiGvDXGQ&oe=6A541350', alt: 'تراس خارجي هادئ' }
  ]

  // Filter active products marked as featured in the database
  const featuredProducts = products.filter((p) => p.available && p.featured)

  return (
    <div className="relative overflow-x-hidden bg-[#211a21]">
      {/* 1. Hero Section */}
      <section
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${cafeCover}')` }}
      >
        {/* Overlays to match the cinematic blend */}
        <div className="absolute inset-0 bg-[#211a21]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211a21] via-[#211a21]/30 to-transparent" />
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[radial-gradient(#d8ced8_1px,transparent_1px)] [background-size:32px_32px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          <FadeIn duration={0.8}>
            <div className="flex flex-col items-center">
              <img
                src={logoUrl}
                alt={cafeName}
                className="h-48 md:h-76 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
              <h1 className="font-serif text-5xl md:text-8xl text-white leading-tight tracking-tight">
                <span className="block font-serif text-3xl md:text-5xl text-[#d8ced8] italic">
                  حيث تلتقي الفخامة بالبساطة
                </span>
              </h1>
            </div>

            <p className="text-[#d8ced8] text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mt-8">
              {cafeDesc}
            </p>

            <div className="pt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="#featured"
                className="inline-flex items-center rounded-lg justify-center px-12 py-4 bg-white text-[#211a21] hover:bg-[#d8ced8] transition-all duration-500 font-bold text-lg"
              >
                اكتشف منتجاتنا المميزة
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. Features Section (Asymmetrical Offset Grid) */}
      <section id="about" className="py-32 bg-[#1a151a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#d8ced8_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <SlideIn direction="up">
            <div className="text-center mb-24">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">فلسفة {cafeName}</h2>
              <div className="h-px w-20 bg-white/20 mx-auto mt-8"></div>
            </div>
          </SlideIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-12">
            {/* Feature 1 (Offset Left) */}
            <StaggerItem className="md:col-span-5  md:col-start-1 group transition-all duration-500 hover:-translate-y-1">
              <div className="p-10 bg-[#211a21] rounded-lg  border border-[#5a4d5a]/10 hover:bg-[#2e242e] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full transition-transform duration-700 group-hover:scale-150"></div>
                <div className="w-20 h-20 bg-[#211a21] flex items-center justify-center mb-6 border border-white/20 relative z-10 mx-auto md:mx-0 transition-colors group-hover:bg-white group-hover:text-black text-white">
                  <Coffee className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4 text-center md:text-right relative z-10">
                  التميز في المحصول
                </h3>
                <p className="text-sm text-[#d8ced8] leading-relaxed text-center md:text-right relative z-10">
                  ننتقي أجود سلالات البن من مزارع مستدامة، لنضمن لك نكهة نقية ومعقدة في كل رشفة.
                </p>
              </div>
            </StaggerItem>

            {/* Feature 2 (Center Overlapping White Card) */}
            <StaggerItem className="md:col-span-6 rounded-lg md:col-start-7 md:-mt-20 relative z-20 group transition-all duration-500 hover:-translate-y-1">
              <div className="p-12 bg-white text-[#211a21] rounded-lg shadow-[0_20px_50px_rgba(26,21,26,0.25)] relative overflow-hidden">
                <div className="w-24 h-24 bg-[#211a21] text-white flex items-center justify-center mb-8 border border-white/10 relative z-10 mx-auto md:mx-0">
                  <Sofa className="h-10 w-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4 text-center md:text-right relative z-10">
                  تصميم بسيط
                </h3>
                <p className="text-base text-zinc-700 leading-relaxed text-center md:text-right relative z-10">
                  بيئة هادئة تعتمد على البساطة المطلقة (Minimalism) لتمنح ذهنك المساحة التي يحتاجها للإبداع والراحة.
                </p>
              </div>
            </StaggerItem>

            {/* Feature 3 (Offset Right) */}
            <StaggerItem className="md:col-span-5 md:col-start-3  group transition-all duration-500 hover:-translate-y-1">
              <div className="p-10 bg-[#211a21] rounded-lg border border-[#5a4d5a]/10 hover:bg-[#2e242e] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-tr-full transition-transform duration-700 group-hover:scale-150"></div>
                <div className="w-20 h-20 bg-[#211a21] flex items-center justify-center mb-6 border border-white/20 relative z-10 mx-auto md:mx-0 transition-colors group-hover:bg-white group-hover:text-black text-white">
                  <ConciergeBell className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4 text-center md:text-right relative z-10">
                  ضيافة عصرية
                </h3>
                <p className="text-sm text-[#d8ced8] leading-relaxed text-center md:text-right relative z-10">
                  فريقنا مدرب على أعلى معايير الخدمة العالمية لضمان تجربة تليق بتطلعاتك الراقية.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. Products Section */}
      <section className="py-32 bg-[#211a21] relative" id="featured">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <SlideIn direction="up">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-[#5a4d5a]/25 pb-8">
              <div className="mb-6 md:mb-0 text-right">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">القائمة المختارة</h2>
                <p className="text-[#d8ced8] text-sm">إبداعات {cafeName} المنسقة بعناية</p>
              </div>
              <Link
                href="/menu"
                className="font-semibold text-white hover:opacity-70 transition-opacity flex items-center gap-3 group uppercase tracking-widest text-sm"
              >
                <span>استعراض كافة الأصناف</span>
                <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </SlideIn>

          {featuredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <StaggerItem key={product.id} className="group relative">
                  <div className="bg-[#2e242e] rounded-lg overflow-hidden border border-[#5a4d5a]/20 hover:border-[#5a4d5a]/40 shadow-lg hover:shadow-2xl transition-all duration-500 pb-6 flex flex-col h-full justify-between">
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                      <img
                        className="w-full h-full object-cover transition-all duration-700 ease-out"
                        src={product.image_url || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80'}
                        alt={product.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-6 left-6 bg-white text-[#211a21] px-4 py-2 font-bold text-sm tracking-tighter flex items-center gap-1">
                        <span>{Number(product.price).toFixed(0)}</span>
                        <img src="/Saudi_Riyal_Symbol.webp" alt="ر.س" className="h-4 w-auto object-contain select-none" />
                      </div>
                    </div>
                    <div className="p-6 text-right relative z-20">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#d8ced8] transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#d8ced8] leading-relaxed line-clamp-2">
                        {product.description || 'وصف شهي ومميز للمنتج المحضر طازجاً في مقهانا اليوم.'}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            /* Fallback mock products matching Stitch design exactly */
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <StaggerItem className="group relative">
                <div className="bg-[#2e242e] overflow-hidden border border-[#5a4d5a]/20 hover:border-[#5a4d5a]/40 shadow-lg hover:shadow-2xl transition-all duration-500 pb-6 flex flex-col h-full justify-between">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      className="w-full h-full object-cover transition-all duration-700 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_JvhNSg3p5Z0IqIXHNdYflt4GPx9-jXZM9D0QJgNLF_Pd__HhhG3qctOcM6L_vo1OqIBhUEtdYLS4sEWfKqiAerkR6jYQgqj668LV_pVKY93bmRPnaOHB39Al5q_MIVe6ARci2DmqL66InMTxp85wwKOdb4NiA_fYzYEZWXwnjd1uG1ltjN157RdzDHgSsuIyxO6YwOSoP4JbxpOKmhOqVO9Gm7RtTgzByTjYICxkFjGu9-IGcGtkSA"
                      alt="VO بريو - إصدار خاص"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-white text-[#211a21] px-4 py-2 font-bold text-sm tracking-tighter flex items-center gap-1">
                      <span>٢٥</span>
                      <img src="/Saudi_Riyal_Symbol.webp" alt="ر.س" className="h-4 w-auto object-contain select-none" />
                    </div>
                  </div>
                  <div className="p-6 text-right relative z-20">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#d8ced8] transition-colors mb-2">
                      VO بريو - إصدار خاص
                    </h3>
                    <p className="text-sm text-[#d8ced8] leading-relaxed line-clamp-2">
                      قهوة مقطرة من مزارع إثيوبيا، تتميز بإيحاءات زهرية وقوام ناعم.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Product 2 */}
              <StaggerItem className="group relative">
                <div className="bg-[#2e242e] overflow-hidden border border-[#5a4d5a]/20 hover:border-[#5a4d5a]/40 shadow-lg hover:shadow-2xl transition-all duration-500 pb-6 flex flex-col h-full justify-between">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      className="w-full h-full object-cover transition-all duration-700 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd7ouZmXFfdVnPCVWUQ2JwzHAffiuhN6GO-HG0PpYp3IKe5c2_wTsae3dLG5CEtEtQBmtNkcm8G7BTQv9k5D8r6nSpHqFwos22jeD442LNjqKJO_iZrhhK94sYsq5vw7HC6gPlgzHSdu6VlGKNICHHB4zRSTLqcM7xWnnX40Dt_top9HR9dL0ZiImuv_LQq7s6nfxIy0qRZqJCTdbN1F2aTCilRZi4_OQdQnUX9Eobyw7bwW2cLl-cgQ"
                      alt="كرواسون الفانيليا السوداء"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-white text-[#211a21] px-4 py-2 font-bold text-sm tracking-tighter flex items-center gap-1">
                      <span>١٨</span>
                      <img src="/Saudi_Riyal_Symbol.webp" alt="ر.س" className="h-4 w-auto object-contain select-none" />
                    </div>
                  </div>
                  <div className="p-6 text-right relative z-20">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#d8ced8] transition-colors mb-2">
                      كرواسون الفانيليا السوداء
                    </h3>
                    <p className="text-sm text-[#d8ced8] leading-relaxed line-clamp-2">
                      مخبوزاتنا اليومية محضرة بالزبدة الفرنسية الفاخرة.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Product 3 */}
              <StaggerItem className="group relative">
                <div className="bg-[#2e242e] overflow-hidden border border-[#5a4d5a]/20 hover:border-[#5a4d5a]/40 shadow-lg hover:shadow-2xl transition-all duration-500 pb-6 flex flex-col h-full justify-between">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-zinc-900">
                    <img
                      className="w-full h-full object-cover transition-all duration-700 ease-out"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr16WV_jv-UozNrvkdcx5FwfJg2_6LZir55SjcY4vlZDHrGMzFCn20AW1RJ68mt239ea4cLTWDHf4WYk1DD3oV-5qecfbXjBaacvya774K9FCgqcudNU1cm0nMXwo50INtAXo6F-SLoHuEaH3Q3E70RKjQX33fmw--Q78PJPoIF0vOE_-f-E-F45xs_dXU9ugPp8pWIqo-zON1mVeg-4YTK4chSFfzkMARvSuYH78CKhNx-6WkBY4Rlw"
                      alt="حلى VO سيجنتشر"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 bg-white text-[#211a21] px-4 py-2 font-bold text-sm tracking-tighter flex items-center gap-1">
                      <span>٣٠</span>
                      <img src="/Saudi_Riyal_Symbol.webp" alt="ر.س" className="h-4 w-auto object-contain select-none" />
                    </div>
                  </div>
                  <div className="p-6 text-right relative z-20">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#d8ced8] transition-colors mb-2">
                      حلى VO سيجنتشر
                    </h3>
                    <p className="text-sm text-[#d8ced8] leading-relaxed line-clamp-2">
                      مزيج من النكهات الشرقية والغربية بتقديم فني معاصر.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Gallery Section (Automated Slider) */}
      <section className="py-20 bg-[#1a151a] relative overflow-hidden slider-container" id="gallery">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#d8ced8_1px,transparent_1px)] [background-size:52px_52px]" />
        <div className="relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl text-white italic">VO Ambience</h2>
            <p className="text-[#d8ced8] mt-4 tracking-widest text-sm uppercase">لمحات من عالمنا</p>
          </div>

          {/* Slider Track (Twin tracks for seamless infinite loop) */}
          <div className="flex overflow-hidden relative w-full" dir="ltr">
            <div className="flex animate-slide-infinite whitespace-nowrap gap-8 py-4 shrink-0">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="inline-block w-[450px] aspect-video overflow-hidden border border-[#5a4d5a]/20 shadow-2xl transition-all duration-700 hover:scale-105 shrink-0 group relative"
                >
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover transition-all duration-700"
                    src={img.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <span className="text-sm font-semibold text-white font-serif tracking-wide">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex animate-slide-infinite whitespace-nowrap gap-8 py-4 shrink-0" aria-hidden="true">
              {galleryImages.map((img, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="inline-block w-[450px] aspect-video overflow-hidden border border-[#5a4d5a]/20 shadow-2xl transition-all duration-700 hover:scale-105 shrink-0 group relative"
                >
                  <img
                    alt={img.alt}
                    className="w-full h-full object-cover transition-all duration-700"
                    src={img.src}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211a21]/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <span className="text-sm font-semibold text-white font-serif tracking-wide">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Section (Dashboard Style) */}
      <section className="py-32 bg-[#211a21] relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(#d8ced8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border border-[#5a4d5a]/10 p-8 md:p-20 bg-[#1a151a] shadow-2xl">
            <SlideIn direction="right" className="lg:col-span-5 space-y-12 text-right flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-5xl text-white mb-6">كن على اتصال</h2>
                <p className="text-lg text-[#d8ced8] font-light leading-relaxed">
                  نقدر زيارتكم واهتمامكم. تواصلوا معنا لأي استفسارات أو تعليقات.
                </p>
              </div>

              <div className="space-y-8 mt-12 border-t border-[#5a4d5a]/10 pt-12">
                <div className="flex items-center gap-6 group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#211a21] transition-all">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-[#d8ced8] font-light">{cafeAddress}</span>
                </div>
                <div className="flex items-center gap-6 group hover:translate-x-1.5 transition-transform duration-300">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#211a21] transition-all">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="text-lg text-[#d8ced8] font-light" dir="ltr">{cafePhone}</span>
                </div>

              </div>
            </SlideIn>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#5a4d5a]/10 border border-[#5a4d5a]/10">
                {/* Tile 1: Instagram */}
                <StaggerItem>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#211a21] p-12 hover:bg-[#2e242e] transition-all duration-500 flex flex-col justify-between aspect-square group w-full block"
                  >
                    <div className="flex justify-between items-start">
                      <svg className="h-8 w-8 text-white/50 group-hover:text-white transition-colors fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                      <ArrowUpLeft className="h-5 w-5 text-white/30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <span className="font-serif text-2xl text-white">Instagram</span>
                  </a>
                </StaggerItem>

                {/* Tile 2: Twitter (X) */}
                <StaggerItem>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#211a21] p-12 hover:bg-[#2e242e] transition-all duration-500 flex flex-col justify-between aspect-square group w-full block"
                  >
                    <div className="flex justify-between items-start">
                      <svg className="h-8 w-8 text-white/50 group-hover:text-white transition-colors fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <ArrowUpLeft className="h-5 w-5 text-white/30 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                    <span className="font-serif text-2xl text-white">Twitter (X)</span>
                  </a>
                </StaggerItem>

                {/* Tile 3: Community */}
                <StaggerItem className="sm:col-span-2 sm:aspect-auto sm:h-32">
                  <a
                    href="#"
                    className="bg-[#211a21] p-12 hover:bg-[#2e242e] transition-all duration-500 flex items-center justify-between w-full block h-full group"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-6">
                        <span className="font-serif text-2xl text-white">VO Community</span>
                      </div>
                      <ArrowLeft className="h-5 w-5 text-white/30 group-hover:-translate-x-2 transition-transform" />
                    </div>
                  </a>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
