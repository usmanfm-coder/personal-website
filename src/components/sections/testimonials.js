import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledTestimonialsSection = styled.section`
  max-width: 1100px;

  .intro {
    max-width: 720px;
    margin-bottom: 32px;
    color: var(--light-slate);
    font-size: clamp(var(--fz-lg), 2vw, var(--fz-xl));
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .card {
    padding: 28px;
    border: 1px solid rgba(136, 146, 176, 0.14);
    border-radius: 24px;
    background: rgba(17, 34, 64, 0.44);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px -36px rgba(2, 12, 27, 1);
  }

  blockquote {
    margin: 0;
    color: var(--lightest-slate);
    font-size: clamp(var(--fz-lg), 2vw, var(--fz-xl));
    line-height: 1.7;
  }

  .quote-mark {
    display: block;
    margin-bottom: 12px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxl);
    line-height: 1;
  }

  .meta {
    margin-top: 20px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .meta strong {
    color: var(--white);
    font-weight: 600;
  }
`;

const Testimonials = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const testimonials = [
    {
      name: 'Arturo Rodriguez',
      title: 'Data Engineer (Specialist) at McKinsey & Company',
      quote:
        'I had the pleasure of working closely with Usman at McKinsey for 2 years. He is a top-notch colleague with a rare blend of skills and personality traits. He consistently demonstrated exceptional problem-solving skills, effectively tackling complex challenges with analytical thinking and creativity.',
    },
    {
      name: 'Chelsea Hu',
      title: 'AI Deployment | OpenAI | ex-McKinsey',
      quote:
        'Usman is a highly skilled full-stack engineer with ability to quickly grasp new concepts and effectively communicate ideas. He would be an invaluable asset to any team!',
    },
  ];

  return (
    <StyledTestimonialsSection id="testimonials" ref={revealContainer}>
      <h2 className="numbered-heading">What People Say</h2>
      <p className="intro">
        I like building strong working relationships, and I’m grateful to have a track record of
        being both effective and easy to work with.
      </p>

      <div className="grid">
        {testimonials.map(item => (
          <div className="card" key={item.name}>
            <span className="quote-mark">“</span>
            <blockquote>{item.quote}</blockquote>
            <div className="meta">
              <strong>{item.name}</strong> · {item.title}
            </div>
          </div>
        ))}
      </div>
    </StyledTestimonialsSection>
  );
};

export default Testimonials;
