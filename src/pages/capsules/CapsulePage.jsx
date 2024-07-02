import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CapsuleBubble from '../../components/CapsuleBubble';
import { axiosReq } from '../../api/axiosDefaults';

export const CapsulePage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [capsule, setCapsule] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: capsule }] = await Promise.all([
          axiosReq.get(`/capsules/${id}/`),
        ]);
        setCapsule({ results: [capsule] });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.error(error);
      }
    };
    handleMount();
  }, [id, history]);

  return (
    <CapsuleBubble
      {...capsule.results[0]}
      setCapsules={setCapsule}
      capsulePage
    />
  );
};
