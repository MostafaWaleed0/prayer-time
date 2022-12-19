/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import useSWR, { SWRResponse } from 'swr';
import type { SWRConfiguration } from 'swr';

const config: SWRConfiguration = {
  fallbackData: 'fallback',
  revalidateOnMount: true
};

type Props = {
  [key: string]: any;
};

export const lang = () => {
  const { locale } = useRouter();
  try {
    const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
    const { data }: SWRResponse<Props> = useSWR(`/locales/${locale}/common.json`, fetcher, config);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
