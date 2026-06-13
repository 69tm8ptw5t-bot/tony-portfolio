export type Lang = 'en' | 'es' | 'ru'

export interface Translations {
  nav: {
    home: string
    work: string
    about: string
    showreel: string
    cv: string
    playground: string
    language: string
  }
  hero: {
    title1: string
    tagline1: string
    tagline2: string
    ctaWork: string
    ctaAbout: string
    scroll: string
    watchReel: string
    viewPortfolio: string
    aboutMe: string
    typewriterWords: string[]
  }
  stats: {
    byTheNumbers: string
    views: string
    experience: string
    students: string
    exhibitions: string
  }
  about: {
    title: string
    skills: string
    experience: string
    teaching: string
    recognition: string
    education: string
    languages: string
    contact: string
    cta: string
    scrollExplore: string
    alwaysLearning: string
    educationDegree: string
    educationSchool: string
    languagesList: { name: string; level: string }[]
    heroPipeline: string
  }
  footer: {
    tagline: string
    navigate: string
    contact: string
    social: string
    copyright: string
    remoteAvailable: string
  }
  playground: {
    title: string
    videos: string[]
  }
  work: {
    title: string
  }
  showreel: {
    title: string
  }
  loading: {
    text: string
  }
}

export const translations: Record<Lang, Translations> = {
  en: {
    nav: { home: 'Home', work: 'Work', about: 'About', showreel: 'Showreel', cv: 'CV', playground: 'Playground', language: 'Language' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'I own the full production pipeline, optimizing real-time 3D for WebXR and leveraging AI workflows to build high-volume, hook-driven content.',
      tagline2: '25M+ views. 0% fluff. Ready worldwide.',
      ctaWork: 'See Portfolio →',
      ctaAbout: 'About Me',
      scroll: 'Scroll to explore',
      watchReel: 'Watch Reel',
      viewPortfolio: 'View Portfolio',
      aboutMe: 'About Me',
      typewriterWords: ['3D Generalist', 'CGI Artist'],
    },
    stats: {
      byTheNumbers: 'By the Numbers',
      views: 'Organic Views',
      experience: 'Years Experience',
      students: 'Students Trained',
      exhibitions: 'Intl. Exhibitions',
    },
    about: {
      title: 'About',
      skills: 'Skills',
      experience: 'Experience',
      teaching: 'Teaching & Community',
      recognition: 'Recognition',
      education: 'Education',
      languages: 'Languages',
      contact: 'Contact',
      cta: 'See Portfolio →',
      scrollExplore: 'Scroll to explore',
      alwaysLearning: 'Always looking to learn something new ✦',
      educationDegree: "Bachelor's in Graphic Design",
      educationSchool: 'BUAP — Benemérita Universidad Autónoma de Puebla · 2016–2021',
      languagesList: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'Professional (C1)' },
        { name: 'Russian', level: 'Intermediate B1' },
      ],
      heroPipeline: 'I own the full production pipeline, optimizing real-time 3D for WebXR and leveraging AI workflows to build high-volume, hook-driven content.',
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Navigate',
      contact: 'Contact',
      social: 'Social',
      copyright: 'Tony Darko. All rights reserved.',
      remoteAvailable: 'Remote Full time/Contract Available',
    },
    playground: {
      title: 'Playground',
      videos: [
        'Zack D Films style',
        'IA Motion Capture Retarget',
        'Realtime FaceCapture with Arkit',
        'Stylized Animation',
        'IA rendering',
        'Lowpoly shorts style breackdown',
        'Low Poly assets with same atlas texture',
        '3D animated infographic breackdown',
      ],
    },
    work: { title: 'Selected Work' },
    showreel: { title: 'Showreel' },
    loading: { text: 'Loading...' },
  },
  es: {
    nav: { home: 'Inicio', work: 'Trabajos', about: 'Sobre mí', showreel: 'Showreel', cv: 'CV', playground: 'Playground', language: 'Idioma' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Manejo el pipeline completo de producción, optimizando 3D en tiempo real para WebXR y aplicando flujos de IA para generar contenido de alto impacto.',
      tagline2: '25M+ vistas. Sin rodeos. Listo en todo el mundo.',
      ctaWork: 'Ver Portafolio →',
      ctaAbout: 'Sobre Mí',
      scroll: 'Desliza para explorar',
      watchReel: 'Ver Reel',
      viewPortfolio: 'Ver Portafolio',
      aboutMe: 'Sobre Mí',
      typewriterWords: ['3D Generalist', 'Artista CGI'],
    },
    stats: {
      byTheNumbers: 'En Números',
      views: 'Vistas Orgánicas',
      experience: 'Años de Experiencia',
      students: 'Estudiantes Capacitados',
      exhibitions: 'Exposiciones Internacionales',
    },
    about: {
      title: 'Sobre Mí',
      skills: 'Habilidades',
      experience: 'Experiencia',
      teaching: 'Enseñanza y Comunidad',
      recognition: 'Reconocimientos',
      education: 'Educación',
      languages: 'Idiomas',
      contact: 'Contacto',
      cta: 'Ver Portafolio →',
      scrollExplore: 'Desliza para explorar',
      alwaysLearning: 'Siempre buscando aprender algo nuevo ✦',
      educationDegree: 'Licenciatura en Diseño Gráfico',
      educationSchool: 'BUAP — Benemérita Universidad Autónoma de Puebla · 2016–2021',
      languagesList: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'Profesional (C1)' },
        { name: 'Ruso', level: 'Intermedio B1' },
      ],
      heroPipeline: 'Manejo el pipeline completo de producción, optimizando 3D en tiempo real para WebXR y aplicando flujos de IA para generar contenido de alto impacto.',
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Navegar',
      contact: 'Contacto',
      social: 'Redes',
      copyright: 'Tony Darko. Todos los derechos reservados.',
      remoteAvailable: 'Disponible Remoto Tiempo Completo/Contrato',
    },
    playground: {
      title: 'Playground',
      videos: [
        'Estilo Zack D Films',
        'Retarget de Captura de Movimiento con IA',
        'Captura Facial en Tiempo Real con Arkit',
        'Animación Estilizada',
        'Renderizado con IA',
        'Short Lowpoly — Desglose de estilo',
        'Assets Low Poly con misma textura atlas',
        'Infografía animada en 3D — Desglose',
      ],
    },
    work: { title: 'Trabajos Seleccionados' },
    showreel: { title: 'Showreel' },
    loading: { text: 'Cargando...' },
  },
  ru: {
    nav: { home: 'Главная', work: 'Работы', about: 'Обо мне', showreel: 'Шоурил', cv: 'Резюме', playground: 'Playground', language: 'Язык' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Управляю полным производственным циклом, оптимизируя 3D в реальном времени для WebXR и используя ИИ для создания высокообъемного контента.',
      tagline2: '25M+ просмотров. Без лишнего. Готов к работе по всему миру.',
      ctaWork: 'Смотреть Портфолио →',
      ctaAbout: 'Обо Мне',
      scroll: 'Листайте для изучения',
      watchReel: 'Смотреть Рил',
      viewPortfolio: 'Смотреть Портфолио',
      aboutMe: 'Обо Мне',
      typewriterWords: ['3D Generalist', 'CGI Художник'],
    },
    stats: {
      byTheNumbers: 'В Цифрах',
      views: 'Органических просмотров',
      experience: 'Лет Опыта',
      students: 'Обучено Студентов',
      exhibitions: 'Международных Выставок',
    },
    about: {
      title: 'Обо Мне',
      skills: 'Навыки',
      experience: 'Опыт',
      teaching: 'Преподавание и Сообщество',
      recognition: 'Признание',
      education: 'Образование',
      languages: 'Языки',
      contact: 'Контакты',
      cta: 'Смотреть Портфолио →',
      scrollExplore: 'Листайте для изучения',
      alwaysLearning: 'Всегда стремлюсь узнать что-то новое ✦',
      educationDegree: 'Бакалавр графического дизайна',
      educationSchool: 'BUAP — Автономный университет Пуэблы · 2016–2021',
      languagesList: [
        { name: 'Испанский', level: 'Родной' },
        { name: 'Английский', level: 'Профессиональный (C1)' },
        { name: 'Русский', level: 'Средний B1' },
      ],
      heroPipeline: 'Управляю полным производственным циклом, оптимизируя 3D в реальном времени для WebXR и используя ИИ для создания высокообъемного контента.',
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Навигация',
      contact: 'Контакты',
      social: 'Соцсети',
      copyright: 'Tony Darko. Все права защищены.',
      remoteAvailable: 'Удаленная работа Полный день/Контракт',
    },
    playground: {
      title: 'Playground',
      videos: [
        'Стиль Zack D Films',
        'Ретаргетинг захвата движений с ИИ',
        'Захват лиц в реальном времени с Arkit',
        'Стилизованная анимация',
        'Рендеринг с ИИ',
        'Lowpoly shorts — разбор стиля',
        'Low Poly ассеты с одной atlas текстурой',
        '3D анимированная инфографика — разбор',
      ],
    },
    work: { title: 'Избранные Работы' },
    showreel: { title: 'Шоурил' },
    loading: { text: 'Загрузка...' },
  },
}

export const cvPaths: Record<Lang, string> = {
  en: '/cv/Tony_Darko_CV_EN.pdf',
  es: '/cv/Tony_Darko_CV_ES.pdf',
  ru: '/cv/Tony_Darko_CV_RU.pdf',
}