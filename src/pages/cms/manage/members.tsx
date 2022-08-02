import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Animated from 'react-mount-animation';

import CmsLayout from '@/components/CmsLayout';
import useLoggedUserContext from '@/contexts/LoggedUser';
import useAxios from '@/hooks/useAxios';
import useCheckAuthentication from '@/hooks/useCheckAuthentication';
import styles from '@/styles/cms/CmsManageMembers.module.scss';
import { UserType } from '@/types/types';

const CmsManageMembers: React.FC = () => {
  const router = useRouter();
  const { loggedUser } = useLoggedUserContext();
  const { checkManagementCredentials, fetchSensitiveData } =
    useCheckAuthentication();
  const dataFetched = useRef(false);

  useEffect(() => {
    checkManagementCredentials(
      'designer',
      'owner',
      'editor',
      'general',
      'player',
      'contentCreator',
    );
  }, []);

  //* New user form

  const [showAddNewUserForm, setShowAddNewUserForm] = useState(false);

  const [newUserName, setNewUserName] = useState('');
  const [newUserProfilePicture, setNewUserProfilePicture] = useState('');
  const [newUserMemberType, setNewUserMemberType] = useState('0');
  const [newUserManagementType, setNewUserManagementType] = useState('none');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserCountry, setNewUserCountry] = useState('0');
  const [newUserTwitch, setNewUserTwitch] = useState('');
  const [newUserYoutube, setNewUserYoutube] = useState('');
  const [newUserCamSettings, setNewUserCamSettings] = useState('');
  const [newUserBehance, setNewUserBehance] = useState('');
  const [newUserTwitter, setNewUserTwitter] = useState('');
  const [newUserSteam, setNewUserSteam] = useState('');
  const [newUserInstagram, setNewUserInstagram] = useState('');
  const [newUserTiktok, setNewUserTiktok] = useState('');

  const newUserFormScrollElem = useRef<HTMLAnchorElement>(null);

  const [manageUserSuccessMsg, setManageUserSuccessMsg] = useState(false);

  const [newUserFormErrors, setNewUserFormErrors] = useState({
    requiredFields: false,
    maxSocialMediaFields: false,
  });

  //* modify user form

  const [showModifyUserForm, setShowModifyUserForm] = useState(false);

  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedUserProfilePicture, setSelectedUserProfilePicture] =
    useState('');
  const [selectedUserRosterOrder, setSelectedUserRosterOrder] = useState<
    string | number
  >('');
  const [selectedUserMemberType, setSelectedUserMemberType] = useState('');
  const [selectedUserManagementType, setSelectedUserManagementType] =
    useState('');
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [selectedUserCountry, setSelectedUserCountry] = useState('0');
  const [selectedUserTwitch, setSelectedUserTwitch] = useState('');
  const [selectedUserYoutube, setSelectedUserYoutube] = useState('');
  const [selectedUserCamSettings, setSelectedUserCamSettings] = useState('');
  const [selectedUserBehance, setSelectedUserBehance] = useState('');
  const [selectedUserTwitter, setSelectedUserTwitter] = useState('');
  const [selectedUserSteam, setSelectedUserSteam] = useState('');
  const [selectedUserInstagram, setSelectedUserInstagram] = useState('');
  const [selectedUserTiktok, setSelectedUserTiktok] = useState('');

  const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);

  const manageUsersFormScrollElem = useRef<HTMLHeadingElement>(null);

  const [manageUserFormErrors, setManageUserFormErrors] = useState({
    requiredFields: false,
    maxSocialMediaFields: false,
  });

  const {
    axiosPost: newUserAxiosPost,
    data: newUserData,
    error: newUserError,
    isPending: newUserPending,
  } = useAxios('http://localhost:3000/api/users/');

  const {
    axiosPost: manageUserAxiosPost,
    data: manageUserData,
    error: manageUserError,
    isPending: manageUserPending,
  } = useAxios('http://localhost:3000/api/users/manage');

  const {
    axiosDelete: deleteUserAxiosDelete,
    data: deleteUserData,
    error: deleteUserError,
    isPending: deleteUserPending,
  } = useAxios('http://localhost:3000/api/users/:id');

  const handleDeleteUser = () => {
    if (!deleteUserPending && fetchSensitiveData) {
      deleteUserAxiosDelete(
        `http://localhost:3000/api/users/${selectedUserEmail}`,
      );
    }
  };

  useEffect(() => {
    if (newUserData || manageUserData || deleteUserData) {
      // setNewUserSuccessMsg(true);
      router.reload();
    }
  }, [newUserData, manageUserData, deleteUserData]);

  useEffect(() => {
    if (deleteUserError) setShowDeleteUserPopup(false);
  }, [deleteUserError]);

  const {
    AxiosGet: getRosterInfo,
    data: rosterData,
    error: getRosterInfoError,
    isPending: getRosterInfoPending,
  } = useAxios('http://localhost:3000/api/users/manage');

  useEffect(() => {
    if (loggedUser && fetchSensitiveData && !dataFetched.current) {
      getRosterInfo();

      dataFetched.current = true;
    }
  }, [fetchSensitiveData, loggedUser]);

  interface RosterData {
    members: {
      designerRoster: UserType[];
      editorRoster: UserType[];
      motionDesignerRoster: UserType[];
      soundDesignerRoster: UserType[];
      freestylerRoster: UserType[];
      competitivePlayerRoster: UserType[];
      contentCreatorRoster: UserType[];
      managementRoster: UserType[];
      moderatorRoster: UserType[];
    };
  }

  //*
  const handleNewUserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newUserPending) {
      let requiredFields = false;
      let filledSocialMediaFields = 0;
      let maxSocialMediaFields = false;

      setManageUserSuccessMsg(false);

      if (newUserTwitch !== '') filledSocialMediaFields++;
      if (newUserYoutube !== '') filledSocialMediaFields++;
      if (newUserCamSettings !== '') filledSocialMediaFields++;
      if (newUserBehance !== '') filledSocialMediaFields++;
      if (newUserTwitter !== '') filledSocialMediaFields++;
      if (newUserSteam !== '') filledSocialMediaFields++;
      if (newUserInstagram !== '') filledSocialMediaFields++;
      if (newUserTiktok !== '') filledSocialMediaFields++;

      if (filledSocialMediaFields > 6) maxSocialMediaFields = true;

      if (
        newUserName === '' ||
        newUserEmail === '' ||
        newUserCountry === '0' ||
        newUserMemberType === '0'
      ) {
        requiredFields = true;
      }

      if (!requiredFields && !maxSocialMediaFields) {
        if (
          loggedUser!.managementType !== 'owner' &&
          loggedUser!.managementType !== 'general'
        ) {
          setNewUserManagementType('none');
        }

        newUserAxiosPost({
          data: {
            name: newUserName,
            email: newUserEmail,
            country: newUserCountry,
            profilePicture: newUserProfilePicture,
            memberType: newUserMemberType,
            managementType: newUserManagementType,
            socialMedia: [
              {
                type: 'twitch',
                link: newUserTwitch,
              },
              {
                type: 'youtube',
                link: newUserYoutube,
              },
              {
                type: 'camSettings',
                link: newUserCamSettings,
              },
              {
                type: 'behance',
                link: newUserBehance,
              },
              {
                type: 'twitter',
                link: newUserTwitter,
              },
              {
                type: 'steam',
                link: newUserSteam,
              },
              {
                type: 'instagram',
                link: newUserInstagram,
              },
              {
                type: 'tiktok',
                link: newUserTiktok,
              },
            ],
          },
        });
      }

      setNewUserFormErrors({ requiredFields, maxSocialMediaFields });
    }
  };

  const handleRosterMemberClick = (member: UserType) => {
    setSelectedUserName(member.name);
    setSelectedUserProfilePicture(member.profilePicture);
    setSelectedUserRosterOrder(member.rosterOrder);
    setSelectedUserMemberType(member.memberType);
    setSelectedUserManagementType(member.managementType);
    setSelectedUserEmail(member.email);
    setSelectedUserCountry(member.country);

    member.socialMedia.forEach(socialMedia => {
      if (socialMedia.type === 'twitch') {
        setSelectedUserTwitch(socialMedia.link);
      }
      if (socialMedia.type === 'youtube') {
        setSelectedUserYoutube(socialMedia.link);
      }
      if (socialMedia.type === 'camSettings') {
        setSelectedUserCamSettings(socialMedia.link);
      }
      if (socialMedia.type === 'behance') {
        setSelectedUserBehance(socialMedia.link);
      }
      if (socialMedia.type === 'twitter') {
        setSelectedUserTwitter(socialMedia.link);
      }
      if (socialMedia.type === 'steam') {
        setSelectedUserSteam(socialMedia.link);
      }
      if (socialMedia.type === 'instagram') {
        setSelectedUserInstagram(socialMedia.link);
      }
      if (socialMedia.type === 'tiktok') {
        setSelectedUserTiktok(socialMedia.link);
      }
    });

    if (showModifyUserForm) {
      manageUsersFormScrollElem.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      setShowModifyUserForm(true);

      setTimeout(() => {
        manageUsersFormScrollElem.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }, 150);
    }
  };

  const handleManageUserSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!manageUserPending) {
      let requiredFields = false;
      let filledSocialMediaFields = 0;
      let maxSocialMediaFields = false;

      if (selectedUserTwitch !== '') filledSocialMediaFields++;
      if (selectedUserYoutube !== '') filledSocialMediaFields++;
      if (selectedUserCamSettings !== '') filledSocialMediaFields++;
      if (selectedUserBehance !== '') filledSocialMediaFields++;
      if (selectedUserTwitter !== '') filledSocialMediaFields++;
      if (selectedUserSteam !== '') filledSocialMediaFields++;
      if (selectedUserInstagram !== '') filledSocialMediaFields++;
      if (selectedUserTiktok !== '') filledSocialMediaFields++;

      if (filledSocialMediaFields > 6) maxSocialMediaFields = true;

      if (
        selectedUserName === '' ||
        selectedUserEmail === '' ||
        selectedUserCountry === '0' ||
        selectedUserMemberType === '0'
      ) {
        requiredFields = true;
      }

      if (!requiredFields && !maxSocialMediaFields) {
        // if (
        //   loggedUser!.managementType !== 'owner' &&
        //   loggedUser!.managementType !== 'general'
        // ) {
        //   setSelectedUserManagementType('none');
        // }

        manageUserAxiosPost({
          data: {
            name: selectedUserName,
            email: selectedUserEmail,
            country: selectedUserCountry,
            profilePicture: selectedUserProfilePicture,
            memberType: selectedUserMemberType,
            managementType: selectedUserManagementType,
            rosterOrder: selectedUserRosterOrder,
            socialMedia: [
              {
                type: 'twitch',
                link: selectedUserTwitch,
              },
              {
                type: 'youtube',
                link: selectedUserYoutube,
              },
              {
                type: 'camSettings',
                link: selectedUserCamSettings,
              },
              {
                type: 'behance',
                link: selectedUserBehance,
              },
              {
                type: 'twitter',
                link: selectedUserTwitter,
              },
              {
                type: 'steam',
                link: selectedUserSteam,
              },
              {
                type: 'instagram',
                link: selectedUserInstagram,
              },
              {
                type: 'tiktok',
                link: selectedUserTiktok,
              },
            ],
          },
        });
      }

      setManageUserFormErrors({ requiredFields, maxSocialMediaFields });
    }
  };

  const handleDeleteBtnClick = () => {
    setShowDeleteUserPopup(true);
  };

  //! -----
  return (
    <>
      <CmsLayout />
      {loggedUser && (
        // Delete user popup
        <>
          <Animated.div
            mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
            show={showDeleteUserPopup}
            time={0.2}
            className={styles.delete_user_popup_bg}
          >
            <div className={styles.delete_user_popup_container}>
              <div className={styles.delete_user_popup_innercontainer}>
                <div className={styles.delete_user_popup_text_container}>
                  <h3>WARNING</h3>
                  <p>
                    Are you sure you want to delete{' '}
                    <span>{selectedUserName}</span>? This action can&apos;t be
                    undone.
                  </p>
                </div>
                <div className={styles.delete_user_popup_buttons_container}>
                  <button
                    onClick={() => setShowDeleteUserPopup(false)}
                    className={styles.delete_user_cancel}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className={styles.delete_user_confirm}
                  >
                    DELETE
                  </button>
                </div>
                {deleteUserPending && (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}
              </div>
            </div>
          </Animated.div>

          <div className={styles.bgcolor}>
            <div className={styles.page_wrapper}>
              {(showAddNewUserForm || showModifyUserForm) && (
                <div className={styles.header_container}>
                  <Link href={'/cms'}>
                    <a
                      ref={newUserFormScrollElem}
                      className={styles.back_to_dashboard}
                    >
                      Back to dashboard
                    </a>
                  </Link>
                </div>
              )}

              <Animated.div
                mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
                show={showAddNewUserForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleNewUserSubmit(e)
                  }
                >
                  <h2 className={styles.cms_header}>Add new member</h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='name'
                  >
                    Username
                  </label>
                  <input
                    value={newUserName}
                    onChange={e => setNewUserName(e.target.value)}
                    maxLength={12}
                    className={styles.form_input}
                    type='text'
                    name='name'
                  />

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    value={newUserEmail}
                    onChange={e => setNewUserEmail(e.target.value)}
                    maxLength={80}
                    className={styles.form_input}
                    type='text'
                    name='email'
                  />
                  <p className={styles.input_subtext}>
                    The user&apos;s first password to log in will be sent to
                    this email
                  </p>

                  <label className={styles.form_label} htmlFor='profilePicture'>
                    Profile picture link
                  </label>
                  <input
                    value={newUserProfilePicture}
                    onChange={e => setNewUserProfilePicture(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='profilePicture'
                  />
                  <p className={styles.input_subtext}>
                    If not filled,{' '}
                    <a
                      href='https://cdn.discordapp.com/attachments/305133368985518081/996424201823076403/defaultavi.jpg'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      this image
                    </a>{' '}
                    will be placed by default until the user changes it
                  </p>

                  <p className={styles.image_size_warning}>
                    For page performance / SEO purposes it is encouraged that
                    you run your image through a compression service like{' '}
                    <span>
                      <a
                        href={'https://imagecompressor.com/'}
                        target={'_blank'}
                        rel='noreferrer'
                      >
                        imagecompressor.com
                      </a>
                    </span>{' '}
                    before providing it to the website.
                  </p>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='country'
                  >
                    Country
                  </label>

                  <select
                    value={newUserCountry}
                    onChange={e => setNewUserCountry(e.target.value)}
                    className={styles.form_dropdown}
                    name='country'
                  >
                    <option value={0} defaultValue={0}>
                      Select a country
                    </option>
                    <option value='AF'>Afghanistan</option>
                    <option value='AX'>Aland Islands</option>
                    <option value='AL'>Albania</option>
                    <option value='DZ'>Algeria</option>
                    <option value='AS'>American Samoa</option>
                    <option value='AD'>Andorra</option>
                    <option value='AO'>Angola</option>
                    <option value='AI'>Anguilla</option>
                    <option value='AQ'>Antarctica</option>
                    <option value='AG'>Antigua and Barbuda</option>
                    <option value='AR'>Argentina</option>
                    <option value='AM'>Armenia</option>
                    <option value='AW'>Aruba</option>
                    <option value='AU'>Australia</option>
                    <option value='AT'>Austria</option>
                    <option value='AZ'>Azerbaijan</option>
                    <option value='BS'>Bahamas</option>
                    <option value='BH'>Bahrain</option>
                    <option value='BD'>Bangladesh</option>
                    <option value='BB'>Barbados</option>
                    <option value='BY'>Belarus</option>
                    <option value='BE'>Belgium</option>
                    <option value='BZ'>Belize</option>
                    <option value='BJ'>Benin</option>
                    <option value='BM'>Bermuda</option>
                    <option value='BT'>Bhutan</option>
                    <option value='BO'>Bolivia, Plurinational State of</option>
                    <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                    <option value='BA'>Bosnia and Herzegovina</option>
                    <option value='BW'>Botswana</option>
                    <option value='BV'>Bouvet Island</option>
                    <option value='BR'>Brazil</option>
                    <option value='IO'>British Indian Ocean Territory</option>
                    <option value='BN'>Brunei Darussalam</option>
                    <option value='BG'>Bulgaria</option>
                    <option value='BF'>Burkina Faso</option>
                    <option value='BI'>Burundi</option>
                    <option value='KH'>Cambodia</option>
                    <option value='CM'>Cameroon</option>
                    <option value='CA'>Canada</option>
                    <option value='CV'>Cape Verde</option>
                    <option value='KY'>Cayman Islands</option>
                    <option value='CF'>Central African Republic</option>
                    <option value='TD'>Chad</option>
                    <option value='CL'>Chile</option>
                    <option value='CN'>China</option>
                    <option value='CX'>Christmas Island</option>
                    <option value='CC'>Cocos (Keeling) Islands</option>
                    <option value='CO'>Colombia</option>
                    <option value='KM'>Comoros</option>
                    <option value='CG'>Congo</option>
                    <option value='CD'>
                      Congo, the Democratic Republic of the
                    </option>
                    <option value='CK'>Cook Islands</option>
                    <option value='CR'>Costa Rica</option>
                    <option value='CI'>C�te d&apos;Ivoire</option>
                    <option value='HR'>Croatia</option>
                    <option value='CU'>Cuba</option>
                    <option value='CW'>Cura�ao</option>
                    <option value='CY'>Cyprus</option>
                    <option value='CZ'>Czech Republic</option>
                    <option value='DK'>Denmark</option>
                    <option value='DJ'>Djibouti</option>
                    <option value='DM'>Dominica</option>
                    <option value='DO'>Dominican Republic</option>
                    <option value='EC'>Ecuador</option>
                    <option value='EG'>Egypt</option>
                    <option value='SV'>El Salvador</option>
                    <option value='GQ'>Equatorial Guinea</option>
                    <option value='ER'>Eritrea</option>
                    <option value='EE'>Estonia</option>
                    <option value='ET'>Ethiopia</option>
                    <option value='FK'>Falkland Islands (Malvinas)</option>
                    <option value='FO'>Faroe Islands</option>
                    <option value='FJ'>Fiji</option>
                    <option value='FI'>Finland</option>
                    <option value='FR'>France</option>
                    <option value='GF'>French Guiana</option>
                    <option value='PF'>French Polynesia</option>
                    <option value='TF'>French Southern Territories</option>
                    <option value='GA'>Gabon</option>
                    <option value='GM'>Gambia</option>
                    <option value='GE'>Georgia</option>
                    <option value='DE'>Germany</option>
                    <option value='GH'>Ghana</option>
                    <option value='GI'>Gibraltar</option>
                    <option value='GR'>Greece</option>
                    <option value='GL'>Greenland</option>
                    <option value='GD'>Grenada</option>
                    <option value='GP'>Guadeloupe</option>
                    <option value='GU'>Guam</option>
                    <option value='GT'>Guatemala</option>
                    <option value='GG'>Guernsey</option>
                    <option value='GN'>Guinea</option>
                    <option value='GW'>Guinea-Bissau</option>
                    <option value='GY'>Guyana</option>
                    <option value='HT'>Haiti</option>
                    <option value='HM'>
                      Heard Island and McDonald Islands
                    </option>
                    <option value='VA'>Holy See (Vatican City State)</option>
                    <option value='HN'>Honduras</option>
                    <option value='HK'>Hong Kong</option>
                    <option value='HU'>Hungary</option>
                    <option value='IS'>Iceland</option>
                    <option value='IN'>India</option>
                    <option value='ID'>Indonesia</option>
                    <option value='IR'>Iran, Islamic Republic of</option>
                    <option value='IQ'>Iraq</option>
                    <option value='IE'>Ireland</option>
                    <option value='IM'>Isle of Man</option>
                    <option value='IL'>Israel</option>
                    <option value='IT'>Italy</option>
                    <option value='JM'>Jamaica</option>
                    <option value='JP'>Japan</option>
                    <option value='JE'>Jersey</option>
                    <option value='JO'>Jordan</option>
                    <option value='KZ'>Kazakhstan</option>
                    <option value='KE'>Kenya</option>
                    <option value='KI'>Kiribati</option>
                    <option value='KP'>
                      Korea, Democratic People&apos;s Republic of
                    </option>
                    <option value='KR'>Korea, Republic of</option>
                    <option value='KW'>Kuwait</option>
                    <option value='KG'>Kyrgyzstan</option>
                    <option value='LA'>
                      Lao People&apos;s Democratic Republic
                    </option>
                    <option value='LV'>Latvia</option>
                    <option value='LB'>Lebanon</option>
                    <option value='LS'>Lesotho</option>
                    <option value='LR'>Liberia</option>
                    <option value='LY'>Libya</option>
                    <option value='LI'>Liechtenstein</option>
                    <option value='LT'>Lithuania</option>
                    <option value='LU'>Luxembourg</option>
                    <option value='MO'>Macao</option>
                    <option value='MK'>
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value='MG'>Madagascar</option>
                    <option value='MW'>Malawi</option>
                    <option value='MY'>Malaysia</option>
                    <option value='MV'>Maldives</option>
                    <option value='ML'>Mali</option>
                    <option value='MT'>Malta</option>
                    <option value='MH'>Marshall Islands</option>
                    <option value='MQ'>Martinique</option>
                    <option value='MR'>Mauritania</option>
                    <option value='MU'>Mauritius</option>
                    <option value='YT'>Mayotte</option>
                    <option value='MX'>Mexico</option>
                    <option value='FM'>Micronesia, Federated States of</option>
                    <option value='MD'>Moldova, Republic of</option>
                    <option value='MC'>Monaco</option>
                    <option value='MN'>Mongolia</option>
                    <option value='ME'>Montenegro</option>
                    <option value='MS'>Montserrat</option>
                    <option value='MA'>Morocco</option>
                    <option value='MZ'>Mozambique</option>
                    <option value='MM'>Myanmar</option>
                    <option value='NA'>Namibia</option>
                    <option value='NR'>Nauru</option>
                    <option value='NP'>Nepal</option>
                    <option value='NL'>Netherlands</option>
                    <option value='NC'>New Caledonia</option>
                    <option value='NZ'>New Zealand</option>
                    <option value='NI'>Nicaragua</option>
                    <option value='NE'>Niger</option>
                    <option value='NG'>Nigeria</option>
                    <option value='NU'>Niue</option>
                    <option value='NF'>Norfolk Island</option>
                    <option value='MP'>Northern Mariana Islands</option>
                    <option value='NO'>Norway</option>
                    <option value='OM'>Oman</option>
                    <option value='PK'>Pakistan</option>
                    <option value='PW'>Palau</option>
                    <option value='PS'>Palestinian Territory, Occupied</option>
                    <option value='PA'>Panama</option>
                    <option value='PG'>Papua New Guinea</option>
                    <option value='PY'>Paraguay</option>
                    <option value='PE'>Peru</option>
                    <option value='PH'>Philippines</option>
                    <option value='PN'>Pitcairn</option>
                    <option value='PL'>Poland</option>
                    <option value='PT'>Portugal</option>
                    <option value='PR'>Puerto Rico</option>
                    <option value='QA'>Qatar</option>
                    <option value='RE'>R�union</option>
                    <option value='RO'>Romania</option>
                    <option value='RU'>Russian Federation</option>
                    <option value='RW'>Rwanda</option>
                    <option value='BL'>Saint Barth�lemy</option>
                    <option value='SH'>
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value='KN'>Saint Kitts and Nevis</option>
                    <option value='LC'>Saint Lucia</option>
                    <option value='MF'>Saint Martin (French part)</option>
                    <option value='PM'>Saint Pierre and Miquelon</option>
                    <option value='VC'>Saint Vincent and the Grenadines</option>
                    <option value='WS'>Samoa</option>
                    <option value='SM'>San Marino</option>
                    <option value='ST'>Sao Tome and Principe</option>
                    <option value='SA'>Saudi Arabia</option>
                    <option value='SN'>Senegal</option>
                    <option value='RS'>Serbia</option>
                    <option value='SC'>Seychelles</option>
                    <option value='SL'>Sierra Leone</option>
                    <option value='SG'>Singapore</option>
                    <option value='SX'>Sint Maarten (Dutch part)</option>
                    <option value='SK'>Slovakia</option>
                    <option value='SI'>Slovenia</option>
                    <option value='SB'>Solomon Islands</option>
                    <option value='SO'>Somalia</option>
                    <option value='ZA'>South Africa</option>
                    <option value='GS'>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value='SS'>South Sudan</option>
                    <option value='ES'>Spain</option>
                    <option value='LK'>Sri Lanka</option>
                    <option value='SD'>Sudan</option>
                    <option value='SR'>Suriname</option>
                    <option value='SJ'>Svalbard and Jan Mayen</option>
                    <option value='SZ'>Swaziland</option>
                    <option value='SE'>Sweden</option>
                    <option value='CH'>Switzerland</option>
                    <option value='SY'>Syrian Arab Republic</option>
                    <option value='TW'>Taiwan, Province of China</option>
                    <option value='TJ'>Tajikistan</option>
                    <option value='TZ'>Tanzania, United Republic of</option>
                    <option value='TH'>Thailand</option>
                    <option value='TL'>Timor-Leste</option>
                    <option value='TG'>Togo</option>
                    <option value='TK'>Tokelau</option>
                    <option value='TO'>Tonga</option>
                    <option value='TT'>Trinidad and Tobago</option>
                    <option value='TN'>Tunisia</option>
                    <option value='TR'>Turkey</option>
                    <option value='TM'>Turkmenistan</option>
                    <option value='TC'>Turks and Caicos Islands</option>
                    <option value='TV'>Tuvalu</option>
                    <option value='UG'>Uganda</option>
                    <option value='UA'>Ukraine</option>
                    <option value='AE'>United Arab Emirates</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='US'>United States</option>
                    <option value='UM'>
                      United States Minor Outlying Islands
                    </option>
                    <option value='UY'>Uruguay</option>
                    <option value='UZ'>Uzbekistan</option>
                    <option value='VU'>Vanuatu</option>
                    <option value='VE'>
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value='VN'>Viet Nam</option>
                    <option value='VG'>Virgin Islands, British</option>
                    <option value='VI'>Virgin Islands, U.S.</option>
                    <option value='WF'>Wallis and Futuna</option>
                    <option value='EH'>Western Sahara</option>
                    <option value='YE'>Yemen</option>
                    <option value='ZM'>Zambia</option>
                    <option value='ZW'>Zimbabwe</option>
                  </select>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='memberType'
                  >
                    Member type
                  </label>
                  <select
                    value={newUserMemberType}
                    onChange={e => setNewUserMemberType(e.target.value)}
                    className={styles.form_dropdown}
                    name='memberType'
                  >
                    <option value={0} defaultValue={0}>
                      Select a member type
                    </option>
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'player') && (
                      <>
                        <option value='freestyler'>Freestyler</option>
                        <option value='competitivePlayer'>
                          Competitive player
                        </option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'contentCreator') && (
                      <option value='contentCreator'>Content creator</option>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'designer' ||
                      loggedUser.memberType === 'editor') && (
                      <>
                        <option value='motionDesigner'>Motion designer</option>
                        <option value='soundDesigner'>Sound designer</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'designer') && (
                      <>
                        <option value='designer'>Designer</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'editor') && (
                      <>
                        <option value='editor'>Editor</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general') && (
                      <>
                        <option value='moderator'>Moderator</option>
                        <option value='management'>Management</option>
                      </>
                    )}
                  </select>

                  {(loggedUser.managementType === 'owner' ||
                    loggedUser.managementType === 'general') && (
                    <>
                      <label
                        className={styles.form_label}
                        htmlFor='managementType'
                      >
                        Management type
                      </label>
                      <select
                        value={newUserManagementType}
                        onChange={e => setNewUserManagementType(e.target.value)}
                        className={styles.form_dropdown}
                        name='managementType'
                      >
                        <option value={'none'} defaultValue={'none'}>
                          None
                        </option>
                        {loggedUser.managementType === 'owner' && (
                          <option value='general'>General manager</option>
                        )}
                        <option value='contentCreator'>Content creator</option>
                        <option value='designer'>Designer</option>
                        <option value='editor'>Editor</option>
                        <option value='player'>Player</option>
                      </select>
                    </>
                  )}

                  <label className={styles.form_label} htmlFor='twitch'>
                    Twitch
                  </label>
                  <input
                    value={newUserTwitch}
                    onChange={e => setNewUserTwitch(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='twitch'
                  />

                  <label className={styles.form_label} htmlFor='youtube'>
                    Youtube
                  </label>
                  <input
                    value={newUserYoutube}
                    onChange={e => setNewUserYoutube(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='youtube'
                  />

                  <label className={styles.form_label} htmlFor='camSettings'>
                    Camera settings
                  </label>
                  <input
                    value={newUserCamSettings}
                    onChange={e => setNewUserCamSettings(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='camSettings'
                  />

                  <label className={styles.form_label} htmlFor='behance'>
                    Behance
                  </label>
                  <input
                    value={newUserBehance}
                    onChange={e => setNewUserBehance(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='behance'
                  />

                  <label className={styles.form_label} htmlFor='twitter'>
                    Twitter
                  </label>
                  <input
                    value={newUserTwitter}
                    onChange={e => setNewUserTwitter(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='twitter'
                  />

                  <label className={styles.form_label} htmlFor='steam'>
                    Steam
                  </label>
                  <input
                    value={newUserSteam}
                    onChange={e => setNewUserSteam(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='steam'
                  />

                  <label className={styles.form_label} htmlFor='instagram'>
                    Instagram
                  </label>
                  <input
                    value={newUserInstagram}
                    onChange={e => setNewUserInstagram(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='instagram'
                  />

                  <label className={styles.form_label} htmlFor='tiktok'>
                    Tiktok
                  </label>
                  <input
                    value={newUserTiktok}
                    onChange={e => setNewUserTiktok(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='tiktok'
                  />

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={newUserFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={newUserFormErrors.maxSocialMediaFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    You can&apos;t display more than 6 social media links at a
                    time!
                  </Animated.h4>

                  {newUserPending && (
                    <svg className={styles.spinner} viewBox='0 0 50 50'>
                      <circle
                        className={styles.path}
                        cx='25'
                        cy='25'
                        r='20'
                        fill='none'
                        strokeWidth='4'
                      ></circle>
                    </svg>
                  )}

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={newUserError && newUserError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {newUserError?.response?.data?.error}
                  </Animated.h4>

                  <Animated.h4
                    mountAnim={` 
                  0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                  }
                  100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                  }`}
                    show={manageUserSuccessMsg}
                    time={0.15}
                    className={styles.form_successmsg}
                  >
                    User added successfully!
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>
                </form>
              </Animated.div>

              {/* separator */}
              {showModifyUserForm && showAddNewUserForm && (
                <div style={{ margin: '40px 0' }}></div>
              )}

              {/* -MANAGE USERS FORM  */}

              <Animated.div
                mountAnim={` 
            0% {opacity: 0}
            100% {opacity: 1}`}
                show={showModifyUserForm}
                time={0.15}
              >
                <form
                  className={styles.form}
                  onSubmit={(e: FormEvent<HTMLFormElement>) =>
                    handleManageUserSubmit(e)
                  }
                >
                  <h2
                    ref={manageUsersFormScrollElem}
                    className={styles.cms_header}
                  >
                    Manage member
                  </h2>
                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='name'
                  >
                    Username
                  </label>
                  <input
                    value={selectedUserName}
                    onChange={e => setSelectedUserName(e.target.value)}
                    maxLength={12}
                    className={styles.form_input}
                    type='text'
                    name='name'
                  />

                  <label className={styles.form_label} htmlFor='profilePicture'>
                    Profile picture link
                  </label>
                  <input
                    value={selectedUserProfilePicture}
                    onChange={e =>
                      setSelectedUserProfilePicture(e.target.value)
                    }
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='profilePicture'
                  />
                  <p className={styles.input_subtext}>
                    If not filled,{' '}
                    <a
                      href='https://cdn.discordapp.com/attachments/305133368985518081/996424201823076403/defaultavi.jpg'
                      target={'_blank'}
                      rel='noreferrer'
                    >
                      this image
                    </a>{' '}
                    will be placed by default until the user changes it
                  </p>

                  <p className={styles.image_size_warning}>
                    For page performance / SEO purposes it is encouraged that
                    you run your image through a compression service like{' '}
                    <span>
                      <a
                        href={'https://imagecompressor.com/'}
                        target={'_blank'}
                        rel='noreferrer'
                      >
                        imagecompressor.com
                      </a>
                    </span>{' '}
                    before providing it to the website.
                  </p>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='country'
                  >
                    Country
                  </label>

                  <select
                    value={selectedUserCountry}
                    onChange={e => setSelectedUserCountry(e.target.value)}
                    className={styles.form_dropdown}
                    name='country'
                  >
                    <option value={0} defaultValue={0}>
                      Select a country
                    </option>
                    <option value='AF'>Afghanistan</option>
                    <option value='AX'>Aland Islands</option>
                    <option value='AL'>Albania</option>
                    <option value='DZ'>Algeria</option>
                    <option value='AS'>American Samoa</option>
                    <option value='AD'>Andorra</option>
                    <option value='AO'>Angola</option>
                    <option value='AI'>Anguilla</option>
                    <option value='AQ'>Antarctica</option>
                    <option value='AG'>Antigua and Barbuda</option>
                    <option value='AR'>Argentina</option>
                    <option value='AM'>Armenia</option>
                    <option value='AW'>Aruba</option>
                    <option value='AU'>Australia</option>
                    <option value='AT'>Austria</option>
                    <option value='AZ'>Azerbaijan</option>
                    <option value='BS'>Bahamas</option>
                    <option value='BH'>Bahrain</option>
                    <option value='BD'>Bangladesh</option>
                    <option value='BB'>Barbados</option>
                    <option value='BY'>Belarus</option>
                    <option value='BE'>Belgium</option>
                    <option value='BZ'>Belize</option>
                    <option value='BJ'>Benin</option>
                    <option value='BM'>Bermuda</option>
                    <option value='BT'>Bhutan</option>
                    <option value='BO'>Bolivia, Plurinational State of</option>
                    <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                    <option value='BA'>Bosnia and Herzegovina</option>
                    <option value='BW'>Botswana</option>
                    <option value='BV'>Bouvet Island</option>
                    <option value='BR'>Brazil</option>
                    <option value='IO'>British Indian Ocean Territory</option>
                    <option value='BN'>Brunei Darussalam</option>
                    <option value='BG'>Bulgaria</option>
                    <option value='BF'>Burkina Faso</option>
                    <option value='BI'>Burundi</option>
                    <option value='KH'>Cambodia</option>
                    <option value='CM'>Cameroon</option>
                    <option value='CA'>Canada</option>
                    <option value='CV'>Cape Verde</option>
                    <option value='KY'>Cayman Islands</option>
                    <option value='CF'>Central African Republic</option>
                    <option value='TD'>Chad</option>
                    <option value='CL'>Chile</option>
                    <option value='CN'>China</option>
                    <option value='CX'>Christmas Island</option>
                    <option value='CC'>Cocos (Keeling) Islands</option>
                    <option value='CO'>Colombia</option>
                    <option value='KM'>Comoros</option>
                    <option value='CG'>Congo</option>
                    <option value='CD'>
                      Congo, the Democratic Republic of the
                    </option>
                    <option value='CK'>Cook Islands</option>
                    <option value='CR'>Costa Rica</option>
                    <option value='CI'>C�te d&apos;Ivoire</option>
                    <option value='HR'>Croatia</option>
                    <option value='CU'>Cuba</option>
                    <option value='CW'>Cura�ao</option>
                    <option value='CY'>Cyprus</option>
                    <option value='CZ'>Czech Republic</option>
                    <option value='DK'>Denmark</option>
                    <option value='DJ'>Djibouti</option>
                    <option value='DM'>Dominica</option>
                    <option value='DO'>Dominican Republic</option>
                    <option value='EC'>Ecuador</option>
                    <option value='EG'>Egypt</option>
                    <option value='SV'>El Salvador</option>
                    <option value='GQ'>Equatorial Guinea</option>
                    <option value='ER'>Eritrea</option>
                    <option value='EE'>Estonia</option>
                    <option value='ET'>Ethiopia</option>
                    <option value='FK'>Falkland Islands (Malvinas)</option>
                    <option value='FO'>Faroe Islands</option>
                    <option value='FJ'>Fiji</option>
                    <option value='FI'>Finland</option>
                    <option value='FR'>France</option>
                    <option value='GF'>French Guiana</option>
                    <option value='PF'>French Polynesia</option>
                    <option value='TF'>French Southern Territories</option>
                    <option value='GA'>Gabon</option>
                    <option value='GM'>Gambia</option>
                    <option value='GE'>Georgia</option>
                    <option value='DE'>Germany</option>
                    <option value='GH'>Ghana</option>
                    <option value='GI'>Gibraltar</option>
                    <option value='GR'>Greece</option>
                    <option value='GL'>Greenland</option>
                    <option value='GD'>Grenada</option>
                    <option value='GP'>Guadeloupe</option>
                    <option value='GU'>Guam</option>
                    <option value='GT'>Guatemala</option>
                    <option value='GG'>Guernsey</option>
                    <option value='GN'>Guinea</option>
                    <option value='GW'>Guinea-Bissau</option>
                    <option value='GY'>Guyana</option>
                    <option value='HT'>Haiti</option>
                    <option value='HM'>
                      Heard Island and McDonald Islands
                    </option>
                    <option value='VA'>Holy See (Vatican City State)</option>
                    <option value='HN'>Honduras</option>
                    <option value='HK'>Hong Kong</option>
                    <option value='HU'>Hungary</option>
                    <option value='IS'>Iceland</option>
                    <option value='IN'>India</option>
                    <option value='ID'>Indonesia</option>
                    <option value='IR'>Iran, Islamic Republic of</option>
                    <option value='IQ'>Iraq</option>
                    <option value='IE'>Ireland</option>
                    <option value='IM'>Isle of Man</option>
                    <option value='IL'>Israel</option>
                    <option value='IT'>Italy</option>
                    <option value='JM'>Jamaica</option>
                    <option value='JP'>Japan</option>
                    <option value='JE'>Jersey</option>
                    <option value='JO'>Jordan</option>
                    <option value='KZ'>Kazakhstan</option>
                    <option value='KE'>Kenya</option>
                    <option value='KI'>Kiribati</option>
                    <option value='KP'>
                      Korea, Democratic People&apos;s Republic of
                    </option>
                    <option value='KR'>Korea, Republic of</option>
                    <option value='KW'>Kuwait</option>
                    <option value='KG'>Kyrgyzstan</option>
                    <option value='LA'>
                      Lao People&apos;s Democratic Republic
                    </option>
                    <option value='LV'>Latvia</option>
                    <option value='LB'>Lebanon</option>
                    <option value='LS'>Lesotho</option>
                    <option value='LR'>Liberia</option>
                    <option value='LY'>Libya</option>
                    <option value='LI'>Liechtenstein</option>
                    <option value='LT'>Lithuania</option>
                    <option value='LU'>Luxembourg</option>
                    <option value='MO'>Macao</option>
                    <option value='MK'>
                      Macedonia, the former Yugoslav Republic of
                    </option>
                    <option value='MG'>Madagascar</option>
                    <option value='MW'>Malawi</option>
                    <option value='MY'>Malaysia</option>
                    <option value='MV'>Maldives</option>
                    <option value='ML'>Mali</option>
                    <option value='MT'>Malta</option>
                    <option value='MH'>Marshall Islands</option>
                    <option value='MQ'>Martinique</option>
                    <option value='MR'>Mauritania</option>
                    <option value='MU'>Mauritius</option>
                    <option value='YT'>Mayotte</option>
                    <option value='MX'>Mexico</option>
                    <option value='FM'>Micronesia, Federated States of</option>
                    <option value='MD'>Moldova, Republic of</option>
                    <option value='MC'>Monaco</option>
                    <option value='MN'>Mongolia</option>
                    <option value='ME'>Montenegro</option>
                    <option value='MS'>Montserrat</option>
                    <option value='MA'>Morocco</option>
                    <option value='MZ'>Mozambique</option>
                    <option value='MM'>Myanmar</option>
                    <option value='NA'>Namibia</option>
                    <option value='NR'>Nauru</option>
                    <option value='NP'>Nepal</option>
                    <option value='NL'>Netherlands</option>
                    <option value='NC'>New Caledonia</option>
                    <option value='NZ'>New Zealand</option>
                    <option value='NI'>Nicaragua</option>
                    <option value='NE'>Niger</option>
                    <option value='NG'>Nigeria</option>
                    <option value='NU'>Niue</option>
                    <option value='NF'>Norfolk Island</option>
                    <option value='MP'>Northern Mariana Islands</option>
                    <option value='NO'>Norway</option>
                    <option value='OM'>Oman</option>
                    <option value='PK'>Pakistan</option>
                    <option value='PW'>Palau</option>
                    <option value='PS'>Palestinian Territory, Occupied</option>
                    <option value='PA'>Panama</option>
                    <option value='PG'>Papua New Guinea</option>
                    <option value='PY'>Paraguay</option>
                    <option value='PE'>Peru</option>
                    <option value='PH'>Philippines</option>
                    <option value='PN'>Pitcairn</option>
                    <option value='PL'>Poland</option>
                    <option value='PT'>Portugal</option>
                    <option value='PR'>Puerto Rico</option>
                    <option value='QA'>Qatar</option>
                    <option value='RE'>R�union</option>
                    <option value='RO'>Romania</option>
                    <option value='RU'>Russian Federation</option>
                    <option value='RW'>Rwanda</option>
                    <option value='BL'>Saint Barth�lemy</option>
                    <option value='SH'>
                      Saint Helena, Ascension and Tristan da Cunha
                    </option>
                    <option value='KN'>Saint Kitts and Nevis</option>
                    <option value='LC'>Saint Lucia</option>
                    <option value='MF'>Saint Martin (French part)</option>
                    <option value='PM'>Saint Pierre and Miquelon</option>
                    <option value='VC'>Saint Vincent and the Grenadines</option>
                    <option value='WS'>Samoa</option>
                    <option value='SM'>San Marino</option>
                    <option value='ST'>Sao Tome and Principe</option>
                    <option value='SA'>Saudi Arabia</option>
                    <option value='SN'>Senegal</option>
                    <option value='RS'>Serbia</option>
                    <option value='SC'>Seychelles</option>
                    <option value='SL'>Sierra Leone</option>
                    <option value='SG'>Singapore</option>
                    <option value='SX'>Sint Maarten (Dutch part)</option>
                    <option value='SK'>Slovakia</option>
                    <option value='SI'>Slovenia</option>
                    <option value='SB'>Solomon Islands</option>
                    <option value='SO'>Somalia</option>
                    <option value='ZA'>South Africa</option>
                    <option value='GS'>
                      South Georgia and the South Sandwich Islands
                    </option>
                    <option value='SS'>South Sudan</option>
                    <option value='ES'>Spain</option>
                    <option value='LK'>Sri Lanka</option>
                    <option value='SD'>Sudan</option>
                    <option value='SR'>Suriname</option>
                    <option value='SJ'>Svalbard and Jan Mayen</option>
                    <option value='SZ'>Swaziland</option>
                    <option value='SE'>Sweden</option>
                    <option value='CH'>Switzerland</option>
                    <option value='SY'>Syrian Arab Republic</option>
                    <option value='TW'>Taiwan, Province of China</option>
                    <option value='TJ'>Tajikistan</option>
                    <option value='TZ'>Tanzania, United Republic of</option>
                    <option value='TH'>Thailand</option>
                    <option value='TL'>Timor-Leste</option>
                    <option value='TG'>Togo</option>
                    <option value='TK'>Tokelau</option>
                    <option value='TO'>Tonga</option>
                    <option value='TT'>Trinidad and Tobago</option>
                    <option value='TN'>Tunisia</option>
                    <option value='TR'>Turkey</option>
                    <option value='TM'>Turkmenistan</option>
                    <option value='TC'>Turks and Caicos Islands</option>
                    <option value='TV'>Tuvalu</option>
                    <option value='UG'>Uganda</option>
                    <option value='UA'>Ukraine</option>
                    <option value='AE'>United Arab Emirates</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='US'>United States</option>
                    <option value='UM'>
                      United States Minor Outlying Islands
                    </option>
                    <option value='UY'>Uruguay</option>
                    <option value='UZ'>Uzbekistan</option>
                    <option value='VU'>Vanuatu</option>
                    <option value='VE'>
                      Venezuela, Bolivarian Republic of
                    </option>
                    <option value='VN'>Viet Nam</option>
                    <option value='VG'>Virgin Islands, British</option>
                    <option value='VI'>Virgin Islands, U.S.</option>
                    <option value='WF'>Wallis and Futuna</option>
                    <option value='EH'>Western Sahara</option>
                    <option value='YE'>Yemen</option>
                    <option value='ZM'>Zambia</option>
                    <option value='ZW'>Zimbabwe</option>
                  </select>

                  <label
                    className={`${styles.form_label} ${styles.required_input_label}`}
                    htmlFor='memberType'
                  >
                    Member type
                  </label>
                  <select
                    value={selectedUserMemberType}
                    onChange={e => setSelectedUserMemberType(e.target.value)}
                    className={styles.form_dropdown}
                    name='memberType'
                  >
                    <option value={0} defaultValue={0}>
                      Select a member type
                    </option>
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'player') && (
                      <>
                        <option value='freestyler'>Freestyler</option>
                        <option value='competitivePlayer'>
                          Competitive player
                        </option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'contentCreator') && (
                      <option value='contentCreator'>Content creator</option>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'designer' ||
                      loggedUser.memberType === 'editor') && (
                      <>
                        <option value='motionDesigner'>Motion designer</option>
                        <option value='soundDesigner'>Sound designer</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'designer') && (
                      <>
                        <option value='designer'>Designer</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general' ||
                      loggedUser.managementType === 'editor') && (
                      <>
                        <option value='editor'>Editor</option>
                      </>
                    )}
                    {(loggedUser.managementType === 'owner' ||
                      loggedUser.managementType === 'general') && (
                      <>
                        <option value='moderator'>Moderator</option>
                        <option value='management'>Management</option>
                      </>
                    )}
                  </select>

                  {(loggedUser.managementType === 'general' ||
                    (loggedUser.managementType === 'owner' &&
                      loggedUser.email !== selectedUserEmail)) && (
                    <>
                      <label
                        className={styles.form_label}
                        htmlFor='managementType'
                      >
                        Management type
                      </label>
                      <select
                        value={selectedUserManagementType}
                        onChange={e =>
                          setSelectedUserManagementType(e.target.value)
                        }
                        className={styles.form_dropdown}
                        name='managementType'
                      >
                        <option value={'none'}>None</option>
                        {loggedUser.managementType === 'owner' && (
                          <option value='general'>General manager</option>
                        )}
                        <option value='designer'>Designer</option>
                        <option value='editor'>Editor</option>
                        <option value='player'>Player</option>
                      </select>
                    </>
                  )}

                  <label className={styles.form_label} htmlFor='rosterOrder'>
                    Roster order
                  </label>
                  <input
                    value={selectedUserRosterOrder}
                    onChange={e => setSelectedUserRosterOrder(e.target.value)}
                    maxLength={3}
                    className={styles.form_input}
                    type='text'
                    name='rosterOrder'
                  />
                  <label className={styles.form_label} htmlFor='twitch'>
                    Twitch
                  </label>
                  <input
                    value={selectedUserTwitch}
                    onChange={e => setSelectedUserTwitch(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='twitch'
                  />

                  <label className={styles.form_label} htmlFor='youtube'>
                    Youtube
                  </label>
                  <input
                    value={selectedUserYoutube}
                    onChange={e => setSelectedUserYoutube(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='youtube'
                  />

                  <label className={styles.form_label} htmlFor='camSettings'>
                    Camera settings
                  </label>
                  <input
                    value={selectedUserCamSettings}
                    onChange={e => setSelectedUserCamSettings(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='camSettings'
                  />

                  <label className={styles.form_label} htmlFor='behance'>
                    Behance
                  </label>
                  <input
                    value={selectedUserBehance}
                    onChange={e => setSelectedUserBehance(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='behance'
                  />

                  <label className={styles.form_label} htmlFor='twitter'>
                    Twitter
                  </label>
                  <input
                    value={selectedUserTwitter}
                    onChange={e => setSelectedUserTwitter(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='twitter'
                  />

                  <label className={styles.form_label} htmlFor='steam'>
                    Steam
                  </label>
                  <input
                    value={selectedUserSteam}
                    onChange={e => setSelectedUserSteam(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='steam'
                  />

                  <label className={styles.form_label} htmlFor='instagram'>
                    Instagram
                  </label>
                  <input
                    value={selectedUserInstagram}
                    onChange={e => setSelectedUserInstagram(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='instagram'
                  />

                  <label className={styles.form_label} htmlFor='tiktok'>
                    Tiktok
                  </label>
                  <input
                    value={selectedUserTiktok}
                    onChange={e => setSelectedUserTiktok(e.target.value)}
                    maxLength={500}
                    className={styles.form_input}
                    type='text'
                    name='tiktok'
                  />

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={manageUserFormErrors.requiredFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    Please fill out all required fields!
                  </Animated.h4>

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={manageUserFormErrors.maxSocialMediaFields}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    You can&apos;t display more than 6 social media links at a
                    time!
                  </Animated.h4>

                  {manageUserPending && (
                    <svg className={styles.spinner} viewBox='0 0 50 50'>
                      <circle
                        className={styles.path}
                        cx='25'
                        cy='25'
                        r='20'
                        fill='none'
                        strokeWidth='4'
                      ></circle>
                    </svg>
                  )}

                  <Animated.h4
                    mountAnim={` 
            0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
            }
            100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            }`}
                    show={manageUserError && manageUserError.response}
                    time={0.15}
                    className={styles.form_errormsg}
                  >
                    {manageUserError?.response?.data?.error}
                  </Animated.h4>

                  <Animated.h4
                    mountAnim={` 
                  0% {clip-path: polygon(0 0, 100% 0, 100% 0.1%, 0 0.1%);
                  }
                  100% {clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                  }`}
                    show={manageUserSuccessMsg}
                    time={0.15}
                    className={styles.form_successmsg}
                  >
                    User added successfully!
                  </Animated.h4>

                  <button className={styles.submit_btn}>
                    SEND &nbsp; &nbsp;
                  </button>

                  {(loggedUser.managementType !== 'owner' ||
                    (loggedUser.managementType === 'owner' &&
                      loggedUser.email !== selectedUserEmail)) && (
                    <button
                      onClick={handleDeleteBtnClick}
                      type='button'
                      className={styles.delete_user_btn}
                    >
                      DELETE USER
                    </button>
                  )}
                </form>
              </Animated.div>

              {/* ------ Rosters ------ */}

              <div className={styles.roster_wrapper}>
                {!showAddNewUserForm && !showModifyUserForm && (
                  <Link href={'/cms'}>
                    <a
                      ref={newUserFormScrollElem}
                      className={styles.back_to_dashboard_roster}
                    >
                      Back to dashboard
                    </a>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setShowAddNewUserForm(true);

                    setTimeout(() => {
                      newUserFormScrollElem.current!.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest',
                      });
                    }, 150);
                  }}
                  className={styles.newmember_btn}
                >
                  Add new member
                </button>

                {/* -MANAGEMENT ROSTER */}

                {(loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>MANAGEMENT</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.managementRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/rostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>
                            PULSE MANAGEMENT
                          </h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -CONTENT CREATOR ROSTER */}

                {(loggedUser.managementType === 'contentCreator' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>CONTENT CREATORS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.contentCreatorRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/rostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>
                            CONTENT CREATOR
                          </h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -FREESTYLER ROSTER */}

                {(loggedUser.managementType === 'player' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>FREESTYLERS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.freestylerRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/rostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>FREESTYLER</h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -COMPETITIVE PLAYER ROSTER */}

                {(loggedUser.managementType === 'player' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>COMPETITIVE PLAYERS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.competitivePlayerRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/rostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>
                            COMPETITIVE PLAYER
                          </h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -DESIGNER ROSTER */}

                {(loggedUser.managementType === 'designer' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>DESIGNERS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.designerRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/creativerostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>
                            GRAPHICS DESIGNER
                          </h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -EDITOR ROSTER */}

                {(loggedUser.managementType === 'editor' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>EDITORS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.editorRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/creativerostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -MOTION DESIGNER ROSTER */}

                {(loggedUser.managementType === 'designer' ||
                  loggedUser.managementType === 'editor' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>MOTION DESIGNERS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.motionDesignerRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/creativerostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>
                            MOTION DESIGNER
                          </h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -SOUND DESIGNERS */}

                {(loggedUser.managementType === 'designer' ||
                  loggedUser.managementType === 'editor' ||
                  loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>SOUND DESIGNERS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.soundDesignerRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/creativerostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}

                {/* -MODERATOR ROSTER */}

                {(loggedUser.managementType === 'general' ||
                  loggedUser.managementType === 'owner') &&
                rosterData ? (
                  <>
                    <h2 className={styles.roster_title}>MODERATORS</h2>
                    <div className={styles.roster_grid}>
                      {(
                        rosterData as unknown as RosterData
                      ).members.moderatorRoster.map((member, index) => (
                        <div
                          className={styles.member_container}
                          key={`${member.name} ${index}`}
                          onClick={() => handleRosterMemberClick(member)}
                          onKeyDown={() => handleRosterMemberClick(member)}
                          tabIndex={0}
                          role={'button'}
                        >
                          <img
                            src='/roster/rostercard.svg'
                            alt=''
                            className={styles.member_rostercard}
                          />
                          <img
                            src={member.profilePicture}
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
                          <h4 className={styles.member_type}>MODERATOR</h4>
                          <div className={styles.member_socialmedia_icons}>
                            {member.socialMedia.map(socialMedia => (
                              <span key={`${socialMedia.type} ${member.name}`}>
                                {socialMedia.link !== '' && (
                                  <a href={socialMedia.link}>
                                    <img
                                      src={`/socialmediaicons/${socialMedia.type}.svg`}
                                      alt={`${socialMedia.type} link`}
                                    />
                                  </a>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <svg className={styles.spinner} viewBox='0 0 50 50'>
                    <circle
                      className={styles.path}
                      cx='25'
                      cy='25'
                      r='20'
                      fill='none'
                      strokeWidth='4'
                    ></circle>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CmsManageMembers;
