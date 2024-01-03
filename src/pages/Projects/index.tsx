import React from 'react';
import ProjectCard from '../../components/Project';

const Projects = () => {
  return (
    <div>
      <h1 id='header'>Projects</h1>
      {/* fill out sample ProjectCards */}
      <div
        className='projects-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          margin: 'auto 20vw',
        }}>
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            description: 'A project',
            url: 'https://www.google.com',
            github: 'https://www.github.com',
            techStack: ['React', 'TypeScript', 'Node.js'],
            alignment: 'right',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            description: 'A project',
            url: 'https://www.google.com',
            github: 'https://www.github.com',
            techStack: ['React', 'TypeScript', 'Node.js'],
            alignment: 'left',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            description: 'A project',
            url: 'https://www.google.com',
            github: 'https://www.github.com',
            techStack: ['React', 'TypeScript', 'Node.js'],
            alignment: 'right',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            description: 'A project',
            url: 'https://www.google.com',
            github: 'https://www.github.com',
            techStack: ['React', 'TypeScript', 'Node.js'],
            alignment: 'left',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            description: 'A project',
            url: 'https://www.google.com',
            github: 'https://www.github.com',
            techStack: ['React', 'TypeScript', 'Node.js'],
            alignment: 'right',
          }}
        />
      </div>
    </div>
  );
};

export default Projects;