import React from 'react';
import { marked } from 'marked';
import ch1Content from '../readings/Ch1.md'; 

const Ch1 = () => {
  const htmlContent = marked(ch1Content);

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Chapter 1: Introduction to Finance</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default Ch1;