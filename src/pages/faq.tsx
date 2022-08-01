import Link from 'next/link';
import { useState } from 'react';

import faqItems from '@/helpers/faqItems';
import styles from '@/styles/Faq.module.scss';

const Faq: React.FC = () => {
  const [selectedFaqItem, setSelectedFaqItem] = useState<number | null>(null);

  const orderedFaqItems = faqItems.sort((a, b) => a.order - b.order);

  const toggleFaqItem = (i: number) => {
    if (i === selectedFaqItem) {
      return setSelectedFaqItem(null);
    }

    setSelectedFaqItem(i);
  };

  return (
    <div className={styles.studios_wrapper}>
      <main className={styles.hero_wrapper}>
        <svg
          width='2426'
          height='1164'
          viewBox='0 0 2426 1164'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.bg_squaresimg}
        >
          <g>
            <path
              d='M1163.2 553.778L746.415 970.565H1003.46L1418.42 555.614L1163.2 553.778Z'
              fill='url(#paint0_linear_341_4)'
              className='svg1a'
            />
            <path
              d='M865.03 490.674L677.243 678.461H793.059L980.019 491.501L865.03 490.674Z'
              fill='url(#paint1_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M1649.09 534.778L1408.72 775.149H1556.97L1796.28 535.837L1649.09 534.778Z'
              fill='url(#paint2_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M101.039 413.556H665.249L980.019 78H400.961L101.039 413.556Z'
              fill='url(#paint3_linear_341_4)'
              className='svg1b'
            />
            <path
              d='M1468.65 1085.56H2032.86L2347.63 750H1768.57L1468.65 1085.56Z'
              fill='url(#paint4_linear_341_4)'
              className='svg1a'
            />
            <path
              d='M1578.56 170.317L1250.64 498.24H1452.88L1779.36 171.762L1578.56 170.317Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className={`${styles.svgglow} svg1b`}
            />
            <path
              d='M1746.96 358.822C1748.32 360.174 1534.76 571.032 1534.76 571.032H1546.92L1759.13 358.822C1759.13 358.822 1745.61 357.47 1746.96 358.822Z'
              fill='white'
              className='svg1a'
            />
            <path
              d='M649.622 513.474C650.357 514.209 534.181 628.916 534.181 628.916H540.801L656.238 513.474C656.238 513.474 648.883 512.739 649.622 513.474Z'
              fill='white'
              className='svg1b'
            />
            <path
              d='M305 534.778L78 761.778H218L444 535.778L305 534.778Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className={`${styles.svgglow} svg1a`}
            />
            <path
              d='M833.336 446.57H943.106L855.178 534.778H745.128L833.336 446.57Z'
              fill='#FFE200'
              // filter='url(#filter0_d_341_4)'
              className={`${styles.svgglow} svg1a`}
            />
          </g>
          <defs>
            <filter
              id='filter0_d_341_4'
              x='0'
              y='0'
              width='2425.63'
              height='1163.56'
              filterUnits='userSpaceOnUse'
              colorInterpolationFilters='sRGB'
            >
              <feFlood floodOpacity='0' result='BackgroundImageFix' />
              <feColorMatrix
                in='SourceAlpha'
                type='matrix'
                values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                result='hardAlpha'
              />
              <feOffset />
              <feGaussianBlur stdDeviation='39' />
              <feComposite in2='hardAlpha' operator='out' />
              <feColorMatrix
                type='matrix'
                values='0 0 0 0 1 0 0 0 0 0.886275 0 0 0 0 0 0 0 0 0.4 0'
              />
              <feBlend
                mode='normal'
                in2='BackgroundImageFix'
                result='effect1_dropShadow_341_4'
              />
              <feBlend
                mode='normal'
                in='SourceGraphic'
                in2='effect1_dropShadow_341_4'
                result='shape'
              />
            </filter>
            <linearGradient
              id='paint0_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint2_linear_341_4'
              x1='475.185'
              y1='969.687'
              x2='975.721'
              y2='-258.153'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3E4656' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_341_4'
              x1='1212.82'
              y1='787.319'
              x2='486.381'
              y2='1915.09'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3D4554' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_341_4'
              x1='1212.82'
              y1='787.319'
              x2='486.381'
              y2='1915.09'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#292F3A' />
              <stop offset='1' stopColor='#3D4554' />
            </linearGradient>
          </defs>
        </svg>

        <div className={styles.hero_container}>
          <div className={styles.hero}>
            <div className={styles.hero_textcontainer}>
              <h1 className={styles.hero_header}>
                <span className={styles.hero_header_subtext}>
                  We are <span>Pulse Clan.</span>
                </span>
                Redefining Rocket League <br /> content creation.
              </h1>
              <p className={styles.hero_paragraph}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FAQ Section */}

      <section className={styles.faq_section}>
        <div className={styles.faq_title_container}>
          <h2 className={styles.faq_title}>F.A.Q</h2>
          {/* <div className={styles.input_container}>
            <input
              type='text'
              className={styles.faq_input}
              placeholder='Search...'
            />
          </div> */}
          <div className={styles.faq_line}></div>
        </div>

        <div className={styles.faq_items_container}>
          {orderedFaqItems.map((item, i) => (
            <button
              tabIndex={0}
              key={item.title}
              className={`${styles.faq_item} ${
                selectedFaqItem === i && styles.selected_faq_item
              }`}
              onClick={() => toggleFaqItem(i)}
            >
              <div className={styles.faq_item_title}>
                <h2>{item.title}</h2>
                <span className={styles.faq_item_icon}></span>
              </div>
              <div className={styles.faq_item_body}>{item.body}</div>
            </button>
          ))}
        </div>

        <h3 className={styles.more_questions_header}>
          Anything else you would like to ask us?{' '}
          <Link href={'/contact'}>
            <a>Get in touch!</a>
          </Link>
        </h3>
      </section>
    </div>
  );
};

export default Faq;
