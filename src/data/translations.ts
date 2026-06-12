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
  }
  work: {
    title: string
  }
  showreel: {
    title: string
    description: string
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
    playground: { title: 'Playground' },
    work: { title: 'Selected Work' },
    showreel: { title: 'Showreel', description: 'Selected work' },
  },
  es: {
    nav: { home: 'Inicio', work: 'Trabajos', about: 'Sobre mí', showreel: 'Showreel', cv: 'CV', playground: 'Playground' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Domino todo el pipeline de producción, optimizando 3D en tiempo real para WebXR y usando flujos de IA para crear contenido de alto impacto.',
      tagline2: '25M+ vistas. 0% relleno. Listo mundialmente.',
      ctaWork: 'Ver Portafolio →',
      ctaAbout: 'Sobre Mí',
      scroll: 'Desliza para explorar',
    },
    stats: {
      views: 'Vistas Orgánicas',
      experience: 'Años de Experiencia',
      students: 'Estudiantes Capacitados',
      exhibitions: 'Exposiciones Internacionales',
    },
    about: {
      title: 'Sobre Mí',
      skills: 'Habilidades',
      experience: 'Experiencia',
      teaching: 'Enseñanza & Comunidad',
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
    playground: { title: 'Playground' },
    work: { title: 'Trabajos Seleccionados' },
    showreel: { title: 'Showreel', description: 'Trabajos seleccionados' },
  },
  ru: {
    nav: { home: 'Главная', work: 'Работы', about: 'Обо мне', showreel: 'Шоурил', cv: 'Резюме', playground: 'Playground' },
    hero: {
      title1: '3D Motion Designer & CGI Generalist',
      tagline1: 'Я владею полным производственным конвейером, оптимизируя 3D в реальном времени для WebXR и используя ИИ для создания высокообъемного контента.',
      tagline2: '25M+ просмотров. 0% воды. Готов к работе по всему миру.',
      ctaWork: 'Смотреть Портфолио →',
      ctaAbout: 'Обо Мне',
      scroll: 'Листайте для изучения',
    },
    stats: {
      views: 'Органических просмотров',
      experience: 'Лет Опыта',
      students: 'Обучено Студентов',
      exhibitions: 'Международных Выставок',
    },
    about: {
      title: 'Обо Мне',
      skills: 'Навыки',
      experience: 'Опыт',
      teaching: 'Преподавание & Сообщество',
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
    playground: { title: 'Playground' },
    work: { title: 'Избранные Работы' },
    showreel: { title: 'Шоурил', description: 'Избранные работы' },
  },
}

export const cvPaths: Record<Lang, string> = {
  en: '/cv/Tony_Darko_CV_EN.pdf',
  es: '/cv/Tony_Darko_CV_ES.pdf',
  ru: '/cv/Tony_Darko_CV_RU.pdf',
}