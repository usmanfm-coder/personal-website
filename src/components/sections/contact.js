import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 820px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .contact-card {
    padding: 34px 28px;
    border: 1px solid rgba(136, 146, 176, 0.14);
    border-radius: 28px;
    background: linear-gradient(180deg, rgba(17, 34, 64, 0.65), rgba(10, 25, 47, 0.9));
    box-shadow: 0 24px 60px -38px rgba(2, 12, 27, 1);
  }

  .contact-copy {
    max-width: 640px;
    margin: 0 auto;
    color: var(--light-slate);
    line-height: 1.7;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 36px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <div className="contact-card">
        <h2 className="numbered-heading overline">What’s Next?</h2>

        <h2 className="title">Get In Touch</h2>

        <p className="contact-copy">
          If you’re building something ambitious and want someone who can move between strategy,
          execution, and team leadership, I’d love to hear from you. My inbox is always open for
          product ideas, engineering conversations, and thoughtful collaborations.
        </p>

        <a className="email-link" href={`mailto:${email}`}>
          Say Hello
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
