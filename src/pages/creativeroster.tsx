import { gsap, Power2 } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';

import creativeRosterMembers from '@/helpers/creativeRosterMembers';
import styles from '@/styles/Creativeroster.module.scss';

const CreativeRoster: React.FC = () => {
  const [overflowingRosterContainers, setOverflowingRosterContainers] =
    useState({
      designer: true,
      editor: true,
      motionDesigner: false,
      soundDesigner: false,
    });

  //* Designers
  const designerRosterSection = useRef<HTMLDivElement>(null);
  const designerRosterGrid = useRef<HTMLDivElement>(null);
  const designerRosterBtn = useRef<HTMLButtonElement>(null);

  const designerRoster = creativeRosterMembers.filter(
    member => member.type === 'designer',
  );

  //* Editors
  const editorRosterSection = useRef<HTMLDivElement>(null);
  const editorRosterGrid = useRef<HTMLDivElement>(null);
  const editorRosterBtn = useRef<HTMLButtonElement>(null);

  const editorRoster = creativeRosterMembers.filter(
    member => member.type === 'editor',
  );

  //* Motion designers
  const motionDesignerRosterSection = useRef<HTMLDivElement>(null);
  const motionDesignerRosterGrid = useRef<HTMLDivElement>(null);
  const motionDesignerRosterBtn = useRef<HTMLButtonElement>(null);

  const motionDesignerRoster = creativeRosterMembers.filter(
    member => member.type === 'motionDesigner',
  );

  //* Sound designers
  const soundDesignerRosterSection = useRef<HTMLDivElement>(null);
  const soundDesignerRosterGrid = useRef<HTMLDivElement>(null);
  const soundDesignerRosterBtn = useRef<HTMLButtonElement>(null);

  const soundDesignerRoster = creativeRosterMembers.filter(
    member => member.type === 'soundDesigner',
  );

  useEffect(() => {
    const checkOverflow = (element: HTMLDivElement) => {
      if (element.scrollHeight > 472) return true;

      return false;
    };

    const handleResize = () => {
      setOverflowingRosterContainers({
        designer: checkOverflow(designerRosterGrid.current!),
        editor: checkOverflow(editorRosterGrid.current!),
        motionDesigner: checkOverflow(motionDesignerRosterGrid.current!),
        soundDesigner: checkOverflow(soundDesignerRosterGrid.current!),
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const cards = document.querySelectorAll(
      '.Creativeroster_member_container__1yQpX',
    );

    //@ts-ignore
    VanillaTilt.init(cards);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const setContainerHeight = (
      rosterType: 'designer' | 'editor' | 'motionDesigner' | 'soundDesigner',
    ) => {
      const rosterGrid: HTMLDivElement = eval(`${rosterType}RosterGrid`)
        .current!;

      const rosterButton: HTMLButtonElement = eval(`${rosterType}RosterBtn`)
        .current!;

      if (eval(`overflowingRosterContainers.${rosterType}`)) {
        rosterGrid.style.height = '472px';

        rosterButton.innerHTML = 'EXPAND ROSTER &nbsp; &nbsp;';
        rosterButton.classList.remove(
          'Creativeroster_expand_roster_btn_active__jqBku',
        );
      }
    };

    setContainerHeight('designer');
    setContainerHeight('editor');
    setContainerHeight('motionDesigner');
    setContainerHeight('soundDesigner');
  }, [overflowingRosterContainers]);

  //* Toggle roster button
  const toggleRoster = (
    rosterType: 'designer' | 'editor' | 'motionDesigner' | 'soundDesigner',
  ) => {
    const rosterSection: HTMLDivElement = eval(`${rosterType}RosterSection`)
      .current!;

    const rosterGrid: HTMLDivElement = eval(`${rosterType}RosterGrid`).current!;

    const rosterButton: HTMLButtonElement = eval(`${rosterType}RosterBtn`)
      .current!;

    const rosterHeight = getComputedStyle(rosterGrid).height;

    if (rosterHeight === '472px') {
      gsap.to(rosterGrid, {
        height: 'auto',
        duration: 0.3,
        ease: Power2.easeOut,
      });

      rosterButton.innerHTML = 'COLLAPSE ROSTER &nbsp; &nbsp;';
      rosterButton.classList.add(
        'Creativeroster_expand_roster_btn_active__jqBku',
      );
    } else {
      gsap.to(rosterGrid, {
        height: '472px',
        duration: 0.3,
        ease: Power2.easeOut,
      });
      rosterButton.innerHTML = 'EXPAND ROSTER &nbsp; &nbsp;';
      rosterButton.classList.remove(
        'Creativeroster_expand_roster_btn_active__jqBku',
      );

      if (window.innerWidth < 1000 || rosterType === 'soundDesigner') {
        rosterSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }
  };

  //* Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    //| gsap.registerPlugin(CSSRulePlugin);

    ScrollTrigger.refresh();

    //| const rosterBtnArrow = CSSRulePlugin.getRule(
    //   '.Creativeroster_expand_roster_btn__xRIyx:after',
    // );

    //| gsap.to(rosterBtnArrow, {
    //   marginTop: '3px',
    //   duration: 0.7,
    //   yoyo: true,
    //   repeat: -1,
    // });

    gsap.fromTo(
      '.designerRosterCard',
      {
        y: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.designerRosterCard',
          start: 'top center',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
      },
    );

    gsap.fromTo(
      '.editorRosterCard',
      {
        y: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.editorRosterCard',
          start: 'top center',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
      },
    );

    gsap.fromTo(
      '.motionDesignerRosterCard',
      {
        y: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.motionDesignerRosterCard',
          start: 'top center',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
      },
    );

    gsap.fromTo(
      '.soundDesignerRosterCard',
      {
        y: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.soundDesignerRosterCard',
          start: 'top center',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
      },
    );

    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        trigger.disable();
        trigger.kill(true, false);
      });
    };
  }, []);

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
                className={styles.video_bg}
              />
            </button>
            <div className={styles.hero_textcontainer}>
              <h1 className={styles.hero_header}>
                <span className={styles.hero_header_subtext}>
                  We are <span>Pulse Studios.</span>
                </span>
                The creative minds <br /> behind our scenes
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
                    className={styles.hero_socialmedia_icon}
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
                    className={styles.hero_socialmedia_icon}
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
                    className={styles.hero_socialmedia_icon}
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
                    className={styles.hero_socialmedia_icon}
                    src='/socialmediaicons/youtube.svg'
                    alt='youtube'
                  />
                </a>
                <Link href={'/applications'}>
                  <a className={styles.applicant_type_btn}>APPLY HERE!&nbsp;</a>
                </Link>
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

      {/* Roster section */}

      <section className={styles.roster_section}>
        <div className={styles.roster_innersection} ref={designerRosterSection}>
          <div className={styles.roster_container}>
            <h2 className={styles.roster_section_title}>DESIGNERS</h2>
            <div className={styles.roster_section_line}></div>
            <p className={styles.roster_section_paragraph}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui,
              porro consequuntur, veniam, maiores dignissimos quibusdam eos
              voluptas ratione nobis vel ipsam et.
            </p>
            <div ref={designerRosterGrid} className={styles.roster_grid}>
              {designerRoster.map((member, index) => (
                <div
                  className={`${styles.member_container} designerRosterCard`}
                  key={`${member.name} ${index}`}
                >
                  <img
                    src='/roster/creativerostercard.svg'
                    alt=''
                    className={styles.member_rostercard}
                  />
                  <img
                    src={member.aviLink}
                    alt=''
                    className={styles.member_avi}
                  />
                  <img
                    src={`/roster/flags/${member.country}.svg`}
                    alt={`${member.name} is from ${member.country}`}
                    className={styles.member_country}
                  />
                  <h3 className={styles.member_name}>
                    {member.name.toUpperCase()}
                  </h3>
                  <h4 className={styles.member_type}>GRAPHICS DESIGNER</h4>
                  <div className={styles.member_socialmedia_icons}>
                    <img
                      src='/socialmediaicons/twitter.svg'
                      alt={`${member.name} twitter`}
                    />
                    <img
                      src='/socialmediaicons/twitter.svg'
                      alt={`${member.name} twitter`}
                    />
                    <img
                      src='/socialmediaicons/behance.svg'
                      alt={`${member.name} behance`}
                    />
                    <img
                      src='/socialmediaicons/youtube.svg'
                      alt={`${member.name} youtube`}
                    />
                    <img
                      src='/socialmediaicons/steam.svg'
                      alt={`${member.name} steam`}
                    />
                  </div>
                </div>
              ))}
            </div>
            {overflowingRosterContainers.designer && (
              <button
                ref={designerRosterBtn}
                onClick={() => toggleRoster('designer')}
                className={styles.expand_roster_btn}
              >
                EXPAND ROSTER &nbsp; &nbsp;
              </button>
            )}
          </div>
        </div>

        {/* Editor section */}

        <div
          className={styles.roster_innersection}
          style={{ backgroundColor: '#1d2027' }}
          ref={editorRosterSection}
        >
          <div className={styles.roster_container}>
            <h2 className={styles.roster_section_title}>EDITORS</h2>
            <div className={styles.roster_section_line}></div>
            <p className={styles.roster_section_paragraph}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui,
              porro consequuntur, veniam, maiores dignissimos quibusdam eos
              voluptas ratione nobis vel ipsam et.
            </p>
            <div ref={editorRosterGrid} className={styles.roster_grid}>
              {editorRoster.map((member, index) => (
                <div
                  className={`${styles.member_container} editorRosterCard`}
                  key={`${member.name} ${index}`}
                >
                  <img
                    src='/roster/creativerostercard.svg'
                    alt=''
                    className={styles.member_rostercard}
                  />
                  <img
                    src={member.aviLink}
                    alt=''
                    className={styles.member_avi}
                  />
                  <img
                    src={`/roster/flags/${member.country}.svg`}
                    alt={`${member.name} is from ${member.country}`}
                    className={styles.member_country}
                  />
                  <h3 className={styles.member_name}>
                    {member.name.toUpperCase()}
                  </h3>
                  <h4 className={styles.member_type}>VIDEO EDITOR</h4>
                  <div className={styles.member_socialmedia_icons}>
                    <img
                      src='/socialmediaicons/twitter.svg'
                      alt={`${member.name} twitter`}
                    />
                    <img
                      src='/socialmediaicons/behance.svg'
                      alt={`${member.name} behance`}
                    />
                    <img
                      src='/socialmediaicons/youtube.svg'
                      alt={`${member.name} youtube`}
                    />
                    <img
                      src='/socialmediaicons/steam.svg'
                      alt={`${member.name} steam`}
                    />
                  </div>
                </div>
              ))}
            </div>
            {overflowingRosterContainers.editor && (
              <button
                ref={editorRosterBtn}
                onClick={() => toggleRoster('editor')}
                className={styles.expand_roster_btn}
              >
                EXPAND ROSTER &nbsp; &nbsp;
              </button>
            )}
          </div>
        </div>

        {/* Motion designers */}

        <div
          className={styles.roster_innersection}
          ref={motionDesignerRosterSection}
        >
          <div className={styles.roster_container}>
            <h2 className={styles.roster_section_title}>MOTION DESIGNERS</h2>
            <div className={styles.roster_section_line}></div>
            <p className={styles.roster_section_paragraph}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui,
              porro consequuntur, veniam, maiores dignissimos quibusdam eos
              voluptas ratione nobis vel ipsam et.
            </p>
            <div ref={motionDesignerRosterGrid} className={styles.roster_grid}>
              {motionDesignerRoster.map((member, index) => (
                <div
                  className={`${styles.member_container} motionDesignerRosterCard`}
                  key={`${member.name} ${index}`}
                >
                  <img
                    src='/roster/creativerostercard.svg'
                    alt=''
                    className={styles.member_rostercard}
                  />
                  <img
                    src={member.aviLink}
                    alt=''
                    className={styles.member_avi}
                  />
                  <img
                    src={`/roster/flags/${member.country}.svg`}
                    alt={`${member.name} is from ${member.country}`}
                    className={styles.member_country}
                  />
                  <h3 className={styles.member_name}>
                    {member.name.toUpperCase()}
                  </h3>
                  <h4 className={styles.member_type}>MOTION DESIGNER</h4>
                  <div className={styles.member_socialmedia_icons}>
                    <img
                      src='/socialmediaicons/twitter.svg'
                      alt={`${member.name} twitter`}
                    />
                    <img
                      src='/socialmediaicons/behance.svg'
                      alt={`${member.name} behance`}
                    />
                    <img
                      src='/socialmediaicons/youtube.svg'
                      alt={`${member.name} youtube`}
                    />
                    <img
                      src='/socialmediaicons/steam.svg'
                      alt={`${member.name} steam`}
                    />
                  </div>
                </div>
              ))}
            </div>
            {overflowingRosterContainers.motionDesigner && (
              <button
                ref={motionDesignerRosterBtn}
                onClick={() => toggleRoster('motionDesigner')}
                className={styles.expand_roster_btn}
              >
                EXPAND ROSTER &nbsp; &nbsp;
              </button>
            )}
          </div>
        </div>

        {/* Sound designers */}

        <div
          className={styles.roster_innersection}
          style={{ backgroundColor: '#1d2027' }}
          ref={soundDesignerRosterSection}
        >
          <div className={styles.roster_container}>
            <h2 className={styles.roster_section_title}>SOUND DESIGNERS</h2>
            <div className={styles.roster_section_line}></div>
            <p className={styles.roster_section_paragraph}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui,
              porro consequuntur, veniam, maiores dignissimos quibusdam eos
              voluptas ratione nobis vel ipsam et.
            </p>
            <div ref={soundDesignerRosterGrid} className={styles.roster_grid}>
              {soundDesignerRoster.map((member, index) => (
                <div
                  className={`${styles.member_container} soundDesignerRosterCard`}
                  key={`${member.name} ${index}`}
                >
                  <img
                    src='/roster/creativerostercard.svg'
                    alt=''
                    className={styles.member_rostercard}
                  />
                  <img
                    src={member.aviLink}
                    alt=''
                    className={styles.member_avi}
                  />
                  <img
                    src={`/roster/flags/${member.country}.svg`}
                    alt={`${member.name} is from ${member.country}`}
                    className={styles.member_country}
                  />
                  <h3 className={styles.member_name}>
                    {member.name.toUpperCase()}
                  </h3>
                  <h4 className={styles.member_type}>SOUND DESIGNER</h4>
                  <div className={styles.member_socialmedia_icons}>
                    <img
                      src='/socialmediaicons/twitter.svg'
                      alt={`${member.name} twitter`}
                    />
                    <img
                      src='/socialmediaicons/behance.svg'
                      alt={`${member.name} behance`}
                    />
                    <img
                      src='/socialmediaicons/youtube.svg'
                      alt={`${member.name} youtube`}
                    />
                    <img
                      src='/socialmediaicons/steam.svg'
                      alt={`${member.name} steam`}
                    />
                  </div>
                </div>
              ))}
            </div>
            {overflowingRosterContainers.soundDesigner && (
              <button
                ref={soundDesignerRosterBtn}
                onClick={() => toggleRoster('soundDesigner')}
                className={styles.expand_roster_btn}
              >
                EXPAND ROSTER &nbsp; &nbsp;
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeRoster;
