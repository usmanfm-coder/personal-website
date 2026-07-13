import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  overflow: hidden;

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(20px);
    opacity: 0.8;
  }

  &:before {
    top: 12%;
    right: -6%;
    width: 18rem;
    height: 18rem;
    background: radial-gradient(circle, rgba(87, 203, 255, 0.24), rgba(87, 203, 255, 0));
  }

  &:after {
    bottom: 10%;
    left: -8%;
    width: 22rem;
    height: 22rem;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.18), rgba(100, 255, 218, 0));
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .hero-eyebrow {
    margin: 0 0 28px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  .hero-title {
    margin: 0;
    font-size: clamp(56px, 9vw, 112px);
    line-height: 0.95;
    max-width: 11ch;
    background: linear-gradient(135deg, var(--lightest-slate) 0%, var(--white) 45%, var(--blue) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-subtitle {
    margin: 14px 0 0;
    color: var(--slate);
    font-size: clamp(20px, 3vw, 28px);
    line-height: 1.1;
    max-width: 14ch;
  }

  .hero-copy {
    margin: 26px 0 0;
    max-width: 620px;
    font-size: clamp(var(--fz-lg), 1.8vw, var(--fz-xl));
    line-height: 1.6;
    color: var(--light-slate);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 40px;
  }

  .hero-orb {
    position: absolute;
    top: 50%;
    left: 64%;
    width: 30rem;
    height: 30rem;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(87, 203, 255, 0.24) 0%, rgba(87, 203, 255, 0.08) 30%, transparent 68%);
    mix-blend-mode: screen;
    filter: blur(14px);
    opacity: 0.9;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity 0.25s ease;
  }

  @media (max-width: 900px) {
    .hero-orb {
      left: 70%;
      width: 22rem;
      height: 22rem;
    }
  }

  @media (max-width: 700px) {
    .hero-orb {
      display: none;
    }
  }

  .hero-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .hero-link.secondary {
    color: var(--lightest-slate);
    border-color: var(--lightest-navy);
    background: rgba(35, 53, 84, 0.3);

    &:hover,
    &:focus-visible {
      box-shadow: 4px 4px 0 0 var(--lightest-navy);
    }
  }

  .hero-stats {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    width: 100%;
    max-width: 620px;
    margin-top: 46px;

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  .hero-stat {
    padding: 16px 18px;
    border: 1px solid rgba(136, 146, 176, 0.18);
    border-radius: 16px;
    background: rgba(10, 25, 47, 0.42);
    backdrop-filter: blur(10px);
    box-shadow: 0 18px 48px -28px rgba(2, 12, 27, 0.8);
  }

  .stat-number {
    display: block;
    color: var(--white);
    font-family: var(--font-mono);
    font-size: var(--fz-lg);
    margin-bottom: 4px;
  }

  .stat-label {
    display: block;
    color: var(--light-slate);
    font-size: var(--fz-sm);
    line-height: 1.5;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const orbRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !orbRef.current) {
      return;
    }

    const orb = orbRef.current;

    const updateOrb = event => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      orb.style.transform = `translate3d(-50%, -50%, 0) translate(${(x - 50) * 0.12}px, ${(y - 50) * 0.12}px)`;
    };

    const resetOrb = () => {
      orb.style.transform = 'translate3d(-50%, -50%, 0)';
    };

    window.addEventListener('mousemove', updateOrb);
    window.addEventListener('mouseleave', resetOrb);

    return () => {
      window.removeEventListener('mousemove', updateOrb);
      window.removeEventListener('mouseleave', resetOrb);
    };
  }, [prefersReducedMotion]);

  const items = [
    <div className="hero-eyebrow" key="eyebrow">
      Software Engineer · Product Builder
    </div>,
    <h1 className="hero-title" key="title">
      Usman Farooq.
    </h1>,
    <h2 className="hero-subtitle" key="subtitle">
      I build software with a product mindset.
    </h2>,
    <p className="hero-copy" key="copy">
      I create polished, human-centered digital experiences, from fast-moving internal tools to
      customer-facing product surfaces. Right now I’m focused on building accessible software at{' '}
      <a href="https://rippling.com/" target="_blank" rel="noreferrer">
        Rippling
      </a>
      .
    </p>,
  ];

  return (
    <StyledHeroSection>
      {!prefersReducedMotion && <div ref={orbRef} className="hero-orb" aria-hidden="true" />}
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}

      <div className="hero-actions">
        <a className="hero-link" href="#projects">
          See selected work
        </a>
        <a className="hero-link secondary" href="#contact">
          Start a conversation
        </a>
      </div>

      <ul className="hero-stats" aria-label="Highlights">
        <li className="hero-stat">
          <span className="stat-number">10+ years</span>
          <span className="stat-label">building products, teams, and systems</span>
        </li>
        <li className="hero-stat">
          <span className="stat-number">Full stack</span>
          <span className="stat-label">shipping across frontend, backend, and infra</span>
        </li>
        <li className="hero-stat">
          <span className="stat-number">Product-led</span>
          <span className="stat-label">focused on clarity, velocity, and craft</span>
        </li>
      </ul>
    </StyledHeroSection>
  );
};

export default Hero;
