import React, { useState, useEffect } from 'react';
import Project from './projectinterface';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    console.log('mounted');

    return () => {
      setIsVisible(false);
      console.log('unmounted');
    };
  }, []);

  return (
    <>
      <div
        className={`project-details`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(${isVisible ? '-50%, -50%' : '-50%, 50%'})`,
          width: '80%',
          height: '80%',
          backgroundColor: 'rgba(255, 255, 255, 0.99)',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid #ddd',
          transition: 'transform 0.2s',
          transformOrigin: 'center',
          boxShadow: '0 0 25px 5px rgba(0, 0, 0, 0.25)',
          zIndex: 100,
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
          <h2>{project.title}</h2>
          <div
            style={{
              marginTop: '-20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}>
            {project.techStack.map((tech, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '5px',
                  borderRadius: '5px',
                  margin: '0 5px',
                }}>
                {tech}
              </p>
            ))}
          </div>
          <div
            style={{
              height: '250px',
              width: 'fit-content',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              borderRadius: '20px',
              boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
            }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {project.imageGallery?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={project.title}
                style={{
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ))}
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.25rem',
            }}>
            {project.description}
          </p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              onClose();
            }, 200);
          }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            borderRadius: '50%',
            boxShadow: '0 0 25px 5px rgba(0, 0, 0, 0.25)',
            border: 'none',
            color: '#000',
            width: '80px',
            height: '80px',
            fontSize: '30px',
            fontWeight: 'bold',
          }}>
          X
        </button>
      </div>
    </>
  );
};

export default ProjectDetails;
