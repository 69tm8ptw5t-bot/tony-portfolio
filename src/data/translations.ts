export type Lang = 'en' | 'es' | 'ru'

export interface Translations {
  nav: {
    home: string
    work: string
    about: string
    showreel: string
    cv: string
    playground: string
  }
  hero: {
    title1: string
    tagline1: string
    tagline2: string
    ctaWork: string
    ctaAbout: string
    scroll: string
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
  }
  footer: {
    tagline: string
    navigate: string
    contact: string
    social: string
    copyright: string
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
    nav: { home: 'Home', work: 'Work', about: 'About', showreel: 'Showreel', cv: 'CV', playground: 'Playground' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'I own the full production pipeline, optimizing real-time 3D for WebXR and leveraging AI workflows to build high-volume, hook-driven content.',
      tagline2: '25M+ views. 0% fluff. Ready worldwide.',
      ctaWork: 'See Portfolio →',
      ctaAbout: 'About Me',
      scroll: 'Scroll to explore',
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
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Navigate',
      contact: 'Contact',
      social: 'Social',
      copyright: 'Tony Darko. All rights reserved.',
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
    loading: { text: 'Loading experience' },
  },
  es: {
    nav: { home: 'Inicio', work: 'Trabajos', about: 'Sobre mí', showreel: 'Showreel', cv: 'CV', playground: 'Playground' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Manejo el pipeline completo de producción, optimizando 3D en tiempo real para WebXR y aplicando flujos de IA para generar contenido de alto impacto.',
      tagline2: '25M+ vistas. Sin rodeos. Listo en todo el mundo.',
      ctaWork: 'Ver Portafolio →',
      ctaAbout: 'Sobre Mí',
      scroll: 'Desliza para explorar',
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
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Navegar',
      contact: 'Contacto',
      social: 'Redes',
      copyright: 'Tony Darko. Todos los derechos reservados.',
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
    loading: { text: 'Cargando experiencia' },
  },
  ru: {
    nav: { home: 'Главная', work: 'Работы', about: 'Обо мне', showreel: 'Шоурил', cv: 'Резюме', playground: 'Playground' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Управляю полным производственным циклом, оптимизируя 3D в реальном времени для WebXR и используя ИИ для создания высокообъемного контента.',
      tagline2: '25M+ просмотров. Без лишнего. Готов к работе по всему миру.',
      ctaWork: 'Смотреть Портфолио →',
      ctaAbout: 'Обо Мне',
      scroll: 'Листайте для изучения',
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
    },
    footer: {
      tagline: '3D Motion Designer  ·  CGI Generalist',
      navigate: 'Навигация',
      contact: 'Контакты',
      social: 'Соцсети',
      copyright: 'Tony Darko. Все права защищены.',
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
    loading: { text: 'Загрузка опыта' },
  },
}

export const cvPaths: Record<Lang, string> = {
  en: '/cv/Tony_Darko_CV_EN.pdf',
  es: '/cv/Tony_Darko_CV_ES.pdf',
  ru: '/cv/Tony_Darko_CV_RU.pdf',
}