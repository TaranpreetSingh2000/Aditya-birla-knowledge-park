// hooks/useHomePageData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:1337';

export function useHomePageData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomePageData = async () => {
      const path = "/api/home-page?populate[teaser][populate][title]=*&populate[teaser][populate][description]=*&populate[teaser][populate][card][populate]=*";
    //   const url = new URL(path, BASE_URL).href;

      try {
        const response = await axios.get(BASE_URL, path);
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  return { data, loading, error };
}
