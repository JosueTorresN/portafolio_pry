// components/Card.jsx
import React, { useState } from "react";
import { CourseProps } from "@/props/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Card: React.FC<CourseProps> = (props) => {
  const t = useTranslations("Publics");
  const [showProjects, setShowProjects] = useState(false);

  // Filtros
  const [filterType, setFilterType] = useState(""); // tipo de evaluación
  const [filterTech, setFilterTech] = useState(""); // tecnología
  const [filterDate, setFilterDate] = useState(""); // año (ej: "2024")

  const evalualationType  = t("evaluationType").split(",");

  // Filtrar proyectos
  const filteredProjects =
    props.projects?.filter((project) => {
      const matchType = filterType
        ? project.tipe?.toLowerCase() === filterType.toLowerCase()
        : true;

      const matchTech = filterTech
        ? project.technologies.some((tech) =>
            tech.toLowerCase().includes(filterTech.toLowerCase())
          )
        : true;

      const matchDate = filterDate
        ? project.date.includes(filterDate) // simple búsqueda por año/mes
        : true;

      return matchType && matchTech && matchDate;
    }) || [];

  return (
    <div className="primary mb-4 p-6 rounded-md shadow-sm">
      {/* Info del curso */}
      <h2 className="text-lg sm:text-xl font-bold mb-2">
        {props.code} - {props.name}
      </h2>
      <span className="text-xs sm:text-sm mb-4 block">{props.semster}</span>
      <p className="mb-4 text-sm sm:text-base">{props.description}</p>

      {/* Sección de proyectos colapsable */}
      {props.projects && props.projects.length > 0 && (
        <div className="mt-4">
          {/* Botón toggle */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="secondary text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
          >
            {showProjects ? t("hideProjects") : t("showProjects")}
          </button>

          {showProjects && (
            <div className="mt-4">
              {/* Filtros */}
              <div className="mb-4 grid gap-2 grid-cols-1 sm:grid-cols-3">
                {/* Tipo de evaluación */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border rounded p-2 w-full surface-offset text-text"
                >
                  <option value="">{evalualationType[0]}</option>
                  <option value={evalualationType[1]}>{evalualationType[1]}</option>
                  <option value={evalualationType[2]}>{evalualationType[2]}</option>
                  <option value={evalualationType[3]}>{evalualationType[3]}</option>
                  <option value={evalualationType[4]}>{evalualationType[4]}</option>
                  <option value={evalualationType[5]}>{evalualationType[5]}</option>
                  <option value={evalualationType[6]}>{evalualationType[6]}</option>
                </select>

                {/* Tecnologías */}
                <input
                  type="text"
                  placeholder={`${t("searchTec")}: React`}
                  value={filterTech}
                  onChange={(e) => setFilterTech(e.target.value)}
                  className="border rounded p-2 w-full surface-offset"
                />

                {/* Fecha */}
                <input
                  type="text"
                  placeholder={`${t("example")}: 2024`}
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border rounded p-2 w-full surface-offset"
                />
              </div>

              {/* Lista filtrada */}
              <h3 className="text-lg font-semibold mb-2">{t("projects")}:</h3>
              {filteredProjects.length > 0 ? (
                <ul className="space-y-4">
                  {filteredProjects.map((project, index) => (
                    <li
                      key={index}
                      className="border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-start"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={80}   // ✅ requerido
                        height={80}  // ✅ requerido
                        className="w-full sm:w-20 sm:h-20 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-bold">{project.title}</h4>
                        <p className="text-sm">{project.description}</p>
                        <p className="text-sm">{t("date")} : {project.date}</p>
                        <p className="text-sm">{t("type")}: {project.tipe || "No especificado"}</p>
                        <p className="text-sm">{t("technologies")}: {project.technologies.join(", ")}</p>
                        <div className="mt-2 space-x-2">
                          {project.repositoryLink && (
                            <a
                              href={project.repositoryLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-color decoration-4 hover:underline"
                            >
                              {t("repository")}
                            </a>
                          )}
                          {project.liveDemoLink && (
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline-color decoration-4 hover:underline"
                            >
                              Demo en vivo
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">
                  No hay proyectos que coincidan con los filtros.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;


// components/Card.jsx
// import React, { useState } from "react";
// import { CourseProps } from "@/props/types";

// const Card: React.FC<CourseProps> = (props) => {
//   const [showProjects, setShowProjects] = useState(false);

//   return (
//     <div className="primary mb-4 p-6 rounded-md shadow-sm">
//       {/* Info del curso */}
//       <h2 className="text-xl font-bold mb-2">
//         {props.code} - {props.name}
//       </h2>
//       <span className="text-sm mb-4 block">{props.semster}</span>
//       <p className="mb-4">{props.description}</p>

//       {/* Sección de proyectos colapsable */}
//       {props.projects && props.projects.length > 0 && (
//         <div className="mt-4">
//           {/* Botón toggle */}
//           <button
//             onClick={() => setShowProjects(!showProjects)}
//             className="secondary text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
//           >
//             {showProjects ? "Ocultar proyectos" : "Ver proyectos"}
//           </button>

//           {/* Lista de proyectos */}
//           {showProjects && (
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold mb-2">Proyectos:</h3>
//               <ul className="space-y-4">
//                 {props.projects.map((project, index) => (
//                   <li
//                     key={index}
//                     className="border rounded-lg p-4 shadow-sm flex gap-4 items-start"
//                   >
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="w-20 h-20 object-cover rounded-md"
//                     />
//                     <div>
//                       <h4 className="font-bold">{project.title}</h4>
//                       <p className="text-sm">{project.description}</p>
//                       <p className="text-sm">{project.date}</p>
//                       <p className="text-sm">
//                         Tecnologías: {project.technologies.join(", ")}
//                       </p>
//                       <div className="mt-2 space-x-2">
//                         {project.repositoryLink && (
//                           <a
//                             href={project.repositoryLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="underline-color decoration-4 mx-2 hover:underline"
//                           >
//                             Repositorio
//                           </a>
//                         )}
//                         {project.liveDemoLink && (
//                           <a
//                             href={project.liveDemoLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="underline-color decoration-4 mx-2 hover:underline"
//                           >
//                             Demo en vivo
//                           </a>
//                         )}
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;
