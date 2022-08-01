import { useRef } from 'react';

import styles from '@/styles/Studios.module.scss';

const Studios: React.FC = () => {
  const videoBtn = useRef<HTMLButtonElement>(null);

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
            <button
              ref={videoBtn}
              className={styles.videobtn_container}
              // style={{ height: btnContainerHeight }}
            >
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
                Created to create
              </h1>
              <p className={styles.hero_paragraph}>
                <span>What is Pulse Studios?</span> <br />
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
      <section className={styles.studios_gallery_section}>
        <div className={styles.studios_description_container}>
          <h2 className={styles.studios_description_title}>
            Lorem <span>Ipsum</span>
          </h2>
          <p className={styles.studios_description_paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            voluptas inventore dolor provident
          </p>
        </div>

        {/* Gallery images */}
        <img
          src='/studios/groupmin.png'
          alt='group'
          className={styles.gallery_container}
        />
        {/* <div className={styles.gallery_container}>
          <div className={styles.gallery_leftside}>
            <div className={styles.gallery_leftupper}>
              <img src='/studios/gappledavi.png' alt='pulse gappled avi' />
              <div>
                <img
                  src='/studios/teamtagethumb.png'
                  alt='pulse teamtage thumbnail'
                />
                <img src='/studios/pulseheader.png' alt='pulse gappled avi' />
              </div>
            </div>
            <div className={styles.gallery_leftlower}>
              <img
                src='/studios/crimsicheader.png'
                alt='pulse crimsic banner'
              />
              <img src='/studios/leviathanavi.png' alt='pulse leviathan avi' />
            </div>
          </div>
          <div className={styles.gallery_rightside}>
            <div className={styles.gallery_rightside_top}>
              <img src='/studios/kaiavi.png' alt='pulse kai avi' />
              <img
                src='/studios/templethumb.png'
                alt='pulse themple thumbnail'
              />
            </div>
            <div className={styles.gallery_rightside_middle}>
              <img src='/studios/kai2avi.png' alt='pulse kai avi' />
              <img
                src='/studios/aimpunchavi.png'
                alt='pulse themple thumbnail'
              />
            </div>
            <img src='/studios/semwallpaper.png' alt='pulse wallpaper' />
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Studios;
