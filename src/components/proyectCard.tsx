// components/Card.jsx
import React, { useState } from "react";
import { CourseProps } from "@/props/types";

const Card: React.FC<CourseProps> = (props) => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="primary mb-4 p-6 rounded-md shadow-sm">
      {/* Info del curso */}
      <h2 className="text-xl font-bold mb-2">
        {props.code} - {props.name}
      </h2>
      <span className="text-sm mb-4 block">{props.semster}</span>
      <p className="mb-4">{props.description}</p>

      {/* Sección de proyectos colapsable */}
      {props.projects && props.projects.length > 0 && (
        <div className="mt-4">
          {/* Botón toggle */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="secondary text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
          >
            {showProjects ? "Ocultar proyectos" : "Ver proyectos"}
          </button>

          {/* Lista de proyectos */}
          {showProjects && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Proyectos:</h3>
              <ul className="space-y-4">
                {props.projects.map((project, index) => (
                  <li
                    key={index}
                    className="border rounded-lg p-4 shadow-sm flex gap-4 items-start"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-bold">{project.title}</h4>
                      <p className="text-sm">{project.description}</p>
                      <p className="text-sm">{project.date}</p>
                      <p className="text-sm">
                        Tecnologías: {project.technologies.join(", ")}
                      </p>
                      <div className="mt-2 space-x-2">
                        {project.repositoryLink && (
                          <a
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-color decoration-4 mx-2 hover:underline"
                          >
                            Repositorio
                          </a>
                        )}
                        {project.liveDemoLink && (
                          <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-color decoration-4 mx-2 hover:underline"
                          >
                            Demo en vivo
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
