// components/ProyectCard.tsx
import React, { useState, useMemo } from "react";
import { CourseProps, ProjectProps } from "@/props/types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Filter, XCircle } from "lucide-react"; // Iconos para mejor UX

const ProyectCard: React.FC<CourseProps> = (props) => {
  const t = useTranslations("Publics");
  const [showProjects, setShowProjects] = useState(false);

  // --- Estados para los filtros ---
  const [filterType, setFilterType] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // --- Opciones de filtros generadas dinámicamente ---
  // Usamos useMemo para evitar recalcular esto en cada renderizado
  const uniqueTechnologies = useMemo(() => {
    const allTechs = props.projects?.flatMap((p) => p.technologies) || [];
    return [...new Set(allTechs)].filter(Boolean); // Elimina duplicados y valores vacíos
  }, [props.projects]);

  const uniqueYears = useMemo(() => {
    const allYears = props.projects?.map((p) => new Date(p.date).getFullYear().toString()) || [];
    return [...new Set(allYears)].sort((a, b) => parseInt(b) - parseInt(a)); // Ordena de más reciente a más antiguo
  }, [props.projects]);

  const evaluationTypes = t("evaluationType").split(",");

  // --- Lógica de filtrado mejorada ---
  const filteredProjects =
    props.projects?.filter((project) => {
      const projectYear = new Date(project.date).getFullYear().toString();
      const matchType = filterType ? project.tipe?.toLowerCase() === filterType.toLowerCase() : true;
      const matchTech = filterTech ? project.technologies.includes(filterTech) : true;
      const matchYear = filterYear ? projectYear === filterYear : true;
      return matchType && matchTech && matchYear;
    }) || [];

  const handleClearFilters = () => {
    setFilterType("");
    setFilterTech("");
    setFilterYear("");
  };

  return (
    <div className="primary mb-4 p-4 sm:p-6 rounded-lg shadow-md transition-all duration-300">
      {/* --- Info del curso --- */}
      <h2 className="text-lg sm:text-xl font-bold mb-1">
        {props.code} - {props.name}
      </h2>
      <span className="text-xs sm:text-sm text-gray-400 mb-4 block">{props.semster}</span>
      <p className="mb-4 text-sm sm:text-base">{props.description}</p>

      {/* --- Sección de proyectos colapsable --- */}
      {props.projects && props.projects.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="secondary text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {showProjects ? t("hideProjects") : `${t("showProjects")} (${props.projects.length})`}
          </button>

          {showProjects && (
            <div className="mt-6 p-4 rounded-md surface-offset border-color">
              {/* --- Contenedor de Filtros --- */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Filter size={20} />
                    {t("filterProjects")}
                  </h3>
                  <button
                    onClick={handleClearFilters}
                    className="text-sm flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <XCircle size={16} />
                    {t("clearFilters")}
                  </button>
                </div>

                {/* Filtro por Tipo */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">{evaluationTypes[0]}</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border rounded p-2 w-full surface-offset text-text"
                  >
                    <option value="">{t("all")}</option>
                    {evaluationTypes.slice(1).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Filtro por Año */}
                 <div className="mb-4">
                   <label className="block text-sm font-medium mb-1">{t("filterByYear")}</label>
                   <select
                     value={filterYear}
                     onChange={(e) => setFilterYear(e.target.value)}
                     className="border rounded p-2 w-full surface-offset text-text"
                   >
                     <option value="">{t("all")}</option>
                     {uniqueYears.map((year) => (
                       <option key={year} value={year}>{year}</option>
                     ))}
                   </select>
                 </div>

                {/* Filtro por Tecnología (Píldoras) */}
                <div>
                  <label className="block text-sm font-medium mb-2">{t("filterByTech")}</label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTechnologies.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => setFilterTech(tech === filterTech ? "" : tech)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                          filterTech === tech
                            ? "secondary text-white ring-2 ring-offset-2 ring-offset-background-color ring-secondary-color"
                            : "surface-highlight hover:bg-gray-600"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- Lista de Proyectos Filtrada --- */}
              <h3 className="text-lg font-semibold mb-3 border-t border-gray-700 pt-4">
                {t("projects")} ({filteredProjects.length})
              </h3>
              {filteredProjects.length > 0 ? (
                <ul className="space-y-4">
                  {filteredProjects.map((project, index) => (
                    <li key={index} className="surface-highlight rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-start">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={100}
                        height={100}
                        className="w-full sm:w-24 h-auto sm:h-24 object-cover rounded-md border-2 border-color"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-base">{project.title}</h4>
                        <span className="text-xs text-gray-400">{project.tipe} - {project.date}</span>
                        <p className="text-sm mt-2 mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map(tech => (
                             <span key={tech} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tech}</span>
                          ))}
                        </div>
                        <div className="mt-2 space-x-4 text-sm">
                          {project.repositoryLink && (
                            <a href={project.repositoryLink} target="_blank" rel="noopener noreferrer" className="underline-color decoration-2 hover:underline font-semibold">
                              {t("repository")}
                            </a>
                          )}
                          {project.liveDemoLink && (
                            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="underline-color decoration-2 hover:underline font-semibold">
                              {t("liveDemo")}
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500 text-center py-4">
                  {t("noProjectsMatch")}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProyectCard;

















// // components/Card.jsx
// import React, { useState } from "react";
// import { CourseProps } from "@/props/types";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// const Card: React.FC<CourseProps> = (props) => {
//   const t = useTranslations("Publics");
//   const [showProjects, setShowProjects] = useState(false);

//   // Filtros
//   const [filterType, setFilterType] = useState("");
//   const [filterTech, setFilterTech] = useState("");
//   const [filterDate, setFilterDate] = useState("");

//   const evalualationType  = t("evaluationType").split(",");

//   // Filtrar proyectos
//   const filteredProjects =
//     props.projects?.filter((project) => {
//       const matchType = filterType
//         ? project.tipe?.toLowerCase() === filterType.toLowerCase()
//         : true;

//       const matchTech = filterTech
//         ? project.technologies.some((tech) =>
//             tech.toLowerCase().includes(filterTech.toLowerCase())
//           )
//         : true;

//       const matchDate = filterDate
//         ? project.date.includes(filterDate) // simple búsqueda por año/mes
//         : true;

//       return matchType && matchTech && matchDate;
//     }) || [];

//   return (
//     <div className="primary mb-4 p-6 rounded-md shadow-sm">
//       {/* Info del curso */}
//       <h2 className="text-lg sm:text-xl font-bold mb-2">
//         {props.code} - {props.name}
//       </h2>
//       <span className="text-xs sm:text-sm mb-4 block">{props.semster}</span>
//       <p className="mb-4 text-sm sm:text-base">{props.description}</p>

//       {/* Sección de proyectos colapsable */}
//       {props.projects && props.projects.length > 0 && (
//         <div className="mt-4">
//           {/* Botón toggle */}
//           <button
//             onClick={() => setShowProjects(!showProjects)}
//             className="secondary text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
//           >
//             {showProjects ? t("hideProjects") : t("showProjects")}
//           </button>

//           {showProjects && (
//             <div className="mt-4">
//               {/* Filtros */}
//               <div className="mb-4 grid gap-2 grid-cols-1 sm:grid-cols-3">
//                 {/* Tipo de evaluación */}
//                 <select
//                   value={filterType}
//                   onChange={(e) => setFilterType(e.target.value)}
//                   className="border rounded p-2 w-full surface-offset text-text"
//                 >
//                   <option value="">{evalualationType[0]}</option>
//                   <option value={evalualationType[1]}>{evalualationType[1]}</option>
//                   <option value={evalualationType[2]}>{evalualationType[2]}</option>
//                   <option value={evalualationType[3]}>{evalualationType[3]}</option>
//                   <option value={evalualationType[4]}>{evalualationType[4]}</option>
//                   <option value={evalualationType[5]}>{evalualationType[5]}</option>
//                   <option value={evalualationType[6]}>{evalualationType[6]}</option>
//                 </select>

//                 {/* Tecnologías */}
//                 <input
//                   type="text"
//                   placeholder={`${t("searchTec")}: React`}
//                   value={filterTech}
//                   onChange={(e) => setFilterTech(e.target.value)}
//                   className="border rounded p-2 w-full surface-offset"
//                 />

//                 {/* Fecha */}
//                 <input
//                   type="text"
//                   placeholder={`${t("example")}: 2024`}
//                   value={filterDate}
//                   onChange={(e) => setFilterDate(e.target.value)}
//                   className="border rounded p-2 w-full surface-offset"
//                 />
//               </div>

//               {/* Lista filtrada */}
//               <h3 className="text-lg font-semibold mb-2">{t("projects")}:</h3>
//               {filteredProjects.length > 0 ? (
//                 <ul className="space-y-4">
//                   {filteredProjects.map((project, index) => (
//                     <li
//                       key={index}
//                       className="border rounded-lg p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-start"
//                     >
//                       <Image
//                         src={project.image}
//                         alt={project.title}
//                         width={80}
//                         height={80}
//                         className="w-full sm:w-20 sm:h-20 object-cover rounded-md"
//                       />
//                       <div>
//                         <h4 className="font-bold">{project.title}</h4>
//                         <p className="text-sm">{project.description}</p>
//                         <p className="text-sm">{t("date")} : {project.date}</p>
//                         <p className="text-sm">{t("type")}: {project.tipe || "No especificado"}</p>
//                         <p className="text-sm">{t("technologies")}: {project.technologies.join(", ")}</p>
//                         <div className="mt-2 space-x-2">
//                           {project.repositoryLink && (
//                             <a
//                               href={project.repositoryLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="underline-color decoration-4 hover:underline"
//                             >
//                               {t("repository")}
//                             </a>
//                           )}
//                           {project.liveDemoLink && (
//                             <a
//                               href={project.liveDemoLink}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="underline-color decoration-4 hover:underline"
//                             >
//                               Demo en vivo
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-sm italic text-gray-500">
//                   No hay proyectos que coincidan con los filtros.
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Card;