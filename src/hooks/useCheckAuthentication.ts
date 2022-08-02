import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useLoggedUserContext from '@/contexts/LoggedUser';

const useCheckAuthentication = () => {
  const router = useRouter();

  const { loggedUser, setLoggedUser } = useLoggedUserContext();

  const [fetchSensitiveData, setFetchSensitiveData] = useState(false);

  const checkUserAlreadyLogged = () => {
    if (loggedUser) {
      router.push('/cms');
      return;
    }

    let userData: AxiosResponse;

    const getUserData = async () => {
      try {
        userData = await axios.get('http://localhost:3000/api/auth');

        if (userData) {
          setLoggedUser(userData.data);

          router.push('/cms');
        }
      } catch (err: any) {
        // console.log(err.message);
        return;
      }
    };

    getUserData();
  };

  //#
  const checkMemberCredentials = () => {
    if (loggedUser) {
      return;
    }

    let userData: AxiosResponse;

    const getUserData = async () => {
      try {
        userData = await axios.get('http://localhost:3000/api/auth');
        // change ip

        if (userData) {
          setLoggedUser(userData.data);
        } else {
          router.push('/cms/login');
        }
      } catch (err: any) {
        // console.log(err.message);
        router.push('/cms/login');
      }
    };

    getUserData();
  };

  const checkManagementCredentials = (...managementTypes: string[]) => {
    let authenticated = false;

    if (loggedUser) {
      managementTypes.forEach(managementType => {
        if (managementType === loggedUser.managementType) authenticated = true;
      });

      if (!authenticated) return router.push('/cms');
    }

    if (authenticated) {
      setFetchSensitiveData(true);
      return;
    }

    let userData: AxiosResponse;

    const getUserData = async () => {
      try {
        userData = await axios.get('http://localhost:3000/api/auth');
        // change ip

        if (userData) {
          setLoggedUser(userData.data);

          managementTypes.forEach(managementType => {
            if (managementType === userData.data.managementType)
              authenticated = true;
          });

          if (authenticated) {
            setFetchSensitiveData(true);
            return;
          }

          router.push('/cms');
        } else {
          router.push('/cms/login');
        }
      } catch (err: any) {
        // console.log(err.message);
        router.push('/cms/login');
      }
    };

    getUserData();

    // return { fetchSensitiveData };
  };

  return {
    checkUserAlreadyLogged,
    checkMemberCredentials,
    checkManagementCredentials,
    fetchSensitiveData,
  };
};

export default useCheckAuthentication;
