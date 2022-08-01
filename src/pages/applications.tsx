import { FormEvent, useRef, useState } from 'react';

import styles from '@/styles/Applications.module.scss';

const Applications: React.FC = () => {
  const [activeApplicantType, setActiveApplicantType] = useState('player');

  const [username, setUsername] = useState('');
  const [age, setAge] = useState<string | number>('');
  const [discordId, setDiscordId] = useState('');
  const [portfolio, setPortfolio] = useState('');

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

    if (username === '' || age === '' || discordId === '' || portfolio === '') {
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

  const switchApplicantType = (
    applicantType: 'player' | 'designer' | 'editor',
  ) => {
    playerBtn.current!.classList.remove(
      'Applications_applicant_type_btn_active__zZgXV',
    );
    designerBtn.current!.classList.remove(
      'Applications_applicant_type_btn_active__zZgXV',
    );
    editorBtn.current!.classList.remove(
      'Applications_applicant_type_btn_active__zZgXV',
    );

    eval(`${applicantType}Btn`).current!.classList.add(
      'Applications_applicant_type_btn_active__zZgXV',
    );

    setActiveApplicantType(applicantType);
  };

  return (
    <div className={styles.recruitment_wrapper}>
      <div className={styles.hero_wrapper}>
        <img
          aria-hidden
          src='/recruitment/bgshapes.svg'
          alt='squares'
          className={styles.bg_squaresimg}
        />
        <main className={styles.hero_container}>
          <div className={styles.hero}>
            <h1 className={styles.hero_header}>
              <span className={styles.hero_header_subtext}>
                We are <span>Pulse Clan.</span>
              </span>
              Want to join us? <br />
              Fill out the form below!
            </h1>
            <p className={styles.hero_paragraph}>
              Due the amount of applications we receive, we are only available
              to contact you if your application is accepted!
            </p>
            {/* <p className={styles.hero_paragraph}>
              Due the amount of applications, we are only available to contact
              you once your application has been accepted!
            </p> */}
          </div>
        </main>
      </div>

      {/* Form section */}

      <div className={styles.form_bgcolor}>
        <div aria-hidden className={styles.applicant_images}>
          <img src='/recruitment/designer/img1.png' alt='' />
          <img src='/recruitment/designer/img2.png' alt='' />
          <img src='/recruitment/designer/img3.png' alt='' />
        </div>
        <section className={styles.form_wrapper}>
          <div className={styles.applicant_type_container}>
            <h2>Select the role you wish to apply for:</h2>
            <div>
              <button
                onClick={() => switchApplicantType('player')}
                ref={playerBtn}
                className={`${styles.applicant_type_btn} ${styles.applicant_type_btn_active}`}
              >
                PLAYER
              </button>
              <button
                onClick={() => switchApplicantType('designer')}
                ref={designerBtn}
                className={`${styles.applicant_type_btn} ${styles.hero_cta}`}
              >
                DESIGNER
              </button>
              <button
                onClick={() => switchApplicantType('editor')}
                ref={editorBtn}
                className={`${styles.applicant_type_btn} ${styles.hero_cta}`}
              >
                EDITOR
              </button>
            </div>
          </div>
          <div className={styles.form_container}>
            <form
              className={styles.form}
              onSubmit={e => {
                console.log('submit');
                handleSubmit(e);
              }}
            >
              <h2 className={styles.form_header}>
                Apply to become a{' '}
                <span>
                  {' '}
                  Pulse <span>{activeApplicantType.toUpperCase()}</span>
                </span>
              </h2>

              <div className={styles.form_inputs}>
                <div className={styles.username_age_container}>
                  <div>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='username'
                    >
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      maxLength={75}
                      className={styles.form_input}
                      type='text'
                      name='username'
                      // required
                    />
                  </div>

                  <div>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='age'
                    >
                      Age
                    </label>
                    <input
                      value={age}
                      onChange={e => {
                        const numRegex = /^[0-9\b]+$/;

                        if (
                          e.target.value === '' ||
                          numRegex.test(e.target.value)
                        ) {
                          if (e.target.value !== '0') {
                            setAge(e.target.value);
                          }
                        }
                      }}
                      maxLength={2}
                      className={styles.form_input}
                      type='text'
                      name='age'
                      // required
                    />
                  </div>
                </div>
                <label
                  className={`${styles.form_label} ${styles.necessary_form_input}`}
                  htmlFor='discordId'
                >
                  Discord ID
                </label>
                <input
                  maxLength={37}
                  className={styles.form_input}
                  type='text'
                  name='discordId'
                  placeholder='Example: Username#1234'
                  value={discordId}
                  onChange={e => setDiscordId(e.target.value)}
                  // required
                />

                {activeApplicantType !== 'player' ? (
                  <>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='portfolio'
                    >
                      Portfolio
                    </label>
                    <input
                      maxLength={200}
                      className={styles.form_input}
                      type='text'
                      name='portfolio'
                      value={portfolio}
                      onChange={e => setPortfolio(e.target.value)}
                      // required
                    />
                  </>
                ) : (
                  <>
                    <label
                      className={`${styles.form_label} ${styles.necessary_form_input}`}
                      htmlFor='clips'
                    >
                      Link to your clips
                    </label>
                    <input
                      maxLength={200}
                      className={styles.form_input}
                      type='text'
                      name='clips'
                      value={portfolio}
                      onChange={e => setPortfolio(e.target.value)}
                      // required
                    />
                  </>
                )}

                <label className={styles.form_label} htmlFor='previousExp'>
                  Previous experience
                </label>
                <textarea
                  className={styles.form_input}
                  name='previousExp'
                  maxLength={200}
                />

                <label className={`${styles.form_label} `} htmlFor='remarks'>
                  Final remarks/comments
                </label>
                <textarea
                  className={styles.form_input}
                  name='remarks'
                  maxLength={200}
                />
                <p className={styles.requiredfields_text}>
                  <span>*</span> required fields
                </p>
              </div>

              {/* Responsibilities  */}

              <h3
                className={styles.responsibilities_header}
                style={{ fontWeight: '600' }}
              >
                What <span>responsibilities</span> <br /> may this role
                undertake?
              </h3>

              <div className={styles.responsibilities_wrapper}>
                <div className={styles.responsibilities_section}>
                  <div className={styles.responsibilities_container}>
                    <img src='/recruitment/heart.svg' alt='' />
                    <div>
                      <h4>Teamwork</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus omnis dolore
                      </p>
                    </div>
                  </div>

                  <div className={styles.responsibilities_container}>
                    <img src='/recruitment/paintholder.svg' alt='' />
                    <div>
                      <h4>Teamwork</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus omnis dolore
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.responsibilities_section}>
                  <div className={styles.responsibilities_container}>
                    <img src='/recruitment/heart.svg' alt='' />
                    <div>
                      <h4>Teamwork</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus omnis dolore
                      </p>
                    </div>
                  </div>

                  <div className={styles.responsibilities_container}>
                    <img src='/recruitment/paintholder.svg' alt='' />
                    <div>
                      <h4>Teamwork</h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Possimus omnis dolore
                      </p>
                    </div>
                  </div>
                </div>
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
                  You must agree with our terms and conditions to submit your
                  application!
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

export default Applications;
