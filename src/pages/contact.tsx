import { FormEvent, useRef, useState } from 'react';

import styles from '@/styles/Contact.module.scss';

const Faq: React.FC = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState<string | number>('');
  const [discordId, setDiscordId] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');

  const [termsCheckedState, setTermsCheckedState] = useState(false);

  const [formErrors, setFormErrors] = useState<{
    emptyRequiredFields: boolean;
    uncheckedTerms: boolean;
  }>({
    emptyRequiredFields: false,
    uncheckedTerms: false,
  });

  const playerBtn = useRef<HTMLButtonElement>(null);
  const designerBtn = useRef<HTMLButtonElement>(null);
  const editorBtn = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emptyRequiredFields: boolean;
    let uncheckedTerms: boolean;

    if (name === '' || email === '' || companyName === '' || message === '') {
      emptyRequiredFields = true;
    } else {
      emptyRequiredFields = false;
    }

    if (termsCheckedState) {
      uncheckedTerms = false;
    } else {
      uncheckedTerms = true;
    }

    // console.log(
    //   `uncheckedterms: ${uncheckedTerms}, emptyrequiredfields: ${emptyRequiredFields}, ${username}, ${age}, ${discordId}, ${portfolio}`,
    // );

    if (!emptyRequiredFields && !uncheckedTerms) {
      console.log('success');
    } else {
      setFormErrors({ emptyRequiredFields, uncheckedTerms });
    }
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
                Have a question? <br /> you can contact us!
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

      {/* Contact Section */}

      <div className={styles.contact_bg}>
        <section className={styles.contact_section}>
          <div className={styles.form_container}>
            <form className={styles.form} onSubmit={e => handleSubmit(e)}>
              <div className={styles.form_inputs}>
                <div className={styles.double_input_container}>
                  <div>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='name'
                    >
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      maxLength={75}
                      className={styles.form_input}
                      type='text'
                      name='name'
                    />
                  </div>

                  <div>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='email'
                    >
                      Contact e-mail
                    </label>
                    <input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={styles.form_input}
                      type='text'
                      name='email'
                      placeholder='youremail@email.com'
                    />
                  </div>
                </div>

                <div className={styles.double_input_container}>
                  <div>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='country'
                    >
                      Country
                    </label>
                    {/* <input
                      maxLength={37}
                      className={styles.form_input}
                      type='text'
                      name='country'
                      value={discordId}
                      onChange={e => setDiscordId(e.target.value)}
                    /> */}
                    <select className={styles.form_dropdown} name='country'>
                      <option value={0} defaultValue={0}>
                        Select a country
                      </option>
                      <option value='Afghanistan'>Afghanistan</option>
                      <option value='Albania'>Albania</option>
                      <option value='Algeria'>Algeria</option>
                      <option value='American Samoa'>American Samoa</option>
                      <option value='Andorra'>Andorra</option>
                      <option value='Angola'>Angola</option>
                      <option value='Anguilla'>Anguilla</option>
                      <option value='Antartica'>Antarctica</option>
                      <option value='Antigua and Barbuda'>
                        Antigua and Barbuda
                      </option>
                      <option value='Argentina'>Argentina</option>
                      <option value='Armenia'>Armenia</option>
                      <option value='Aruba'>Aruba</option>
                      <option value='Australia'>Australia</option>
                      <option value='Austria'>Austria</option>
                      <option value='Azerbaijan'>Azerbaijan</option>
                      <option value='Bahamas'>Bahamas</option>
                      <option value='Bahrain'>Bahrain</option>
                      <option value='Bangladesh'>Bangladesh</option>
                      <option value='Barbados'>Barbados</option>
                      <option value='Belarus'>Belarus</option>
                      <option value='Belgium'>Belgium</option>
                      <option value='Belize'>Belize</option>
                      <option value='Benin'>Benin</option>
                      <option value='Bermuda'>Bermuda</option>
                      <option value='Bhutan'>Bhutan</option>
                      <option value='Bolivia'>Bolivia</option>
                      <option value='Bosnia and Herzegowina'>
                        Bosnia and Herzegowina
                      </option>
                      <option value='Botswana'>Botswana</option>
                      <option value='Bouvet Island'>Bouvet Island</option>
                      <option value='Brazil'>Brazil</option>
                      <option value='British Indian Ocean Territory'>
                        British Indian Ocean Territory
                      </option>
                      <option value='Brunei Darussalam'>
                        Brunei Darussalam
                      </option>
                      <option value='Bulgaria'>Bulgaria</option>
                      <option value='Burkina Faso'>Burkina Faso</option>
                      <option value='Burundi'>Burundi</option>
                      <option value='Cambodia'>Cambodia</option>
                      <option value='Cameroon'>Cameroon</option>
                      <option value='Canada'>Canada</option>
                      <option value='Cape Verde'>Cape Verde</option>
                      <option value='Cayman Islands'>Cayman Islands</option>
                      <option value='Central African Republic'>
                        Central African Republic
                      </option>
                      <option value='Chad'>Chad</option>
                      <option value='Chile'>Chile</option>
                      <option value='China'>China</option>
                      <option value='Christmas Island'>Christmas Island</option>
                      <option value='Cocos Islands'>
                        Cocos (Keeling) Islands
                      </option>
                      <option value='Colombia'>Colombia</option>
                      <option value='Comoros'>Comoros</option>
                      <option value='Congo'>Congo</option>
                      <option value='Congo'>
                        Congo, the Democratic Republic of the
                      </option>
                      <option value='Cook Islands'>Cook Islands</option>
                      <option value='Costa Rica'>Costa Rica</option>
                      <option value="Cota D'Ivoire">Cote d&apos;Ivoire</option>
                      <option value='Croatia'>Croatia (Hrvatska)</option>
                      <option value='Cuba'>Cuba</option>
                      <option value='Cyprus'>Cyprus</option>
                      <option value='Czech Republic'>Czech Republic</option>
                      <option value='Denmark'>Denmark</option>
                      <option value='Djibouti'>Djibouti</option>
                      <option value='Dominica'>Dominica</option>
                      <option value='Dominican Republic'>
                        Dominican Republic
                      </option>
                      <option value='East Timor'>East Timor</option>
                      <option value='Ecuador'>Ecuador</option>
                      <option value='Egypt'>Egypt</option>
                      <option value='El Salvador'>El Salvador</option>
                      <option value='Equatorial Guinea'>
                        Equatorial Guinea
                      </option>
                      <option value='Eritrea'>Eritrea</option>
                      <option value='Estonia'>Estonia</option>
                      <option value='Ethiopia'>Ethiopia</option>
                      <option value='Falkland Islands'>
                        Falkland Islands (Malvinas)
                      </option>
                      <option value='Faroe Islands'>Faroe Islands</option>
                      <option value='Fiji'>Fiji</option>
                      <option value='Finland'>Finland</option>
                      <option value='France'>France</option>
                      <option value='France Metropolitan'>
                        France, Metropolitan
                      </option>
                      <option value='French Guiana'>French Guiana</option>
                      <option value='French Polynesia'>French Polynesia</option>
                      <option value='French Southern Territories'>
                        French Southern Territories
                      </option>
                      <option value='Gabon'>Gabon</option>
                      <option value='Gambia'>Gambia</option>
                      <option value='Georgia'>Georgia</option>
                      <option value='Germany'>Germany</option>
                      <option value='Ghana'>Ghana</option>
                      <option value='Gibraltar'>Gibraltar</option>
                      <option value='Greece'>Greece</option>
                      <option value='Greenland'>Greenland</option>
                      <option value='Grenada'>Grenada</option>
                      <option value='Guadeloupe'>Guadeloupe</option>
                      <option value='Guam'>Guam</option>
                      <option value='Guatemala'>Guatemala</option>
                      <option value='Guinea'>Guinea</option>
                      <option value='Guinea-Bissau'>Guinea-Bissau</option>
                      <option value='Guyana'>Guyana</option>
                      <option value='Haiti'>Haiti</option>
                      <option value='Heard and McDonald Islands'>
                        Heard and Mc Donald Islands
                      </option>
                      <option value='Holy See'>
                        Holy See (Vatican City State)
                      </option>
                      <option value='Honduras'>Honduras</option>
                      <option value='Hong Kong'>Hong Kong</option>
                      <option value='Hungary'>Hungary</option>
                      <option value='Iceland'>Iceland</option>
                      <option value='India'>India</option>
                      <option value='Indonesia'>Indonesia</option>
                      <option value='Iran'>Iran (Islamic Republic of)</option>
                      <option value='Iraq'>Iraq</option>
                      <option value='Ireland'>Ireland</option>
                      <option value='Israel'>Israel</option>
                      <option value='Italy'>Italy</option>
                      <option value='Jamaica'>Jamaica</option>
                      <option value='Japan'>Japan</option>
                      <option value='Jordan'>Jordan</option>
                      <option value='Kazakhstan'>Kazakhstan</option>
                      <option value='Kenya'>Kenya</option>
                      <option value='Kiribati'>Kiribati</option>
                      <option value="Democratic People's Republic of Korea">
                        Korea, Democratic People&apos;s Republic of
                      </option>
                      <option value='Korea'>Korea, Republic of</option>
                      <option value='Kuwait'>Kuwait</option>
                      <option value='Kyrgyzstan'>Kyrgyzstan</option>
                      <option value='Lao'>
                        Lao People&apos;s Democratic Republic
                      </option>
                      <option value='Latvia'>Latvia</option>
                      <option value='Lebanon'>Lebanon</option>
                      <option value='Lesotho'>Lesotho</option>
                      <option value='Liberia'>Liberia</option>
                      <option value='Libyan Arab Jamahiriya'>
                        Libyan Arab Jamahiriya
                      </option>
                      <option value='Liechtenstein'>Liechtenstein</option>
                      <option value='Lithuania'>Lithuania</option>
                      <option value='Luxembourg'>Luxembourg</option>
                      <option value='Macau'>Macau</option>
                      <option value='Macedonia'>
                        Macedonia, The Former Yugoslav Republic of
                      </option>
                      <option value='Madagascar'>Madagascar</option>
                      <option value='Malawi'>Malawi</option>
                      <option value='Malaysia'>Malaysia</option>
                      <option value='Maldives'>Maldives</option>
                      <option value='Mali'>Mali</option>
                      <option value='Malta'>Malta</option>
                      <option value='Marshall Islands'>Marshall Islands</option>
                      <option value='Martinique'>Martinique</option>
                      <option value='Mauritania'>Mauritania</option>
                      <option value='Mauritius'>Mauritius</option>
                      <option value='Mayotte'>Mayotte</option>
                      <option value='Mexico'>Mexico</option>
                      <option value='Micronesia'>
                        Micronesia, Federated States of
                      </option>
                      <option value='Moldova'>Moldova, Republic of</option>
                      <option value='Monaco'>Monaco</option>
                      <option value='Mongolia'>Mongolia</option>
                      <option value='Montserrat'>Montserrat</option>
                      <option value='Morocco'>Morocco</option>
                      <option value='Mozambique'>Mozambique</option>
                      <option value='Myanmar'>Myanmar</option>
                      <option value='Namibia'>Namibia</option>
                      <option value='Nauru'>Nauru</option>
                      <option value='Nepal'>Nepal</option>
                      <option value='Netherlands'>Netherlands</option>
                      <option value='Netherlands Antilles'>
                        Netherlands Antilles
                      </option>
                      <option value='New Caledonia'>New Caledonia</option>
                      <option value='New Zealand'>New Zealand</option>
                      <option value='Nicaragua'>Nicaragua</option>
                      <option value='Niger'>Niger</option>
                      <option value='Nigeria'>Nigeria</option>
                      <option value='Niue'>Niue</option>
                      <option value='Norfolk Island'>Norfolk Island</option>
                      <option value='Northern Mariana Islands'>
                        Northern Mariana Islands
                      </option>
                      <option value='Norway'>Norway</option>
                      <option value='Oman'>Oman</option>
                      <option value='Pakistan'>Pakistan</option>
                      <option value='Palau'>Palau</option>
                      <option value='Palestine'>Palestine</option>
                      <option value='Panama'>Panama</option>
                      <option value='Papua New Guinea'>Papua New Guinea</option>
                      <option value='Paraguay'>Paraguay</option>
                      <option value='Peru'>Peru</option>
                      <option value='Philippines'>Philippines</option>
                      <option value='Pitcairn'>Pitcairn</option>
                      <option value='Poland'>Poland</option>
                      <option value='Portugal'>Portugal</option>
                      <option value='Puerto Rico'>Puerto Rico</option>
                      <option value='Qatar'>Qatar</option>
                      <option value='Reunion'>Reunion</option>
                      <option value='Romania'>Romania</option>
                      <option value='Russia'>Russian Federation</option>
                      <option value='Rwanda'>Rwanda</option>
                      <option value='Saint Kitts and Nevis'>
                        Saint Kitts and Nevis
                      </option>
                      <option value='Saint LUCIA'>Saint LUCIA</option>
                      <option value='Saint Vincent'>
                        Saint Vincent and the Grenadines
                      </option>
                      <option value='Samoa'>Samoa</option>
                      <option value='San Marino'>San Marino</option>
                      <option value='Sao Tome and Principe'>
                        Sao Tome and Principe
                      </option>
                      <option value='Saudi Arabia'>Saudi Arabia</option>
                      <option value='Senegal'>Senegal</option>
                      <option value='Seychelles'>Seychelles</option>
                      <option value='Sierra'>Sierra Leone</option>
                      <option value='Singapore'>Singapore</option>
                      <option value='Slovakia'>
                        Slovakia (Slovak Republic)
                      </option>
                      <option value='Slovenia'>Slovenia</option>
                      <option value='Solomon Islands'>Solomon Islands</option>
                      <option value='Somalia'>Somalia</option>
                      <option value='South Africa'>South Africa</option>
                      <option value='South Georgia'>
                        South Georgia and the South Sandwich Islands
                      </option>
                      <option value='Span'>Spain</option>
                      <option value='SriLanka'>Sri Lanka</option>
                      <option value='St. Helena'>St. Helena</option>
                      <option value='St. Pierre and Miguelon'>
                        St. Pierre and Miquelon
                      </option>
                      <option value='Sudan'>Sudan</option>
                      <option value='Suriname'>Suriname</option>
                      <option value='Svalbard'>
                        Svalbard and Jan Mayen Islands
                      </option>
                      <option value='Swaziland'>Swaziland</option>
                      <option value='Sweden'>Sweden</option>
                      <option value='Switzerland'>Switzerland</option>
                      <option value='Syria'>Syrian Arab Republic</option>
                      <option value='Taiwan'>Taiwan, Province of China</option>
                      <option value='Tajikistan'>Tajikistan</option>
                      <option value='Tanzania'>
                        Tanzania, United Republic of
                      </option>
                      <option value='Thailand'>Thailand</option>
                      <option value='Togo'>Togo</option>
                      <option value='Tokelau'>Tokelau</option>
                      <option value='Tonga'>Tonga</option>
                      <option value='Trinidad and Tobago'>
                        Trinidad and Tobago
                      </option>
                      <option value='Tunisia'>Tunisia</option>
                      <option value='Turkey'>Turkey</option>
                      <option value='Turkmenistan'>Turkmenistan</option>
                      <option value='Turks and Caicos'>
                        Turks and Caicos Islands
                      </option>
                      <option value='Tuvalu'>Tuvalu</option>
                      <option value='Uganda'>Uganda</option>
                      <option value='Ukraine'>Ukraine</option>
                      <option value='United Arab Emirates'>
                        United Arab Emirates
                      </option>
                      <option value='United Kingdom'>United Kingdom</option>
                      <option value='United States'>United States</option>
                      <option value='United States Minor Outlying Islands'>
                        United States Minor Outlying Islands
                      </option>
                      <option value='Uruguay'>Uruguay</option>
                      <option value='Uzbekistan'>Uzbekistan</option>
                      <option value='Vanuatu'>Vanuatu</option>
                      <option value='Venezuela'>Venezuela</option>
                      <option value='Vietnam'>Viet Nam</option>
                      <option value='Virgin Islands (British)'>
                        Virgin Islands (British)
                      </option>
                      <option value='Virgin Islands (U.S)'>
                        Virgin Islands (U.S.)
                      </option>
                      <option value='Wallis and Futana Islands'>
                        Wallis and Futuna Islands
                      </option>
                      <option value='Western Sahara'>Western Sahara</option>
                      <option value='Yemen'>Yemen</option>
                      <option value='Serbia'>Serbia</option>
                      <option value='Zambia'>Zambia</option>
                      <option value='Zimbabwe'>Zimbabwe</option>
                    </select>
                  </div>

                  <div>
                    <label className={styles.form_label} htmlFor='companyname'>
                      Company name
                    </label>
                    <input
                      maxLength={200}
                      className={styles.form_input}
                      type='text'
                      name='companyname'
                      value={portfolio}
                      onChange={e => setPortfolio(e.target.value)}
                    />
                  </div>
                </div>

                <label
                  className={`${styles.form_label} ${styles.necessary_form_input}`}
                  htmlFor='yourmessage'
                >
                  Your message
                </label>
                <textarea
                  className={styles.form_input}
                  name='yourmessage'
                  maxLength={500}
                  placeholder='Type your message...'
                />

                <p className={styles.requiredfields_text}>
                  <span>*</span> required fields
                </p>
              </div>

              <div className={styles.form_terms_container}>
                <input
                  className={styles.form_terms_checkbox}
                  type='checkbox'
                  name='terms'
                  // required
                  checked={termsCheckedState}
                  onChange={() => setTermsCheckedState(state => !state)}
                />
                <label className={styles.form_terms_label} htmlFor='terms'>
                  I agree with Pulse Clan&apos;s{' '}
                  <span>terms and conditions</span>
                </label>
              </div>

              {formErrors.emptyRequiredFields && (
                <h4 className={styles.form_errormsg}>
                  Please fill out all required fields!
                </h4>
              )}
              {formErrors.uncheckedTerms && (
                <h4 className={styles.form_errormsg}>
                  You must agree with our terms and conditions to send your
                  message!
                </h4>
              )}

              <button className={styles.submit_btn}>SEND &nbsp; &nbsp;</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Faq;
