import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

import { BackendError } from '@/types/types';

const useAxios = (url: string, autoTrigger = false) => {
  const [data, setData] = useState<AxiosResponse | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<BackendError | null>(null);
  //   const controller = new AbortController();

  type HandleFinish = any;

  const AxiosGet = async (getUrl?: string) => {
    // useEffect(() => {
    if (!getUrl) getUrl = url;

    setIsPending(true);

    axios
      .get(url)
      .then((res: AxiosResponse) => {
        if (res.statusText !== 'OK') {
          throw Error(res.statusText);
        }
        setData(res.data);
        setError(null);
        setIsPending(false);
      })
      .catch((err: BackendError) => {
        if (err.message !== 'canceled') {
          setError(err);
          setIsPending(false);
        }
      });

    //   return () => {
    // controller.abort();
    //   };
    // }, [getUrl]);
  };

  if (autoTrigger) AxiosGet(url);

  interface PostBody {
    data: object;
    config?: AxiosRequestConfig;
  }

  type PostFunction = (
    body: PostBody,
    handleFinish?: HandleFinish,
    postUrl?: string,
  ) => void;

  const axiosPost: PostFunction = (body, handleFinish, postUrl) => {
    if (body) {
      if (!postUrl) postUrl = url;

      setIsPending(true);

      axios
        .post(postUrl, body.data, body.config)
        .then((res: AxiosResponse) => {
          setData(res);
          setError(null);
          setIsPending(false);
          if (handleFinish) handleFinish();
        })
        .catch((err: any) => {
          setError(err);
          setIsPending(false);
        });
    }
  };

  const axiosPut: PostFunction = body => {
    if (body !== null) {
      axios
        .put(url, body.data, body.config)
        .then((res: AxiosResponse) => {
          console.log(res);
          setData(res);
          console.log('PUT SUCCESS');
        })
        .catch((err: BackendError) => {
          console.log(err);
          setError(err);
          console.log('PUT ERROR');
        })
        .finally(() => {
          setIsPending(false);
        });
    }
  };

  const axiosDelete = (deleteUrl?: string, handleFinish?: HandleFinish) => {
    if (!deleteUrl) deleteUrl = url;

    setIsPending(true);

    axios
      .delete(deleteUrl)
      .then((res: AxiosResponse) => {
        setData(res);
        setError(null);
        setIsPending(false);
        if (handleFinish) handleFinish();
      })
      .catch((err: any) => {
        setError(err);
        setIsPending(false);
      });
  };

  return {
    data,
    isPending,
    error,
    setData,
    AxiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  };
};

export default useAxios;
