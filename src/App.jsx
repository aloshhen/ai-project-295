import { SafeIcon } from './components/SafeIcon';
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Mail, Phone, MapPin, ExternalLink, ChevronDown } from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const worksRef = useRef(null)
  const servicesRef = useRef(null)
  const contactRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const isWorksInView = useInView(worksRef, { once: true, margin: "-100px" })
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const isContactInView = useInView(contactRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const media = {
    image1: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-jpeg-1.jpg",
    video1: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-video-1.mp4",
    image2: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-jpeg-2.jpg",
    svg1: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-svg-4.svg",
    svg2: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-svg-5.svg",
    svg3: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-svg-6.svg",
    animation1: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-animation-7.mp4"
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}
      >
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection(heroRef)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-black text-xl">
              P
            </div>
            <span className="text-xl font-bold tracking-tight">Portfolio</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Главная', ref: heroRef },
              { name: 'Обо мне', ref: aboutRef },
              { name: 'Работы', ref: worksRef },
              { name: 'Услуги', ref: servicesRef },
              { name: 'Контакты', ref: contactRef }
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          <motion.button
            className="hidden md:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection(contactRef)}
          >
            Связаться
            <SafeIcon name="arrow-right" size={16} />
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <SafeIcon name={isMenuOpen ? "x" : "menu"} size={24} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="flex flex-col p-4 gap-4">
                {[
                  { name: 'Главная', ref: heroRef },
                  { name: 'Обо мне', ref: aboutRef },
                  { name: 'Работы', ref: worksRef },
                  { name: 'Услуги', ref: servicesRef },
                  { name: 'Контакты', ref: contactRef }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.ref)}
                    className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={media.video1}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-purple-300 border border-white/20">
                Добро пожаловать в моё портфолио
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-title text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6"
            >
              Творческий{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                разработчик
              </span>
              <br /> и дизайнер
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
            >
              Создаю уникальные цифровые впечатления, объединяющие современный дизайн и передовые технологии. Давайте воплотим ваши идеи в жизнь.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => scrollToSection(worksRef)}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Смотреть работы
                <SafeIcon name="arrow-right" size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection(aboutRef)}
                className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Узнать больше
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
            onClick={() => scrollToSection(aboutRef)}
          >
            <span className="text-xs uppercase tracking-widest">Прокрутите</span>
            <SafeIcon name="chevron-down" size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 md:py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src={media.image1}
                  alt="Обо мне"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 md:right-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
              >
                <div className="text-4xl font-black text-purple-400">5+</div>
                <div className="text-sm text-gray-300">Лет опыта</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Обо мне</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-6 leading-tight">
                Страсть к созданию{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  цифрового искусства
                </span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Я — творческий разработчик с многолетним опытом в создании впечатляющих веб-интерфейсов и цифровых продуктов. Моя специализация включает фронтенд-разработку, UI/UX дизайн и интерактивную анимацию.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Каждый проект для меня — это возможность создать что-то уникальное, что будет радовать пользователей и приносить реальную пользу бизнесу. Я верю в сочетание эстетики и функциональности.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '50+', label: 'Завершённых проектов' },
                  { number: '30+', label: 'Довольных клиентов' },
                  { number: '100%', label: 'Качество работы' },
                  { number: '24/7', label: 'Поддержка' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="text-2xl font-black text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section ref={worksRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={media.animation1}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Портфолио</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Мои последние{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                работы
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Коллекция проектов, демонстрирующих мои навыки в дизайне и разработке
            </p>
          </motion.div>

          {/* Works Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Work Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={media.image2}
                alt="Проект 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">Брендинг и веб-дизайн</h3>
                <p className="text-gray-300 text-sm mb-4">Создание фирменного стиля и сайта</p>
                <button className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  Смотреть проект
                  <SafeIcon name="arrow-right" size={16} />
                </button>
              </div>
            </motion.div>

            {/* Work Item 2 - Video */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={media.video1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">Видеопродакшн</h3>
                <p className="text-gray-300 text-sm mb-4">Создание рекламного контента</p>
                <button className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  Смотреть проект
                  <SafeIcon name="arrow-right" size={16} />
                </button>
              </div>
            </motion.div>

            {/* Work Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isWorksInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer md:col-span-2"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={media.animation1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-bold mb-2">3D Анимация и визуализация</h3>
                <p className="text-gray-300 text-sm mb-4">Создание реалистичной анимации для рекламных кампаний</p>
                <button className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
                  Смотреть проект
                  <SafeIcon name="arrow-right" size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 md:py-32 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Услуги</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
              Что я{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                предлагаю
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Полный спектр услуг для создания вашего цифрового присутствия
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={media.svg1}
                  alt="Веб-разработка"
                  className="w-8 h-8 relative z-10 filter invert brightness-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,1)] transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Веб-разработка</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Создание современных и функциональных веб-сайтов с использованием передовых технологий и лучших практик разработки.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  React / Vue / Next.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Адаптивный дизайн
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Оптимизация скорости
                </li>
              </ul>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={media.svg2}
                  alt="UI/UX Дизайн"
                  className="w-8 h-8 relative z-10 filter invert brightness-200 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,1)] transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">UI/UX Дизайн</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Разработка интуитивных и привлекательных интерфейсов, которые обеспечивают лучший пользовательский опыт.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                  Пользовательские исследования
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                  Прототипирование
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                  Дизайн-системы
                </li>
              </ul>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:bg-white/10"
            >
              <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={media.svg3}
                  alt="Анимация"
                  className="w-8 h-8 relative z-10 filter invert brightness-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(236,72,153,1)] transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Анимация и Motion</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Создание плавных и впечатляющих анимаций, которые делают интерфейс живым и запоминающимся.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Micro-interactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Scroll animations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  3D визуализация
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 md:py-32 bg-black relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Контакты</span>
              <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
                Давайте{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  работать вместе
                </span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Готов обсудить ваш проект и помочь воплотить идеи в реальность
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Свяжитесь со мной</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Заполните форму или используйте контактную информацию ниже. Я отвечу вам в ближайшее время.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                        <SafeIcon name="mail" size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Email</div>
                        <div className="font-medium">hello@portfolio.com</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                        <SafeIcon name="phone" size={20} className="text-pink-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Телефон</div>
                        <div className="font-medium">+7 (999) 123-45-67</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                        <SafeIcon name="map-pin" size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Локация</div>
                        <div className="font-medium">Москва, Россия</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Имя</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Сообщение</label>
                    <textarea
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white placeholder-gray-500 resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Отправить сообщение
                    <SafeIcon name="arrow-right" size={20} />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-black text-xl">
                P
              </div>
              <span className="text-xl font-bold">Portfolio</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button onClick={() => scrollToSection(heroRef)} className="hover:text-white transition-colors">Главная</button>
              <button onClick={() => scrollToSection(worksRef)} className="hover:text-white transition-colors">Работы</button>
              <button onClick={() => scrollToSection(servicesRef)} className="hover:text-white transition-colors">Услуги</button>
              <button onClick={() => scrollToSection(contactRef)} className="hover:text-white transition-colors">Контакты</button>
            </div>

            <div className="text-gray-500 text-sm">
              © 2024 Portfolio. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App