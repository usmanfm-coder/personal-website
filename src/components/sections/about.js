import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 1100px;

  .inner {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 40px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  .story-grid .story-card {
    animation: liftIn 600ms var(--easing) both;
  }

  .story-grid .story-card:nth-child(1) {
    animation-delay: 80ms;
  }

  .story-grid .story-card:nth-child(2) {
    animation-delay: 160ms;
  }

  .story-grid .story-card:nth-child(3) {
    animation-delay: 240ms;
  }

  .story-grid .story-card:nth-child(4) {
    animation-delay: 320ms;
  }

  @keyframes liftIn {
    from {
      opacity: 0;
      transform: translateY(18px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .story-block {
    padding: 28px;
    border: 1px solid rgba(136, 146, 176, 0.14);
    border-radius: 24px;
    background: rgba(17, 34, 64, 0.45);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px -34px rgba(2, 12, 27, 1);
  }

  .story-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    margin-top: 24px;
    margin-bottom: 24px;

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .story-card {
    padding: 18px;
    border: 1px solid rgba(136, 146, 176, 0.14);
    border-radius: 18px;
    background: rgba(2, 12, 27, 0.2);
  }

  .story-label {
    display: block;
    margin-bottom: 8px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .story-value {
    display: block;
    color: var(--white);
    font-size: var(--fz-xl);
    line-height: 1.2;
  }

  .story-copy {
    color: var(--light-slate);
  }

  .personal-note {
    padding-top: 8px;
    margin-top: 24px;
    border-top: 1px solid rgba(136, 146, 176, 0.14);
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'Python', 'React Native', 'Go', 'GraphQL'];
  const impactStats = [
    {
      label: 'Generative AI MVP',
      value: '$50M savings',
      copy: 'Streamlined insurance contract workflows with a breakthrough AI-powered MVP.',
    },
    {
      label: 'Delivery speed',
      value: '15% faster',
      copy: 'Architected scalable systems for Fortune 500 clients in med-tech and insurance.',
    },
    {
      label: 'Team leadership',
      value: '6 engineers',
      copy: 'Managed and mentored a team that improved productivity by 25%.',
    },
    {
      label: 'Craft focus',
      value: 'Full stack',
      copy: 'Balanced product thinking, technical delivery, and a strong eye for detail.',
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div className="story-block">
            <p>
              Hello! My name is Usman and I enjoy creating things that live on the internet. What
              started as a computer science elective in 2014 quickly turned into a long-term
              obsession with building products that are useful, fast, and thoughtfully designed.
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working across telecom,
              consulting, startups, and enterprise software. These days I’m focused on building
              customer-facing software at <a href="https://rippling.com/">Rippling</a>, while
              also leading teams and shaping technical delivery end to end.
            </p>

            <p>Here’s a snapshot of the kind of work I tend to gravitate toward:</p>

            <div className="story-grid">
              {impactStats.map(stat => (
                <div className="story-card" key={stat.label}>
                  <span className="story-label">{stat.label}</span>
                  <span className="story-value">{stat.value}</span>
                  <p className="story-copy">{stat.copy}</p>
                </div>
              ))}
            </div>

            <div className="personal-note">
              <p>
                Outside of work, I’m usually drawn to a mix of design, clean systems, good
                conversations, and the small details that make products feel alive. I like staying
                close to the work, close to the user, and close to the team.
              </p>
            </div>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
