import React, { useEffect, useState } from 'react';

const Ch1 = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchCh1Content = async () => {
      try {
        const response = await fetch('/get_ch1_content');
        const data = await response.json();
        setContent(data.content); // Set the fetched content to state
      } catch (error) {
        console.error('Error fetching Ch1 content:', error);
      }
    };

    fetchCh1Content();
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <div>
      <h1>Chapter 1: Introduction to Finance</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Ch1;