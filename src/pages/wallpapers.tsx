import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useRef, useState } from 'react';

import wallpaperList from '@/helpers/wallpaperList';
import styles from '@/styles/Wallpapers.module.scss';

const Wallpapers: React.FC = () => {
  const [selectedWallpaperType, setSelectedWallpaperType] = useState<
    'desktop' | 'mobile'
  >('desktop');
  const desktopBtn = useRef<HTMLButtonElement>(null);
  const mobileBtn = useRef<HTMLButtonElement>(null);

  const desktopMainCarousel = useRef(null);
  const desktopThumbnailCarousel = useRef(null);

  const mobileMainCarousel = useRef(null);
  const mobileThumbnailCarousel = useRef(null);

  const desktopWallpapers = wallpaperList.filter(
    wallpaper => wallpaper.type === 'desktop',
  );
  const mobileWallpapers = wallpaperList.filter(
    wallpaper => wallpaper.type === 'mobile',
  );

  useEffect(() => {
    const carouselArrows = document.querySelectorAll('.splide__arrow');

    carouselArrows.forEach(arrow => {
      arrow.innerHTML = `<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.556 11.49L6.6747 6.44033M1.52802 1.33087L6.67546 6.44271" stroke="black" stroke-width="1.50068" stroke-linecap="square"/>
      </svg>
      `;
    });
  }, [selectedWallpaperType]);

  useEffect(() => {
    if (selectedWallpaperType === 'desktop') {
      //@ts-ignore
      desktopMainCarousel.current.sync(desktopThumbnailCarousel.current.splide);
    } else {
      //@ts-ignore
      mobileMainCarousel.current.sync(mobileThumbnailCarousel.current.splide);
    }
  }, [
    desktopMainCarousel,
    desktopThumbnailCarousel,
    mobileMainCarousel,
    mobileThumbnailCarousel,
    selectedWallpaperType,
  ]);

  const switchWallpaperType = (wallpaperType: 'desktop' | 'mobile') => {
    desktopBtn.current!.classList.remove(
      'Wallpapers_wallpaper_type_btn_active__zQKu5',
    );
    mobileBtn.current!.classList.remove(
      'Wallpapers_wallpaper_type_btn_active__zQKu5',
    );

    eval(`${wallpaperType}Btn`).current!.classList.add(
      'Wallpapers_wallpaper_type_btn_active__zQKu5',
    );

    setSelectedWallpaperType(wallpaperType);
  };

  return (
    <div className={styles.studios_wrapper}>
      <main className={styles.hero_wrapper}>
        <img
          aria-hidden
          src='/recruitment/bgshapes.svg'
          alt='squares'
          className={styles.bg_squaresimg}
        />
        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <button className={styles.videobtn_container}>
              <img
                src='/playbutton.svg'
                alt='play button'
                className={styles.video_play}
              />
              <img
                src='/studios/playbackgroundmin.png'
                alt='video background'
                // className={styles.video_btn}
                className={styles.video_bg}
              />
            </button>
            <div className={styles.hero_textcontainer}>
              <h1 className={styles.hero_header}>
                <span className={styles.hero_header_subtext}>
                  We are <span>Pulse Studios.</span>
                </span>
                Try our wallpapers <br /> right now!
              </h1>
              <p className={styles.hero_paragraph}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore.
              </p>
              <div className={styles.hero_socialicons_container}>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://twitter.com/ThePulseStudios'
                >
                  <img
                    className={styles.socialmedia_icon}
                    src='/socialmediaicons/twitter.svg'
                    alt='twitter'
                  />
                </a>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://discord.gg/Bh9XNeZ74U'
                >
                  <img
                    className={styles.socialmedia_icon}
                    src='/socialmediaicons/discord.svg'
                    alt='discord'
                  />
                </a>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.behance.net/PulseStudios'
                >
                  <img
                    className={styles.socialmedia_icon}
                    src='/socialmediaicons/behance.svg'
                    alt='behance'
                  />
                </a>
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.youtube.com/pulsestudiosyt'
                >
                  <img
                    className={styles.socialmedia_icon}
                    src='/socialmediaicons/youtube.svg'
                    alt='youtube'
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <img
          src='/studios/pulsestudiosbannermin.png'
          alt='pulse studios banner'
          className={styles.studios_banner}
        />
      </main>

      {/* Carousel section */}

      <section className={styles.carousel_section}>
        <div className={styles.wallpaper_type_container}>
          <button
            onClick={() => switchWallpaperType('desktop')}
            ref={desktopBtn}
            className={`${styles.wallpaper_type_btn} ${styles.wallpaper_type_btn_active}`}
          >
            DESKTOP
          </button>
          <button
            onClick={() => switchWallpaperType('mobile')}
            ref={mobileBtn}
            className={`${styles.wallpaper_type_btn} ${styles.hero_cta}`}
          >
            MOBILE
          </button>
        </div>

        {selectedWallpaperType === 'desktop' ? (
          <>
            <Splide
              ref={desktopMainCarousel}
              options={{
                rewind: true,
                // gap: '1rem',
                type: 'loop',
                perPage: 1,
                perMove: 1,
                pagination: false,
                // height: '10rem',
              }}
              aria-label='Pulse Clan wallpapers'
              className={styles.splide_carousel}
            >
              {desktopWallpapers.map(wallpaperObj => (
                <SplideSlide key={wallpaperObj.name}>
                  <WallpaperElement
                    name={wallpaperObj.name}
                    author={wallpaperObj.author}
                    authorSocials={wallpaperObj.authorSocials}
                    authorSocialsLink={wallpaperObj.authorSocialsLink}
                    url={wallpaperObj.url}
                    compressedUrl={wallpaperObj.compressedUrl}
                  />
                </SplideSlide>
              ))}
            </Splide>

            <div className='splide_thumbnail_carousel'>
              <Splide
                ref={desktopThumbnailCarousel}
                options={{
                  rewind: true,
                  gap: '0.1rem',
                  type: 'loop',
                  perPage: 4,
                  perMove: 1,
                  pagination: false,
                  isNavigation: true,
                  arrows: false,

                  breakpoints: {
                    767: {
                      perPage: 3,
                    },
                    390: {
                      perPage: 2,
                    },
                  },
                }}
                className={styles.splide_carousel}
              >
                {desktopWallpapers.map(wallpaperObj => (
                  <SplideSlide key={wallpaperObj.name}>
                    <WallpaperElement
                      name={wallpaperObj.name}
                      author={wallpaperObj.author}
                      authorSocials={wallpaperObj.authorSocials}
                      authorSocialsLink={wallpaperObj.authorSocialsLink}
                      url={wallpaperObj.url}
                      compressedUrl={wallpaperObj.compressedUrl}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </>
        ) : (
          <>
            <div className={styles.mobile_carousel}>
              <Splide
                ref={mobileMainCarousel}
                options={{
                  rewind: true,
                  // gap: '1rem',
                  type: 'loop',
                  perPage: 1,
                  perMove: 1,
                  pagination: false,
                  // height: '10rem',
                }}
                aria-label='Pulse Clan wallpapers'
                className={styles.splide_carousel}
              >
                {mobileWallpapers.map(wallpaperObj => (
                  <SplideSlide key={wallpaperObj.name}>
                    <WallpaperElement
                      name={wallpaperObj.name}
                      author={wallpaperObj.author}
                      authorSocials={wallpaperObj.authorSocials}
                      authorSocialsLink={wallpaperObj.authorSocialsLink}
                      url={wallpaperObj.url}
                      compressedUrl={wallpaperObj.compressedUrl}
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>

            <div className='splide_thumbnail_carousel'>
              <Splide
                ref={mobileThumbnailCarousel}
                options={{
                  rewind: true,
                  gap: '0.1rem',
                  type: 'loop',
                  perPage: 4,
                  perMove: 1,
                  pagination: false,
                  isNavigation: true,
                  arrows: false,
                  // height: '10rem',

                  breakpoints: {
                    767: {
                      perPage: 3,
                    },
                    390: {
                      perPage: 2,
                    },
                  },
                }}
                className={styles.splide_carousel}
              >
                {mobileWallpapers.map(wallpaperObj => (
                  <SplideSlide key={wallpaperObj.name}>
                    <WallpaperElement
                      name={wallpaperObj.name}
                      author={wallpaperObj.author}
                      authorSocials={wallpaperObj.authorSocials}
                      authorSocialsLink={wallpaperObj.authorSocialsLink}
                      url={wallpaperObj.url}
                      compressedUrl={wallpaperObj.compressedUrl}
                      type='mobile'
                    />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

//? Wallpaper element component

export interface WallpaperElementProps {
  url: string;
  compressedUrl: string;
  name: string;
  author: string;
  authorSocials: string;
  authorSocialsLink: string;
  type?: 'desktop' | 'mobile';
}

const WallpaperElement: React.FC<WallpaperElementProps> = ({
  url,
  compressedUrl,
  name,
  author,
  authorSocials,
  authorSocialsLink,
  type,
}) => {
  return (
    <div
      className={`${styles.wallpaper_container} ${
        type === 'mobile' && 'mobile_thumb_carousel'
      }`}
    >
      <div className={styles.wallpaper_detailscontainer}>
        <h2>{name}</h2>
        <h3>by {author}</h3>
        <p>
          ALL RIGHTS RESERVED &reg; <br />{' '}
          <a href={authorSocialsLink}>{authorSocials}</a>
        </p>
      </div>
      <div className={styles.wallpaper_downloadcontainer}>
        <img src='/pulselogo.svg' alt='pulse logo' />
        <div className={styles.download_line} aria-hidden></div>
        <a href={url}>DOWNLOAD &nbsp; &nbsp; &nbsp;</a>
      </div>
      <img
        src={compressedUrl}
        alt={`${name} wallpaper by ${author}`}
        className={styles.wallpaper_image}
      />
    </div>
  );
};

export default Wallpapers;
